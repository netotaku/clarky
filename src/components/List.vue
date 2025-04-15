<template>
        
    <section class="hero section">        
        <nav>
            <p class="label">Playlists</p>
            <ul>
                <li v-for="item in sitemap" :key="item.slug">
                    <router-link :to="item.slug" :class="{ active: route.path === item.slug }">
                        {{ item.label }}</router-link>
                </li>
            </ul>
        </nav>
    </section>
      
  
      <div class="cards">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="card">

            <a :href="item.url" target="_blank" rel="noopener">
                <img :src="item.thumbnail" :alt="item.title" />
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
    import sitemap from '@/data/sitemap.json'
  
    interface MediaItem {
        url: string
        title: string
        thumbnail: string
        desc: string
        platform: string
        posted_at: string
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
            border-top-left-radius: var(--global-padding);
            border-top-right-radius: var(--global-padding);            
            padding-bottom: 32px; 
            
            &:hover{
                background: purple;
                * {
                    color: white;
                }
                img{
                    // transform: scale(1.05);
                }
            } 
            &:not(:hover){
                // transform: scale(1);
            }         
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

    nav{

    padding-bottom: 22px;
    // padding-right: 44px;
    ul{
        list-style-type: none;
        li{
            a{
                display: block;
                text-decoration: none;
                color: white;
                font-weight: bold;
                font-size: 32px;
                letter-spacing: -1px;
                &:hover, &.active{
                    padding-left: 10px;
                }
                &:hover{
                    border-left: solid 8px purple;
                } 
                &.active{                    
                    border-left: solid 8px #f90;
                }
                
            }
        }
    }
  }

  .hero {
        position: relative;
        width: 100%;
        padding-top: 380px;     
         background-image: url('/img/hero.jpg');
        background-size: cover;
        background-position: center bottom; 
        // display: flex;        
        @media (max-width: 600px) {
            padding-top: 160px; 
            background-position: -290px bottom;
            background-size: auto;
        } 
        .label{
            display: block;
            padding-bottom: 6px;
        }      
    }
    .brand{
        width: 180px;
        height: auto;
    }


</style>
  