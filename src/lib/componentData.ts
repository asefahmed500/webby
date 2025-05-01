import { 
  LayoutDashboard, 
  Type, 
  Image, 
  Button as ButtonIcon,
  List,
  Form, 
  Link as LinkIcon, 
  Menu,
  MessageSquare,
  Users,
  Award,
  Mail,
  ArrowRight,
  Footer as FooterComp, // Rename to avoid conflict
} from "lucide-react";

export const componentCategories = [
  {
    id: "layout",
    name: "Layout",
    icon: <LayoutDashboard size={16} />,
    components: ["container", "section", "row", "column", "card"],
  },
  {
    id: "basic",
    name: "Basic",
    icon: <Type size={16} />,
    components: ["text", "heading", "image", "button", "link", "divider", "spacer"],
  },
  {
    id: "navigation",
    name: "Navigation",
    icon: <Menu size={16} />,
    components: ["navbar", "sidebar", "footer", "breadcrumbs"],
  },
  {
    id: "sections",
    name: "Sections",
    icon: <List size={16} />,
    components: ["hero-section", "features-section", "team-section", "testimonials-section", "cta-section", "pricing-section"],
  },
  {
    id: "forms",
    name: "Forms",
    icon: <Form size={16} />,
    components: ["input", "form", "textarea", "checkbox", "radio", "select"],
  },
  {
    id: "media",
    name: "Media",
    icon: <Image size={16} />,
    components: ["gallery", "video", "carousel", "icon"],
  },
  {
    id: "social",
    name: "Social",
    icon: <Users size={16} />,
    components: ["social-icons", "share-buttons", "comments"],
  }
];

// Replace FooterIcon with FooterComp
export const navigationComponents = [
  {
    id: "navbar",
    name: "Navbar",
    icon: <Menu size={16} />,
    description: "Navigation bar for your website",
    variants: ["basic", "centered", "transparent"],
  },
  {
    id: "sidebar",
    name: "Sidebar",
    icon: <Menu size={16} />,
    description: "Side navigation menu",
    variants: ["fixed", "collapsible"],
  },
  {
    id: "footer",
    name: "Footer",
    icon: <FooterComp size={16} />,
    description: "Footer section",
    variants: ["simple", "multicolumn"],
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    icon: <LinkIcon size={16} />,
    description: "Breadcrumb navigation",
    variants: ["basic", "with-icons"],
  },
];

// Define section templates
export const sectionTemplates = [
  {
    id: "hero-section",
    name: "Hero Section",
    icon: <Image size={16} />,
    description: "Main hero section with heading and call-to-action",
    variants: ["centered", "split", "video-background", "modern"],
  },
  {
    id: "features-section",
    name: "Features Section",
    icon: <List size={16} />,
    description: "Showcase your product or service features",
    variants: ["grid", "list", "tabs"],
  },
  {
    id: "testimonials-section",
    name: "Testimonials",
    icon: <MessageSquare size={16} />,
    description: "Customer testimonials and reviews",
    variants: ["cards", "carousel", "quotes"],
  },
  {
    id: "team-section",
    name: "Team Section",
    icon: <Users size={16} />,
    description: "Showcase your team members",
    variants: ["grid", "carousel", "featured"],
  },
  {
    id: "cta-section",
    name: "Call to Action",
    icon: <ArrowRight size={16} />,
    description: "Prompt user action",
    variants: ["banner", "box", "fullscreen"],
  },
  {
    id: "pricing-section",
    name: "Pricing Section",
    icon: <ButtonIcon size={16} />,
    description: "Showcase your pricing plans",
    variants: ["table", "cards", "toggle"]
  },
];

export interface ComponentType {
  type: string;
  label: string;
  icon: string;
  defaultContent?: string;
}

