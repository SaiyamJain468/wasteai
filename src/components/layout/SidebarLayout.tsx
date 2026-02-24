import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useTheme } from '../../hooks/useTheme';

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh' }}>
      <Sidebar />
      <TopBar />
      <main
        style={{
          marginLeft: '240px',
          paddingTop: '56px',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  );
}
