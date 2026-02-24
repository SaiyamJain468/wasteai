import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export default function Signup() {
  const { register } = useAuth();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', ward: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError('Please meet all password requirements');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.bg }}>
      {/* Left Panel - Brand */}
      <div
        style={{
          width: '50%',
          backgroundColor: colors.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          color: '#fff',
        }}
        className="hidden md:flex"
      >
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>♻️</div>
        <h1 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-1px' }}>
          Join WasteAI
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.95, lineHeight: 1.6 }}>
          Be part of India's largest civic-tech waste management platform.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Check size={20} />
            <span>Free forever • No credit card required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Check size={20} />
            <span>Track your environmental impact</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Check size={20} />
            <span>Compete with your community</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Check size={20} />
            <span>Earn rewards for eco-actions</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary, marginBottom: '8px' }}>
              Create account
            </h2>
            <p style={{ fontSize: '14px', color: colors.textSecondary }}>
              Start your journey to a cleaner India
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: colors.hazardousBg,
                border: `1px solid ${colors.hazardousBorder}`,
                borderRadius: '6px',
                color: colors.hazardousText,
                fontSize: '14px',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rajesh Kumar"
                required
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: colors.textPrimary,
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: colors.textPrimary,
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '8px' }}>
                Ward
              </label>
              <select
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                required
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  backgroundColor: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: colors.textPrimary,
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              >
                <option value="">Select your ward</option>
                <option value="Ward 1">Ward 1 - Connaught Place</option>
                <option value="Ward 2">Ward 2 - Karol Bagh</option>
                <option value="Ward 3">Ward 3 - Rohini</option>
                <option value="Ward 4">Ward 4 - Dwarka</option>
                <option value="Ward 5">Ward 5 - Vasant Kunj</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '8px' }}>
                Password
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
                    height: '44px',
                    padding: '0 44px 0 14px',
                    backgroundColor: colors.inputBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: colors.textPrimary,
                    outline: 'none',
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { key: 'length', label: 'At least 8 characters' },
                    { key: 'uppercase', label: 'One uppercase letter' },
                    { key: 'number', label: 'One number' },
                  ].map((check) => (
                    <div key={check.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                      {passwordChecks[check.key as keyof typeof passwordChecks] ? (
                        <Check size={14} color={colors.primary} />
                      ) : (
                        <X size={14} color={colors.textMuted} />
                      )}
                      <span style={{ color: passwordChecks[check.key as keyof typeof passwordChecks] ? colors.primary : colors.textMuted }}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              style={{
                width: '100%',
                height: '44px',
                backgroundColor: colors.primary,
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '6px',
                cursor: loading || !isPasswordValid ? 'not-allowed' : 'pointer',
                opacity: loading || !isPasswordValid ? 0.7 : 1,
                marginTop: '8px',
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px', color: colors.textSecondary, marginTop: '24px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: colors.primary, fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
