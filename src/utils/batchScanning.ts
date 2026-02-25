import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { classifyWaste } from './wasteClassifier';

let objectDetectionModel: cocoSsd.ObjectDetection | null = null;

export const loadObjectDetectionModel = async () => {
  if (!objectDetectionModel) {
    objectDetectionModel = await cocoSsd.load();
  }
  return objectDetectionModel;
};

export interface DetectedObject {
  bbox: [number, number, number, number];
  class: string;
  score: number;
  wasteType?: 'Organic' | 'Recyclable' | 'Hazardous';
  confidence?: number;
}

export const detectObjects = async (imageElement: HTMLImageElement): Promise<DetectedObject[]> => {
  const model = await loadObjectDetectionModel();
  const predictions = await model.detect(imageElement);
  
  return predictions.map(pred => ({
    bbox: pred.bbox,
    class: pred.class,
    score: pred.score,
  }));
};

export const batchClassifyWaste = async (
  imageElement: HTMLImageElement,
  objects: DetectedObject[]
): Promise<DetectedObject[]> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return objects;

  const results: DetectedObject[] = [];

  for (const obj of objects) {
    const [x, y, width, height] = obj.bbox;
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, x, y, width, height, 0, 0, width, height);
    
    const croppedImage = new Image();
    croppedImage.src = canvas.toDataURL();
    
    await new Promise(resolve => {
      croppedImage.onload = resolve;
    });
    
    try {
      const classification = await classifyWaste(croppedImage);
      results.push({
        ...obj,
        wasteType: classification.type,
        confidence: classification.confidence,
      });
    } catch (error) {
      results.push(obj);
    }
  }

  return results;
};

export const calculateBatchPoints = (objects: DetectedObject[]): number => {
  return objects.reduce((total, obj) => {
    if (!obj.wasteType) return total;
    
    switch (obj.wasteType) {
      case 'Organic':
      case 'Recyclable':
        return total + 10;
      case 'Hazardous':
        return total + 25;
      default:
        return total;
    }
  }, 0);
};

export const drawBoundingBoxes = (
  canvas: HTMLCanvasElement,
  objects: DetectedObject[]
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  objects.forEach(obj => {
    const [x, y, width, height] = obj.bbox;
    
    ctx.strokeStyle = obj.wasteType === 'Organic' ? '#4ade80' :
                      obj.wasteType === 'Recyclable' ? '#3b82f6' :
                      obj.wasteType === 'Hazardous' ? '#ef4444' : '#B4F000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    ctx.fillStyle = ctx.strokeStyle;
    ctx.font = 'bold 16px Inter';
    ctx.fillText(`${obj.class} (${Math.round(obj.score * 100)}%)`, x, y - 5);
  });
};
