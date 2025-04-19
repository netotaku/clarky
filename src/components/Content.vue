<template>    
    <div class="content" v-html="html" />
</template>
  
<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'

    const props = defineProps<{
        path: string
        title?: string
    }>()

    const html = ref('')

    const loadHtml = async () => {
    const res = await fetch(props.path)
    html.value = await res.text()
    }

    onMounted(loadHtml)

    watch(() => props.path, loadHtml)

</script>
  
<style lang="scss">
    .content{
        h1{
            font-size: 32px;
            padding: var(--global-padding);
            background: #222;
            letter-spacing: -1px;
        }
    }

    .typography{        
        line-height: 1.6;
        max-width: 800px;
        h1, h2, h3{
            letter-spacing: -1px;
        }
        h2, p, ul, ol{
            margin-bottom: 22px;
        }
        ul{
            margin-left: 22px;
        }
        a{
            color: inherit;
            &:hover{
                text-decoration: none;
            }
        }
        .updated{
            margin-bottom: 0px;
            font-style: italic;
        }
    }

</style>
  