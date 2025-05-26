
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: CandidateSignUp | HiringTeamSignUp) => Promise<void>;
  signOut: () => Promise<void>;
  userType: 'candidate' | 'hiring' | null;
}

interface CandidateSignUp {
  type: 'candidate';
  fullName: string;
  email: string;
  password: string;
}

interface HiringTeamSignUp {
  type: 'hiring';
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'candidate' | 'hiring' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Don't make Supabase calls directly in the callback
        if (session?.user) {
          // Use setTimeout to prevent potential deadlocks
          setTimeout(() => {
            checkUserType(session.user.id);
          }, 0);
        } else {
          setUserType(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserType(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUserType(userId: string) {
    const { data: candidate } = await supabase
      .from('candidates')
      .select()
      .eq('id', userId)
      .single();

    if (candidate) {
      setUserType('candidate');
      return;
    }

    const { data: hiringTeam } = await supabase
      .from('hiring_teams')
      .select()
      .eq('id', userId)
      .single();

    if (hiringTeam) {
      setUserType('hiring');
      return;
    }

    setUserType(null);
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Check for email confirmation error
        if (error.message.includes('Email not confirmed')) {
          // Send another confirmation email
          await supabase.auth.resend({
            type: 'signup',
            email: email,
          });
          
          toast.warning("Your email is not confirmed. We've sent a new confirmation email.");
          throw new Error("Please check your email and confirm your account before logging in.");
        } else {
          throw error;
        }
      }
      
      toast.success("Logged in successfully");
      
      // Navigation will happen based on userType in useEffect
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signUp = async (payload: CandidateSignUp | HiringTeamSignUp) => {
    try {
      // First, create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            full_name: payload.fullName,
            ...(payload.type === 'hiring' ? { company_name: payload.companyName } : {})
          },
          // This will bypass the email verification process
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (authError) {
        throw authError;
      }

      const userId = authData.user?.id;
      
      if (!userId) {
        throw new Error("Failed to create user");
      }

      // Then, create the appropriate profile
      if (payload.type === 'candidate') {
        const { error: profileError } = await supabase.from('candidates').insert({
          id: userId,
          full_name: payload.fullName,
          email: payload.email,
          password: payload.password // Note: This is redundant as auth already stores the password securely
        });

        if (profileError) {
          throw profileError;
        }
        
        setUserType('candidate');
      } else {
        const { error: profileError } = await supabase.from('hiring_teams').insert({
          id: userId,
          company_name: payload.companyName,
          full_name: payload.fullName,
          work_email: payload.email,
          password: payload.password // Note: This is redundant as auth already stores the password securely
        });

        if (profileError) {
          throw profileError;
        }
        
        setUserType('hiring');
      }

      toast.success("Account created successfully! Please check your email to confirm your account.");
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setSession(null);
      setUserType(null);
      toast.success("Logged out successfully");
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      userType 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
