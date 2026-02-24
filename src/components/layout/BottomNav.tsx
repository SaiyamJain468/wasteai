import { Link, useLocation } from 'react-router-dom';
import { Home, History, Trophy, BarChart3, HelpCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function BottomNav() {
  const { colors } = useTheme();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'HOME' },
    { to: '/history', icon: History, label: 'HISTORY' },
    { to: '/leaderboard', icon: Trophy, label: 'BOARD' },
    { to: '/dashboard', icon: BarChart3, label: 'STATS' },
    { to: '/quiz', icon: HelpCircle, label: 'QUIZ' },
    { to: '/impact', icon: TrendingUp, label: 'IMPACT' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: colors.sidebar,
        borderTop: `3px solid ${colors.border}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        zIndex: 100,
        width: '100%',
        maxWidth: '100vw',
      }}
      className="mobile-bottom-nav"
    >
      {navItems.map((item) => {
        const active = isActive(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              textDecoration: 'none',
              backgroundColor: active ? colors.activeNav : 'transparent',
              borderTop: `3px solid ${active ? colors.primary : 'transparent'}`,
              color: active ? colors.primary : colors.textSecondary,
              fontSize: '9px',
              fontWeight: 900,
              letterSpacing: '0.5px',
              transition: 'all 150ms',
            }}
          >
            <item.icon size={20} strokeWidth={3} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
