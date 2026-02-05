import { useEffect } from 'react';

/**
 * Motion Grammar-inspired smooth scroll behavior
 * Adds momentum-based smooth scrolling with easing
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        // Only apply on desktop
        if (window.innerWidth < 768) return;

        let scrolling = false;
        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;

        const smoothScroll = () => {
            if (Math.abs(targetScroll - currentScroll) < 0.1) {
                currentScroll = targetScroll;
                scrolling = false;
                return;
            }

            currentScroll += (targetScroll - currentScroll) * 0.1;
            window.scrollTo(0, currentScroll);

            if (scrolling) {
                requestAnimationFrame(smoothScroll);
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            targetScroll += e.deltaY;
            targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

            if (!scrolling) {
                scrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        // Uncomment to enable smooth scroll (can be heavy on performance)
        // window.addEventListener('wheel', handleWheel, { passive: false });

        // return () => {
        //   window.removeEventListener('wheel', handleWheel);
        // };
    }, []);
};

/**
 * Parallax scroll effect for elements
 */
export const useParallax = (speed = 0.5) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const parallaxElements = document.querySelectorAll('[data-parallax]');

            parallaxElements.forEach((el) => {
                const elementSpeed = parseFloat(el.dataset.parallax) || speed;
                const yPos = -(scrolled * elementSpeed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);
};

/**
 * Magnetic cursor effect (Motion Grammar-inspired)
 */
export const useMagneticCursor = () => {
    useEffect(() => {
        // Only on desktop with fine pointer
        if (window.matchMedia('(hover: none)').matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'magnetic-cursor';
        cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(167, 139, 250, 0.5);
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    `;
        document.body.appendChild(cursor);

        const moveCursor = (e) => {
            cursor.style.left = `${e.clientX - 10}px`;
            cursor.style.top = `${e.clientY - 10}px`;
        };

        const handleHover = (e) => {
            if (e.target.matches('button, a, [role="button"]')) {
                cursor.style.transform = 'scale(2)';
            } else {
                cursor.style.transform = 'scale(1)';
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
            cursor.remove();
        };
    }, []);
};

export default {
    useSmoothScroll,
    useParallax,
    useMagneticCursor
};
