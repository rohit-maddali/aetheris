import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShieldCheck, Map } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ConstellationMap from './ConstellationMap';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(3, 3, 5, 0.9)',
                            backdropFilter: 'blur(20px)'
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '900px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '32px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '40px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            background: 'linear-gradient(to bottom, rgba(167, 139, 250, 0.05), transparent)'
                        }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '24px',
                                    background: 'linear-gradient(135deg, var(--accent), #818cf8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)'
                                }}>
                                    <User size={40} color="white" />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>
                                        {user.name}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '0.7rem',
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            background: 'rgba(167, 139, 250, 0.1)',
                                            color: 'var(--accent)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        }}>
                                            <ShieldCheck size={12} />
                                            {user.plan} Member
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '0 40px 40px 40px' }}>
                            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Map size={18} color="var(--accent)" />
                                <h3 style={{ fontSize: '1rem', fontWeight: 400, letterSpacing: '0.05em', margin: 0 }}>
                                    Your Cosmic Constellation
                                </h3>
                            </div>

                            <ConstellationMap history={user.listeningHistory} />

                            <div style={{ marginTop: '24px', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem' }}>
                                Tracks are mapped by frequency and intention.
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
