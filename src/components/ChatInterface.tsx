
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Loader, Key } from 'lucide-react';
import { MiloMode } from '@/types';
import TextToSpeech from './TextToSpeech';
import ApiKeyInput from './ApiKeyInput';

interface ChatInterfaceProps {
  mode: MiloMode;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode, onBack }) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Use your API key by default
  const DEFAULT_API_KEY = 'AIzaSyCTzjEiQquKY5Hm-P2o1w4GWPS7r3HLhUY';

  const getApiKey = () => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    return savedApiKey || DEFAULT_API_KEY;
  };

  const getModeEmoji = (mode: MiloMode) => {
    switch (mode) {
      case 'Sweet': return '🌸';
      case 'Savage': return '🔥';
      case 'Nerdy': return '🤓';
      default: return '🧠';
    }
  };

  const getModeColor = (mode: MiloMode) => {
    switch (mode) {
      case 'Sweet': return 'from-pink-500 to-rose-500';
      case 'Savage': return 'from-red-500 to-orange-500';
      case 'Nerdy': return 'from-blue-500 to-indigo-500';
      default: return 'from-purple-500 to-blue-500';
    }
  };

  const generateGeminiPrompt = (question: string, mode: MiloMode): string => {
    const basePrompt = `You are Milo, an AI tutor with a specific personality mode: ${mode}.

Question: "${question}"

Your response style based on mode:
- Sweet: Be gentle, encouraging, supportive with comforting words and relatable analogies. Use emojis like 🌸💕✨
- Savage: Use tough love, brutal honesty, and direct clarity. Be sarcastic but helpful. Use emojis like 🔥💪
- Nerdy: Show geeky excitement, dive into details, fun facts, and logical breakdowns. Use emojis like 🤓🧠✨

Guidelines:
- Keep responses conversational and friendly
- Use simple language that's easy to understand
- Include relevant emojis for personality
- Provide clear, actionable explanations
- Make learning feel engaging and fun
- Limit response to 2-3 paragraphs maximum

Respond as Milo in ${mode} mode:`;

    return basePrompt;
  };

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const apiKey = getApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  };

  const handleAskMilo = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    try {
      const prompt = generateGeminiPrompt(userInput, mode);
      const geminiResponse = await callGeminiAPI(prompt);
      setResponse(geminiResponse);
    } catch (error) {
      setResponse("Sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setShowApiKeyInput(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAskMilo();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Mode Selection
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className={`text-center bg-gradient-to-r ${getModeColor(mode)} bg-clip-text text-transparent`}>
              {getModeEmoji(mode)} Milo Mode: {mode}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {showApiKeyInput && (
                <ApiKeyInput onSubmit={handleApiKeySubmit} onCancel={() => setShowApiKeyInput(false)} />
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 flex-1">
                  <Input
                    type="text"
                    placeholder="Ask your question here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAskMilo}
                    disabled={isLoading || !userInput.trim()}
                    className={`bg-gradient-to-r ${getModeColor(mode)} hover:opacity-90`}
                  >
                    {isLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isLoading ? 'Thinking...' : 'Ask Milo'}
                  </Button>
                </div>
                <Button
                  onClick={() => setShowApiKeyInput(true)}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  title="Use Custom API Key (Optional)"
                >
                  <Key className="w-4 h-4" />
                </Button>
              </div>

              {response && (
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Milo says:</h3>
                      <TextToSpeech text={response} />
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{response}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
