import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ message, icon }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      {icon || <PackageOpen size={48} color={colors.textSecondary} style={{ margin: '0 auto 16px' }} />}
      <p style={{ color: colors.textSecondary, fontSize: '14px' }}>{message}</p>
    </div>
  );
}
