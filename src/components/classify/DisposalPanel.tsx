import { Leaf } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Card from '../shared/Card';

interface DisposalPanelProps {
  type: 'Organic' | 'Recyclable' | 'Hazardous';
}

export default function DisposalPanel({ type }: DisposalPanelProps) {
  const { colors } = useTheme();

  const getInstructions = (type: string) => {
    switch (type) {
      case 'Organic':
        return [
          'Remove any non-organic materials like rubber bands or stickers',
          'Place in the GREEN bin lined with a compostable bag',
          'Do not mix with plastic or metal waste',
          'Ideal for home composting — creates natural fertilizer',
        ];
      case 'Recyclable':
        return [
          'Rinse the item to remove food residue',
          'Remove caps, lids, or non-recyclable parts',
          'Flatten cardboard boxes before placing in BLUE bin',
          'Check for recycling symbol ♻ to confirm recyclability',
        ];
      case 'Hazardous':
        return [
          'Never pour chemicals down the drain or throw in regular bins',
          'Keep in original container if possible — seal tightly',
          'Locate nearest hazardous waste collection center',
          'Call your municipal helpline: 1800-XXX-XXXX for pickup',
        ];
      default:
        return [];
    }
  };

  const getEcoTip = (type: string) => {
    switch (type) {
      case 'Organic':
        return 'Composting organic waste reduces methane emissions and creates natural fertilizer — helping forests regenerate 3x faster.';
      case 'Recyclable':
        return 'Recycling one plastic bottle saves enough water to sustain a plant for 3 days. Plastic in water bodies is the #1 cause of river contamination.';
      case 'Hazardous':
        return 'One battery improperly dumped can contaminate 600 liters of groundwater. Proper disposal directly protects your local water supply.';
      default:
        return '';
    }
  };

  return (
    <>
      <Card>
        <h3 className="text-base font-bold mb-4" style={{ color: colors.textPrimary }}>
          Disposal Instructions
        </h3>
        <ul className="pl-5 m-0">
          {getInstructions(type).map((inst, i) => (
            <li key={i} className="text-sm mb-2" style={{ color: colors.textSecondary }}>
              {inst}
            </li>
          ))}
        </ul>
      </Card>

      <div
        style={{
          borderLeft: '4px solid #F5A623',
          padding: '16px',
          marginTop: '20px',
        }}
        className="flex gap-3"
      >
        <Leaf size={20} color="#F5A623" className="flex-shrink-0 mt-0.5" />
        <p className="text-sm m-0" style={{ color: colors.textSecondary }}>
          {getEcoTip(type)}
        </p>
      </div>
    </>
  );
}
