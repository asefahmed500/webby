
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
  }
];
