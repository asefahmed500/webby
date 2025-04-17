
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Globe, Code, Zap, Users, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Website Builder</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're on a mission to make web development accessible to everyone, 
              regardless of technical expertise.
            </p>
          </div>
        </section>
        
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2023, our website builder started with a simple idea: 
                creating beautiful websites shouldn't require coding knowledge or 
                technical expertise. We believe that everyone deserves to have a 
                professional online presence without the barriers traditionally 
                associated with web development.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our team of dedicated developers and designers have worked tirelessly 
                to create a platform that combines powerful features with ease of use. 
                Whether you're a small business owner, freelancer, or just want to 
                create a personal website, our builder provides all the tools you need.
              </p>
              <p className="text-lg text-gray-700">
                Today, thousands of users trust our platform to build and maintain 
                their websites, and we continue to innovate and improve our service 
                based on user feedback and emerging web technologies.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="text-gray-600">
                  We believe in making complex technology simple and accessible for everyone.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User-Focused</h3>
                <p className="text-gray-600">
                  Our users' needs drive everything we do, from feature development to support.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible in website building.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Build Your Website?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have used our platform to create stunning websites.
            </p>
            <Link to="/auth">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
