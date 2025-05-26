
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  BarChart, 
  Briefcase, 
  Clock, 
  FileText, 
  MessageCircle, 
  Search, 
  Upload, 
  Zap 
} from "lucide-react";
import ResumeAnalyzer from "@/components/candidate/ResumeAnalyzer";

const CandidateDashboard = () => {
  return (
    <DashboardLayout userType="candidate" currentPath="/candidate/dashboard">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, here's your job search overview
            </p>
          </div>
          <Link to="/candidate/jobs">
            <Button className="gradient-bg text-white hover:opacity-90">
              <Search className="mr-2 h-4 w-4" />
              Find New Jobs
            </Button>
          </Link>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Profile Completion</CardTitle>
              <Link to="/candidate/profile">
                <Button variant="ghost" size="sm" className="text-brand-blue gap-1">
                  Complete Profile
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Complete your profile to get better job matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">75% Complete</span>
                <span className="text-sm text-muted-foreground">
                  3 items left
                </span>
              </div>
              <Progress value={75} className="h-2 bg-gray-100" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Resume</div>
                    <div className="text-xs text-green-600">Uploaded</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Experience</div>
                    <div className="text-xs text-green-600">Added</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Skills</div>
                    <div className="text-xs text-amber-600">4 of 8 Added</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Resume Analyzer - New Component */}
          <ResumeAnalyzer />

          {/* Job Matches */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Job Matches</CardTitle>
                <Link to="/candidate/jobs">
                  <Button variant="ghost" size="sm" className="text-brand-blue gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>AI-powered job recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Senior Frontend Developer",
                    company: "TechCorp",
                    location: "San Francisco, CA",
                    salary: "$120,000 - $150,000",
                    match: 95,
                    posted: "2 days ago",
                    remote: true,
                  },
                  {
                    title: "UI/UX Designer",
                    company: "Design Studio",
                    location: "New York, NY",
                    salary: "$95,000 - $120,000",
                    match: 92,
                    posted: "1 day ago",
                    remote: true,
                  }
                ].map((job, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {job.company} • {job.location} {job.remote && <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Remote</span>}
                        </div>
                        <div className="text-sm font-medium mt-1">
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {job.match}% Match
                      </Badge>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        Posted {job.posted}
                      </div>
                      <Link to={`/candidate/jobs/${index}`} className="w-full md:w-auto">
                        <Button size="sm" className="w-full md:w-auto">
                          View Job
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Applications</CardTitle>
                <Link to="/candidate/applications">
                  <Button variant="ghost" size="sm" className="text-brand-blue gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Track your recent job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Senior Frontend Developer",
                    company: "TechCorp",
                    status: "Interview Scheduled",
                    statusColor: "blue",
                    date: "May 25, 2023"
                  },
                  {
                    title: "UI/UX Designer",
                    company: "Design Studio",
                    status: "Application Received",
                    statusColor: "amber",
                    date: "May 21, 2023"
                  },
                ].map((application, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <div className="font-medium">{application.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {application.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-2 sm:mt-0">
                      <Badge variant="outline" className={`bg-${application.statusColor}-50 text-${application.statusColor}-700 border-${application.statusColor}-200`}>
                        {application.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        Applied on {application.date}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-2 text-center">
                  <Link to="/candidate/applications">
                    <Button variant="outline" size="sm">
                      View All Applications
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>AI Career Assistant</CardTitle>
                <CardDescription>
                  Get personalized help with your job search
                </CardDescription>
              </div>
              <Zap className="h-5 w-5 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex p-4 rounded-lg bg-brand-blue/5 items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-brand-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium">Resume Feedback</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI analysis suggests adding more quantifiable achievements to your resume to stand out to recruiters.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-brand-blue">
                      Update Resume
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Improve my resume
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Prepare for interviews
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Salary negotiation tips
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Viewed Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Viewed Jobs</CardTitle>
            <CardDescription>Jobs you've viewed recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Frontend Developer",
                  company: "WebTech Inc.",
                  location: "Boston, MA",
                  viewed: "2 hours ago",
                },
                {
                  title: "Product Designer",
                  company: "CreativeStudio",
                  location: "Remote",
                  viewed: "Yesterday",
                },
                {
                  title: "React Developer",
                  company: "SoftCorp",
                  location: "Chicago, IL",
                  viewed: "Yesterday",
                },
              ].map((job, index) => (
                <Card key={index} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {job.company} • {job.location}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-muted-foreground">
                        Viewed {job.viewed}
                      </div>
                      <Link to={`/candidate/jobs/${index+3}`}>
                        <Button variant="ghost" size="sm" className="h-8">
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
