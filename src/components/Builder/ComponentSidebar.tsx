
import { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { componentTypes, templates } from "@/lib/componentData";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Album,
  Plus,
  PanelRight,
  Text,
  Image,
  ButtonSquare,
  Heading1,
  Minus
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "panel-right": <PanelRight className="h-4 w-4" />,
  "text": <Text className="h-4 w-4" />,
  "image": <Image className="h-4 w-4" />,
  "button": <ButtonSquare className="h-4 w-4" />,
  "heading-1": <Heading1 className="h-4 w-4" />,
  "minus": <Minus className="h-4 w-4" />,
};

const ComponentSidebar = () => {
  const { setDraggedComponent } = useBuilder();
  const [activeTab, setActiveTab] = useState("components");

  const handleDragStart = (componentType: string) => {
    setDraggedComponent(componentType);
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white h-full overflow-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Elements</h2>
      </div>
      
      <Tabs defaultValue="components" className="w-full" onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="components" className="text-xs">
              <Plus className="h-4 w-4 mr-1" />
              Components
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-xs">
              <Album className="h-4 w-4 mr-1" />
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="components" className="mt-0 space-y-0">
          <div className="grid grid-cols-2 gap-2 p-4">
            {componentTypes.map((component) => (
              <div
                key={component.type}
                draggable
                onDragStart={() => handleDragStart(component.type)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-md border border-gray-200",
                  "hover:border-blue-500 hover:bg-blue-50 cursor-grab transition-colors"
                )}
              >
                {iconMap[component.icon] || <div className="h-6 w-6 bg-gray-200 rounded" />}
                <span className="mt-2 text-xs text-gray-600">{component.label}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-0 space-y-0">
          <div className="grid grid-cols-1 gap-4 p-4">
            {templates.map((template) => (
              <div
                key={template.id}
                draggable
                onDragStart={() => handleDragStart(`template:${template.id}`)}
                className={cn(
                  "p-3 rounded-md border border-gray-200",
                  "hover:border-blue-500 hover:bg-blue-50 cursor-grab transition-colors"
                )}
              >
                <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center mb-2">
                  {iconMap[template.thumbnail] || <div className="h-10 w-10" />}
                </div>
                <h3 className="text-sm font-medium">{template.name}</h3>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentSidebar;
