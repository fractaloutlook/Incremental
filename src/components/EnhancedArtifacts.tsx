import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Eye, Gem, Star, Shield, Zap, CheckCircle } from 'lucide-react';
import PlaceholderArt from './PlaceholderArt';

interface Artifact {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockCondition: string;
  icon: React.ReactNode;
}

interface EnhancedArtifactsProps {
  artifacts: Artifact[];
  activatedArtifacts: string[];
  incrementPoints: number;
  onActivateArtifact: (artifactId: string) => void;
  showPlaceholders?: boolean;
}

const formatNumber = (num: number): string => {
  if (num < 1000) return Math.floor(num).toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
};

const EnhancedArtifacts: React.FC<EnhancedArtifactsProps> = ({
  artifacts,
  activatedArtifacts,
  incrementPoints,
  onActivateArtifact,
  showPlaceholders = false
}) => {
  const defaultArtifacts: Artifact[] = [
    {
      id: 'crown_of_progress',
      name: 'Crown of Progress',
      description: 'Increases auto-increment rate by 10/sec',
      cost: 2000,
      effect: '+10/sec Auto Rate',
      rarity: 'epic',
      unlockCondition: 'Reach 1000 total clicks',
      icon: <Crown className="w-5 h-5" />
    },
    {
      id: 'orb_of_wisdom',
      name: 'Orb of Wisdom',
      description: 'Unlocks hidden upgrades in the shop',
      cost: 5000,
      effect: 'Reveals Secret Upgrades',
      rarity: 'legendary',
      unlockCondition: 'Reach 2000 increment points',
      icon: <Eye className="w-5 h-5" />
    },
    {
      id: 'gem_of_amplification',
      name: 'Gem of Amplification',
      description: 'Multiplies click power by 2x',
      cost: 1500,
      effect: '2x Click Power',
      rarity: 'rare',
      unlockCondition: 'Purchase 3 upgrades',
      icon: <Gem className="w-5 h-5" />
    },
    {
      id: 'star_of_fortune',
      name: 'Star of Fortune',
      description: 'Increases all gains by 25%',
      cost: 7500,
      effect: '+25% All Gains',
      rarity: 'legendary',
      unlockCondition: 'Reach prestige level 1',
      icon: <Star className="w-5 h-5" />
    },
    {
      id: 'shield_of_persistence',
      name: 'Shield of Persistence',
      description: 'Retains 50% of upgrades after prestige',
      cost: 10000,
      effect: 'Prestige Protection',
      rarity: 'legendary',
      unlockCondition: 'Prestige 2 times',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const artifactList = artifacts.length > 0 ? artifacts : defaultArtifacts;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/50 text-gray-300';
      case 'rare': return 'border-blue-500/50 text-blue-300';
      case 'epic': return 'border-purple-500/50 text-purple-300';
      case 'legendary': return 'border-yellow-500/50 text-yellow-300';
      default: return 'border-gray-500/50 text-gray-300';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-900/50 text-gray-300';
      case 'rare': return 'bg-blue-900/50 text-blue-300';
      case 'epic': return 'bg-purple-900/50 text-purple-300';
      case 'legendary': return 'bg-yellow-900/50 text-yellow-300';
      default: return 'bg-gray-900/50 text-gray-300';
    }
  };

  const isActivated = (artifactId: string) => activatedArtifacts.includes(artifactId);

  return (
    <Card className="bg-slate-800 border-slate-700 relative overflow-hidden">
      {showPlaceholders && (
        <div className="absolute inset-0 opacity-10">
          <PlaceholderArt type="artifacts" width="100%" height="100%" />
        </div>
      )}
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Ancient Artifacts
        </CardTitle>
        <div className="text-sm text-slate-400">
          {activatedArtifacts.length}/{artifactList.length} artifacts activated
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 relative z-10">
        {artifactList.map((artifact) => {
          const activated = isActivated(artifact.id);
          const canAfford = incrementPoints >= artifact.cost;
          
          return (
            <Card key={artifact.id} className={`border ${getRarityColor(artifact.rarity)} bg-slate-700/50 ${activated ? 'ring-2 ring-green-500/50' : ''}`}>
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={getRarityColor(artifact.rarity)}>
                        {artifact.icon}
                      </div>
                      <h4 className="font-medium text-slate-100 text-sm">{artifact.name}</h4>
                      {activated && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`text-xs ${getRarityBadgeColor(artifact.rarity)}`}>
                        {artifact.rarity.toUpperCase()}
                      </Badge>
                      {activated && (
                        <Badge variant="outline" className="text-xs bg-green-900/50 text-green-300">
                          Active
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-slate-300 text-xs mb-2">{artifact.description}</p>
                    <div className="text-xs text-slate-400 mb-1">
                      Effect: <span className="text-green-400">{artifact.effect}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Unlock: {artifact.unlockCondition}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-yellow-400 mb-1">
                      {formatNumber(artifact.cost)}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onActivateArtifact(artifact.id)}
                      disabled={!canAfford || activated}
                      className="text-xs h-7"
                      variant={activated ? "secondary" : "default"}
                    >
                      {activated ? 'Active' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default EnhancedArtifacts;