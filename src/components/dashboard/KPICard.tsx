import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import Card from '../shared/Card';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

export default function KPICard({ title, value, icon, trend }: KPICardProps) {
  const { colors } = useTheme();

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '8px' }}>
            {title}
          </p>
          <p style={{ color: colors.textPrimary, fontSize: '28px', fontWeight: '700', margin: 0 }}>
            {value}
          </p>
          {trend && (
            <p style={{ color: '#22c55e', fontSize: '12px', marginTop: '4px' }}>
              {trend}
            </p>
          )}
        </div>
        <div style={{ color: colors.primary }}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
