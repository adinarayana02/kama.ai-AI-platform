import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, Briefcase, Users, Calendar, Clock, UserPlus } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useApplications, Application } from "@/hooks/useApplications";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs();
  const { applications, loading: appsLoading, error: appsError } = useApplications();

  // Calculate statistics
  const totalJobs = jobs.length;
  const activeListings = jobs.filter(job => job.status === 'active').length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const inProgressApplications = applications.filter(app => app.status === 'in_progress').length;

  // Get recent activity (combine jobs and applications)
  const recentActivity = React.useMemo(() => {
    const activities = [
      ...jobs.map(job => ({
        type: 'job' as const,
        id: job.id,
        title: job.title,
        date: new Date(job.created_at || ''),
        status: job.status,
      })),
      ...applications.map(app => ({
        type: 'application' as const,
        id: app.id,
        title: app.job?.title || 'Unknown Position',
        date: new Date(app.created_at || ''),
        status: app.status,
        candidate: app.candidate,
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

    return activities;
  }, [jobs, applications]);

  if (jobsLoading || appsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (jobsError || appsError) {
    return (
      <div className="text-center text-sm text-red-500 py-4">
        {jobsError || appsError}
      </div>
    );
  }

  return (
      <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
          Welcome to your hiring dashboard
            </p>
          </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {activeListings} active listings
            </p>
          </CardContent>
        </Card>
          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {pendingApplications} pending, {inProgressApplications} in progress
            </p>
            </CardContent>
          </Card>
          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-Progress Applications</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{inProgressApplications}</div>
            <p className="text-xs text-muted-foreground">
              {inProgressApplications === 0 ? 'No interviews scheduled' : 'Interviews in progress'}
            </p>
            </CardContent>
          </Card>
          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">
              Based on last 30 days
            </p>
            </CardContent>
          </Card>
        </div>

      {/* Recent Jobs and Applications */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No jobs posted yet</p>
                <Link to="/hiring/jobs/new">
                  <Button className="mt-4">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Create New Job
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.slice(0, 5).map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{job.title}</h3>
                        <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Posted {formatDistanceToNow(new Date(job.created_at || ''), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/hiring/jobs/${job.id}`}>View Details</Link>
                        </Button>
                  </div>
                ))}
                {jobs.length > 5 && (
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/hiring/jobs">View All Jobs</Link>
                  </Button>
                )}
              </div>
            )}
            </CardContent>
          </Card>

        <Card>
            <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No applications yet</p>
                <Link to="/hiring/jobs/new">
                  <Button className="mt-4">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Create New Job
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{application.candidate?.full_name || 'Anonymous Candidate'}</h3>
                        <Badge
                          variant={
                            application.status === 'pending'
                              ? 'secondary'
                              : application.status === 'in_progress'
                              ? 'default'
                              : application.status === 'accepted'
                              ? 'outline'
                              : 'destructive'
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Applied for {application.job?.title || 'Unknown Position'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(application.created_at || ''), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/hiring/candidates/${application.candidate?.email}`}>View Profile</Link>
                    </Button>
                  </div>
                ))}
                {applications.length > 5 && (
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/hiring/candidates">View All Applications</Link>
                  </Button>
                )}
              </div>
            )}
            </CardContent>
          </Card>
        </div>

      {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {activity.type === 'job' ? (
                      <Briefcase className="h-4 w-4" />
                    ) : (
                      <UserPlus className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {activity.type === 'job'
                          ? `New job posted: ${activity.title}`
                          : `New application from ${activity.candidate?.full_name || 'Anonymous Candidate'}`}
                      </p>
                      <Badge
                        variant={
                          activity.status === 'pending'
                            ? 'secondary'
                            : activity.status === 'in_progress'
                            ? 'default'
                            : activity.status === 'accepted'
                            ? 'outline'
                            : activity.status === 'active'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {activity.status}
                      </Badge>
                </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.type === 'job'
                        ? `Posted ${formatDistanceToNow(activity.date, { addSuffix: true })}`
                        : `Applied for ${activity.title} ${formatDistanceToNow(activity.date, { addSuffix: true })}`}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      to={
                        activity.type === 'job'
                          ? `/hiring/jobs/${activity.id}`
                          : `/hiring/candidates/${activity.candidate?.email}`
                      }
                    >
                      View Details
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
          </CardContent>
        </Card>
      </div>
  );
};

export default Dashboard;
