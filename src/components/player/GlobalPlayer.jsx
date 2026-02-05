import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const GlobalPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, progress, duration, seek, nextTrack, prevTrack } = usePlayer();

    if (!currentTrack) return null;

    const progressPercent = duration ? (progress / duration) * 100 : 0;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
                position: 'fixed',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'auto',
                minWidth: '320px',
                maxWidth: '90vw',
                height: '60px',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '0 20px',
                background: 'rgba(20, 20, 30, 0.65)',
                backdropFilter: 'blur(16px)',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
        >

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={prevTrack}
                    aria-label="Previous"
                    className="player-btn-lite"
                >
                    <SkipBack size={18} />
                </button>

                <button
                    onClick={togglePlay}
                    style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>

                <button
                    onClick={nextTrack}
                    aria-label="Next"
                    className="player-btn-lite"
                >
                    <SkipForward size={18} />
                </button>
            </div>

            {/* Info & Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 500, color: 'white', maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentTrack.title}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                        {formatTime(progress)} / {formatTime(duration)}
                    </span>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const p = x / rect.width;
                        seek(p * duration);
                    }}
                >
                    <div style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '2px',
                    }} />
                </div>
            </div>

            <style>{`
                .player-btn-lite {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                .player-btn-lite:hover {
                    color: white;
                    background: rgba(255,255,255,0.1);
                }
            `}</style>
        </motion.div>
    );
};

const formatTime = (s) => {
    if (!s) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
};

export default GlobalPlayer;
