import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import { sessions } from '../../data/tracks';

const StartOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);
    const { playSession } = usePlayer();

    const handleEnter = () => {
        // Find a random session
        const randomSession = sessions[Math.floor(Math.random() * sessions.length)];

        // Play it
        playSession(randomSession);

        // Fade out overlay
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#030305',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            marginBottom: '40px',
                            fontFamily: 'var(--font-display, serif)'
                        }}>
                            AETHERIS
                        </h1>

                        <motion.button
                            onClick={handleEnter}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.3)',
                                padding: '16px 48px',
                                borderRadius: '100px',
                                color: 'white',
                                fontSize: '1rem',
                                letterSpacing: '0.1em',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                margin: '0 auto',
                                textTransform: 'uppercase'
                            }}
                        >
                            <Play size={16} fill="currentColor" />
                            Enter Experience
                        </motion.button>

                        <p style={{
                            marginTop: '24px',
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.4)',
                            maxWidth: '300px',
                            lineHeight: '1.5',
                            margin: '24px auto 0'
                        }}>
                            Use headphones for best immersion
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StartOverlay;
