import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Zap } from 'lucide-react';
import { PlaceholderArt } from './PlaceholderArt';

interface ClickButtonProps {
  onClick: () => void;
  clickPower: number;
  showPlaceholders?: boolean;
}

const ClickButton: React.FC<ClickButtonProps> = ({ onClick, clickPower, showPlaceholders }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return Math.floor(num / 1000000) + 'M';
    } else if (num >= 1000) {
      return Math.floor(num / 1000) + 'K';
    }
    return Math.floor(num).toString();
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 shadow-2xl relative overflow-hidden">
      {showPlaceholders && <PlaceholderArt type="button" />}
      
      <CardContent className="p-8 text-center relative z-10">
        <div className="mb-6">
          <h3 className="text-slate-100 text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cosmic Nexus
          </h3>
          <p className="text-slate-300 text-sm">
            Channel the universe's energy
          </p>
        </div>
        
        <div className="relative">
          {/* Pulsing background effect that extends to container edges */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse" style={{ animationDuration: '2s' }} />
          
          <Button
            onClick={onClick}
            className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-600 border-4 border-blue-400/50 hover:border-blue-300/70 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-blue-500/25 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="flex flex-col items-center relative z-10">
              <div className="relative mb-3">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
                <Zap className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <span className="text-white font-bold text-lg drop-shadow-lg">
                +{formatNumber(clickPower)}
              </span>
              <span className="text-blue-200 text-xs font-medium">
                POWER
              </span>
            </div>
          </Button>
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="text-sm text-slate-300 font-medium">
            Reality bends to your will
          </div>
          <div className="text-xs text-slate-400">
            Each click unlocks cosmic mysteries
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClickButton;