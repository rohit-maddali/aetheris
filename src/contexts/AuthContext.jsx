import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Mock User State
    // Plans: 'guest' | 'free' | 'premium'
    const [user, setUser] = useState({
        id: 'guest',
        name: 'Guest User',
        plan: 'free', // Default to free for demo
        tokens: 50,    // Starting "Gravity Tokens"
        listeningHistory: [], // Array of track IDs
    });

    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    // Actions
    const login = (plan = 'free') => {
        setUser(prev => ({
            ...prev,
            id: 'demo-user-1',
            name: 'Cosmic Traveler',
            plan,
            tokens: plan === 'premium' ? 500 : 50,
            listeningHistory: [],
        }));
    };

    const spendTokens = (amount) => {
        if (user.tokens >= amount) {
            setUser(prev => ({ ...prev, tokens: prev.tokens - amount }));
            return true;
        }
        return false;
    };

    const earnTokens = (amount) => {
        setUser(prev => ({ ...prev, tokens: prev.tokens + amount }));
    };

    const recordListen = (trackId) => {
        setUser(prev => {
            if (prev.listeningHistory.includes(trackId)) return prev;
            return {
                ...prev,
                listeningHistory: [...prev.listeningHistory, trackId]
            };
        });
    };

    // Deprecated usage limit: Users can now listen freely
    const incrementUsage = () => {
        // No-op
    };

    const canPlay = () => {
        // Only premium tracks are locked by their own property check in UI
        return true;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            spendTokens,
            earnTokens,
            recordListen,
            incrementUsage,
            canPlay,
            isAuthModalOpen,
            setAuthModalOpen
        }}>
            {children}
        </AuthContext.Provider>
    );
};
