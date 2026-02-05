import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const TokenInfoModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-panel"
                        style={{
                            width: '90%', maxWidth: '500px', padding: '30px',
                            background: 'var(--bg-surface)', border: '1px solid var(--primary-dim)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Sparkles size={20} color="var(--token-gold)" /> Gravity Tokens
                            </h3>
                            <button onClick={onClose}><X size={24} /></button>
                        </div>

                        <div style={{ color: 'var(--text-secondary)' }}>
                            <p>Aetheris is designed to reward you for taking time to rest.</p>

                            <ul style={{ lineHeight: '1.8', margin: '20px 0' }}>
                                <li><strong>Earn 5 Tokens</strong> for every track you fully listen to.</li>
                                <li><strong>Earn 20 Tokens</strong> for completing a full Session.</li>
                                <li><strong>Premium Users</strong> earn 2x tokens.</li>
                            </ul>

                            <p><strong>Use your tokens to:</strong></p>
                            <ul style={{ lineHeight: '1.8' }}>
                                <li>Unlock Premium tracks for 24 hours.</li>
                                <li>Extend your Free Tier listening limits.</li>
                            </ul>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                width: '100%', marginTop: '20px', padding: '12px',
                                background: 'var(--text-primary)', color: 'var(--bg-deep)',
                                borderRadius: '8px', fontWeight: 600
                            }}
                        >
                            Got it
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TokenInfoModal;
