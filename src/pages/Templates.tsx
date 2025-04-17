
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRedirectAuth";
import { toast } from "sonner";
import { Layout, BookOpen, Briefcase, ShoppingBag, Calendar } from "lucide-react";
import { defaultWebsite, Website } from "@/lib/pageData";
import { defaultTemplates } from "@/lib/templateData";

const TemplatesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Require authentication for this page
  useRequireAuth();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateWebsite = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template first");
      return;
    }

    try {
      // Get the selected template
      const template = defaultTemplates.find(t => t.id === selectedTemplate);
      
      if (!template) {
        toast.error("Template not found");
        return;
      }
      
      // Create a new website based on the template
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
      
      // Save the new website to localStorage
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
          <h1 className="text-3xl font-bold mb-2">Choose a Website Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a template to get started with your new website. All templates are fully customizable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                {!['education', 'portfolio', 'ecommerce', 'booking'].includes(template.id) && <Layout className="h-16 w-16 text-gray-400" />}
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
