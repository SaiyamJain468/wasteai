// AR Waste Sorting Game
export interface GameLevel {
  level: number;
  name: string;
  description: string;
  targetScore: number;
  timeLimit: number;
  items: GameItem[];
}

export interface GameItem {
  name: string;
  correctBin: 'organic' | 'recyclable' | 'hazardous';
  points: number;
  emoji?: string;
  img?: string;
}

export interface GameState {
  level: number;
  score: number;
  timeRemaining: number;
  itemsCorrect: number;
  itemsWrong: number;
  streak: number;
}

const WASTE_ITEMS_DATABASE: GameItem[] = [
  // Organic Items
  { name: 'Banana Peel', correctBin: 'organic', points: 10, emoji: '🍌', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { name: 'Apple Core', correctBin: 'organic', points: 10, emoji: '🍎', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
  { name: 'Orange Peel', correctBin: 'organic', points: 10, emoji: '🍊', img: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
  { name: 'Vegetable Scraps', correctBin: 'organic', points: 10, emoji: '🥬', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
  { name: 'Food Waste', correctBin: 'organic', points: 10, emoji: '🍽️', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400' },
  { name: 'Coffee Grounds', correctBin: 'organic', points: 10, emoji: '☕', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
  { name: 'Tea Bags', correctBin: 'organic', points: 10, emoji: '🍵', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
  { name: 'Egg Shells', correctBin: 'organic', points: 10, emoji: '🥚', img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400' },
  { name: 'Bread Crumbs', correctBin: 'organic', points: 10, emoji: '🍞', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { name: 'Potato Peels', correctBin: 'organic', points: 10, emoji: '🥔', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
  { name: 'Onion Skins', correctBin: 'organic', points: 10, emoji: '🧅', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784210?w=400' },
  { name: 'Carrot Tops', correctBin: 'organic', points: 10, emoji: '🥕', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
  { name: 'Watermelon Rind', correctBin: 'organic', points: 10, emoji: '🍉', img: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400' },
  { name: 'Corn Husks', correctBin: 'organic', points: 10, emoji: '🌽', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400' },
  { name: 'Tomato Waste', correctBin: 'organic', points: 10, emoji: '🍅', img: 'https://images.unsplash.com/photo-1546470427-227e9e3a0e6e?w=400' },
  { name: 'Lettuce Leaves', correctBin: 'organic', points: 10, emoji: '🥗', img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400' },
  { name: 'Cucumber Peels', correctBin: 'organic', points: 10, emoji: '🥒', img: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400' },
  { name: 'Mango Peel', correctBin: 'organic', points: 10, emoji: '🥭', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
  { name: 'Pineapple Core', correctBin: 'organic', points: 10, emoji: '🍍', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400' },
  { name: 'Grapes Stems', correctBin: 'organic', points: 10, emoji: '🍇', img: 'https://images.unsplash.com/photo-1599819177626-c0d3b8d6c7e1?w=400' },

  // Recyclable Items
  { name: 'Plastic Bottle', correctBin: 'recyclable', points: 10, emoji: '🍾', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400' },
  { name: 'Glass Jar', correctBin: 'recyclable', points: 10, emoji: '🍷', img: 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=400' },
  { name: 'Aluminum Can', correctBin: 'recyclable', points: 10, emoji: '🥫', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400' },
  { name: 'Paper', correctBin: 'recyclable', points: 10, emoji: '📄', img: 'https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=400' },
  { name: 'Cardboard Box', correctBin: 'recyclable', points: 10, emoji: '📦', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400' },
  { name: 'Newspaper', correctBin: 'recyclable', points: 10, emoji: '📰', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400' },
  { name: 'Magazine', correctBin: 'recyclable', points: 10, emoji: '📖', img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400' },
  { name: 'Steel Can', correctBin: 'recyclable', points: 10, emoji: '🥫', img: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400' },
  { name: 'Wine Bottle', correctBin: 'recyclable', points: 10, emoji: '🍷', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
  { name: 'Beer Bottle', correctBin: 'recyclable', points: 10, emoji: '🍺', img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400' },
  { name: 'Milk Carton', correctBin: 'recyclable', points: 10, emoji: '🥛', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { name: 'Juice Box', correctBin: 'recyclable', points: 10, emoji: '🧃', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400' },
  { name: 'Tin Foil', correctBin: 'recyclable', points: 10, emoji: '📋', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
  { name: 'Plastic Container', correctBin: 'recyclable', points: 10, emoji: '🥡', img: 'https://images.unsplash.com/photo-1625740515823-4b6b2b5c0f8f?w=400' },
  { name: 'Shampoo Bottle', correctBin: 'recyclable', points: 10, emoji: '🧴', img: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400' },
  { name: 'Detergent Bottle', correctBin: 'recyclable', points: 10, emoji: '🧼', img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' },
  { name: 'Cereal Box', correctBin: 'recyclable', points: 10, emoji: '📦', img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400' },
  { name: 'Pizza Box', correctBin: 'recyclable', points: 10, emoji: '🍕', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { name: 'Soda Can', correctBin: 'recyclable', points: 10, emoji: '🥤', img: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400' },
  { name: 'Water Bottle', correctBin: 'recyclable', points: 10, emoji: '💧', img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400' },

  // Hazardous Items
  { name: 'Battery', correctBin: 'hazardous', points: 25, emoji: '🔋', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' },
  { name: 'Light Bulb', correctBin: 'hazardous', points: 25, emoji: '💡', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400' },
  { name: 'Medicine', correctBin: 'hazardous', points: 25, emoji: '💊', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
  { name: 'Paint Can', correctBin: 'hazardous', points: 25, emoji: '🎨', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400' },
  { name: 'Pesticide', correctBin: 'hazardous', points: 25, emoji: '🧪', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400' },
  { name: 'Motor Oil', correctBin: 'hazardous', points: 25, emoji: '🛢️', img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400' },
  { name: 'Bleach', correctBin: 'hazardous', points: 25, emoji: '🧴', img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
  { name: 'Aerosol Can', correctBin: 'hazardous', points: 25, emoji: '💨', img: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400' },
  { name: 'Thermometer', correctBin: 'hazardous', points: 25, emoji: '🌡️', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400' },
  { name: 'Nail Polish', correctBin: 'hazardous', points: 25, emoji: '💅', img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400' },
  { name: 'Cleaning Spray', correctBin: 'hazardous', points: 25, emoji: '🧹', img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
  { name: 'Fertilizer', correctBin: 'hazardous', points: 25, emoji: '🌱', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
  { name: 'Car Battery', correctBin: 'hazardous', points: 25, emoji: '🔋', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400' },
  { name: 'Fluorescent Tube', correctBin: 'hazardous', points: 25, emoji: '💡', img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400' },
  { name: 'Antifreeze', correctBin: 'hazardous', points: 25, emoji: '🧊', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
  { name: 'Printer Ink', correctBin: 'hazardous', points: 25, emoji: '🖨️', img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400' },
  { name: 'Smoke Detector', correctBin: 'hazardous', points: 25, emoji: '🚨', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { name: 'Propane Tank', correctBin: 'hazardous', points: 25, emoji: '⛽', img: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400' },
  { name: 'Fire Extinguisher', correctBin: 'hazardous', points: 25, emoji: '🧯', img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' },
  { name: 'Syringes', correctBin: 'hazardous', points: 25, emoji: '💉', img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400' },
];

function generateRandomItems(count: number, difficulty: string): GameItem[] {
  const shuffled = [...WASTE_ITEMS_DATABASE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const GAME_LEVELS: GameLevel[] = [
  {
    level: 1,
    name: 'Beginner',
    description: 'Learn the basics of waste sorting',
    targetScore: 100,
    timeLimit: 60,
    items: [],
  },
  {
    level: 2,
    name: 'Intermediate',
    description: 'Sort faster and more accurately',
    targetScore: 200,
    timeLimit: 90,
    items: [],
  },
];

export class ARWasteGame {
  private state: GameState;
  private timer: NodeJS.Timeout | null = null;
  private onStateChange: (state: GameState) => void;

  constructor(onStateChange: (state: GameState) => void) {
    this.state = {
      level: 1,
      score: 0,
      timeRemaining: GAME_LEVELS[0].timeLimit,
      itemsCorrect: 0,
      itemsWrong: 0,
      streak: 0,
    };
    this.onStateChange = onStateChange;
  }

  startLevel(level: number) {
    const gameLevel = GAME_LEVELS[level - 1];
    if (!gameLevel) return;

    // Generate random items for this level
    if (gameLevel.items.length === 0) {
      const count = level === 1 ? 20 : 30;
      gameLevel.items = generateRandomItems(count, level === 1 ? 'easy' : 'medium');
    }

    this.state = {
      level,
      score: 0,
      timeRemaining: gameLevel.timeLimit,
      itemsCorrect: 0,
      itemsWrong: 0,
      streak: 0,
    };

    this.startTimer();
    this.onStateChange(this.state);
  }

  private startTimer() {
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.state.timeRemaining--;
      this.onStateChange(this.state);

      if (this.state.timeRemaining <= 0) {
        this.endLevel();
      }
    }, 1000);
  }

  checkAnswer(item: GameItem, selectedBin: string): boolean {
    const isCorrect = item.correctBin === selectedBin;

    if (isCorrect) {
      this.state.itemsCorrect++;
      this.state.streak++;
      const bonusMultiplier = Math.floor(this.state.streak / 3) + 1;
      this.state.score += item.points * bonusMultiplier;
    } else {
      this.state.itemsWrong++;
      this.state.streak = 0;
    }

    this.onStateChange(this.state);
    return isCorrect;
  }

  endLevel() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    const gameLevel = GAME_LEVELS[this.state.level - 1];
    const passed = this.state.score >= gameLevel.targetScore;

    return {
      passed,
      score: this.state.score,
      accuracy: (this.state.itemsCorrect / (this.state.itemsCorrect + this.state.itemsWrong)) * 100,
      maxStreak: this.state.streak,
    };
  }

  getState(): GameState {
    return { ...this.state };
  }
}

export const saveGameProgress = (userId: string, level: number, score: number) => {
  const progress = {
    userId,
    level,
    score,
    timestamp: new Date().toISOString(),
  };
  
  const saved = localStorage.getItem('ar_game_progress');
  const allProgress = saved ? JSON.parse(saved) : [];
  allProgress.push(progress);
  localStorage.setItem('ar_game_progress', JSON.stringify(allProgress));
};

export const getGameProgress = (userId: string) => {
  const saved = localStorage.getItem('ar_game_progress');
  if (!saved) return [];
  
  const allProgress = JSON.parse(saved);
  return allProgress.filter((p: any) => p.userId === userId);
};
