import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { colors } = useTheme();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px', // Above the theme toggle
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: colors.textPrimary,
        color: colors.bg,
        padding: '10px 20px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
    >
      <WifiOff size={18} />
      <span>Offline Mode — results will sync when connected</span>
    </div>
  );
}
