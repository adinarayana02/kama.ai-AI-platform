
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, X, Star, ArrowRight } from "lucide-react";

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-orange-50">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Choose the perfect plan for your hiring needs. No hidden fees, cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <div className="p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-gray-600 mb-6">Perfect for small teams</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Up to 5 active job postings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>100 candidate profiles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI resume parsing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Basic matching algorithm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Email support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Voice interviews</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Advanced analytics</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Start Free Trial
                </Button>
              </div>

              {/* Professional Plan */}
              <div className="p-8 rounded-2xl border-2 border-brand-blue bg-gradient-to-br from-blue-50 to-white relative hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-gray-600 mb-6">For growing companies</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">$149</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited job postings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>1000 candidate profiles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI resume parsing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Advanced matching (70%+)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Voice interviews</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Real-time notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
                
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-gray-600 mb-6">For large organizations</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Everything in Professional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited everything</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>SSO & security features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>24/7 phone support</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">How does the free trial work?</h3>
                <p className="text-gray-600">
                  Start with a 14-day free trial on any plan. No credit card required. Cancel anytime during the trial period.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">Can I change plans later?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">What's included in voice interviews?</h3>
                <p className="text-gray-600">
                  AI-powered voice interviews with real-time transcription, sentiment analysis, and automated scoring based on job requirements.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">Do you offer custom enterprise solutions?</h3>
                <p className="text-gray-600">
                  Yes, we provide fully customized solutions for enterprise clients including custom integrations, advanced security, and dedicated support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-blue text-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of companies using kama.ai to transform their hiring process
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
