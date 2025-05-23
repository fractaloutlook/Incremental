import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Coins } from 'lucide-react';

interface TopBarProps {
  incrementPoints: number;
  showPlaceholders: boolean;
  onTogglePlaceholders: (checked: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ 
  incrementPoints, 
  showPlaceholders, 
  onTogglePlaceholders 
}) => {
  return (
    <Card className="bg-slate-800 border-slate-700 p-3 mb-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-bold text-slate-100">
            {incrementPoints.toLocaleString()}
          </span>
          <span className="text-sm text-slate-400">points</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Checkbox 
            id="placeholders"
            checked={showPlaceholders}
            onCheckedChange={onTogglePlaceholders}
            className="border-slate-600"
          />
          <label 
            htmlFor="placeholders" 
            className="text-sm text-slate-300 cursor-pointer"
          >
            Show Placeholders
          </label>
        </div>
      </div>
    </Card>
  );
};

export default TopBar;