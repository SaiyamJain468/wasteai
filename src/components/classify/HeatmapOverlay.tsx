import { useEffect, useState } from 'react';

interface HeatmapOverlayProps {
  type: 'Organic' | 'Recyclable' | 'Hazardous';
  imageUrl: string;
}

export default function HeatmapOverlay({ type, imageUrl }: HeatmapOverlayProps) {
  const [heatmapZones, setHeatmapZones] = useState<any[]>([]);

  useEffect(() => {
    // Simulate AI focus zones
    const zones = [
      { x: 30, y: 25, size: 40, intensity: 0.8 },
      { x: 60, y: 50, size: 30, intensity: 0.6 },
      { x: 45, y: 70, size: 25, intensity: 0.4 },
    ];
    setHeatmapZones(zones);
  }, [type]);

  const getColor = () => {
    switch (type) {
      case 'Organic':
        return 'rgba(31, 122, 61, 0.4)';
      case 'Recyclable':
        return 'rgba(46, 93, 160, 0.4)';
      case 'Hazardous':
        return 'rgba(192, 57, 43, 0.4)';
      default:
        return 'rgba(0, 0, 0, 0.2)';
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={imageUrl} alt="Waste" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
      
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          {heatmapZones.map((zone, i) => (
            <radialGradient key={i} id={`heatmap-${i}`}>
              <stop offset="0%" stopColor={getColor()} stopOpacity={zone.intensity} />
              <stop offset="100%" stopColor={getColor()} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>
        {heatmapZones.map((zone, i) => (
          <circle
            key={i}
            cx={`${zone.x}%`}
            cy={`${zone.y}%`}
            r={`${zone.size}%`}
            fill={`url(#heatmap-${i})`}
            className="animate-pulse"
          />
        ))}
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#FFFFFF',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: '700',
        }}
      >
        AI Focus Zones
      </div>
    </div>
  );
}
