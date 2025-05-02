
import { useState, useEffect } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PropertyEditor = () => {
  const { selectedComponent, updateComponent, removeComponent } = useBuilder();
  const [content, setContent] = useState("");
  const [styles, setStyles] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedComponent) {
      setContent(selectedComponent.content || "");
      setStyles(selectedComponent.styles || {});
    }
  }, [selectedComponent]);

  if (!selectedComponent) {
    return (
      <div className="w-64 border-l border-gray-200 bg-white h-full p-4 flex items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          Select a component to edit its properties
        </p>
      </div>
    );
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateComponent(selectedComponent.id, { content: e.target.value });
  };

  const handleStyleChange = (property: string, value: string) => {
    const updatedStyles = { ...styles, [property]: value };
    setStyles(updatedStyles);
    updateComponent(selectedComponent.id, { styles: updatedStyles });
  };

  const handleDelete = () => {
    if (selectedComponent) {
      removeComponent(selectedComponent.id);
    }
  };

  // Fix the z-index and positioning to prevent flickering
  const renderContentEditor = () => {
    switch (selectedComponent.type) {
      case "text":
      case "heading":
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Text</Label>
              {selectedComponent.content && selectedComponent.content.includes('\n') ? (
                <Textarea
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                  className="min-h-[100px]"
                />
              ) : (
                <Input
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                />
              )}
            </div>
          </div>
        );
      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                placeholder="https://example.com/image.jpg"
                value={content}
                onChange={handleContentChange}
              />
            </div>
          </div>
        );
      case "input":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="placeholder">Placeholder Text</Label>
              <Input
                id="placeholder"
                value={content}
                onChange={handleContentChange}
                placeholder="Enter placeholder text"
              />
            </div>
          </div>
        );
      default:
        if (selectedComponent.type === "container" || 
            selectedComponent.type === "card" || 
            selectedComponent.type === "navigation" || 
            selectedComponent.type === "footer" ||
            selectedComponent.type === "form" ||
            selectedComponent.type === "testimonial" ||
            selectedComponent.type === "pricing") {
          return (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                This is a container element. Add components to it by dragging them here.
              </p>
              <p className="text-xs text-blue-600">
                {selectedComponent.children.length} child components
              </p>
            </div>
          );
        }
        return null;
    }
  };

  // Define style properties based on component type
  const getStyleFields = () => {
    const commonStyles = [
      { label: "Width", property: "width" },
      { label: "Height", property: "height" },
      { label: "Padding", property: "padding" },
      { label: "Margin", property: "margin" },
      { label: "Background Color", property: "backgroundColor" },
    ];
    
    const textStyles = [
      { label: "Text Color", property: "color" },
      { label: "Font Size", property: "fontSize" },
      { label: "Font Weight", property: "fontWeight" },
      { label: "Text Align", property: "textAlign" },
      { label: "Line Height", property: "lineHeight" },
    ];
    
    const borderStyles = [
      { label: "Border", property: "border" },
      { label: "Border Radius", property: "borderRadius" },
      { label: "Box Shadow", property: "boxShadow" },
    ];
    
    const layoutStyles = [
      { label: "Display", property: "display" },
      { label: "Flex Direction", property: "flexDirection" },
      { label: "Justify Content", property: "justifyContent" },
      { label: "Align Items", property: "alignItems" },
      { label: "Gap", property: "gap" },
    ];

    const formStyles = [
      { label: "Border", property: "border" },
      { label: "Border Radius", property: "borderRadius" },
      { label: "Box Shadow", property: "boxShadow" },
      { label: "Max Width", property: "maxWidth" },
    ];
    
    // Return different style fields based on component type
    switch (selectedComponent.type) {
      case "text":
      case "heading":
        return [...textStyles, ...commonStyles];
      case "button":
        return [...textStyles, ...borderStyles, ...commonStyles];
      case "container":
      case "navigation":
      case "footer":
      case "card":
        return [...layoutStyles, ...borderStyles, ...commonStyles];
      case "image":
        return [...borderStyles, ...commonStyles];
      case "input":
        return [...textStyles, ...borderStyles, ...commonStyles];
      case "form":
      case "testimonial":
      case "pricing":
        return [...formStyles, ...commonStyles, ...layoutStyles];
      default:
        return commonStyles;
    }
  };

  return (
    <div className="w-64 border-l border-gray-200 bg-white h-full overflow-auto fixed right-0 top-0 bottom-0 z-50">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium">Properties</h2>
        <button 
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-2 bg-blue-50 border-b border-blue-100 text-xs text-blue-700">
        Component Type: {selectedComponent.type}
      </div>

      <Tabs defaultValue="content" className="w-full">
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="p-4 space-y-4">
          {renderContentEditor()}
        </TabsContent>

        <TabsContent value="style" className="p-4 space-y-4 pb-24">
          {getStyleFields().map((style) => (
            <div key={style.property}>
              <Label htmlFor={style.property}>{style.label}</Label>
              <Input
                id={style.property}
                value={styles[style.property] || ""}
                onChange={(e) => handleStyleChange(style.property, e.target.value)}
                placeholder={style.property === "backgroundColor" ? "#ffffff" : ""}
              />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyEditor;
