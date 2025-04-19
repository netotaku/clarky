import { ref, computed } from 'vue'

export function useYouTubePlayer(playerElementId: string, videoUrl: string) {
  const ytPlayer = ref<any>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)

  const progressPercent = computed(() => {
    const clampedDuration = duration.value > 0 ? duration.value : 1
    const raw = (currentTime.value / clampedDuration) * 100
    return Math.min(Math.max(raw, 0), 100) // Clamp between 0–100%
  })

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const formattedCurrentTime = computed(() => formatTime(currentTime.value))
  const formattedDuration = computed(() => formatTime(duration.value))

  let timeInterval: number | undefined

  function getYouTubeId(url: string): string | null {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([\w-]{11})/)
    return match ? match[1] : null
  }

  function startTrackingProgress() {
    timeInterval = window.setInterval(() => {
      if (ytPlayer.value?.getCurrentTime) {
        currentTime.value = Math.floor(ytPlayer.value.getCurrentTime())
      }
    }, 500)
  }

  function stopTrackingProgress() {
    if (timeInterval) clearInterval(timeInterval)
  }

  function togglePlay() {
    const state = ytPlayer.value?.getPlayerState?.()
    if (state === 1) {
      ytPlayer.value.pauseVideo()
    } else {
      ytPlayer.value.playVideo()
    }
  }

//   function seekTo(time: number) {
//     ytPlayer.value?.seekTo(time, true)
//   }

function loadOrSwitchVideo(newUrl: string) {
    const newId = getYouTubeId(newUrl)
    if (!ytPlayer.value || !newId) return
  
    ytPlayer.value.loadVideoById(newId)
  
    // 🧠 Poll for updated duration
    const durationCheck = setInterval(() => {
      const d = ytPlayer.value.getDuration()
      if (d && d > 0) {
        duration.value = d
        clearInterval(durationCheck)
      }
    }, 200)
  }
  
  

  function initPlayer() {
    const videoId = getYouTubeId(videoUrl)
    if (!videoId || !window.YT || !window.YT.Player) return

    ytPlayer.value = new YT.Player(playerElementId, {
      videoId,
      events: {
        onReady: () => {
          ytPlayer.value.playVideo()

          const check = setInterval(() => {
            const d = ytPlayer.value.getDuration()
            if (d > 0) {
              duration.value = d
              clearInterval(check)
            }
          }, 200)

          startTrackingProgress()
        },
        onStateChange: (event: any) => {
          const state = event.data
          isPlaying.value = state === 1
        }
      }
    })
  }

  return {
    isPlaying,
    currentTime,
    duration,
    progressPercent,
    togglePlay,
    initPlayer, 
    loadOrSwitchVideo,
    formatTime,
    formattedCurrentTime,
    formattedDuration
  }
}
