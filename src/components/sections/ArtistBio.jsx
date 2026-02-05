import React from 'react';
import './ArtistBio.css';

const ArtistBio = () => {
    return (
        <section className="artist-bio" id="artist">
            <div className="artist-bio__container">
                {/* Header */}
                <div className="artist-bio__header">
                    <h2 className="artist-bio__title">
                        <span className="gradient-text">The Artist</span>
                    </h2>
                    <div className="artist-bio__subtitle">Rohit Maddali</div>
                </div>

                {/* Main Content - Single Column */}
                <div className="artist-bio__content-centered">
                    <div className="bio-card bio-card--philosophy">
                        <p className="bio-card__text bio-card__text--large">
                            The void speaks in frequencies.
                        </p>
                        <p className="bio-card__text bio-card__text--closing">
                            Aetheris is an architecture of the unseen—a transmission designed to dissolve the noise
                            and reveal the signal. NOT just sound. A memory.
                        </p>
                    </div>

                    {/* Streaming Links - Centered */}
                    <div className="streaming-section">
                        <h4 className="streaming-section__title">Listen on Streaming Platforms</h4>
                        <div className="streaming-links streaming-links--centered">
                            <a
                                href="https://open.spotify.com/artist/rohit-maddali"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="streaming-link"
                            >
                                <svg className="streaming-link__icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                                <span>Spotify</span>
                            </a>
                            <a
                                href="https://music.apple.com/artist/rohit-maddali"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="streaming-link"
                            >
                                <svg className="streaming-link__icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408a10.61 10.61 0 0 0-.1 1.18c0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 0 0 1.57-.1c.822-.106 1.596-.35 2.296-.81a5.046 5.046 0 0 0 1.88-2.207c.186-.42.293-.87.344-1.333.065-.586.092-1.175.092-1.765-.002-4.08 0-8.16 0-12.24zM9.43 4.683c0-.316.002-.633 0-.95a.863.863 0 0 1 .619-.877 1.04 1.04 0 0 1 .324-.039c1.585 0 3.17-.002 4.755 0 .254 0 .506.028.74.137.44.204.668.548.668 1.03v9.635a2.383 2.383 0 0 0-2.07-1.19c-1.36-.01-2.474 1.106-2.474 2.482 0 1.372 1.11 2.48 2.476 2.48 1.363 0 2.474-1.108 2.474-2.48V8.046h.002V6.422c2.045.173 3.59.68 4.632 1.526v.002c-.002.14-.004.278-.004.418 0 2.966 0 5.932-.002 8.898 0 .355-.032.71-.098 1.058a2.384 2.384 0 0 1-2.382 1.905c-1.355 0-2.47-1.107-2.47-2.48 0-1.372 1.115-2.48 2.47-2.48.54 0 1.042.18 1.446.482V4.683z" />
                                </svg>
                                <span>Apple Music</span>
                            </a>
                            <a
                                href="https://music.youtube.com/search?q=rohit+maddali"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="streaming-link"
                            >
                                <svg className="streaming-link__icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                <span>YouTube Music</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtistBio;
