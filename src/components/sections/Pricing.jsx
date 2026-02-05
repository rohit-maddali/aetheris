import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Rocket } from 'lucide-react';

import galaxyBg from '../../assets/backgrounds/galaxy_pricing.png';

const Pricing = () => {
    const { login, user } = useAuth();
    const [hoveredPlan, setHoveredPlan] = useState(null);

    const plans = [
        {
            name: 'Free',
            icon: Rocket,
            price: '$0',
            period: 'forever',
            description: 'Perfect for exploring the cosmos',
            features: [
                'Access to Free Tracks',
                'Standard Audio Quality',
                'Earn Token Rewards',
                'Basic Sessions',
                'Community Access'
            ],
            action: () => login('free'),
            isActive: user.plan === 'free',
            gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)'
        },
        {
            name: 'Premium',
            icon: Crown,
            price: '$9',
            period: '/month',
            description: 'The ultimate sonic experience',
            features: [
                'Unlimited Streaming',
                'High Fidelity Audio (FLAC)',
                'All Sessions & Journeys',
                '2x Token Rewards',
                'Early Access to New Tracks',
                'Offline Downloads',
                'Support the Art'
            ],
            action: () => login('premium'),
            isActive: user.plan === 'premium',
            highlight: true,
            gradient: 'linear-gradient(135deg, #1a1a3e, #2d1b4e)'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60, rotateY: -5 },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section
            id="pricing-section"
            style={{
                padding: '120px 0',
                position: 'relative',
                background: `url(${galaxyBg}) center/cover fixed no-repeat`,
                overflow: 'hidden',
                willChange: 'transform'
            }}
        >
            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(3, 3, 5, 0.88)' }} />

            {/* Animated Gradient Background */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(ellipse at 30% 50%, rgba(167, 139, 250, 0.05) 0%, transparent 50%)',
                        'radial-gradient(ellipse at 70% 50%, rgba(129, 140, 248, 0.05) 0%, transparent 50%)',
                        'radial-gradient(ellipse at 30% 50%, rgba(167, 139, 250, 0.05) 0%, transparent 50%)'
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', inset: 0 }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(167, 139, 250, 0.1)',
                            border: '1px solid rgba(167, 139, 250, 0.2)',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            marginBottom: '24px'
                        }}
                    >
                        <Sparkles size={14} color="var(--accent)" />
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                            MEMBERSHIP
                        </span>
                    </motion.div>

                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '16px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.5) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Join the Orbit
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', opacity: 0.8 }}>
                        Choose your path through the cosmos
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '32px',
                        perspective: '1000px'
                    }}
                >
                    {plans.map((plan) => {
                        const isHovered = hoveredPlan === plan.name;
                        const Icon = plan.icon;

                        return (
                            <motion.div
                                key={plan.name}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredPlan(plan.name)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                whileHover={{
                                    y: -16,
                                    rotateY: plan.highlight ? 3 : -3,
                                    transition: { duration: 0.4 }
                                }}
                                style={{
                                    padding: '3px', // For border gradient
                                    borderRadius: '28px',
                                    background: plan.highlight
                                        ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.5), rgba(129, 140, 248, 0.5), rgba(167, 139, 250, 0.5))'
                                        : 'rgba(255,255,255,0.08)',
                                    width: '100%',
                                    maxWidth: '380px',
                                    position: 'relative'
                                }}
                            >
                                {/* Animated border for premium */}
                                {plan.highlight && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            position: 'absolute',
                                            inset: '-2px',
                                            borderRadius: '30px',
                                            background: 'conic-gradient(from 0deg, transparent, rgba(167, 139, 250, 0.8), transparent, rgba(129, 140, 248, 0.8), transparent)',
                                            filter: 'blur(8px)',
                                            opacity: isHovered ? 0.8 : 0.4,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                    />
                                )}

                                <div style={{
                                    padding: '40px 32px',
                                    borderRadius: '25px',
                                    background: plan.gradient,
                                    backdropFilter: 'blur(20px)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: '100%'
                                }}>
                                    {/* Shine Effect */}
                                    <motion.div
                                        initial={{ x: '-100%', opacity: 0 }}
                                        animate={isHovered ? { x: '200%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '50%',
                                            height: '100%',
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                            transform: 'skewX(-20deg)'
                                        }}
                                    />

                                    {/* Recommended Badge */}
                                    {plan.highlight && (
                                        <motion.div
                                            initial={{ y: -10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                top: '-14px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
                                                color: '#000',
                                                padding: '8px 20px',
                                                borderRadius: '100px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                boxShadow: '0 4px 20px rgba(167, 139, 250, 0.4)'
                                            }}
                                        >
                                            <Sparkles size={12} /> RECOMMENDED
                                        </motion.div>
                                    )}

                                    {/* Plan Icon */}
                                    <motion.div
                                        animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '16px',
                                            background: plan.highlight
                                                ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(129, 140, 248, 0.3))'
                                                : 'rgba(255,255,255,0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '24px',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        <Icon size={28} color={plan.highlight ? '#a78bfa' : 'var(--text-secondary)'} />
                                    </motion.div>

                                    <h3 style={{
                                        color: plan.highlight ? 'var(--accent)' : 'var(--text-primary)',
                                        fontSize: '1.5rem',
                                        marginBottom: '8px',
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 400
                                    }}>
                                        {plan.name}
                                    </h3>

                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '24px'
                                    }}>
                                        {plan.description}
                                    </p>

                                    <div style={{ marginBottom: '32px' }}>
                                        <span style={{
                                            fontSize: '4rem',
                                            fontWeight: 600,
                                            fontFamily: 'var(--font-display)',
                                            background: plan.highlight
                                                ? 'linear-gradient(135deg, #fff, #a78bfa)'
                                                : 'linear-gradient(135deg, #fff, #888)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                            {plan.price}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                                            {plan.period}
                                        </span>
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                                        {plan.features.map((f, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '14px',
                                                    marginBottom: '16px',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                <div style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: plan.highlight
                                                        ? 'rgba(167, 139, 250, 0.2)'
                                                        : 'rgba(255,255,255,0.05)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <Check size={14} color={plan.highlight ? 'var(--accent)' : 'var(--text-muted)'} />
                                                </div>
                                                {f}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <motion.button
                                        onClick={plan.action}
                                        disabled={plan.isActive}
                                        whileHover={{ scale: plan.isActive ? 1 : 1.03 }}
                                        whileTap={{ scale: plan.isActive ? 1 : 0.98 }}
                                        style={{
                                            width: '100%',
                                            padding: '18px',
                                            borderRadius: '14px',
                                            background: plan.isActive
                                                ? 'rgba(255,255,255,0.05)'
                                                : (plan.highlight
                                                    ? 'linear-gradient(90deg, #a78bfa, #818cf8)'
                                                    : 'rgba(255,255,255,0.1)'),
                                            color: plan.isActive ? 'var(--text-muted)' : 'white',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            cursor: plan.isActive ? 'default' : 'pointer',
                                            border: 'none',
                                            transition: 'all 0.3s ease',
                                            boxShadow: plan.highlight && !plan.isActive
                                                ? '0 8px 30px rgba(167, 139, 250, 0.3)'
                                                : 'none'
                                        }}
                                    >
                                        {plan.isActive ? '✓ Current Plan' : `Choose ${plan.name}`}
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
