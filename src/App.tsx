import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CandidateDashboard from "./pages/candidate/Dashboard";
import CandidateProfile from "./pages/candidate/Profile";
import HiringDashboard from "./pages/hiring/Dashboard";
import CreateJob from "./pages/hiring/CreateJob";
import NotFound from "./pages/NotFound";
import Jobs from "@/pages/hiring/Jobs";
import Candidates from "@/pages/hiring/Candidates";
import Interviews from "@/pages/hiring/Interviews";
import Settings from "@/pages/hiring/Settings";
import HiringLayout from "@/components/layout/HiringLayout";

const queryClient = new QueryClient();

// Protected route wrapper for candidate routes
const CandidateRoute = () => {
  const { user, loading, userType } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  if (userType !== 'candidate') return <Navigate to={userType === 'hiring' ? "/hiring/dashboard" : "/login"} />;
  
  return <Outlet />;
};

// Protected route wrapper for hiring team routes
const HiringRoute = () => {
  const { user, loading, userType } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  if (userType !== 'hiring') return <Navigate to={userType === 'candidate' ? "/candidate/dashboard" : "/login"} />;
  
  return <Outlet />;
};

// Auth wrapper to redirect if already logged in
const AuthRoute = () => {
  const { user, loading, userType } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  if (user && userType) {
    return <Navigate to={userType === 'candidate' ? "/candidate/dashboard" : "/hiring/dashboard"} />;
  }
  
  return <Outlet />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    
    {/* Static pages */}
    <Route path="/features" element={<Features />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/about" element={<About />} />
    
    {/* Auth routes */}
    <Route element={<AuthRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
    
    {/* Candidate Routes */}
    <Route element={<CandidateRoute />}>
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/candidate/profile" element={<CandidateProfile />} />
      <Route path="/candidate/jobs" element={<NotFound />} />
      <Route path="/candidate/jobs/:id" element={<NotFound />} />
      <Route path="/candidate/applications" element={<NotFound />} />
      <Route path="/candidate/settings" element={<NotFound />} />
    </Route>
    
    {/* Hiring Team Routes */}
    <Route element={<HiringRoute />}>
      <Route path="/hiring" element={<HiringLayout />}>
        <Route index element={<HiringDashboard />} />
        <Route path="dashboard" element={<HiringDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/new" element={<CreateJob />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Route>
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
