import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { BarChart2, Activity, AlertTriangle, TrendingUp, Zap } from "lucide-react";

const WARD_DATA = [
  { ward: 'CONNAUGHT PLACE', organic: 450, recyclable: 670, hazardous: 120 },
  { ward: 'DWARKA', organic: 380, recyclable: 720, hazardous: 80 },
  { ward: 'ROHINI', organic: 520, recyclable: 890, hazardous: 190 },
  { ward: 'KAROL BAGH', organic: 310, recyclable: 950, hazardous: 70 },
  { ward: 'VASANT KUNJ', organic: 440, recyclable: 580, hazardous: 140 },
];

const LIVE_FEED_NAMES = ["Rahul", "Priya", "Amit", "Sneha", "Vikram", "Ananya"];
const LIVE_FEED_WARDS = ["Connaught Place", "Dwarka", "Rohini", "Vasant Kunj"];
const LIVE_FEED_ITEMS = ["Plastic Bottle", "Banana Peel", "Cardboard Box", "Battery"];

export default function Dashboard() {
  const { colors } = useTheme();
  const [liveFeed, setLiveFeed] = useState<{ id: number, text: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const name = LIVE_FEED_NAMES[Math.floor(Math.random() * LIVE_FEED_NAMES.length)];
      const ward = LIVE_FEED_WARDS[Math.floor(Math.random() * LIVE_FEED_WARDS.length)];
      const item = LIVE_FEED_ITEMS[Math.floor(Math.random() * LIVE_FEED_ITEMS.length)];
      const text = `${name} from ${ward} classified ${item}`;
      
      setLiveFeed(prev => [{ id: Date.now(), text }, ...prev.slice(0, 4)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const totalScans = WARD_DATA.reduce((sum, w) => sum + w.organic + w.recyclable + w.hazardous, 0);
  const totalOrganic = WARD_DATA.reduce((sum, w) => sum + w.organic, 0);
  const totalRecyclable = WARD_DATA.reduce((sum, w) => sum + w.recyclable, 0);
  const totalHazardous = WARD_DATA.reduce((sum, w) => sum + w.hazardous, 0);

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
          CITY DASHBOARD
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
          REAL-TIME ANALYTICS • WARD PERFORMANCE • MUNICIPAL INSIGHTS
        </p>
      </div>

      {/* Live Feed */}
      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: colors.surface, border: `3px solid ${colors.primary}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <Activity size={24} color={colors.primary} strokeWidth={3} className="animate-pulse" />
          <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
            LIVE CITY FEED
          </div>
        </div>
        <div style={{ height: '80px', overflow: 'hidden', position: 'relative' }}>
          {liveFeed.map((item, i) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: `${i * 28}px`,
                left: 0,
                fontSize: '14px',
                fontWeight: 700,
                color: i === 0 ? colors.primary : colors.textSecondary,
                opacity: i === 0 ? 1 : 0.6 - i * 0.15,
                transition: 'all 500ms',
              }}
            >
              → {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { label: 'TOTAL SCANS', value: totalScans, icon: BarChart2, color: colors.primary, change: '+12%' },
          { label: 'ORGANIC', value: totalOrganic, icon: TrendingUp, color: colors.organicBorder, change: '+8%' },
          { label: 'RECYCLABLE', value: totalRecyclable, icon: Zap, color: colors.recyclableBorder, change: '+15%' },
          { label: 'HAZARDOUS', value: totalHazardous, icon: AlertTriangle, color: colors.hazardousBorder, change: '+5%' },
        ].map((kpi, i) => (
          <div key={i} style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                {kpi.label}
              </div>
              <kpi.icon size={24} color={kpi.color} strokeWidth={3} />
            </div>
            <div className="font-mono" style={{ fontSize: '40px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px' }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: colors.primary }}>
              {kpi.change} TODAY
            </div>
          </div>
        ))}
      </div>

      {/* Municipal Alerts */}
      <div style={{ marginBottom: '40px', padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.hazardousBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <AlertTriangle size={28} color={colors.hazardousBorder} strokeWidth={3} />
          <div style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
            MUNICIPAL ALERTS
          </div>
          <div style={{ marginLeft: 'auto', padding: '8px 16px', backgroundColor: colors.hazardousBg, border: `3px solid ${colors.hazardousBorder}`, fontSize: '11px', fontWeight: 900, color: colors.hazardousText, letterSpacing: '2px' }}>
            3 ACTIVE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { severity: 'CRITICAL', msg: 'Karol Bagh: Hazardous waste up 40% — immediate collection required', color: colors.hazardousBorder },
            { severity: 'WARNING', msg: 'Rohini: Recyclable overflow detected in Sector 4', color: colors.primary },
            { severity: 'NOTICE', msg: 'Connaught Place: Organic segregation below 80% target', color: colors.secondary },
          ].map((alert, i) => (
            <div key={i} style={{ padding: '20px', backgroundColor: colors.bg, border: `3px solid ${alert.color}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: alert.color }} />
              <div style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: colors.textPrimary }}>
                {alert.msg}
              </div>
              <div style={{ padding: '6px 12px', border: `3px solid ${alert.color}`, fontSize: '10px', fontWeight: 900, color: alert.color, letterSpacing: '1px' }}>
                {alert.severity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ward Performance Table */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, marginBottom: '24px', letterSpacing: '1px' }}>
          WARD PERFORMANCE
        </div>
        <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: colors.bg, borderBottom: `3px solid ${colors.border}` }}>
                {["WARD", "ORGANIC", "RECYCLABLE", "HAZARDOUS", "TOTAL", "STATUS"].map((header, i) => (
                  <th key={i} style={{ padding: '20px', textAlign: 'left', fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WARD_DATA.map((ward, index) => {
                const total = ward.organic + ward.recyclable + ward.hazardous;
                const hazardPct = (ward.hazardous / total) * 100;
                const status = hazardPct > 15 ? 'ALERT' : hazardPct > 10 ? 'WATCH' : 'GOOD';
                const statusColor = hazardPct > 15 ? colors.hazardousBorder : hazardPct > 10 ? colors.primary : colors.organicBorder;

                return (
                  <tr
                    key={ward.ward}
                    style={{
                      borderBottom: `3px solid ${colors.border}`,
                      borderLeft: `3px solid transparent`,
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = colors.primaryHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'transparent')}
                  >
                    <td style={{ padding: '20px', fontSize: '14px', fontWeight: 900, color: colors.textPrimary }}>
                      {ward.ward}
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div className="font-mono" style={{ fontSize: '16px', fontWeight: 900, color: colors.organicText }}>
                        {ward.organic}
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div className="font-mono" style={{ fontSize: '16px', fontWeight: 900, color: colors.recyclableText }}>
                        {ward.recyclable}
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div className="font-mono" style={{ fontSize: '16px', fontWeight: 900, color: colors.hazardousText }}>
                        {ward.hazardous}
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div className="font-mono" style={{ fontSize: '18px', fontWeight: 900, color: colors.textPrimary }}>
                        {total}
                      </div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ padding: '8px 16px', backgroundColor: colors.bg, border: `3px solid ${statusColor}`, fontSize: '11px', fontWeight: 900, color: statusColor, letterSpacing: '1px', display: 'inline-block' }}>
                        {status}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performer */}
      <div style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.primary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '8px' }}>
            🏆 TOP PERFORMING WARD
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: colors.primary, marginBottom: '4px', letterSpacing: '1px' }}>
            ROHINI
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textSecondary }}>
            1,600 scans • 94% accuracy • Leading city-wide
          </div>
        </div>
        <div style={{ padding: '16px 32px', backgroundColor: colors.primary, color: '#000', fontSize: '14px', fontWeight: 900, letterSpacing: '2px' }}>
          BEST WARD
        </div>
      </div>
    </div>
  );
}
