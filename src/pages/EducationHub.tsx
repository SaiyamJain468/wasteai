import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Check, X, Trophy } from 'lucide-react';

const QUIZ_POOL = [
  { q: 'Which bin should plastic bottles go into?', options: ['Green', 'Blue', 'Red', 'Black'], correct: 1, exp: 'Plastic bottles are recyclable and go in blue bin' },
  { q: 'What percentage of plastic waste in India is recycled?', options: ['10%', '30%', '60%', '90%'], correct: 2, exp: 'India recycles approximately 60% of plastic waste' },
  { q: 'Which is considered hazardous waste?', options: ['Banana peel', 'Newspaper', 'Used batteries', 'Cardboard'], correct: 2, exp: 'Batteries contain toxic chemicals' },
  { q: 'How long does plastic bag take to decompose?', options: ['1 year', '10 years', '100 years', '500+ years'], correct: 3, exp: 'Plastic bags take 500-1000 years' },
  { q: 'What is composting?', options: ['Burning waste', 'Natural decomposition', 'Recycling plastic', 'Landfill disposal'], correct: 1, exp: 'Composting breaks down organic waste naturally' },
  { q: 'Which waste produces methane in landfills?', options: ['Plastic', 'Metal', 'Organic', 'Glass'], correct: 2, exp: 'Organic waste produces methane gas' },
  { q: 'What color bin is for organic waste?', options: ['Blue', 'Green', 'Red', 'Yellow'], correct: 1, exp: 'Green bin is for biodegradable organic waste' },
  { q: 'Which material is NOT recyclable?', options: ['Paper', 'Glass', 'Styrofoam', 'Aluminum'], correct: 2, exp: 'Styrofoam is difficult to recycle' },
  { q: 'What is e-waste?', options: ['Energy waste', 'Electronic waste', 'Edible waste', 'Empty waste'], correct: 1, exp: 'E-waste is discarded electronic devices' },
  { q: 'Which takes longest to decompose?', options: ['Paper', 'Glass', 'Banana peel', 'Cotton'], correct: 1, exp: 'Glass can take 1 million years to decompose' },
  { q: 'What is the 3R principle?', options: ['Read, Run, Rest', 'Reduce, Reuse, Recycle', 'Red, Round, Rough', 'Rain, River, Road'], correct: 1, exp: 'Reduce, Reuse, Recycle is waste management principle' },
  { q: 'Which country recycles the most?', options: ['India', 'USA', 'Germany', 'China'], correct: 2, exp: 'Germany has highest recycling rate globally' },
  { q: 'What is biodegradable waste?', options: ['Plastic bags', 'Food scraps', 'Metal cans', 'Glass bottles'], correct: 1, exp: 'Biodegradable waste breaks down naturally' },
  { q: 'Which is NOT hazardous waste?', options: ['Paint', 'Pesticides', 'Cardboard', 'Batteries'], correct: 2, exp: 'Cardboard is recyclable, not hazardous' },
  { q: 'What does segregation mean?', options: ['Mixing waste', 'Separating waste', 'Burning waste', 'Burying waste'], correct: 1, exp: 'Segregation is separating waste by type' },
];

