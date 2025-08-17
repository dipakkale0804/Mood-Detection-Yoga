import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';

interface MoodDetectionProps {
  onMoodDetected: (mood: string) => void;
  currentMood: string | null;
}

const MoodDetection: React.FC<MoodDetectionProps> = ({ onMoodDetected, currentMood }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const simulateMoodDetection = () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      const moods = ['happy', 'calm', 'focused', 'energetic', 'relaxed'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      onMoodDetected(randomMood);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getMoodColor = (mood: string) => {
    const colors = {
      happy: 'bg-yellow-100 border-yellow-300',
      calm: 'bg-blue-100 border-blue-300',
      focused: 'bg-purple-100 border-purple-300',
      energetic: 'bg-orange-100 border-orange-300',
      relaxed: 'bg-green-100 border-green-300'
    };
    return colors[mood as keyof typeof colors] || 'bg-muted border-border';
  };

  return (
    <Card className="p-6 shadow-wellness hover:shadow-float transition-all duration-300">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Mood Detection</h3>
          <p className="text-muted-foreground text-sm">
            Let us capture your current emotional state
          </p>
        </div>

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 bg-muted rounded-lg object-cover"
            style={{ display: isStreaming ? 'block' : 'none' }}
          />
          <canvas
            ref={canvasRef}
            className="hidden"
            width="640"
            height="480"
          />
          
          {!isStreaming && (
            <div className="w-full h-64 bg-gradient-calm rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Camera not active</p>
              </div>
            </div>
          )}

          {currentMood && (
            <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(currentMood)}`}>
              Current mood: {currentMood}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isStreaming ? (
            <Button onClick={startCamera} variant="wellness" className="flex-1">
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="outline" className="flex-1">
              <CameraOff className="mr-2 h-4 w-4" />
              Stop Camera
            </Button>
          )}
          
          <Button 
            onClick={simulateMoodDetection}
            disabled={!isStreaming || isAnalyzing}
            variant="primary"
            className="flex-1"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Detect Mood'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MoodDetection;