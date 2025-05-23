import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Save, Download, User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { GameState } from '@/hooks/useGameState';

interface SaveSystemProps {
  gameState: GameState;
  onLoadGame: (state: GameState) => void;
}

const SaveSystem: React.FC<SaveSystemProps> = ({ gameState, onLoadGame }) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('incrementalUserId') || '';
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateUserId = () => {
    const newId = 'user_' + Math.random().toString(36).substr(2, 9);
    setUserId(newId);
    localStorage.setItem('incrementalUserId', newId);
    toast({ title: "User ID Generated", description: `Your ID: ${newId}` });
  };

  const saveToLocal = () => {
    const saveData = JSON.stringify(gameState);
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incremental-save-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Game Exported!", description: "Save file downloaded" });
  };

  const loadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target?.result as string);
        onLoadGame(saveData);
        toast({ title: "Game Loaded!", description: "Progress restored from file" });
      } catch (error) {
        toast({ title: "Load Failed", description: "Invalid save file", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2 text-sm">
          <Save className="w-4 h-4" />
          Save System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="bg-slate-700 border-slate-600 text-slate-100 text-xs"
          />
          <Button
            size="sm"
            onClick={generateUserId}
            className="bg-blue-600 hover:bg-blue-700 text-xs"
          >
            <User className="w-3 h-3" />
          </Button>
        </div>
        
        {userId && (
          <Badge className="bg-blue-500/20 text-blue-300 text-xs">
            ID: {userId}
          </Badge>
        )}
        
        <div className="space-y-2">
          <Button
            size="sm"
            onClick={saveToLocal}
            className="w-full bg-green-600 hover:bg-green-700 text-xs"
          >
            <Save className="w-3 h-3 mr-1" />
            Export Save
          </Button>
          
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={loadFromFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              size="sm"
              className="w-full bg-orange-600 hover:bg-orange-700 text-xs pointer-events-none"
            >
              <Download className="w-3 h-3 mr-1" />
              Import Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SaveSystem;