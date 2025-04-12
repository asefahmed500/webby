
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BuilderProvider } from "@/context/BuilderContext";
import { useAuth } from "@/context/AuthContext";
import ComponentSidebar from "@/components/Builder/ComponentSidebar";
import PropertyEditor from "@/components/Builder/PropertyEditor";
import Canvas from "@/components/Builder/Canvas";
import Toolbar from "@/components/Builder/Toolbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Database, Palette, Layers, FileText } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If we add a "landing page" mode later, we could use this:
  // const [showLanding, setShowLanding] = useState(!user);

  // For now, we'll show the builder directly
  return (
    <BuilderProvider>
      <div className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <ComponentSidebar />
          <Canvas />
          <PropertyEditor />
        </div>
      </div>
    </BuilderProvider>
  );
};

// This could be used as a landing page component if needed
const LandingPage = ({ onStartBuilding }: { onStartBuilding: () => void }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Website Builder</h1>
          <div>
            <Button variant="outline" className="mr-2" onClick={() => navigate("/auth")}>Login</Button>
            <Button onClick={() => navigate("/auth?signup=true")}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Your Website with Ease</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Drag and drop components to create beautiful, responsive websites without coding
            </p>
            <Button size="lg" onClick={onStartBuilding} className="bg-white text-blue-700 hover:bg-gray-100">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Palette className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Drag & Drop</h3>
                <p className="text-gray-600">Easily build your website with our intuitive drag and drop interface</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Layers className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Pre-built Components</h3>
                <p className="text-gray-600">Use our library of professionally designed components</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Publishing</h3>
                <p className="text-gray-600">Publish your website with one click and share it with the world</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiple Pages</h3>
                <p className="text-gray-600">Create and manage multiple pages with our page manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Website?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sign up now and create your own professional website in minutes
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/auth?signup=true")} className="bg-white text-blue-900 hover:bg-gray-100">
                Sign Up Free
              </Button>
              <Button size="lg" variant="outline" onClick={onStartBuilding} className="text-white border-white hover:bg-blue-800">
                Try as Guest
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Website Builder</h2>
              <p className="text-gray-400 max-w-xs">
                Create beautiful websites without any coding knowledge
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Drag & Drop</li>
                  <li>Templates</li>
                  <li>Components</li>
                  <li>Publishing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Documentation</li>
                  <li>Tutorials</li>
                  <li>Support</li>
                  <li>Blog</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Website Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
