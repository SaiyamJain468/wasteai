export const WASTE_TYPES = {
  ORGANIC: { 
    label: 'Organic', 
    bin: 'GREEN BIN', 
    points: 10,
    color: '#1F7A3D',
    co2Saved: 0.5
  },
  RECYCLABLE: { 
    label: 'Recyclable', 
    bin: 'BLUE BIN', 
    points: 10,
    color: '#2E5DA0',
    co2Saved: 0.2
  },
  HAZARDOUS: { 
    label: 'Hazardous', 
    bin: 'RED BIN / Special Disposal', 
    points: 25,
    color: '#C0392B',
    co2Saved: 1.0
  }
};

export const API_ENDPOINTS = {
  CLASSIFY: '/api/classify',
  WASTE_LOGS: '/api/waste',
  LEADERBOARD: '/api/leaderboard',
  DASHBOARD: '/api/dashboard',
  AUTH: '/api/auth',
};

export const DISPOSAL_INSTRUCTIONS = {
  Organic: [
    'Remove any non-organic materials like rubber bands or stickers',
    'Place in the GREEN bin lined with a compostable bag',
    'Do not mix with plastic or metal waste',
    'Ideal for home composting — creates natural fertilizer',
  ],
  Recyclable: [
    'Rinse the item to remove food residue',
    'Remove caps, lids, or non-recyclable parts',
    'Flatten cardboard boxes before placing in BLUE bin',
    'Check for recycling symbol ♻ to confirm recyclability',
  ],
  Hazardous: [
    'Never pour chemicals down the drain or throw in regular bins',
    'Keep in original container if possible — seal tightly',
    'Locate nearest hazardous waste collection center',
    'Call your municipal helpline: 1800-XXX-XXXX for pickup',
  ],
};

export const ECO_TIPS = {
  Organic: 'Composting organic waste reduces methane emissions and creates natural fertilizer — helping forests regenerate 3x faster.',
  Recyclable: 'Recycling one plastic bottle saves enough water to sustain a plant for 3 days. Plastic in water bodies is the #1 cause of river contamination.',
  Hazardous: 'One battery improperly dumped can contaminate 600 liters of groundwater. Proper disposal directly protects your local water supply.',
};
