
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsLoading(false);
        setIsPlaying(false);
      };

      // Enhanced voice settings for a child-like, expressive reading
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a young, female voice first (sounds more child-like)
      let selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('girl') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('tessa')
      );

      // If no female voice, try other high-quality voices
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('google') || 
          voice.name.toLowerCase().includes('microsoft') ||
          voice.name.toLowerCase().includes('english')
        );
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Settings to make it sound more child-like and expressive
      utterance.rate = 0.85; // Slightly slower, like a child reading carefully
      utterance.pitch = 1.3; // Higher pitch for younger sound
      utterance.volume = 1.0; // Full volume for clarity
      
      // Add some expressiveness by adjusting based on content
      if (text.includes('!') || text.includes('?')) {
        utterance.rate = 0.8; // Even slower for emphasis on exclamations/questions
        utterance.pitch = 1.4; // Higher pitch for excitement
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!('speechSynthesis' in window)) {
    return null;
  }

  return (
    <Button
      onClick={handleSpeak}
      variant="outline"
      size="sm"
      className="ml-2 hover:bg-blue-50"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="w-4 h-4 text-red-500" />
      ) : (
        <Volume2 className="w-4 h-4 text-blue-500" />
      )}
      {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Listen'}
    </Button>
  );
};

export default TextToSpeech;
