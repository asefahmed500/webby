
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page } from '@/lib/pageData';
import { useAuth } from '@/context/AuthContext';
import DraggableComponent from '@/components/Builder/DraggableComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Home } from 'lucide-react';

const Preview = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Load pages from localStorage
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
    navigate(`/preview/${pageId === 'home' ? '' : pageId}`);
  };

  const handleEdit = () => {
    navigate('/');
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
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => user ? handleDashboard() : handleEdit()}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {user ? 'Back to Dashboard' : 'Back to Editor'}
              </Button>
              <h1 className="font-medium">Preview Mode</h1>
            </div>
            
            <nav>
              <ul className="flex space-x-6">
                {pages.map(page => (
                  <li key={page.id}>
                    <button
                      onClick={() => handleNavigate(page.id)}
                      className={`px-1 py-2 text-sm ${
                        currentPage.id === page.id 
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

            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Website
            </Button>
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {currentPage.components && currentPage.components.length > 0 ? (
            currentPage.components.map((component) => (
              <DraggableComponent key={component.id} component={component} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">This page has no content yet.</p>
              <Button variant="outline" className="mt-4" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Add Content
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Preview;
