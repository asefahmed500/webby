
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRedirectAuth";
import { toast } from "sonner";
import { Layout, BookOpen, Briefcase, ShoppingBag, Calendar, FilePlus, FileText, Utensils, Home, Rocket } from "lucide-react";
import { defaultWebsite, Website } from "@/lib/pageData";
import { defaultTemplates } from "@/lib/templateData";

const TemplatesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  useRequireAuth();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const createBlankWebsite = () => {
    try {
      const blankWebsite: Website = {
        ...defaultWebsite,
        id: `website-${Math.random().toString(36).substr(2, 9)}`,
        name: "My Blank Website",
        description: "A website built from scratch",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id
      };
      
      localStorage.setItem("saved-website", JSON.stringify(blankWebsite));
      toast.success("Blank website created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating blank website:", error);
      toast.error("Failed to create website");
    }
  };

  const handleCreateWebsite = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }

    try {
      const template = defaultTemplates.find(t => t.id === selectedTemplate);
      
      if (!template) {
        toast.error("Template not found");
        return;
      }
      
      const newWebsite: Website = {
        ...defaultWebsite,
        id: `website-${Math.random().toString(36).substr(2, 9)}`,
        name: template.name,
        description: template.description,
        pages: template.pages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id
      };
      
      localStorage.setItem("saved-website", JSON.stringify(newWebsite));
      
      toast.success("Website created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating website:", error);
      toast.error("Failed to create website");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Choose a Webby Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start with a blank template or select from our pre-designed templates to get started with your new website.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card 
            className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
            onClick={createBlankWebsite}
          >
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <FilePlus className="h-16 w-16 text-gray-400" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Blank Template</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600 text-sm">Start from scratch with a blank canvas and build your website exactly how you want it.</p>
            </CardContent>
          </Card>

          {defaultTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 transform scale-105' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                {template.id === 'education' && <BookOpen className="h-16 w-16 text-blue-500" />}
                {template.id === 'portfolio' && <Briefcase className="h-16 w-16 text-indigo-500" />}
                {template.id === 'ecommerce' && <ShoppingBag className="h-16 w-16 text-purple-500" />}
                {template.id === 'booking' && <Calendar className="h-16 w-16 text-green-500" />}
                {template.id === 'blog' && <FileText className="h-16 w-16 text-pink-500" />}
                {template.id === 'restaurant' && <Utensils className="h-16 w-16 text-orange-500" />}
                {template.id === 'realestate' && <Home className="h-16 w-16 text-teal-500" />}
                {template.id === 'startup' && <Rocket className="h-16 w-16 text-amber-500" />}
                {!['education', 'portfolio', 'ecommerce', 'booking', 'blog', 'restaurant', 'realestate', 'startup'].includes(template.id) && <Layout className="h-16 w-16 text-gray-400" />}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600 text-sm">{template.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 hover:text-blue-800 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/preview/${template.id}`, '_blank');
                  }}
                >
                  Preview Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleCreateWebsite}
            disabled={!selectedTemplate}
            className="px-8"
          >
            Create Website
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TemplatesPage;
