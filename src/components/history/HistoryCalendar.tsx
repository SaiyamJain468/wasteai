import { useTheme } from '../../hooks/useTheme';

interface HistoryCalendarProps {
  logs: any[];
}

export default function HistoryCalendar({ logs }: HistoryCalendarProps) {
  const { colors, mode } = useTheme();

  // Generate last 12 weeks of dates
  const weeks: Date[][] = [];
  const today = new Date();
  
  for (let week = 11; week >= 0; week--) {
    const weekDates: Date[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + (6 - day)));
      weekDates.push(date);
    }
    weeks.push(weekDates);
  }

  const getActivityLevel = (date: Date) => {
    const dateStr = date.toDateString();
    const count = logs.filter((log: any) => new Date(log.date).toDateString() === dateStr).length;
    
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count >= 3) return 3;
    return 0;
  };

  const getColor = (level: number) => {
    if (mode === 'light') {
      switch (level) {
        case 0: return '#EBEDF0';
        case 1: return '#9BE9A8';
        case 2: return '#40C463';
        case 3: return '#30A14E';
        default: return '#EBEDF0';
      }
    } else {
      switch (level) {
        case 0: return '#161B22';
        case 1: return '#0E4429';
        case 2: return '#006D32';
        case 3: return '#26A641';
        default: return '#161B22';
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: colors.surface, borderRadius: '8px', border: `1px solid ${colors.border}` }}>
      <h3 style={{ color: colors.textPrimary, fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
        Activity Calendar
      </h3>
      
      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto' }}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((date, dayIndex) => {
              const level = getActivityLevel(date);
              return (
                <div
                  key={dayIndex}
                  title={`${date.toDateString()}: ${logs.filter((log: any) => new Date(log.date).toDateString() === date.toDateString()).length} items`}
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: getColor(level),
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '12px', color: colors.textSecondary }}>
        <span>Less</span>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[0, 1, 2, 3].map((level) => (
            <div
              key={level}
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: getColor(level),
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
