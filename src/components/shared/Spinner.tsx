import { Loader2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function Spinner({ size = 24 }: { size?: number }) {
  const { colors } = useTheme();
  return <Loader2 size={size} color={colors.primary} className="animate-spin" />;
}
