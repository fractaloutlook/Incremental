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

  useEffect(() => {
    const now = Date.now();
    if (gameState.totalClicks > 0 && now - lastClickTime < COMBO_WINDOW) {
      const newCombo = Math.min(combo + 1, MAX_COMBO);
      setCombo(newCombo);
      comboRef.current = newCombo; // Update ref with the new combo value
      setMaxCombo(prev => Math.max(prev, newCombo));
      
      if (comboDecayTimer) clearTimeout(comboDecayTimer);
      
      const timer = setTimeout(() => {
        // Use comboRef.current for the message as 'combo' in closure might be stale
        if (comboRef.current >= 10 && onNotification) {
          onNotification({
            type: 'info',
            title: 'Combo Broken!',
            message: `Amazing ${comboRef.current}x combo streak ended!`, // Use comboRef
            autoClose: 3000
          });
        }
        setCombo(0);
        comboRef.current = 0; // Update ref when combo is reset by timer
        setLastNotificationCombo(0);
        onComboBonus(1); // Reset combo bonus when timer fires
      }, COMBO_WINDOW);
      
      setComboDecayTimer(timer);
      
      // This part correctly sets the multiplier when combo is active
      if (newCombo >= 5) {
        const multiplier = 1 + (newCombo * 0.1);
        onComboBonus(multiplier);
      }
      // Removed the else block that called onComboBonus(1)
      
      // Throttled milestone notifications (no changes here)
      if (onNotification) {
        if (newCombo === 10 && lastNotificationCombo < 10) {
          onNotification({
            type: 'success',
            title: '🔥 Hot Streak!',
            message: '10x combo achieved!',
            autoClose: 4000
          });
          setLastNotificationCombo(10);
        } else if (newCombo === 25 && lastNotificationCombo < 25) {
          onNotification({
            type: 'success',
            title: '⚡ Lightning Fast!',
            message: '25x combo! Incredible!',
            autoClose: 4000
          });
          setLastNotificationCombo(25);
        } else if (newCombo === 50 && lastNotificationCombo < 50) {
          onNotification({
            type: 'achievement',
            title: '🌟 LEGENDARY!',
            message: 'MAXIMUM COMBO REACHED!',
            autoClose: 6000
          });
          setLastNotificationCombo(50);
        }
      }
    } else {
      // This 'else' block executes if the click was too slow to continue an existing combo,
      // or if totalClicks was 0 (initial state), etc.
      if (combo > 0) { // Check current 'combo' state.
        setCombo(0);
        comboRef.current = 0; // Keep ref in sync
        onComboBonus(1);      // Ensure the game state multiplier is reset
        
        // If a decay timer was pending for the old combo, clear it.
        if (comboDecayTimer) {
          clearTimeout(comboDecayTimer);
          setComboDecayTimer(null); // Explicitly nullify the timer ID state
        }
      }
      // If combo was already 0, no action needed in this 'else' block regarding combo reset.
    }
    
    setLastClickTime(now);
    
    // Cleanup function
    return () => {
      if (comboDecayTimer) clearTimeout(comboDecayTimer);
      // On unmount or if dependencies change causing cleanup:
      // if a combo was active (multiplier was > 1), reset it.
      if (comboRef.current >= 5) {
        onComboBonus(1);
      }
    };
  }, [gameState.totalClicks, onComboBonus, onNotification, lastClickTime]); // Updated dependencies

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