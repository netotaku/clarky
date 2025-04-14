<template>
    <footer class="footer section">
        <ul class="nav">
            <li><a target="_blank" href="https://soundcloud.com/death-pop">Soundcloud</a></li>
            <li><a target="_blank" href="https://www.mixcloud.com/notv/">Mixcloud</a></li>
            <li><a target="_blank" href="https://www.instagram.com/night.of.the.vampire/">Instagram</a></li>
            <li><a target="_blank" href="https://www.threads.net/@clar.ky">Threads</a></li>
            <li><a target="_blank" href="https://www.tiktok.com/@clar.ky">TikTok</a></li>
        </ul>
        <p class="made">Copyright 2025, Made with love by me in Bristol, UK</p>
    </footer>
</template>


<script lang="ts" setup>
  /* No props or logic yet */
</script>

<style lang="scss" scoped>

    .footer{
        position: relative;
        background: #111;
        height: 160px;
        color: #555;
        .made{
            position: absolute;
            bottom: 22px;
        }
        .nav{
            list-style-type: none;
            font-size: 22px;
            font-weight: bold;
            a{
                color: white;
                text-decoration: none;
            }
        }
    }

</style>