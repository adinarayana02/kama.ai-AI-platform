
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle,
  Loader2,
  Send,
  Zap,
  User,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { generateWithAI } from "@/services/openai";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI recruiting assistant. I can help you create job descriptions, evaluate candidates, generate interview questions, or provide hiring insights. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const systemPrompt = `You are a helpful AI recruiting assistant named kama.ai. 
        Your role is to help hiring managers with:
        1. Writing or improving job descriptions
        2. Generating interview questions
        3. Evaluating candidate responses
        4. Providing insights on hiring trends
        
        Be concise, practical, and helpful. Always maintain a professional tone.`;
      
      const response = await generateWithAI(userMessage.content, systemPrompt);
      
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: response,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an issue generating a response. Please try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sample quick prompts for the assistant
  const quickPrompts = [
    "Generate interview questions for a frontend developer",
    "Help me write a job description for a UX designer",
    "What qualities should I look for in a project manager?",
    "Tips for conducting effective technical interviews"
  ];
  
  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>AI Recruiting Assistant</CardTitle>
            <CardDescription>
              Get help with your recruiting tasks
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 border-green-100 text-green-700 flex gap-1 items-center">
            <Zap className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div 
                  className={`
                    flex gap-3 max-w-[80%] rounded-lg p-3
                    ${message.role === "assistant" 
                      ? "bg-gray-100" 
                      : "bg-brand-blue text-white"
                    }
                  `}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex-shrink-0 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-brand-blue" />
                    </div>
                  )}
                  <div>
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center ml-2">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 bg-gray-100 rounded-lg p-4 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-brand-blue animate-spin" />
                  </div>
                  <div className="text-sm">Thinking...</div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          {quickPrompts.length > 0 && !isLoading && messages.length < 3 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setInput(prompt);
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Type your question or request..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
