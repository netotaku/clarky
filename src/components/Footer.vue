<template>
    <footer class="footer section">   
        <nav>
            <ul>
                <li><a target="_blank" href="https://soundcloud.com/death-pop">Soundcloud</a></li>
                <li><a target="_blank" href="https://www.mixcloud.com/notv/">Mixcloud</a></li>
                <li><a target="_blank" href="https://www.instagram.com/night.of.the.vampire/">Instagram</a></li>
                <li><a target="_blank" href="https://www.threads.net/@clar.ky">Threads</a></li>
                <li><a target="_blank" href="https://www.tiktok.com/@clar.ky">TikTok</a></li>
            </ul>
        </nav> 
        <span class="made"><router-link to="/cookies">Cookies</router-link> / &copy; Copyright 2025. Bristol, UK.</span>          
    </footer>
</template>

<script lang="ts" setup>
  /* No props or logic yet */
</script>

<style lang="scss" scoped>

    .footer{
        position: relative;

        background: #222;

        @media (min-width: 600px) {
            display: flex;
            justify-content: space-between;
        }

        .made{   
            display: block;         
            @media (max-width: 600px) {            
                padding-top: var(--global-padding);
            }
            a{
                color: inherit;
                &:hover{
                    text-decoration: none;
                }
            }
        }
        nav{
            ul{
                @media (min-width: 600px) {
                    display: flex;
                    gap: 10px;
                }
                list-style-type: none;
                font-weight: bold;
                line-height: 1.3;
                li{                    
                    a{
                        color: white;
                        text-decoration: none;
                        &:hover{
                            color: #f90;
                        }
                        font-size: 18px;                        
                    }
                }
            }

        }
    }

</style>