export default function EducationHub() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  useEffect(() => {
    // Load quiz state from localStorage
    const savedState = localStorage.getItem('wasteai_quiz_state');
    if (savedState) {
      const state = JSON.parse(savedState);
      setScore(state.score || 0);
      setTotalAnswered(state.totalAnswered || 0);
      setUsedQuestions(state.usedQuestions || []);
      if (state.currentIndex !== undefined) {
        setCurrentIndex(state.currentIndex);
      }
    }
  }, []);

  useEffect(() => {
    // Save quiz state to localStorage
    const state = {
      score,
      totalAnswered,
      usedQuestions,
      currentIndex,
    };
    localStorage.setItem('wasteai_quiz_state', JSON.stringify(state));
  }, [score, totalAnswered, usedQuestions, currentIndex]);

  const getRandomQuestion = () => {
    const available = QUIZ_POOL.map((_, i) => i).filter(i => !usedQuestions.includes(i));
    if (available.length === 0) {
      setUsedQuestions([]);
      return Math.floor(Math.random() * QUIZ_POOL.length);
    }
    return available[Math.floor(Math.random() * available.length)];
  };

  const question = QUIZ_POOL[currentIndex];

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    setTotalAnswered(totalAnswered + 1);
    
    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = getRandomQuestion();
    setUsedQuestions([...usedQuestions, currentIndex]);
    setCurrentIndex(nextIndex);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleStop = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    const newIndex = getRandomQuestion();
    setCurrentIndex(newIndex);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTotalAnswered(0);
    setAnswered(false);
    setUsedQuestions([]);
    localStorage.removeItem('wasteai_quiz_state');
  };

  if (showResult) {
    const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    
    return (
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '64px', backgroundColor: colors.surface, border: `3px solid ${colors.primary}`, textAlign: 'center' }}>
          <Trophy size={80} color={colors.primary} strokeWidth={3} style={{ margin: '0 auto 32px' }} />
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '2px' }}>
            QUIZ COMPLETE
          </h1>
          <div className="font-mono" style={{ fontSize: '72px', fontWeight: 900, color: colors.primary, marginBottom: '16px' }}>
            {score}/{totalAnswered}
          </div>
          <p style={{ fontSize: '20px', color: colors.textSecondary, marginBottom: '48px', fontWeight: 700 }}>
            YOU SCORED {percentage}%
          </p>
          <button
            onClick={handleRestart}
            style={{
              padding: '20px 48px',
              backgroundColor: colors.primary,
              color: '#000',
              fontSize: '16px',
              fontWeight: 900,
              border: `3px solid ${colors.primary}`,
              cursor: 'pointer',
              letterSpacing: '2px',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.primaryHover, e.currentTarget.style.borderColor = colors.primaryHover, e.currentTarget.style.color = '#FFF')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary, e.currentTarget.style.borderColor = colors.primary, e.currentTarget.style.color = '#000')}
          >
            START NEW QUIZ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
            WASTE QUIZ
          </h1>
          <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
            UNLIMITED QUESTIONS • TEST YOUR KNOWLEDGE
          </p>
        </div>
        <div className="font-mono" style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary }}>
          SCORE: {score}
        </div>
      </div>

      <div style={{ backgroundColor: colors.surface, border: `3px solid ${colors.border}`, padding: '48px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: colors.textSecondary, letterSpacing: '2px', marginBottom: '16px' }}>
            QUESTION #{usedQuestions.length + 1}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, lineHeight: 1.5, letterSpacing: '0.5px' }}>
            {question.q}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = answered && isCorrect;
            const showWrong = answered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                style={{
                  padding: '20px 24px',
                  backgroundColor: showCorrect
                    ? colors.organicBg
                    : showWrong
                    ? colors.hazardousBg
                    : colors.bg,
                  border: `3px solid ${
                    showCorrect
                      ? colors.organicBorder
                      : showWrong
                      ? colors.hazardousBorder
                      : isSelected
                      ? colors.primary
                      : colors.border
                  }`,
                  fontSize: '16px',
                  fontWeight: 700,
                  color: showCorrect
                    ? colors.organicText
                    : showWrong
                    ? colors.hazardousText
                    : colors.textPrimary,
                  cursor: answered ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 150ms',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => !answered && (e.currentTarget.style.borderColor = colors.primary)}
                onMouseLeave={(e) => !answered && !isSelected && (e.currentTarget.style.borderColor = colors.border)}
              >
                <span>{option}</span>
                {showCorrect && <Check size={24} strokeWidth={3} />}
                {showWrong && <X size={24} strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ padding: '24px', backgroundColor: colors.recyclableBg, border: `3px solid ${colors.recyclableBorder}`, marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, color: colors.recyclableText, marginBottom: '8px', letterSpacing: '2px' }}>
              EXPLANATION
            </div>
            <div style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, lineHeight: 1.6 }}>
              {question.exp}
            </div>
          </div>
        )}

        {answered && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleNext}
              style={{
                flex: 1,
                height: '56px',
                backgroundColor: colors.primary,
                color: '#000',
                fontSize: '14px',
                fontWeight: 900,
                border: `3px solid ${colors.primary}`,
                cursor: 'pointer',
                letterSpacing: '2px',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.primaryHover, e.currentTarget.style.borderColor = colors.primaryHover, e.currentTarget.style.color = '#FFF')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary, e.currentTarget.style.borderColor = colors.primary, e.currentTarget.style.color = '#000')}
            >
              NEXT QUESTION
            </button>
            <button
              onClick={handleStop}
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
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = colors.hazardousBorder, e.currentTarget.style.color = colors.hazardousBorder)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = colors.border, e.currentTarget.style.color = colors.textPrimary)}
            >
              STOP & VIEW RESULT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
