
import { Component } from "@/context/BuilderContext";
import { Template } from "@/context/BuilderContext";

// Define all available component types
export const componentTypes = [
  { type: "text", label: "Text" },
  { type: "heading", label: "Heading" },
  { type: "button", label: "Button" },
  { type: "image", label: "Image" },
  { type: "container", label: "Container" },
  { type: "card", label: "Card" },
  { type: "navigation", label: "Navigation" },
  { type: "footer", label: "Footer" },
  { type: "divider", label: "Divider" },
  { type: "input", label: "Input" },
  { type: "form", label: "Form" },
  { type: "testimonial", label: "Testimonial" },
  { type: "pricing", label: "Pricing Table" }
];

// Create some prebuilt template components
const heroSection: Component[] = [
  {
    id: "component-hero-section",
    type: "container",
    content: "",
    styles: {
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
      color: "white",
      borderRadius: "0.5rem",
      gap: "2rem"
    },
    children: [
      {
        id: "component-hero-heading",
        type: "heading",
        content: "Welcome to Your Website",
        styles: {
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "white"
        },
        children: []
      },
      {
        id: "component-hero-text",
        type: "text",
        content: "Create beautiful websites with our drag-and-drop builder. No coding required.",
        styles: {
          fontSize: "1.25rem",
          maxWidth: "600px",
          marginBottom: "2rem",
          color: "rgba(255, 255, 255, 0.9)"
        },
        children: []
      },
      {
        id: "component-hero-button",
        type: "button",
        content: "Get Started",
        styles: {
          padding: "0.75rem 1.5rem",
          backgroundColor: "white",
          color: "#4F46E5",
          borderRadius: "0.375rem",
          fontWeight: "500",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer"
        },
        children: []
      }
    ]
  }
];

