// src/players/useMediaPlayer.ts
import { useYouTubePlayer } from './useYouTubePlayer'
// import { useSoundCloudPlayer } from './useSoundCloudPlayer' (coming soon)
// import { useMixcloudPlayer } from './useMixcloudPlayer' (coming soon)

export function useMediaPlayer(source: string, url: string, playerId: string) {
  if (source === 'youtube') {
    const yt = useYouTubePlayer(playerId, url)
    return {
      ...yt,
      loadNewTrack: (newUrl: string) => yt.loadOrSwitchVideo(newUrl)
    }
  }

  // Placeholder examples for future
  // if (source === 'soundcloud') {
  //   return useSoundCloudPlayer(playerId, url)
  // }

  // if (source === 'mixcloud') {
  //   return useMixcloudPlayer(playerId, url)
  // }

  // Fallback stub to prevent errors
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
