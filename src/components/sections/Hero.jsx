import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import GalaxyCanvas from '../visuals/GalaxyCanvas';

// Magnetic Button Component
const MagneticButton = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: 'white',
        padding: 'clamp(18px, 4vw, 24px) clamp(40px, 8vw, 56px)',
        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        borderRadius: '100px',
        cursor: 'pointer',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '48px',
        touchAction: 'manipulation'
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 40px rgba(167, 139, 250, 0.3)',
        borderColor: 'rgba(167, 139, 250, 0.5)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: 'translateX(-100%)'
        }}
        animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      <span style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', position: 'relative', zIndex: 1 }}>
        <Sparkles size={16} />
        {children}
      </span>
    </motion.button>
  );
};

// Letter Animation Component
const AnimatedText = ({ text, delay = 0 }) => {
  const letters = text.split('');

  return (
    <span style={{ display: 'inline-flex' }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#030305'
    }}>

      {/* New High-Performance Canvas Background */}
      <GalaxyCanvas />

      {/* Simplified Gradient Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, rgba(3,3,5,0.7) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <motion.div
        className="container"
        style={{
          zIndex: 2,
          position: 'relative',
          y: yText,
          opacity: opacityText,
          padding: '0 clamp(16px, 4vw, 20px)'
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            letterSpacing: 'clamp(0.2em, 1vw, 0.5em)',
            marginBottom: 'clamp(20px, 4vw, 32px)',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(8px, 2vw, 16px)',
            flexWrap: 'wrap'
          }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 'clamp(20px, 5vw, 40px)',
              height: '1px',
              background: 'rgba(167, 139, 250, 0.5)',
              display: window.innerWidth < 480 ? 'none' : 'block'
            }}
          />
          <span>Sonic Architecture</span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 'clamp(20px, 5vw, 40px)',
              height: '1px',
              background: 'rgba(167, 139, 250, 0.5)',
              display: window.innerWidth < 480 ? 'none' : 'block'
            }}
          />
        </motion.p>

        <h1 style={{
          fontSize: 'clamp(3rem, 15vw, 10rem)',
          lineHeight: 0.85,
          margin: '0 0 clamp(24px, 6vw, 48px) 0',
          fontWeight: 300,
          letterSpacing: '-0.04em',
          fontFamily: 'var(--font-display)',
          background: 'linear-gradient(to bottom right, #fff 30%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          <AnimatedText text="AETHERIS" delay={0.5} />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            maxWidth: '500px',
            margin: '0 auto clamp(32px, 6vw, 48px)',
            lineHeight: 1.6,
            padding: '0 16px'
          }}
        >
          Immersive soundscapes for deep focus, meditation, and cosmic exploration
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <MagneticButton onClick={scrollToCatalog}>
            Enter Orbit
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 4vw, 40px)',
          zIndex: 2
        }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            minHeight: '48px',
            minWidth: '48px',
            justifyContent: 'center'
          }}
          onClick={scrollToCatalog}
        >
          <span style={{
            fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase'
          }}>
            Scroll
          </span>
          <ArrowDown size={20} color="rgba(255,255,255,0.3)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
