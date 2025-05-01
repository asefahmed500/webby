
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useBuilder } from '@/context/BuilderContext';
import { SEOSettings as SEOSettingsType, defaultSEOSettings } from '@/lib/seoUtils';
import { Image, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface SEOSettingsProps {
  onClose?: () => void;
}

const SEOSettings = ({ onClose }: SEOSettingsProps) => {
  const { websiteName, setWebsiteName, seoSettings, setSEOSettings, saveWebsite } = useBuilder();

  const [localSEO, setLocalSEO] = useState<SEOSettingsType>(
    seoSettings || { ...defaultSEOSettings, title: websiteName }
  );
  
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSave = async () => {
    try {
      setSEOSettings(localSEO);
      if (localSEO.title !== websiteName) {
        setWebsiteName(localSEO.title);
      }
      await saveWebsite();
      toast.success("SEO settings saved successfully");
      onClose?.();
    } catch (error) {
      console.error("Error saving SEO settings:", error);
      toast.error("Failed to save SEO settings");
    }
  };
  
  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    try {
      setIsUploading(true);
      // In a production app, this would upload to Supabase storage
      // For now we'll use a data URL for the demo
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalSEO({
          ...localSEO,
          favicon: reader.result as string
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading favicon:", error);
      toast.error("Failed to upload favicon");
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">SEO & Metadata Settings</h2>
      
      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Website Title</Label>
            <Input 
              id="title" 
              value={localSEO.title} 
              onChange={(e) => setLocalSEO({ ...localSEO, title: e.target.value })}
              placeholder="My Amazing Website"
            />
            <p className="text-xs text-gray-500">This will be displayed in browser tabs and search results.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Website Description</Label>
            <Textarea 
              id="description" 
              value={localSEO.description} 
              onChange={(e) => setLocalSEO({ ...localSEO, description: e.target.value })}
              placeholder="A short description of your website..."
              rows={3}
            />
            <p className="text-xs text-gray-500">Describe your website in 150-160 characters for search engines.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="favicon">Favicon</Label>
            <div className="flex items-center gap-3">
              {localSEO.favicon ? (
                <div className="w-10 h-10 rounded border flex items-center justify-center overflow-hidden bg-gray-50">
                  <img 
                    src={localSEO.favicon} 
                    alt="Favicon" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded border flex items-center justify-center bg-gray-50 text-gray-400">
                  <Globe size={20} />
                </div>
              )}
              <label className="cursor-pointer">
                <Input 
                  id="favicon" 
                  type="file" 
                  className="hidden"
                  accept="image/*"
                  onChange={handleFaviconUpload}
                  disabled={isUploading}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload Favicon"}
                </Button>
              </label>
            </div>
            <p className="text-xs text-gray-500">Recommended size: 32x32 pixels, PNG or ICO format.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ogImage">Social Media Image</Label>
            <div className="flex items-center gap-3">
              {localSEO.ogImage ? (
                <div className="w-24 h-24 rounded border flex items-center justify-center overflow-hidden bg-gray-50">
                  <img 
                    src={localSEO.ogImage} 
                    alt="OG Image" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded border flex items-center justify-center bg-gray-50 text-gray-400">
                  <Image size={32} />
                </div>
              )}
              <label className="cursor-pointer">
                <Input 
                  id="ogImage" 
                  type="file" 
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setLocalSEO({
                        ...localSEO,
                        ogImage: reader.result as string
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <Button type="button" variant="outline" size="sm">
                  Upload Image
                </Button>
              </label>
            </div>
            <p className="text-xs text-gray-500">Recommended size: 1200x630 pixels for optimal display on social media platforms.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input 
              id="keywords" 
              value={localSEO.keywords} 
              onChange={(e) => setLocalSEO({ ...localSEO, keywords: e.target.value })}
              placeholder="website, portfolio, business (comma separated)"
            />
            <p className="text-xs text-gray-500">Comma-separated keywords related to your website.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input 
              id="author" 
              value={localSEO.author} 
              onChange={(e) => setLocalSEO({ ...localSEO, author: e.target.value })}
              placeholder="Your Name or Organization"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Settings
        </Button>
      </div>
      
      <Card className="mt-6 p-4 border-dashed">
        <h3 className="text-sm font-medium mb-2">Preview</h3>
        <div className="space-y-1 text-sm">
          <p className="text-blue-600 font-medium truncate">{localSEO.title || "My Website"}</p>
          <p className="text-green-700 text-xs truncate">https://yourwebsite.com</p>
          <p className="text-gray-600 text-xs line-clamp-2">{localSEO.description || "A website built with the Website Builder"}</p>
        </div>
      </Card>
    </div>
  );
};

export default SEOSettings;
