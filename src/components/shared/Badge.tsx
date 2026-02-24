interface BadgeProps {
  type: 'Organic' | 'Recyclable' | 'Hazardous';
  size?: 'sm' | 'md';
}

export default function Badge({ type, size = 'md' }: BadgeProps) {
  const getBadgeColors = (type: string) => {
    switch (type) {
      case 'Organic':
        return { bg: '#DCFCE7', text: '#15803D', border: '#16A34A', bgDark: '#052E16', textDark: '#22C55E', borderDark: '#16A34A' };
      case 'Recyclable':
        return { bg: '#DBEAFE', text: '#1D4ED8', border: '#2563EB', bgDark: '#1E3A5F', textDark: '#60A5FA', borderDark: '#3B82F6' };
      case 'Hazardous':
        return { bg: '#FEE2E2', text: '#DC2626', border: '#DC2626', bgDark: '#2D1515', textDark: '#EF4444', borderDark: '#EF4444' };
      default:
        return { bg: '#E2E8F0', text: '#64748B', border: '#64748B', bgDark: '#1E1E2E', textDark: '#94A3B8', borderDark: '#64748B' };
    }
  };

  const colors = getBadgeColors(type);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <span
      style={{
        backgroundColor: isDark ? colors.bgDark : colors.bg,
        color: isDark ? colors.textDark : colors.text,
        border: `1px solid ${isDark ? colors.borderDark : colors.border}`,
        padding: size === 'sm' ? '2px 8px' : '4px 12px',
        borderRadius: '4px',
        fontSize: size === 'sm' ? '10px' : '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
      }}
    >
      {type}
    </span>
  );
}
