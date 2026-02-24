import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { WasteLog } from "../lib/data";
import { Recycle, Download, Search, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SEED_DATA: WasteLog[] = [
  { id: '1', type: 'Recyclable', confidence: 94.2, points: 10, date: '2024-01-15T09:23:00.000Z' },
  { id: '2', type: 'Organic', confidence: 87.6, points: 10, date: '2024-01-15T14:45:00.000Z' },
  { id: '3', type: 'Hazardous', confidence: 91.3, points: 25, date: '2024-01-14T11:30:00.000Z' },
  { id: '4', type: 'Recyclable', confidence: 78.9, points: 10, date: '2024-01-14T16:20:00.000Z' },
  { id: '5', type: 'Organic', confidence: 83.4, points: 10, date: '2024-01-13T08:15:00.000Z' },
];

// Initialize seed data only once
if (!localStorage.getItem('wasteLogs')) {
  localStorage.setItem('wasteLogs', JSON.stringify(SEED_DATA));
}

export default function History() {
  const { colors } = useTheme();
  const [logs, setLogs] = useState<WasteLog[]>([]);
  const [filter, setFilter] = useState<"All" | "Organic" | "Recyclable" | "Hazardous">("All");

  useEffect(() => {
    // Always load from localStorage
    const storedLogs = localStorage.getItem("wasteLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const totalItems = logs.length;
  const totalPoints = logs.reduce((acc: number, log) => acc + (log.points || 0), 0);
  
  const filteredLogs = logs.filter(log => filter === "All" || log.type === filter);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Organic": return colors.organicBorder;
      case "Recyclable": return colors.recyclableBorder;
      case "Hazardous": return colors.hazardousBorder;
      default: return colors.border;
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
          WASTE LOG
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
          EVERY ITEM SEGREGATED MAKES A DIFFERENCE
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { label: 'ITEMS LOGGED', value: totalItems, color: colors.primary },
          { label: 'POINTS EARNED', value: totalPoints, color: colors.secondary },
          { label: 'ACCURACY', value: '94%', color: colors.primary }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '24px' }}>
            <div className="font-mono" style={{ fontSize: '48px', fontWeight: 900, color: stat.color, marginBottom: '8px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        {["All", "Organic", "Recyclable", "Hazardous"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            style={{
              padding: '12px 24px',
              backgroundColor: filter === f ? colors.primary : colors.surface,
              color: filter === f ? '#000' : colors.textSecondary,
              border: `3px solid ${filter === f ? colors.primary : colors.border}`,
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => !( filter === f) && (e.currentTarget.style.borderColor = colors.primaryHover)}
            onMouseLeave={(e) => !(filter === f) && (e.currentTarget.style.borderColor = colors.border)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredLogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
          <Recycle size={80} color={colors.textMuted} strokeWidth={3} style={{ margin: '0 auto 24px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px', color: colors.textPrimary, letterSpacing: '1px' }}>
            NO WASTE LOGGED
          </h3>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: colors.primary,
              color: '#000',
              fontSize: '14px',
              fontWeight: 900,
              textDecoration: 'none',
              letterSpacing: '2px',
              marginTop: '16px',
            }}
          >
            START CLASSIFYING
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: colors.bg, borderBottom: `3px solid ${colors.border}` }}>
                {["#", "DATE", "IMAGE", "TYPE", "CONFIDENCE", "POINTS"].map((header, i) => (
                  <th key={i} style={{ padding: '20px', textAlign: 'left', fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr
                  key={log.id}
                  style={{
                    borderBottom: `3px solid ${colors.border}`,
                    borderLeft: `3px solid transparent`,
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = colors.primaryHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'transparent')}
                >
                  <td style={{ padding: '20px', color: colors.textSecondary, fontWeight: 700 }}>{index + 1}</td>
                  <td style={{ padding: '20px', color: colors.textPrimary, fontWeight: 600 }}>
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td style={{ padding: '20px' }}>
                    {log.imagePreview ? (
                      <img src={log.imagePreview} alt="Log" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '60px', height: '60px', backgroundColor: colors.bg, border: `3px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={24} color={colors.textMuted} strokeWidth={3} />
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '20px' }}>
                    <span style={{
                      padding: '8px 16px',
                      backgroundColor: colors.bg,
                      border: `3px solid ${getBadgeColor(log.type)}`,
                      color: getBadgeColor(log.type),
                      fontSize: '12px',
                      fontWeight: 900,
                      letterSpacing: '1px',
                    }}>
                      {log.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div className="font-mono" style={{ fontSize: '16px', fontWeight: 900, color: colors.textPrimary }}>
                      {log.confidence.toFixed(1)}%
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div className="font-mono" style={{ fontSize: '16px', fontWeight: 900, color: colors.primary }}>
                      +{log.points}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
