
import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, 
  ChevronDown, 
  Home, 
  User, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarNavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarNavItem = ({ icon: Icon, label, href, active }: SidebarNavItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal h-10",
          active ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-brand-blue/5 hover:text-brand-blue"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "candidate" | "hiring";
  currentPath: string;
}

const DashboardLayout = ({ children, userType, currentPath }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const candidateNav = [
    { icon: Home, label: "Dashboard", href: "/candidate/dashboard" },
    { icon: Briefcase, label: "Job Matches", href: "/candidate/jobs" },
    { icon: MessageSquare, label: "Applications", href: "/candidate/applications" },
    { icon: User, label: "Profile", href: "/candidate/profile" },
    { icon: Settings, label: "Settings", href: "/candidate/settings" },
  ];
  
  const hiringNav = [
    { icon: Home, label: "Dashboard", href: "/hiring/dashboard" },
    { icon: Briefcase, label: "Job Listings", href: "/hiring/jobs" },
    { icon: Users, label: "Candidates", href: "/hiring/candidates" },
    { icon: MessageSquare, label: "Interviews", href: "/hiring/interviews" },
    { icon: Settings, label: "Settings", href: "/hiring/settings" },
  ];
  
  const navItems = userType === "candidate" ? candidateNav : hiringNav;
  
  // Use data from auth context
  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-orange flex items-center justify-center">
              <span className="font-bold text-white text-lg">K</span>
            </div>
            <span className="font-bold text-xl">kama.ai</span>
          </Link>
        </div>
        
        <div className="p-4">
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <User className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <div className="font-medium">{user?.email}</div>
                <div className="text-sm text-muted-foreground">{userType === 'candidate' ? "Candidate" : "Hiring Team"}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarNavItem 
                key={item.href} 
                icon={item.icon} 
                label={item.label} 
                href={item.href}
                active={currentPath === item.href}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center border-b bg-white px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-brand-blue" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <div className="font-medium">{user?.email}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {userType === 'candidate' ? "Candidate" : "Hiring Team"}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={`/${userType}/profile`} className="w-full flex">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={`/${userType}/settings`} className="w-full flex">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
