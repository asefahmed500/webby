
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Page } from '@/lib/pageData';
import { useAuth } from '@/context/AuthContext';
import { BuilderProvider } from '@/context/BuilderContext';
import DraggableComponent from '@/components/Builder/DraggableComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Home } from 'lucide-react';
import { defaultTemplates } from '@/lib/templateData';

const PreviewContent = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTemplate, setIsTemplate] = useState(false);
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if we're previewing a template
    const template = defaultTemplates.find(t => t.id === pageId);
    if (template) {
      setPages(template.pages);
      setCurrentPage(template.pages.find(p => p.isHome) || template.pages[0]);
      setIsTemplate(true);
      setIsLoading(false);
      return;
    }
    
    // Otherwise, load from localStorage
    try {
      setIsLoading(true);
      const savedData = localStorage.getItem("saved-website");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        if (parsedData.pages && Array.isArray(parsedData.pages)) {
          setPages(parsedData.pages);
          
          // Set current page based on URL parameter or default to home
          const pageToShow = parsedData.pages.find((p: Page) => 
            p.id === pageId || (pageId === undefined && p.isHome)
          );
          
          if (pageToShow) {
            setCurrentPage(pageToShow);
          } else {
            // If page not found, redirect to home
            const homePage = parsedData.pages.find((p: Page) => p.isHome);
            if (homePage) {
              navigate('/preview');
            }
          }
        } else {
          console.error("Invalid website data format:", parsedData);
        }
      } else {
        console.error("No saved website found in localStorage");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading website:", error);
      setIsLoading(false);
    }
  }, [pageId, navigate]);
  
  const handleNavigate = (pageId: string) => {
    if (isTemplate) {
      // Stay on the same template but show different page
      const page = pages.find(p => p.id === pageId);
      if (page) {
        setCurrentPage(page);
      }
    } else {
      navigate(`/preview/${pageId === 'home' ? '' : pageId}`);
    }
  };

  const handleEdit = () => {
    if (isTemplate) {
      // If viewing a template, go to template selection
      navigate('/templates');
    } else {
      navigate('/');
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }
  
  if (!currentPage || pages.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Website not found</h1>
        <p className="text-gray-600 mb-6">No published website content is available.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')}>
            <Edit className="h-4 w-4 mr-1" />
            Create Website
          </Button>
          {user && (
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <Home className="h-4 w-4 mr-1" />
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => isTemplate ? navigate('/templates') : (user ? handleDashboard() : handleEdit())}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {isTemplate ? 'Back to Templates' : (user ? 'Back to Dashboard' : 'Back to Editor')}
              </Button>
              <h1 className="font-medium">
                {isTemplate ? 'Template Preview' : 'Preview Mode'}
              </h1>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {pages.map((page) => (
                  <li key={page.id}>
                    <button
                      onClick={() => handleNavigate(page.id)}
                      className={`px-1 py-2 text-sm ${
                        currentPage?.id === page.id 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {page.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile page selector */}
            <div className="block md:hidden">
              <select 
                className="border rounded px-2 py-1 text-sm"
                value={currentPage?.id || ''}
                onChange={(e) => handleNavigate(e.target.value)}
              >
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleEdit}>
              {isTemplate ? 'Use This Template' : (
                <>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Website
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {currentPage?.components && currentPage.components.length > 0 ? (
            currentPage.components.map((component) => (
              <DraggableComponent key={component.id} component={component} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">
                {isTemplate 
                  ? "This is a template page. You can customize it after selecting this template."
                  : "This page has no content yet."}
              </p>
              <Button variant="outline" className="mt-4" onClick={handleEdit}>
                {isTemplate ? 'Use This Template' : (
                  <>
                    <Edit className="h-4 w-4 mr-1" />
                    Add Content
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Main component that wraps the content with BuilderProvider
const Preview = () => {
  return (
    <BuilderProvider>
      <PreviewContent />
    </BuilderProvider>
  );
};

export default Preview;

