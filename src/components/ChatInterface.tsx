
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Loader, Trash2 } from 'lucide-react';
import { MiloMode, ChatMessage } from '@/types';
import TextToSpeech from './TextToSpeech';

interface ChatInterfaceProps {
  mode: MiloMode;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  mode,
  onBack
}) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // API key
  const API_KEY = 'AIzaSyCTzjEiQquKY5Hm-P2o1w4GWPS7r3HLhUY';

  const getModeEmoji = (mode: MiloMode) => {
    switch (mode) {
      case 'Sweet':
        return '🌸';
      case 'Savage':
        return '🔥';
      case 'Nerdy':
        return '🤓';
      default:
        return '🧠';
    }
  };

  const getModeColor = (mode: MiloMode) => {
    switch (mode) {
      case 'Sweet':
        return 'from-pink-500 to-rose-500';
      case 'Savage':
        return 'from-red-500 to-orange-500';
      case 'Nerdy':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-purple-500 to-blue-500';
    }
  };

  const generateGeminiPrompt = (question: string, mode: MiloMode, history: ChatMessage[]): string => {
    let conversationContext = '';
    
    if (history.length > 0) {
      conversationContext = '\n\nPrevious conversation context:\n';
      history.slice(-4).forEach((msg, index) => {
        conversationContext += `${msg.role === 'user' ? 'Student' : 'Milo'}: ${msg.content}\n`;
      });
      conversationContext += '\nContinue this conversation naturally, referencing previous context when relevant.\n';
    }

    const basePrompt = `You are Milo, an AI tutor with a specific personality mode: ${mode}.

${conversationContext}

Current question: "${question}"

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
- Reference previous conversation if relevant
- Limit response to 2-3 paragraphs maximum

Respond as Milo in ${mode} mode:`;
    
    return basePrompt;
  };

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
            maxOutputTokens: 1024
          }
        })
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

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userInput.trim()
    };

    // Add user message to history
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const prompt = generateGeminiPrompt(userInput, mode, chatHistory);
      const geminiResponse = await callGeminiAPI(prompt);
      
      const newAssistantMessage: ChatMessage = {
        role: 'assistant',
        content: geminiResponse
      };

      // Add assistant response to history
      setChatHistory(prev => [...prev, newAssistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment!"
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAskMilo();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mode Selection
          </Button>
          
          {chatHistory.length > 0 && (
            <Button onClick={clearChat} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
          )}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className={`text-center bg-gradient-to-r ${getModeColor(mode)} bg-clip-text text-transparent`}>
              {getModeEmoji(mode)} Milo Mode: {mode}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chat History */}
              {chatHistory.length > 0 && (
                <div className="max-h-96 overflow-y-auto space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        {message.role === 'assistant' && (
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-sm">Milo says:</span>
                            <TextToSpeech text={message.content} />
                          </div>
                        )}
                        <p className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Milo is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Input Section */}
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder={chatHistory.length === 0 ? "Ask your first question here..." : "Ask another question..."}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
