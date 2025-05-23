
import React, { useState, useEffect } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { componentTypes, componentCategories, templates } from "@/lib/componentData";
import { layoutTemplates } from "@/lib/layoutComponents"; 
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Album,
  Plus,
  PanelRight,
  Text,
  Image,
  Square,
  Heading1,
  Minus,
  Menu,
  PanelBottom,
  LayoutDashboard,
  LayoutList,
  Megaphone,
  Wallet,
  FileText,
  FormInput,
  Quote,
  BadgeDollarSign,
  Lock,
  UserPlus,
  Mail,
  ShoppingBag,
  CreditCard,
  Users,
  Rocket,
  Home,
  CalendarClock,
  Utensils,
  GraduationCap,
  Navigation,
  Layout,
  Grid,
  Sidebar as SidebarIcon,
  ChevronUp,
  Languages
} from "lucide-react";

// Define template types to avoid TypeScript errors
interface LayoutTemplate {
  id: string;
  name: string;
  icon: React.ForwardRefExoticComponent<any>;
  description: string;
}

interface StandardTemplate {
  id: string;
  name: string;
  category?: string;
  description: string;
  thumbnail: string;
  components: any[];
}

type TemplateItem = StandardTemplate | LayoutTemplate;

// Helper function to check if template has a thumbnail (StandardTemplate)
const hasStandardTemplateProps = (template: TemplateItem): template is StandardTemplate => {
  return 'thumbnail' in template && 'category' in template;
};

const iconMap: Record<string, React.ReactNode> = {
  "panel-right": <PanelRight className="h-4 w-4" />,
  "text": <Text className="h-4 w-4" />,
  "image": <Image className="h-4 w-4" />,
  "square": <Square className="h-4 w-4" />,
  "heading-1": <Heading1 className="h-4 w-4" />,
  "minus": <Minus className="h-4 w-4" />,
  "menu": <Menu className="h-4 w-4" />,
  "panel-bottom": <PanelBottom className="h-4 w-4" />,
  "layout-dashboard": <LayoutDashboard className="h-4 w-4" />,
  "layout-list": <LayoutList className="h-4 w-4" />,
  "megaphone": <Megaphone className="h-4 w-4" />,
  "wallet": <Wallet className="h-4 w-4" />,
  "file-text": <FileText className="h-4 w-4" />,
  "form-input": <FormInput className="h-4 w-4" />,
  "quote": <Quote className="h-4 w-4" />,
  "badge-dollar-sign": <BadgeDollarSign className="h-4 w-4" />,
  "lock": <Lock className="h-4 w-4" />,
  "user-plus": <UserPlus className="h-4 w-4" />,
  "mail": <Mail className="h-4 w-4" />,
  "shopping-bag": <ShoppingBag className="h-4 w-4" />,
  "credit-card": <CreditCard className="h-4 w-4" />,
  "users": <Users className="h-4 w-4" />,
  "rocket": <Rocket className="h-4 w-4" />,
  "home": <Home className="h-4 w-4" />,
  "calendar": <CalendarClock className="h-4 w-4" />,
  "utensils": <Utensils className="h-4 w-4" />,
  "graduation-cap": <GraduationCap className="h-4 w-4" />,
  "navigation": <Navigation className="h-4 w-4" />,
  "layout": <Layout className="h-4 w-4" />,
  "grid": <Grid className="h-4 w-4" />,
  "sidebar": <SidebarIcon className="h-4 w-4" />,
  "chevron-up": <ChevronUp className="h-4 w-4" />,
  "languages": <Languages className="h-4 w-4" />,
  "footer": <PanelBottom className="h-4 w-4" />
};

const ComponentSidebar = () => {
  const { setDraggedComponent } = useBuilder();
  const [activeTab, setActiveTab] = useState("components");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleDragStart = (componentType: string) => {
    setDraggedComponent(componentType);
  };

  // Combine all templates for filtering
  const allTemplates: TemplateItem[] = [...templates, ...layoutTemplates as LayoutTemplate[]];

  // Filter templates based on search term
  const filteredTemplates = allTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (template.description && template.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get unique categories from all templates
  const getCategories = () => {
    const categories = ["all"];
    
    allTemplates.forEach(template => {
      let category = "other";
      
      if (hasStandardTemplateProps(template) && template.category) {
        category = template.category;
      } else {
        // For layout templates without category, infer from ID
        if (template.id.includes("hero")) category = "hero";
        else if (template.id.includes("feature")) category = "features";
        else if (template.id.includes("testimonial")) category = "testimonials";
        else if (template.id.includes("pricing")) category = "pricing";
        else if (template.id.includes("contact")) category = "contact";
        else if (template.id.includes("team")) category = "team";
        else if (template.id.includes("cta")) category = "cta";
        else if (template.id.includes("footer")) category = "footer";
        else if (template.id.includes("navbar")) category = "navigation";
        else if (template.id.includes("sidebar")) category = "sidebar";
      }
      
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    
    return categories;
  };

  const categories = getCategories();

  // Filter templates by category
  const categoryFilteredTemplates = selectedCategory === "all" 
    ? filteredTemplates 
    : filteredTemplates.filter(t => {
        let category = "";
        
        if (hasStandardTemplateProps(t) && t.category) {
          category = t.category;
        } else {
          // For layout templates, infer category from ID
          if (t.id.includes("hero")) category = "hero";
          else if (t.id.includes("feature")) category = "features";
          else if (t.id.includes("testimonial")) category = "testimonials";
          else if (t.id.includes("pricing")) category = "pricing";
          else if (t.id.includes("contact")) category = "contact";
          else if (t.id.includes("team")) category = "team";
          else if (t.id.includes("cta")) category = "cta";
          else if (t.id.includes("footer")) category = "footer";
          else if (t.id.includes("navbar")) category = "navigation";
          else if (t.id.includes("sidebar")) category = "sidebar";
          else category = "other";
        }
        
        return category === selectedCategory;
      });

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
          <div className="p-4">
            {/* Search input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category filters */}
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "text-xs px-2 py-1 rounded-md transition-colors",
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {categoryFilteredTemplates.map((template) => (
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
                    {hasStandardTemplateProps(template) 
                      ? (iconMap[template.thumbnail] || <div className="h-10 w-10" />)
                      : (template.icon && React.createElement(template.icon, { size: 24 }))
                    }
                  </div>
                  <h3 className="text-sm font-medium">{template.name}</h3>
                  {template.description && (
                    <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentSidebar;
