import { Menu, Bell, Flame } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect } from 'react';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { colors } = useTheme();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('wasteai_streak');
    if (saved) setStreak(parseInt(saved));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        backgroundColor: colors.topbar,
        borderBottom: `3px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 90,
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: colors.textPrimary,
        }}
      >
        <Menu size={24} strokeWidth={3} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Streak */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: colors.surface,
            border: `3px solid ${colors.primary}`,
          }}
        >
          <Flame size={16} color={colors.primary} strokeWidth={3} />
          <span className="font-mono" style={{ fontSize: '14px', fontWeight: 900, color: colors.primary }}>
            {streak}
          </span>
        </div>

        {/* Notifications */}
        <button
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            border: `3px solid ${colors.border}`,
            cursor: 'pointer',
            color: colors.textSecondary,
            transition: 'all 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.primaryHover;
            e.currentTarget.style.color = colors.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.color = colors.textSecondary;
          }}
        >
          <Bell size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