const featuresSection: Component[] = [
  {
    id: "component-features-section",
    type: "container",
    content: "",
    styles: {
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem"
    },
    children: [
      {
        id: "component-features-heading",
        type: "heading",
        content: "Features",
        styles: {
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        },
        children: []
      },
      {
        id: "component-features-text",
        type: "text",
        content: "Everything you need to build amazing websites",
        styles: {
          fontSize: "1.25rem",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "2rem",
          color: "gray"
        },
        children: []
      },
      {
        id: "component-features-container",
        type: "container",
        content: "",
        styles: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          width: "100%"
        },
        children: [
          {
            id: "component-feature-card-1",
            type: "card",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            },
            children: [
              {
                id: "component-feature-heading-1",
                type: "heading",
                content: "Easy to Use",
                styles: {
                  fontSize: "1.5rem",
                  fontWeight: "600"
                },
                children: []
              },
              {
                id: "component-feature-text-1",
                type: "text",
                content: "Our intuitive drag-and-drop interface makes it easy to create beautiful websites.",
                styles: {
                  color: "gray"
                },
                children: []
              }
            ]
          },
          {
            id: "component-feature-card-2",
            type: "card",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            },
            children: [
              {
                id: "component-feature-heading-2",
                type: "heading",
                content: "Customizable",
                styles: {
                  fontSize: "1.5rem",
                  fontWeight: "600"
                },
                children: []
              },
              {
                id: "component-feature-text-2",
                type: "text",
                content: "Customize every aspect of your website to match your brand and style.",
                styles: {
                  color: "gray"
                },
                children: []
              }
            ]
          },
          {
            id: "component-feature-card-3",
            type: "card",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            },
            children: [
              {
                id: "component-feature-heading-3",
                type: "heading",
                content: "Responsive",
                styles: {
                  fontSize: "1.5rem",
                  fontWeight: "600"
                },
                children: []
              },
              {
                id: "component-feature-text-3",
                type: "text",
                content: "All websites are fully responsive and look great on any device.",
                styles: {
                  color: "gray"
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

const testimonialSection: Component[] = [
  {
    id: "component-testimonial-section",
    type: "container",
    content: "",
    styles: {
      padding: "4rem 2rem",
      backgroundColor: "#f9fafb",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem"
    },
    children: [
      {
        id: "component-testimonial-heading",
        type: "heading",
        content: "What Our Users Say",
        styles: {
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        },
        children: []
      },
      {
        id: "component-testimonials-container",
        type: "container",
        content: "",
        styles: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px"
        },
        children: [
          {
            id: "component-testimonial-1",
            type: "testimonial",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            },
            children: [
              {
                id: "component-testimonial-quote-1",
                type: "text",
                content: ""I was able to create a professional website for my business in just a few hours. The builder is so easy to use!"",
                styles: {
                  fontStyle: "italic",
                  marginBottom: "1rem"
                },
                children: []
              },
              {
                id: "component-testimonial-author-1",
                type: "text",
                content: "- Sarah Johnson, Small Business Owner",
                styles: {
                  fontWeight: "600"
                },
                children: []
              }
            ]
          },
          {
            id: "component-testimonial-2",
            type: "testimonial",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            },
            children: [
              {
                id: "component-testimonial-quote-2",
                type: "text",
                content: ""The customization options are amazing. I was able to create a website that perfectly matches my brand."",
                styles: {
                  fontStyle: "italic",
                  marginBottom: "1rem"
                },
                children: []
              },
              {
                id: "component-testimonial-author-2",
                type: "text",
                content: "- Michael Rodriguez, Designer",
                styles: {
                  fontWeight: "600"
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

const pricingSection: Component[] = [
  {
    id: "component-pricing-section",
    type: "container",
    content: "",
    styles: {
      padding: "4rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem"
    },
    children: [
      {
        id: "component-pricing-heading",
        type: "heading",
        content: "Pricing",
        styles: {
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        },
        children: []
      },
      {
        id: "component-pricing-text",
        type: "text",
        content: "Choose the plan that works for you",
        styles: {
          fontSize: "1.25rem",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "2rem",
          color: "gray"
        },
        children: []
      },
      {
        id: "component-pricing-container",
        type: "container",
        content: "",
        styles: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1200px"
        },
        children: [
          {
            id: "component-pricing-card-1",
            type: "pricing",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #e5e7eb"
            },
            children: [
              {
                id: "component-pricing-tier-1",
                type: "heading",
                content: "Basic",
                styles: {
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center"
                },
                children: []
              },
              {
                id: "component-pricing-price-1",
                type: "heading",
                content: "$9/month",
                styles: {
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "1rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-1-1",
                type: "text",
                content: "✓ 1 Website",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-1-2",
                type: "text",
                content: "✓ 5 Pages",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-1-3",
                type: "text",
                content: "✓ Basic Templates",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-button-1",
                type: "button",
                content: "Get Started",
                styles: {
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#4F46E5",
                  color: "white",
                  borderRadius: "0.375rem",
                  fontWeight: "500",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "1.5rem",
                  width: "100%",
                  textAlign: "center"
                },
                children: []
              }
            ]
          },
          {
            id: "component-pricing-card-2",
            type: "pricing",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "2px solid #4F46E5",
              transform: "scale(1.05)"
            },
            children: [
              {
                id: "component-pricing-tier-2",
                type: "heading",
                content: "Pro",
                styles: {
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center"
                },
                children: []
              },
              {
                id: "component-pricing-price-2",
                type: "heading",
                content: "$19/month",
                styles: {
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "1rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-2-1",
                type: "text",
                content: "✓ 5 Websites",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-2-2",
                type: "text",
                content: "✓ Unlimited Pages",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-2-3",
                type: "text",
                content: "✓ Premium Templates",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-2-4",
                type: "text",
                content: "✓ Custom Domain",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-button-2",
                type: "button",
                content: "Get Started",
                styles: {
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#4F46E5",
                  color: "white",
                  borderRadius: "0.375rem",
                  fontWeight: "500",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "1.5rem",
                  width: "100%",
                  textAlign: "center"
                },
                children: []
              }
            ]
          },
          {
            id: "component-pricing-card-3",
            type: "pricing",
            content: "",
            styles: {
              padding: "2rem",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #e5e7eb"
            },
            children: [
              {
                id: "component-pricing-tier-3",
                type: "heading",
                content: "Enterprise",
                styles: {
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center"
                },
                children: []
              },
              {
                id: "component-pricing-price-3",
                type: "heading",
                content: "$49/month",
                styles: {
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "1rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-3-1",
                type: "text",
                content: "✓ Unlimited Websites",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-3-2",
                type: "text",
                content: "✓ Unlimited Pages",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-3-3",
                type: "text",
                content: "✓ All Templates",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-3-4",
                type: "text",
                content: "✓ Custom Domain",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-feature-3-5",
                type: "text",
                content: "✓ Priority Support",
                styles: {
                  marginBottom: "0.5rem"
                },
                children: []
              },
              {
                id: "component-pricing-button-3",
                type: "button",
                content: "Contact Sales",
                styles: {
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#4F46E5",
                  color: "white",
                  borderRadius: "0.375rem",
                  fontWeight: "500",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "1.5rem",
                  width: "100%",
                  textAlign: "center"
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

const contactSection: Component[] = [
  {
    id: "component-contact-section",
    type: "container",
    content: "",
    styles: {
      padding: "4rem 2rem",
      backgroundColor: "#f9fafb",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem"
    },
    children: [
      {
        id: "component-contact-heading",
        type: "heading",
        content: "Contact Us",
        styles: {
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        },
        children: []
      },
      {
        id: "component-contact-text",
        type: "text",
        content: "Get in touch with our team",
        styles: {
          fontSize: "1.25rem",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "2rem",
          color: "gray"
        },
        children: []
      },
      {
        id: "component-contact-form",
        type: "form",
        content: "",
        styles: {
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        },
        children: [
          {
            id: "component-contact-name",
            type: "input",
            content: "Name",
            styles: {
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
              width: "100%"
            },
            children: []
          },
          {
            id: "component-contact-email",
            type: "input",
            content: "Email",
            styles: {
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
              width: "100%"
            },
            children: []
          },
          {
            id: "component-contact-message",
            type: "input",
            content: "Message",
            styles: {
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
              width: "100%",
              minHeight: "120px"
            },
            children: []
          },
          {
            id: "component-contact-button",
            type: "button",
            content: "Send Message",
            styles: {
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4F46E5",
              color: "white",
              borderRadius: "0.375rem",
              fontWeight: "500",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              marginTop: "0.5rem"
            },
            children: []
          }
        ]
      }
    ]
  }
];

export const templates: Template[] = [
  {
    id: "hero-section",
    name: "Hero Section",
    thumbnail: "hero-image.jpg",
    components: heroSection
  },
  {
    id: "features-section",
    name: "Features Section",
    thumbnail: "features-image.jpg",
    components: featuresSection
  },
  {
    id: "testimonial-section",
    name: "Testimonials",
    thumbnail: "testimonial-image.jpg",
    components: testimonialSection
  },
  {
    id: "pricing-section",
    name: "Pricing Table",
    thumbnail: "pricing-image.jpg",
    components: pricingSection
  },
  {
    id: "contact-section",
    name: "Contact Form",
    thumbnail: "contact-image.jpg",
    components: contactSection
  }
];
