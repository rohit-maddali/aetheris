import React, { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import StartOverlay from './components/ui/StartOverlay';

// Lazy load sections below the fold
const About = lazy(() => import('./components/sections/About'));
const ArtistBio = lazy(() => import('./components/sections/ArtistBio'));
const Sessions = lazy(() => import('./components/sections/Sessions'));
const Catalog = lazy(() => import('./components/sections/Catalog'));
const Pricing = lazy(() => import('./components/sections/Pricing'));

function App() {
    return (
        <Layout>
            <StartOverlay />
            <Hero />
            <Suspense fallback={null}>
                <About />
                <Catalog />
                <Sessions />
                <Pricing />
                <ArtistBio />
            </Suspense>

            {/* Footer / Copyright */}
            <footer style={{ padding: '60px 20px', textAlign: 'center', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                <div style={{ marginBottom: '8px' }}>
                    &copy; {new Date().getFullYear()} AETHERIS AMBIENT
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    All music composed and produced by Rohit Maddali
                </div>
            </footer>
        </Layout>
    );
}

export default App;
