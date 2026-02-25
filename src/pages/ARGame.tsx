import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Gamepad2, Play, Trophy, Target, X, Timer, Zap, Award, RotateCcw } from 'lucide-react';
import { ARWasteGame, GAME_LEVELS, GameState, GameItem } from '../utils/arGame';
import { useAuth } from '../context/AuthContext';

export default function ARGame() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<ARWasteGame | null>(null);
  const itemIndexRef = useRef(0);

  const startGame = (level: number) => {
    setSelectedLevel(level);
    setGameOver(false);
    setFeedback('');
    itemIndexRef.current = 0;
    
    const game = new ARWasteGame((state) => {
      setGameState(state);
      if (state.timeRemaining <= 0) {
        setGameOver(true);
      }
    });
    
    gameRef.current = game;
    game.startLevel(level);
    nextItem(level);
  };

  useEffect(() => {
    return () => {
      if (gameRef.current) {
        gameRef.current.endLevel();
      }
    };
  }, []);

  const nextItem = (level: number) => {
    const levelData = GAME_LEVELS[level - 1];
    if (!levelData) return;
    
    const items = levelData.items;
    const item = items[itemIndexRef.current % items.length];
    setCurrentItem(item);
    itemIndexRef.current++;
  };

  const handleBinSelect = (bin: string) => {
    if (!gameRef.current || !currentItem || gameOver || feedback) return;
    
    const isCorrect = gameRef.current.checkAnswer(currentItem, bin);
    
    if (isCorrect) {
      setFeedback('✅ CORRECT!');
    } else {
      setFeedback(`❌ WRONG! Should be ${currentItem.correctBin.toUpperCase()}`);
    }
    
    setTimeout(() => {
      setFeedback('');
      const currentGameOver = gameRef.current?.getState().timeRemaining === 0;
      if (!currentGameOver) {
        nextItem(selectedLevel!);
      }
    }, 1000);
  };

  const resetGame = () => {
    if (gameRef.current) {
      gameRef.current.endLevel();
    }
    setSelectedLevel(null);
    setGameState(null);
    setCurrentItem(null);
    setFeedback('');
    setGameOver(false);
    gameRef.current = null;
  };

  if (!user) {
    return (
      <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '120px 40px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
          <Gamepad2 size={80} color={colors.textMuted} strokeWidth={3} style={{ margin: '0 auto 32px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px' }}>
            LOGIN REQUIRED
          </h2>
          <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700 }}>
            Please login to play the AR Waste Sorting Game
          </p>
        </div>
      </div>
    );
  }

  if (selectedLevel && gameState) {
    return (
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: colors.primary, letterSpacing: '2px' }}>
            LEVEL {selectedLevel}
          </h1>
          <button onClick={resetGame} style={{ padding: '12px 24px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, color: colors.textPrimary, fontSize: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <X size={16} strokeWidth={3} />
            EXIT
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon={Timer} label="TIME" value={`${gameState.timeRemaining}s`} colors={colors} />
          <StatCard icon={Trophy} label="SCORE" value={gameState.score} colors={colors} />
          <StatCard icon={Zap} label="STREAK" value={`${gameState.streak}x`} colors={colors} />
          <StatCard icon={Award} label="CORRECT" value={gameState.itemsCorrect} colors={colors} />
        </div>

        {gameOver ? (
          <GameOverScreen gameState={gameState} level={selectedLevel} colors={colors} onRestart={() => startGame(selectedLevel)} onExit={resetGame} />
        ) : (
          <>
            <div style={{ padding: '80px 40px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, textAlign: 'center', marginBottom: '32px' }}>
              {currentItem && (
                <>
                  <div style={{ width: '200px', height: '200px', margin: '0 auto 32px', backgroundColor: '#111', border: `3px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {currentItem.img ? (
                      <img src={currentItem.img} alt={currentItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '80px' }}>{currentItem.emoji || '🗑️'}</span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '32px', fontWeight: 900, color: colors.textPrimary, marginBottom: '16px', letterSpacing: '1px' }}>
                    {currentItem.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, marginBottom: '8px' }}>
                    POINTS: {currentItem.points}
                  </p>
                  {feedback && (
                    <div style={{ padding: '16px', backgroundColor: feedback.includes('CORRECT') ? colors.primary : '#ff4444', color: '#000', fontSize: '16px', fontWeight: 900, marginTop: '24px', letterSpacing: '1px' }}>
                      {feedback}
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <BinButton bin="organic" label="ORGANIC" emoji="🟢" colors={colors} onClick={() => handleBinSelect('organic')} disabled={!!feedback} />
              <BinButton bin="recyclable" label="RECYCLABLE" emoji="🔵" colors={colors} onClick={() => handleBinSelect('recyclable')} disabled={!!feedback} />
              <BinButton bin="hazardous" label="HAZARDOUS" emoji="🔴" colors={colors} onClick={() => handleBinSelect('hazardous')} disabled={!!feedback} />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, color: colors.primary, marginBottom: '12px', letterSpacing: '2px' }}>
          AR WASTE GAME
        </h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '1px' }}>
          LEARN WASTE SORTING THROUGH INTERACTIVE GAMEPLAY
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {GAME_LEVELS.map((level) => (
          <div key={level.level} style={{ padding: '32px', backgroundColor: colors.surface, border: `3px solid ${colors.border}` }}>
            <Target size={48} color={colors.primary} strokeWidth={3} style={{ marginBottom: '24px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: colors.textPrimary, marginBottom: '8px', letterSpacing: '1px' }}>
              LEVEL {level.level}
            </h3>
            <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, marginBottom: '24px' }}>
              {level.name} - {level.description}
            </p>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px 20px', backgroundColor: colors.background, border: `3px solid ${colors.border}`, fontSize: '11px', fontWeight: 900, color: colors.textSecondary }}>
                TARGET: {level.targetScore} pts
              </div>
              <div style={{ padding: '12px 20px', backgroundColor: colors.background, border: `3px solid ${colors.border}`, fontSize: '11px', fontWeight: 900, color: colors.textSecondary }}>
                TIME: {level.timeLimit}s
              </div>
            </div>
            <button
              onClick={() => startGame(level.level)}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: colors.primary,
                color: '#000',
                fontSize: '14px',
                fontWeight: 900,
                border: `3px solid ${colors.primary}`,
                cursor: 'pointer',
                letterSpacing: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Play size={20} strokeWidth={3} />
              PLAY NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, colors }: any) {
  return (
    <div style={{ padding: '20px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, textAlign: 'center' }}>
      <Icon size={24} color={colors.primary} strokeWidth={3} style={{ marginBottom: '12px' }} />
      <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>
        {label}
      </p>
      <p style={{ fontSize: '24px', color: colors.textPrimary, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
        {value}
      </p>
    </div>
  );
}

function BinButton({ bin, label, emoji, colors, onClick, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '40px 20px',
        backgroundColor: colors.surface,
        border: `3px solid ${colors.border}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.borderColor = colors.primary)}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.borderColor = colors.border)}
    >
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{emoji}</div>
      <p style={{ fontSize: '16px', fontWeight: 900, color: colors.textPrimary, letterSpacing: '1px' }}>
        {label}
      </p>
    </button>
  );
}

function GameOverScreen({ gameState, level, colors, onRestart, onExit }: any) {
  const levelData = GAME_LEVELS[level - 1];
  const passed = gameState.score >= levelData.targetScore;
  const accuracy = gameState.itemsCorrect + gameState.itemsWrong > 0
    ? Math.round((gameState.itemsCorrect / (gameState.itemsCorrect + gameState.itemsWrong)) * 100)
    : 0;

  return (
    <div style={{ padding: '60px 40px', backgroundColor: colors.surface, border: `3px solid ${colors.border}`, textAlign: 'center' }}>
      <div style={{ fontSize: '80px', marginBottom: '24px' }}>
        {passed ? '🏆' : '😔'}
      </div>
      <h2 style={{ fontSize: '32px', fontWeight: 900, color: passed ? colors.primary : '#ff4444', marginBottom: '16px', letterSpacing: '1px' }}>
        {passed ? 'LEVEL COMPLETE!' : 'GAME OVER'}
      </h2>
      <p style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 700, marginBottom: '40px' }}>
        {passed ? 'Great job! You passed the level!' : 'Try again to beat the target score!'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ padding: '24px', backgroundColor: colors.background, border: `3px solid ${colors.border}` }}>
          <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>FINAL SCORE</p>
          <p style={{ fontSize: '32px', color: colors.primary, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
            {gameState.score}
          </p>
        </div>
        <div style={{ padding: '24px', backgroundColor: colors.background, border: `3px solid ${colors.border}` }}>
          <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>ACCURACY</p>
          <p style={{ fontSize: '32px', color: colors.primary, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
            {accuracy}%
          </p>
        </div>
        <div style={{ padding: '24px', backgroundColor: colors.background, border: `3px solid ${colors.border}` }}>
          <p style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, marginBottom: '8px' }}>MAX STREAK</p>
          <p style={{ fontSize: '32px', color: colors.primary, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>
            {gameState.streak}x
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button
          onClick={onRestart}
          style={{
            padding: '16px 32px',
            backgroundColor: colors.primary,
            color: '#000',
            fontSize: '14px',
            fontWeight: 900,
            border: `3px solid ${colors.primary}`,
            cursor: 'pointer',
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <RotateCcw size={20} strokeWidth={3} />
          PLAY AGAIN
        </button>
        <button
          onClick={onExit}
          style={{
            padding: '16px 32px',
            backgroundColor: colors.surface,
            color: colors.textPrimary,
            fontSize: '14px',
            fontWeight: 900,
            border: `3px solid ${colors.border}`,
            cursor: 'pointer',
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <X size={20} strokeWidth={3} />
          EXIT
        </button>
      </div>
    </div>
  );
}