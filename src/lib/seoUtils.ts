
// SEO Utilities for the Website Builder

export interface SEOSettings {
  title: string;
  description: string;
  favicon?: string;
  ogImage?: string;
  keywords?: string;
  author?: string;
}

export const defaultSEOSettings: SEOSettings = {
  title: "My Website",
  description: "A website built with the Website Builder",
  keywords: "website, builder, drag and drop",
  author: ""
};

// Generate meta tags for the website
export const generateMetaTags = (seo: SEOSettings) => {
  return {
    title: seo.title || defaultSEOSettings.title,
    meta: [
      { name: "description", content: seo.description || defaultSEOSettings.description },
      { name: "keywords", content: seo.keywords || defaultSEOSettings.keywords },
      { property: "og:title", content: seo.title || defaultSEOSettings.title },
      { property: "og:description", content: seo.description || defaultSEOSettings.description },
      { property: "og:image", content: seo.ogImage || "" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title || defaultSEOSettings.title },
      { name: "twitter:description", content: seo.description || defaultSEOSettings.description },
      { name: "twitter:image", content: seo.ogImage || "" },
      { name: "author", content: seo.author || defaultSEOSettings.author }
    ],
    link: [
      { rel: "icon", href: seo.favicon || "/favicon.ico" }
    ]
  };
};

// Validate SEO data
export const validateSEOSettings = (seo: Partial<SEOSettings>): SEOSettings => {
  return {
    title: seo.title || defaultSEOSettings.title,
    description: seo.description || defaultSEOSettings.description,
    favicon: seo.favicon,
    ogImage: seo.ogImage,
    keywords: seo.keywords || defaultSEOSettings.keywords,
    author: seo.author || defaultSEOSettings.author
  };
};

// Generate a slug from a string
export const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/&/g, '-and-')     // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')   // Remove all non-word characters
    .replace(/\-\-+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
};
