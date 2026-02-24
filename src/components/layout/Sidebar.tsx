import { Link, useLocation } from 'react-router-dom';
import { Home, History, Trophy, BarChart3, HelpCircle, TrendingUp, User, LogOut } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { colors } = useTheme();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { to: '/', icon: Home, label: 'HOME' },
    { to: '/history', icon: History, label: 'HISTORY' },
    { to: '/leaderboard', icon: Trophy, label: 'LEADERBOARD' },
    { to: '/dashboard', icon: BarChart3, label: 'DASHBOARD' },
    { to: '/quiz', icon: HelpCircle, label: 'QUIZ' },
    { to: '/impact', icon: TrendingUp, label: 'IMPACT' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '240px',
        backgroundColor: colors.sidebar,
        borderRight: `3px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
      }}
      className="sidebar-desktop"
    >
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: `3px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '28px' }}>♻️</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: colors.primary, letterSpacing: '1px' }}>WASTEAI</div>
            <div style={{ fontSize: '9px', color: colors.textMuted, fontWeight: 700, letterSpacing: '1.5px' }}>CIVIC TECH</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                marginBottom: '6px',
                textDecoration: 'none',
                backgroundColor: active ? colors.activeNav : 'transparent',
                border: `3px solid ${active ? colors.primary : 'transparent'}`,
                color: active ? colors.primary : colors.textSecondary,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.8px',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = colors.primaryHover;
                  e.currentTarget.style.color = colors.primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.color = colors.textSecondary;
                }
              }}
            >
              <item.icon size={18} strokeWidth={3} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div style={{ height: '3px', backgroundColor: colors.border, margin: '16px 0' }} />

        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            marginBottom: '6px',
            textDecoration: 'none',
            border: '3px solid transparent',
            color: colors.textSecondary,
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            transition: 'all 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.primaryHover;
            e.currentTarget.style.color = colors.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.color = colors.textSecondary;
          }}
        >
          <User size={18} strokeWidth={3} />
          <span>PROFILE</span>
        </Link>

        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            border: '3px solid transparent',
            backgroundColor: 'transparent',
            color: colors.textSecondary,
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            cursor: 'pointer',
            transition: 'all 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.primaryHover;
            e.currentTarget.style.color = colors.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.color = colors.textSecondary;
          }}
        >
          <LogOut size={18} strokeWidth={3} />
          <span>SIGN OUT</span>
        </button>
      </nav>
    </div>
  );
}
