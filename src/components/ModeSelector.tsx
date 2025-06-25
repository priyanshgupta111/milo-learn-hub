
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Zap, Glasses } from 'lucide-react';
import { MiloMode } from '@/types';

interface ModeSelectorProps {
  onModeSelect: (mode: MiloMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect }) => {
  const modes = [
    {
      name: 'Sweet' as MiloMode,
      icon: Heart,
      description: 'Gentle, encouraging, and supportive',
      color: 'bg-pink-500 hover:bg-pink-600',
      emoji: '🌸'
    },
    {
      name: 'Savage' as MiloMode,
      icon: Zap,
      description: 'Tough love with brutal honesty',
      color: 'bg-red-500 hover:bg-red-600',
      emoji: '🔥'
    },
    {
      name: 'Nerdy' as MiloMode,
      icon: Glasses,
      description: 'Deep dives with geeky excitement',
      color: 'bg-blue-500 hover:bg-blue-600',
      emoji: '🤓'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🧠 Ask Milo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your AI tutor who adapts to your learning style
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Choose Milo's Teaching Style:
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <Card key={mode.name} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl">{mode.emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{mode.name}</h3>
                  <p className="text-gray-600 mb-4">{mode.description}</p>
                  <Button
                    onClick={() => onModeSelect(mode.name)}
                    className={`w-full ${mode.color} text-white transition-colors duration-200`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    Choose {mode.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
