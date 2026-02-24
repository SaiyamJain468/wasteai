import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, X } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (email: string, password: string) => {
    setShowGooglePopup(false);
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.bg }}>
      {/* Left Panel */}
      <div
        style={{
          width: '50%',
          backgroundColor: colors.bg,
          border: `3px solid ${colors.primary}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
        className="hidden md:flex"
      >
        <div style={{ fontSize: '64px', marginBottom: '32px' }}>♻️</div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '24px', color: colors.primary, letterSpacing: '2px' }}>
          WASTEAI
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '48px', color: colors.textSecondary, lineHeight: 1.6, fontWeight: 600 }}>
          SMART WASTE SEGREGATION FOR CLEANER CITIES
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {['AI CLASSIFICATION', 'TRACK IMPACT', 'COMPETE'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: '#000' }}>
                {i + 1}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: colors.textPrimary, letterSpacing: '1px' }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: colors.textPrimary, marginBottom: '12px', letterSpacing: '1px' }}>
              SIGN IN
            </h2>
            <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 600 }}>
              ACCESS YOUR ACCOUNT
            </p>
          </div>

          {error && (
            <div style={{ padding: '16px', backgroundColor: colors.hazardousBg, border: `3px solid ${colors.hazardousBorder}`, color: colors.hazardousText, fontSize: '14px', marginBottom: '24px', fontWeight: 700 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px', letterSpacing: '2px' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: colors.inputBg,
                  border: `3px solid ${colors.border}`,
                  fontSize: '14px',
                  color: colors.textPrimary,
                  outline: 'none',
                  fontWeight: 600,
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px', letterSpacing: '2px' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 48px 0 16px',
                    backgroundColor: colors.inputBg,
                    border: `3px solid ${colors.border}`,
                    fontSize: '14px',
                    color: colors.textPrimary,
                    outline: 'none',
                    fontWeight: 600,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                  onBlur={(e) => (e.target.style.borderColor = colors.border)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: colors.textSecondary,
                  }}
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={3} /> : <Eye size={20} strokeWidth={3} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: colors.primary,
                color: '#000',
                fontSize: '14px',
                fontWeight: 900,
                border: `3px solid ${colors.primary}`,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '2px',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = colors.primaryHover, e.currentTarget.style.borderColor = colors.primaryHover)}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = colors.primary, e.currentTarget.style.borderColor = colors.primary)}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, height: '3px', backgroundColor: colors.border }} />
              <span style={{ fontSize: '11px', color: colors.textMuted, fontWeight: 900, letterSpacing: '2px' }}>OR</span>
              <div style={{ flex: 1, height: '3px', backgroundColor: colors.border }} />
            </div>

            <button
              type="button"
              onClick={() => setShowGooglePopup(true)}
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: colors.surface,
                border: `3px solid ${colors.border}`,
                color: colors.textPrimary,
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                letterSpacing: '2px',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
            >
              GOOGLE SIGN IN
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: colors.textSecondary, marginTop: '32px', fontWeight: 700 }}>
            NO ACCOUNT?{' '}
            <Link to="/signup" style={{ color: colors.primary, fontWeight: 900, textDecoration: 'none' }}>
              SIGN UP
            </Link>
          </p>
        </div>
      </div>

      {/* Google Popup */}
      {showGooglePopup && (
        <div
          onClick={() => setShowGooglePopup(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.surface,
              border: `3px solid ${colors.primary}`,
              width: '400px',
              maxWidth: '90%',
              padding: '32px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>GOOGLE SIGN IN</h3>
              <button
                onClick={() => setShowGooglePopup(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.textSecondary,
                }}
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            <p style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '24px', fontWeight: 700, letterSpacing: '1px' }}>
              SELECT ACCOUNT
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'ADMIN', email: 'admin@wasteai.com', password: 'admin123', color: colors.primary },
                { name: 'SAIYAM', email: 'saiyam@wasteai.com', password: 'saiyam123', color: colors.secondary },
              ].map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleGoogleLogin(account.email, account.password)}
                  style={{
                    padding: '20px',
                    backgroundColor: colors.surface,
                    border: `3px solid ${colors.border}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.primaryHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: account.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000',
                      fontSize: '20px',
                      fontWeight: 900,
                    }}
                  >
                    {account.name[0]}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>{account.name}</div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary, fontWeight: 600 }}>{account.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
