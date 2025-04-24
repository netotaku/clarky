<template>        
    <div class="cards">
        <div 
            v-for="item in filteredItems" 
            :key="item.url" 
            :class="['card', { selected: playerState.currentTrack?.url === item.url }]">
            <a :href="item.url" target="_blank" rel="noopener"  @click.prevent="playTrack(item)">
                <div class="cover">
                    <img :src="item.thumbnail" :alt="item.title" />
                    <span class="label">Playing</span>
                </div>
                <div class="card__desc">
                    <small>{{ item.platform }}</small>
                    <h3><strong>{{ item.title }}</strong><br />{{ item.desc }}</h3>                        
                </div>
            </a>

        </div>
    </div>
</template>
  
<script lang="ts" setup>

    import { ref, computed } from 'vue'
    import media from '@/data/media.json'

    import { useRoute } from 'vue-router'
    const route = useRoute()

    import { playerState } from '@/stores/playerState'

    function playTrack(item: MediaItem) {
        playerState.currentTrack = {
            platform: item.platform,
            title: item.title,
            desc: item.desc,
            url: item.url,
            thumbnail: item.thumbnail,
            audio: item.audio
        }
    }
  
    interface MediaItem {
        url: string
        title: string
        thumbnail: string
        desc: string
        platform: string        
        audio: string
    }
  
    const items = ref(media as MediaItem[])
    const platformFromRoute = computed(() => {
        return route.params.platform ?? 'all'
    })
    
    const filteredItems = computed(() => {
        if (platformFromRoute.value === 'all') return items.value
            return items.value.filter(item => item.platform === platformFromRoute.value)
    })

</script>
  
<style lang="scss" scoped>

    .label{
        display: none;
        padding: 6px 12px;
        background: #f60;
        color: white;
        font-weight: bold;
        font-size: 12px;
        position: absolute;
        top: 0px;
        right: 0px;
        overflow: hidden;
        border-bottom-left-radius: 8px;        
    }

  .cards{

    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    .card{
        line-height: 1.5;
        margin-top: -22px;

        transition: margin-top 0.3s ease;

        &.selected, 
        &:hover{
            margin-top: -44px; 
            a{
                background: #f60;
                * {
                    color: white;
                }
            }
            
        }

        &.selected{
            .label{
                display: inline-block;
            }
        }

        &__desc{
            padding: var(--global-padding);
        }

        a {
           position: relative;
           overflow: hidden;
            height: 100%;
            padding: 0px;
            color: inherit;
            text-decoration: none;   
            background: #111;
            
            display: block;         
            border-radius: 22px 22px 0 0;
            
            padding-bottom: 32px; 
      
        }
        h3 {
            margin: 0px;                                 
            font-size: 1rem;  
            font-weight: normal;  
            padding: 0px;
            padding-top: 0px;        
        }
        small {                        
            display: block;            
            color: #888; 
            padding: 0px;
            padding-bottom: 0px;          
        }
        img {
            width: 100%;
            object-fit: cover;
            aspect-ratio: 1 / 1;
            transition: transform 0.2s ease-in-out;
            will-change: transform;
        }
    }
  }

</style>
  