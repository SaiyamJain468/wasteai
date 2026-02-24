import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { mode, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        backgroundColor: colors.primary,
        border: `3px solid ${colors.primary}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        transition: 'all 150ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primaryHover;
        e.currentTarget.style.borderColor = colors.primaryHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary;
        e.currentTarget.style.borderColor = colors.primary;
      }}
    >
      {mode === 'light' ? <Moon size={24} color="#000" strokeWidth={3} /> : <Sun size={24} color="#000" strokeWidth={3} />}
    </button>
  );
}
