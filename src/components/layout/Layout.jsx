import React from 'react';
import StatusPanel from './StatusPanel';
import GlobalPlayer from '../player/GlobalPlayer';
import Cursor from '../ui/Cursor';

const Layout = ({ children }) => {
    return (
        <div className="layout-root">
            <Cursor />
            <div className="bg-noise" />
            <StatusPanel />

            <main className="main-content">
                {children}
            </main>

            <GlobalPlayer />
        </div>
    );
};

export default Layout;
