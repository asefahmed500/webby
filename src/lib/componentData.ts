
import { Component } from "@/context/BuilderContext";
import { Template } from "@/context/BuilderContext";

// Define all available component types
export const componentTypes = [
  { type: "text", label: "Text", icon: "text" },
  { type: "heading", label: "Heading", icon: "heading-1" },
  { type: "button", label: "Button", icon: "square" },
  { type: "image", label: "Image", icon: "image" },
  { type: "container", label: "Container", icon: "panel-right" },
  { type: "card", label: "Card", icon: "square" },
  { type: "navigation", label: "Navigation", icon: "menu" },
  { type: "footer", label: "Footer", icon: "panel-bottom" },
  { type: "divider", label: "Divider", icon: "minus" },
  { type: "input", label: "Input", icon: "form-input" },
  { type: "form", label: "Form", icon: "file-text" },
  { type: "testimonial", label: "Testimonial", icon: "quote" },
  { type: "pricing", label: "Pricing Table", icon: "badge-dollar-sign" }
];

// Create some prebuilt template components
const generateId = () => `component-${Math.random().toString(36).substr(2, 9)}`;

// Hero Section Components
const heroSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "80px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
      color: "#ffffff",
      minHeight: "500px"
    },
    children: [
      {
        id: generateId(),
        type: "heading",
        content: "Welcome to Our Website",
        styles: {
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center"
        },
        children: []
      },
      {
        id: generateId(),
        type: "text",
        content: "We provide the best solutions for your business needs",
        styles: {
          fontSize: "24px",
          marginBottom: "40px",
          maxWidth: "800px",
          textAlign: "center"
        },
        children: []
      },
      {
        id: generateId(),
        type: "button",
        content: "Get Started",
        styles: {
          backgroundColor: "#ffffff",
          color: "#333333",
          padding: "12px 24px",
          borderRadius: "4px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        },
        children: []
      }
    ]
  }
];

