
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Image, Upload, Loader2, X } from 'lucide-react';
import { storageService } from '@/lib/supabaseServices';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentUrl?: string;
}

const ImageUploader = ({ onImageSelect, currentUrl }: ImageUploaderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to upload images to storage.",
        variant: "destructive",
      });
      // Still use the local preview for demonstration purposes
      onImageSelect(objectUrl);
      setOpen(false);
      return;
    }
    
    setUploading(true);
    
    try {
      // Progress simulation
      let progressInterval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 95);
        });
      }, 200);
      
      const filePath = `user-uploads/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      const { data, error } = await storageService.uploadFile('website_assets', filePath, file);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (error) throw error;
      
      // Get the public URL for the uploaded file
      const imageUrl = storageService.getFileUrl('website_assets', filePath);
      
      onImageSelect(imageUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and selected.",
      });
      
      setOpen(false);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: error?.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      
      // Still use the local preview for now
      if (previewUrl) {
        onImageSelect(previewUrl);
      }
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  
  const clearSelection = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          {currentUrl ? "Change Image" : "Upload Image"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-4">
            {previewUrl ? (
              <div className="relative w-full">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="rounded-md max-h-[200px] mx-auto object-contain"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 bg-white/90"
                  onClick={clearSelection}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 w-full flex flex-col items-center justify-center bg-gray-50">
                <Image className="h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Click to select or drag and drop an image</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            
            {uploading && progress > 0 && (
              <div className="w-full">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">{Math.round(progress)}%</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            
            <Button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" /> {previewUrl ? "Select Another" : "Select Image"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
