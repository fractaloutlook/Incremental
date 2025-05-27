import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flame, Zap, Star } from 'lucide-react';

interface ComboSystemProps {
  gameState: any;
  onComboBonus: (multiplier: number) => void;
  onNotification?: (notification: any) => void;
}

export const ComboSystem = ({ gameState, onComboBonus, onNotification }: ComboSystemProps) => {
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [comboDecayTimer, setComboDecayTimer] = useState<NodeJS.Timeout | null>(null);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lastNotificationCombo, setLastNotificationCombo] = useState(0);
  const comboRef = useRef(0);

  const COMBO_WINDOW = 2000;
  const MAX_COMBO = 50;

  // Click Processing Effect
  useEffect(() => {
    const now = Date.now();

    if (gameState.totalClicks === 0) {
        setCombo(0);
        comboRef.current = 0;
        setLastClickTime(0);
        // Access comboDecayTimer state directly for clearing
        if (comboDecayTimer) { 
            clearTimeout(comboDecayTimer);
            setComboDecayTimer(null);
        }
        onComboBonus(1);
    } else if (lastClickTime !== 0 && (now - lastClickTime < COMBO_WINDOW)) {
        // Fast click
        const newCombo = Math.min(combo + 1, MAX_COMBO);
        setCombo(newCombo);
        comboRef.current = newCombo;
        setMaxCombo(prev => Math.max(prev, newCombo));

        if (newCombo >= 5) {
            const multiplier = 1 + (newCombo * 0.1);
            onComboBonus(multiplier);
        } else {
            onComboBonus(1);
        }

        if (onNotification) {
            if (newCombo === 10 && lastNotificationCombo < 10) {
                onNotification({ type: 'success', title: '🔥 Hot Streak!', message: '10x combo achieved!', autoClose: 4000 });
                setLastNotificationCombo(10);
            } else if (newCombo === 25 && lastNotificationCombo < 25) {
                onNotification({ type: 'success', title: '⚡ Lightning Fast!', message: '25x combo! Incredible!', autoClose: 4000 });
                setLastNotificationCombo(25);
            } else if (newCombo === 50 && lastNotificationCombo < 50) {
                onNotification({ type: 'achievement', title: '🌟 LEGENDARY!', message: 'MAXIMUM COMBO REACHED!', autoClose: 6000 });
                setLastNotificationCombo(50);
            }
        }
    } else {
        // Slow click or the very first click (lastClickTime === 0)
        if (combo > 0) { 
            setCombo(0); 
            comboRef.current = 0;
            onComboBonus(1); 
        }
        
        setCombo(1); // Start new combo at 1
        comboRef.current = 1;
        setMaxCombo(prev => Math.max(prev, 1));
        onComboBonus(1); 
        setLastNotificationCombo(0); 
    }
    setLastClickTime(now);

    // This effect should no longer manage the comboDecayTimer directly (setTimeout/clearTimeout for decay).
    // Its cleanup function should be empty or handle things not related to comboDecayTimer.
    return () => {}; 
  }, [gameState.totalClicks, onComboBonus, onNotification]);

  // Combo Decay Timer Effect
  useEffect(() => {
      // timerIdToClear captures the current timer ID from state for cleanup, if needed.
      // However, the primary clearing of old timers happens before setting a new one.
      // This effect structure ensures one timer per combo > 0 state.

      if (combo > 0) {
          // If a combo is active, set/reset its decay timer.
          // Any pre-existing timer for a *previous* combo value would have been
          // implicitly cleared by its own cleanup when 'combo' changed.
          // Or, if one was manually cleared, comboDecayTimer state would be null.

          const newTimer = setTimeout(() => {
              if (comboRef.current >= 10 && onNotification) {
                  onNotification({
                      type: 'info',
                      title: 'Combo Broken!',
                      message: `Amazing ${comboRef.current}x combo streak ended!`,
                      autoClose: 3000
                  });
              }
              setCombo(0); 
              comboRef.current = 0;
              setLastNotificationCombo(0);
              onComboBonus(1); 
          }, COMBO_WINDOW);
          setComboDecayTimer(newTimer);

          return () => { // Cleanup for this specific timer instance
              clearTimeout(newTimer);
          };
      } else {
          // Combo is 0. If a timer was active (e.g. from a previous combo value),
          // its cleanup (return () => { clearTimeout(newTimer); }) should have run.
          // Explicitly clear here if comboDecayTimer state might still hold an ID.
          if (comboDecayTimer) {
              clearTimeout(comboDecayTimer);
              setComboDecayTimer(null);
          }
      }
  }, [combo, onComboBonus, onNotification, COMBO_WINDOW]);

  const getComboColor = () => {
    if (combo >= 25) return 'text-yellow-400 border-yellow-500/50';
    if (combo >= 10) return 'text-purple-400 border-purple-500/50';
    if (combo >= 5) return 'text-blue-400 border-blue-500/50';
    return 'text-gray-400 border-gray-500/50';
  };

  const getComboIcon = () => {
    if (combo >= 25) return <Star className="w-5 h-5" />;
    if (combo >= 10) return <Zap className="w-5 h-5" />;
    if (combo >= 5) return <Flame className="w-5 h-5" />;
    return null;
  };

  if (combo === 0 && maxCombo === 0) return null;

  return (
    <Card className={`p-3 bg-gradient-to-r from-slate-800 to-slate-700 border ${getComboColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getComboIcon()}
          <span className={`font-bold text-lg ${getComboColor().split(' ')[0]}`}>
            {combo}x COMBO
          </span>
        </div>
        
        {combo >= 5 && (
          <Badge variant="secondary" className="bg-orange-900/50 text-orange-300">
            +{Math.floor(combo * 10)}% Bonus
          </Badge>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Combo Progress</span>
          <span>{combo}/{MAX_COMBO}</span>
        </div>
        <Progress value={(combo / MAX_COMBO) * 100} className="h-2" />
      </div>
      
      {maxCombo > 0 && (
        <div className="text-xs text-gray-500 mt-2">
          Best Streak: {maxCombo}x
        </div>
      )}
      
      {combo > 0 && (
        <div className="text-xs text-yellow-400 mt-1">
          Keep clicking to maintain combo!
        </div>
      )}
    </Card>
  );
};