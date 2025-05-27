import React, { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import TopBar from './TopBar';
import GameStats from './GameStats';
import ClickButton from './ClickButton';
import UpgradeShop from './UpgradeShop';
import PrestigeSystem from './PrestigeSystem';
import EnhancedArtifacts from './EnhancedArtifacts';
import SaveSystem from './SaveSystem';
import { PlaceholderArt } from './PlaceholderArt';
import { SecretDiscovery } from './SecretDiscovery';
import { ParticleSystem } from './ParticleSystem';
import { QuestSystem } from './QuestSystem';
import { AchievementSystem } from './AchievementSystem';
import { ComboSystem } from './ComboSystem';
import { EventSystem } from './EventSystem';
import { NotificationSystem, useNotifications } from './NotificationSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

const IncrementalGame: React.FC = () => {
  const { 
    gameState, 
    handleClick, 
    purchaseUpgrade, 
    handlePrestige, 
    activateArtifact, 
    loadGameState,
    handleEventEffect,
    handleComboBonus
  } = useGameState();
  
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [secrets, setSecrets] = useState<string[]>([]);
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | undefined>();
  const { notifications, addNotification, dismissNotification, clearAllNotifications } = useNotifications();

  const handleClickWithParticles = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setClickPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    handleClick();
  };

  const handleSecretFound = (secret: string) => {
    setSecrets(prev => [...prev, secret]);
    addNotification({
      type: 'achievement',
      title: 'Secret Discovered!',
      message: `You found: ${secret}`,
      autoClose: 5000
    });
  };

  const handleQuestReward = (points: number) => {
    loadGameState({ ...gameState, incrementPoints: gameState.incrementPoints + points });
    addNotification({
      type: 'success',
      title: 'Quest Completed!',
      message: `Earned ${points} increment points`,
      autoClose: 4000
    });
  };

  const getLoreEntry = () => {
    if (gameState.totalClicks < 10) return { title: "The Beginning", text: "You discover an ancient artifact that responds to touch..." };
    if (gameState.totalClicks < 50) return { title: "First Awakening", text: "The artifact pulses with energy..." };
    if (gameState.totalClicks < 200) return { title: "The Scholars", text: "Ancient texts speak of the Incrementalists..." };
    if (gameState.prestigeLevel > 0) return { title: "Prestige Master", text: "You have transcended the basic realm of incrementality..." };
    return { title: "Archive Keeper", text: "You have proven worthy of the deepest secrets..." };
  };

  const lore = getLoreEntry();

  return (
    <div className="min-h-screen bg-slate-900 p-4 relative">
      <ParticleSystem 
        isActive={gameState.autoIncrementRate > 0} 
        clickPosition={clickPosition}
        onClickReset={() => setClickPosition(undefined)}
      />
      
      <NotificationSystem 
        notifications={notifications}
        onDismiss={dismissNotification}
        onClearAll={clearAllNotifications}
      />
      
      {showPlaceholders && (
        <>
          <PlaceholderArt type="background" />
          <div className="absolute inset-4 border-4 border-dashed border-blue-500 opacity-20 rounded-lg z-10">
            <div className="absolute top-2 left-2 text-blue-400 text-sm font-mono">FRAME PLACEHOLDER</div>
          </div>
        </>
      )}
      
      <div className="max-w-7xl mx-auto relative z-20">
        <TopBar 
          incrementPoints={gameState.incrementPoints}
          showPlaceholders={showPlaceholders}
          onTogglePlaceholders={setShowPlaceholders}
        />
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">The Incremental Archives</h1>
          <p className="text-slate-400">Uncover the ancient secrets of incrementalness</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GameStats
                incrementPoints={gameState.incrementPoints}
                clickPower={gameState.clickPower}
                autoIncrementRate={gameState.autoIncrementRate}
                totalClicks={gameState.totalClicks}
                multiplier={gameState.multiplier}
                activeComboMultiplier={gameState.activeComboMultiplier}
              />
              
              <div className="space-y-4">
                <ComboSystem 
                  gameState={gameState} 
                  onComboBonus={handleComboBonus}
                  onNotification={addNotification}
                  showPlaceholders={showPlaceholders}
                />
                
                <Card className="bg-slate-800 border-slate-700 relative overflow-hidden">
                  {showPlaceholders && <PlaceholderArt type="lore" />}
                  <CardHeader className="pb-3 relative z-10">
                    <CardTitle className="text-slate-100 flex items-center gap-2 text-lg">
                      <ScrollText className="w-5 h-5" />
                      {lore.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-slate-300 text-sm">{lore.text}</p>
                  </CardContent>
                </Card>
                
                <EventSystem 
                  gameState={gameState} 
                  onEventEffect={handleEventEffect}
                  showPlaceholders={showPlaceholders}
                />
              </div>
            </div>
            
            <ClickButton 
              onClick={handleClickWithParticles} 
              clickPower={gameState.clickPower}
              showPlaceholders={showPlaceholders}
            />
            
            <SaveSystem gameState={gameState} onLoadGame={loadGameState} />
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <UpgradeShop
              incrementPoints={gameState.incrementPoints}
              onPurchase={purchaseUpgrade}
              gameState={{...gameState, showPlaceholders}}
            />
            
            <EnhancedArtifacts
              artifacts={gameState.artifacts}
              activatedArtifacts={gameState.activatedArtifacts}
              incrementPoints={gameState.incrementPoints}
              onActivateArtifact={activateArtifact}
              showPlaceholders={showPlaceholders}
            />
            
            <QuestSystem 
              gameState={gameState} 
              onRewardClaim={handleQuestReward}
              showPlaceholders={showPlaceholders}
            />
            <AchievementSystem 
              gameState={gameState} 
              secrets={secrets}
              showPlaceholders={showPlaceholders}
            />
            <SecretDiscovery 
              gameState={gameState} 
              onSecretFound={handleSecretFound}
              showPlaceholders={showPlaceholders}
            />
            
            {gameState.totalClicks >= 500 && (
              <PrestigeSystem
                totalClicks={gameState.totalClicks}
                incrementPoints={gameState.incrementPoints}
                prestigeLevel={gameState.prestigeLevel}
                onPrestige={handlePrestige}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncrementalGame;