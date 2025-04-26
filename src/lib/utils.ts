
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a random ID for components
export const generateId = () => `component-${Math.random().toString(36).substr(2, 9)}`;

// Format date for display
export function formatDate(date: Date | string): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(date: Date | string): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.round(diffMs / 1000);
  
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  
  return formatDate(d);
}

// Slugify text for URLs
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple hyphens with single
}

// Create a function to safely parse JSON with fallback
export function safeJsonParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return fallback;
  }
}

// Deep merge function for merging objects
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const k = key as keyof T;
      if (isObject(source[k])) {
        if (!(k in target)) {
          Object.assign(output, { [k]: source[k] });
        } else {
          output[k] = deepMerge(target[k] as object, source[k] as object) as T[keyof T];
        }
      } else {
        Object.assign(output, { [k]: source[k] });
      }
    });
  }
  
  return output;
}

// Helper for the deepMerge function
function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Optimize image URLs (useful for responsive images)
export function optimizeImageUrl(url: string, width?: number, quality?: number): string {
  if (!url) return '';
  
  // Handle already optimized URLs or data URLs
  if (url.startsWith('data:') || url.includes('?')) return url;
  
  // For remote images, add query params for optimization
  if (url.startsWith('http')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (quality) params.append('q', quality.toString());
    
    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  }
  
  // For local images, just return as is
  return url;
}

// Helper to validate email addresses
export function isValidEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
