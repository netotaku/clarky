<template>
    <div v-if="track" class="player">

      <audio
        id="HTMLPlayer"
        ref="audioRef"
        controls
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="onTimeUpdate"
        @ended="onEnded"
        @play="onPlay"
        @pause="onPause"
        style="display: none;"
      ></audio>

        <div class="play" :class="{ playing: isPlaying, pausing: !isPlaying }" @click="togglePlay">
          <div class="ico"></div>
        </div>
        <div class="track">

            <div class="title">
                <a :href="track.url" target="_blank"><strong>{{ track.title }}</strong> / {{ track.desc }}</a>
                <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
            </div> 

            <div class="progress">
              <div class="fill" :style="{ width: progressPercent + '%' }"></div>
            </div>

        </div>
        <img :src="track.thumbnail" alt="Track thumbnail" class="thumb" />
    </div>
</template>
  
  <script setup lang="ts">
      import { ref, computed, watch, nextTick } from 'vue'
      import { playerState } from '@/stores/playerState'
      
      const audioRef = ref<HTMLAudioElement | null>(null) 
      const track = computed(() => playerState.currentTrack)      
      const currentTime = ref(0)
      const duration = ref(0)
      const progressPercent = ref(0)
      const isPlaying = ref(false)
      
      function calculateProgressPercent(current: number, total: number): number {
        if (total <= 0) return 0
        return (current / total) * 100
      }

      function onLoadedMetadata() {
        if (!audioRef.value) return
        duration.value = audioRef.value.duration
      }

      function onTimeUpdate() {
        if (!audioRef.value) return
        currentTime.value = audioRef.value.currentTime
        progressPercent.value = calculateProgressPercent(
          currentTime.value,
          duration.value
        )
      }

      function onEnded() {
        console.log("track end")
      }

      // Watch for track changes and load new audio
      watch(
        track,
        async (newTrack) => {
          if (!newTrack) return
          // wait until DOM has rendered the <audio> element
          await nextTick()
          if (!audioRef.value) return

          // load & play
          audioRef.value.src = newTrack.audio
          audioRef.value.load()
          audioRef.value.play()
          isPlaying.value    = true
          currentTime.value  = 0
          progressPercent.value = 0
        },
        {
          immediate: true,  // run once on setup if `track` already has a value
          flush: 'post'     // ensure the DOM (and ref) is ready before callback
        }
      )

      function formatTime(sec: number) {
        const m = Math.floor(sec / 60)
        const s = Math.floor(sec % 60)
        return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
      }

      function onPlay()  { isPlaying.value = true }
      function onPause() { isPlaying.value = false }      

      function togglePlay() {
        if (!audioRef.value) return
        if (audioRef.value.paused)  audioRef.value.play()
        else audioRef.value.pause()
      }
    
  </script>
  
  
  <style scoped lang="scss">

    .player {

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
  

      @media (max-width: 600px) {
        top: 12px;
        bottom: auto;
        border-radius: 8px; 
        left: 12px;
        right: 12px;
      }

      .play{
          height: 90px;
          min-width: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255, .2);
          font-size: 32px;
          cursor: pointer;
          pointer-events: auto!important;

          .ico{
            width: 24px;
            height: 26px;
            background: url(/img/playPause.png);
            background-position-x: -24px;
          }

          &.pausing{
            .ico{
              background-position-x: 0px;
            } 
          }

          &:hover{
              background: #f90;
          }
          @media (max-width: 600px) {            
            height: 60px;
            width: 60px;
            min-width: 60px;   
          }
      }

      .thumb{
          height: 90px;
          width: 90px;  
          @media (max-width: 600px) {
            display: none;
          }    
      }
      
    }
    
    .track {
      margin-bottom: 0.5rem;
      font-size: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 22px;


      flex: 1 1 auto; 
      min-width: 0;   
      width: 100%;        

      @media (max-width: 600px) {

      }
      
      .title{

          position: relative;
        
          padding-bottom: 12px;


        
          a{
          
              display: block;
              color: #fff;
              text-decoration: none;

              position: relative;
              overflow: hidden;
              white-space: nowrap;   
              text-overflow: ellipsis;

              margin-right: 110px;
              
              &:hover{
                  text-decoration: underline;
              }
          }
        
          .time{

            font-family: monospace;
            font-size: 14px;
            position: absolute;
            right: 0px;
            top: 2px;
            white-space: nowrap;  
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
  