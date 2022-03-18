<template>
    <div class = "home">
        <imooc-loading v-if="loading">
            <div class="loading-text">数据大屏加载中...</div>
        </imooc-loading>
        <imooc-container  :options="{width:3840,height:2160}" v-else>
            <div class="header">
                <top-header></top-header>
            </div>
            <div class="separator">separator</div>
            <div class="center">
                <div class="left">
                    <div class="left1">
                        <total-user
                            :today-user="todayUser"
                            :growth-last-day="growthLastDay"
                            :growth-last-month="growthLastMonth"
                        />
                    </div>
                    <div class="left2">
                        <average-age
                            :data="ageData"
                            :avgAge="averageAge"
                        />
                    </div>
                    <div class="left3">
                        <total-device
                            :data="deviceData"
                        />
                    </div>
                    <div class="left4">
                        <total-gender
                            :data="genderData"
                        />
                    </div>
                    <div class="left5">
                        <total-rider
                            :data="riderData"
                        />
                    </div>
                    <div class="left6">
                        <hot-category
                            :data="hotCategoryData"
                        />
                    </div>
                </div>
                <div class="right">
                    <div class="right-top1">
                        <center-header
                            :data = "headerData"
                        />
                    </div>
                    <div class="right-top2">
                        <transform-category
                            :data = "['ALL','北京','上海','深圳','杭州','南京','武汉']"
                        />
                    </div>
                    <div class="right-bottom">
                        <div class="right-left">
                            <div class="right-left1">
                                <order-map></order-map>
                            </div>
                            <div class="right-left2">
                                <transform-category
                                    :data = "['订单量','销售额','用户数','退单量']"
                                />
                            </div>
                            <div class="right-left3">
                                <imooc-fly-box starColor="rgb(251,253,142)">
                                    <real-time-order
                                        :data = realTimeOrderData
                                    />
                                </imooc-fly-box>
                            </div>
                            <div class="right-left4">
                                <schedule-view 
                                    :data= scheduleViewData
                                />
                            </div>
                        </div>
                        <div class="right-right">
                            <div class="right-right1">
                                <sales-list
                                    :data= salesListData
                                />
                            </div>
                            <div class="right-right2">
                                <sales-rank
                                    :data= salesRankData
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </imooc-container>
    </div>
</template>
<script>
    import {ref, onMounted} from 'vue'
    import useScreenData from '../hooks/useScreenData'
    import TopHeader from '../components/TopHeader/index'
    import TotalUser from '../components/TotalUser/index'
    import AverageAge from '../components/AverageAge/index'
    import TotalDevice from '../components/TotalDevice/index'
    import TotalGender from '../components/TotalGender/index'
    import TotalRider from '../components/TotalRider/index'
    import HotCategory from '../components/HotCategory/index'
    import CenterHeader from '../components/CenterHeader/index'
    import TransformCategory from '../components/TransformCategory/index'
    import SalesList from '../components/SalesList/index'
    import OrderMap from '../components/OrderMap/index'
    import RealTimeOrder from '../components/RealTimeOrder/index'
    import ScheduleView from '../components/ScheduleView/index'
    import SalesRank from '../components/SalesRank/index'
    import RotatingEarth from '../components/RotatingEarth/index'

    export default{
        name:'Home',
        components:{
            TopHeader,
            TotalUser,
            AverageAge,
            TotalDevice,
            TotalGender,
            TotalRider,
            HotCategory,
            CenterHeader,
            TransformCategory,
            SalesList,
            OrderMap,
            RealTimeOrder,
            ScheduleView,
            RotatingEarth,
            SalesRank
        },
        setup(){
            const loading = ref(true)

            onMounted(()=>{
                setTimeout(()=>{
                    loading.value = false
                },500)
            })
            return {
                loading,
                ...useScreenData()
            }
        }
    } 
</script>
<style lang="scss">
    .home {
        position: relative;
        display: flex;
        flex-direction: column;
        //水平居中
        align-items: center;
        //垂直居中
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgb(29,29,29);
        color: #fff;
        font-size:48px;
        
        #imooc-container {
            display: flex;
            flex-direction: column;
            //水平居中
            align-items: center;
            //垂直居中
            justify-content: center;
        
            .header{
                width: 100%;
                height: 167px;
            }
            .separator{
                width: 100%;
                height: 10px;
                background:rgb(92,88,89);
            }
            .center{
                //撑满布局
                flex:1;
                display: flex;
                width: 100%;
                // background-color: rgb(175, 49, 49);
                .left{
                    flex:0 0 860px;
                    //开启子元素flex布局
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 860px;
                    height: 100%;
                    padding-bottom: 20px;
                    box-sizing: border-box;
                    .left1{
                        height:300px;
                    }
                    .left2{
                        height:320px;
                    }
                    .left3{
                        height:280px;
                    }
                    .left4{
                        height:230px;
                    }
                    .left5{
                        height:360px;
                    }
                    .left6{
                        height:360px;
                    }
                }
                .right{
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;

                    .right-top1{
                        width: 100%;
                        height: 206px;
                    }
                    .right-top2{
                        width: 100%;
                        height: 48px;
                        margin: 10px 0;
                        background: red;
                    }
                    .right-bottom{
                        flex: 1;
                        display: flex;
                        padding-bottom: 20px;
                        .right-left{
                            flex: 0 0 1917px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            width: 1917px;
                            .right-left1{
                                height: 999px;
                            }
                            .right-left2{
                                height: 80px;
                            }
                            .right-left3{
                                height: 350px;
                            }
                            .right-left4{
                                height: 220px;
                            }
                        }
                        .right-right{
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            //间距自动调节
                            justify-self: space-between;
                            margin-left: 10px;
                            margin-right: 20px;
                            .right-right1{
                                width: 100%;
                                height: 999px;
                            }
                            .right-right2{
                                flex: 1;
                                width: 100%;
                                margin-top: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
    .loading-text {
        font-size: 20px;
        margin-top: 10px;
    }
</style>