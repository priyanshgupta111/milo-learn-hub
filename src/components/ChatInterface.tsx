
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Loader } from 'lucide-react';
import { MiloMode } from '@/types';
import TextToSpeech from './TextToSpeech';

interface ChatInterfaceProps {
  mode: MiloMode;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode, onBack }) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const aiTutorPrompt = (topic: string, style: MiloMode, userLevel: string) => `
You are an AI tutor teaching the topic: "${topic}" to a ${userLevel} student.

🎓 Role: Act as a helpful, friendly friend who can switch between styles:
- Sweet: Use comforting words, gentle encouragement, and relatable analogies.
- Savage: Use tough love, brutally honest truth bombs, and sarcasm to drive clarity.
- Nerdy: Dive into fun facts, detailed logic, and geeky excitement.

🎭 Style: Use the "${style}" mode for your tone, examples, and word choice.

🎯 Objective:
- Make the topic super clear within 2-3 crisp explanations.
- Use simple language, emojis, and real-life comparisons.
- Ensure the student feels like they 'get it' like they would from a cool friend.

🎒 Adapt to their level and explain like you're right there beside them.

📚 Format:
- Begin with a quick hook (fun fact or real-world tie-in).
- Give a clear, friendly breakdown.
- End with a quirky summary or takeaway.
- Add a bonus tip or emoji wrap-up.

Always check: Does it feel like a human friend explained it? If not, tweak it until it does. 🤝
`;

  const handleAskMilo = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call - replace with actual OpenAI API integration
    try {
      // For demo purposes, we'll create a mock response based on the mode
      const mockResponse = generateMockResponse(userInput, mode);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResponse(mockResponse);
    } catch (error) {
      setResponse("Sorry, I'm having trouble connecting right now. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (question: string, mode: MiloMode): string => {
    const baseResponse = `Great question about "${question}"! `;
    
    switch (mode) {
      case 'Sweet':
        return baseResponse + `🌸 Don't worry, this is totally manageable! Think of it like learning to ride a bike - it might seem scary at first, but once you get the hang of it, you'll wonder why you were ever worried. Let me break this down gently for you... The key thing to remember is that everyone learns at their own pace, and you're doing amazing just by asking! 💕 Keep going, you've got this! ✨`;
      
      case 'Savage':
        return baseResponse + `🔥 Alright, let's cut through the fluff - here's the brutal truth you need to hear. This concept trips people up because they overthink it, but it's actually simpler than you think. Stop making it complicated! The bottom line is this: if you understand X, then Y follows logically. No excuses, no shortcuts - just pure logic. Now stop doubting yourself and own this knowledge! 💪`;
      
      case 'Nerdy':
        return baseResponse + `🤓 OH, this is SO cool! Did you know that this concept was first discovered in [relevant time period]? The fascinating thing about this is how it connects to [related field]. Think of it like this: imagine you're debugging code - you need to understand each component before the whole system makes sense. Here's the step-by-step breakdown that'll make you go "AHA!" 🧠✨ Pro tip: This also relates to [bonus connection]!`;
      
      default:
        return baseResponse + `Let me explain this in a friendly way...`;
    }
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
              <div className="flex space-x-2">
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
