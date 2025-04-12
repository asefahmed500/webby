
import { BuilderProvider } from "@/context/BuilderContext";
import ComponentSidebar from "@/components/Builder/ComponentSidebar";
import PropertyEditor from "@/components/Builder/PropertyEditor";
import Canvas from "@/components/Builder/Canvas";
import Toolbar from "@/components/Builder/Toolbar";

const Index = () => {
  return (
    <BuilderProvider>
      <div className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <ComponentSidebar />
          <Canvas />
          <PropertyEditor />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default Index;
