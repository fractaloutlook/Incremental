import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gem, Crown, Shield, Sword } from 'lucide-react';

interface ArtifactGalleryProps {
  incrementPoints: number;
}

const ArtifactGallery: React.FC<ArtifactGalleryProps> = ({ incrementPoints }) => {
  const artifacts = [
    {
      id: 'crystal',
      name: 'Increment Crystal',
      icon: <Gem className="w-6 h-6" />,
      threshold: 0,
      description: 'A mysterious crystal that glows with each touch.'
    },
    {
      id: 'crown',
      name: 'Crown of Progress',
      icon: <Crown className="w-6 h-6" />,
      threshold: 100,
      description: 'Worn by ancient rulers who mastered incremental arts.'
    },
    {
      id: 'shield',
      name: 'Shield of Persistence',
      icon: <Shield className="w-6 h-6" />,
      threshold: 500,
      description: 'Protects against the despair of slow progress.'
    },
    {
      id: 'sword',
      name: 'Blade of Exponentials',
      icon: <Sword className="w-6 h-6" />,
      threshold: 2000,
      description: 'Cuts through the barriers of linear growth.'
    }
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 text-lg">
          Artifact Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {artifacts.map((artifact) => {
          const isUnlocked = incrementPoints >= artifact.threshold;
          return (
            <div
              key={artifact.id}
              className={`p-3 rounded-lg border ${
                isUnlocked 
                  ? 'bg-slate-700 border-slate-600' 
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={isUnlocked ? 'text-amber-400' : 'text-slate-600'}>
                  {artifact.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${
                      isUnlocked ? 'text-slate-100' : 'text-slate-500'
                    }`}>
                      {artifact.name}
                    </span>
                    {isUnlocked && (
                      <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">
                        Discovered
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <p className={`text-xs ${
                isUnlocked ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {isUnlocked ? artifact.description : '???'}
              </p>
              {!isUnlocked && (
                <div className="text-xs text-slate-500 mt-1">
                  Requires {artifact.threshold} points
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ArtifactGallery;