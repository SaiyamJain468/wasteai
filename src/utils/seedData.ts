// Seed data for testing and demo purposes

export const SEED_WASTE_LOGS = [
  { id: '1', type: 'Recyclable' as const, confidence: 94.2, points: 10, date: '2024-01-15T09:23:00.000Z' },
  { id: '2', type: 'Organic' as const, confidence: 87.6, points: 10, date: '2024-01-15T14:45:00.000Z' },
  { id: '3', type: 'Hazardous' as const, confidence: 91.3, points: 25, date: '2024-01-14T11:30:00.000Z' },
  { id: '4', type: 'Recyclable' as const, confidence: 78.9, points: 10, date: '2024-01-14T16:20:00.000Z' },
  { id: '5', type: 'Organic' as const, confidence: 83.4, points: 10, date: '2024-01-13T08:15:00.000Z' },
  { id: '6', type: 'Recyclable' as const, confidence: 96.1, points: 10, date: '2024-01-12T13:55:00.000Z' },
  { id: '7', type: 'Organic' as const, confidence: 76.8, points: 10, date: '2024-01-11T10:40:00.000Z' },
  { id: '8', type: 'Hazardous' as const, confidence: 88.5, points: 25, date: '2024-01-10T15:10:00.000Z' }
];

export const SEED_LEADERBOARD = [
  { rank: 1, name: 'Rahul Sharma', ward: 'Koramangala Ward', scans: 85, points: 850 },
  { rank: 2, name: 'Priya Mehta', ward: 'Banjara Hills Ward', scans: 78, points: 780 },
  { rank: 3, name: 'Arjun Nair', ward: 'Andheri East Ward', scans: 72, points: 720 },
  { rank: 4, name: 'Deepika Rao', ward: 'Powai Ward', scans: 68, points: 640 },
  { rank: 5, name: 'Vikram Singh', ward: 'HSR Layout Ward', scans: 61, points: 590 },
  { rank: 6, name: 'Ananya Iyer', ward: 'Whitefield Ward', scans: 55, points: 520 },
  { rank: 7, name: 'Rohan Gupta', ward: 'Jubilee Hills Ward', scans: 49, points: 470 },
  { rank: 8, name: 'Sneha Patil', ward: 'Malad West Ward', scans: 45, points: 430 },
  { rank: 9, name: 'Karthik Reddy', ward: 'Indiranagar Ward', scans: 40, points: 380 },
  { rank: 10, name: 'Meera Joshi', ward: 'Madhapur Ward', scans: 36, points: 340 },
];

export const QUIZ_QUESTIONS = [
  {
    question: 'Is a greasy pizza box recyclable?',
    options: ['Yes', 'No', 'Depends'],
    correct: 1,
    explanation: 'Grease contaminates the recycling process. Compost it instead!'
  },
  {
    question: 'Can you recycle plastic bags in curbside bins?',
    options: ['Yes', 'No', 'Sometimes'],
    correct: 1,
    explanation: 'Plastic bags jam sorting machines. Take them to store drop-offs.'
  },
  {
    question: 'Is glass infinitely recyclable?',
    options: ['Yes', 'No', 'Only once'],
    correct: 0,
    explanation: 'Glass can be recycled endlessly without losing quality.'
  },
  {
    question: 'Should you rinse containers before recycling?',
    options: ['Yes', 'No', 'Only plastic'],
    correct: 0,
    explanation: 'Rinsing prevents contamination and improves recycling quality.'
  },
  {
    question: 'Are batteries considered hazardous waste?',
    options: ['Yes', 'No', 'Only car batteries'],
    correct: 0,
    explanation: 'All batteries contain toxic materials and need special disposal.'
  }
];

export const initializeSeedData = () => {
  if (!localStorage.getItem('wasteLogs')) {
    localStorage.setItem('wasteLogs', JSON.stringify(SEED_WASTE_LOGS));
  }
  if (!localStorage.getItem('wasteStreak')) {
    localStorage.setItem('wasteStreak', '0');
  }
  if (!localStorage.getItem('scanCount')) {
    localStorage.setItem('scanCount', '0');
  }
};
