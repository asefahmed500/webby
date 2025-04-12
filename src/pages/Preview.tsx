
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page } from '@/lib/pageData';
import DraggableComponent from '@/components/Builder/DraggableComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Preview = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const { pageId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load pages from localStorage
    try {
      const savedData = localStorage.getItem("saved-website");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.pages) {
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
        }
      }
    } catch (error) {
      console.error("Error loading website:", error);
    }
  }, [pageId, navigate]);
  
  const handleNavigate = (pageId: string) => {
    navigate(`/preview/${pageId}`);
  };
  
  if (!currentPage) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Website not found</h1>
        <p className="text-gray-600 mb-6">No published website content is available.</p>
        <Button onClick={() => navigate('/')}>Back to Builder</Button>
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
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Editor
              </Button>
              <h1 className="font-medium">Preview Mode</h1>
            </div>
            
            <nav>
              <ul className="flex space-x-6">
                {pages.map(page => (
                  <li key={page.id}>
                    <button
                      onClick={() => handleNavigate(page.id === 'home' ? '' : page.id)}
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
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {currentPage.components.length > 0 ? (
            currentPage.components.map((component) => (
              <DraggableComponent key={component.id} component={component} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">This page has no content yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Preview;
