
export type MiloMode = 'Sweet' | 'Savage' | 'Nerdy';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TutorConfig {
  mode: MiloMode;
  userLevel: string;
  topic: string;
}
