import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Eye, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { PlaceholderArt } from './PlaceholderArt';

interface SecretDiscoveryProps {
  gameState: any;
  onSecretFound: (secret: string) => void;
  showPlaceholders?: boolean;
}

const SECRETS = [
  { id: 'konami', name: 'The Ancient Code', description: 'Enter the legendary sequence...', unlocked: false },
  { id: 'fibonacci', name: 'Golden Ratio', description: 'Click in the sacred pattern...', unlocked: false },
  { id: 'midnight', name: 'Midnight Mystery', description: 'Play when the world sleeps...', unlocked: false },
  { id: 'palindrome', name: 'Mirror Numbers', description: 'Achieve perfect symmetry...', unlocked: false }
];

export const SecretDiscovery = ({ gameState, onSecretFound, showPlaceholders }: SecretDiscoveryProps) => {
  const [secrets, setSecrets] = useState(SECRETS);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [fibonacciClicks, setFibonacciClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  const FIBONACCI = [1, 1, 2, 3, 5, 8, 13];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiSequence(prev => {
        const newSeq = [...prev, e.code].slice(-10);
        if (JSON.stringify(newSeq) === JSON.stringify(KONAMI_CODE)) {
          unlockSecret('konami');
          return [];
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 0 && !secrets.find(s => s.id === 'midnight')?.unlocked) {
      unlockSecret('midnight');
    }
  }, [gameState.totalClicks]);

  useEffect(() => {
    const pointsStr = Math.floor(gameState.incrementPoints).toString();
    if (pointsStr === pointsStr.split('').reverse().join('') && pointsStr.length > 3) {
      unlockSecret('palindrome');
    }
  }, [gameState.incrementPoints]);

  const unlockSecret = (secretId: string) => {
    setSecrets(prev => prev.map(s => 
      s.id === secretId ? { ...s, unlocked: true } : s
    ));
    onSecretFound(secretId);
    toast({ 
      title: "🎉 SECRET DISCOVERED!", 
      description: `You've unlocked: ${SECRETS.find(s => s.id === secretId)?.name}!` 
    });
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 relative">
      {showPlaceholders && <PlaceholderArt type="secret" />}
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-5 h-5 text-slate-300" />
        <h3 className="text-lg font-bold text-slate-200">Hidden Mysteries</h3>
        <Sparkles className="w-4 h-4 text-yellow-400" />
      </div>
      
      <div className="space-y-2">
        {secrets.map(secret => (
          <div key={secret.id} className="flex items-center justify-between p-2 bg-slate-700/50 rounded border border-slate-500/30">
            <div>
              <span className={`font-medium ${secret.unlocked ? 'text-green-400' : 'text-slate-300'}`}>
                {secret.unlocked ? secret.name : '???'}
              </span>
              <p className="text-xs text-slate-400">
                {secret.unlocked ? 'Discovered!' : secret.description}
              </p>
            </div>
            {secret.unlocked && (
              <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-500/50">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-slate-400">
        Secrets found: {secrets.filter(s => s.unlocked).length}/{secrets.length}
      </div>
    </Card>
  );
};