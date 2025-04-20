// src/players/useMediaPlayer.ts

export function useMediaPlayer(source: string, url: string, playerId: string) {
  return {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    progressPercent: 0,
    togglePlay: () => {},
    seekTo: () => {},
    initPlayer: () => {},
    formatTime: () => {},
    loadNewTrack: () => {},
    formattedCurrentTime: "00:00",
    formattedDuration: "00:00", 
  }
}
