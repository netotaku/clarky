<template>
    <footer class="footer section">
        <span class="made">Copyright 2025, Bristol UK</span>                
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
        // background: #111;        
       // color: #222;
        display: flex;
        justify-content: space-between;
        .made{
            // padding-top: var(--global-padding);
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