export const componentTypes: ComponentType[] = [
  {
    type: "section",
    label: "Section",
    icon: "panel-right",
    defaultContent: ""
  },
  {
    type: "text",
    label: "Text",
    icon: "text",
    defaultContent: "Edit this text"
  },
  {
    type: "heading",
    label: "Heading",
    icon: "heading-1",
    defaultContent: "Heading"
  },
  {
    type: "image",
    label: "Image",
    icon: "image",
    defaultContent: "https://via.placeholder.com/400x300"
  },
  {
    type: "container",
    label: "Container",
    icon: "square",
    defaultContent: ""
  },
  {
    type: "divider",
    label: "Divider",
    icon: "minus",
    defaultContent: ""
  },
  {
    type: "navigation",
    label: "Navigation",
    icon: "menu",
    defaultContent: ""
  },
  {
    type: "two-columns",
    label: "Two Columns",
    icon: "layout-dashboard",
    defaultContent: ""
  },
  {
    type: "three-columns",
    label: "Three Columns",
    icon: "layout-list",
    defaultContent: ""
  },
  {
    type: "button",
    label: "Button",
    icon: "square",
    defaultContent: "Click me"
  },
  {
    type: "call-to-action",
    label: "Call to Action",
    icon: "megaphone",
    defaultContent: ""
  },
  {
    type: "pricing-table",
    label: "Pricing Table",
    icon: "wallet",
    defaultContent: ""
  },
  {
    type: "footer",
    label: "Footer",
    icon: "panel-bottom",
    defaultContent: ""
  },
  {
    type: "feature-card",
    label: "Feature Card",
    icon: "file-text",
    defaultContent: ""
  },
  {
    type: "form",
    label: "Form",
    icon: "form-input",
    defaultContent: ""
  },
  {
    type: "testimonial",
    label: "Testimonial",
    icon: "quote",
    defaultContent: ""
  },
  {
    type: "pricing-card",
    label: "Pricing Card",
    icon: "badge-dollar-sign",
    defaultContent: ""
  },
  {
    type: "login-form",
    label: "Login Form",
    icon: "lock",
    defaultContent: ""
  },
  {
    type: "signup-form",
    label: "Signup Form",
    icon: "user-plus",
    defaultContent: ""
  },
  {
    type: "contact-form",
    label: "Contact Form",
    icon: "mail",
    defaultContent: ""
  },
  {
    type: "product-card",
    label: "Product Card",
    icon: "shopping-bag",
    defaultContent: ""
  },
  {
    type: "checkout-form",
    label: "Checkout Form",
    icon: "credit-card",
    defaultContent: ""
  },
  {
    type: "team-member",
    label: "Team Member",
    icon: "users",
    defaultContent: ""
  }
];

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description?: string;
  html: string;
  css: Record<string, string>;
  category?: string;
}

