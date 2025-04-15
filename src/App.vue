<script setup lang="ts">
  import Hero from './components/Hero.vue'
  import Footer from './components/Footer.vue'
  import { RouterView } from 'vue-router'
</script>

<template>
  <article>
    <Hero />
    <RouterView />
    <Footer />
  </article>
</template>