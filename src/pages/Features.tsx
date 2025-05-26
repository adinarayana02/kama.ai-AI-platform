
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, User, Briefcase, BarChart, Zap, Users, MessageSquare, Clock, Shield, Globe, ArrowRight, Star } from "lucide-react";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-orange-50">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-6">
                Powerful Features for Modern Hiring
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how kama.ai's advanced features can transform your recruitment process
              </p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6">
                  <User className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Resume Parsing</h3>
                <p className="text-gray-600 mb-6">
                  Automatically extract and structure candidate information from resumes with 99% accuracy
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multi-format support (PDF, DOC, TXT)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Skills extraction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Experience timeline
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Voice Interviews</h3>
                <p className="text-gray-600 mb-6">
                  AI-powered voice interviews with real-time transcription and analysis
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Voice-to-text conversion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Sentiment analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automated scoring
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Smart Matching</h3>
                <p className="text-gray-600 mb-6">
                  Advanced algorithms match candidates to jobs with precision scoring
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    70%+ match threshold
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Cultural fit analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Real-time notifications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Advanced Capabilities</h2>
              <p className="text-xl text-gray-600">
                Enterprise-grade features for sophisticated hiring workflows
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automated Workflow</h3>
                    <p className="text-gray-600">Complete automation from job posting to interview scheduling</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Team Collaboration</h3>
                    <p className="text-gray-600">Seamless collaboration tools for hiring teams and stakeholders</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Security & Compliance</h3>
                    <p className="text-gray-600">Enterprise-grade security with GDPR and SOC 2 compliance</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Advanced Features"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Integration Features */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Seamless Integrations</h2>
              <p className="text-xl text-gray-600">
                Connect with your existing tools and workflows
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">ATS Integration</h3>
                <p className="text-sm text-gray-600">Connect with popular ATS platforms</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Calendar Sync</h3>
                <p className="text-sm text-gray-600">Google Calendar, Outlook integration</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <p className="text-sm text-gray-600">Slack, Teams notifications</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Export to BI tools and dashboards</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-blue text-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Experience the Future of Hiring
              </h2>
              <p className="text-xl opacity-90 mb-8">
                See how these features can transform your recruitment process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-brand-blue/80">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
