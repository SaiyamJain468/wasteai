import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../context/AuthContext";
import { Trophy, Medal, Award, Target, Flame } from "lucide-react";

const SEED_LEADERBOARD = [
  { rank: 1, name: 'Rahul Sharma', ward: 'Connaught Place', scans: 850, points: 8500 },
  { rank: 2, name: 'Priya Mehta', ward: 'Dwarka', scans: 780, points: 7800 },
  { rank: 3, name: 'Arjun Nair', ward: 'Rohini', scans: 720, points: 7200 },
  { rank: 4, name: 'Deepika Rao', ward: 'Saket', scans: 680, points: 6400 },
  { rank: 5, name: 'Vikram Singh', ward: 'Vasant Kunj', scans: 610, points: 5900 },
  { rank: 6, name: 'Ananya Iyer', ward: 'Karol Bagh', scans: 550, points: 5200 },
  { rank: 7, name: 'Rohan Gupta', ward: 'Lajpat Nagar', scans: 490, points: 4700 },
  { rank: 8, name: 'Sneha Patil', ward: 'Pitampura', scans: 450, points: 4300 },
];

const WARD_CHALLENGES = [
  { name: "CONNAUGHT PLACE", current: 8500, target: 10000, color: colors => colors.primary },
  { name: "DWARKA", current: 7200, target: 10000, color: colors => colors.secondary },
  { name: "ROHINI", current: 6400, target: 10000, color: colors => colors.primary },
  { name: "VASANT KUNJ", current: 5900, target: 10000, color: colors => colors.secondary },
];

export default function Leaderboard() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState<"WEEKLY" | "MONTHLY" | "ALL TIME">("ALL TIME");

  const top3 = SEED_LEADERBOARD.slice(0, 3);

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
          ECO CHAMPIONS
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
          TOP PERFORMERS • COMMUNITY RANKINGS • WARD BATTLES
        </p>
      </div>

      {/* Points System */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'ORGANIC', points: 10, color: colors.organicBorder },
          { label: 'RECYCLABLE', points: 10, color: colors.recyclableBorder },
          { label: 'HAZARDOUS', points: 25, color: colors.hazardousBorder },
        ].map((item, i) => (
          <div key={i} style={{ padding: '16px 24px', backgroundColor: colors.surface, border: `3px solid ${item.color}` }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '4px' }}>
              {item.label}
            </div>
            <div className="font-mono" style={{ fontSize: '24px', fontWeight: 900, color: item.color }}>
              +{item.points}
            </div>
          </div>
        ))}
      </div>

      {/* Ward Challenge */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Target size={24} color={colors.primary} strokeWidth={3} />
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
            WARD VS WARD CHALLENGE
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {WARD_CHALLENGES.map((ward, i) => (
            <div key={i} style={{ padding: '24px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
                  {ward.name}
                </div>
                <div className="font-mono" style={{ fontSize: '14px', fontWeight: 900, color: colors.textSecondary }}>
                  {ward.current} / {ward.target}
                </div>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: colors.bg, border: `3px solid ${colors.border}` }}>
                <div style={{ width: `${(ward.current / ward.target) * 100}%`, height: '100%', backgroundColor: ward.color(colors) }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Period Filter */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        {["WEEKLY", "MONTHLY", "ALL TIME"].map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period as any)}
            style={{
              padding: '12px 24px',
              backgroundColor: timePeriod === period ? colors.primary : colors.surface,
              color: timePeriod === period ? '#000' : colors.textSecondary,
              border: `3px solid ${timePeriod === period ? colors.primary : colors.border}`,
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[top3[1], top3[0], top3[2]].map((user, i) => {
          const heights = ['300px', '360px', '280px'];
          const icons = [Medal, Trophy, Award];
          const Icon = icons[i];
          
          return (
            <div
              key={user.rank}
              style={{
                height: heights[i],
                backgroundColor: colors.surface,
                border: `3px solid ${i === 1 ? colors.primary : colors.border}`,
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Icon size={48} color={i === 1 ? colors.primary : colors.textSecondary} strokeWidth={3} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '8px' }}>
                  RANK #{user.rank}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px', letterSpacing: '1px' }}>
                  {user.name.toUpperCase()}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: colors.textSecondary, marginBottom: '16px' }}>
                  {user.ward}
                </div>
                <div className="font-mono" style={{ fontSize: '32px', fontWeight: 900, color: colors.primary }}>
                  {user.points}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                  POINTS
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, marginBottom: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: colors.bg, borderBottom: `3px solid ${colors.border}` }}>
              {["RANK", "NAME", "WARD", "SCANS", "POINTS"].map((header, i) => (
                <th key={i} style={{ padding: '20px', textAlign: 'left', fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEED_LEADERBOARD.map((user, index) => (
              <tr
                key={user.rank}
                style={{
                  borderBottom: `3px solid ${colors.border}`,
                  borderLeft: `3px solid transparent`,
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = colors.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'transparent')}
              >
                <td style={{ padding: '20px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: user.rank <= 3 ? colors.primary : colors.textPrimary }}>
                    {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
                  </div>
                </td>
                <td style={{ padding: '20px', fontSize: '16px', fontWeight: 900, color: colors.textPrimary }}>
                  {user.name}
                </td>
                <td style={{ padding: '20px', fontSize: '14px', fontWeight: 700, color: colors.textSecondary }}>
                  {user.ward}
                </td>
                <td style={{ padding: '20px' }}>
                  <div className="font-mono" style={{ fontSize: '16px', fontWeight: 900, color: colors.textPrimary }}>
                    {user.scans}
                  </div>
                </td>
                <td style={{ padding: '20px' }}>
                  <div className="font-mono" style={{ fontSize: '20px', fontWeight: 900, color: colors.primary }}>
                    {user.points}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Your Rank */}
      <div style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.primary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: colors.primary, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900 }}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '4px' }}>
              YOUR RANK
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '4px' }}>
              {user?.name || 'Guest User'}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textSecondary }}>
              {user?.ward || 'No Ward'}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '4px' }}>
            TOTAL POINTS
          </div>
          <div className="font-mono" style={{ fontSize: '48px', fontWeight: 900, color: colors.primary }}>
            {Math.floor(Math.random() * 1000) + 500}
          </div>
        </div>
      </div>
    </div>
  );
}
