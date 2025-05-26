
import { toast } from "@/hooks/use-toast";

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAICompletionRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// This should be loaded from environment variables in production
// Using a hard-coded key here only for demonstration purposes
const OPENAI_API_KEY = "sk-proj-MTrffFRAE1fXbhjhpbXqT3BlbkFJHVI3nULXLxNtuBXblmuM";

export async function generateWithAI(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const messages: OpenAIMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    
    messages.push({ role: "user", content: prompt });

    const requestBody: OpenAICompletionRequest = {
      model: "gpt-4o-mini", // Using gpt-4o-mini for a good balance of capability and cost
      messages,
      temperature: 0.7,
      max_tokens: 1000
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate content with AI");
    }

    const data: OpenAICompletionResponse = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    toast({
      title: "AI Generation Error",
      description: error instanceof Error ? error.message : "Failed to generate content with AI",
      variant: "destructive"
    });
    console.error("AI Generation Error:", error);
    return "Sorry, I couldn't generate content right now. Please try again later.";
  }
}

// Specialized function for job description generation
export async function generateJobDescription(jobInfo: {
  title: string;
  location: string;
  workType: string;
  remoteOption: boolean;
  salaryMin: string;
  salaryMax: string;
}): Promise<string> {
  const prompt = `Write a detailed professional job description for a ${jobInfo.title} position. 
  Details:
  - Location: ${jobInfo.location}
  - Work type: ${jobInfo.workType}
  - ${jobInfo.remoteOption ? 'Remote work is available' : 'This is an on-site position'}
  - Salary range: $${jobInfo.salaryMin} - $${jobInfo.salaryMax}

  The description should include an overview of the role, key responsibilities, and the ideal candidate profile.`;
  
  const systemPrompt = "You are an expert HR professional who writes clear, engaging, and detailed job descriptions. Focus on being comprehensive but concise, highlighting the most important aspects of the role without unnecessary jargon.";

  return generateWithAI(prompt, systemPrompt);
}

// Specialized function for job requirements generation
export async function generateJobRequirements(title: string, description: string): Promise<string> {
  const prompt = `Generate a bullet-point list of requirements for a ${title} position. 
  Use the following job description as context: "${description}"
  
  Focus on education, years of experience, technical skills, and soft skills needed.`;
  
  const systemPrompt = "You are an expert HR professional who writes clear, specific job requirements. Format the requirements as bulleted list items starting with • and focus on being detailed and realistic.";

  return generateWithAI(prompt, systemPrompt);
}

// Specialized function for job responsibilities generation  
export async function generateJobResponsibilities(title: string, description: string): Promise<string> {
  const prompt = `Generate a bullet-point list of key responsibilities for a ${title} position.
  Use the following job description as context: "${description}"
  
  Focus on day-to-day tasks, projects, and expected outcomes.`;
  
  const systemPrompt = "You are an expert HR professional who writes clear, actionable job responsibilities. Format the responsibilities as bulleted list items starting with • and use action verbs.";

  return generateWithAI(prompt, systemPrompt);
}

// Specialized function for resume analysis
export async function analyzeResume(resumeText: string): Promise<{
  skills: string[];
  experienceYears: number;
  recommendedJobs: string[];
  improvements: string[];
}> {
  const prompt = `Analyze this resume and extract the following:
  1. List of skills (technical and soft)
  2. Total years of experience
  3. 3-5 job titles this person would be well-suited for
  4. 2-3 suggestions for improving the resume
  
  Resume text: "${resumeText}"`;
  
  const systemPrompt = "You are an expert resume analyzer. Extract the requested information accurately. Format your response as JSON with the following structure: { skills: string[], experienceYears: number, recommendedJobs: string[], improvements: string[] }";

  try {
    const response = await generateWithAI(prompt, systemPrompt);
    
    // Try to parse the response as JSON
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      
      // Fallback with placeholder data
      return {
        skills: ["Communication", "Problem Solving", "Teamwork"],
        experienceYears: 0,
        recommendedJobs: ["Entry Level Position"],
        improvements: ["Add more detail to your experience section", "Quantify your achievements"]
      };
    }
  } catch (error) {
    console.error("Failed to analyze resume:", error);
    
    // Return fallback data
    return {
      skills: ["Communication", "Problem Solving", "Teamwork"],
      experienceYears: 0,
      recommendedJobs: ["Entry Level Position"],
      improvements: ["Add more detail to your experience section", "Quantify your achievements"]
    };
  }
}
