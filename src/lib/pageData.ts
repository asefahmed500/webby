
export interface Page {
  id: string;
  name: string;
  path: string;
  components: any[];
  isHome: boolean;
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
