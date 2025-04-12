
import { useState, useEffect } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

  const renderContentEditor = () => {
    switch (selectedComponent.type) {
      case "text":
      case "heading":
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Text</Label>
              <Input
                id="content"
                value={content}
                onChange={handleContentChange}
              />
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
      default:
        return null;
    }
  };

  const commonStyles = [
    { label: "Width", property: "width" },
    { label: "Height", property: "height" },
    { label: "Padding", property: "padding" },
    { label: "Margin", property: "margin" },
    { label: "Background Color", property: "backgroundColor" },
    { label: "Text Color", property: "color" },
    { label: "Border", property: "border" },
    { label: "Border Radius", property: "borderRadius" },
  ];

  return (
    <div className="w-64 border-l border-gray-200 bg-white h-full overflow-auto">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium">Properties</h2>
        <button 
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={16} />
        </button>
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

        <TabsContent value="style" className="p-4 space-y-4">
          {commonStyles.map((style) => (
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
