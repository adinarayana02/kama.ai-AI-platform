import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, User, Mail, MapPin, GraduationCap, Briefcase, Filter, Search } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Candidates = () => {
  const { applications, loading, error, refreshApplications } = useApplications();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Get unique candidates from applications with filtering
  const candidates = React.useMemo(() => {
    const uniqueCandidates = new Map();
    
    // First, filter applications based on search and status
    const filteredApplications = applications.filter(app => {
      const matchesSearch = searchQuery === "" || 
        app.candidate?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.candidate?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job?.title?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Then create unique candidates map
    filteredApplications.forEach((app) => {
      if (app.candidate && !uniqueCandidates.has(app.candidate.email)) {
        uniqueCandidates.set(app.candidate.email, {
          ...app.candidate,
          applications: [app],
          lastActivity: new Date(app.updated_at || app.created_at || ''),
        });
      } else if (app.candidate) {
        const candidate = uniqueCandidates.get(app.candidate.email);
        candidate.applications.push(app);
        // Update last activity if this application is more recent
        const appDate = new Date(app.updated_at || app.created_at || '');
        if (appDate > candidate.lastActivity) {
          candidate.lastActivity = appDate;
        }
      }
    });

    // Convert to array and sort by last activity
    return Array.from(uniqueCandidates.values())
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }, [applications, searchQuery, statusFilter]);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const totalCandidates = candidates.length;
    const activeApplications = applications.filter(app => app.status === 'in_progress').length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const acceptedApplications = applications.filter(app => app.status === 'accepted').length;

    return {
      totalCandidates,
      activeApplications,
      pendingApplications,
      acceptedApplications,
    };
  }, [candidates, applications]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            View and manage all candidates who have applied to your jobs
          </p>
        </div>
        <Button onClick={refreshApplications} variant="outline">
          <Loader2 className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">
              Unique applicants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeApplications}</div>
            <p className="text-xs text-muted-foreground">
              In interview process
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.acceptedApplications}</div>
            <p className="text-xs text-muted-foreground">
              Successful applications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center text-sm text-red-500 py-4">
              {error}
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No candidates found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Candidates will appear here once they apply to your jobs"}
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div
                  key={candidate.email}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{candidate.full_name}</h3>
                      <Badge variant="outline">
                        {candidate.applications.length} Application{candidate.applications.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{candidate.email}</span>
                      </div>
                      {candidate.applications[0]?.resume_url && (
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <Link
                            to={candidate.applications[0].resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Resume
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {candidate.applications.map((app) => (
                        <Badge
                          key={app.id}
                          variant={
                            app.status === 'pending'
                              ? 'secondary'
                              : app.status === 'in_progress'
                              ? 'default'
                              : app.status === 'accepted'
                              ? 'outline'
                              : 'destructive'
                          }
                        >
                          {app.job?.title || 'Unknown Position'}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last activity {formatDistanceToNow(candidate.lastActivity, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/hiring/candidates/${candidate.email}`}>View Profile</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/hiring/candidates/${candidate.email}/applications`}>View Applications</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Candidates; 