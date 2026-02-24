import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Footer from '../Footer';
import { useTheme } from '../../hooks/useTheme';

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { colors } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <div className="sidebar-desktop">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Drawer */}
      <div
        className="sidebar-mobile"
        style={{
          position: 'fixed',
          left: sidebarOpen ? 0 : '-240px',
          top: 0,
          bottom: 0,
          width: '240px',
          zIndex: 101,
          transition: 'left 150ms',
        }}
      >
        <Sidebar />
      </div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 100,
          }}
          className="mobile-overlay"
        />
      )}
      
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main
        style={{
          marginLeft: '240px',
          paddingTop: '56px',
          minHeight: '100vh',
        }}
        className="main-content"
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
