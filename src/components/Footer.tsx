import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function Footer() {
  const { colors } = useTheme();

  return (
    <footer
      style={{
        backgroundColor: colors.surface,
        borderTop: `1px solid ${colors.border}`,
        padding: '24px 32px',
        marginTop: 'auto',
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo */}
        <div
          style={{
            color: colors.primary,
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          ♻ WasteAI
        </div>

        {/* Center: Mission */}
        <div
          style={{
            color: colors.textSecondary,
            fontSize: '13px',
            textAlign: 'center',
          }}
        >
          Built for Swachh Bharat | Helping cities reduce landfill waste by 30%
        </div>

        {/* Right: Copyright */}
        <div
          style={{
            color: colors.textSecondary,
            fontSize: '13px',
          }}
        >
          © 2024 WasteAI
        </div>
      </div>
    </footer>
  );
}
