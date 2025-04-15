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
        <span class="made">&copy; Copyright 2025. Bristol, UK</span>          
    </footer>
</template>

<script lang="ts" setup>
  /* No props or logic yet */
</script>

<style lang="scss" scoped>

    .brand{
        
        width: 200px;
        z-index: 1;
       
        right: var(--global-padding);
    }

    .footer{
        position: relative;
        display: flex;
        justify-content: space-between;
        background: #444;
        .made{
            align-self: flex-end;
            // padding-top: var(--global-padding);
        }
        nav{
            ul{
                @media (min-width: 600px) {
                    display: flex;
                    gap: 10px;
                }
                list-style-type: none;
                font-weight: bold;

                li{
                    a{
                        color: white;
                        text-decoration: none;
                        &:hover{
                            color: #f90;
                        }
                    }
                }
            }

        }
    }

</style>