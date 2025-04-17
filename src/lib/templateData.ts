
import { Page, Website } from "./pageData";

// Education website template
const educationPages: Page[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    components: [],
    isHome: true
  },
  {
    id: "about",
    name: "About Us",
    path: "/about",
    components: [],
    isHome: false
  },
  {
    id: "courses",
    name: "Courses",
    path: "/courses",
    components: [],
    isHome: false
  },
  {
    id: "admissions",
    name: "Admissions",
    path: "/admissions",
    components: [],
    isHome: false
  },
  {
    id: "faculty",
    name: "Faculty",
    path: "/faculty",
    components: [],
    isHome: false
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    components: [],
    isHome: false
  }
];

// Portfolio website template
const portfolioPages: Page[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    components: [],
    isHome: true
  },
  {
    id: "projects",
    name: "Projects",
    path: "/projects",
    components: [],
    isHome: false
  },
  {
    id: "about",
    name: "About",
    path: "/about",
    components: [],
    isHome: false
  },
  {
    id: "resume",
    name: "Resume",
    path: "/resume",
    components: [],
    isHome: false
  },
  {
    id: "blog",
    name: "Blog",
    path: "/blog",
    components: [],
    isHome: false
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    components: [],
    isHome: false
  }
];

// E-commerce website template
const ecommercePages: Page[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    components: [],
    isHome: true
  },
  {
    id: "shop",
    name: "Shop",
    path: "/shop",
    components: [],
    isHome: false
  },
  {
    id: "products",
    name: "Products",
    path: "/products",
    components: [],
    isHome: false
  },
  {
    id: "categories",
    name: "Categories",
    path: "/categories",
    components: [],
    isHome: false
  },
  {
    id: "cart",
    name: "Cart",
    path: "/cart",
    components: [],
    isHome: false
  },
  {
    id: "checkout",
    name: "Checkout",
    path: "/checkout",
    components: [],
    isHome: false
  },
  {
    id: "faq",
    name: "FAQ",
    path: "/faq",
    components: [],
    isHome: false
  },
  {
    id: "about",
    name: "About",
    path: "/about",
    components: [],
    isHome: false
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    components: [],
    isHome: false
  }
];

// Appointment booking website template
const bookingPages: Page[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    components: [],
    isHome: true
  },
  {
    id: "services",
    name: "Services",
    path: "/services",
    components: [],
    isHome: false
  },
  {
    id: "booking",
    name: "Book Now",
    path: "/booking",
    components: [],
    isHome: false
  },
  {
    id: "professionals",
    name: "Our Team",
    path: "/professionals",
    components: [],
    isHome: false
  },
  {
    id: "testimonials",
    name: "Testimonials",
    path: "/testimonials",
    components: [],
    isHome: false
  },
  {
    id: "about",
    name: "About",
    path: "/about",
    components: [],
    isHome: false
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    components: [],
    isHome: false
  }
];

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  pages: Page[];
  thumbnail?: string;
}

export const defaultTemplates: TemplateDefinition[] = [
  {
    id: "education",
    name: "Education Website",
    description: "Perfect for schools, courses, and educational institutions",
    pages: educationPages,
    thumbnail: "graduation-cap"
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    description: "Showcase your work and professional skills",
    pages: portfolioPages,
    thumbnail: "briefcase"
  },
  {
    id: "ecommerce",
    name: "E-commerce Website",
    description: "Sell products online with a complete shopping experience",
    pages: ecommercePages,
    thumbnail: "shopping-bag"
  },
  {
    id: "booking",
    name: "Appointment Booking",
    description: "Allow customers to book services and appointments",
    pages: bookingPages,
    thumbnail: "calendar"
  }
];
