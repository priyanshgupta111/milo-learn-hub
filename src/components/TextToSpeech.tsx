
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSpeak = async () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      console.log('Starting text-to-speech...');
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => {
        console.log('Speech started');
        setIsLoading(false);
        setIsPlaying(true);
      };
      
      utterance.onend = () => {
        console.log('Speech ended');
        setIsPlaying(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event.error);
        setIsLoading(false);
        setIsPlaying(false);
      };

      // Use default voice settings for maximum compatibility
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      console.log('Speaking with default settings');
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
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
