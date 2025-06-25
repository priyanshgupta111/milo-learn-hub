
import React, { useState } from 'react';
import ModeSelector from '@/components/ModeSelector';
import ChatInterface from '@/components/ChatInterface';
import { MiloMode } from '@/types';

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<MiloMode | null>(null);

  const handleModeSelect = (mode: MiloMode) => {
    setSelectedMode(mode);
  };

  const handleBack = () => {
    setSelectedMode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {!selectedMode ? (
        <ModeSelector onModeSelect={handleModeSelect} />
      ) : (
        <ChatInterface mode={selectedMode} onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
