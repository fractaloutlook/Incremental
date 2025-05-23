import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

interface LorePanelProps {
  totalClicks: number;
}

const LorePanel: React.FC<LorePanelProps> = ({ totalClicks }) => {
  const getLoreEntry = () => {
    if (totalClicks < 10) {
      return {
        title: "The Beginning",
        text: "You discover an ancient artifact that responds to touch. Each click seems to awaken something dormant within..."
      };
    } else if (totalClicks < 50) {
      return {
        title: "First Awakening",
        text: "The artifact pulses with energy. You sense vast knowledge locked within its crystalline structure."
      };
    } else if (totalClicks < 200) {
      return {
        title: "The Scholars",
        text: "Ancient texts speak of the Incrementalists - a lost civilization that mastered the art of gradual progression."
      };
    } else if (totalClicks < 500) {
      return {
        title: "Hidden Chambers",
        text: "Your persistence reveals hidden chambers beneath the ruins. Each room contains more powerful artifacts."
      };
    } else {
      return {
        title: "The Archive Keeper",
        text: "You have proven worthy. The Archive Keeper's spirit awakens, ready to share the deepest secrets of incrementalness."
      };
    }
  };

  const lore = getLoreEntry();

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-slate-100 flex items-center gap-2 text-lg">
          <ScrollText className="w-5 h-5" />
          {lore.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 text-sm leading-relaxed">
          {lore.text}
        </p>
        <div className="mt-3 text-xs text-slate-500">
          Clicks: {totalClicks}
        </div>
      </CardContent>
    </Card>
  );
};

export default LorePanel;