import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const WARDS = [
  'Koramangala', 'Indiranagar', 'Jayanagar', 'Malleshwaram', 'Whitefield',
  'HSR Layout', 'BTM Layout', 'Marathahalli', 'Yelahanka', 'JP Nagar'
];

export default function Register() {
  const { register } = useAuth();
  const { colors, mode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', ward: '', city: 'Bangalore' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const primaryColor = mode === 'light' ? '#16A34A' : '#22C55E';

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 4) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length < 8) return 2;
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 4;
    return 3;
  };

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#EF4444', '#F97316', '#EAB308', '#22C55E'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.ward) newErrors.ward = 'Please select a ward';
    if (!agreed) newErrors.terms = 'You must agree to the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const emailValid = formData.email && validateEmail(formData.email);
  const passwordMatch = formData.confirmPassword && formData.password === formData.confirmPassword;
  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.bg }}>
      {/* Left Panel */}
      <div
        className="hidden md:flex md:w-[45%] flex-col items-center justify-center p-12"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-md text-white">
          <div className="text-6xl mb-4">♻</div>
          <h1 className="text-[32px] font-bold mb-6">WasteAI</h1>
          <p className="text-lg mb-8 font-semibold">Join 42 cities making a difference</p>
          
          <div className="space-y-3">
            <div style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}>
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-sm" style={{ opacity: 0.9 }}>Items Classified</div>
            </div>
            <div style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}>
              <div className="text-2xl font-bold">15.2 Tonnes</div>
              <div className="text-sm" style={{ opacity: 0.9 }}>Diverted</div>
            </div>
            <div style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}>
              <div className="text-2xl font-bold">891</div>
              <div className="text-sm" style={{ opacity: 0.9 }}>Active Citizens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[360px]">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <div className="text-5xl mb-2">♻</div>
            <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>WasteAI</h1>
          </div>

          <div className="p-8 rounded-lg" style={{ backgroundColor: colors.surface }}>
            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>Create your account</h2>
            <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>Start your eco journey today</p>

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: colors.textPrimary }}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    padding: '0 12px',
                    color: colors.textPrimary,
                  }}
                  required
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: colors.danger }}>{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: colors.textPrimary }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      backgroundColor: colors.background,
                      border: `1px solid ${formData.email ? (emailValid ? colors.primary : colors.danger) : colors.border}`,
                      borderRadius: '6px',
                      padding: '0 44px 0 12px',
                      color: colors.textPrimary,
                    }}
                    required
                  />
                  {formData.email && (
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                      {emailValid ? <Check size={18} color={colors.primary} /> : <X size={18} color={colors.danger} />}
                    </div>
                  )}
                </div>
                {errors.email && <p className="text-xs mt-1" style={{ color: colors.danger }}>{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: colors.textPrimary }}>Ward / Area</label>
                <select
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    padding: '0 12px',
                    color: colors.textPrimary,
                  }}
                  required
                >
                  <option value="">Select your ward</option>
                  {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.ward && <p className="text-xs mt-1" style={{ color: colors.danger }}>{errors.ward}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: colors.textPrimary }}>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    width: '100%',
                    height: '44px',
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    padding: '0 12px',
                    color: colors.textPrimary,
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: colors.textPrimary }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '6px',
                      padding: '0 44px 0 12px',
                      color: colors.textPrimary,
                    }}
                    required
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
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: '4px',
                            backgroundColor: i <= strength ? strengthColors[strength] : colors.border,
                            borderRadius: '2px',
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
                  </div>
                )}
                {errors.password && <p className="text-xs mt-1" style={{ color: colors.danger }}>{errors.password}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold mb-1" style={{ color: colors.textPrimary }}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      height: '44px',
                      backgroundColor: colors.background,
                      border: `1px solid ${formData.confirmPassword ? (passwordMatch ? colors.primary : colors.danger) : colors.border}`,
                      borderRadius: '6px',
                      padding: '0 44px 0 12px',
                      color: colors.textPrimary,
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      position: 'absolute',
                      right: '36px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textSecondary,
                    }}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {formData.confirmPassword && (
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                      {passwordMatch ? <Check size={18} color={colors.primary} /> : <X size={18} color={colors.danger} />}
                    </div>
                  )}
                </div>
                {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: colors.danger }}>{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
                  />
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    I agree to <a href="#" style={{ color: colors.primary }}>Terms of Service</a> and <a href="#" style={{ color: colors.primary }}>Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <p className="text-xs mt-1" style={{ color: colors.danger }}>{errors.terms}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: colors.primary,
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: colors.textSecondary }}>
              Already have an account? <Link to="/login" className="font-medium hover:underline" style={{ color: colors.primary }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
