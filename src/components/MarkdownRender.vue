<!-- src/components/MarkdownRender.vue -->
<template>
  <div v-if="html" class="typography" v-html="html" />
</template>
  
  <script lang="ts" setup>
  import { ref, watchEffect } from 'vue'
  import { useMarkdownFragment } from '@/utils/useMarkdownFragment'
  
  const props = defineProps<{
    path: string
  }>()

  console.log(props.path)
  
  const html = ref<string>('')
  const meta = ref<Record<string, any>>({})
  
  watchEffect(async () => {
    if (props.path) {
      const res = await useMarkdownFragment(props.path)
      html.value = res.html
      meta.value = res.meta
    }
  })
  </script>
  
  <style scoped>

  </style>
  