export const classifyWaste = (filename: string) => {
  const name = filename.toLowerCase();
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  if (name.match(/bottle|plastic|paper|card|glass|metal|can|tin/)) 
    return { type: 'Recyclable' as const, confidence: rand(82, 98) };
  if (name.match(/food|fruit|veg|leaf|peel|organic|banana|apple/)) 
    return { type: 'Organic' as const, confidence: rand(79, 97) };
  if (name.match(/battery|medicine|chemical|paint|pill/)) 
    return { type: 'Hazardous' as const, confidence: rand(85, 99) };
  
  const roll = Math.random();
  if (roll < 0.50) 
    return { type: 'Recyclable' as const, confidence: rand(75, 95) };
  if (roll < 0.85) 
    return { type: 'Organic' as const, confidence: rand(75, 92) };
  return { type: 'Hazardous' as const, confidence: rand(80, 99) };
};
