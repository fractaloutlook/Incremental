import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Gift, Zap, Star } from 'lucide-react';
import { PlaceholderArt } from './PlaceholderArt';

interface EventSystemProps {
  gameState: any;
  onEventEffect: (effect: any) => void;
  showPlaceholders?: boolean;
}

export const EventSystem = ({ gameState, onEventEffect, showPlaceholders }: EventSystemProps) => {
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const events = [
    {
      id: 'double_points',
      name: 'Double Points',
      description: 'All gains doubled for 30 seconds',
      duration: 30,
      effect: { multiplier: 2 },
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'bonus_drop',
      name: 'Bonus Drop',
      description: 'Instant 500 points',
      duration: 0,
      effect: { pointsBonus: 500 },
      icon: <Gift className="w-4 h-4" />
    },
    {
      id: 'speed_boost',
      name: 'Speed Boost',
      description: 'Auto increment +50% for 60 seconds',
      duration: 60,
      effect: { autoBonus: 1.5 },
      icon: <Zap className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    if (gameState.totalClicks > 100) {
      const eventTimer = setInterval(() => {
        if (!currentEvent && Math.random() < 0.1) {
          const randomEvent = events[Math.floor(Math.random() * events.length)];
          setCurrentEvent(randomEvent);
          setTimeLeft(randomEvent.duration);
          setIsActivated(false);
        }
      }, 10000);
      return () => clearInterval(eventTimer);
    }
  }, [gameState.totalClicks, currentEvent]);

  useEffect(() => {
    if (timeLeft > 0 && isActivated) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentEvent && timeLeft === 0 && isActivated) {
      setCurrentEvent(null);
      setIsActivated(false);
    }
  }, [timeLeft, currentEvent, isActivated]);

  const handleActivateEvent = () => {
    if (currentEvent && !isActivated) {
      onEventEffect(currentEvent.effect);
      setIsActivated(true);
      if (currentEvent.duration === 0) {
        setCurrentEvent(null);
        setIsActivated(false);
      }
    }
  };

  if (!currentEvent) {
    return (
      <Card className="bg-slate-800 border-slate-700 relative">
        {showPlaceholders && <PlaceholderArt type="event" />}
        <CardContent className="p-4 text-center">
          <Clock className="w-6 h-6 mx-auto mb-2 text-slate-500" />
          <p className="text-slate-400 text-sm">No active events</p>
          <p className="text-slate-500 text-xs">Events appear randomly as you play</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50 relative">
      {showPlaceholders && <PlaceholderArt type="event" />}
      <CardHeader className="pb-2">
        <CardTitle className="text-purple-200 flex items-center gap-2 text-sm">
          {currentEvent.icon}
          Special Event
          {isActivated && <Badge className="bg-green-600 text-white">Active</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-medium text-white">{currentEvent.name}</h4>
          <p className="text-slate-200 text-xs">{currentEvent.description}</p>
          
          {timeLeft > 0 && isActivated && (
            <Badge variant="outline" className="bg-purple-900/50 text-purple-300">
              {timeLeft}s remaining
            </Badge>
          )}
          
          <Button
            size="sm"
            onClick={handleActivateEvent}
            disabled={isActivated}
            className={`w-full ${isActivated ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {isActivated ? 'Event Active!' : 'Activate Event'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};