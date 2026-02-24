import { useTheme } from '../../hooks/useTheme';

interface ConfidenceBarProps {
  confidence: number;
  type: 'Organic' | 'Recyclable' | 'Hazardous';
}

export default function ConfidenceBar({ confidence, type }: ConfidenceBarProps) {
  const { colors } = useTheme();

  const getColor = (type: string) => {
    switch (type) {
      case 'Organic': return '#1F7A3D';
      case 'Recyclable': return '#2E5DA0';
      case 'Hazardous': return '#C0392B';
      default: return colors.textSecondary;
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.border,
        width: '100%',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${confidence}%`,
          backgroundColor: getColor(type),
          height: '100%',
          borderRadius: '4px',
          transition: 'width 500ms ease-out',
        }}
      />
    </div>
  );
}
