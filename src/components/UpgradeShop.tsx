import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, TrendingUp, Zap, MousePointer } from 'lucide-react';
import PlaceholderArt from './PlaceholderArt';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  type: 'click' | 'auto' | 'multiplier';
  purchased: boolean;
  maxPurchases?: number;
  currentPurchases?: number;
}

interface UpgradeShopProps {
  incrementPoints: number;
  onPurchase: (upgradeId: string) => void;
  gameState: any;
}

const formatNumber = (num: number): string => {
  if (num < 1000) return Math.floor(num).toString();
  if (num < 1000000) return (Math.floor(num / 1000)).toString() + 'K';
  if (num < 1000000000) return (Math.floor(num / 1000000)).toString() + 'M';
  return (Math.floor(num / 1000000000)).toString() + 'B';
};

const UpgradeShop: React.FC<UpgradeShopProps> = ({ incrementPoints, onPurchase, gameState }) => {
  const getUpgrades = (): Upgrade[] => {
    const baseUpgrades: Upgrade[] = [
      {
        id: 'click_power_1',
        name: 'Sharper Focus',
        description: 'Increases click power by 1',
        cost: 10,
        effect: '+1 Click Power',
        type: 'click',
        purchased: gameState.upgrades?.click_power_1 || false
      },
      {
        id: 'click_power_2',
        name: 'Enhanced Precision',
        description: 'Increases click power by 5',
        cost: 100,
        effect: '+5 Click Power',
        type: 'click',
        purchased: gameState.upgrades?.click_power_2 || false
      },
      {
        id: 'click_power_3',
        name: 'Master Precision',
        description: 'Increases click power by 25',
        cost: 2500,
        effect: '+25 Click Power',
        type: 'click',
        purchased: gameState.upgrades?.click_power_3 || false
      },
      {
        id: 'auto_increment_1',
        name: 'Basic Automation',
        description: 'Generates 1 point per second',
        cost: 50,
        effect: '+1/sec Auto Rate',
        type: 'auto',
        purchased: gameState.upgrades?.auto_increment_1 || false
      },
      {
        id: 'auto_increment_2',
        name: 'Advanced Automation',
        description: 'Generates 5 points per second',
        cost: 500,
        effect: '+5/sec Auto Rate',
        type: 'auto',
        purchased: gameState.upgrades?.auto_increment_2 || false
      },
      {
        id: 'auto_increment_3',
        name: 'Elite Automation',
        description: 'Generates 25 points per second',
        cost: 10000,
        effect: '+25/sec Auto Rate',
        type: 'auto',
        purchased: gameState.upgrades?.auto_increment_3 || false
      },
      {
        id: 'multiplier_1',
        name: 'Efficiency Boost',
        description: 'Multiplies all gains by 1.5x',
        cost: 1000,
        effect: '1.5x All Gains',
        type: 'multiplier',
        purchased: gameState.upgrades?.multiplier_1 || false
      },
      {
        id: 'multiplier_2',
        name: 'Power Amplifier',
        description: 'Multiplies all gains by 2x',
        cost: 25000,
        effect: '2x All Gains',
        type: 'multiplier',
        purchased: gameState.upgrades?.multiplier_2 || false
      }
    ];

    // Add secret upgrades if unlocked
    if (gameState.secretUpgrades?.includes('hidden_power')) {
      baseUpgrades.push({
        id: 'hidden_power',
        name: 'Hidden Power',
        description: 'A mysterious upgrade from the Orb of Wisdom',
        cost: 2500,
        effect: '+10 Click Power',
        type: 'click',
        purchased: gameState.upgrades?.hidden_power || false
      });
    }

    if (gameState.secretUpgrades?.includes('mirror_numbers')) {
      baseUpgrades.push({
        id: 'mirror_numbers',
        name: 'Mirror Numbers',
        description: 'Palindromic power doubles auto increment',
        cost: 5000,
        effect: '2x Auto Rate',
        type: 'auto',
        purchased: gameState.upgrades?.mirror_numbers || false
      });
    }

    return baseUpgrades;
  };

  const getUpgradeIcon = (type: string) => {
    switch (type) {
      case 'click': return <MousePointer className="w-4 h-4" />;
      case 'auto': return <Zap className="w-4 h-4" />;
      case 'multiplier': return <TrendingUp className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'click': return 'text-blue-400 border-blue-500/50';
      case 'auto': return 'text-green-400 border-green-500/50';
      case 'multiplier': return 'text-purple-400 border-purple-500/50';
      default: return 'text-gray-400 border-gray-500/50';
    }
  };

  const upgrades = getUpgrades();
  // const availableUpgrades = upgrades.filter(u => !u.purchased); // Commented out

  return (
    <Card className="bg-slate-800 border-slate-700 relative overflow-hidden">
      {gameState.showPlaceholders && (
        <PlaceholderArt type="shop" />
      )}
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Upgrade Shop
        </CardTitle>
        <div className="text-sm text-slate-400">
          {upgrades.filter(u => !u.purchased).length} of {upgrades.length} upgrades remaining
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 relative z-10">
        {upgrades.filter(u => !u.purchased).length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>All currently available upgrades purchased!</p>
            <p className="text-xs mt-1">More may unlock as you progress.</p>
          </div>
        ) : (
          upgrades.map((upgrade) => (
            <Card key={upgrade.id} className={`border ${getTypeColor(upgrade.type)} ${upgrade.purchased ? 'bg-slate-600/30 opacity-70' : 'bg-slate-700/50'}`}>
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getUpgradeIcon(upgrade.type)}
                      <h4 className="font-medium text-slate-100 text-sm">{upgrade.name}</h4>
                      {upgrade.id.includes('hidden') && (
                        <Badge variant="outline" className="text-xs bg-purple-900/50 text-purple-300">
                          Secret
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-300 text-xs mb-2">{upgrade.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {upgrade.effect}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-yellow-400 mb-1">
                      {formatNumber(upgrade.cost)}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onPurchase(upgrade.id)}
                      disabled={upgrade.purchased || incrementPoints < upgrade.cost}
                      className={`text-xs h-7 w-20 ${upgrade.purchased ? 'bg-green-700 hover:bg-green-700 cursor-default' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {upgrade.purchased ? 'Purchased' : 'Buy'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default UpgradeShop;