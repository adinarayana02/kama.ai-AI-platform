import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, Calendar, Clock, User, Video, MessageSquare } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const Interviews = () => {
  const { applications, loading, error } = useApplications();

  // Filter applications that are in interview stage
  const interviews = React.useMemo(() => {
    return applications.filter(app => app.status === 'in_progress');
  }, [applications]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">
            Schedule and manage candidate interviews
          </p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
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
            ) : interviews.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No upcoming interviews</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule interviews with candidates to get started
                </p>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1 mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{interview.candidate?.full_name || 'Anonymous Candidate'}</h3>
                        <Badge variant="default">Interview</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{interview.job?.title || 'Unknown Position'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Not scheduled</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Application received {formatDistanceToNow(new Date(interview.created_at || ''), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No interview history</h3>
              <p className="text-sm text-muted-foreground">
                Completed interviews will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interviews; 