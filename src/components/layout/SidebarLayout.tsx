import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
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
      
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
      
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
