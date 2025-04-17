
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-xl text-gray-600">
                Choose the plan that's right for you and start building beautiful websites today.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold">Free</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="ml-1 text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For hobbyists and personal projects</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>1 website</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>5 pages per website</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Basic components</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Community support</span>
                    </li>
                  </ul>
                  
                  <Link to="/auth">
                    <Button className="w-full mt-6" variant="outline">Get Started</Button>
                  </Link>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="border rounded-lg overflow-hidden bg-white shadow-lg relative">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg">
                  Popular
                </div>
                
                <div className="p-6 border-b bg-blue-50">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="ml-1 text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For freelancers and small businesses</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>5 websites</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Unlimited pages</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>All components</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Custom domain</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  
                  <Link to="/auth">
                    <Button className="w-full mt-6">Get Started</Button>
                  </Link>
                </div>
              </div>
              
              {/* Business Plan */}
              <div className="border rounded-lg overflow-hidden bg-white">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold">Business</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="ml-1 text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For agencies and larger businesses</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Unlimited websites</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Unlimited pages</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Advanced components</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Multiple custom domains</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                  
                  <Link to="/auth">
                    <Button className="w-full mt-6" variant="outline">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
