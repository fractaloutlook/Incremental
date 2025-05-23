import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle } from 'lucide-react';
import { PlaceholderArt } from './PlaceholderArt';

interface QuestSystemProps {
  gameState: any;
  onRewardClaim: (points: number) => void;
  showPlaceholders?: boolean;
}

export const QuestSystem = ({ gameState, onRewardClaim, showPlaceholders }: QuestSystemProps) => {
  const [claimedQuests, setClaimedQuests] = useState<Set<string>>(new Set());

  const quests = [
    {
      id: 'first_clicks',
      name: 'First Steps',
      description: 'Click 10 times',
      target: 10,
      current: gameState.totalClicks,
      reward: 50,
      completed: gameState.totalClicks >= 10
    },
    {
      id: 'hundred_clicks',
      name: 'Clicking Master',
      description: 'Click 100 times',
      target: 100,
      current: gameState.totalClicks,
      reward: 200,
      completed: gameState.totalClicks >= 100
    },
    {
      id: 'thousand_clicks',
      name: 'Click Champion',
      description: 'Click 1000 times',
      target: 1000,
      current: gameState.totalClicks,
      reward: 500,
      completed: gameState.totalClicks >= 1000
    },
    {
      id: 'first_upgrade',
      name: 'Upgrader',
      description: 'Purchase your first upgrade',
      target: 1,
      current: Object.keys(gameState.upgrades || {}).length,
      reward: 100,
      completed: Object.keys(gameState.upgrades || {}).length >= 1
    },
    {
      id: 'big_spender',
      name: 'Big Spender',
      description: 'Spend 1000 points on upgrades',
      target: 1000,
      current: gameState.totalSpent || 0,
      reward: 300,
      completed: (gameState.totalSpent || 0) >= 1000
    }
  ];

  const activeQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed && !claimedQuests.has(q.id));

  const handleClaimReward = (quest: any) => {
    onRewardClaim(quest.reward);
    setClaimedQuests(prev => new Set([...prev, quest.id]));
  };

  return (
    <Card className="bg-slate-800 border-slate-700 relative">
      {showPlaceholders && <PlaceholderArt type="quest" />}
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2 text-lg">
          <Target className="w-5 h-5" />
          Quests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeQuests.map(quest => (
          <div key={quest.id} className="p-3 bg-slate-700/50 rounded border border-slate-600">
            <h4 className="font-medium text-slate-100 text-sm mb-1">{quest.name}</h4>
            <p className="text-slate-300 text-xs mb-2">{quest.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">
                {Math.min(quest.current, quest.target)}/{quest.target}
              </span>
              <Badge variant="secondary" className="text-xs">
                +{quest.reward} points
              </Badge>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (quest.current / quest.target) * 100)}%` }}
              />
            </div>
          </div>
        ))}
        
        {completedQuests.map(quest => (
          <div key={quest.id} className="p-3 bg-green-900/20 rounded border border-green-500/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-300 text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {quest.name}
                </h4>
                <p className="text-green-200 text-xs">{quest.description}</p>
              </div>
              <Button
                size="sm"
                onClick={() => handleClaimReward(quest)}
                className="text-xs h-7 bg-green-600 hover:bg-green-700"
              >
                Claim +{quest.reward}
              </Button>
            </div>
          </div>
        ))}
        
        {activeQuests.length === 0 && completedQuests.length === 0 && (
          <div className="text-center py-4 text-slate-400">
            <Target className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">All quests completed!</p>
            <p className="text-xs">More quests coming soon...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};