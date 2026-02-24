interface WasteBadgeProps {
  type: 'Organic' | 'Recyclable' | 'Hazardous';
}

export default function WasteBadge({ type }: WasteBadgeProps) {
  const getBadgeColors = (type: string) => {
    switch (type) {
      case 'Organic':
        return { bg: '#DCFCE7', text: '#15803D', bgDark: '#052E16', textDark: '#22C55E' };
      case 'Recyclable':
        return { bg: '#DBEAFE', text: '#1D4ED8', bgDark: '#1E3A5F', textDark: '#60A5FA' };
      case 'Hazardous':
        return { bg: '#FEE2E2', text: '#DC2626', bgDark: '#2D1515', textDark: '#EF4444' };
      default:
        return { bg: '#E2E8F0', text: '#64748B', bgDark: '#1E1E2E', textDark: '#94A3B8' };
    }
  };

  const colors = getBadgeColors(type);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <span
      style={{
        backgroundColor: isDark ? colors.bgDark : colors.bg,
        color: isDark ? colors.textDark : colors.text,
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
      }}
    >
      {type}
    </span>
  );
}
