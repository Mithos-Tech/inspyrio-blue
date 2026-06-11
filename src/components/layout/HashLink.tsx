import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HashLinkProps extends React.ComponentProps<typeof Link> {
  smooth?: boolean;
  scroll?: (el: HTMLElement) => void;
}

export const HashLink: React.FC<HashLinkProps> = ({ to, children, onClick, smooth, scroll, ...props }) => {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    const toString = to.toString();
    if (toString.includes('#')) {
      const [path, hash] = toString.split('#');
      const targetId = hash;
      const isTargetHome = path === '/' || path === '';

      // Check if we are currently on the target base pathname
      const isOnSamePage = 
        location.pathname === path || 
        (isTargetHome && location.pathname === '/');

      if (isOnSamePage) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          const navbarOffset = 90; // Align with header height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navbarOffset,
            behavior: 'smooth'
          });
          // Update URL hash gracefully without jumping or reloading
          window.history.pushState(null, '', toString);
        }
      }
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
