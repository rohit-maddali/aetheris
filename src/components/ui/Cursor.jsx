import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [trails, setTrails] = useState([]);

    // Use ref for performance to avoid re-renders on every pixel move for the trail generation
    const requestRef = useRef();
    const trailIdCounter = useRef(0);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Spawn a star particle occasionally
            if (Math.random() > 0.5) { // Control density
                addTrail(e.clientX, e.clientY);
            }

            const target = e.target;
            setIsHovering(
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('glass-panel') ||
                target.style.cursor === 'pointer'
            );
        };

        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const addTrail = (x, y) => {
        const id = trailIdCounter.current++;
        const size = Math.random() * 4 + 2; // Random size 2-6px
        const duration = Math.random() * 0.5 + 0.5; // Random fade duration

        const newStar = {
            id,
            x,
            y,
            size,
            duration,
            offsetX: (Math.random() - 0.5) * 10, // Slight erratic offset
            offsetY: (Math.random() - 0.5) * 10
        };

        setTrails(prev => [...prev.slice(-20), newStar]); // Keep last 20 trails max

        // Cleanup self after duration
        setTimeout(() => {
            setTrails(prev => prev.filter(t => t.id !== id));
        }, duration * 1000);
    };

    return (
        <>
            <style>{`
        body { cursor: none; } /* Hide default cursor globally */
      `}</style>

            {/* Star Trail Particles */}
            <AnimatePresence>
                {trails.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 1, scale: 1, x: star.x, y: star.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            x: star.x + star.offsetX,
                            y: star.y + star.offsetY
                        }}
                        transition={{ duration: star.duration, ease: "easeOut" }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: star.size,
                            height: star.size,
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                            pointerEvents: 'none',
                            zIndex: 9998
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Main Cursor Dot (Center) */}
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1 // Hide dot on hover if we expand ring
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
                style={{
                    position: 'fixed',
                    width: '8px',
                    height: '8px',
                    background: 'white',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />

            {/* Outer Ring (Magnetic) - Optimized for responsiveness */}
            <motion.div
                className="cursor-outline"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? 'rgba(167, 139, 250, 0.8)' : 'rgba(255, 255, 255, 0.3)',
                    borderWidth: isHovering ? '2px' : '1px'
                }}
                transition={{
                    type: "spring",
                    stiffness: 800, // Increased from 150 for snap
                    damping: 35,    // Increased from 15 to prevent wobble
                    mass: 0.5
                }}
                style={{
                    position: 'fixed',
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    background: isHovering ? 'rgba(255,255,255,0.05)' : 'transparent',
                    backdropFilter: isHovering ? 'blur(2px)' : 'none'
                }}
            />
        </>
    );
};

export default Cursor;
