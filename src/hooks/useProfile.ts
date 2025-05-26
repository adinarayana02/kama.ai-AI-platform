import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Profile {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  headline?: string;
  about_me?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  resume_url?: string;
  created_at?: string;
  updated_at?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        // Parse JSON fields
        const parsedProfile: Profile = {
          ...data,
          skills: data.skills || [],
          experience: data.experience ? JSON.parse(data.experience) : [],
          education: data.education ? JSON.parse(data.education) : [],
        };
        setProfile(parsedProfile);
      } else {
        // Create initial profile if none exists
        const initialProfile: Profile = {
          full_name: user.user_metadata.full_name || '',
          email: user.email || '',
          skills: [],
          experience: [],
          education: [],
        };
        await updateProfile(initialProfile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('candidate_profiles')
        .upsert({
          user_id: user.id,
          ...updates,
          experience: updates.experience ? JSON.stringify(updates.experience) : undefined,
          education: updates.education ? JSON.stringify(updates.education) : undefined,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      if (data) {
        const parsedProfile: Profile = {
          ...data,
          skills: data.skills || [],
          experience: data.experience ? JSON.parse(data.experience) : [],
          education: data.education ? JSON.parse(data.education) : [],
        };
        setProfile(parsedProfile);
      }

      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const uploadResume = async (file: File) => {
    try {
      setIsUploading(true);
      if (!user) throw new Error('No user logged in');

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Update profile with resume URL
      await updateProfile({ resume_url: publicUrl });

      // TODO: Implement resume parsing and auto-fill
      // For now, we'll just return the URL
      return publicUrl;
    } catch (err) {
      console.error('Error uploading resume:', err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const parseResume = async (file: File) => {
    try {
      setIsUploading(true);
      
      // TODO: Implement actual resume parsing
      // This is a placeholder that simulates parsing
      const text = await file.text();
      
      // Simulate AI analysis
      const parsedData = {
        full_name: "John Doe",
        headline: "Senior Software Engineer",
        skills: ["JavaScript", "React", "Node.js", "TypeScript"],
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Tech Corp",
            location: "San Francisco, CA",
            startDate: "Jan 2020",
            endDate: "Present",
            description: "Lead developer for web applications"
          }
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            institution: "University of Technology",
            location: "San Francisco, CA",
            startDate: "2014",
            endDate: "2018"
          }
        ]
      };

      // Update profile with parsed data
      await updateProfile(parsedData);
      
      return parsedData;
    } catch (err) {
      console.error('Error parsing resume:', err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    isUploading,
    updateProfile,
    uploadResume,
    parseResume,
    refreshProfile: fetchProfile
  };
} 