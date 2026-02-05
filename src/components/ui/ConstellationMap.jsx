import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { tracks } from '../../data/tracks';
import { Compass, Star as StarIcon } from 'lucide-react';

const ConstellationMap = ({ history = [] }) => {
    // Generate stable positions for stars based on track data
    const mappedStars = useMemo(() => {
        return history.map(trackId => {
            const track = tracks.find(t => t.id === trackId);
            if (!track) return null;

            // Stable hash based positioning
            const hash = trackId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const angle = (hash % 360) * (Math.PI / 180);
            const radius = 50 + (hash % 150); // Randomish radius within range

            return {
                ...track,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                scale: 0.8 + (hash % 10) / 10
            };
        }).filter(Boolean);
    }, [history]);

    // Find connections between stars sharing at least one tag
    const connections = useMemo(() => {
        const lines = [];
        for (let i = 0; i < mappedStars.length; i++) {
            for (let j = i + 1; j < mappedStars.length; j++) {
                const s1 = mappedStars[i];
                const s2 = mappedStars[j];
                const sharedTags = s1.tags.filter(tag => s2.tags.includes(tag));

                if (sharedTags.length > 0) {
                    lines.push({ x1: s1.x, y1: s1.y, x2: s2.x, y2: s2.y, id: `${s1.id}-${s2.id}` });
                }
            }
        }
        return lines;
    }, [mappedStars]);

    if (history.length === 0) {
        return (
            <div style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
                textAlign: 'center'
            }}>
                <Compass size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                <p style={{ fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                    YOUR CONSTELLATION IS WAITING TO BE BORN<br />
                    <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>LISTEN TO TRACKS TO PLOT YOUR JOURNEY</span>
                </p>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative',
            height: '500px',
            width: '100%',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.05) 0%, transparent 70%)',
            borderRadius: '24px',
            cursor: 'crosshair',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* SVG Layer for Connections */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <g transform="translate(250, 250)"> {/* Center group */}
                    {connections.map(line => (
                        <motion.line
                            key={line.id}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.2 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="var(--accent)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                    ))}
                </g>
            </svg>

            {/* Stars Layer */}
            <div style={{ position: 'relative', transform: 'translate(0, 0)' }}>
                {mappedStars.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.5, zIndex: 10 }}
                        style={{
                            position: 'absolute',
                            left: star.x,
                            top: star.y,
                            width: '8px',
                            height: '8px',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1
                        }}
                    >
                        {/* Tooltip on Hover */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: -20 }}
                            style={{
                                position: 'absolute',
                                bottom: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(3, 3, 5, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{star.title}</div>
                            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{star.tags.join(' • ')}</div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Legend/Info */}
            <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: 0.6
            }}>
                <StarIcon size={12} color="var(--accent)" />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                    {history.length} OBJECTS PLOTTED
                </span>
            </div>
        </div>
    );
};

export default ConstellationMap;
