import { useTheme } from '../../hooks/useTheme';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
}

interface TopThreeProps {
  data: LeaderboardEntry[];
}

export default function TopThree({ data }: TopThreeProps) {
  const { colors } = useTheme();

  const top3 = data.slice(0, 3);

  const getMedalColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return colors.textSecondary;
  };

  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {top3.map((entry) => (
        <div
          key={entry.rank}
          style={{
            backgroundColor: colors.surface,
            border: `2px solid ${getMedalColor(entry.rank)}`,
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            minWidth: '140px',
          }}
        >
          {entry.rank === 1 ? (
            <Trophy size={32} color={getMedalColor(entry.rank)} style={{ margin: '0 auto 8px' }} />
          ) : (
            <Medal size={32} color={getMedalColor(entry.rank)} style={{ margin: '0 auto 8px' }} />
          )}
          <div style={{ fontSize: '24px', fontWeight: '700', color: colors.textPrimary }}>
            #{entry.rank}
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: colors.textPrimary, marginTop: '4px' }}>
            {entry.username}
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary, marginTop: '8px' }}>
            {entry.points} pts
          </div>
        </div>
      ))}
    </div>
  );
}
