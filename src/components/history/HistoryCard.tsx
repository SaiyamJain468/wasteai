import { useTheme } from '../../hooks/useTheme';
import Badge from '../shared/Badge';
import Card from '../shared/Card';

interface WasteLog {
  id: string;
  date: string;
  type: 'Organic' | 'Recyclable' | 'Hazardous';
  confidence: number;
  points: number;
}

interface HistoryCardProps {
  log: WasteLog;
}

export default function HistoryCard({ log }: HistoryCardProps) {
  const { colors } = useTheme();

  return (
    <Card className="mb-4">
      <div className="flex justify-between items-start mb-2">
        <Badge type={log.type} />
        <span style={{ color: colors.textSecondary, fontSize: '12px' }}>
          {new Date(log.date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span style={{ color: colors.textSecondary, fontSize: '14px' }}>
          Confidence: {log.confidence.toFixed(1)}%
        </span>
        <span style={{ color: colors.primary, fontSize: '16px', fontWeight: '700' }}>
          +{log.points} pts
        </span>
      </div>
    </Card>
  );
}
