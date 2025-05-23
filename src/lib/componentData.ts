
import React from "react";
import {
  Type,
  Image,
  Box,
  Columns,
  LayoutGrid,
  SplitSquareVertical,
  Navigation,
  PanelBottom as FooterIcon,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Newspaper,
  MessageCircle,
  Users,
  Calendar,
  ShoppingBag,
  BookOpen
} from "lucide-react";
import type { Component } from "@/context/BuilderContext";

export interface StandardTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  components: Component[];
}

export const componentCategories = [
  {
    id: "layout",
    name: "Layout",
    components: [
      {
        id: "container",
        name: "Container",
        icon: Box,
        description: "A container element for grouping content",
      },
      {
        id: "columns",
        name: "Columns",
        icon: Columns,
        description: "Create multi-column layouts",
      },
      {
        id: "grid",
        name: "Grid",
        icon: LayoutGrid,
        description: "Arrange content in a grid layout",
      },
      {
        id: "divider",
        name: "Divider",
        icon: SplitSquareVertical,
        description: "Add horizontal dividers between sections",
      },
      {
        id: "navigation",
        name: "Navigation",
        icon: Navigation,
        description: "Add a navigation menu",
      },
      {
        id: "footer",
        name: "Footer",
        icon: FooterIcon,
        description: "Add a footer section",
      },
    ],
  },
  {
    id: "content",
    name: "Content",
    components: [
      {
        id: "text",
        name: "Text",
        icon: Type,
        description: "Add paragraph text",
      },
      {
        id: "heading",
        name: "Heading",
        icon: Type,
        description: "Add a heading",
      },
      {
        id: "image",
        name: "Image",
        icon: Image,
        description: "Insert an image",
      },
      {
        id: "button",
        name: "Button",
        icon: CreditCard,
        description: "Insert a button",
      },
    ],
  },
  {
    id: "forms",
    name: "Forms",
    components: [
      {
        id: "input",
        name: "Input Field",
        icon: Type,
        description: "Add a text input field",
      },
      {
        id: "form",
        name: "Form",
        icon: FileText,
        description: "Create a complete form",
      },
      {
        id: "contact",
        name: "Contact Form",
        icon: Mail,
        description: "Add a contact form",
      },
    ],
  },
  {
    id: "sections",
    name: "Sections",
    components: [
      {
        id: "hero",
        name: "Hero Section",
        icon: Box,
        description: "Add a hero section with title and CTA",
      },
      {
        id: "features",
        name: "Features",
        icon: LayoutGrid,
        description: "Display product/service features",
      },
      {
        id: "pricing",
        name: "Pricing",
        icon: CreditCard,
        description: "Show pricing tiers",
      },
      {
        id: "testimonial",
        name: "Testimonial",
        icon: MessageCircle,
        description: "Display customer testimonials",
      },
      {
        id: "team",
        name: "Team",
        icon: Users,
        description: "Show team members",
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized",
    components: [
      {
        id: "blog",
        name: "Blog Post",
        icon: Newspaper,
        description: "Create a blog post layout",
      },
      {
        id: "event",
        name: "Event",
        icon: Calendar,
        description: "Display event information",
      },
      {
        id: "product",
        name: "Product Card",
        icon: ShoppingBag,
        description: "Show product details",
      },
      {
        id: "course",
        name: "Course",
        icon: BookOpen,
        description: "Display course information",
      },
      {
        id: "cta",
        name: "Call to Action",
        icon: Phone,
        description: "Add a call to action section",
      },
    ],
  },
];

// Adding these missing exports for Canvas and ComponentSidebar
export const componentTypes = [
  { type: "heading", label: "Heading", icon: "heading-1" },
  { type: "text", label: "Text", icon: "text" },
  { type: "image", label: "Image", icon: "image" },
  { type: "button", label: "Button", icon: "square" },
  { type: "container", label: "Container", icon: "layout" },
  { type: "columns", label: "Columns", icon: "panel-right" },
  { type: "grid", label: "Grid", icon: "grid" },
  { type: "divider", label: "Divider", icon: "minus" },
  { type: "navigation", label: "Navigation", icon: "navigation" },
  { type: "footer", label: "Footer", icon: "panel-bottom" }
];

export const templates: StandardTemplate[] = [
  {
    id: "hero-section",
    name: "Hero Section",
    category: "hero",
    description: "A prominent banner section with title, subtitle and CTA",
    thumbnail: "layout-dashboard",
    components: []
  },
  {
    id: "feature-grid",
    name: "Feature Grid",
    category: "features",
    description: "Display features in a responsive grid",
    thumbnail: "grid",
    components: []
  },
  {
    id: "testimonial-slider",
    name: "Testimonial Slider",
    category: "testimonials",
    description: "Customer testimonials in a slider format",
    thumbnail: "quote",
    components: []
  },
  {
    id: "footer-simple",
    name: "Simple Footer",
    category: "footer",
    description: "A simple footer with links and copyright",
    thumbnail: "panel-bottom",
    components: []
  }
];
