<template>
  <div class="bar-chart">
    <div class="title-wrapper">
        <div class="title-wrapper-left">
            <div class="title">当前热卖品类</div>
            <div class="sub-title">Hot Categories</div>
        </div>
        <div class="title-wrapper-right">
            <div class="sub-title">最后更新时间:{{date}} {{time}}</div>
        </div>
    </div>
    <div id="hot-category-chart">
        <vue-echarts
            :options = "options"
        />
    </div>
  </div>
</template>
<script>
    import {ref, watch, onMounted} from 'vue'
    import {clock as useClock} from '../../hooks/useClock'

    export default {
        name:"HotCategory",
        props:{
            data:Object
        },
        setup(props){
            //控制图表切换
            let currentChart = 0
            const options = ref({})
            const update = ()=>{
                function createOption(){
                    const sourceData = []
                    const {data1,data2} = props.data
                    //根据current的值初始化数据
                    if(currentChart == 0 ){
                        data1.axisX.forEach((axis,index)=>{
                            //按列写入
                            sourceData.push([axis,data1.data1[index],data1.data2[index]])
                        })
                    }else{
                        data2.axisX.forEach((axis,index)=>{
                            //按列写入
                            sourceData.push([axis,data2.data1[index],data2.data2[index]])
                        })
                    }
                    const source = [
                        ['指标','国内','国外'],
                        ...sourceData
                    ]

                    return {
                        tooltip:{
                            trigger:'axis',
                            axisPointer:{
                                type:'shadow'
                            }
                        },
                        color:['rgb(209,248,138)','rgba(65,65,65,.5)'],
                        xAxis:{
                            type:'category',
                            splitLine:{show:false},
                            axisTick:{show:false},
                            axisLabel:{
                                color:'rgb(98,105,113)',
                                fontSize:16
                            },
                            axisLine:{
                                onZero:false,
                                lineStyle:{
                                    color:'rgb(124,136,146)'
                                }
                            }
                        },
                        yAxis:{
                            type:'value',
                            splitLine:{
                                lineStyle:{
                                    type:'dotted'
                                }
                            },
                            axisLine:{
                                onZero:false,
                                lineStyle:{
                                    color:'rgb(124,136,146)'
                                }
                            },
                            axisLabel:{
                                color:'rgb(98,105,113)',
                                fontSize:16
                            },
                            axisTick:{show:false}
                        },
                        grid:{
                            left:20,
                            right:0,
                            bottom:30,
                            top:20
                        },
                        dataset:{
                            source
                        },
                        series:[
                            {
                                type:'bar',
                                stack:'total',
                                barWidth:40,
                            },
                            {
                                type:'bar',
                                stack:'total',
                            }
                        ],
                    }
                }
                options.value = createOption() 
            }
            watch(()=>props.data,()=>{
                update()
            })
            onMounted(()=>{
                update()
            })
            
            return {
                options,
                ...useClock()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bar-chart{
        height: 100%;
        width: 100%;
        background: rgb(43,44,46);
        padding: 20px 40px;
        box-sizing: border-box;
        
        .title-wrapper {
            display: flex;
            //不能跟页面布局中的right重复
            .title-wrapper-right{
                flex : 1;
                text-align: right;
            }
            .title {
                font-size: 32px;
            }

            .sub-title {
                font-size: 16px;
                margin-top: 10px;
            }

            
        }
        #hot-category-chart{
            height: 220px;
        }
    }
</style>