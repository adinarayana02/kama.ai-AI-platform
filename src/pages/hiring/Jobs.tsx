import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Loader2, Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

const Jobs = () => {
  const { jobs, loading, error } = useJobs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground">
            Manage and track all your job postings
          </p>
        </div>
        <Link to="/hiring/jobs/new">
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="mr-2 h-4 w-4" />
            Create New Job
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
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
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first job posting to start attracting talent
              </p>
              <Link to="/hiring/jobs/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Job
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{job.title}</h3>
                      <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.work_type}</span>
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Posted {formatDistanceToNow(new Date(job.created_at || ''), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/hiring/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/hiring/jobs/${job.id}/applications`}>View Applications</Link>
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

export default Jobs; 