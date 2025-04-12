
export interface Page {
  id: string;
  name: string;
  path: string;
  components: any[];
  isHome: boolean;
}

export interface Website {
  id: string;
  name: string;
  description?: string;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  userId?: string; // For when we have authentication
}

export const defaultPages: Page[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    components: [],
    isHome: true
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
  },
  {
    id: "products",
    name: "Products",
    path: "/products",
    components: [],
    isHome: false
  },
  {
    id: "login",
    name: "Login",
    path: "/login",
    components: [],
    isHome: false
  },
  {
    id: "signup",
    name: "Sign Up",
    path: "/signup",
    components: [],
    isHome: false
  }
];

export const defaultWebsite: Website = {
  id: "default",
  name: "My Website",
  description: "A website built with the Website Builder",
  pages: defaultPages,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
