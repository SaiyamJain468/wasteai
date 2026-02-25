import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model: mobilenet.MobileNet | null = null;
let modelPromise: Promise<mobilenet.MobileNet> | null = null;

export async function loadModel() {
  if (model) return model;
  if (modelPromise) return modelPromise;
  
  modelPromise = (async () => {
    await tf.ready();
    model = await mobilenet.load({ version: 2, alpha: 0.5 });
    return model;
  })();
  
  return modelPromise;
}

const WASTE_KEYWORDS = {
  organic: ['banana', 'apple', 'orange', 'food', 'fruit', 'vegetable', 'leaf', 'plant', 'flower', 'bread', 'meat', 'egg', 'salad', 'pizza', 'sandwich'],
  recyclable: ['bottle', 'can', 'paper', 'cardboard', 'plastic', 'glass', 'metal', 'container', 'box', 'newspaper', 'magazine', 'cup', 'jar', 'carton'],
  hazardous: ['battery', 'bulb', 'electronic', 'chemical', 'paint', 'oil', 'medicine', 'syringe', 'thermometer', 'aerosol']
} as const;

type WasteType = 'Organic' | 'Recyclable' | 'Hazardous';

export async function classifyWaste(imageElement: HTMLImageElement) {
  const net = await loadModel();
  const predictions = await net.classify(imageElement, 3);
  
  const scores = { organic: 0, recyclable: 0, hazardous: 0 };

  for (const { className, probability } of predictions) {
    const label = className.toLowerCase();
    
    for (const [type, keywords] of Object.entries(WASTE_KEYWORDS)) {
      if (keywords.some(kw => label.includes(kw))) {
        scores[type as keyof typeof scores] += probability;
      }
    }
  }

  const result = Object.entries(scores)
    .map(([type, score]) => ({ type: type.charAt(0).toUpperCase() + type.slice(1) as WasteType, score }))
    .sort((a, b) => b.score - a.score)[0];

  if (result.score === 0) {
    return { type: 'Recyclable' as WasteType, confidence: 0.65, rawPredictions: predictions };
  }

  const confidence = Math.min(0.95, Math.max(0.55, result.score));
  
  return {
    type: result.type,
    confidence,
    rawPredictions: predictions
  };
}
