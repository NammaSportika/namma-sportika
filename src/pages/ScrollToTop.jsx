import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
        display: none;
        }

        /* Hide scrollbar for Firefox */
        * {
        scrollbar-width: none;
        }
    `;
    document.head.appendChild(style);
    
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;