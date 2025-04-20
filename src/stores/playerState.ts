import { reactive } from 'vue'

export const playerState = reactive({
  currentTrack: null as null | {
    title: string
    desc?: string
    url: string
    thumbnail: string
    source: string
  }
})
