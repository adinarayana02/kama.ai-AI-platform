
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user, userType, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleDashboard = () => {
    if (userType === 'candidate') {
      navigate('/candidate/dashboard');
    } else if (userType === 'hiring') {
      navigate('/hiring/dashboard');
    }
  };

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-orange flex items-center justify-center">
              <span className="font-bold text-white text-lg">K</span>
            </div>
            <span className="font-bold text-xl">kama.ai</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-brand-blue transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleDashboard}
              >
                Dashboard
              </Button>
              <Button 
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
