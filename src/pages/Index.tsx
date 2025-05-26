
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Star, User, Briefcase, BarChart, Zap, Users, MessageSquare, Clock, Shield, Globe, ArrowRight, Play } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-white via-blue-50 to-orange-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="px-4 py-2 bg-brand-blue/10 text-brand-blue text-sm font-medium rounded-full">
                    ✨ AI-Powered Recruitment
                  </span>
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    Reimagine Hiring with{" "}
                    <span className="bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
                      kama.ai
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Transform your hiring process with our AI-powered platform that automates screening,
                    conducts intelligent interviews, and matches perfect candidates — all in real-time.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-4 text-lg">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-2 px-8 py-4 text-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    14-day free trial
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No credit card required
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-orange/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-6">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
                    alt="kama.ai Dashboard Preview"
                    className="rounded-xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Choose kama.ai?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive AI platform handles every aspect of recruitment, from initial screening to final interviews
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Smart Candidate Matching</h3>
                <p className="text-gray-600">
                  AI-powered algorithms match candidates with jobs based on skills, experience, and cultural fit
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Automated Interviews</h3>
                <p className="text-gray-600">
                  AI conducts initial interviews with voice recognition and real-time evaluation
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
                <p className="text-gray-600">
                  Get instant insights and feedback on candidate performance and hiring metrics
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core HR Management */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Core HR Management</h2>
                  <p className="text-xl text-gray-600">
                    Streamline your entire hiring process with intelligent automation and data-driven insights
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Automated Job Posting</h3>
                      <p className="text-gray-600">AI generates compelling job descriptions and posts to multiple platforms automatically</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Candidate Pipeline Management</h3>
                      <p className="text-gray-600">Track candidates through every stage with real-time updates and notifications</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Interview Scheduling</h3>
                      <p className="text-gray-600">Automated scheduling with calendar integration and email notifications</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="HR Management Dashboard"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hiring and Onboarding */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Hiring Process"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Hiring and Onboarding</h2>
                  <p className="text-xl text-gray-600">
                    From first contact to first day, manage the entire candidate journey seamlessly
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Background Verification</h3>
                      <p className="text-gray-600">Automated background checks and reference verification</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Digital Onboarding</h3>
                      <p className="text-gray-600">Streamlined digital paperwork and orientation process</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BarChart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Performance Tracking</h3>
                      <p className="text-gray-600">Monitor new hire progress and success metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-brand-blue text-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Trusted by Industry Leaders</h2>
              <p className="text-xl opacity-90">
                Join thousands of companies transforming their hiring process
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-lg opacity-80">Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-80">Candidates Hired</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">75%</div>
                <div className="text-lg opacity-80">Time Saved</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-lg opacity-80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Employee Engagement */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Employee Engagement & Experience</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create exceptional experiences that keep your team engaged and productive
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Feedback Management</h3>
                <p className="text-gray-600 mb-6">
                  Continuous feedback loops and performance reviews to keep employees engaged
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Team Analytics</h3>
                <p className="text-gray-600 mb-6">
                  Deep insights into team dynamics and collaboration patterns
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Growth Tracking</h3>
                <p className="text-gray-600 mb-6">
                  Monitor career progression and identify development opportunities
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* HR Analytics Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Advanced HR Analytics</h2>
                  <p className="text-xl text-gray-300">
                    Make data-driven decisions with comprehensive analytics and reporting
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BarChart className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Real-time Dashboards</h3>
                      <p className="text-gray-300">Interactive dashboards with live updates on hiring metrics</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Predictive Analytics</h3>
                      <p className="text-gray-300">AI-powered predictions for hiring success and employee retention</p>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  View Analytics Demo
                </Button>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="HR Analytics Dashboard"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Mobile-First Experience</h2>
              <p className="text-xl text-gray-600">
                Manage hiring on the go with our responsive mobile interface
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Responsive Design</h3>
                      <p className="text-gray-600">Perfect experience across all devices and screen sizes</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Offline Capability</h3>
                      <p className="text-gray-600">Review candidates and conduct interviews even without internet</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Push Notifications</h3>
                      <p className="text-gray-600">Stay updated with real-time notifications on new applications</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
                  alt="Mobile App"
                  className="max-w-sm mx-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-orange text-white">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of companies using kama.ai to hire better, faster, and smarter
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 px-8 py-4 text-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-4 text-lg">
                  Schedule Demo
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-80">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
