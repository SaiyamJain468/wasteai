import { Request, Response } from 'express';

const classifyWaste = (filename: string) => {
  const name = filename.toLowerCase();
  let type = 'Recyclable';
  let confidence = Math.random() * (99 - 75) + 75;

  if (name.includes('food') || name.includes('fruit') || name.includes('leaf')) {
    type = 'Organic';
  } else if (name.includes('battery') || name.includes('chemical')) {
    type = 'Hazardous';
  } else if (name.includes('bottle') || name.includes('plastic')) {
    type = 'Recyclable';
  } else {
    const r = Math.random();
    if (r < 0.33) type = 'Organic';
    else if (r < 0.66) type = 'Hazardous';
  }

  return {
    wasteType: type,
    confidence,
    binLabel: type === 'Organic' ? 'GREEN BIN' : type === 'Recyclable' ? 'BLUE BIN' : 'RED BIN',
    pointsEarned: type === 'Hazardous' ? 25 : 10,
  };
};

export const classifyImage = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No image uploaded' });
      return;
    }

    const result = classifyWaste(req.file.originalname);

    res.json({
      ...result,
      imageUrl: 'https://picsum.photos/200',
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
