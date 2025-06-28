
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import ModeSelector from '@/components/ModeSelector';
import ChatInterface from '@/components/ChatInterface';
import { MiloMode } from '@/types';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'modeSelector' | 'chat'>('landing');
  const [selectedMode, setSelectedMode] = useState<MiloMode | null>(null);

  const handleGetStarted = () => {
    setCurrentView('modeSelector');
  };

  const handleModeSelect = (mode: MiloMode) => {
    setSelectedMode(mode);
    setCurrentView('chat');
  };

  const handleBack = () => {
    if (currentView === 'chat') {
      setCurrentView('modeSelector');
      setSelectedMode(null);
    } else if (currentView === 'modeSelector') {
      setCurrentView('landing');
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedMode(null);
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'modeSelector') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <ModeSelector onModeSelect={handleModeSelect} />
        <div className="text-center pb-6">
          <button 
            onClick={handleBackToLanding}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <ChatInterface mode={selectedMode!} onBack={handleBack} />
      <div className="text-center pb-6">
        <button 
          onClick={handleBackToLanding}
          className="text-gray-500 hover:text-gray-700 underline ml-4"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Index;
