
import { useState } from "react";
import { componentTypes } from "@/lib/componentData";
import { cn } from "@/lib/utils";
import { useBuilder } from "@/context/BuilderContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ComponentLibrary = () => {
  const { addComponent } = useBuilder();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComponents = componentTypes.filter(component =>
    component.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Search components..."
        className="w-full p-2 border border-gray-200 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-2">
        {filteredComponents.map((component) => (
          <Button
            key={component.type}
            variant="outline"
            className={cn(
              "justify-start",
              "hover:border-blue-500 hover:bg-blue-50 transition-colors"
            )}
            onClick={() => addComponent(component.type)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {component.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;
