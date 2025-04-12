
export interface ComponentDefinition {
  type: string;
  label: string;
  icon: string;
  defaultStyles?: Record<string, string>;
}

export const componentTypes: ComponentDefinition[] = [
  {
    type: "container",
    label: "Container",
    icon: "panel-right",
    defaultStyles: {
      padding: "1rem",
      margin: "0.5rem",
      border: "1px dashed #e5e7eb",
      minHeight: "100px",
    },
  },
  {
    type: "text",
    label: "Text",
    icon: "text",
    defaultStyles: {
      fontSize: "1rem",
      color: "#374151",
      margin: "0.5rem 0",
    },
  },
  {
    type: "heading",
    label: "Heading",
    icon: "heading-1",
    defaultStyles: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#111827",
      margin: "1rem 0 0.5rem 0",
    },
  },
  {
    type: "image",
    label: "Image",
    icon: "image",
    defaultStyles: {
      width: "100%",
      maxWidth: "300px",
      height: "auto",
    },
  },
  {
    type: "button",
    label: "Button",
    icon: "button",
    defaultStyles: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
    },
  },
  {
    type: "divider",
    label: "Divider",
    icon: "minus",
    defaultStyles: {
      width: "100%",
      height: "1px",
      backgroundColor: "#e5e7eb",
      margin: "1rem 0",
    },
  },
];

export const templates = [
  {
    id: "template-1",
    name: "Hero Section",
    thumbnail: "panel-right", // Using an icon name temporarily
    components: [
      {
        id: "hero-container",
        type: "container",
        content: "",
        styles: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 1rem",
          backgroundColor: "#f9fafb",
          textAlign: "center",
        },
        children: [
          {
            id: "hero-heading",
            type: "heading",
            content: "Welcome to your website",
            styles: {
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: "#111827",
            },
            children: [],
          },
          {
            id: "hero-text",
            type: "text",
            content: "This is a sample hero section. Edit the content to match your needs.",
            styles: {
              fontSize: "1.125rem",
              maxWidth: "600px",
              marginBottom: "2rem",
              color: "#4b5563",
            },
            children: [],
          },
          {
            id: "hero-button",
            type: "button",
            content: "Get Started",
            styles: {
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            children: [],
          },
        ],
      },
    ],
  },
];
