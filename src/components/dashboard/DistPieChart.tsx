import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import Card from '../shared/Card';

interface DistPieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = {
  Organic: '#1F7A3D',
  Recyclable: '#2E5DA0',
  Hazardous: '#C0392B',
};

export default function DistPieChart({ data }: DistPieChartProps) {
  const { colors } = useTheme();

  return (
    <Card>
      <h3 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
        Waste Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
