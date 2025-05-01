
import {
  LayoutDashboard,
  Type,
  Menu,
  Footer as FooterComp, // Rename to avoid conflict
} from "lucide-react";

export const layoutTemplates = [
  {
    id: "default-layout",
    name: "Default Layout",
    icon: <LayoutDashboard size={16} />,
    description: "Standard layout with header, content and footer",
  },
  {
    id: "landing-layout",
    name: "Landing Page",
    icon: <Type size={16} />,
    description: "Layout designed for landing pages",
  },
  {
    id: "dashboard-layout",
    name: "Dashboard Layout",
    icon: <Menu size={16} />,
    description: "Layout designed for admin dashboards",
  },
  {
    id: "blog-layout",
    name: "Blog Layout",
    icon: <FooterComp size={16} />,
    description: "Layout designed for blog posts",
  },
];
