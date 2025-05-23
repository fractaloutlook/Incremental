import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award } from 'lucide-react';

interface AchievementSystemProps {
  gameState: any;
  secrets: string[];
}

export const AchievementSystem = ({ gameState, secrets }: AchievementSystemProps) => {
  const achievements = [
    {
      id: 'first_click',
      name: 'First Click',
      description: 'Click for the first time',
      unlocked: gameState.totalClicks >= 1,
      rarity: 'common',
      icon: <Trophy className="w-4 h-4" />
    },
    {
      id: 'hundred_clicks',
      name: 'Centurion',
      description: 'Reach 100 total clicks',
      unlocked: gameState.totalClicks >= 100,
      rarity: 'rare',
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'first_prestige',
      name: 'Transcendent',
      description: 'Prestige for the first time',
      unlocked: gameState.prestigeLevel >= 1,
      rarity: 'epic',
      icon: <Award className="w-4 h-4" />
    },
    {
      id: 'secret_finder',
      name: 'Secret Keeper',
      description: 'Discover a hidden secret',
      unlocked: secrets.length > 0,
      rarity: 'legendary',
      icon: <Star className="w-4 h-4" />
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-300 bg-gray-900/50';
      case 'rare': return 'text-blue-300 bg-blue-900/50';
      case 'epic': return 'text-purple-300 bg-purple-900/50';
      case 'legendary': return 'text-yellow-300 bg-yellow-900/50';
      default: return 'text-gray-300 bg-gray-900/50';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5" />
          Achievements
        </CardTitle>
        <div className="text-sm text-slate-400">
          {unlockedAchievements.length}/{achievements.length} unlocked
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {unlockedAchievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded">
            <div className={getRarityColor(achievement.rarity)}>
              {achievement.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-100 text-sm">{achievement.name}</h4>
              <p className="text-slate-300 text-xs">{achievement.description}</p>
            </div>
            <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
              {achievement.rarity}
            </Badge>
          </div>
        ))}
        
        {unlockedAchievements.length === 0 && (
          <div className="text-center py-4 text-slate-400">
            <Trophy className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No achievements unlocked yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};