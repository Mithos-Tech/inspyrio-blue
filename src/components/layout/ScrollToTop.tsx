import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (hash) {
      // Find the ID in the hash (e.g. #contact -> contact)
      const targetId = hash.replace('#', '');
      const wasSamePage = prevPathnameRef.current === pathname;
      
      if (wasSamePage) {
        // Same page - scroll smoothly once and finish immediately, no polling needed
        const element = document.getElementById(targetId);
        if (element) {
          const navbarOffset = 90; // sticky navbar padding offset
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navbarOffset,
            behavior: 'smooth'
          });
        }
        prevPathnameRef.current = pathname;
        return;
      }

      // Transitioning from another page: layout shifts can occur (as products, images, or FAQs render).
      // We poll and continuously adjust the scroll to track the moving element until it completely settles.
      let lastPosition = -1;
      let settledCount = 0;
      let attempts = 0;
      const maxAttempts = 150; // 1.5 seconds max polling

      const tryScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const navbarOffset = 90; // sticky navbar padding offset
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          if (elementPosition !== lastPosition) {
            lastPosition = elementPosition;
            settledCount = 0; // Layout shifted, reset settlement counter
            
            window.scrollTo({
              top: elementPosition - navbarOffset,
              behavior: 'instant' as ScrollBehavior // Use instant to land precisely and transparently
            });
          } else {
            settledCount++;
          }
          
          // Consider layout fully static and settled after 15 identical consecutive checks (150ms of complete stability)
          if (settledCount >= 15 && attempts > 10) {
            return true;
          }
        }
        return false;
      };

      // Try scrolling immediately
      if (tryScroll()) {
        prevPathnameRef.current = pathname;
        return;
      }

      // If page is lazy loading or rendering dynamic components, poll rapidly to stick to the target position
      const interval = setInterval(() => {
        attempts++;
        if (tryScroll() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 10);

      prevPathnameRef.current = pathname;
      return () => clearInterval(interval);
    } else {
      // Scroll to top instantly on pathname change
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, 5);
      
      prevPathnameRef.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};


