import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useTheme } from '../../hooks/useTheme';

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { colors } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh' }}>
      <div className={`sidebar-mobile ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 99,
          }}
        />
      )}
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main
        style={{
          marginLeft: '0',
          paddingTop: '56px',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  );
}
