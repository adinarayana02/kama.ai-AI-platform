import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [activeTab, setActiveTab] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerificationRequired, setEmailVerificationRequired] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    setEmailVerificationRequired(false);
    
    try {
      await signIn(email, password);
      // The redirect happens in the AuthContext
    } catch (error: any) {
      setLoading(false);
      
      // Check if it's an email verification error
      if (error.message.includes("confirm your account")) {
        setEmailVerificationRequired(true);
      }
    }
  };
  
  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    try {
      await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend verification email");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Premium background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-white to-brand-orange/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=2000&q=10')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-brand-blue/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-brand-orange/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="w-full max-w-md relative">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Log in to continue your journey
            </p>
          </div>
          
          {emailVerificationRequired && (
            <Alert className="mb-6 bg-amber-50 border-amber-200 backdrop-blur-sm">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                Please verify your email before logging in.{" "}
                <button 
                  onClick={handleResendVerification}
                  className="text-amber-800 font-medium underline"
                >
                  Resend verification email
                </button>
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="candidate" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full p-1 bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <TabsTrigger value="candidate" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Candidate</TabsTrigger>
              <TabsTrigger value="hiring" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Hiring Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="candidate">
              <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">Candidate Login</CardTitle>
                    <CardDescription className="text-base">
                      Access your job applications and matches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidate-email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="candidate-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidate-password" className="text-sm font-medium">Password</Label>
                      <Input 
                        id="candidate-password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-blue/50"
                      />
                      <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline font-medium">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-brand-blue to-brand-orange hover:from-brand-blue/90 hover:to-brand-orange/90 text-white shadow-lg shadow-brand-blue/25"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login as Candidate"}
                    </Button>
                  </CardContent>
                </form>
                <CardFooter className="flex justify-center border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-brand-blue hover:underline font-medium">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="hiring">
              <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-orange to-brand-blue">Hiring Team Login</CardTitle>
                    <CardDescription className="text-base">
                      Access your recruitment dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hiring-email" className="text-sm font-medium">Work Email</Label>
                      <Input 
                        id="hiring-email" 
                        type="email" 
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-orange/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiring-password" className="text-sm font-medium">Password</Label>
                      <Input 
                        id="hiring-password" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-orange/50"
                      />
                      <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-brand-orange hover:underline font-medium">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-brand-orange to-brand-blue hover:from-brand-orange/90 hover:to-brand-blue/90 text-white shadow-lg shadow-brand-orange/25"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login as Hiring Team"}
                    </Button>
                  </CardContent>
                </form>
                <CardFooter className="flex justify-center border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-brand-orange hover:underline font-medium">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
