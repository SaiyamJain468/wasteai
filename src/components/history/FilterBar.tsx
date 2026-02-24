import { useTheme } from '../../hooks/useTheme';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const { colors } = useTheme();
  const filters = ['All', 'Organic', 'Recyclable', 'Hazardous'];

  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          style={{
            backgroundColor: activeFilter === filter ? colors.primary : colors.surface,
            color: activeFilter === filter ? '#FFFFFF' : colors.textPrimary,
            border: `1px solid ${activeFilter === filter ? colors.primary : colors.border}`,
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 200ms',
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
