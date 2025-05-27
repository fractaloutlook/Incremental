import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, MousePointer, Zap, BarChart3 } from 'lucide-react';

interface GameStatsProps {
  incrementPoints: number;
  clickPower: number;
  autoIncrementRate: number;
  totalClicks: number;
  multiplier: number;
  activeComboMultiplier: number;
}

const formatNumber = (num: number): string => {
  if (num < 1000) return Math.floor(num).toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
};

const formatPrecise = (num: number): string => {
  return Math.floor(num).toLocaleString();
};

const GameStats: React.FC<GameStatsProps> = ({
  incrementPoints,
  clickPower,
  autoIncrementRate,
  totalClicks,
  multiplier,
  activeComboMultiplier
}) => {
  const totalMultiplier = multiplier * activeComboMultiplier;
  const effectiveClickPower = clickPower * totalMultiplier;

  return (
    <div className="space-y-3">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center gap-2 text-lg">
            <Coins className="w-5 h-5 text-yellow-400" />
            Increment Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {formatPrecise(incrementPoints)}
          </div>
          <div className="text-sm text-slate-400">
            {formatNumber(incrementPoints)} points
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">Click Power</span>
              </div>
              <div className="text-right">
                <span className="text-blue-300 font-semibold">
                  {formatPrecise(clickPower)}
                </span>
                {totalMultiplier > 1 && (
                  <span className="text-xs text-purple-400 ml-1 mr-1">
                    (x{totalMultiplier.toFixed(1)})
                  </span>
                )}
                <span className="text-blue-300 font-semibold">
                  {' → '} 
                  {formatPrecise(effectiveClickPower)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-slate-300 text-sm">Auto Rate</span>
              </div>
              <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                {formatPrecise(autoIncrementRate)}/s
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300 text-sm">Total Clicks</span>
              </div>
              <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                {formatNumber(totalClicks)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameStats;