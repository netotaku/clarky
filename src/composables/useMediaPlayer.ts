// src/composables/useMediaPlayer.ts
import { ref } from 'vue'

type Platform = 'youtube' | 'soundcloud' | 'mixcloud'
type PlayerInstance = any

const currentPlatform = ref<Platform | null>(null)
const player = ref<PlayerInstance | null>(null)

export function useMediaPlayer() {
  async function load(url: string, platform: Platform, elId: string) {
    currentPlatform.value = platform

    if (platform === 'youtube') {
        player.value = new YT.Player(elId, { ... })
      }
      
      if (platform === 'soundcloud') {
        const widget = SC.Widget(document.getElementById(elId) as HTMLElement)
        widget.bind(SC.Widget.Events.READY, () => widget.play())
        player.value = widget
      }
      
      if (platform === 'mixcloud') {
        const widget = window.Mixcloud.PlayerWidget(document.getElementById(elId))
        widget.ready.then(() => widget.play())
        player.value = widget
      }
  }

  function play() {
    if (!player.value) return
    if (currentPlatform.value === 'youtube') player.value.playVideo()
    if (currentPlatform.value === 'soundcloud') player.value.play()
    if (currentPlatform.value === 'mixcloud') player.value.play()
  }

  function pause() {
    if (!player.value) return
    if (currentPlatform.value === 'youtube') player.value.pauseVideo()
    if (currentPlatform.value === 'soundcloud') player.value.pause()
    if (currentPlatform.value === 'mixcloud') player.value.pause()
  }

  return {
    load,
    play,
    pause,
    currentPlatform,
  }
}

// Helpers for loading APIs and parsing
function extractYouTubeId(url: string): string {
  const match = url.match(/v=([^&]+)/)
  return match ? match[1] : ''
}


  
