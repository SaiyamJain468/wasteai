import { useTheme } from '../../hooks/useTheme';
import Badge from '../shared/Badge';
import ConfidenceBar from './ConfidenceBar';

interface ResultCardProps {
  type: 'Organic' | 'Recyclable' | 'Hazardous';
  confidence: number;
  imageUrl?: string;
}

export default function ResultCard({ type, confidence, imageUrl }: ResultCardProps) {
  const { colors } = useTheme();

  const getBinLabel = (type: string) => {
    switch (type) {
      case 'Organic': return 'GREEN BIN';
      case 'Recyclable': return 'BLUE BIN';
      case 'Hazardous': return 'RED BIN / Special Disposal';
      default: return '';
    }
  };

  const getCO2Saved = (type: string) => {
    switch (type) {
      case 'Organic': return 0.5;
      case 'Recyclable': return 0.2;
      case 'Hazardous': return 1.0;
      default: return 0.1;
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        padding: '20px',
      }}
      className="flex flex-col sm:flex-row gap-5"
    >
      {imageUrl && (
        <div className="w-full sm:w-[150px] h-[200px] sm:h-[150px] flex-shrink-0">
          <img
            src={imageUrl}
            alt="Waste"
            style={{ border: `1px solid ${colors.border}` }}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            {type.toUpperCase()}
          </h2>
          <div className="mt-2">
            <Badge type={type} />
          </div>
        </div>

        <p className="text-sm mt-3 mb-2" style={{ color: colors.textSecondary }}>
          {confidence.toFixed(1)}% confident
        </p>

        <ConfidenceBar confidence={confidence} type={type} />

        <div className="flex flex-col gap-1 mt-3">
          <p className="text-sm font-bold" style={{ color: colors.textPrimary }}>
            📥 Place in: {getBinLabel(type)}
          </p>
          <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>
            🌍 CO₂ Prevented: <span className="text-green-600 font-bold">{getCO2Saved(type)}kg</span>
          </p>
        </div>
      </div>
    </div>
  );
}
