
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const PreviewMode = () => {
  const { previewMode, setPreviewMode } = useBuilder();

  return (
    <Button
      variant={previewMode ? "default" : "outline"}
      size="sm"
      onClick={() => setPreviewMode(!previewMode)}
      className="gap-2"
    >
      {previewMode ? (
        <>
          <EyeOff className="h-4 w-4" />
          Exit Preview
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          Preview
        </>
      )}
    </Button>
  );
};

export default PreviewMode;
