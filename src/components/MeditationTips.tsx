import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Leaf, Sun } from 'lucide-react';

interface MeditationTip {
  id: string;
  title: string;
  description: string;
  instruction: string;
  duration: string;
  mood: string;
  icon: React.ReactNode;
}

interface MeditationTipsProps {
  currentMood: string | null;
}

const MeditationTips: React.FC<MeditationTipsProps> = ({ currentMood }) => {
  const [currentTip, setCurrentTip] = useState<MeditationTip | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);

  const meditationTips: MeditationTip[] = [
    {
      id: '1',
      title: 'Joyful Gratitude',
      description: 'Amplify your happiness with gratitude practice',
      instruction: 'Think of three things you\'re grateful for right now. Hold each thought for 30 seconds and feel the warmth in your heart.',
      duration: '2 minutes',
      mood: 'happy',
      icon: <Sun className="h-5 w-5" />
    },
    {
      id: '2',
      title: 'Ocean Breathing',
      description: 'Deepen your calm with rhythmic breathing',
      instruction: 'Breathe in for 4 counts, hold for 4, exhale for 6. Imagine waves washing over you with each breath.',
      duration: '5 minutes',
      mood: 'calm',
      icon: <Heart className="h-5 w-5" />
    },
    {
      id: '3',
      title: 'Mindful Focus',
      description: 'Sharpen your concentration with single-point meditation',
      instruction: 'Choose a single object or word. When your mind wanders, gently return to your chosen focus point.',
      duration: '10 minutes',
      mood: 'focused',
      icon: <Brain className="h-5 w-5" />
    },
    {
      id: '4',
      title: 'Energy Flow',
      description: 'Channel your energy with movement meditation',
      instruction: 'Stand tall, imagine energy flowing from earth through your body to sky. Move slowly with intention.',
      duration: '3 minutes',
      mood: 'energetic',
      icon: <Leaf className="h-5 w-5" />
    },
    {
      id: '5',
      title: 'Body Scan',
      description: 'Release tension and deepen relaxation',
      instruction: 'Start from your toes and slowly scan up your body, releasing tension in each part you focus on.',
      duration: '8 minutes',
      mood: 'relaxed',
      icon: <Heart className="h-5 w-5" />
    }
  ];

  const getMoodTips = (mood: string | null) => {
    if (!mood) return [meditationTips[1]]; // Default to calm
    return meditationTips.filter(tip => tip.mood === mood);
  };

  const startBreathingExercise = () => {
    setIsBreathing(true);
    setBreathCount(0);
  };

  const stopBreathingExercise = () => {
    setIsBreathing(false);
    setBreathCount(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathCount(prev => prev + 1);
      }, 4000); // 4 second breathing cycle
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    const tips = getMoodTips(currentMood);
    if (tips.length > 0) {
      setCurrentTip(tips[0]);
    }
  }, [currentMood]);

  const getMoodColor = (mood: string | null) => {
    const colors = {
      happy: 'from-yellow-400 to-orange-400',
      calm: 'from-blue-400 to-cyan-400',
      focused: 'from-purple-400 to-indigo-400',
      energetic: 'from-orange-400 to-red-400',
      relaxed: 'from-green-400 to-emerald-400'
    };
    return colors[mood as keyof typeof colors] || 'from-blue-400 to-cyan-400';
  };

  return (
    <Card className="p-6 shadow-wellness hover:shadow-float transition-all duration-300">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Meditation Guide</h3>
          <p className="text-muted-foreground text-sm">
            Personalized meditation tips for your current mood
          </p>
        </div>

        {currentTip && (
          <>
            {/* Meditation Tip Card */}
            <div className={`relative p-6 rounded-lg bg-gradient-to-br ${getMoodColor(currentMood)} text-white`}>
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  {currentTip.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{currentTip.title}</h4>
                  <p className="text-white/90 mb-3">{currentTip.description}</p>
                  <div className="bg-white/10 p-3 rounded text-sm">
                    {currentTip.instruction}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white/80">Duration: {currentTip.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breathing Exercise */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div 
                  className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getMoodColor(currentMood)} 
                             ${isBreathing ? 'animate-breathing' : ''} 
                             flex items-center justify-center shadow-glow`}
                >
                  <div className="text-white font-semibold">
                    {isBreathing ? (
                      <div className="text-center">
                        <div className="text-2xl">{breathCount}</div>
                        <div className="text-xs">breaths</div>
                      </div>
                    ) : (
                      <Heart className="h-8 w-8" />
                    )}
                  </div>
                </div>
                
                {isBreathing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center mt-40">
                      <p className="text-sm text-muted-foreground">
                        {breathCount % 2 === 0 ? 'Breathe in...' : 'Breathe out...'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-center">
                {!isBreathing ? (
                  <Button onClick={startBreathingExercise} variant="wellness">
                    Start Breathing Exercise
                  </Button>
                ) : (
                  <Button onClick={stopBreathingExercise} variant="outline">
                    Stop Exercise
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground">Quick Mindfulness Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gradient-calm p-3 rounded text-sm">
                  <strong>5-4-3-2-1 Grounding:</strong> Notice 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.
                </div>
                <div className="bg-gradient-mood p-3 rounded text-sm">
                  <strong>Mindful Moment:</strong> Pause and take three conscious breaths whenever you feel overwhelmed.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default MeditationTips;