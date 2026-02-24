import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model: mobilenet.MobileNet | null = null;

export async function loadModel() {
  if (!model) {
    await tf.ready();
    model = await mobilenet.load();
  }
  return model;
}

const ORGANIC_KEYWORDS = ['banana', 'apple', 'orange', 'food', 'fruit', 'vegetable', 'leaf', 'plant', 'flower', 'bread', 'meat', 'egg', 'salad', 'pizza', 'sandwich'];
const RECYCLABLE_KEYWORDS = ['bottle', 'can', 'paper', 'cardboard', 'plastic', 'glass', 'metal', 'container', 'box', 'newspaper', 'magazine', 'cup', 'jar', 'carton'];
const HAZARDOUS_KEYWORDS = ['battery', 'bulb', 'electronic', 'chemical', 'paint', 'oil', 'medicine', 'syringe', 'thermometer', 'aerosol'];

export async function classifyWaste(imageElement: HTMLImageElement) {
  const net = await loadModel();
  const predictions = await net.classify(imageElement);
  
  let organicScore = 0;
  let recyclableScore = 0;
  let hazardousScore = 0;

  predictions.forEach(pred => {
    const label = pred.className.toLowerCase();
    const prob = pred.probability;

    ORGANIC_KEYWORDS.forEach(keyword => {
      if (label.includes(keyword)) organicScore += prob;
    });
    RECYCLABLE_KEYWORDS.forEach(keyword => {
      if (label.includes(keyword)) recyclableScore += prob;
    });
    HAZARDOUS_KEYWORDS.forEach(keyword => {
      if (label.includes(keyword)) hazardousScore += prob;
    });
  });

  const scores = [
    { type: 'Organic', score: organicScore },
    { type: 'Recyclable', score: recyclableScore },
    { type: 'Hazardous', score: hazardousScore }
  ];

  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score === 0) {
    return { type: 'Recyclable', confidence: 0.65, rawPredictions: predictions };
  }

  const confidence = Math.min(0.95, Math.max(0.55, scores[0].score));
  
  return {
    type: scores[0].type as 'Organic' | 'Recyclable' | 'Hazardous',
    confidence,
    rawPredictions: predictions
  };
}
