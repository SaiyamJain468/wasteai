import { useTheme } from '../../hooks/useTheme';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  items: number;
}

interface LeaderTableProps {
  data: LeaderboardEntry[];
  currentUser?: string;
}

export default function LeaderTable({ data, currentUser }: LeaderTableProps) {
  const { colors } = useTheme();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={20} color="#FFD700" />;
    if (rank === 2) return <Medal size={20} color="#C0C0C0" />;
    if (rank === 3) return <Medal size={20} color="#CD7F32" />;
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Rank</th>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>User</th>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Items</th>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr
              key={entry.rank}
              style={{
                borderBottom: `1px solid ${colors.border}`,
                backgroundColor: entry.username === currentUser ? `${colors.primary}20` : 'transparent',
              }}
            >
              <td style={{ padding: '12px', color: colors.textPrimary, fontSize: '14px', fontWeight: '700' }}>
                <div className="flex items-center gap-2">
                  {getRankIcon(entry.rank)}
                  #{entry.rank}
                </div>
              </td>
              <td style={{ padding: '12px', color: colors.textPrimary, fontSize: '14px', fontWeight: '600' }}>
                {entry.username}
              </td>
              <td style={{ padding: '12px', color: colors.textSecondary, fontSize: '14px' }}>
                {entry.items}
              </td>
              <td style={{ padding: '12px', color: colors.primary, fontSize: '14px', fontWeight: '700' }}>
                {entry.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