export const templates: Template[] = [
  // Hero Sections
  {
    id: "hero-1",
    name: "Simple Hero",
    thumbnail: "layout-dashboard",
    description: "Simple hero section with heading, text, and button",
    category: "hero",
    html: `
      <div>
        <h1>Welcome to Our Website</h1>
        <p>We provide the best services for your needs.</p>
        <button>Get Started</button>
      </div>
    `,
    css: {
      div: "flex flex-col items-center justify-center py-20 px-4 bg-gray-50 text-center",
      h1: "text-4xl md:text-5xl font-bold mb-4 text-gray-800",
      p: "text-xl text-gray-600 mb-8 max-w-lg",
      button: "bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
    }
  },
  {
    id: "hero-2",
    name: "Split Hero",
    thumbnail: "layout-dashboard",
    description: "Hero section split into text and image",
    category: "hero",
    html: `
      <div>
        <div class="content">
          <h1>Build Beautiful Websites</h1>
          <p>Create stunning websites without writing a single line of code. Our drag-and-drop builder makes it easy.</p>
          <div class="buttons">
            <button class="primary">Try it Free</button>
            <button class="secondary">Learn More</button>
          </div>
        </div>
        <div class="image">
          <!-- Image placeholder -->
          <div class="image-placeholder"></div>
        </div>
      </div>
    `,
    css: {
      div: "flex flex-col md:flex-row items-center min-h-[500px] px-6 md:px-10",
      ".content": "flex-1 pr-0 md:pr-8 mb-10 md:mb-0",
      h1: "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800",
      p: "text-lg text-gray-600 mb-8 max-w-lg",
      ".buttons": "flex flex-wrap gap-4",
      ".primary": "bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors",
      ".secondary": "bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors",
      ".image": "flex-1 flex items-center justify-center",
      ".image-placeholder": "bg-gray-200 w-full h-[300px] md:h-[400px] rounded-md"
    }
  },
  {
    id: "hero-3",
    name: "Modern Hero",
    thumbnail: "layout-dashboard",
    description: "Modern hero with gradient background and image",
    category: "hero",
    html: `
      <div class="wrapper">
        <div class="content">
          <span class="badge">New Release</span>
          <h1>Transform Your Website Ideas Into Reality</h1>
          <p>Our powerful website builder lets you create professional websites without any technical skills. Get started in minutes.</p>
          <div class="buttons">
            <button class="primary">Start Building</button>
            <button class="secondary">Watch Demo</button>
          </div>
        </div>
        <div class="image">
          <div class="image-content"></div>
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
        </div>
      </div>
    `,
    css: {
      ".wrapper": "flex flex-col lg:flex-row items-center gap-8 py-16 px-6 lg:px-16 overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[600px]",
      ".content": "flex-1 z-10 max-w-2xl",
      ".badge": "inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-6",
      h1: "text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-900 leading-tight",
      p: "text-xl text-gray-700 mb-8 max-w-lg",
      ".buttons": "flex flex-wrap gap-4",
      ".primary": "bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all",
      ".secondary": "bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2",
      ".image": "flex-1 relative min-h-[350px]",
      ".image-content": "absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl transform rotate-1 z-0",
      ".shape": "absolute rounded-full opacity-30",
      ".shape-1": "bg-pink-500 w-40 h-40 top-10 right-10 animate-pulse",
      ".shape-2": "bg-yellow-500 w-64 h-64 bottom-10 left-10 animate-pulse delay-1000"
    }
  },
  
  // Features Sections
  {
    id: "features-1",
    name: "Simple Features",
    thumbnail: "layout-list",
    description: "Simple features section with three columns",
    category: "features",
    html: `
      <div>
        <h2>Our Features</h2>
        <div class="features">
          <div class="feature">
            <div class="icon"></div>
            <h3>Easy to Use</h3>
            <p>Our platform is designed to be intuitive and user-friendly.</p>
          </div>
          <div class="feature">
            <div class="icon"></div>
            <h3>Customizable</h3>
            <p>Customize every aspect of your website to match your brand.</p>
          </div>
          <div class="feature">
            <div class="icon"></div>
            <h3>Responsive</h3>
            <p>All websites are fully responsive and look great on any device.</p>
          </div>
        </div>
      </div>
    `,
    css: {
      div: "py-16 px-6 bg-white",
      h2: "text-3xl font-bold mb-12 text-center text-gray-800",
      ".features": "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto",
      ".feature": "flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow",
      ".icon": "w-16 h-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600",
      h3: "text-xl font-bold mb-3 text-gray-800",
      p: "text-gray-600"
    }
  },
  {
    id: "features-2",
    name: "Feature Cards",
    thumbnail: "layout-list",
    description: "Feature cards with icons and hover effect",
    category: "features",
    html: `
      <div>
        <div class="header">
          <h2>Features that power your business</h2>
          <p>Everything you need to create a professional website and grow your business online.</p>
        </div>
        <div class="features">
          <div class="feature">
            <div class="icon"></div>
            <h3>Drag & Drop Editor</h3>
            <p>Build your website visually with our intuitive drag and drop interface.</p>
          </div>
          <div class="feature">
            <div class="icon"></div>
            <h3>100+ Templates</h3>
            <p>Choose from hundreds of professionally designed templates.</p>
          </div>
          <div class="feature">
            <div class="icon"></div>
            <h3>Mobile Responsive</h3>
            <p>All websites look great on any device, automatically.</p>
          </div>
          <div class="feature">
            <div class="icon"></div>
            <h3>SEO Optimization</h3>
            <p>Built-in tools to help your website rank higher in search results.</p>
          </div>
        </div>
      </div>
    `,
    css: {
      div: "py-16 px-6 bg-gray-50",
      ".header": "max-w-3xl mx-auto text-center mb-12",
      h2: "text-3xl md:text-4xl font-bold mb-4 text-gray-800",
      ".header p": "text-xl text-gray-600",
      ".features": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto",
      ".feature": "bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow",
      ".icon": "w-14 h-14 bg-blue-100 rounded-lg mb-6 flex items-center justify-center text-blue-600",
      h3: "text-lg font-bold mb-3 text-gray-800",
      ".feature p": "text-gray-600 text-sm"
    }
  },

  // Testimonial Sections
  {
    id: "testimonial-1",
    name: "Simple Testimonial",
    thumbnail: "quote",
    description: "Simple testimonial with quote and author",
    category: "testimonials",
    html: `
      <div>
        <div class="quote">"This platform has transformed our business. We've increased our online presence and customer engagement significantly."</div>
        <div class="author">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">John Smith</div>
            <div class="title">CEO, Example Company</div>
          </div>
        </div>
      </div>
    `,
    css: {
      div: "py-12 px-6 max-w-3xl mx-auto text-center",
      ".quote": "text-xl md:text-2xl italic text-gray-700 mb-8 relative before:content-['\\201C'] before:absolute before:-left-4 before:-top-4 before:text-5xl before:text-gray-200 after:content-['\\201D'] after:absolute after:-right-4 after:-bottom-4 after:text-5xl after:text-gray-200",
      ".author": "flex items-center justify-center",
      ".avatar": "w-12 h-12 bg-gray-300 rounded-full mr-4",
      ".info": "text-left",
      ".name": "font-medium text-gray-900",
      ".title": "text-sm text-gray-500"
    }
  },
  {
    id: "testimonial-2",
    name: "Testimonial Grid",
    thumbnail: "quote",
    description: "Grid of testimonials with quotes and authors",
    category: "testimonials",
    html: `
      <div>
        <h2>What Our Customers Say</h2>
        <p class="subtitle">Don't just take our word for it. See what our customers have to say about our product.</p>
        <div class="testimonials">
          <div class="testimonial">
            <div class="stars"></div>
            <div class="quote">"The best website builder I've ever used. It's so easy to create a professional website."</div>
            <div class="author">
              <div class="avatar"></div>
              <div class="info">
                <div class="name">Sarah Johnson</div>
                <div class="title">Designer</div>
              </div>
            </div>
          </div>
          <div class="testimonial">
            <div class="stars"></div>
            <div class="quote">"I was able to launch my business website in just a few hours. Incredible tool!"</div>
            <div class="author">
              <div class="avatar"></div>
              <div class="info">
                <div class="name">Michael Brown</div>
                <div class="title">Entrepreneur</div>
              </div>
            </div>
          </div>
          <div class="testimonial">
            <div class="stars"></div>
            <div class="quote">"Customer support is outstanding. They helped me every step of the way."</div>
            <div class="author">
              <div class="avatar"></div>
              <div class="info">
                <div class="name">Emily Davis</div>
                <div class="title">Marketing Director</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    css: {
      div: "py-16 px-6 bg-gray-50",
      h2: "text-3xl font-bold text-center mb-4 text-gray-800",
      ".subtitle": "text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12",
      ".testimonials": "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto",
      ".testimonial": "bg-white p-8 rounded-xl shadow-sm",
      ".stars": "flex mb-4 text-yellow-400",
      ".quote": "text-gray-700 mb-6",
      ".author": "flex items-center",
      ".avatar": "w-10 h-10 bg-gray-300 rounded-full mr-3",
      ".info": "text-left",
      ".name": "font-medium text-gray-900",
      ".title": "text-sm text-gray-500"
    }
  },

  // Team Sections
  {
    id: "team-1",
    name: "Team Grid",
    thumbnail: "users",
    description: "Grid layout showcasing team members",
    category: "team",
    html: `
      <div>
        <h2>Meet Our Team</h2>
        <p class="subtitle">Our talented team of professionals</p>
        <div class="team">
          <div class="member">
            <div class="photo"></div>
            <h3>John Doe</h3>
            <p class="role">CEO & Founder</p>
            <p class="bio">Over 15 years of experience in web development and UX design.</p>
            <div class="social"></div>
          </div>
          <div class="member">
            <div class="photo"></div>
            <h3>Jane Smith</h3>
            <p class="role">COO</p>
            <p class="bio">Expert in business operations and customer success.</p>
            <div class="social"></div>
          </div>
          <div class="member">
            <div class="photo"></div>
            <h3>Mike Johnson</h3>
            <p class="role">Lead Developer</p>
            <p class="bio">Full-stack developer with focus on performance and security.</p>
            <div class="social"></div>
          </div>
          <div class="member">
            <div class="photo"></div>
            <h3>Emily Brown</h3>
            <p class="role">UX Designer</p>
            <p class="bio">Creating beautiful and intuitive user experiences.</p>
            <div class="social"></div>
          </div>
        </div>
      </div>
    `,
    css: {
      div: "py-16 px-6 bg-white",
      h2: "text-3xl font-bold text-center mb-3 text-gray-800",
      ".subtitle": "text-xl text-gray-600 text-center mb-12",
      ".team": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto",
      ".member": "bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow",
      ".photo": "w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6",
      h3: "text-xl font-bold mb-1 text-gray-800",
      ".role": "text-blue-600 font-medium mb-3",
      ".bio": "text-gray-600 mb-4 text-sm",
      ".social": "flex justify-center space-x-3 text-gray-400"
    }
  },

  // CTA Sections
  {
    id: "cta-1",
    name: "Simple CTA",
    thumbnail: "megaphone",
    description: "Simple call to action section",
    category: "cta",
    html: `
      <div>
        <h2>Ready to get started?</h2>
        <p>Sign up now and start building your website in minutes.</p>
        <button>Get Started</button>
      </div>
    `,
    css: {
      div: "py-16 px-6 bg-blue-600 text-center text-white",
      h2: "text-3xl md:text-4xl font-bold mb-4",
      p: "text-xl mb-8 max-w-lg mx-auto opacity-90",
      button: "bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
    }
  },
  {
    id: "cta-2",
    name: "CTA with Image",
    thumbnail: "megaphone",
    description: "Call to action with background image",
    category: "cta",
    html: `
      <div class="wrapper">
        <div class="content">
          <h2>Take Your Business to the Next Level</h2>
          <p>Join thousands of businesses that have transformed their online presence with our platform.</p>
          <div class="buttons">
            <button class="primary">Get Started</button>
            <button class="secondary">Contact Sales</button>
          </div>
        </div>
      </div>
    `,
    css: {
      ".wrapper": "py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden",
      ".content": "max-w-3xl mx-auto text-center text-white z-10 relative",
      h2: "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
      p: "text-xl mb-8 opacity-90",
      ".buttons": "flex flex-wrap justify-center gap-4",
      ".primary": "bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors",
      ".secondary": "bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
    }
  },

  // Footer Sections
  {
    id: "footer-1",
    name: "Simple Footer",
    thumbnail: "panel-bottom",
    description: "Simple footer with links and copyright",
    category: "footer",
    html: `
      <footer>
        <div class="links">
          <div class="column">
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div class="column">
            <h3>Product</h3>
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div class="column">
            <h3>Resources</h3>
            <ul>
              <li>Documentation</li>
              <li>Support</li>
              <li>Contact</li>
            </ul>
          </div>
          <div class="column">
            <h3>Legal</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div class="logo">Webby</div>
          <div class="copyright">© 2023 Webby. All rights reserved.</div>
        </div>
      </footer>
    `,
    css: {
      footer: "py-12 px-6 bg-gray-900 text-white",
      ".links": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto mb-12",
      ".column": "",
      h3: "text-lg font-bold mb-4",
      ul: "space-y-2",
      li: "text-gray-400 hover:text-white cursor-pointer transition-colors",
      ".bottom": "flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto pt-8 border-t border-gray-800",
      ".logo": "text-2xl font-bold mb-4 md:mb-0",
      ".copyright": "text-gray-400 text-sm"
    }
  },
  {
    id: "footer-2",
    name: "Footer with Newsletter",
    thumbnail: "panel-bottom",
    description: "Footer with links, social media, and newsletter signup",
    category: "footer",
    html: `
      <footer>
        <div class="top">
          <div class="left">
            <div class="logo">Webby</div>
            <p class="description">Create beautiful websites without any coding knowledge.</p>
            <div class="social"></div>
          </div>
          <div class="right">
            <div class="links">
              <div class="group">
                <h3>Product</h3>
                <ul>
                  <li>Features</li>
                  <li>Templates</li>
                  <li>Pricing</li>
                </ul>
              </div>
              <div class="group">
                <h3>Company</h3>
                <ul>
                  <li>About</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div class="group">
                <h3>Resources</h3>
                <ul>
                  <li>Blog</li>
                  <li>Help Center</li>
                  <li>Guides</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="newsletter">
          <h3>Subscribe to our newsletter</h3>
          <div class="form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div class="bottom">
          <div class="copyright">© 2023 Webby. All rights reserved.</div>
          <div class="legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    `,
    css: {
      footer: "py-16 px-6 bg-gray-900 text-white",
      ".top": "grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-screen-xl mx-auto mb-16",
      ".left": "lg:col-span-2",
      ".logo": "text-2xl font-bold mb-4",
      ".description": "text-gray-400 mb-6 max-w-sm",
      ".social": "flex space-x-4",
      ".right": "lg:col-span-3",
      ".links": "grid grid-cols-1 sm:grid-cols-3 gap-8",
      h3: "text-lg font-bold mb-4",
      ul: "space-y-3",
      li: "text-gray-400 hover:text-white cursor-pointer transition-colors",
      ".newsletter": "max-w-screen-xl mx-auto mb-12 pb-12 border-b border-gray-800",
      ".form": "flex mt-4 max-w-md",
      input: "flex-1 bg-gray-800 border border-gray-700 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500",
      button: "bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors",
      ".bottom": "flex flex-col sm:flex-row justify-between items-center max-w-screen-xl mx-auto",
      ".copyright": "text-gray-400 text-sm mb-4 sm:mb-0",
      ".legal": "flex space-x-6 text-sm text-gray-400",
      span: "hover:text-white cursor-pointer transition-colors"
    }
  },

  // Contact Sections
  {
    id: "contact-1",
    name: "Contact Form",
    thumbnail: "mail",
    description: "Simple contact form",
    category: "contact",
    html: `
      <div>
        <div class="header">
          <h2>Get in Touch</h2>
          <p class="subtitle">We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>
        <div class="form">
          <div class="field">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div class="field">
            <label>Email</label>
            <input type="email" placeholder="Your email" />
          </div>
          <div class="field">
            <label>Subject</label>
            <input type="text" placeholder="What's this about?" />
          </div>
          <div class="field">
            <label>Message</label>
            <textarea placeholder="Your message"></textarea>
          </div>
          <button>Send Message</button>
        </div>
      </div>
    `,
    css: {
      div: "py-16 px-6 bg-white",
      ".header": "max-w-2xl mx-auto text-center mb-12",
      h2: "text-3xl font-bold mb-4 text-gray-800",
      ".subtitle": "text-lg text-gray-600",
      ".form": "max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm",
      ".field": "mb-6",
      label: "block text-sm font-medium mb-2 text-gray-700",
      input: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      textarea: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32",
      button: "w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
    }
  },
  
  // Navbar/Header Components
  {
    id: "navbar-1",
    name: "Simple Navbar",
    thumbnail: "menu",
    description: "Simple navigation bar with logo and links",
    category: "navigation",
    html: `
      <nav>
        <div class="logo">Webby</div>
        <div class="links">
          <a href="#" class="active">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>
        <div class="buttons">
          <button class="login">Log In</button>
          <button class="signup">Sign Up</button>
        </div>
      </nav>
    `,
    css: {
      nav: "flex items-center justify-between py-4 px-6 bg-white shadow-sm",
      ".logo": "text-xl font-bold text-blue-600",
      ".links": "hidden md:flex space-x-6",
      a: "text-gray-600 hover:text-blue-600 transition-colors",
      ".active": "text-blue-600 font-medium",
      ".buttons": "hidden md:flex items-center space-x-4",
      ".login": "text-gray-800 hover:text-blue-600 transition-colors",
      ".signup": "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
    }
  },
  {
    id: "sticky-header-1",
    name: "Sticky Header",
    thumbnail: "navigation",
    description: "Header that sticks to the top while scrolling",
    category: "navigation",
    html: `
      <header class="sticky-header">
        <div class="container">
          <div class="logo">Webby</div>
          <nav class="menu">
            <a href="#" class="active">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Portfolio</a>
            <a href="#">Contact</a>
          </nav>
          <div class="cta">
            <button>Get Started</button>
          </div>
          <div class="mobile-menu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
      </header>
    `,
    css: {
      ".sticky-header": "sticky top-0 bg-white shadow-md z-50",
      ".container": "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between",
      ".logo": "text-xl font-bold text-blue-600",
      ".menu": "hidden md:flex space-x-8",
      a: "text-gray-700 hover:text-blue-600 transition-colors font-medium",
      ".active": "text-blue-600",
      ".cta": "hidden md:block",
      button: "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors",
      ".mobile-menu": "md:hidden cursor-pointer",
      ".bar": "w-6 h-0.5 bg-gray-800 my-1.5 transition-all"
    }
  },
  
  // Breadcrumbs
  {
    id: "breadcrumbs-1",
    name: "Simple Breadcrumbs",
    thumbnail: "navigation",
    description: "Navigation breadcrumbs for nested pages",
    category: "navigation",
    html: `
      <div class="breadcrumbs">
        <div class="container">
          <a href="#" class="crumb">Home</a>
          <span class="separator">/</span>
          <a href="#" class="crumb">Products</a>
          <span class="separator">/</span>
          <span class="current">Product Name</span>
        </div>
      </div>
    `,
    css: {
      ".breadcrumbs": "bg-gray-100 py-3",
      ".container": "max-w-7xl mx-auto px-4",
      ".crumb": "text-blue-600 hover:text-blue-800 text-sm",
      ".separator": "text-gray-400 mx-2 text-sm",
      ".current": "text-gray-600 text-sm font-medium"
    }
  }
];
