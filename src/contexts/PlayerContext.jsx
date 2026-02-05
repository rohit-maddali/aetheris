import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { tracks } from '../data/tracks';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const { earnTokens, incrementUsage, recordListen } = useAuth();

    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState([]);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(new Audio());
    const analyzerRef = useRef(null);
    const audioContextRef = useRef(null);
    const sourceRef = useRef(null);

    // Track listen completion logic
    const [hasEarnedTokenForCurrent, setHasEarnedTokenForCurrent] = useState(false);

    useEffect(() => {
        // Audio event listeners
        const audio = audioRef.current;
        audio.crossOrigin = "anonymous"; // Essential for visualizers with external URLs

        const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 0);

            // Listen-to-earn logic: Earn token if played > 90%
            if (!hasEarnedTokenForCurrent && audio.duration > 0 && (audio.currentTime / audio.duration) > 0.9) {
                earnTokens(5); // 5 tokens per track
                setHasEarnedTokenForCurrent(true);
                incrementUsage();
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            nextTrack();
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [hasEarnedTokenForCurrent]);

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
                analyzerRef.current = audioContextRef.current.createAnalyser();
                analyzerRef.current.fftSize = 256;

                // Create source only once
                if (!sourceRef.current) {
                    sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
                    sourceRef.current.connect(analyzerRef.current);
                    analyzerRef.current.connect(audioContextRef.current.destination);
                }
            } catch (e) {
                console.warn("AudioContext init failed (interaction needed?):", e);
            }
        }
    };

    const playTrack = async (track) => {
        initAudioContext();

        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        // If it's a new track
        if (currentTrack?.id !== track.id) {
            setCurrentTrack(track);
            // Check if url is absolute or relative
            const isAbsolute = track.audioUrl.startsWith('http');
            audioRef.current.src = track.audioUrl;
            setHasEarnedTokenForCurrent(false);
            recordListen(track.id);
        }

        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (e) {
            console.error("Play failed:", e);
            setIsPlaying(false);
        }
    };

    const togglePlay = async () => {
        initAudioContext();
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        if (audioRef.current.paused) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (e) { console.error("Play failed", e) }
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const playSession = (session) => {
        const sessionTracks = session.tracks.map(id => tracks.find(t => t.id === id)).filter(Boolean);
        if (sessionTracks.length > 0) {
            setQueue(sessionTracks);
            playTrack(sessionTracks[0]);
        }
    };

    const nextTrack = () => {
        if (!currentTrack) return;

        if (queue.length > 0) {
            const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
            if (currentIndex !== -1) {
                const nextIndex = (currentIndex + 1) % queue.length;
                playTrack(queue[nextIndex]);
                return;
            }
        }

        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % tracks.length;
        playTrack(tracks[nextIndex]);
    };

    const prevTrack = () => {
        if (!currentTrack) return;

        if (queue.length > 0) {
            const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
            if (currentIndex !== -1) {
                const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
                playTrack(queue[prevIndex]);
                return;
            }
        }

        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        playTrack(tracks[prevIndex]);
    };

    const seek = (time) => {
        audioRef.current.currentTime = time;
    };

    return (
        <PlayerContext.Provider value={{
            currentTrack,
            isPlaying,
            queue,
            progress,
            duration,
            playTrack,
            togglePlay,
            nextTrack,
            prevTrack,
            seek,
            playSession,
            analyzer: analyzerRef.current
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
