
import { Component } from "@/context/BuilderContext";

// Function to debounce function calls
export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<F>): Promise<ReturnType<F>> {
    return new Promise(resolve => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(() => {
        resolve(func(...args));
      }, waitFor);
    });
  };
}

// Apply spring animation to an element
export function springAnimate(
  element: HTMLElement, 
  startPos: { x: number, y: number }, 
  endPos: { x: number, y: number }, 
  duration: number = 300
) {
  // Cancel any existing animations
  element.getAnimations().forEach(animation => animation.cancel());
  
  const animation = element.animate(
    [
      { transform: `translate(${startPos.x}px, ${startPos.y}px)` },
      { transform: `translate(${endPos.x}px, ${endPos.y}px)` }
    ],
    {
      duration,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Spring-like easing
      fill: 'forwards'
    }
  );
  
  return new Promise<void>(resolve => {
    animation.onfinish = () => resolve();
  });
}

// Calculate guidelines for snapping elements
export function calculateGuidelines(
  existingElements: DOMRect[],
  currentElement: DOMRect,
  threshold: number = 10
): { position: number; type: 'horizontal' | 'vertical'; strength: number; }[] {
  const guidelines: { position: number; type: 'horizontal' | 'vertical'; strength: number; }[] = [];
  
  // Horizontal center guideline
  guidelines.push({ 
    position: currentElement.height / 2, 
    type: 'horizontal', 
    strength: 1.0
  });
  
  // Vertical center guideline
  guidelines.push({ 
    position: currentElement.width / 2, 
    type: 'vertical', 
    strength: 1.0
  });
  
  // Add more guidelines based on existing elements
  existingElements.forEach(element => {
    // Calculate distances for horizontal guidelines
    const topDistance = Math.abs(currentElement.top - element.top);
    const bottomDistance = Math.abs(currentElement.bottom - element.bottom);
    const centerYDistance = Math.abs((currentElement.top + currentElement.height / 2) - 
                                    (element.top + element.height / 2));
    
    if (topDistance < threshold) {
      guidelines.push({
        position: element.top - currentElement.top,
        type: 'horizontal',
        strength: 1 - (topDistance / threshold)
      });
    }
    
    if (bottomDistance < threshold) {
      guidelines.push({
        position: element.bottom - currentElement.top,
        type: 'horizontal',
        strength: 1 - (bottomDistance / threshold)
      });
    }
    
    if (centerYDistance < threshold) {
      guidelines.push({
        position: (element.top + element.height / 2) - currentElement.top,
        type: 'horizontal',
        strength: 1 - (centerYDistance / threshold)
      });
    }
    
    // Calculate distances for vertical guidelines
    const leftDistance = Math.abs(currentElement.left - element.left);
    const rightDistance = Math.abs(currentElement.right - element.right);
    const centerXDistance = Math.abs((currentElement.left + currentElement.width / 2) - 
                                    (element.left + element.width / 2));
                                    
    if (leftDistance < threshold) {
      guidelines.push({
        position: element.left - currentElement.left,
        type: 'vertical',
        strength: 1 - (leftDistance / threshold)
      });
    }
    
    if (rightDistance < threshold) {
      guidelines.push({
        position: element.right - currentElement.left,
        type: 'vertical',
        strength: 1 - (rightDistance / threshold)
      });
    }
    
    if (centerXDistance < threshold) {
      guidelines.push({
        position: (element.left + element.width / 2) - currentElement.left,
        type: 'vertical',
        strength: 1 - (centerXDistance / threshold)
      });
    }
  });
  
  return guidelines;
}

// Apply shimmer effect for loading states
export function applyShimmerEffect(element: HTMLElement) {
  // Add shimmer classes
  element.classList.add('animate-pulse', 'bg-gradient-to-r', 'from-gray-200', 'via-white', 'to-gray-200', 'bg-200%');
  
  // Return a cleanup function
  return () => {
    element.classList.remove('animate-pulse', 'bg-gradient-to-r', 'from-gray-200', 'via-white', 'to-gray-200', 'bg-200%');
  };
}

// Generate optimized cloneDeep function for component trees
export function cloneDeep<T>(obj: T): T {
  // For null or non-objects, return as is
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Special case for components
  if (typeof obj === 'object' && 'type' in obj && 'id' in obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => cloneDeep(item)) as unknown as T;
  }
  
  // Handle regular objects
  const clone = {} as T;
  
  Object.keys(obj).forEach(key => {
    const k = key as keyof T;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      clone[k] = cloneDeep(obj[k]) as T[keyof T];
    } else {
      clone[k] = obj[k];
    }
  });
  
  return clone;
}
