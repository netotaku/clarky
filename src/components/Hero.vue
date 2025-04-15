<template>
  <section class="hero section">     
        <nav>
            <p class="label">About</p>
            <ul>
                <li>
                    <router-link to="/bio" :class="{ active: route.path === '/bio' }">Bio</router-link></li>
                <li>
                    <a target="_blank" href="https://supply.teemill.com/product/night-of-the-vampire-boyfriend-t-shirt/">Merch</a></li>
            </ul>
        </nav>   
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
</template>
  
<script lang="ts" setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()
    import sitemap from '@/data/categories.json'
</script>

<style lang="scss" scoped>
    nav {

        padding-bottom: 22px;

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
            background-position: -390px bottom;
            background-size: 1200px;            
        }
        @media (max-width: 320px) {            
            background-position: -477px bottom;                     
        }  
        .label{
            display: block;
            padding-bottom: 6px;
        }      
    }

</style>