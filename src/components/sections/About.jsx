import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Headphones, Waves, Sparkles, Heart, Brain } from 'lucide-react';

const features = [
    { icon: Moon, title: "Longform Journeys", desc: "60+ minute mixes for deep work and rest.", color: "#a78bfa" },
    { icon: Waves, title: "Sound Baths", desc: "Immersive washes to reset your nervous system.", color: "#818cf8" },
    { icon: Brain, title: "Binaural Textures", desc: "Alpha and theta wave frequencies.", color: "#6366f1" },
    { icon: Sparkles, title: "Monthly Updates", desc: "Fresh sonic architectures every month.", color: "#8b5cf6" }
];

import galaxyBg from '../../assets/backgrounds/galaxy_about.png';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section
            id="about"
            style={{
                padding: '140px 0',
                position: 'relative',
                background: `url(${galaxyBg}) center/cover fixed no-repeat`,
                overflow: 'hidden',
                willChange: 'transform',
                transform: 'translateZ(0)'
            }}
        >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(3, 3, 5, 0.85)' }} />

            {/* Floating Orbs */}
            <motion.div
                animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute', top: '15%', left: '10%',
                    width: '250px', height: '250px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)', zIndex: 0
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: '700px', margin: '0 auto 80px', textAlign: 'center' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(167, 139, 250, 0.1)',
                            border: '1px solid rgba(167, 139, 250, 0.2)',
                            padding: '8px 20px', borderRadius: '100px', marginBottom: '24px'
                        }}
                    >
                        <Heart size={14} color="var(--accent)" />
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                            OUR PHILOSOPHY
                        </span>
                    </motion.div>

                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '24px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.5) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Frequency for the Soul
                    </h2>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)', opacity: 0.8 }}>
                        This project is born from a desire to create a sanctuary of sound.
                        Whether you need to regulate your nervous system after a chaotic day,
                        find deep rest, or simply float in zero-gravity textures while you work,
                        this music is designed to hold you.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                backdropFilter: 'blur(30px)',
                                borderRadius: '24px',
                                padding: '48px 32px',
                                textAlign: 'center',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                position: 'relative', overflow: 'hidden'
                            }}
                        >
                            {/* Inner Glow/Sweep */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.color}10, transparent 70%)`,
                                    pointerEvents: 'none',
                                    zIndex: 0
                                }}
                            />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: 'absolute', top: '-50%', left: '-50%',
                                    width: '200%', height: '200%',
                                    background: `conic-gradient(from 0deg, transparent, ${feature.color}08, transparent)`,
                                    opacity: 0.3,
                                    pointerEvents: 'none'
                                }}
                            />

                            <motion.div
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                style={{
                                    width: '80px', height: '80px', borderRadius: '24px',
                                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 28px', border: `1px solid ${feature.color}25`,
                                    position: 'relative', zIndex: 1,
                                    boxShadow: `0 0 20px ${feature.color}10`
                                }}
                            >
                                <feature.icon size={36} color={feature.color} />
                            </motion.div>

                            <h3 style={{
                                fontSize: '1.4rem', marginBottom: '14px',
                                color: 'var(--text-primary)', fontWeight: 300,
                                position: 'relative', zIndex: 1,
                                letterSpacing: '0.02em',
                                fontFamily: 'var(--font-display)'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                fontSize: '1rem', margin: 0,
                                color: 'var(--text-secondary)', lineHeight: 1.6,
                                position: 'relative', zIndex: 1,
                                opacity: 0.7
                            }}>
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
