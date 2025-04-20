<template>
    <div :id="playerElementId" class="iframe" style="display: none"></div>
    <div v-if="track" class="player">
        <div class="play" @click="media.togglePlay">{{ media.isPlaying ? 'Pause' : 'Play' }}</div>
        <div class="track">

            <div class="title">
                <a :href="track.url" target="_blank"><strong>{{ track.title }}</strong> / {{ track.desc }}</a>
                <span class="time">{{ media.formattedCurrentTime }} / {{ media.formattedDuration }}</span>
            </div> 

            <div class="progress">
              <div class="fill" :style="{ width: media.progressPercent + '%' }"></div>
            </div>

        </div>
        <img :src="track.thumbnail" alt="Track thumbnail" class="thumb" />
    </div>
</template>
  
<script setup lang="ts">
    import { computed, watch, ref, onMounted } from 'vue'
    import { playerState } from '@/stores/playerState'
    import { useMediaPlayer } from '@/components/players/useMediaPlayer'

    const track = computed(() => playerState.currentTrack)

    const media = ref<any>(null)

    const playerElementId = 'media-player'

    watch(track, (newTrack) => {

      console.log('track.source:', track.value?.source)
      
      if (newTrack?.url && newTrack?.source) {  
        console.log('useMediaPlayer called with:', newTrack.source)      
        media.value = useMediaPlayer(newTrack.source, newTrack.url, 'media-player')
        media.value.initPlayer()
      }
    }, { immediate: true })

    //////////

    // const props = defineProps<{
    //     title: string
    //     desc?: string
    //     thumbnail: string
    //     url: string
    //     source: string
    // }>()    

    
    // const media = useMediaPlayer(props.source, props.url, playerElementId)

    // onMounted(() => {
    //   media.initPlayer()      
    // })

    // watch(() => props.url, (newUrl) => {
    //   if (props.source === 'youtube' && media.loadOrSwitchVideo) {
    //     media.loadOrSwitchVideo(newUrl)
    //   }
    // })
  </script>
  
  
  <style scoped lang="scss">


    .player {



      .play{
          height: 90px;
          min-width: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255, .2);
          cursor: pointer;
          &:hover{
              background: #f90;
          }
      }


      .thumb{
          height: 90px;
          width: 90px;      
      }
      
      position: fixed;
      bottom: 22px;
      left: 22px;
      right: 22px;
      
      background-color: rgba(17, 17, 17, 0.6); // dark translucent fallback
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px); // ✅ Safari support

      color: #fff;
      z-index: 1;

      display: flex;
      flex-direction: row;
      
      overflow: hidden;
      border-radius: 22px;
    }
    
    .track {
      margin-bottom: 0.5rem;
      font-size: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 22px;
      padding-left: 22px;
      .title{
          padding-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .time{
            font-family: monospace;
            font-size: 14px;
          }
      }
      a{
          color: #fff;
          text-decoration: none;
          &:hover{
              text-decoration: underline;
          }
      }
    }
    

    
    .progress {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 6px;
      background: rgba(255,255,255,.2);
      border-radius: 3px;
      outline: none;
      cursor: pointer;

      .fill{
        background: rgba(255,255,255,.4);
        height: 6px;
        width: 0%;
        transition: width 0.2s ease;
      }
    }

  </style>
  