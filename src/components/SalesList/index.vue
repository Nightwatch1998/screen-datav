<template>
    <div class="sales-list">
        <base-scroll-list
            :config = "config"
        />
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'SalesList',
        props:{
            data:Array
        },
        setup(props){
            const config = ref({})
            const update = () => {
                // console.log(props.data)
                //表头
                let data = []
                const headerIndexData = []
                //数据逻辑处理
                for(let i = 0; i < props.data.length; i++){
                    data[i] = []
                    if(i%2 === 0){
                        headerIndexData[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgb(40,40,40)">
                            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
                            </div>`
                    }else{
                        headerIndexData[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                            <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
                            </div>`
                    }
                    for(let j=0;j<5;j++){
                        let text = ""
                        switch (j){
                            case 0:
                                text = props.data[i].order
                                break
                            case 1:
                                text = props.data[i].shop
                                break
                            case 2:
                                text = props.data[i].rider
                                break
                            case 3:
                                text = props.data[i].newShop
                                break
                            case 4:
                                text = props.data[i].avgOrder
                                break
                            default:
                        }
                        if(j==1 || j==3){
                            data[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
                        }else{
                            data[i].push(`<div>${text}</div>`)
                        }
                    }
                }
                config.value = {
                    headerData: ['城市订单量','店铺数','接单骑手人数','新店铺数量','人均订单量'],//表头内容
                    headerHeight:"55",//表头高度
                    headerFontsize:24,//表头字号
                    headerColor: '#fff',//表头字体颜色
                    headerBg:"rgb(80,80,80)",//表头背景色
                    headerIndexContent:'',//表头序号列的内容
                    headerIndexData,//序号列内容
                    headerIndex:true,//是否展示序号列
                    rowNum:10,
                    rowBg: ['rgb(40,40,40)','rgb(55,55,55)'],//行背景色
                    rowFontsize: 24,//行字号
                    rowColor:'#fff',//行字体颜色
                    aligns: ['center','center','center'],//对齐方式
                    data,
                }

            }
            
            onMounted(()=>{
                update()
            })
            //watch到data的变化后进行一次update
            const stop = watch(()=>props.data,()=>{
                update()
                //停止监听，在data只需更新一次的情况下使用
                stop()
            })

            return {
                config
            }
        }
    }
</script>

<style lang='scss' scoped>
    .sales-list {
        width: 100%;
        height: 100%;
    }
</style>