// Features Section Components
const featuresSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "80px 20px",
      backgroundColor: "#ffffff"
    },
    children: [
      {
        id: generateId(),
        type: "heading",
        content: "Our Features",
        styles: {
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center"
        },
        children: []
      },
      {
        id: generateId(),
        type: "container",
        content: "",
        styles: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px"
        },
        children: [
          {
            id: generateId(),
            type: "card",
            content: "",
            styles: {
              width: "300px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f9fa"
            },
            children: [
              {
                id: generateId(),
                type: "heading",
                content: "Feature 1",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                styles: {
                  marginBottom: "20px"
                },
                children: []
              }
            ]
          },
          {
            id: generateId(),
            type: "card",
            content: "",
            styles: {
              width: "300px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f9fa"
            },
            children: [
              {
                id: generateId(),
                type: "heading",
                content: "Feature 2",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                styles: {
                  marginBottom: "20px"
                },
                children: []
              }
            ]
          },
          {
            id: generateId(),
            type: "card",
            content: "",
            styles: {
              width: "300px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f9fa"
            },
            children: [
              {
                id: generateId(),
                type: "heading",
                content: "Feature 3",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                styles: {
                  marginBottom: "20px"
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

// Testimonial Section Components
const testimonialSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "80px 20px",
      backgroundColor: "#f7f9fc"
    },
    children: [
      {
        id: generateId(),
        type: "heading",
        content: "What Our Customers Say",
        styles: {
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center"
        },
        children: []
      },
      {
        id: generateId(),
        type: "container",
        content: "",
        styles: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px"
        },
        children: [
          {
            id: generateId(),
            type: "testimonial",
            content: "",
            styles: {
              width: "350px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff"
            },
            children: [
              {
                id: generateId(),
                type: "text",
                content: "\"This service has completely transformed our business operations. We couldn't be happier with the results!\"",
                styles: {
                  fontSize: "18px",
                  fontStyle: "italic",
                  marginBottom: "20px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "John Doe, CEO",
                styles: {
                  fontWeight: "bold"
                },
                children: []
              }
            ]
          },
          {
            id: generateId(),
            type: "testimonial",
            content: "",
            styles: {
              width: "350px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff"
            },
            children: [
              {
                id: generateId(),
                type: "text",
                content: "\"The team was incredibly responsive and helped us achieve our goals in record time.\"",
                styles: {
                  fontSize: "18px",
                  fontStyle: "italic",
                  marginBottom: "20px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "Jane Smith, Marketing Director",
                styles: {
                  fontWeight: "bold"
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

// Pricing Section Components
const pricingSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "80px 20px",
      backgroundColor: "#ffffff"
    },
    children: [
      {
        id: generateId(),
        type: "heading",
        content: "Our Pricing Plans",
        styles: {
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center"
        },
        children: []
      },
      {
        id: generateId(),
        type: "pricing",
        content: "",
        styles: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px"
        },
        children: [
          {
            id: generateId(),
            type: "card",
            content: "",
            styles: {
              width: "300px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f9fa",
              textAlign: "center"
            },
            children: [
              {
                id: generateId(),
                type: "heading",
                content: "Basic Plan",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "heading",
                content: "$19/month",
                styles: {
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#4a6cf7"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "For individuals and small teams",
                styles: {
                  marginBottom: "20px",
                  color: "#666"
                },
                children: []
              },
              {
                id: generateId(),
                type: "button",
                content: "Get Started",
                styles: {
                  backgroundColor: "#4a6cf7",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none"
                },
                children: []
              }
            ]
          },
          {
            id: generateId(),
            type: "card",
            content: "",
            styles: {
              width: "300px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(74, 108, 247, 0.3)",
              backgroundColor: "#ffffff",
              textAlign: "center",
              border: "2px solid #4a6cf7"
            },
            children: [
              {
                id: generateId(),
                type: "heading",
                content: "Pro Plan",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "heading",
                content: "$49/month",
                styles: {
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#4a6cf7"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "For growing businesses",
                styles: {
                  marginBottom: "20px",
                  color: "#666"
                },
                children: []
              },
              {
                id: generateId(),
                type: "button",
                content: "Get Started",
                styles: {
                  backgroundColor: "#4a6cf7",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none"
                },
                children: []
              }
            ]
          },
          {
            id: generateId(),
            type: "card",
            content: "",
            styles: {
              width: "300px",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f9fa",
              textAlign: "center"
            },
            children: [
              {
                id: generateId(),
                type: "heading",
                content: "Enterprise",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "15px"
                },
                children: []
              },
              {
                id: generateId(),
                type: "heading",
                content: "$99/month",
                styles: {
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#4a6cf7"
                },
                children: []
              },
              {
                id: generateId(),
                type: "text",
                content: "For large organizations",
                styles: {
                  marginBottom: "20px",
                  color: "#666"
                },
                children: []
              },
              {
                id: generateId(),
                type: "button",
                content: "Contact Us",
                styles: {
                  backgroundColor: "#4a6cf7",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none"
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

// Contact Form Section
const contactSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "80px 20px",
      backgroundColor: "#f7f9fc"
    },
    children: [
      {
        id: generateId(),
        type: "heading",
        content: "Contact Us",
        styles: {
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center"
        },
        children: []
      },
      {
        id: generateId(),
        type: "form",
        content: "",
        styles: {
          maxWidth: "600px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff"
        },
        children: [
          {
            id: generateId(),
            type: "input",
            content: "Your Name",
            styles: {
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ddd"
            },
            children: []
          },
          {
            id: generateId(),
            type: "input",
            content: "Your Email",
            styles: {
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ddd"
            },
            children: []
          },
          {
            id: generateId(),
            type: "input",
            content: "Your Message",
            styles: {
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              minHeight: "100px"
            },
            children: []
          },
          {
            id: generateId(),
            type: "button",
            content: "Send Message",
            styles: {
              backgroundColor: "#4a6cf7",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              width: "100%"
            },
            children: []
          }
        ]
      }
    ]
  }
];

// Export templates array
export const templates: Template[] = [
  {
    id: "hero-section",
    name: "Hero Section",
    thumbnail: "layout-dashboard",
    components: heroSection
  },
  {
    id: "features-section",
    name: "Features Section",
    thumbnail: "layout-list",
    components: featuresSection
  },
  {
    id: "testimonial-section",
    name: "Testimonials",
    thumbnail: "quote",
    components: testimonialSection
  },
  {
    id: "pricing-section",
    name: "Pricing Table",
    thumbnail: "badge-dollar-sign",
    components: pricingSection
  },
  {
    id: "contact-section",
    name: "Contact Form",
    thumbnail: "mail",
    components: contactSection
  }
];
