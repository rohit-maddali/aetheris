import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Battery, HelpCircle, Map, User } from 'lucide-react';
import TokenInfoModal from '../ui/TokenInfoModal';
import ProfileModal from '../ui/ProfileModal';

const StatusPanel = () => {
    const { user } = useAuth();
    const [showTokenInfo, setShowTokenInfo] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
            <motion.div
                className="glass-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 100,
                    padding: '12px 20px',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    fontSize: '0.9rem'
                }}
            >
                <div
                    className="stat-item flex-center"
                    style={{ gap: '8px', cursor: 'pointer' }}
                    onClick={() => setShowProfile(true)}
                    title="View your Constellation"
                >
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, var(--accent), #818cf8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 10px rgba(167, 139, 250, 0.2)'
                    }}>
                        <Map size={14} color="white" />
                    </div>
                </div>

                <div
                    className="stat-item flex-center"
                    style={{ gap: '8px', cursor: 'pointer' }}
                    onClick={() => setShowTokenInfo(true)}
                    title="How do tokens work?"
                >
                    <Sparkles size={16} color="var(--token-gold)" />
                    <span style={{ fontWeight: 600, color: 'var(--token-gold)' }}>
                        {user.tokens}
                    </span>
                </div>

                <div className="stat-item flex-center" style={{ gap: '8px' }}>
                    <Zap size={16} color={user.plan === 'premium' ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', opacity: 0.8 }}>
                        {user.plan}
                    </span>
                </div>
            </motion.div>

            <TokenInfoModal isOpen={showTokenInfo} onClose={() => setShowTokenInfo(false)} />
            <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
        </>
    );
};

export default StatusPanel;
