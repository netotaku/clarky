<template>
    <header></header>
    <!-- <header class="hero section">
        <img class="brand" src="/notv-brand.png" />
    </header> -->
</template>
  
<script lang="ts" setup>
  /* No props or logic yet */
</script>

<style lang="scss" scoped>
    .hero {
        width: 100%;
        // height: 75vh;        
        background-image: url('/hero.jpeg');
        background-size: cover;
        background-position: center bottom;        
    }
    .brand{
        width: 180px;
        height: auto;
    }
</style>