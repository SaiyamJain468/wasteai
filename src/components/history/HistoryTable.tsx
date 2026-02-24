import { useTheme } from '../../hooks/useTheme';
import Badge from '../shared/Badge';

interface WasteLog {
  id: string;
  date: string;
  type: 'Organic' | 'Recyclable' | 'Hazardous';
  confidence: number;
  points: number;
}

interface HistoryTableProps {
  logs: WasteLog[];
}

export default function HistoryTable({ logs }: HistoryTableProps) {
  const { colors } = useTheme();

  return (
    <div className="overflow-x-auto">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Date</th>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Type</th>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Confidence</th>
            <th style={{ padding: '12px', textAlign: 'left', color: colors.textPrimary, fontWeight: '700' }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
              <td style={{ padding: '12px', color: colors.textSecondary, fontSize: '14px' }}>
                {new Date(log.date).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px' }}>
                <Badge type={log.type} size="sm" />
              </td>
              <td style={{ padding: '12px', color: colors.textSecondary, fontSize: '14px' }}>
                {log.confidence.toFixed(1)}%
              </td>
              <td style={{ padding: '12px', color: colors.primary, fontSize: '14px', fontWeight: '700' }}>
                +{log.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
