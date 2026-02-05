import React, { useState } from 'react';
import { sessions, tracks } from '../../data/tracks';
import { usePlayer } from '../../contexts/PlayerContext';
import { motion } from 'framer-motion';
import { Play, Clock, Headphones, Zap } from 'lucide-react';

import galaxyBg from '../../assets/backgrounds/galaxy_sessions.png';

const Sessions = () => {
    const { playTrack } = usePlayer();
    const [hoveredId, setHoveredId] = useState(null);

    const handlePlaySession = (session) => {
        const firstTrackId = session.tracks[0];
        const track = tracks.find(t => t.id === firstTrackId);
        if (track) playTrack(track);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -10 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const getSessionIcon = (type) => {
        switch (type) {
            case 'Sleep': return '🌙';
            case 'Focus': return '🎯';
            case 'Calm': return '🌊';
            case 'Trip': return '🚀';
            default: return '✨';
        }
    };

    return (
        <section id="sessions-section" style={{
            padding: '120px 0',
            position: 'relative',
            overflow: 'hidden',
            background: `url(${galaxyBg}) center/cover fixed no-repeat`,
            willChange: 'transform'
        }}>
            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.92) 100%)',
                zIndex: 0
            }} />

            {/* Animated Orbs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
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
                            background: 'rgba(129, 140, 248, 0.1)',
                            border: '1px solid rgba(129, 140, 248, 0.2)',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            marginBottom: '24px'
                        }}
                    >
                        <Headphones size={14} color="#818cf8" />
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: '#818cf8' }}>
                            GUIDED JOURNEYS
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
                        Curated Sessions
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', opacity: 0.8 }}>
                        Extended journeys crafted for deep states of consciousness
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '28px'
                    }}
                >
                    {sessions.map((session) => {
                        const isHovered = hoveredId === session.id;

                        return (
                            <motion.div
                                key={session.id}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredId(session.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -12 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    transition: 'all 0.4s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handlePlaySession(session)}
                            >
                                {/* Image Header */}
                                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                                    <motion.img
                                        src={session.coverImage}
                                        alt={session.title}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        animate={{ scale: isHovered ? 1.1 : 1 }}
                                        transition={{ duration: 0.6 }}
                                    />

                                    {/* Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                                    }} />

                                    {/* Session Type Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
                                        background: 'rgba(0,0,0,0.5)',
                                        backdropFilter: 'blur(10px)',
                                        padding: '8px 14px',
                                        borderRadius: '100px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <span>{getSessionIcon(session.type)}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 500 }}>
                                            {session.type}
                                        </span>
                                    </div>

                                    {/* Play Button */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: isHovered ? 1 : 0.7,
                                            scale: isHovered ? 1.1 : 1
                                        }}
                                        style={{
                                            position: 'absolute',
                                            bottom: '16px',
                                            right: '16px',
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 0 30px rgba(129, 140, 248, 0.4)'
                                        }}
                                    >
                                        <Play size={22} color="#fff" fill="#fff" style={{ marginLeft: '3px' }} />
                                    </motion.div>

                                    {/* Title on Image */}
                                    <h3 style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        left: '20px',
                                        right: '80px',
                                        margin: 0,
                                        fontSize: '1.4rem',
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 400,
                                        color: '#fff',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                                    }}>
                                        {session.title}
                                    </h3>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '24px' }}>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        margin: '0 0 20px 0',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.6
                                    }}>
                                        {session.description}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: '16px',
                                        borderTop: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                            <Clock size={14} />
                                            <span style={{ fontSize: '0.85rem' }}>{session.length}</span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                            <Zap size={14} color="var(--accent)" />
                                            <span style={{ fontSize: '0.85rem' }}>{session.tracks.length} tracks</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Sessions;
