import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import Card from '../shared/Card';

interface TrendLineChartProps {
  data: { date: string; Organic: number; Recyclable: number; Hazardous: number }[];
}

export default function TrendLineChart({ data }: TrendLineChartProps) {
  const { colors } = useTheme();

  return (
    <Card>
      <h3 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
        14-Day Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="date" stroke={colors.textSecondary} />
          <YAxis stroke={colors.textSecondary} />
          <Tooltip contentStyle={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }} />
          <Legend />
          <Line type="monotone" dataKey="Organic" stroke="#1F7A3D" strokeWidth={2} />
          <Line type="monotone" dataKey="Recyclable" stroke="#2E5DA0" strokeWidth={2} />
          <Line type="monotone" dataKey="Hazardous" stroke="#C0392B" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
