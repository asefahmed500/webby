
import {
  Navigation,
  FooterIcon,
  Layout,
  Grid,
  Sidebar as SidebarIcon,
  ChevronUp,
  Languages
} from "lucide-react";

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  html: string;
  css: Record<string, string>;
}

export const layoutComponents: LayoutTemplate[] = [
  // Navbars
  {
    id: "navbar-standard",
    name: "Standard Navbar",
    description: "Classic navigation with logo, links and call to action buttons",
    category: "navbar",
    thumbnail: "navigation",
    html: `
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-logo">
            <a href="#">Logo</a>
          </div>
          <div class="navbar-links">
            <a href="#" class="active">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Products</a>
            <a href="#">Contact</a>
          </div>
          <div class="navbar-buttons">
            <button class="btn-secondary">Log in</button>
            <button class="btn-primary">Sign up</button>
          </div>
          <div class="navbar-mobile-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    `,
    css: {
      ".navbar": "bg-white shadow-sm sticky top-0 z-50",
      ".navbar-container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16",
      ".navbar-logo": "flex-shrink-0 font-bold text-lg text-blue-600",
      ".navbar-links": "hidden md:flex space-x-8",
      ".navbar-links a": "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium",
      ".active": "text-blue-600",
      ".navbar-buttons": "hidden md:flex items-center space-x-4",
      ".btn-secondary": "px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600",
      ".btn-primary": "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700",
      ".navbar-mobile-toggle": "md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer",
      ".navbar-mobile-toggle span": "w-full h-0.5 bg-gray-600 rounded-full"
    }
  },
  {
    id: "navbar-dropdown",
    name: "Navbar with Dropdown",
    description: "Navigation with dropdown menus for categories",
    category: "navbar",
    thumbnail: "navigation",
    html: `
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-logo">
            <a href="#">Webby</a>
          </div>
          <div class="navbar-links">
            <a href="#" class="active">Home</a>
            <div class="dropdown">
              <button class="dropdown-toggle">Products</button>
              <div class="dropdown-menu">
                <a href="#">Product 1</a>
                <a href="#">Product 2</a>
                <a href="#">Product 3</a>
              </div>
            </div>
            <div class="dropdown">
              <button class="dropdown-toggle">Services</button>
              <div class="dropdown-menu">
                <a href="#">Service 1</a>
                <a href="#">Service 2</a>
                <a href="#">Service 3</a>
              </div>
            </div>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div class="navbar-buttons">
            <button class="btn-primary">Get Started</button>
          </div>
          <div class="navbar-mobile-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    `,
    css: {
      ".navbar": "bg-white shadow-sm sticky top-0 z-50",
      ".navbar-container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16",
      ".navbar-logo": "flex-shrink-0 font-bold text-lg text-blue-600",
      ".navbar-links": "hidden md:flex items-center space-x-4",
      ".navbar-links a": "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium",
      ".active": "text-blue-600",
      ".dropdown": "relative group",
      ".dropdown-toggle": "text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center",
      ".dropdown-toggle::after": "content-['▼'] ml-1 text-xs",
      ".dropdown-menu": "absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transform transition-all origin-top-left",
      ".dropdown-menu a": "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
      ".navbar-buttons": "hidden md:block",
      ".btn-primary": "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700",
      ".navbar-mobile-toggle": "md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer",
      ".navbar-mobile-toggle span": "w-full h-0.5 bg-gray-600 rounded-full"
    }
  },
  {
    id: "navbar-hamburger",
    name: "Hamburger Menu (Mobile)",
    description: "Responsive navigation with hamburger menu for mobile",
    category: "navbar",
    thumbnail: "navigation",
    html: `
      <div class="mobile-navbar">
        <div class="navbar-top">
          <div class="logo">Webby</div>
          <button class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="mobile-menu">
          <a href="#" class="active">Home</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
          <div class="mobile-buttons">
            <button class="btn-login">Log in</button>
            <button class="btn-signup">Sign up</button>
          </div>
        </div>
      </div>
    `,
    css: {
      ".mobile-navbar": "relative bg-white shadow-sm z-50",
      ".navbar-top": "flex items-center justify-between p-4",
      ".logo": "font-bold text-xl text-blue-600",
      ".menu-toggle": "flex flex-col justify-between w-6 h-5 cursor-pointer",
      ".menu-toggle span": "w-full h-0.5 bg-gray-600 rounded-full transition-all",
      ".mobile-menu": "hidden bg-white pb-4 px-4 shadow-inner",
      ".mobile-menu a": "block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md",
      ".active": "bg-blue-50 text-blue-600",
      ".mobile-buttons": "flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200",
      ".btn-login": "w-full py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50",
      ".btn-signup": "w-full py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
    }
  },
  
  // Footer components
  {
    id: "footer-standard",
    name: "Standard Footer",
    description: "Multi-column footer with links and copyright",
    category: "footer",
    thumbnail: "footer",
    html: `
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="footer-logo">Webby</div>
              <p class="footer-description">Create beautiful websites without coding.</p>
              <div class="footer-social">
                <a href="#" class="social-icon">FB</a>
                <a href="#" class="social-icon">TW</a>
                <a href="#" class="social-icon">IG</a>
                <a href="#" class="social-icon">LI</a>
              </div>
            </div>
            <div class="footer-links">
              <div class="footer-group">
                <h3 class="footer-heading">Products</h3>
                <ul class="footer-list">
                  <li><a href="#">Features</a></li>
                  <li><a href="#">Templates</a></li>
                  <li><a href="#">Integrations</a></li>
                  <li><a href="#">Pricing</a></li>
                </ul>
              </div>
              <div class="footer-group">
                <h3 class="footer-heading">Resources</h3>
                <ul class="footer-list">
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Tutorials</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Support</a></li>
                </ul>
              </div>
              <div class="footer-group">
                <h3 class="footer-heading">Company</h3>
                <ul class="footer-list">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Partners</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-copyright">© 2023 Webby. All rights reserved.</div>
            <div class="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    `,
    css: {
      ".footer": "bg-gray-800 text-white",
      ".footer-container": "max-w-7xl mx-auto px-4 py-12",
      ".footer-content": "grid grid-cols-1 md:grid-cols-12 gap-8 mb-8",
      ".footer-brand": "col-span-1 md:col-span-4",
      ".footer-logo": "text-2xl font-bold mb-4",
      ".footer-description": "text-gray-400 mb-6",
      ".footer-social": "flex space-x-4",
      ".social-icon": "w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm hover:bg-gray-600",
      ".footer-links": "col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8",
      ".footer-heading": "font-medium text-lg mb-4",
      ".footer-list": "space-y-2",
      ".footer-list a": "text-gray-400 hover:text-white",
      ".footer-bottom": "pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center",
      ".footer-copyright": "text-gray-400 text-sm mb-4 sm:mb-0",
      ".footer-legal": "flex space-x-6 text-sm",
      ".footer-legal a": "text-gray-400 hover:text-white"
    }
  },
  {
    id: "footer-with-back-to-top",
    name: "Footer with Back to Top",
    description: "Footer with a back to top button",
    category: "footer",
    thumbnail: "footer",
    html: `
      <footer class="footer">
        <div class="back-to-top">
          <button class="back-to-top-btn">
            <span class="back-to-top-icon">↑</span>
            <span class="back-to-top-text">Back to top</span>
          </button>
        </div>
        <div class="footer-container">
          <div class="footer-columns">
            <div class="footer-column">
              <h3 class="footer-title">Company</h3>
              <ul class="footer-links">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">News</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3 class="footer-title">Resources</h3>
              <ul class="footer-links">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3 class="footer-title">Product</h3>
              <ul class="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3 class="footer-title">Connect</h3>
              <ul class="footer-links">
                <li><a href="#">Contact</a></li>
                <li><a href="#">Newsletter</a></li>
                <li><a href="#">Social Media</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-logo">Webby</div>
            <div class="footer-copyright">© 2023 Webby Inc. All rights reserved.</div>
          </div>
        </div>
      </footer>
    `,
    css: {
      ".footer": "bg-gray-900 text-white pt-8 pb-6",
      ".back-to-top": "bg-gray-800 text-center py-3 mb-8",
      ".back-to-top-btn": "inline-flex items-center text-gray-300 hover:text-white",
      ".back-to-top-icon": "mr-2 text-xl",
      ".back-to-top-text": "text-sm",
      ".footer-container": "max-w-7xl mx-auto px-4",
      ".footer-columns": "grid grid-cols-2 md:grid-cols-4 gap-8 mb-12",
      ".footer-title": "text-lg font-medium mb-4",
      ".footer-links": "space-y-3",
      ".footer-links a": "text-gray-400 hover:text-white text-sm",
      ".footer-bottom": "border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center",
      ".footer-logo": "text-2xl font-bold mb-4 md:mb-0",
      ".footer-copyright": "text-gray-400 text-sm"
    }
  },
  
  // Sidebar components
  {
    id: "sidebar-standard",
    name: "Standard Sidebar",
    description: "Side navigation for dashboards and admin panels",
    category: "sidebar",
    thumbnail: "sidebar",
    html: `
      <div class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">Webby</div>
        </div>
        <nav class="sidebar-nav">
          <div class="sidebar-section">
            <div class="sidebar-section-header">Main</div>
            <a href="#" class="sidebar-item active">
              <span class="sidebar-icon">D</span>
              <span class="sidebar-label">Dashboard</span>
            </a>
            <a href="#" class="sidebar-item">
              <span class="sidebar-icon">P</span>
              <span class="sidebar-label">Projects</span>
            </a>
            <a href="#" class="sidebar-item">
              <span class="sidebar-icon">T</span>
              <span class="sidebar-label">Tasks</span>
            </a>
            <a href="#" class="sidebar-item">
              <span class="sidebar-icon">C</span>
              <span class="sidebar-label">Calendar</span>
            </a>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-section-header">Settings</div>
            <a href="#" class="sidebar-item">
              <span class="sidebar-icon">P</span>
              <span class="sidebar-label">Profile</span>
            </a>
            <a href="#" class="sidebar-item">
              <span class="sidebar-icon">S</span>
              <span class="sidebar-label">Settings</span>
            </a>
          </div>
        </nav>
        <div class="sidebar-footer">
          <button class="sidebar-collapse">Collapse</button>
        </div>
      </div>
    `,
    css: {
      ".sidebar": "w-64 bg-white shadow-md flex flex-col h-screen border-r border-gray-200",
      ".sidebar-header": "px-6 py-5 border-b border-gray-200",
      ".sidebar-logo": "font-bold text-xl text-blue-600",
      ".sidebar-nav": "flex-1 overflow-y-auto py-4",
      ".sidebar-section": "mb-6 px-4",
      ".sidebar-section-header": "text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2",
      ".sidebar-item": "mb-1 flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md",
      ".active": "bg-blue-50 text-blue-700",
      ".sidebar-icon": "w-5 h-5 mr-3 flex items-center justify-center bg-gray-200 text-gray-600 rounded-md",
      ".sidebar-label": "text-sm",
      ".sidebar-footer": "p-4 border-t border-gray-200",
      ".sidebar-collapse": "w-full py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md"
    }
  },
  {
    id: "sidebar-collapsible",
    name: "Collapsible Sidebar",
    description: "Sidebar that can collapse to icons only",
    category: "sidebar",
    thumbnail: "sidebar",
    html: `
      <div class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">W</div>
          <div class="sidebar-title">Webby</div>
          <button class="sidebar-toggle">←</button>
        </div>
        <div class="sidebar-menu">
          <a href="#" class="sidebar-item active">
            <div class="sidebar-icon">H</div>
            <span class="sidebar-text">Home</span>
          </a>
          <a href="#" class="sidebar-item">
            <div class="sidebar-icon">D</div>
            <span class="sidebar-text">Dashboard</span>
          </a>
          <a href="#" class="sidebar-item">
            <div class="sidebar-icon">P</div>
            <span class="sidebar-text">Projects</span>
          </a>
          <a href="#" class="sidebar-item">
            <div class="sidebar-icon">R</div>
            <span class="sidebar-text">Reports</span>
          </a>
          <a href="#" class="sidebar-item">
            <div class="sidebar-icon">S</div>
            <span class="sidebar-text">Settings</span>
          </a>
        </div>
        <div class="sidebar-profile">
          <div class="sidebar-profile-info">
            <div class="sidebar-avatar">U</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">User Name</div>
              <div class="sidebar-user-role">Admin</div>
            </div>
          </div>
          <button class="sidebar-logout">Log out</button>
        </div>
      </div>
    `,
    css: {
      ".sidebar": "w-64 bg-gray-800 text-white flex flex-col h-screen transition-all",
      ".sidebar-header": "flex items-center px-6 py-4 border-b border-gray-700",
      ".sidebar-logo": "w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold mr-3",
      ".sidebar-title": "text-lg font-medium flex-1",
      ".sidebar-toggle": "w-6 h-6 text-gray-400 hover:text-white",
      ".sidebar-menu": "px-3 py-4 flex-1 overflow-y-auto",
      ".sidebar-item": "flex items-center mb-2 px-3 py-2.5 rounded-md hover:bg-gray-700 transition-colors",
      ".active": "bg-gray-700",
      ".sidebar-icon": "w-5 h-5 bg-gray-600 rounded-md flex items-center justify-center mr-3",
      ".sidebar-text": "text-sm",
      ".sidebar-profile": "border-t border-gray-700 p-4",
      ".sidebar-profile-info": "flex items-center mb-4",
      ".sidebar-avatar": "w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3",
      ".sidebar-user-info": "",
      ".sidebar-user-name": "font-medium",
      ".sidebar-user-role": "text-xs text-gray-400",
      ".sidebar-logout": "w-full py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-md hover:bg-gray-700 transition-colors"
    }
  },
  
  // Language selector
  {
    id: "language-selector",
    name: "Language Selector",
    description: "Dropdown to select website language",
    category: "utility",
    thumbnail: "languages",
    html: `
      <div class="language-selector">
        <button class="language-toggle">
          <span class="current-lang">English</span>
          <span class="dropdown-icon">▼</span>
        </button>
        <div class="language-dropdown">
          <a href="#" class="language-option active">English</a>
          <a href="#" class="language-option">Español</a>
          <a href="#" class="language-option">Français</a>
          <a href="#" class="language-option">Deutsch</a>
          <a href="#" class="language-option">简体中文</a>
        </div>
      </div>
    `,
    css: {
      ".language-selector": "relative inline-block",
      ".language-toggle": "flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none hover:border-gray-400",
      ".current-lang": "text-sm text-gray-700 mr-2",
      ".dropdown-icon": "text-gray-500 text-xs",
      ".language-dropdown": "absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden hidden",
      ".language-option": "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
      ".active": "bg-blue-50 text-blue-700"
    }
  }
];

export default layoutComponents;
