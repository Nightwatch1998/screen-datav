<template>
    <div class="flight-earth">
        <vue-echarts :options="options"></vue-echarts>
    </div>
</template>

<script>
    import {ref, onMounted} from 'vue'
    import 'echarts-gl'
    //打包后会指向public目录下
    const ROOT_PATH = './'

    export default {
        name:'FlightEarth',
        components: {},
        setup(props){
            const options = ref({})
            const update = ()=>{
                fetch('http://www.youbaobao.xyz/datav-res/datav/flights.json')
                    .then(response=>response.json())
                    .then(data=>{
                        //所有机场坐标
                        const airports = data.airports.map(function (item) {
                            return {
                                coord: [item[3], item[4]]
                            };
                        });
                        console.log(data,airports)
                        //根据ID查询机场坐标
                        function getAirportCoord(idx) {
                            return [data.airports[idx][3], data.airports[idx][4]];
                        }
                        // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
                        const routesGroupByAirline = {};
                        //route[0]是航线类别
                        data.routes.forEach(function (route) {
                            const airline = data.airlines[route[0]];
                            const airlineName = airline[0];
                            if (!routesGroupByAirline[airlineName]) {
                            routesGroupByAirline[airlineName] = [];
                            }
                            routesGroupByAirline[airlineName].push(route);
                        });
                        //所有航线的起始机场位置
                        const pointsData = [];
                        data.routes.forEach(function (airline) {
                            pointsData.push(getAirportCoord(airline[1]));
                            pointsData.push(getAirportCoord(airline[2]));
                        });
                        const series = data.airlines
                            .map(function (airline) {
                                var airlineName = airline[0];
                                var routes = routesGroupByAirline[airlineName];
                                if (!routes) {
                                    return null;
                                }
                                return {
                                    type: 'lines3D',
                                    name: airlineName,
                                    effect: {
                                        show: true,
                                        trailWidth: 2,
                                        trailLength: 0.15,
                                        trailOpacity: 1,
                                        trailColor: 'rgb(30, 30, 60)'
                                    },
                                    lineStyle: {
                                        width: 1,
                                        color: 'rgb(50, 50, 150)',
                                        // color: 'rgb(118, 233, 241)',
                                        opacity: 0.1
                                    },
                                    blendMode: 'lighter',
                                    data: routes.map(function (item) {
                                        return [airports[item[1]].coord, airports[item[2]].coord];
                                    })
                                };
                            })
                            .filter(function (series) {
                                return !!series;
                            });
                        series.push({
                            type: 'scatter3D',
                            coordinateSystem: 'globe',
                            blendMode: 'lighter',
                            symbolSize: 2,
                            itemStyle: {
                            color: 'rgb(50, 50, 150)',
                            opacity: 0.2
                            },
                            data: pointsData
                        });
                        options.value = {
                            legend: {
                                selectedMode: 'single',
                                left: 'left',
                                data: Object.keys(routesGroupByAirline),
                                orient: 'vertical',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            globe: {
                                environment: ROOT_PATH + 'assets/starfield.jpg',
                                baseTexture:`${ROOT_PATH}assets/datav-gl-texture.jpg`,
                                heightTexture:
                                    ROOT_PATH + 'assets/bathymetry_bw_composite_4k.jpg',
                                displacementScale: 0.1,
                                displacementQuality: 'high',
                                // baseColor: '#000',
                                shading: 'realistic',
                                realisticMaterial: {
                                    roughness: 0.2,
                                    metalness: 0
                                },
                                postEffect: {
                                    enable: true,
                                    depthOfField: {
                                    enable: false,
                                    focalDistance: 150
                                    }
                                },
                                temporalSuperSampling: {
                                    enable: true
                                },
                                light: {
                                    ambient: {
                                    intensity: 0
                                    },
                                    main: {
                                    intensity: 0.1,
                                    shadow: false
                                    },
                                    ambientCubemap: {
                                    texture: ROOT_PATH + 'assets/lake.hdr',
                                    exposure: 1,
                                    diffuseIntensity: 0.5,
                                    specularIntensity: 2
                                    }
                                },
                                viewControl: {
                                    autoRotate: false
                                },
                                silent: true
                            },
                            series: series
                        };
                        // window.addEventListener('keydown', function () {
                        //     series.forEach(function (series, idx) {
                        //         myChart.dispatchAction({
                        //             type: 'lines3DToggleEffect',
                        //             seriesIndex: idx
                        //         });
                        //     });
                        // });
                });
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
    .flight-earth{
        width: 100%;
        height: 100%;
    }
</style>