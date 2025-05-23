import { useState, useEffect, useCallback } from 'react';

interface GameState {
  incrementPoints: number;
  clickPower: number;
  autoIncrementRate: number;
  totalClicks: number;
  prestigeLevel: number;
  upgrades: Record<string, boolean>;
  artifacts: any[];
  activatedArtifacts: string[];
  secretUpgrades: string[];
  multiplier: number;
}

const initialGameState: GameState = {
  incrementPoints: 0,
  clickPower: 1,
  autoIncrementRate: 0,
  totalClicks: 0,
  prestigeLevel: 0,
  upgrades: {},
  artifacts: [],
  activatedArtifacts: [],
  secretUpgrades: [],
  multiplier: 1
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Auto increment effect
  useEffect(() => {
    if (gameState.autoIncrementRate > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          incrementPoints: prev.incrementPoints + (prev.autoIncrementRate * prev.multiplier)
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState.autoIncrementRate, gameState.multiplier]);

  const handleClick = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      incrementPoints: prev.incrementPoints + (prev.clickPower * prev.multiplier),
      totalClicks: prev.totalClicks + 1
    }));
  }, []);

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    const upgradeCosts: Record<string, number> = {
      'click_power_1': 10,
      'click_power_2': 100,
      'auto_increment_1': 50,
      'auto_increment_2': 500,
      'multiplier_1': 1000,
      'hidden_power': 2500,
      'mirror_numbers': 5000
    };

    const cost = upgradeCosts[upgradeId];
    if (!cost || gameState.incrementPoints < cost || gameState.upgrades[upgradeId]) return;

    setGameState(prev => {
      const newState = {
        ...prev,
        incrementPoints: prev.incrementPoints - cost,
        upgrades: { ...prev.upgrades, [upgradeId]: true }
      };

      // Apply upgrade effects
      switch (upgradeId) {
        case 'click_power_1':
          newState.clickPower += 1;
          break;
        case 'click_power_2':
          newState.clickPower += 5;
          break;
        case 'auto_increment_1':
          newState.autoIncrementRate += 1;
          break;
        case 'auto_increment_2':
          newState.autoIncrementRate += 5;
          break;
        case 'multiplier_1':
          newState.multiplier *= 1.5;
          break;
        case 'hidden_power':
          newState.clickPower += 10;
          break;
        case 'mirror_numbers':
          newState.autoIncrementRate *= 2;
          break;
      }

      return newState;
    });
  }, [gameState.incrementPoints, gameState.upgrades]);

  const activateArtifact = useCallback((artifactId: string) => {
    const artifactCosts: Record<string, number> = {
      'crown_of_progress': 2000,
      'orb_of_wisdom': 5000,
      'gem_of_amplification': 1500,
      'star_of_fortune': 7500,
      'shield_of_persistence': 10000
    };

    const cost = artifactCosts[artifactId];
    if (!cost || gameState.incrementPoints < cost || gameState.activatedArtifacts.includes(artifactId)) return;

    setGameState(prev => {
      const newState = {
        ...prev,
        incrementPoints: prev.incrementPoints - cost,
        activatedArtifacts: [...prev.activatedArtifacts, artifactId]
      };

      // Apply artifact effects
      switch (artifactId) {
        case 'crown_of_progress':
          newState.autoIncrementRate += 10;
          break;
        case 'orb_of_wisdom':
          newState.secretUpgrades = [...prev.secretUpgrades, 'hidden_power'];
          break;
        case 'gem_of_amplification':
          newState.clickPower *= 2;
          break;
        case 'star_of_fortune':
          newState.multiplier *= 1.25;
          break;
        case 'shield_of_persistence':
          // Effect applied during prestige
          break;
      }

      return newState;
    });
  }, [gameState.incrementPoints, gameState.activatedArtifacts]);

  const handlePrestige = useCallback(() => {
    if (gameState.totalClicks < 500) return;

    const prestigeBonus = Math.floor(gameState.totalClicks / 100);
    const hasShield = gameState.activatedArtifacts.includes('shield_of_persistence');
    
    setGameState(prev => ({
      ...initialGameState,
      prestigeLevel: prev.prestigeLevel + 1,
      clickPower: 1 + prestigeBonus,
      multiplier: hasShield ? prev.multiplier * 0.5 : 1,
      activatedArtifacts: hasShield ? prev.activatedArtifacts : [],
      secretUpgrades: hasShield ? prev.secretUpgrades : []
    }));
  }, [gameState.totalClicks, gameState.activatedArtifacts]);

  const handleEventEffect = useCallback((effect: any) => {
    setGameState(prev => ({
      ...prev,
      incrementPoints: prev.incrementPoints + (effect.pointsBonus || 0),
      multiplier: prev.multiplier * (effect.multiplier || 1)
    }));
  }, []);

  const handleComboBonus = useCallback((multiplier: number) => {
    // Combo bonus is temporary and handled in the combo system
  }, []);

  const loadGameState = useCallback((newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  }, []);

  return {
    gameState,
    handleClick,
    purchaseUpgrade,
    handlePrestige,
    activateArtifact,
    loadGameState,
    handleEventEffect,
    handleComboBonus
  };
};