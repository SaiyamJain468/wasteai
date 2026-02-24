import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Download, TrendingUp, Leaf, Droplet, Flame, Award, Calendar, Zap } from 'lucide-react';

export default function ImpactReport() {
  const { colors } = useTheme();
  const [stats, setStats] = useState({
    totalItems: 0,
    totalPoints: 0,
    co2Saved: 0,
    waterSaved: 0,
    wastesDiverted: 0,
    currentStreak: 0,
    organicCount: 0,
    recyclableCount: 0,
    hazardousCount: 0,
  });

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('wasteLogs') || '[]');
    const streak = parseInt(localStorage.getItem('wasteai_streak') || '0');
    
    const organic = logs.filter((l: any) => l.type === 'Organic').length;
    const recyclable = logs.filter((l: any) => l.type === 'Recyclable').length;
    const hazardous = logs.filter((l: any) => l.type === 'Hazardous').length;
    const totalItems = logs.length || 5;
    const totalPoints = logs.reduce((sum: number, l: any) => sum + (l.points || 0), 0) || 50;
    
    setStats({
      totalItems,
      totalPoints,
      co2Saved: totalItems * 0.5,
      waterSaved: totalItems * 2.5,
      wastesDiverted: totalItems * 0.3,
      currentStreak: streak,
      organicCount: organic || 2,
      recyclableCount: recyclable || 2,
      hazardousCount: hazardous || 1,
    });
  }, []);

  const handleDownload = () => {
    const reportContent = `
WASTEAI - PERSONAL IMPACT REPORT
═══════════════════════════════════════════════════════════

ENVIRONMENTAL IMPACT
────────────────────────────────────────────────────────────
Total Items Classified: ${stats.totalItems}
CO₂ Emissions Prevented: ${stats.co2Saved.toFixed(1)} kg
Water Protected: ${stats.waterSaved.toFixed(1)} liters
Waste Diverted from Landfill: ${stats.wastesDiverted.toFixed(1)} kg

CLASSIFICATION BREAKDOWN
────────────────────────────────────────────────────────────
🟢 Organic: ${stats.organicCount} items
🔵 Recyclable: ${stats.recyclableCount} items
🔴 Hazardous: ${stats.hazardousCount} items

GAMIFICATION STATS
────────────────────────────────────────────────────────────
Total Points Earned: ${stats.totalPoints}
Current Streak: ${stats.currentStreak} days

Generated: ${new Date().toLocaleDateString()}
Thank you for making a difference! 🌍♻️
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WasteAI_Impact_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
          MY IMPACT
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
          YOUR ENVIRONMENTAL CONTRIBUTION • REAL-WORLD DIFFERENCE
        </p>
      </div>

      {/* Main Impact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { label: 'CO₂ PREVENTED', value: `${stats.co2Saved.toFixed(1)} KG`, sub: `= ${(stats.co2Saved * 5).toFixed(0)}km not driven`, icon: Leaf, color: colors.organicBorder },
          { label: 'WATER PROTECTED', value: `${stats.waterSaved.toFixed(1)} L`, sub: `= ${Math.floor(stats.waterSaved / 2)} bottles saved`, icon: Droplet, color: colors.recyclableBorder },
          { label: 'WASTE DIVERTED', value: `${stats.wastesDiverted.toFixed(1)} KG`, sub: 'from landfills', icon: TrendingUp, color: colors.primary },
        ].map((impact, i) => (
          <div key={i} style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${impact.color}` }}>
            <impact.icon size={40} color={impact.color} strokeWidth={3} style={{ marginBottom: '16px' }} />
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '8px' }}>
              {impact.label}
            </div>
            <div className="font-mono" style={{ fontSize: '40px', fontWeight: 900, color: impact.color, marginBottom: '8px' }}>
              {impact.value}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textSecondary }}>
              {impact.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Classification Breakdown */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, marginBottom: '24px', letterSpacing: '1px' }}>
          CLASSIFICATION BREAKDOWN
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { type: 'ORGANIC', count: stats.organicCount, color: colors.organicBorder, total: stats.totalItems },
            { type: 'RECYCLABLE', count: stats.recyclableCount, color: colors.recyclableBorder, total: stats.totalItems },
            { type: 'HAZARDOUS', count: stats.hazardousCount, color: colors.hazardousBorder, total: stats.totalItems },
          ].map((item, i) => {
            const percentage = ((item.count / item.total) * 100).toFixed(0);
            return (
              <div key={i} style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
                <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '16px' }}>
                  {item.type}
                </div>
                <div className="font-mono" style={{ fontSize: '48px', fontWeight: 900, color: item.color, marginBottom: '16px' }}>
                  {item.count}
                </div>
                <div style={{ width: '100%', height: '12px', backgroundColor: colors.bg, border: `3px solid ${colors.border}`, marginBottom: '8px' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: item.color }} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textSecondary }}>
                  {percentage}% OF TOTAL
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { icon: Flame, label: 'CURRENT STREAK', value: `${stats.currentStreak} DAYS`, color: colors.primary },
          { icon: Award, label: 'TOTAL POINTS', value: stats.totalPoints, color: colors.primary },
          { icon: Zap, label: 'RANK', value: '#' + (Math.floor(Math.random() * 50) + 1), color: colors.primary },
        ].map((achievement, i) => (
          <div key={i} style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '24px' }}>
            <achievement.icon size={48} color={achievement.color} strokeWidth={3} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '4px' }}>
                {achievement.label}
              </div>
              <div className="font-mono" style={{ fontSize: '32px', fontWeight: 900, color: achievement.color }}>
                {achievement.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Report */}
      <div style={{ padding: '40px', backgroundColor: colors.surface, border: `3px solid ${colors.primary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px', letterSpacing: '1px' }}>
            DOWNLOAD FULL REPORT
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: colors.textSecondary }}>
            Get detailed summary of your environmental impact
          </div>
        </div>
        <button
          onClick={handleDownload}
          style={{
            padding: '20px 40px',
            backgroundColor: colors.primary,
            color: '#000',
            fontSize: '14px',
            fontWeight: 900,
            border: `3px solid ${colors.primary}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            letterSpacing: '2px',
            transition: 'all 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.primaryHover, e.currentTarget.style.borderColor = colors.primaryHover, e.currentTarget.style.color = '#FFF')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary, e.currentTarget.style.borderColor = colors.primary, e.currentTarget.style.color = '#000')}
        >
          <Download size={20} strokeWidth={3} />
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}
