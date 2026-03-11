import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Find the element by the hash id (without the #)
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Tiny delay to ensure the DOM has painted the element after navigation
            }
        } else {
            // If no hash, we should scroll to top on route change
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
