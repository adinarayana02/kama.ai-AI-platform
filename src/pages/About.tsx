
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Target, Globe, Heart, ArrowRight, Star } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-orange-50">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-6">
                Transforming Hiring with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to make hiring fairer, faster, and more effective through the power of artificial intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    At kama.ai, we believe that finding the right talent shouldn't be a game of chance. 
                    We're democratizing access to advanced AI technology to help companies of all sizes 
                    make better hiring decisions while creating fairer opportunities for candidates.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Precision Matching</h3>
                      <p className="text-gray-600">Using AI to match the right people with the right opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Human-Centric</h3>
                      <p className="text-gray-600">Technology that enhances human decision-making, not replaces it</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Global Impact</h3>
                      <p className="text-gray-600">Making quality hiring accessible to companies worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fairness</h3>
                <p className="text-gray-600">
                  We're committed to reducing bias in hiring and creating equal opportunities for all candidates.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously push the boundaries of what's possible with AI in recruitment.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Empathy</h3>
                <p className="text-gray-600">
                  We understand the human side of hiring and design technology that respects both candidates and employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600">
                Passionate experts in AI, HR, and technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-blue to-brand-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                  <img src="src\images\kishore.png" alt="Team Member" className="w-32 h-32 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Kishore</h3>
                <p className="text-brand-blue font-medium mb-2">Developer</p>
                
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-orange to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <img src="src\images\amurtha.jpg" alt="Team Member" className="w-32 h-32 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Amurtha</h3>
                <p className="text-brand-blue font-medium mb-2">Developer</p>
                
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <img src="src\images\mahima.jpg" alt="Team Member" className="w-32 h-32 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mahima</h3>
                <p className="text-brand-blue font-medium mb-2">Developer</p>
                
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-orange to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <img src="src\images\Abhi.png" alt="Team Member" className="w-32 h-32 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Abhishek</h3>
                <p className="text-brand-blue font-medium mb-2">Developer</p>
                
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-orange to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <img src="src\images\adi.jpeg" alt="Team Member" className="w-32 h-32 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adinarayana</h3>
                <p className="text-brand-blue font-medium mb-2">Developer</p>
                
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-orange to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <img src="src\images\divya.jpg" alt="Team Member" className="w-32 h-32 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Divya</h3>
                <p className="text-brand-blue font-medium mb-2">Developer</p>
                
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-brand-blue text-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
              <p className="text-xl opacity-90">
                Making a difference in the hiring world
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-lg opacity-80">Companies Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-lg opacity-80">Successful Hires</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">75%</div>
                <div className="text-lg opacity-80">Time Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-lg opacity-80">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to transform your hiring process? We're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Contact Us
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

export default About;
