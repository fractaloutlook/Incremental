import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap } from 'lucide-react';

interface PrestigeSystemProps {
  totalClicks: number;
  incrementPoints: number;
  prestigeLevel: number;
  onPrestige: () => void;
}

const PrestigeSystem: React.FC<PrestigeSystemProps> = ({
  totalClicks,
  incrementPoints,
  prestigeLevel,
  onPrestige
}) => {
  const canPrestige = totalClicks >= 1000 && incrementPoints >= 10000;
  const prestigeReward = Math.floor(totalClicks / 1000);
  const prestigeMultiplier = 1 + (prestigeLevel * 0.1);

  return (
    <Card className="bg-gradient-to-br from-purple-900 to-slate-800 border-purple-700">
      <CardHeader>
        <CardTitle className="text-purple-100 flex items-center gap-2">
          <Crown className="w-5 h-5 text-purple-400" />
          Prestige System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-purple-100 text-sm">Level {prestigeLevel}</span>
          <Badge className="bg-purple-500/20 text-purple-300">
            +{Math.round((prestigeMultiplier - 1) * 100)}% bonus
          </Badge>
        </div>
        
        {canPrestige ? (
          <div className="space-y-2">
            <p className="text-purple-200 text-sm">
              Gain {prestigeReward} Prestige Stars
            </p>
            <Button 
              onClick={onPrestige}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Prestige Reset
            </Button>
          </div>
        ) : (
          <p className="text-purple-300 text-xs">
            Requires 1000 clicks & 10K points
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PrestigeSystem;