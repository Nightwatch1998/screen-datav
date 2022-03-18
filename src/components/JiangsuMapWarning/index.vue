<template>
    <div style="width:100%;height:100%">
        <vue-echarts :options="options"></vue-echarts>
    </div>
</template>

<script>
    import {ref, watch, onMounted, onUnmounted} from 'vue'
    import cloneDeep from 'lodash/cloneDeep'
    import * as echarts from 'echarts'

    export default {
        name:'JiangsuMapWarning',
        components: {},
        props: {},
        setup(props){
            const options = ref({})
            //定时器
            let timer = null
            const update = ()=>{
                //获取geojson并渲染
                fetch('http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
                    .then(response => response.json())
                    .then(data => {
                        //从数据中获取城市中心点坐标
                        const center = []
                        data.features.forEach((item)=>{
                            if(item.properties){
                                center.push({
                                    key:item.properties.name,
                                    value:item.properties.center
                                })
                            }
                        })
                        echarts.registerMap('jiangsu',data)//注册地图
                        // console.log(echarts.getMap('jiangsu'))
                        options.value = {
                            visualMap:{
                                show: true,
                                max: 100,
                                inRange:{
                                    color:['#a5dcf4','#006edd']
                                }
                            },
                            geo:[{
                                map:'jiangsu',//使用自定义地图
                                zoom: 1,
                                roam: false ,//启用鼠标滚轮地图缩放
                                scaleLimit: {
                                    min: 0,
                                    max: 3
                                },
                                itemStyle:{
                                    areaColor:'#013c62',
                                    shadowColor:'#013c62',
                                    shadowBlur: 20,
                                    shadowOffsetX: -5,
                                    shadowOffsetY: 15,
                                }
                            }],
                            series:[
                            {
                                type: 'map',
                                mapType: 'jiangsu',
                                zoom: 1,
                                roam: false,
                                label:{
                                    show :true,
                                    color: '#fff',
                                    emphasis: {
                                        color:'#fff',
                                        show: false
                                    }
                                },
                                itemStyle:{
                                    normal: {
                                        borderColor: '#2980d9',
                                        borderWidth: 1,
                                        areaColor: '#12235c'
                                    },
                                    emphasis:{
                                        areaColor:'#fa8c16',
                                        borderWidth: 0
                                    }
                                },
                                data: center.map(centerItem=>{
                                    const key = centerItem.key
                                    const value = Math.random()*100 //人口数（单位：万）
                                    return {
                                        name: key,
                                        value
                                    }
                                })
                            },
                            {
                                type:'effectScatter',
                                coordinateSystem: 'geo',
                                data:[{
                                    value:center[0].value,
                                    city: center[0].key
                                }],
                                symbolSize:14,
                                itemStyle:{
                                    color:'#feae21'
                                },
                                label:{
                                    normal:{
                                        show:true,
                                        position:'top',
                                        formatter:function(params){
                                            return `{title|${params.data.city}}\n{content|发生xx事件}`
                                        },
                                        backgroundColor:'rgba(254,174,33,.9)',
                                        padding: [0,0],
                                        borderRadius: 3,
                                        lineHeight: 32,
                                        color:'#fff',
                                        rich:{
                                            title:{
                                                padding:[10,10,0,10],
                                                color:'#fff'
                                            },
                                            content:{
                                                padding:[0,10,10,10],
                                                color:'#fff'
                                            }
                                        }
                                    },
                                    emphasis:{
                                        show:true,
                                    }
                                }
                            },
                            {
                                type:'effectScatter',
                                coordinateSystem: 'geo',
                                data:[{
                                    value:center[0].value,
                                    city: center[0].key
                                }],
                                symbolSize:14,
                                itemStyle:{
                                    color:'#e93f42'
                                },
                                label:{
                                    normal:{
                                        show:true,
                                        position:'top',
                                        formatter:function(params){
                                            return `{title|${params.data.city}}\n{content|发生xx事件}`
                                        },
                                        backgroundColor:'rgba(233,63,66,.9)',
                                        padding: [0,0],
                                        borderRadius: 3,
                                        lineHeight: 32,
                                        color:'#fff',
                                        rich:{
                                            title:{
                                                padding:[10,10,0,10],
                                                color:'#fff'
                                            },
                                            content:{
                                                padding:[0,10,10,10],
                                                color:'#fff'
                                            }
                                        }
                                    },
                                    emphasis:{
                                        show:true,
                                    }
                                }
                            },
                            {
                                type:'effectScatter',
                                coordinateSystem: 'geo',
                                data:[{
                                    value:center[0].value,
                                    city: center[0].key
                                }],
                                symbolSize:14,
                                itemStyle:{
                                    color:'#08baec'
                                },
                                label:{
                                    normal:{
                                        show:true,
                                        position:'top',
                                        formatter:function(params){
                                            return `{title|${params.data.city}}\n{content|发生xx事件}`
                                        },
                                        backgroundColor:'rgba(8,186,236,.9)',
                                        padding: [0,0],
                                        borderRadius: 3,
                                        lineHeight: 32,
                                        color:'#fff',
                                        rich:{
                                            title:{
                                                padding:[10,10,0,10],
                                                color:'#fff'
                                            },
                                            content:{
                                                padding:[0,10,10,10],
                                                color:'#fff'
                                            }
                                        }
                                    },
                                    emphasis:{
                                        show:true,
                                    }
                                }
                            }]
                        }
                        //测试：随机展示事件信息
                        timer = setInterval(()=>{
                            const _options = cloneDeep(options.value)
                            for(let i=1;i<4;i++){
                                _options.series[i].data = []
                            }
                            //生成城市随机数
                            const cityLength = center.length
                            const cityIndex = Math.floor(Math.random()*cityLength)
                            const eventIndex = Math.floor(Math.random()*3) + 1
                            _options.series[eventIndex].data = [{
                                city: center[cityIndex].key,
                                value: center[cityIndex].value
                            }]
                            options.value = _options
                        },2000)
                        timer()
                    })
            }
            onMounted(() => {
                update()
            })
            onUnmounted(() => {
                timer && clearInterval(timer)
            })
            return {
                options
            }
        }
    }
</script>

<style lang='scss' scoped>

</style>