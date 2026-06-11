import { useEffect } from 'react';
import { AGENCY_INFO } from '@/src/constants';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
}

export function useSEO({ title, description, keywords, image, canonical }: SEOProps) {
  useEffect(() => {
    // Save original values
    const originalTitle = document.title;
    
    // Update Title
    const fullTitle = `${title} | ${AGENCY_INFO.name} - Agencia de Diseño Web Premium`;
    document.title = fullTitle;

    // Helper to set meta content
    const setMetaContent = (query: string, content?: string) => {
      if (!content) return;
      const element = document.querySelector(query);
      if (element) {
        element.setAttribute('content', content);
      } else {
        // If it doesn't exist, we can optionally create it
        const isProperty = query.includes('property');
        const attr = isProperty ? 'property' : 'name';
        const match = query.match(/\[(name|property)=['"]([^'"]+)['"]\]/);
        const nameVal = match ? match[2] : '';
        if (nameVal) {
          const meta = document.createElement('meta');
          meta.setAttribute(attr, nameVal);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      }
    };

    // Helper to set dynamic link attributes
    const setLinkAttribute = (query: string, attr: string, value?: string) => {
      if (!value) return;
      const element = document.querySelector(query);
      if (element) {
        element.setAttribute(attr, value);
      } else {
        const link = document.createElement('link');
        if (query.includes('canonical')) {
          link.setAttribute('rel', 'canonical');
        }
        link.setAttribute(attr, value);
        document.head.appendChild(link);
      }
    };

    // Update Meta and Social Tags
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[name="keywords"]', keywords);
    
    // Open Graph
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:image"]', image || AGENCY_INFO.logos.openGraph);
    setMetaContent('meta[property="og:url"]', window.location.href);

    // Twitter
    setMetaContent('meta[property="twitter:title"]', fullTitle);
    setMetaContent('meta[property="twitter:description"]', description);
    setMetaContent('meta[property="twitter:image"]', image || AGENCY_INFO.logos.openGraph);
    setMetaContent('meta[property="twitter:url"]', window.location.href);

    // Canonical
    setLinkAttribute('link[rel="canonical"]', 'href', canonical || window.location.href);

    return () => {
      document.title = originalTitle;
    };
  }, [title, description, keywords, image, canonical]);
}
