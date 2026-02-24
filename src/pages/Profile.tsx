import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { User, Mail, MapPin, Award, Settings, LogOut, Save } from 'lucide-react';

export default function Profile() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    ward: user?.ward || '',
  });

  const handleSave = () => {
    // Save to localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('wasteai_user', JSON.stringify(updatedUser));
    setEditing(false);
  };

  const stats = {
    totalScans: JSON.parse(localStorage.getItem('wasteLogs') || '[]').length || 47,
    totalPoints: 520,
    rank: Math.floor(Math.random() * 50) + 1,
    streak: parseInt(localStorage.getItem('wasteai_streak') || '7'),
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
          PROFILE
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
          MANAGE YOUR ACCOUNT • VIEW STATS • SETTINGS
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Left Column - Profile Card */}
        <div>
          <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '40px', marginBottom: '24px' }}>
            <div style={{ width: '120px', height: '120px', backgroundColor: colors.primary, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px', fontWeight: 900, margin: '0 auto 24px' }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px', letterSpacing: '1px' }}>
                {user?.name || 'Guest User'}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textSecondary }}>
                {user?.email || 'guest@wasteai.com'}
              </div>
            </div>
            <div style={{ padding: '16px', backgroundColor: colors.bg, border: `3px solid ${colors.primary}`, textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '4px' }}>
                MEMBER SINCE
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: colors.primary }}>
                JAN 2024
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textPrimary, marginBottom: '20px', letterSpacing: '1px' }}>
              QUICK STATS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'TOTAL SCANS', value: stats.totalScans },
                { label: 'TOTAL POINTS', value: stats.totalPoints },
                { label: 'CITY RANK', value: `#${stats.rank}` },
                { label: 'STREAK', value: `${stats.streak} DAYS` },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: colors.bg, border: `3px solid ${colors.border}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '1px' }}>
                    {stat.label}
                  </div>
                  <div className="font-mono" style={{ fontSize: '18px', fontWeight: 900, color: colors.primary }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div>
          {/* Account Information */}
          <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Settings size={24} color={colors.primary} strokeWidth={3} />
                <div style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
                  ACCOUNT INFORMATION
                </div>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: colors.surface,
                    border: `3px solid ${colors.border}`,
                    color: colors.textPrimary,
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    letterSpacing: '1px',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
                >
                  EDIT
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Name */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <User size={20} color={colors.textSecondary} strokeWidth={3} />
                  <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                    FULL NAME
                  </div>
                </div>
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      backgroundColor: colors.bg,
                      border: `3px solid ${colors.border}`,
                      fontSize: '16px',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                    onBlur={(e) => (e.target.style.borderColor = colors.border)}
                  />
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.textPrimary }}>
                    {formData.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Mail size={20} color={colors.textSecondary} strokeWidth={3} />
                  <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                    EMAIL ADDRESS
                  </div>
                </div>
                {editing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      backgroundColor: colors.bg,
                      border: `3px solid ${colors.border}`,
                      fontSize: '16px',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                    onBlur={(e) => (e.target.style.borderColor = colors.border)}
                  />
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.textPrimary }}>
                    {formData.email}
                  </div>
                )}
              </div>

              {/* Ward */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <MapPin size={20} color={colors.textSecondary} strokeWidth={3} />
                  <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px' }}>
                    WARD
                  </div>
                </div>
                {editing ? (
                  <select
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      backgroundColor: colors.bg,
                      border: `3px solid ${colors.border}`,
                      fontSize: '16px',
                      fontWeight: 700,
                      color: colors.textPrimary,
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                    onBlur={(e) => (e.target.style.borderColor = colors.border)}
                  >
                    <option value="Connaught Place">Connaught Place</option>
                    <option value="Dwarka">Dwarka</option>
                    <option value="Rohini">Rohini</option>
                    <option value="Vasant Kunj">Vasant Kunj</option>
                    <option value="Karol Bagh">Karol Bagh</option>
                    <option value="Saket">Saket</option>
                    <option value="Lajpat Nagar">Lajpat Nagar</option>
                    <option value="Pitampura">Pitampura</option>
                  </select>
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.textPrimary }}>
                    {formData.ward}
                  </div>
                )}
              </div>

              {editing && (
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                  <button
                    onClick={handleSave}
                    style={{
                      flex: 1,
                      height: '56px',
                      backgroundColor: colors.primary,
                      color: '#000',
                      fontSize: '14px',
                      fontWeight: 900,
                      border: `3px solid ${colors.primary}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      letterSpacing: '2px',
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.primaryHover, e.currentTarget.style.borderColor = colors.primaryHover, e.currentTarget.style.color = '#FFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary, e.currentTarget.style.borderColor = colors.primary, e.currentTarget.style.color = '#000')}
                  >
                    <Save size={20} strokeWidth={3} />
                    SAVE CHANGES
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      height: '56px',
                      padding: '0 32px',
                      backgroundColor: colors.surface,
                      border: `3px solid ${colors.border}`,
                      color: colors.textPrimary,
                      fontSize: '14px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      letterSpacing: '2px',
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.hazardousBorder)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
                  >
                    CANCEL
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Award size={24} color={colors.primary} strokeWidth={3} />
              <div style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
                ACHIEVEMENTS
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { icon: '🏆', label: 'FIRST SCAN', unlocked: true },
                { icon: '🔥', label: '7 DAY STREAK', unlocked: true },
                { icon: '⭐', label: '50 SCANS', unlocked: true },
                { icon: '💎', label: '100 SCANS', unlocked: false },
                { icon: '👑', label: 'TOP 10', unlocked: false },
                { icon: '🌟', label: '500 POINTS', unlocked: true },
              ].map((achievement, i) => (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    backgroundColor: achievement.unlocked ? colors.bg : colors.surface,
                    border: `3px solid ${achievement.unlocked ? colors.primary : colors.border}`,
                    textAlign: 'center',
                    opacity: achievement.unlocked ? 1 : 0.5,
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{achievement.icon}</div>
                  <div style={{ fontSize: '10px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '1px' }}>
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.hazardousBorder}`, padding: '32px' }}>
            <div style={{ fontSize: '20px', fontWeight: 900, color: colors.hazardousText, marginBottom: '16px', letterSpacing: '1px' }}>
              DANGER ZONE
            </div>
            <button
              onClick={logout}
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: colors.hazardousBg,
                border: `3px solid ${colors.hazardousBorder}`,
                color: colors.hazardousText,
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                letterSpacing: '2px',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.hazardousBorder, e.currentTarget.style.color = '#FFF')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.hazardousBg, e.currentTarget.style.color = colors.hazardousText)}
            >
              <LogOut size={20} strokeWidth={3} />
              SIGN OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
