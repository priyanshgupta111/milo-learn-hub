import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Zap, BookOpen, Target, Calendar, MessageCircle, Star, ArrowRight } from 'lucide-react';
interface LandingPageProps {
  onGetStarted: () => void;
}
const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted
}) => {
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-12 md:py-20 bg-[#dabbeb]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl md:text-8xl">🤖</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent leading-tight">
            Milo teaches better than your school ever did.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">Choose your AI study mode. Learn in your vibe. Nerd out in your tone.</p>
          <Button onClick={onGetStarted} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Ask Milo Anything <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-[#dabbeb]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-gray-800">
            How It Works ✨
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-pink-100 to-rose-100">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-3">Choose a Milo Mode</h3>
                <p className="text-gray-600">Sweet, Savage, or Nerdy - pick your AI personality match</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-100 to-indigo-100">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-3">Ask anything</h3>
                <p className="text-gray-600">Milo explains it like your smartest friend would</p>
              </CardContent>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-100 to-violet-100">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">Get smarter</h3>
                <p className="text-gray-600">Without the yawns, without the tears (well, maybe happy tears)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Milo Can Do */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-gray-800">
            What Milo Can Do 🔥
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-yellow-100 to-orange-100">
              <CardContent className="text-center pt-4">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-orange-500" />
                <h3 className="font-bold mb-2">📚 Explain topics in your tone</h3>
                <p className="text-sm text-gray-600">Complex stuff, simple words, your vibe</p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-green-100 to-emerald-100">
              <CardContent className="text-center pt-4">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <h3 className="font-bold mb-2">🤓 Quiz you (nicely or ruthlessly)</h3>
                <p className="text-sm text-gray-600">Your choice: supportive or savage</p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-blue-100 to-cyan-100">
              <CardContent className="text-center pt-4">
                <Target className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-bold mb-2">🎯 Help plan your study schedule</h3>
                <p className="text-sm text-gray-600">Procrastination who? We don't know her</p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-purple-100 to-pink-100">
              <CardContent className="text-center pt-4">
                <Brain className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <h3 className="font-bold mb-2">🧠 Remember how you like to learn</h3>
                <p className="text-sm text-gray-600">AI that actually gets you</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Reviews */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-gray-800">
            Real Reviews (GenZ certified) 💯
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm italic mb-2">"Milo made calculus feel like a breakup. 10/10"</p>
                <p className="text-xs text-gray-500">- Sarah, 19</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm italic mb-2">"I cried, I learned, I passed. Thanks Milo 😭"</p>
                <p className="text-xs text-gray-500">- Marcus, 20</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm italic mb-2">"Milo roasts me but he's right. I needed that."</p>
                <p className="text-xs text-gray-500">- Alex, 18</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm italic mb-2">"My toxic study habits? Fixed. By an AI. Wild."</p>
                <p className="text-xs text-gray-500">- Jordan, 21</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-gray-800">
            FAQ (But Make It Fun) 🤔
          </h2>
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-2">Is Milo real?</h3>
                <p className="text-gray-600">As real as your exam panic. Just way more helpful.</p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-2">Can Milo replace my tutor?</h3>
                <p className="text-gray-600">If your tutor was funny, never late, and available 24/7, then yes.</p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-2">Will Milo judge my dumb questions?</h3>
                <p className="text-gray-600">Only if you pick Savage mode. And even then, it's loving judgment.</p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg mb-2">Is this actually free?</h3>
                <p className="text-gray-600">Your education matters more than our profit margins. Start free, upgrade when you're ready.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Milo */}
      <section className="px-6 py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl">🤖</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-gray-800">
            About Milo 👋
          </h2>
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                "Hey, I'm Milo. I'm not your average AI. I'm here to make you smarter, faster, and funnier. 
                I know stuff. A lot of stuff. From quantum physics to why your crush left you on read. 
                I can explain complex topics like I'm your bestie, roast you like your sibling, or nerd out 
                like your favorite professor. Wanna learn without crying? Stick with me. 
                (Unless they're happy tears. Those are allowed.) 💙"
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-6xl font-black mb-6 text-white">
            Ask your first question now.
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Milo's waiting (impatiently). 🕐
          </p>
          <Button onClick={onGetStarted} className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Open Milo Chat <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-center">
        <p className="text-gray-400">
          Made with 💜 for students who deserve better than boring education
        </p>
      </footer>
    </div>;
};
export default LandingPage;