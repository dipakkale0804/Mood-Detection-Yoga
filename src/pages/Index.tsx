import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ For redirect
import MoodDetection from '@/components/MoodDetection';
import MusicPlayer from '@/components/MusicPlayer';
import MeditationTips from '@/components/MeditationTips';
import WellnessChatbot from '@/components/WellnessChatbot';
import { Heart, Brain, Music, MessageCircle, LogOut } from 'lucide-react';

const Index = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMoodDetected = (mood: string) => {
    setCurrentMood(mood);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Remove token
    navigate('/login'); // ✅ Redirect to Login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Header with Logout */}
      <div className="relative overflow-hidden bg-gradient-wellness text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Heart className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold">MoodSync</h1>
              </div>
              <p className="text-xl md:text-2xl text-white/90 mb-2">
                AI-Powered Wellness Companion
              </p>
              <p className="text-white/80 max-w-2xl mx-auto">
                Detect your mood, enjoy personalized music, discover meditation techniques, 
                and chat with our AI wellness assistant for complete mental health support.
              </p>
            </div>

            {/* ✅ Logout Button */}
            <button
              onClick={handleLogout}
              className="absolute top-6 right-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {/* Mood Detection */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-wellness p-2 rounded-full text-white">
                <Brain className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Mood Detection</h2>
            </div>
            <MoodDetection onMoodDetected={handleMoodDetected} currentMood={currentMood} />
          </div>

          {/* Music Player */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-wellness p-2 rounded-full text-white">
                <Music className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Mood Music</h2>
            </div>
            <MusicPlayer currentMood={currentMood} />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meditation Tips */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-wellness p-2 rounded-full text-white">
                <Heart className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Meditation Guide</h2>
            </div>
            <MeditationTips currentMood={currentMood} />
          </div>

          {/* AI Chatbot */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-wellness p-2 rounded-full text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Wellness Assistant</h2>
            </div>
            <WellnessChatbot />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-calm p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">Your Mental Wellness Journey</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Remember, taking care of your mental health is a daily practice. 
              Use this app as a companion on your journey to better emotional well-being. 
              If you're experiencing persistent mental health challenges, please consider 
              speaking with a healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
