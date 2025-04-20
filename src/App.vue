<script setup lang="ts">
  import Hero from '@/components/Hero.vue'
  import Footer from '@/components/Footer.vue'
  import { RouterView } from 'vue-router'
  import MediaPlayer from '@/components/MediaPlayer.vue'
</script>

<template>
  <article>
    <Hero />
    <RouterView />
    <Footer />
    <MediaPlayer />
  </article>
</template>