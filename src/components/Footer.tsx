import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Github, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { colors } = useTheme();

  const quickLinks = [
    { to: '/', label: 'HOME' },
    { to: '/history', label: 'HISTORY' },
    { to: '/leaderboard', label: 'LEADERBOARD' },
    { to: '/dashboard', label: 'DASHBOARD' },
    { to: '/quiz', label: 'QUIZ' },
    { to: '/impact', label: 'IMPACT' },
  ];

  return (
    <footer
      style={{
        backgroundColor: colors.surface,
        borderTop: `3px solid ${colors.border}`,
        padding: '40px 20px 20px',
        marginTop: '60px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ fontSize: '32px' }}>♻️</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: colors.primary, letterSpacing: '1px' }}>
                WASTEAI
              </div>
            </div>
            <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: 1.6, fontWeight: 600 }}>
              AI-powered waste classification for a cleaner Delhi NCR
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <a
                href="https://github.com/SaiyamJain468"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.bg,
                  border: `3px solid ${colors.border}`,
                  color: colors.textSecondary,
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.textSecondary;
                }}
              >
                <Github size={18} strokeWidth={3} />
              </a>
              <a
                href="mailto:contact@wasteai.com"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.bg,
                  border: `3px solid ${colors.border}`,
                  color: colors.textSecondary,
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.textSecondary;
                }}
              >
                <Mail size={18} strokeWidth={3} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '16px' }}>
              QUICK LINKS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: colors.textSecondary,
                    textDecoration: 'none',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '16px' }}>
              CONTACT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color={colors.primary} strokeWidth={3} style={{ marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 600, lineHeight: 1.5 }}>
                  Delhi NCR, India
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Mail size={16} color={colors.primary} strokeWidth={3} style={{ marginTop: '2px' }} />
                <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 600 }}>
                  contact@wasteai.com
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '16px' }}>
              ABOUT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['FEATURES', 'HOW IT WORKS', 'PRIVACY', 'TERMS'].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: colors.textSecondary,
                    cursor: 'pointer',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
                >
                  → {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: `3px solid ${colors.border}`,
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '13px', color: colors.textSecondary, fontWeight: 700 }}>
            © 2026 WASTEAI • Built with ❤️ for a cleaner Delhi NCR
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href="https://github.com/SaiyamJain468"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: colors.textSecondary,
                textDecoration: 'none',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
            >
              GITHUB
            </a>
            <span style={{ color: colors.border }}>|</span>
            <div
              style={{

                fontSize: '13px',
                fontWeight: 700,
                color: colors.textSecondary,
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
            >
              DEVELOPER
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
