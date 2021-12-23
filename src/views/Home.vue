<template>
    <div class = "home">
        <imooc-container :options="{width:3840,height:2180}">
            <div class="test">
                111
            </div>
        </imooc-container>
    </div>
</template>
<script>
    export default{
        name:'Home',
        components:{
        }
    } 
</script>
<style lang="scss">
    .test{
        font-size: 140px;
        color:red;
        transform: scale(.5);
    }
</style>