import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useJobs } from "@/hooks/useJobs";
import {
  generateJobDescription,
  generateJobRequirements,
  generateJobResponsibilities
} from "@/services/openai";
import { useAuth } from "@/contexts/AuthContext";

const CreateJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createJob } = useJobs();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const [jobForm, setJobForm] = React.useState({
    title: "",
    location: "",
    workType: "full-time",
    remoteOption: true,
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    responsibilities: "",
    sampleQuestions: [""]
  });

  const [isGenerating, setIsGenerating] = React.useState({
    description: false,
    requirements: false,
    responsibilities: false,
    sampleQuestions: false
  });
  
  const handleChange = (field: string, value: string | boolean) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if user is authenticated
      if (!user) {
        throw new Error("You must be logged in to create a job");
      }

      // Validate required fields
      if (!jobForm.title.trim()) {
        throw new Error("Job title is required");
      }
      if (!jobForm.description.trim()) {
        throw new Error("Job description is required");
      }
      if (!jobForm.requirements.trim()) {
        throw new Error("Job requirements are required");
      }

      // Convert salary strings to numbers
      const salaryMin = jobForm.salaryMin ? parseInt(jobForm.salaryMin) : 0;
      const salaryMax = jobForm.salaryMax ? parseInt(jobForm.salaryMax) : 0;

      // Create job in database
      const jobData = {
        title: jobForm.title,
        location: jobForm.location,
        work_type: jobForm.workType,
        description: jobForm.description,
        requirements: jobForm.requirements,
        salary_min: salaryMin,
        salary_max: salaryMax,
        company_id: user.id
      };

      const createdJob = await createJob(jobData);
      
      if (!createdJob) {
        throw new Error("Failed to create job. Please try again.");
      }
    
    // Show success toast
    toast({
      title: "Job created successfully",
      description: "Your job has been published and is now live."
    });
    
      // Navigate to dashboard after a short delay to ensure the job is created
      setTimeout(() => {
    navigate("/hiring/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Failed to create job",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const generateWithAI = async (field: string) => {
    if (jobForm.title.trim() === "") {
      toast({
        title: "Missing job title",
        description: "Please enter a job title before generating content.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(prev => ({ ...prev, [field]: true }));
    
    try {
      let generatedContent = "";
      
      if (field === "description") {
        generatedContent = await generateJobDescription({
          title: jobForm.title,
          location: jobForm.location,
          workType: jobForm.workType,
          remoteOption: jobForm.remoteOption,
          salaryMin: jobForm.salaryMin || "0",
          salaryMax: jobForm.salaryMax || "0"
        });
      } 
      else if (field === "requirements") {
        generatedContent = await generateJobRequirements(
          jobForm.title,
          jobForm.description
        );
      }
      else if (field === "responsibilities") {
        generatedContent = await generateJobResponsibilities(
          jobForm.title,
          jobForm.description
        );
      }
      
      setJobForm(prev => ({ ...prev, [field]: generatedContent }));
      
      toast({
        title: "Content generated",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} has been generated successfully.`
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again later.",
        variant: "destructive"
      });
      console.error("AI generation error:", error);
    } finally {
      setIsGenerating(prev => ({ ...prev, [field]: false }));
    }
  };
  
  const handleSampleQuestionChange = (index: number, value: string) => {
    setJobForm(prev => ({
      ...prev,
      sampleQuestions: prev.sampleQuestions.map((q, i) => 
        i === index ? value : q
      )
    }));
  };

  const addSampleQuestion = () => {
    setJobForm(prev => ({
      ...prev,
      sampleQuestions: [...prev.sampleQuestions, ""]
    }));
  };

  const removeSampleQuestion = (index: number) => {
    setJobForm(prev => ({
      ...prev,
      sampleQuestions: prev.sampleQuestions.filter((_, i) => i !== index)
    }));
  };
  
  return (
    <DashboardLayout userType="hiring" currentPath="/hiring/jobs/new">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Job</h1>
            <p className="text-muted-foreground">
              Post a new job to find the perfect candidate
            </p>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="description">Description & Requirements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the fundamental details about this job position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Senior Frontend Developer"
                      value={jobForm.title}
                      onChange={(e) => handleChange("title", e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="e.g., San Francisco, CA"
                        value={jobForm.location}
                        onChange={(e) => handleChange("location", e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workType">Job Type</Label>
                      <Select 
                        defaultValue={jobForm.workType}
                        onValueChange={(value) => handleChange("workType", value)}
                      >
                        <SelectTrigger id="workType">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="remote" 
                      checked={jobForm.remoteOption} 
                      onCheckedChange={(checked) => handleChange("remoteOption", checked)}
                    />
                    <Label htmlFor="remote">Remote option available</Label>
                  </div>
                  
                  <div className="pt-2">
                    <Label>Salary Range</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="salaryMin" className="text-sm text-muted-foreground">Minimum</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <Input 
                            id="salaryMin" 
                            className="pl-6" 
                            placeholder="e.g., 80000"
                            value={jobForm.salaryMin}
                            onChange={(e) => handleChange("salaryMin", e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="salaryMax" className="text-sm text-muted-foreground">Maximum</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <Input 
                            id="salaryMax" 
                            className="pl-6" 
                            placeholder="e.g., 120000"
                            value={jobForm.salaryMax}
                            onChange={(e) => handleChange("salaryMax", e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                  <CardDescription>
                    Provide details about the role and responsibilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Job Description</Label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        onClick={() => generateWithAI("description")}
                        disabled={isGenerating.description}
                        className="h-8 gap-1"
                      >
                        {isGenerating.description ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-3 w-3" />
                            Generate with AI
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the job role, objectives, and company culture..."
                      className="min-h-[150px]"
                      value={jobForm.description}
                      onChange={(e) => handleChange("description", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        onClick={() => generateWithAI("requirements")}
                        disabled={isGenerating.requirements || !jobForm.description}
                        className="h-8 gap-1"
                      >
                        {isGenerating.requirements ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-3 w-3" />
                            Generate with AI
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea 
                      id="requirements" 
                      placeholder="List the qualifications, skills, and experience required..."
                      className="min-h-[150px]"
                      value={jobForm.requirements}
                      onChange={(e) => handleChange("requirements", e.target.value)} 
                    />
                    {!jobForm.description && (
                      <p className="text-sm text-amber-600">
                        Enter a job description first to generate requirements
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="responsibilities">Responsibilities</Label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        onClick={() => generateWithAI("responsibilities")}
                        disabled={isGenerating.responsibilities || !jobForm.description}
                        className="h-8 gap-1"
                      >
                        {isGenerating.responsibilities ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-3 w-3" />
                            Generate with AI
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea 
                      id="responsibilities" 
                      placeholder="Outline the key duties and responsibilities..."
                      className="min-h-[150px]"
                      value={jobForm.responsibilities}
                      onChange={(e) => handleChange("responsibilities", e.target.value)} 
                    />
                    {!jobForm.description && (
                      <p className="text-sm text-amber-600">
                        Enter a job description first to generate responsibilities
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Sample Interview Questions</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add sample questions that will be used to evaluate candidates
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSampleQuestion}
                        className="h-8"
                      >
                        Add Question
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {jobForm.sampleQuestions.map((question, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              placeholder={`Sample question ${index + 1} (e.g., "Describe a challenging project you worked on...")`}
                              value={question}
                              onChange={(e) => handleSampleQuestionChange(index, e.target.value)}
                            />
                          </div>
                          {jobForm.sampleQuestions.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSampleQuestion(index)}
                              className="h-10 w-10 shrink-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {jobForm.sampleQuestions.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground border rounded-lg">
                        No sample questions added yet. Click "Add Question" to get started.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Screening & Application Settings</CardTitle>
                  <CardDescription>
                    Configure how candidates will be screened and evaluated
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Application Form</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="resume" defaultChecked />
                      <Label htmlFor="resume">Require resume upload</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="coverLetter" defaultChecked />
                      <Label htmlFor="coverLetter">Request cover letter</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="portfolio" />
                      <Label htmlFor="portfolio">Request portfolio/work samples</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Label>AI Screening Settings</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="aiResumeScreen" defaultChecked />
                      <Label htmlFor="aiResumeScreen">Enable AI resume screening</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="aiRanking" defaultChecked />
                      <Label htmlFor="aiRanking">Enable AI candidate ranking</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="biasDetection" defaultChecked />
                      <Label htmlFor="biasDetection">Enable bias detection</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-brand-blue hover:bg-brand-blue/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Job"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CreateJob;
