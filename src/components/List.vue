<template>        
    <div class="cards">
        <div 
            v-for="item in filteredItems" 
            :key="item.url" 
            :class="['card', { selected: activeItem?.url === item.url }]">
            <a :href="item.url" target="_blank" rel="noopener"  @click.prevent="openPlayer(item)">
                <img :src="item.thumbnail" :alt="item.title" />
                <div class="card__desc">
                    <small>{{ item.platform }}</small>
                    <h3><strong>{{ item.title }}</strong><br />{{ item.desc }}</h3>                        
                </div>
            </a>

        </div>
    </div>
    <MediaPlayer
        v-if="activeItem"
        :title="activeItem.title"
        :desc="activeItem.desc"
        :thumbnail="activeItem.thumbnail"
        :url="activeItem.url"
        :source="activeItem.source"
    />
</template>
  
<script lang="ts" setup>

    import { ref, computed } from 'vue'
    import media from '@/data/media.json'

    import { useRoute } from 'vue-router'
    const route = useRoute()

    import MediaPlayer from '@/components/MediaPlayer.vue'
    const activeItem = ref<MediaItem | null>(null)

    const openPlayer = (item: MediaItem) => {
        activeItem.value = item
    }
  
    interface MediaItem {
        url: string
        title: string
        thumbnail: string
        desc: string
        platform: string
        posted_at: string
        source: string
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
                background: purple;
                * {
                    color: white;
                }
            }
        }

        &__desc{
            padding: var(--global-padding);
        }

        a {
            display: block;
            height: 100%; // ensures it fills the card
            padding: 0px;
            color: inherit;
            text-decoration: none;   
            background: #111;
            
            position: relative;
            overflow: hidden;
            border-top-left-radius: 22px;
            border-top-right-radius: 22px;            
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
  