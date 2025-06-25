
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
        console.log('Stopping speech...');
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      console.log('Starting text-to-speech for text:', text.substring(0, 50) + '...');
      
      // Clear any existing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => {
        console.log('Speech started successfully');
        setIsLoading(false);
        setIsPlaying(true);
      };
      
      utterance.onend = () => {
        console.log('Speech ended successfully');
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech error occurred:', event.error, event);
        setIsLoading(false);
        setIsPlaying(false);
      };

      utterance.onpause = () => {
        console.log('Speech paused');
      };

      utterance.onresume = () => {
        console.log('Speech resumed');
      };

      // Use default voice settings for maximum compatibility
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      console.log('About to speak with utterance:', utterance);
      console.log('Speech synthesis speaking state:', window.speechSynthesis.speaking);
      console.log('Speech synthesis pending state:', window.speechSynthesis.pending);
      
      // Add a timeout to reset loading state if speech doesn't start
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          console.log('Speech timeout - resetting loading state');
          setIsLoading(false);
          setIsPlaying(false);
        }
      }, 5000);

      try {
        window.speechSynthesis.speak(utterance);
        console.log('Speech command sent');
        
        // Clear timeout if speech starts properly
        utterance.onstart = () => {
          console.log('Speech started successfully');
          clearTimeout(timeoutId);
          setIsLoading(false);
          setIsPlaying(true);
        };
        
      } catch (error) {
        console.error('Error calling speechSynthesis.speak:', error);
        clearTimeout(timeoutId);
        setIsLoading(false);
        setIsPlaying(false);
      }
    } else {
      console.error('Speech synthesis not supported in this browser');
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
