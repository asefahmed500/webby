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

// Modern Hero Section
const modernHeroSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "100px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "linear-gradient(to right, #243949 0%, #517fa4 100%)",
      color: "#ffffff",
      minHeight: "600px",
      position: "relative",
      overflow: "hidden"
    },
    children: [
      {
        id: generateId(),
        type: "heading",
        content: "Innovate. Create. Succeed.",
        styles: {
          fontSize: "56px",
          fontWeight: "800",
          marginBottom: "24px",
          textAlign: "center",
          letterSpacing: "-0.02em"
        },
        children: []
      },
      {
        id: generateId(),
        type: "text",
        content: "Transform your ideas into reality with our powerful tools and expert guidance",
        styles: {
          fontSize: "24px",
          marginBottom: "48px",
          maxWidth: "700px",
          textAlign: "center",
          lineHeight: "1.6",
          opacity: "0.9"
        },
        children: []
      },
      {
        id: generateId(),
        type: "container",
        content: "",
        styles: {
          display: "flex",
          gap: "16px",
          justifyContent: "center"
        },
        children: [
          {
            id: generateId(),
            type: "button",
            content: "Get Started",
            styles: {
              backgroundColor: "#ffffff",
              color: "#333333",
              padding: "14px 28px",
              borderRadius: "6px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            },
            children: []
          },
          {
            id: generateId(),
            type: "button",
            content: "Learn More",
            styles: {
              backgroundColor: "transparent",
              color: "#ffffff",
              padding: "14px 28px",
              borderRadius: "6px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "1px solid #ffffff",
              transition: "background-color 0.2s ease"
            },
            children: []
          }
        ]
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

// Modern Features Section
const modernFeaturesSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "100px 20px",
      backgroundColor: "#ffffff"
    },
    children: [
      {
        id: generateId(),
        type: "container",
        content: "",
        styles: {
          maxWidth: "1200px",
          margin: "0 auto",
        },
        children: [
          {
            id: generateId(),
            type: "heading",
            content: "Why Choose Us",
            styles: {
              fontSize: "42px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
              color: "#333"
            },
            children: []
          },
          {
            id: generateId(),
            type: "text",
            content: "Discover the features that set us apart from the competition",
            styles: {
              fontSize: "20px",
              marginBottom: "60px",
              textAlign: "center",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto 60px"
            },
            children: []
          },
          {
            id: generateId(),
            type: "container",
            content: "",
            styles: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              justifyContent: "center"
            },
            children: [
              {
                id: generateId(),
                type: "card",
                content: "",
                styles: {
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#f8f9fa",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  border: "1px solid #eaeaea"
                },
                children: [
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Intuitive Design",
                    styles: {
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "16px",
                      color: "#333"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "text",
                    content: "Our user-friendly interface makes it easy to navigate and find exactly what you need, saving you time and frustration.",
                    styles: {
                      marginBottom: "24px",
                      color: "#666",
                      lineHeight: "1.6"
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
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#f8f9fa",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  border: "1px solid #eaeaea"
                },
                children: [
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Fast Performance",
                    styles: {
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "16px",
                      color: "#333"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "text",
                    content: "Lightning-fast load times and responsive interactions ensure a smooth experience across all devices.",
                    styles: {
                      marginBottom: "24px",
                      color: "#666",
                      lineHeight: "1.6"
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
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#f8f9fa",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  border: "1px solid #eaeaea"
                },
                children: [
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Reliable Support",
                    styles: {
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "16px",
                      color: "#333"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "text",
                    content: "Our dedicated team is available 24/7 to assist you with any questions or concerns you may have.",
                    styles: {
                      marginBottom: "24px",
                      color: "#666",
                      lineHeight: "1.6"
                    },
                    children: []
                  }
                ]
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

// Modern Testimonial Section 
const modernTestimonialSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "100px 20px",
      backgroundColor: "#f7f9fc"
    },
    children: [
      {
        id: generateId(),
        type: "container",
        content: "",
        styles: {
          maxWidth: "1200px",
          margin: "0 auto",
        },
        children: [
          {
            id: generateId(),
            type: "heading",
            content: "What Our Clients Say",
            styles: {
              fontSize: "42px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
              color: "#333"
            },
            children: []
          },
          {
            id: generateId(),
            type: "text",
            content: "Trusted by thousands of satisfied customers worldwide",
            styles: {
              fontSize: "20px",
              marginBottom: "60px",
              textAlign: "center",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto 60px"
            },
            children: []
          },
          {
            id: generateId(),
            type: "container",
            content: "",
            styles: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
              justifyContent: "center"
            },
            children: [
              {
                id: generateId(),
                type: "testimonial",
                content: "",
                styles: {
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#ffffff",
                  border: "1px solid #eaeaea"
                },
                children: [
                  {
                    id: generateId(),
                    type: "text",
                    content: "\"I've been using this service for over a year now, and it has completely transformed how my business operates. The platform is intuitive, powerful, and constantly improving.\"",
                    styles: {
                      fontSize: "18px",
                      fontStyle: "italic",
                      marginBottom: "24px",
                      lineHeight: "1.7",
                      color: "#444"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Sarah Johnson",
                    styles: {
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "4px"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "text",
                    content: "CEO, TechInnovate",
                    styles: {
                      fontWeight: "medium",
                      color: "#666"
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
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#ffffff",
                  border: "1px solid #eaeaea"
                },
                children: [
                  {
                    id: generateId(),
                    type: "text",
                    content: "\"The customer support team is phenomenal. They helped us implement complex features and were always available whenever we had questions.\"",
                    styles: {
                      fontSize: "18px",
                      fontStyle: "italic",
                      marginBottom: "24px",
                      lineHeight: "1.7",
                      color: "#444"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Michael Chen",
                    styles: {
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "4px"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "text",
                    content: "CTO, GrowthNow",
                    styles: {
                      fontWeight: "medium",
                      color: "#666"
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
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#ffffff",
                  border: "1px solid #eaeaea"
                },
                children: [
                  {
                    id: generateId(),
                    type: "text",
                    content: "\"We've seen a 200% increase in our productivity since implementing this solution. It's been a game-changer for our entire organization.\"",
                    styles: {
                      fontSize: "18px",
                      fontStyle: "italic",
                      marginBottom: "24px",
                      lineHeight: "1.7",
                      color: "#444"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Lisa Martinez",
                    styles: {
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "4px"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "text",
                    content: "Director, FastTrack Solutions",
                    styles: {
                      fontWeight: "medium",
                      color: "#666"
                    },
                    children: []
                  }
                ]
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

// Modern Pricing Section 
const modernPricingSection: Component[] = [
  {
    id: generateId(),
    type: "container",
    content: "",
    styles: {
      padding: "100px 20px",
      backgroundColor: "#ffffff"
    },
    children: [
      {
        id: generateId(),
        type: "container",
        content: "",
        styles: {
          maxWidth: "1200px",
          margin: "0 auto",
        },
        children: [
          {
            id: generateId(),
            type: "heading",
            content: "Simple, Transparent Pricing",
            styles: {
              fontSize: "42px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
              color: "#333"
            },
            children: []
          },
          {
            id: generateId(),
            type: "text",
            content: "Choose the plan that works best for your needs",
            styles: {
              fontSize: "20px",
              marginBottom: "60px",
              textAlign: "center",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto 60px"
            },
            children: []
          },
          {
            id: generateId(),
            type: "pricing",
            content: "",
            styles: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              justifyContent: "center"
            },
            children: [
              {
                id: generateId(),
                type: "card",
                content: "",
                styles: {
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#f8f9fa",
                  textAlign: "center",
                  border: "1px solid #eaeaea",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                },
                children: [
                  {
                    id: generateId(),
                    type: "heading",
                    content: "Starter",
                    styles: {
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                      color: "#333"
                    },
                    children: []
                  },
                  {
                    id: generateId(),
                    type: "heading",
                    content: "$29/month",
                    styles: {
                      fontSize: "36px",
                      fontWeight: "bold",
                      marginBottom: "24px",
                      color: "#4a6cf7"
                    },
                    children: []
                  },
                  {
                    id:
