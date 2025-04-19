<template>
    <div class="player">
        <div class="play" @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</div>
        <div class="track">

            <div class="title">
                <a :href="url"><strong>{{ title }}</strong> / {{ desc }}</a></div> 

            <input
                type="range"
                :value="currentTime"
                :max="duration"
                @input="onSeek"
                :style="{
                    '--progress': (currentTime / duration) * 100 + '%'
                }"
            />

        </div>
        <img :src="thumbnail" alt="Track thumbnail" class="thumb" />
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue'
    
    const isPlaying = ref(false)
    const currentTime = 30 //ref(0)
    const duration = 240 // 4 min
    
    defineProps<{
        title: string
        desc?: string
        thumbnail: string
        url: string
    }>()
    
    function togglePlay() {
        isPlaying.value = !isPlaying.value
    }
    
    function onSeek() {
        // Placeholder
    }
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
    }
    a{
        color: #fff;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
  }
  
  .controls {
    // display: flex;
    // align-items: center;
    // gap: 1rem;
  }
  
  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background: rgba(0,0,0,.2);
    border-radius: 3px;
    outline: none;
    cursor: pointer;

  // Webkit (Chrome, Safari)
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    // height: 14px;
    // width: 14px;
    background: #fff;
    // border-radius: 50%;
    // border: 2px solid #aaa;
    // margin-top: -4px; // aligns thumb vertically
  }

  &::-webkit-slider-runnable-track {
    height: 6px;
    //background: linear-gradient(to right, #eee var(--progress, 0%), #333 var(--progress, 0%));
    border-radius: 3px;
  }
}

  </style>
  