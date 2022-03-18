import {ref, onMounted, onUnmounted} from 'vue'
import {screenData} from '../api'

const color = ['rgb(116,166,49)','rgb(190,245,99)','rgb(202,252,137)','rgb(251,253,142)']

export default function(){
    //totaluser组件
    const todayUser = ref(0)
    const growthLastDay = ref(0)
    const growthLastMonth = ref(0)
    //平均年龄组件
    const ageData = ref({})
    const averageAge = ref(0)
    //设备统计组件
    const deviceData = ref({})
    //性别统计组件
    const genderData = ref({})
    //骑手统计组件
    const riderData = ref({})
    //热门分类组件
    const hotCategoryData = ref({})
    //顶部组件
    const headerData = ref({})
    //滑动报表组件
    const salesListData = ref([])
    //实时订单组件
    const realTimeOrderData = ref({date:[],data:[]})
    
    // 区域销售排行组件
    const salesRankData = ref([])

    // 创建一个循环访问接口的任务
    let task
    // 获取核心指标
    const getKeyValues = ({key,index})=>{
        const data = headerData.value
        if(data&& data[key]){
            return +data[key]["value"][index].endVal
        }else{
            return 0
        }
    }

    // 获取当前时间
    const getNowTime = ()=>{
        const now = new Date()
        return `${now.getHours}:${now.getMinutes}:${now.getSeconds}`
    }

    const update = ()=>{
        screenData().then(data=>{
            // 用户总数数据
            todayUser.value = +data.userToday || 0
            growthLastDay.value = +data.userGrowthLastDay || 0
            growthLastMonth.value = +data.userGrowthLastMonth || 0

            // 年龄分布数据
            const _ageData = []
            data.age.forEach((item,index)=>{
                if(ageData.value[index]){
                    _ageData.push({
                        startValue:ageData.value[index].value,
                        value:item.value,
                        axis:item.key,
                        color:color[index]
                    })
                }else{
                    _ageData.push({
                        startValue:0,
                        value:item.value,
                        axis:item.key,
                        color:color[index]
                    })
                }
            })
            // console.log(_ageData)
            ageData.value = _ageData
            averageAge.value = + data.averageAge
            
            // 登陆设备数据
            deviceData.value = {
                totalDevices:data.totalDevices,
                devices:data.devices
            }

            // 性别分布模块
            genderData.value = data.gender

            // 骑手分布数据
            riderData.value = data.rider

            // 热门分类数据
            hotCategoryData.value = data.category

            // 顶部核心指标数据
            const _headerData = {
                "headerData":{
                    "value":[
                        {
                            title:"今日销售额",
                            subTitle:"Today's Sales Amount",
                            startVal: getKeyValues({key:'headerData',index:0}),
                            endVal:data.salesToday,
                            img:"https://www.youbaobao.xyz/datav-res/money.png"
                        },
                        {
                            title:"今日订单量",
                            subTitle:"Today's Total Orders",
                            startVal:getKeyValues({key:'headerData',index:1}),
                            endVal:data.orderToday,
                            img:"https://www.youbaobao.xyz/datav-res/order.png"
                        },
                        {
                            title:"今日交易用户数",
                            subTitle:"Today's Payed Users",
                            startVal:getKeyValues({key:'headerData',index:2}),
                            endVal:data.orderUser,
                            img:"https://www.youbaobao.xyz/datav-res/member.png"
                        },
                        {
                            title:"今日新增用户数",
                            subTitle:"Today's New Users",
                            startVal:getKeyValues({key:'headerData',index:3}),
                            endVal:data.userToday,
                            img:"https://www.youbaobao.xyz/datav-res/follow.png"
                        }
                    ]
                },
                "project":{
                    "value":[
                        {
                            title:"转化率",
                            value:`${data.covertRate}%`,
                            img:"https://www.youbaobao.xyz/datav-res/success.png"
                        },
                        {
                            title:"退单率",
                            value:`${data.returnRate}%`,
                            img:"https://www.youbaobao.xyz/datav-res/failed.png"
                        }
                    ]
                }
            }
            headerData.value = _headerData

            // 实时订单趋势图
            realTimeOrderData.value = {
                date:[...realTimeOrderData.value.date,getNowTime()],
                data:[...realTimeOrderData.value.data,data.realTimeOrder]
            }

            // 滑动销售列表
            salesListData.value = data.areaSales

            // 区域销售排行
            salesRankData.value = data.areaTop
        })
    }
    //数据更新逻辑
    onMounted(() => {
        update()
        task = setInterval(() => {
            update()
        }, 3000);
        // task = setInterval(()=>{
        //     todayUser.value += 10
        //     growthLastDay.value += 1
        //     growthLastMonth.value += 1
        //     averageAge.value += 1
        //     //浅拷贝方式赋值
        //     const _ageData = [...ageData.value]
        //     _ageData.forEach(item => {
        //         item.startValue = item.value
        //         item.value = item.value + random(100)
        //     })
        //     ageData.value = _ageData

        //     //对对象浅拷贝需要用{}
        //     const _deviceData = {...deviceData.value}
        //     _deviceData.totalDevices += random(100)
        //     _deviceData.devices.forEach(item => {
        //         item.value += random(100)
        //     })
        //     deviceData.value = _deviceData

        //     const _genderData = [...genderData.value]
        //     _genderData.forEach(item => {
        //         item.value += random(100)
        //     })
        //     genderData.value = _genderData

        //     const _riderData = {...riderData.value}
        //     _riderData.orderData.data1 = _riderData.orderData.data1.map(item => {
        //         item = item + random(5)
        //         return item
        //     })
        //     _riderData.orderData.data2 = _riderData.orderData.data2.map(item => {
        //         item = item + random(5)
        //         return item
        //     })
        //     _riderData.rateData.data1 = _riderData.rateData.data1.map(item => {
        //         item = item + random(5)
        //         return item
        //     })
        //     _riderData.rateData.data2 = _riderData.rateData.data2.map(item => {
        //         item = item + random(5)
        //         return item
        //     })
        //     riderData.value = _riderData
        // },3000)
    })
    onUnmounted(()=>{
        //如果task为true, 则执行
        task && clearInterval(task)
    })

    return {
        todayUser,
        growthLastDay,
        growthLastMonth,
        ageData,
        averageAge,
        deviceData,
        genderData,
        riderData,
        hotCategoryData,
        headerData,
        salesListData,
        realTimeOrderData,
        salesRankData
    }
}