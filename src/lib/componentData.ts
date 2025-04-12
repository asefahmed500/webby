
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
    icon: "square",
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
  {
    type: "navigation",
    label: "Navigation",
    icon: "menu",
    defaultStyles: {
      width: "100%",
      display: "flex",
      padding: "1rem",
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
  },
  {
    type: "card",
    label: "Card",
    icon: "square",
    defaultStyles: {
      padding: "1rem",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
      margin: "1rem 0",
    },
  },
  {
    type: "footer",
    label: "Footer",
    icon: "panel-bottom",
    defaultStyles: {
      width: "100%",
      padding: "2rem 1rem",
      backgroundColor: "#f9fafb",
      marginTop: "2rem",
      textAlign: "center",
    },
  },
];

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  components: any[];
}

export const templates: Template[] = [
  {
    id: "template-hero",
    name: "Hero Section",
    thumbnail: "layout-dashboard",
    components: [
      {
        id: "hero-container",
        type: "container",
        content: "",
        styles: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "5rem 1rem",
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
  {
    id: "template-features",
    name: "Features Section",
    thumbnail: "layout-list",
    components: [
      {
        id: "features-container",
        type: "container",
        content: "",
        styles: {
          padding: "4rem 1rem",
          backgroundColor: "#ffffff",
        },
        children: [
          {
            id: "features-heading",
            type: "heading",
            content: "Features",
            styles: {
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "3rem",
              color: "#111827",
            },
            children: [],
          },
          {
            id: "features-row",
            type: "container",
            content: "",
            styles: {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
            },
            children: [
              {
                id: "feature-1",
                type: "card",
                content: "",
                styles: {
                  width: "300px",
                  padding: "1.5rem",
                  textAlign: "center",
                },
                children: [
                  {
                    id: "feature-1-heading",
                    type: "heading",
                    content: "Feature 1",
                    styles: {
                      fontSize: "1.25rem",
                      marginBottom: "0.75rem",
                    },
                    children: [],
                  },
                  {
                    id: "feature-1-text",
                    type: "text",
                    content: "Description of your first amazing feature. Explain what makes it special.",
                    styles: {
                      color: "#6b7280",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "feature-2",
                type: "card",
                content: "",
                styles: {
                  width: "300px",
                  padding: "1.5rem",
                  textAlign: "center",
                },
                children: [
                  {
                    id: "feature-2-heading",
                    type: "heading",
                    content: "Feature 2",
                    styles: {
                      fontSize: "1.25rem",
                      marginBottom: "0.75rem",
                    },
                    children: [],
                  },
                  {
                    id: "feature-2-text",
                    type: "text",
                    content: "Description of your second amazing feature. Explain what makes it special.",
                    styles: {
                      color: "#6b7280",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "feature-3",
                type: "card",
                content: "",
                styles: {
                  width: "300px",
                  padding: "1.5rem",
                  textAlign: "center",
                },
                children: [
                  {
                    id: "feature-3-heading",
                    type: "heading",
                    content: "Feature 3",
                    styles: {
                      fontSize: "1.25rem",
                      marginBottom: "0.75rem",
                    },
                    children: [],
                  },
                  {
                    id: "feature-3-text",
                    type: "text",
                    content: "Description of your third amazing feature. Explain what makes it special.",
                    styles: {
                      color: "#6b7280",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "template-cta",
    name: "Call to Action",
    thumbnail: "megaphone",
    components: [
      {
        id: "cta-container",
        type: "container",
        content: "",
        styles: {
          padding: "4rem 1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          textAlign: "center",
        },
        children: [
          {
            id: "cta-heading",
            type: "heading",
            content: "Ready to get started?",
            styles: {
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "white",
            },
            children: [],
          },
          {
            id: "cta-text",
            type: "text",
            content: "Sign up now and start using our amazing product.",
            styles: {
              fontSize: "1.125rem",
              marginBottom: "2rem",
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            },
            children: [],
          },
          {
            id: "cta-button",
            type: "button",
            content: "Sign Up Now",
            styles: {
              backgroundColor: "white",
              color: "#3b82f6",
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
  {
    id: "template-navigation",
    name: "Navigation Bar",
    thumbnail: "menu",
    components: [
      {
        id: "nav-container",
        type: "navigation",
        content: "",
        styles: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        children: [
          {
            id: "nav-logo",
            type: "heading",
            content: "Your Logo",
            styles: {
              fontSize: "1.25rem",
              fontWeight: "bold",
              margin: "0",
            },
            children: [],
          },
          {
            id: "nav-links",
            type: "container",
            content: "",
            styles: {
              display: "flex",
              gap: "1.5rem",
            },
            children: [
              {
                id: "nav-link-1",
                type: "text",
                content: "Home",
                styles: {
                  color: "#3b82f6",
                  fontWeight: "500",
                  margin: "0",
                },
                children: [],
              },
              {
                id: "nav-link-2",
                type: "text",
                content: "Features",
                styles: {
                  color: "#4b5563",
                  margin: "0",
                },
                children: [],
              },
              {
                id: "nav-link-3",
                type: "text",
                content: "About",
                styles: {
                  color: "#4b5563",
                  margin: "0",
                },
                children: [],
              },
              {
                id: "nav-link-4",
                type: "text",
                content: "Contact",
                styles: {
                  color: "#4b5563",
                  margin: "0",
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "template-footer",
    name: "Footer",
    thumbnail: "panel-bottom",
    components: [
      {
        id: "footer-container",
        type: "footer",
        content: "",
        styles: {
          padding: "3rem 1rem",
          backgroundColor: "#1f2937",
          color: "white",
        },
        children: [
          {
            id: "footer-content",
            type: "container",
            content: "",
            styles: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            },
            children: [
              {
                id: "footer-logo",
                type: "heading",
                content: "Your Company",
                styles: {
                  fontSize: "1.5rem",
                  color: "white",
                  marginBottom: "1rem",
                },
                children: [],
              },
              {
                id: "footer-links",
                type: "container",
                content: "",
                styles: {
                  display: "flex",
                  gap: "2rem",
                  marginBottom: "1.5rem",
                },
                children: [
                  {
                    id: "footer-link-1",
                    type: "text",
                    content: "Home",
                    styles: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    children: [],
                  },
                  {
                    id: "footer-link-2",
                    type: "text",
                    content: "About",
                    styles: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    children: [],
                  },
                  {
                    id: "footer-link-3",
                    type: "text",
                    content: "Services",
                    styles: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    children: [],
                  },
                  {
                    id: "footer-link-4",
                    type: "text",
                    content: "Contact",
                    styles: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "footer-copyright",
                type: "text",
                content: "© 2023 Your Company. All rights reserved.",
                styles: {
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.875rem",
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "template-pricing",
    name: "Pricing Table",
    thumbnail: "wallet",
    components: [
      {
        id: "pricing-container",
        type: "container",
        content: "",
        styles: {
          padding: "4rem 1rem",
          backgroundColor: "#f9fafb",
        },
        children: [
          {
            id: "pricing-heading",
            type: "heading",
            content: "Pricing Plans",
            styles: {
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "1rem",
              color: "#111827",
            },
            children: [],
          },
          {
            id: "pricing-subheading",
            type: "text",
            content: "Choose the perfect plan for your needs",
            styles: {
              fontSize: "1.125rem",
              textAlign: "center",
              marginBottom: "3rem",
              color: "#6b7280",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            },
            children: [],
          },
          {
            id: "pricing-plans",
            type: "container",
            content: "",
            styles: {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
            },
            children: [
              {
                id: "pricing-basic",
                type: "card",
                content: "",
                styles: {
                  width: "300px",
                  padding: "2rem",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "white",
                },
                children: [
                  {
                    id: "plan-basic-name",
                    type: "heading",
                    content: "Basic",
                    styles: {
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-basic-price",
                    type: "heading",
                    content: "$9/month",
                    styles: {
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "1.5rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-basic-features",
                    type: "text",
                    content: "Basic features\n5 projects\n1GB storage\nBasic support",
                    styles: {
                      whiteSpace: "pre-line",
                      lineHeight: "2",
                      marginBottom: "2rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-basic-button",
                    type: "button",
                    content: "Get Started",
                    styles: {
                      width: "100%",
                      backgroundColor: "#e5e7eb",
                      color: "#374151",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "pricing-pro",
                type: "card",
                content: "",
                styles: {
                  width: "300px",
                  padding: "2rem",
                  textAlign: "center",
                  border: "2px solid #3b82f6",
                  backgroundColor: "white",
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                },
                children: [
                  {
                    id: "plan-pro-name",
                    type: "heading",
                    content: "Pro",
                    styles: {
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-pro-price",
                    type: "heading",
                    content: "$29/month",
                    styles: {
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "1.5rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-pro-features",
                    type: "text",
                    content: "All Basic features\n20 projects\n10GB storage\nPriority support\nAdvanced analytics",
                    styles: {
                      whiteSpace: "pre-line",
                      lineHeight: "2",
                      marginBottom: "2rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-pro-button",
                    type: "button",
                    content: "Get Started",
                    styles: {
                      width: "100%",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                    },
                    children: [],
                  },
                ],
              },
              {
                id: "pricing-enterprise",
                type: "card",
                content: "",
                styles: {
                  width: "300px",
                  padding: "2rem",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "white",
                },
                children: [
                  {
                    id: "plan-enterprise-name",
                    type: "heading",
                    content: "Enterprise",
                    styles: {
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-enterprise-price",
                    type: "heading",
                    content: "$99/month",
                    styles: {
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "1.5rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-enterprise-features",
                    type: "text",
                    content: "All Pro features\nUnlimited projects\n100GB storage\n24/7 dedicated support\nCustom integrations",
                    styles: {
                      whiteSpace: "pre-line",
                      lineHeight: "2",
                      marginBottom: "2rem",
                    },
                    children: [],
                  },
                  {
                    id: "plan-enterprise-button",
                    type: "button",
                    content: "Contact Us",
                    styles: {
                      width: "100%",
                      backgroundColor: "#e5e7eb",
                      color: "#374151",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
