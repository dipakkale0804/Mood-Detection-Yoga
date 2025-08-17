import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  mood: string;
  duration: number;
  url: string; // In a real app, this would be actual audio files
}

interface MusicPlayerProps {
  currentMood: string | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentMood }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample tracks for different moods
  const trackDatabase: Track[] = [
    { id: '1', title: 'Sunrise Meditation', artist: 'Nature Sounds', mood: 'calm', duration: 180, url: '' },
    { id: '2', title: 'Ocean Waves', artist: 'Peaceful Mind', mood: 'relaxed', duration: 240, url: '' },
    { id: '3', title: 'Uplifting Journey', artist: 'Joyful Beats', mood: 'happy', duration: 200, url: '' },
    { id: '4', title: 'Focus Flow', artist: 'Deep Work', mood: 'focused', duration: 300, url: '' },
    { id: '5', title: 'Energy Boost', artist: 'Active Life', mood: 'energetic', duration: 180, url: '' },
  ];

  const getMoodTracks = (mood: string | null) => {
    if (!mood) return trackDatabase.slice(0, 3);
    return trackDatabase.filter(track => track.mood === mood);
  };

  const currentPlaylist = getMoodTracks(currentMood);
  const currentTrack = currentPlaylist[currentTrackIndex] || currentPlaylist[0];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => 
      prev < currentPlaylist.length - 1 ? prev + 1 : 0
    );
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prev) => 
      prev > 0 ? prev - 1 : currentPlaylist.length - 1
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const getMoodGradient = (mood: string | null) => {
    const gradients = {
      happy: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      calm: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      focused: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      energetic: 'bg-gradient-to-br from-orange-100 to-red-100',
      relaxed: 'bg-gradient-to-br from-green-100 to-emerald-100'
    };
    return gradients[mood as keyof typeof gradients] || 'bg-gradient-calm';
  };

  return (
    <Card className="p-6 shadow-wellness hover:shadow-float transition-all duration-300">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Music Player</h3>
          <p className="text-muted-foreground text-sm">
            {currentMood ? `Playing ${currentMood} music` : 'Select a mood to play curated music'}
          </p>
        </div>

        {currentTrack && (
          <>
            {/* Album Art Placeholder */}
            <div className={`w-full h-48 rounded-lg ${getMoodGradient(currentMood)} flex items-center justify-center animate-pulse-gentle`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">{currentTrack.title}</h4>
                <p className="text-muted-foreground">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={currentTrack.duration}
                step={1}
                onValueChange={(value) => setCurrentTime(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="icon" onClick={previousTrack}>
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="wellness" 
                size="icon" 
                className="h-12 w-12" 
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button variant="outline" size="icon" onClick={nextTrack}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-10">{volume}%</span>
            </div>
          </>
        )}

        {/* Playlist */}
        {currentPlaylist.length > 1 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 text-sm text-muted-foreground">Up Next</h4>
            <div className="space-y-2">
              {currentPlaylist.slice(currentTrackIndex + 1, currentTrackIndex + 4).map((track, index) => (
                <div key={track.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p className="text-muted-foreground">{track.artist}</p>
                  </div>
                  <span className="text-muted-foreground">{formatTime(track.duration)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MusicPlayer;