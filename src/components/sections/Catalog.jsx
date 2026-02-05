import React, { useState } from 'react';
import { tracks } from '../../data/tracks';
import { usePlayer } from '../../contexts/PlayerContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause, Lock, Clock, Disc } from 'lucide-react';

import galaxyBg from '../../assets/backgrounds/galaxy_catalog.png';

// 3D Tilt Card Component
const TiltCard = ({ children, className, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000
            }}
        >
            {children}
        </motion.div>
    );
};

const Catalog = () => {
    const { playTrack, currentTrack, isPlaying } = usePlayer();
    const { user } = useAuth();
    const [hoveredId, setHoveredId] = useState(null);

    const handleTrackClick = (track) => {
        if (!track.isFree && user.plan === 'free') {
            alert("This is a Premium track. Use tokens to unlock or upgrade.");
            return;
        }
        playTrack(track);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="catalog" style={{
            padding: '120px 0',
            background: `url(${galaxyBg}) center/cover fixed no-repeat`,
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
            willChange: 'transform'
        }}>
            {/* Dark Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.8)' }} />

            {/* Animated Gradient */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(ellipse at 20% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)',
                        'radial-gradient(ellipse at 80% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)',
                        'radial-gradient(ellipse at 20% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)'
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
                        <Disc size={14} color="var(--accent)" />
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                            SOUND LIBRARY
                        </span>
                    </motion.div>

                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '16px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em'
                    }}>
                        Sound Catalog
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                        Handcrafted frequencies for every state of being
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '32px'
                    }}
                >
                    {tracks.map((track) => {
                        const isLocked = !track.isFree && user.plan === 'free';
                        const isCurrent = currentTrack?.id === track.id;
                        const isHovered = hoveredId === track.id;

                        return (
                            <motion.div key={track.id} variants={cardVariants}>
                                <TiltCard
                                    onClick={() => handleTrackClick(track)}
                                    className="cursor-pointer"
                                >
                                    <motion.div
                                        onMouseEnter={() => setHoveredId(track.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            backdropFilter: 'blur(30px)',
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            border: isCurrent
                                                ? '1px solid rgba(167, 139, 250, 0.4)'
                                                : '1px solid rgba(255, 255, 255, 0.04)',
                                            boxShadow: isCurrent
                                                ? '0 0 50px rgba(167, 139, 250, 0.15)'
                                                : '0 20px 40px rgba(0, 0, 0, 0.4)',
                                            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                            position: 'relative'
                                        }}
                                    >
                                        {/* Premium Shine Sweep */}
                                        <motion.div
                                            initial={{ x: '-100%', opacity: 0 }}
                                            animate={isHovered ? { x: '100%', opacity: 0.1 } : { x: '-100%', opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, width: '100%', height: '100%',
                                                background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                                                zIndex: 2,
                                                pointerEvents: 'none',
                                                transform: 'skewX(-20deg)'
                                            }}
                                        />
                                        {/* Image Container */}
                                        <div style={{
                                            height: '240px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <motion.img
                                                src={track.coverImage}
                                                alt={track.title}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                animate={{ scale: isHovered ? 1.1 : 1 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            />

                                            {/* Gradient Overlay */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                                            }} />

                                            {/* Play/Pause Button */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{
                                                    opacity: isHovered || isCurrent ? 1 : 0,
                                                    scale: isHovered || isCurrent ? 1 : 0.8
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '70px',
                                                    height: '70px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(167, 139, 250, 0.9)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 0 30px rgba(167, 139, 250, 0.5)'
                                                }}
                                            >
                                                {isCurrent && isPlaying ? (
                                                    <Pause size={28} color="#fff" />
                                                ) : (
                                                    <Play size={28} color="#fff" style={{ marginLeft: '4px' }} />
                                                )}
                                            </motion.div>

                                            {/* Lock Badge */}
                                            {isLocked && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '16px',
                                                        right: '16px',
                                                        background: 'rgba(0,0,0,0.7)',
                                                        backdropFilter: 'blur(10px)',
                                                        padding: '10px',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(255,255,255,0.1)'
                                                    }}
                                                >
                                                    <Lock size={16} color="var(--token-gold)" />
                                                </motion.div>
                                            )}

                                            {/* Now Playing Indicator */}
                                            {isCurrent && isPlaying && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '16px',
                                                    left: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    background: 'rgba(167, 139, 250, 0.2)',
                                                    padding: '8px 14px',
                                                    borderRadius: '100px',
                                                    backdropFilter: 'blur(10px)'
                                                }}>
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 0.5, repeat: Infinity }}
                                                        style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            background: 'var(--accent)'
                                                        }}
                                                    />
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>
                                                        NOW PLAYING
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                <div>
                                                    <h3 style={{
                                                        margin: 0,
                                                        fontSize: '1.25rem',
                                                        fontFamily: 'var(--font-display)',
                                                        fontWeight: 400,
                                                        marginBottom: '4px'
                                                    }}>
                                                        {track.title}
                                                    </h3>
                                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                        {track.artist}
                                                    </p>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    color: 'var(--text-muted)',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    <Clock size={14} />
                                                    {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: track.streamingLinks ? '16px' : '0' }}>
                                                {track.tags.map((tag, i) => (
                                                    <span key={i} style={{
                                                        fontSize: '0.7rem',
                                                        padding: '4px 12px',
                                                        borderRadius: '100px',
                                                        background: 'rgba(167, 139, 250, 0.1)',
                                                        color: 'var(--text-secondary)',
                                                        border: '1px solid rgba(167, 139, 250, 0.15)'
                                                    }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Streaming Links */}
                                            {track.streamingLinks && (
                                                <div style={{
                                                    paddingTop: '16px',
                                                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                                    display: 'flex',
                                                    gap: '12px',
                                                    alignItems: 'center'
                                                }}>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        color: 'var(--text-muted)',
                                                        letterSpacing: '0.05em'
                                                    }}>
                                                        STREAM ON:
                                                    </span>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        {track.streamingLinks.spotify && (
                                                            <a
                                                                href={track.streamingLinks.spotify}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    borderRadius: '50%',
                                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s ease',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(30, 215, 96, 0.2)';
                                                                    e.currentTarget.style.borderColor = '#1DB954';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                                }}
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
                                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        {track.streamingLinks.appleMusic && (
                                                            <a
                                                                href={track.streamingLinks.appleMusic}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    borderRadius: '50%',
                                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s ease',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(252, 61, 57, 0.2)';
                                                                    e.currentTarget.style.borderColor = '#FC3D39';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                                }}
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FC3D39">
                                                                    <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408a10.61 10.61 0 0 0-.1 1.18c0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 0 0 1.57-.1c.822-.106 1.596-.35 2.296-.81a5.046 5.046 0 0 0 1.88-2.207c.186-.42.293-.87.344-1.333.065-.586.092-1.175.092-1.765-.002-4.08 0-8.16 0-12.24zM9.43 4.683c0-.316.002-.633 0-.95a.863.863 0 0 1 .619-.877 1.04 1.04 0 0 1 .324-.039c1.585 0 3.17-.002 4.755 0 .254 0 .506.028.74.137.44.204.668.548.668 1.03v9.635a2.383 2.383 0 0 0-2.07-1.19c-1.36-.01-2.474 1.106-2.474 2.482 0 1.372 1.11 2.48 2.476 2.48 1.363 0 2.474-1.108 2.474-2.48V8.046h.002V6.422c2.045.173 3.59.68 4.632 1.526v.002c-.002.14-.004.278-.004.418 0 2.966 0 5.932-.002 8.898 0 .355-.032.71-.098 1.058a2.384 2.384 0 0 1-2.382 1.905c-1.355 0-2.47-1.107-2.47-2.48 0-1.372 1.115-2.48 2.47-2.48.54 0 1.042.18 1.446.482V4.683z" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        {track.streamingLinks.youtubeMusic && (
                                                            <a
                                                                href={track.streamingLinks.youtubeMusic}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    borderRadius: '50%',
                                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s ease',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)';
                                                                    e.currentTarget.style.borderColor = '#FF0000';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                                }}
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000">
                                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Catalog;
