<template>
    <div class="total-user">
        <div class="title">渔港作业渔船总数</div>
        <div class="sub-title">User Total Count</div>
        <div class="total">
            <vue-count-to 
                :startVal="startVal" 
                :endVal="todayUser" 
                :duration="1000"/>
        </div>
        <div class="percent-text">
            <span class="percent-text-1">
                每日增长率：
                <vue-count-to 
                    :startVal="startPercent1" 
                    :endVal="growthLastDay" 
                    :duration="1000"
                    :decimals="2"
                    suffix="%"
                    />
            </span>
            <span class="percent-text-2">
                每月增长率：
                <vue-count-to 
                    :startVal="startPercent2" 
                    :endVal="growthLastMonth" 
                    :duration="1000"
                    :decimals="2"
                    suffix="%"
                    />
            </span>
        </div>
        <div class="percent">
            <div class="percent-inner-wrapper">
                <div class="percent-inner" :style="{width:`${growthLastDay}%`}"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {ref,watch} from 'vue'

    export default {
        name:'totalUser',
        //接收参数
        props:{
            todayUser:{
                type:Number,
                default:0
            },
            growthLastDay:{
                type:Number,
                default:0
            },
            growthLastMonth:{
                type:Number,
                default:0
            }
        },
        setup(props){
            //vue-count-to的startvalue
            const startVal = ref(0)
            const startPercent1 = ref(0)
            const startPercent2 = ref(0)
            //侦听变量todayUser  watch监听再变量渲染之前
            watch(()=>props.todayUser,(nextValue,prevValue)=>{
                startVal.value = prevValue
            })
            watch(()=>props.growthLastDay,(nextValue,prevValue)=>{
                startPercent1.value = prevValue
            })
            watch(()=>props.growthLastMonth,(nextValue,prevValue)=>{
                startPercent2.value = prevValue
            })
            return {
                startVal,
                startPercent1,
                startPercent2
            }
        }
    }
</script>
<style lang="scss" scoped>
    .total-user {
        width: 100%;
        height: 100%;
        background: rgb(66,68,70);
        box-shadow: 0 10px 10px rgba(0,0,0,.3);
        padding: 20px 40px;
        //内容包含边框
        box-sizing: border-box;
        
        .title{
            font-size: 32px;
        }
        
        .sub-title{
            font-size: 16px;
            letter-spacing: 1px;
            margin-top: 10px;
        }

        .total{
            font-family: DIN;
            font-size: 68px;
            font-weight: bolder;
            letter-spacing: 2px;
            padding: 10px 0;
        }
        .percent-text{
            font-size: 28px;
            font-family: DIN;
            letter-spacing: 2px;
            .percent-text-1{
                color:rgb(197,251,121)
            }
            .percent-text-2{
                color:rgb(99,169,0);
                margin-left: 10px;
            }
        }
        .percent {
            width: 100%;
            height: 20px;
            box-sizing: border-box;
            border:1px solid #fff;
            margin-top: 10px;
            .percent-inner-wrapper{
                height: 100%;
                padding: 2px;
                box-sizing: border-box;
                overflow: hidden;
                .percent-inner{
                    height: 100%;
                    background: rgb(150,150,150);
                    //进度条过渡动画
                    transition:width 1s linear;
                }
            }
        }
    }
</style>