
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('sk_fde9f4ec5166aad19e20b78dc449d0fcba6cb92a1dcb4e6c'); // Default API key
  const [showSettings, setShowSettings] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  // ElevenLabs API configuration
  const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Sarah voice - natural and expressive
  const MODEL_ID = 'eleven_multilingual_v2'; // Best quality model

  const handleElevenLabsSpeak = async () => {
    if (isPlaying && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
      return;
    }

    setIsLoading(true);
    console.log('Starting ElevenLabs text-to-speech...');

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.6,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onloadstart = () => {
        console.log('Audio loading started');
        setIsLoading(false);
        setIsPlaying(true);
      };

      audio.onended = () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (error) => {
        console.error('Audio playback error:', error);
        setIsLoading(false);
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      setCurrentAudio(audio);
      await audio.play();

    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      setIsLoading(false);
      setIsPlaying(false);
      
      // Fallback to browser speech synthesis
      handleBrowserSpeak();
    }
  };

  const handleBrowserSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeak = () => {
    // Always try ElevenLabs first since we have a default API key
    handleElevenLabsSpeak();
  };

  return (
    <div className="relative flex items-center space-x-2">
      <Button
        onClick={handleSpeak}
        variant="outline"
        size="sm"
        className="hover:bg-blue-50"
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

      <Button
        onClick={() => setShowSettings(!showSettings)}
        variant="ghost"
        size="sm"
        className="p-1"
      >
        <Settings className="w-4 h-4 text-gray-500" />
      </Button>

      {showSettings && (
        <Card className="absolute top-12 right-0 z-10 w-80">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  ElevenLabs API Key
                </label>
                <Input
                  type="password"
                  placeholder="API key is already configured"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="text-xs text-gray-500">
                <p>• High-quality, emotional voice is now enabled by default</p>
                <p>• You can update the API key if needed</p>
                <p>• Falls back to browser voice if API fails</p>
              </div>
              <Button
                onClick={() => setShowSettings(false)}
                size="sm"
                className="w-full"
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TextToSpeech;
