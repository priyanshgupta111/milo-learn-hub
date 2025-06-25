
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
  onCancel: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit, onCancel }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <Key className="w-5 h-5 mr-2" />
          Enter Your Gemini API Key
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            To use Gemini AI for better responses, please enter your Google AI Studio API key. 
            You can get one for free at{' '}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google AI Studio
            </a>
          </p>
          
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type={showKey ? 'text' : 'password'}
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <Button onClick={handleSubmit} disabled={!apiKey.trim()}>
              Save
            </Button>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Your API key is stored securely in your browser's local storage and never sent to our servers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
