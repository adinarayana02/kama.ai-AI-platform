import React, { useState, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useProfile, type Profile, type Experience, type Education } from "@/hooks/useProfile";
import { Plus, Save, Upload, Wand2, X, Loader2 } from "lucide-react";

const CandidateProfile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    profile,
    loading,
    error,
    isUploading,
    updateProfile,
    uploadResume,
    parseResume,
    refreshProfile
  } = useProfile();

  const [newSkill, setNewSkill] = useState("");

  if (loading) {
    return (
      <DashboardLayout userType="candidate" currentPath="/candidate/profile">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userType="candidate" currentPath="/candidate/profile">
        <div className="text-center text-sm text-red-500 py-4">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return null;
  }

  const handleChange = (field: keyof Profile, value: string | string[] | Experience[] | Education[]) => {
    updateProfile({ [field]: value }).catch(err => {
      toast({
        title: "Error updating profile",
        description: err.message,
        variant: "destructive"
      });
    });
  };

  const handleSkillAdd = async () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      try {
        await updateProfile({
          skills: [...profile.skills, newSkill]
        });
        setNewSkill("");
      } catch (err) {
        toast({
          title: "Error adding skill",
          description: err instanceof Error ? err.message : "Failed to add skill",
          variant: "destructive"
        });
      }
    }
  };

  const handleSkillRemove = async (skillToRemove: string) => {
    try {
      await updateProfile({
        skills: profile.skills.filter(skill => skill !== skillToRemove)
      });
    } catch (err) {
      toast({
        title: "Error removing skill",
        description: err instanceof Error ? err.message : "Failed to remove skill",
        variant: "destructive"
      });
    }
  };

  const handleExperienceUpdate = async (index: number, field: keyof Experience, value: string) => {
    try {
      const updatedExperience = [...profile.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value
      };
      await updateProfile({ experience: updatedExperience });
    } catch (err) {
      toast({
        title: "Error updating experience",
        description: err instanceof Error ? err.message : "Failed to update experience",
        variant: "destructive"
      });
    }
  };

  const handleEducationUpdate = async (index: number, field: keyof Education, value: string) => {
    try {
      const updatedEducation = [...profile.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value
      };
      await updateProfile({ education: updatedEducation });
    } catch (err) {
      toast({
        title: "Error updating education",
        description: err instanceof Error ? err.message : "Failed to update education",
        variant: "destructive"
      });
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // First upload the resume
      const resumeUrl = await uploadResume(file);
      
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully."
      });

      // Then parse the resume to extract information
      const parsedData = await parseResume(file);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated with information from your resume."
      });

      // Refresh the profile to show updated data
      await refreshProfile();
    } catch (err) {
      toast({
        title: "Error processing resume",
        description: err instanceof Error ? err.message : "Failed to process resume",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout userType="candidate" currentPath="/candidate/profile">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Build your professional profile to find matching jobs
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Resume
                </>
              )}
            </Button>
            <Button
              onClick={() => refreshProfile()}
              className="bg-brand-blue hover:bg-brand-blue/90 gap-2"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => handleChange("full_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="e.g., Senior Software Engineer with 5+ years of experience"
                    value={profile.headline || ""}
                    onChange={(e) => handleChange("headline", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA"
                      value={profile.location || ""}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_me">About Me</Label>
                  <Textarea
                    id="about_me"
                    placeholder="Write a short bio highlighting your experience and career goals..."
                    className="min-h-[120px]"
                    value={profile.about_me || ""}
                    onChange={(e) => handleChange("about_me", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>
                  Add skills that showcase your expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSkillAdd();
                      }
                    }}
                  />
                  <Button onClick={handleSkillAdd}>Add</Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your work history to showcase your professional experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="space-y-4 pb-6 border-b last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                        <Input
                          id={`jobTitle-${index}`}
                          value={exp.title}
                          onChange={(e) => handleExperienceUpdate(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => handleExperienceUpdate(index, "company", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`expLocation-${index}`}>Location</Label>
                        <Input
                          id={`expLocation-${index}`}
                          value={exp.location}
                          onChange={(e) => handleExperienceUpdate(index, "location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`expStartDate-${index}`}>Start Date</Label>
                        <Input
                          id={`expStartDate-${index}`}
                          value={exp.startDate}
                          onChange={(e) => handleExperienceUpdate(index, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`expEndDate-${index}`}>End Date</Label>
                        <Input
                          id={`expEndDate-${index}`}
                          value={exp.endDate}
                          onChange={(e) => handleExperienceUpdate(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`expDescription-${index}`}>Description</Label>
                      <Textarea
                        id={`expDescription-${index}`}
                        value={exp.description}
                        onChange={(e) => handleExperienceUpdate(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={async () => {
                    try {
                      await updateProfile({
                        experience: [
                          ...profile.experience,
                          {
                            title: "",
                            company: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            description: ""
                          }
                        ]
                      });
                    } catch (err) {
                      toast({
                        title: "Error adding experience",
                        description: err instanceof Error ? err.message : "Failed to add experience",
                        variant: "destructive"
                      });
                    }
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background and credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.education.map((edu, index) => (
                  <div key={index} className="space-y-4 pb-6 border-b last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => handleEducationUpdate(index, "degree", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => handleEducationUpdate(index, "institution", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`eduLocation-${index}`}>Location</Label>
                        <Input
                          id={`eduLocation-${index}`}
                          value={edu.location}
                          onChange={(e) => handleEducationUpdate(index, "location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`eduStartDate-${index}`}>Start Date</Label>
                        <Input
                          id={`eduStartDate-${index}`}
                          value={edu.startDate}
                          onChange={(e) => handleEducationUpdate(index, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                        <Input
                          id={`eduEndDate-${index}`}
                          value={edu.endDate}
                          onChange={(e) => handleEducationUpdate(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={async () => {
                    try {
                      await updateProfile({
                        education: [
                          ...profile.education,
                          {
                            degree: "",
                            institution: "",
                            location: "",
                            startDate: "",
                            endDate: ""
                          }
                        ]
                      });
                    } catch (err) {
                      toast({
                        title: "Error adding education",
                        description: err instanceof Error ? err.message : "Failed to add education",
                        variant: "destructive"
                      });
                    }
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CandidateProfile;
