<template>
    <div class="rotating-earth">
        <vue-echarts :options="options"></vue-echarts>
    </div>
</template>

<script>
    import {ref, onMounted} from 'vue'
    import 'echarts-gl'
    //打包后会指向public目录下
    const ROOT_PATH = './'

    export default {
        name:'RotatingEarth',
        components: {},
        props: {},
        setup(props){
            const options = ref({})
            const update = ()=>{
                options.value = {
                    globe:{
                        //基础纹理贴图
                        baseTexture:`${ROOT_PATH}assets/datav-gl-texture.jpg`,
                        //高度纹理贴图
                        heightTexture:`${ROOT_PATH}assets/datav-gl-texture.jpg`,
                        //背景环境贴图
                        environment:`${ROOT_PATH}assets/star-bg.jpg`,
                        //地球顶点位移大小
                        displacementScale:0.01,
                        //三维图形着色效果
                        shading:'realistic',
                        //地球表面光滑程度
                        realisticMaterial:{
                            roughness :0.8
                        },
                        //后处理特效
                        postEffect:{
                            enable:true
                        },
                        //光源
                        light:{
                            main:{
                                intensity:1,
                                shadow:true
                            }
                        }

                    }
                }
            }
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                update()
            })
            return {
                options
            }
        }
    }
</script>

<style lang='scss' scoped>
    .rotating-earth{
        width: 100%;
        height: 100%;
    }
</style>