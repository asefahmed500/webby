
// Animation and guide utilities for the builder

interface Position {
  x: number;
  y: number;
}

interface GuidelineData {
  position: number;
  type: 'horizontal' | 'vertical';
  strength: number;
}

// Calculate snapping guidelines based on existing components
export const calculateGuidelines = (
  components: any[], 
  elementRect: DOMRect, 
  threshold: number = 10
): GuidelineData[] => {
  const guidelines: GuidelineData[] = [];
  
  // Get all component DOM elements in the canvas
  const componentElements = document.querySelectorAll('[data-component-id]');
  
  componentElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    
    // Skip the current element being dragged
    if (elementRect.top === rect.top && elementRect.left === rect.left) {
      return;
    }
    
    // Horizontal guidelines (top, center, bottom)
    const horizontalPoints = [
      { pos: rect.top, strength: 1 },
      { pos: rect.top + rect.height / 2, strength: 0.8 },
      { pos: rect.bottom, strength: 1 }
    ];
    
    // Vertical guidelines (left, center, right)
    const verticalPoints = [
      { pos: rect.left, strength: 1 },
      { pos: rect.left + rect.width / 2, strength: 0.8 },
      { pos: rect.right, strength: 1 }
    ];
    
    // Check element top/center/bottom against existing components
    [elementRect.top, elementRect.top + elementRect.height / 2, elementRect.bottom].forEach((y) => {
      horizontalPoints.forEach((point) => {
        if (Math.abs(y - point.pos) < threshold) {
          guidelines.push({
            position: point.pos,
            type: 'horizontal',
            strength: point.strength
          });
        }
      });
    });
    
    // Check element left/center/right against existing components
    [elementRect.left, elementRect.left + elementRect.width / 2, elementRect.right].forEach((x) => {
      verticalPoints.forEach((point) => {
        if (Math.abs(x - point.pos) < threshold) {
          guidelines.push({
            position: point.pos,
            type: 'vertical',
            strength: point.strength
          });
        }
      });
    });
  });
  
  return guidelines;
};

// Animate an element with spring physics
export const springAnimate = (
  element: HTMLElement, 
  startPos: Position,
  endPos: Position,
  duration: number = 300
) => {
  const startTime = performance.now();
  const dampingRatio = 0.8; // 0 = oscillate forever, 1 = no oscillation
  const angularFrequency = 12; // higher = faster oscillations
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    
    // Spring physics for smooth animation
    const springFactor = Math.exp(-dampingRatio * angularFrequency * progress) *
      Math.cos(Math.sqrt(1 - dampingRatio * dampingRatio) * angularFrequency * progress);
    
    const currentX = endPos.x - (endPos.x - startPos.x) * springFactor;
    const currentY = endPos.y - (endPos.y - startPos.y) * springFactor;
    
    element.style.transform = `translate(${currentX}px, ${currentY}px)`;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.transform = `translate(${endPos.x}px, ${endPos.y}px)`;
    }
  };
  
  requestAnimationFrame(animate);
};

// Generate a shimmer/skeleton loading effect
export const applyShimmerEffect = (element: HTMLElement) => {
  // Add shimmer classes
  element.classList.add('animate-shimmer', 'bg-gradient-to-r', 'from-gray-200', 'via-white', 'to-gray-200');
  
  // Remove effect when content is loaded
  const removeShimmer = () => {
    element.classList.remove('animate-shimmer', 'bg-gradient-to-r', 'from-gray-200', 'via-white', 'to-gray-200');
  };
  
  // Remove shimmer after content loads or after a timeout
  const img = element.querySelector('img');
  if (img) {
    if (img.complete) {
      removeShimmer();
    } else {
      img.addEventListener('load', removeShimmer);
      // Fallback if image fails to load
      setTimeout(removeShimmer, 2000);
    }
  } else {
    // For non-image elements, remove after a short delay
    setTimeout(removeShimmer, 800);
  }
  
  return removeShimmer;
};
