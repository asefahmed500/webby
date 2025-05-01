
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBuilder } from "@/context/BuilderContext";
import { useAuth } from "@/context/AuthContext";
import ComponentSidebar from "@/components/Builder/ComponentSidebar";
import PropertyEditor from "@/components/Builder/PropertyEditor";
import Canvas from "@/components/Builder/Canvas";
import Toolbar from "@/components/Builder/Toolbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Globe, 
  Database, 
  Palette, 
  Layers, 
  FileText,
  Code, 
  MousePointer, 
  Zap,
  MonitorSmartphone
} from "lucide-react";

const BuilderInterface = () => {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <ComponentSidebar />
        <Canvas />
        <PropertyEditor />
      </div>
    </div>
  );
};

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is logged in but no website is selected, redirect to templates
    if (user) {
      const savedWebsite = localStorage.getItem("saved-website");
      if (!savedWebsite) {
        navigate("/templates");
      }
    }
  }, [user, navigate]);
  
  // If user is logged in, show the builder directly
  // Otherwise, show the landing page
  return user ? (
    <BuilderInterface />
  ) : (
    <LandingPage onStartBuilding={() => navigate("/auth")} />
  );
};

// Landing page component
const LandingPage = ({ onStartBuilding }: { onStartBuilding: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Use the Navbar component */}
      <Navbar />

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Build Stunning Websites<br />Without Code
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              Choose from professionally designed templates and create beautiful, responsive websites with our intuitive Webby builder.
            </p>
            <div className="space-x-4">
              <Button 
                size="lg" 
                onClick={onStartBuilding} 
                className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-8 py-6 text-lg rounded-lg shadow-lg hover-scale"
              >
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-8 py-6 text-lg rounded-lg"
              >
                View Templates
              </Button>
            </div>
          </div>
        </section>

        {/* Features overview section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Intuitive Website Builder</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our drag-and-drop builder makes creating websites simple, fast, and enjoyable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-md hover-scale transition-all">
                <div className="h-14 w-14 mb-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <MousePointer className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Drag & Drop</h3>
                <p className="text-gray-600">
                  Easily build your website with our intuitive drag and drop interface. No coding required.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover-scale transition-all">
                <div className="h-14 w-14 mb-6 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <MonitorSmartphone className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
                <p className="text-gray-600">
                  All websites are fully responsive and look great on any device, from desktops to smartphones.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover-scale transition-all">
                <div className="h-14 w-14 mb-6 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Publish</h3>
                <p className="text-gray-600">
                  Instantly publish your website with one click and share it with the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Template showcase */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Beautiful Templates for Every Need</h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-xl">
              Choose from our growing library of professional templates designed for different industries and purposes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-blue-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Education Website</h3>
                  <p className="text-gray-600 mb-4">Perfect for schools, courses, and educational institutions</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Template
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl">
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                  <Layers className="h-16 w-16 text-indigo-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Portfolio Website</h3>
                  <p className="text-gray-600 mb-4">Showcase your work and professional skills</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Template
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <Database className="h-16 w-16 text-purple-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">E-commerce Website</h3>
                  <p className="text-gray-600 mb-4">Sell products online with a complete shopping experience</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Template
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Palette className="h-16 w-16 text-green-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Booking Website</h3>
                  <p className="text-gray-600 mb-4">Allow customers to book services and appointments</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Everything You Need</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center hover-scale transition-all">
                <div className="h-16 w-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Palette className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Drag & Drop</h3>
                <p className="text-gray-600">Easily build your website with our intuitive drag and drop interface</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center hover-scale transition-all">
                <div className="h-16 w-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Layers className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pre-built Components</h3>
                <p className="text-gray-600">Use our library of professionally designed components</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center hover-scale transition-all">
                <div className="h-16 w-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Publishing</h3>
                <p className="text-gray-600">Publish your website with one click and share it with the world</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center hover-scale transition-all">
                <div className="h-16 w-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">No Coding Required</h3>
                <p className="text-gray-600">Create professional websites without writing a single line of code</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Website?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Sign up now and create your own professional website in minutes
            </p>
            <Button 
              size="lg" 
              onClick={onStartBuilding} 
              className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-8 py-6 text-lg rounded-lg shadow-lg"
            >
              Get Started Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Webby</h2>
              <p className="text-gray-400 max-w-xs">
                Create beautiful websites without any coding knowledge
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors">Drag & Drop</li>
                <li className="hover:text-white transition-colors">Templates</li>
                <li className="hover:text-white transition-colors">Components</li>
                <li className="hover:text-white transition-colors">Publishing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors">Documentation</li>
                <li className="hover:text-white transition-colors">Tutorials</li>
                <li className="hover:text-white transition-colors">Support</li>
                <li className="hover:text-white transition-colors">Blog</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors">About Us</li>
                <li className="hover:text-white transition-colors">Contact</li>
                <li className="hover:text-white transition-colors">Privacy Policy</li>
                <li className="hover:text-white transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Webby. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
