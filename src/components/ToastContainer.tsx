import React from 'react';
import { useToast } from '../hooks/useToast';
import { useTheme } from '../hooks/useTheme';
import { X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();
  const { colors } = useTheme();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none', // Allow clicking through the container area
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            backgroundColor: colors.surface,
            color: colors.textPrimary,
            padding: '16px 24px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderLeft: `4px solid ${
              toast.type === 'success'
                ? colors.primary
                : toast.type === 'error'
                ? colors.danger
                : colors.secondary
            }`,
            minWidth: '300px',
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
            animation: 'slideIn 150ms ease-out',
            transition: 'all 150ms ease-out',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '12px',
              color: colors.textSecondary,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
