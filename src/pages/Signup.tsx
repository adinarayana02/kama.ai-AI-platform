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

const Signup = () => {
  const [activeTab, setActiveTab] = useState("candidate");
  
  // Candidate form state
  const [candidateFullName, setCandidateFullName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePassword, setCandidatePassword] = useState("");
  
  // Hiring team form state
  const [companyName, setCompanyName] = useState("");
  const [hiringFullName, setHiringFullName] = useState("");
  const [hiringEmail, setHiringEmail] = useState("");
  const [hiringPassword, setHiringPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleCandidateSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidateFullName || !candidateEmail || !candidatePassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp({
        type: 'candidate',
        fullName: candidateFullName,
        email: candidateEmail,
        password: candidatePassword
      });
      // Redirect happens in AuthContext
    } catch (error) {
      // Error is already handled in AuthContext
      setLoading(false);
    }
  };
  
  const handleHiringSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName || !hiringFullName || !hiringEmail || !hiringPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp({
        type: 'hiring',
        companyName: companyName,
        fullName: hiringFullName,
        email: hiringEmail,
        password: hiringPassword
      });
      // Redirect happens in AuthContext
    } catch (error) {
      // Error is already handled in AuthContext
      setLoading(false);
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
              Create an Account
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Join kama.ai to start your hiring journey
            </p>
          </div>
          
          <Tabs defaultValue="candidate" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full p-1 bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <TabsTrigger value="candidate" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">I'm a Candidate</TabsTrigger>
              <TabsTrigger value="hiring" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">I'm Hiring</TabsTrigger>
            </TabsList>
            
            <TabsContent value="candidate">
              <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleCandidateSignup}>
                  <CardHeader>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-orange">Candidate Registration</CardTitle>
                    <CardDescription className="text-base">
                      Create an account to find your perfect job match
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidate-name" className="text-sm font-medium">Full Name</Label>
                      <Input 
                        id="candidate-name" 
                        placeholder="Enter your full name"
                        value={candidateFullName}
                        onChange={(e) => setCandidateFullName(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidate-email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="candidate-email" 
                        type="email" 
                        placeholder="you@example.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidate-password" className="text-sm font-medium">Password</Label>
                      <Input 
                        id="candidate-password" 
                        type="password" 
                        placeholder="Create a secure password"
                        value={candidatePassword}
                        onChange={(e) => setCandidatePassword(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-blue/50"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-brand-blue to-brand-orange hover:from-brand-blue/90 hover:to-brand-orange/90 text-white shadow-lg shadow-brand-blue/25"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Candidate Account"}
                    </Button>
                  </CardContent>
                </form>
                <CardFooter className="flex justify-center border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand-blue hover:underline font-medium">
                      Login
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="hiring">
              <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleHiringSignup}>
                  <CardHeader>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-orange to-brand-blue">Hiring Team Registration</CardTitle>
                    <CardDescription className="text-base">
                      Create an account to find and hire top talent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name" className="text-sm font-medium">Company Name</Label>
                      <Input 
                        id="company-name" 
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-orange/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiring-name" className="text-sm font-medium">Your Name</Label>
                      <Input 
                        id="hiring-name" 
                        placeholder="Enter your full name"
                        value={hiringFullName}
                        onChange={(e) => setHiringFullName(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-orange/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiring-email" className="text-sm font-medium">Work Email</Label>
                      <Input 
                        id="hiring-email" 
                        type="email" 
                        placeholder="you@company.com"
                        value={hiringEmail}
                        onChange={(e) => setHiringEmail(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-orange/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiring-password" className="text-sm font-medium">Password</Label>
                      <Input 
                        id="hiring-password" 
                        type="password" 
                        placeholder="Create a secure password"
                        value={hiringPassword}
                        onChange={(e) => setHiringPassword(e.target.value)}
                        required
                        className="bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-brand-orange/50"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-brand-orange to-brand-blue hover:from-brand-orange/90 hover:to-brand-blue/90 text-white shadow-lg shadow-brand-orange/25"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Hiring Team Account"}
                    </Button>
                  </CardContent>
                </form>
                <CardFooter className="flex justify-center border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand-orange hover:underline font-medium">
                      Login
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

export default Signup;
