import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const HiringLayout = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/hiring/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      href: "/hiring/jobs",
      icon: Briefcase,
    },
    {
      name: "Candidates",
      href: "/hiring/candidates",
      icon: Users,
    },
    {
      name: "Interviews",
      href: "/hiring/interviews",
      icon: Calendar,
    },
    {
      name: "Settings",
      href: "/hiring/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/hiring/dashboard" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-brand-blue" />
            <span className="font-semibold">Hiring Portal</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-blue text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="container py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HiringLayout; 