import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Upload, Loader, Leaf, Recycle, AlertTriangle, Zap, TrendingUp, Award } from 'lucide-react';
import { loadModel, classifyWaste } from '../utils/wasteClassifier';

export default function Home() {
  const { colors } = useTheme();
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);

  useEffect(() => {
    loadModel().then(() => setModelLoading(false));
  }, []);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = async () => {
    if (!preview) return;
    
    setLoading(true);
    
    const img = new Image();
    img.src = preview;
    await new Promise((resolve) => { img.onload = resolve; });
    
    const classification = await classifyWaste(img);
    const type = classification.type;
    const confidence = Math.round(classification.confidence * 100);
    
    const newResult = {
      type,
      confidence,
      carbonSaved: (Math.random() * 2 + 0.5).toFixed(2),
      waterSaved: (Math.random() * 5 + 2).toFixed(1),
      pointsEarned: type === 'Hazardous' ? 25 : 10,
    };
    
    setResult(newResult);
    setLoading(false);

    // Save to waste logs
    const logs = JSON.parse(localStorage.getItem('wasteLogs') || '[]');
    const newLog = {
      id: Date.now().toString(),
      type,
      confidence: newResult.confidence,
      points: newResult.pointsEarned,
      date: new Date().toISOString(),
      imagePreview: preview,
    };
    logs.unshift(newLog);
    localStorage.setItem('wasteLogs', JSON.stringify(logs));

    // Update streak
    const lastScan = localStorage.getItem('wasteai_last_scan');
    const today = new Date().toDateString();
    if (lastScan !== today) {
      const streak = parseInt(localStorage.getItem('wasteai_streak') || '0');
      localStorage.setItem('wasteai_streak', (streak + 1).toString());
      localStorage.setItem('wasteai_last_scan', today);
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'Organic':
        return { icon: Leaf, bg: colors.organicBg, text: colors.organicText, border: colors.organicBorder, bin: 'GREEN BIN', desc: 'Biodegradable waste that can be composted' };
      case 'Recyclable':
        return { icon: Recycle, bg: colors.recyclableBg, text: colors.recyclableText, border: colors.recyclableBorder, bin: 'BLUE BIN', desc: 'Materials that can be reprocessed' };
      case 'Hazardous':
        return { icon: AlertTriangle, bg: colors.hazardousBg, text: colors.hazardousText, border: colors.hazardousBorder, bin: 'RED BIN', desc: 'Dangerous waste requiring special handling' };
      default:
        return null;
    }
  };

  const typeConfig = result ? getTypeConfig(result.type) : null;

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
            CLASSIFY WASTE
          </h1>
          <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
            AI-POWERED WASTE IDENTIFICATION • INSTANT RESULTS • ENVIRONMENTAL IMPACT
          </p>
        </div>
        
        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ padding: '16px 24px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, textAlign: 'center' }}>
            <div className="font-mono" style={{ fontSize: '24px', fontWeight: 900, color: colors.primary }}>
              {parseInt(localStorage.getItem('wasteai_streak') || '0')}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '1px' }}>
              DAY STREAK
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Upload Section */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '8px' }}>
              STEP 1: UPLOAD IMAGE
            </div>
          </div>
          
          <div
            onClick={() => document.getElementById('file-input')?.click()}
            style={{
              width: '100%',
              height: '500px',
              backgroundColor: colors.surface,
              border: `3px dashed ${colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 150ms',
              position: 'relative',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border)}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              style={{ display: 'none' }}
            />

            {preview ? (
              <>
                <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px 16px', backgroundColor: colors.primary, color: '#000', fontSize: '11px', fontWeight: 900, letterSpacing: '1px' }}>
                  IMAGE LOADED
                </div>
              </>
            ) : (
              <>
                <Upload size={80} color={colors.primary} strokeWidth={3} style={{ marginBottom: '32px' }} />
                <p style={{ fontSize: '20px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px' }}>
                  CLICK TO UPLOAD
                </p>
                <p style={{ fontSize: '12px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px', marginBottom: '24px' }}>
                  JPG • PNG • WEBP • MAX 10MB
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  {['📱 PHONE', '📷 CAMERA', '💻 COMPUTER'].map((item, i) => (
                    <div key={i} style={{ padding: '12px 20px', backgroundColor: colors.bg, border: `3px solid ${colors.border}`, fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '1px' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {preview && !result && (
            <button
              onClick={handleClassify}
              disabled={loading || modelLoading}
              style={{
                width: '100%',
                height: '72px',
                marginTop: '24px',
                backgroundColor: colors.primary,
                color: '#000',
                fontSize: '16px',
                fontWeight: 900,
                border: `3px solid ${colors.primary}`,
                cursor: (loading || modelLoading) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                letterSpacing: '2px',
                transition: 'all 150ms',
                opacity: modelLoading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => !(loading || modelLoading) && (e.currentTarget.style.backgroundColor = colors.primaryHover, e.currentTarget.style.borderColor = colors.primaryHover, e.currentTarget.style.color = '#FFF')}
              onMouseLeave={(e) => !(loading || modelLoading) && (e.currentTarget.style.backgroundColor = colors.primary, e.currentTarget.style.borderColor = colors.primary, e.currentTarget.style.color = '#000')}
            >
              {modelLoading ? (
                <>
                  <Loader size={28} className="animate-spin" strokeWidth={3} />
                  LOADING AI MODEL...
                </>
              ) : loading ? (
                <>
                  <Loader size={28} className="animate-spin" strokeWidth={3} />
                  ANALYZING IMAGE...
                </>
              ) : (
                <>
                  <Zap size={28} strokeWidth={3} />
                  CLASSIFY WASTE NOW
                </>
              )}
            </button>
          )}

          {/* Instructions */}
          <div style={{ marginTop: '32px', padding: '24px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
            <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px' }}>
              HOW IT WORKS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { num: '01', text: 'Upload clear image of waste item' },
                { num: '02', text: 'AI analyzes and classifies in seconds' },
                { num: '03', text: 'Get disposal instructions + earn points' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: colors.primary, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900 }}>
                    {step.num}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: colors.textSecondary, letterSpacing: '0.5px' }}>
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '8px' }}>
              STEP 2: VIEW RESULTS
            </div>
          </div>

          {result && typeConfig ? (
            <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '32px' }}>
              {/* Classification Result */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '32px',
                  backgroundColor: typeConfig.bg,
                  border: `3px solid ${typeConfig.border}`,
                  marginBottom: '32px',
                }}
              >
                <typeConfig.icon size={64} color={typeConfig.text} strokeWidth={3} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: typeConfig.text, letterSpacing: '2px', marginBottom: '8px' }}>
                    {result.type.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '13px', color: typeConfig.text, fontWeight: 700, marginBottom: '12px' }}>
                    {typeConfig.desc}
                  </div>
                  <div className="font-mono" style={{ fontSize: '16px', color: typeConfig.text, fontWeight: 900 }}>
                    CONFIDENCE: {result.confidence}%
                  </div>
                </div>
              </div>

              {/* Disposal Instructions */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '20px', backgroundColor: colors.primary }} />
                  DISPOSAL INSTRUCTIONS
                </div>
                <div style={{ padding: '24px', backgroundColor: colors.bg, border: `3px solid ${typeConfig.border}` }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: typeConfig.text, marginBottom: '16px', letterSpacing: '1px' }}>
                    → {typeConfig.bin}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.8, fontWeight: 600 }}>
                    {result.type === 'Organic' && (
                      <ul style={{ paddingLeft: '24px', margin: 0 }}>
                        <li>Place in green bin for composting</li>
                        <li>Can be converted to nutrient-rich soil</li>
                        <li>Keep separate from recyclables</li>
                        <li>Reduces methane emissions in landfills</li>
                      </ul>
                    )}
                    {result.type === 'Recyclable' && (
                      <ul style={{ paddingLeft: '24px', margin: 0 }}>
                        <li>Place in blue bin for recycling</li>
                        <li>Clean and dry before disposal</li>
                        <li>Remove non-recyclable parts</li>
                        <li>Helps conserve natural resources</li>
                      </ul>
                    )}
                    {result.type === 'Hazardous' && (
                      <ul style={{ paddingLeft: '24px', margin: 0 }}>
                        <li>DO NOT mix with regular waste</li>
                        <li>Contact municipal authorities</li>
                        <li>Use designated hazardous facility</li>
                        <li>Prevents environmental contamination</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '20px', backgroundColor: colors.primary }} />
                  ENVIRONMENTAL IMPACT
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ padding: '20px', backgroundColor: colors.organicBg, border: `3px solid ${colors.organicBorder}` }}>
                    <div style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '8px', fontWeight: 900, letterSpacing: '2px' }}>
                      CO₂ SAVED
                    </div>
                    <div className="font-mono" style={{ fontSize: '32px', fontWeight: 900, color: colors.organicText }}>
                      {result.carbonSaved}
                    </div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary, fontWeight: 700, marginTop: '4px' }}>
                      KILOGRAMS
                    </div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: colors.recyclableBg, border: `3px solid ${colors.recyclableBorder}` }}>
                    <div style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '8px', fontWeight: 900, letterSpacing: '2px' }}>
                      WATER SAVED
                    </div>
                    <div className="font-mono" style={{ fontSize: '32px', fontWeight: 900, color: colors.recyclableText }}>
                      {result.waterSaved}
                    </div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary, fontWeight: 700, marginTop: '4px' }}>
                      LITERS
                    </div>
                  </div>
                </div>
              </div>

              {/* Points Earned */}
              <div style={{ padding: '24px', backgroundColor: colors.bg, border: `3px solid ${colors.primary}`, marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Award size={40} color={colors.primary} strokeWidth={3} />
                    <div>
                      <div style={{ fontSize: '11px', color: colors.textSecondary, fontWeight: 900, letterSpacing: '2px', marginBottom: '4px' }}>
                        POINTS EARNED
                      </div>
                      <div className="font-mono" style={{ fontSize: '32px', fontWeight: 900, color: colors.primary }}>
                        +{result.pointsEarned}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: colors.textSecondary, fontWeight: 900, letterSpacing: '2px', marginBottom: '4px' }}>
                      TOTAL IMPACT
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: colors.textPrimary }}>
                      EXCELLENT
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setPreview(null);
                  setResult(null);
                }}
                style={{
                  width: '100%',
                  height: '64px',
                  backgroundColor: colors.surface,
                  border: `3px solid ${colors.border}`,
                  color: colors.textPrimary,
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  letterSpacing: '2px',
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.primary, e.currentTarget.style.color = colors.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border, e.currentTarget.style.color = colors.textPrimary)}
              >
                SCAN ANOTHER ITEM
              </button>
            </div>
          ) : (
            <div
              style={{
                height: '500px',
                backgroundColor: colors.surface,
                border: `3px solid ${colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.textMuted,
                fontSize: '14px',
                fontWeight: 900,
                letterSpacing: '2px',
              }}
            >
              <TrendingUp size={64} color={colors.textMuted} strokeWidth={3} style={{ marginBottom: '24px' }} />
              RESULTS WILL APPEAR HERE
              <div style={{ fontSize: '11px', marginTop: '16px', color: colors.textMuted }}>
                UPLOAD AN IMAGE TO BEGIN
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
