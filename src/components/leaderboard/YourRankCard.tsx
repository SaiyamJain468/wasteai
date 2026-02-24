import { useTheme } from '../../hooks/useTheme';
import Card from '../shared/Card';

interface YourRankCardProps {
  rank: number;
  points: number;
  items: number;
}

export default function YourRankCard({ rank, points, items }: YourRankCardProps) {
  const { colors } = useTheme();

  return (
    <Card>
      <h3 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
        Your Rank
      </h3>
      <div className="flex justify-between items-center">
        <div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: colors.primary }}>
            #{rank}
          </div>
          <div style={{ fontSize: '14px', color: colors.textSecondary, marginTop: '4px' }}>
            {items} items classified
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: colors.textPrimary }}>
            {points}
          </div>
          <div style={{ fontSize: '12px', color: colors.textSecondary }}>
            points
          </div>
        </div>
      </div>
    </Card>
  );
}
