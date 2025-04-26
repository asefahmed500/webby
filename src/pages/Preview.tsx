
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Page } from '@/lib/pageData';
import DraggableComponent from '@/components/Builder/DraggableComponent';

interface PreviewParams {
  slug?: string;
}

const Preview = () => {
  const [website, setWebsite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const { slug } = useParams<PreviewParams>();
  
  useEffect(() => {
    // Load website data
    const loadWebsite = async () => {
      try {
        setLoading(true);
        
        // If we have a slug, we load the published website from storage/database
        if (slug) {
          const publishedData = localStorage.getItem("published-website");
          if (publishedData) {
            const parsedData = JSON.parse(publishedData);
            setWebsite(parsedData);
            
            // Set current page to home page or first page
            const homePage = parsedData.pages.find((p: Page) => p.isHome) || parsedData.pages[0];
            if (homePage) {
              setCurrentPage(homePage);
            }
          }
        } else {
          // No slug, probably a user previewing their own site in-builder
          const savedData = localStorage.getItem("saved-website");
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            setWebsite(parsedData);
            
            // Set current page based on current page in builder
            const currentPageId = parsedData.currentPageId;
            const pageToShow = parsedData.pages.find((p: Page) => p.id === currentPageId) || parsedData.pages[0];
            if (pageToShow) {
              setCurrentPage(pageToShow);
            }
          }
        }
      } catch (error) {
        console.error("Error loading website for preview:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadWebsite();
  }, [slug]);
  
  const handlePageChange = (pageId: string) => {
    const newPage = website?.pages.find((p: Page) => p.id === pageId);
    if (newPage) {
      setCurrentPage(newPage);
    }
  };
  
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!website || !currentPage) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Website Not Found</h1>
        <p className="text-gray-500">The website you're looking for doesn't exist or hasn't been published yet.</p>
      </div>
    );
  }
  
  const viewportClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-[375px] mx-auto border-x border-gray-200 shadow-sm min-h-[600px]';
      case 'tablet':
        return 'max-w-[768px] mx-auto border-x border-gray-200 shadow-sm min-h-[800px]';
      default:
        return 'w-full min-h-screen';
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{website.websiteName || "Website Preview"}</title>
        <meta name="description" content={`Preview of ${website.websiteName}`} />
      </Helmet>
      
      {!slug && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-4">Preview Mode</span>
            
            <div className="flex border rounded-md overflow-hidden">
              <button 
                className={`px-2 py-1 text-xs ${viewportSize === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setViewportSize("mobile")}
              >
                Mobile
              </button>
              <button 
                className={`px-2 py-1 text-xs ${viewportSize === 'tablet' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setViewportSize("tablet")}
              >
                Tablet
              </button>
              <button 
                className={`px-2 py-1 text-xs ${viewportSize === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setViewportSize("desktop")}
              >
                Desktop
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <select 
              className="text-sm border rounded px-2 py-1"
              value={currentPage.id}
              onChange={(e) => handlePageChange(e.target.value)}
            >
              {website.pages.map((page: Page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      <div className={`${!slug ? 'mt-12' : ''} transition-all duration-300`}>
        <div className={viewportClass()}>
          {/* Navigation */}
          {slug && website.pages.length > 1 && (
            <nav className="bg-white shadow-sm p-4">
              <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="text-lg font-bold">{website.websiteName}</div>
                <div className="flex space-x-4">
                  {website.pages.map((page: Page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageChange(page.id)}
                      className={`px-3 py-1 rounded ${page.id === currentPage.id ? 'bg-gray-100' : ''}`}
                    >
                      {page.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          )}
          
          {/* Page Content */}
          <main className={slug ? 'min-h-screen' : ''}>
            {currentPage.components && currentPage.components.map((component: any) => (
              <DraggableComponent 
                key={component.id} 
                component={component} 
                preview={true} 
              />
            ))}
            
            {(!currentPage.components || currentPage.components.length === 0) && (
              <div className="p-8 text-center text-gray-500">
                <p>This page has no content yet.</p>
              </div>
            )}
          </main>
          
          {/* Footer */}
          {slug && (
            <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500">
              <p>Created with Website Builder</p>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Preview);
