export const calculatePoints = (type: 'Organic' | 'Recyclable' | 'Hazardous'): number => {
  switch (type) {
    case 'Hazardous':
      return 25;
    case 'Organic':
    case 'Recyclable':
      return 10;
    default:
      return 0;
  }
};

export const calculateCO2Saved = (type: 'Organic' | 'Recyclable' | 'Hazardous'): number => {
  switch (type) {
    case 'Organic':
      return 0.5;
    case 'Recyclable':
      return 0.2;
    case 'Hazardous':
      return 1.0;
    default:
      return 0.1;
  }
};
