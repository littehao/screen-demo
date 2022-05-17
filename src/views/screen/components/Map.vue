<template>
  <div ref="map" class="echarts-map" style="width:100%;height:100%" />
</template>
<script>
  import { mapGetters } from 'vuex'
  import china from './china.json'
  export default {
    data() {
      return {
        mapEcharts: null,
        chinaData: null,
        dataList: [],
        mapName: '中国'
      }
    },
    computed: {
      ...mapGetters(['getTheme'])
    },
    watch: {
      getTheme(val) { // 监听主题切换
        this.changeTheme()
      }
    },
    mounted() {
      this.changeTheme()
      // this.getMap('100000')
      // 根据窗口变化自动调节图表大小
      window.addEventListener('resize', this.changeSize)
    },
    beforeDestroy() {
      console.log('销毁')
      this.mapEcharts && this.mapEcharts.dispose()
      window.removeEventListener('resize', this.changeSize)
    },
    methods: {
      getMap(code) {
        fetch(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`).then(res => {
          return res.json()
        }).then(data => {
          console.log(data)
          this.chinaData = data
          this.changeTheme()
        })
      },
      changeTheme() {
        if (this.getTheme === 'green-theme') {
          this.borderColor = 'rgba(0, 150, 135, 1)'
          this.shadowColor = 'rgba(0, 150, 135, 0.5)'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(0, 150, 135, 0.4)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 150, 135, 0)' // 100% 处的颜色
            }
          ]
        } else if (this.getTheme === 'blue-theme') {
          this.borderColor = 'rgba(18, 47, 133, 1)'
          this.shadowColor = 'rgba(18, 47, 133, 0.5)'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(18, 47, 133, 0.4)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(18, 47, 133, 0)' // 100% 处的颜色
            }
          ]
        } else if (this.getTheme === 'red-theme') {
          this.borderColor = 'rgba(174, 55, 55, 1)'
          this.shadowColor = 'rgba(174, 55, 55, 0.5)'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(174, 55, 55, 0.4)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(174, 55, 55, 0)' // 100% 处的颜色
            }
          ]
        } else {
          this.borderColor = 'rgba(104, 152, 190, 1)'
          this.shadowColor = '#020721'
          this.colorStops = [
            {
              offset: 0,
              color: '#020721' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#122f85' // 100% 处的颜色
            }
          ]
        }
        this.initMap()
      },
      initMap() {
        this.mapEcharts = this.$echarts.init(this.$refs.map)
        var data = {
          nodes: [
            {
              id: '0',
              name: '郑州',
              value: 100, // 扩散的大小
              level: 1,
              adcode: '410100',
              to: '北京'
            },
            {
              id: '1',
              name: '北京',
              value: 100,
              level: 2,
              adcode: '110000',
              to: '青海'
            },
            {
              id: '5',
              name: '香港',
              value: 100,
              level: 4,
              adcode: '810000',
              to: '北京'
            },
            {
              id: '2',
              name: '上海',
              value: 100,
              level: 3,
              adcode: '310000',
              to: '郑州'
            },
            {
              id: '3',
              name: '青海',
              value: 55,
              level: 4,
              adcode: '630000',
              to: '西藏'
            },
            {
              id: '4',
              name: '西藏',
              value: 88,
              level: 1,
              adcode: '540000',
              to: '北京'
            }
          ]
        }
        var geoCoordMap = {
          '郑州': [113.649638, 34.75659],
          '香港': [114.186133, 22.29343],
          '北京': [116.395645, 39.92998],
          '上海': [121.487884, 31.24910],
          '青海': [101.795767, 36.624404],
          '西藏': [91.153508, 29.627235]
        }

        var convertData = function(data) {
          const res = []
          for (let i = 0; i < data.length; i++) {
            const dataItem = data[i]
            const fromCoord = geoCoordMap[dataItem.name] // 始发地
            const toCoord = geoCoordMap[dataItem.to] // 目的地
            var geoCoord = geoCoordMap[dataItem.name]
            if (fromCoord && toCoord) {
              res.push({
                name: dataItem.name,
                value: geoCoord.concat(dataItem.value),
                level: dataItem.level,
                adcode: dataItem.adcode,
                fromName: dataItem.name,
                toName: dataItem.to,
                coords: [fromCoord, toCoord] // 一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
              })
            }
          }
          return res
        }
        const colorList = ['#FF0000', '#CC6600', '#009900', '#3399FF']
        // 加载效果
        this.mapEcharts.showLoading()
        // 注册地图
        this.$echarts.registerMap(this.mapName, china)

        // 配置项
        const options = {
          tooltip: {
            trigger: 'item'
          },
          geo: {
            top: '25%',
            map: this.mapName, // 地图类型。
            zoom: 1.6,
            roam: true,
            animation: false,
            // 地图样式
            itemStyle: {
              // 区域样式
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 3,
                colorStops: this.colorStops,
                globalCoord: false // 缺省为 false
              },
              borderWidth: 2, // 边框大小
              borderColor: this.borderColor, // 边框样式
              shadowColor: this.shadowColor, // 阴影颜色
              shadowOffsetX: -2, // 阴影水平方向上的偏移距离
              shadowOffsetY: 2, // 阴影垂直方向上的偏移距离
              shadowBlur: 10 // 文字块的背景阴影长度
            },
            // 选中状态下样式
            emphasis: {
              label: {
                color: '#ffffff'
              },
              itemStyle: {
                areaColor: '#a5d4fe'
              }
            }
          },
          series: [
            {
              type: 'lines',
              zlevel: 1,
              symbol: ['none', 'none'],
              lineStyle: {
                normal: {
                  width: 2,
                  curveness: 0.4,
                  color: this.borderColor
                }
              },
              tooltip: {
                show: true
              },
              emphasis: {
                focus: 'series',
                blurScope: 'coordinateSystem'
              },
              data: convertData(data.nodes)
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.nodes.sort(function(a, b) {
                return b.value - a.value
              }).slice(0, 6)),
              encode: {
                value: 2
              },
              symbolSize: function(val) {
                return val[2] / 10
              },
              showEffectOn: 'render',
              zlevel: 2,
              rippleEffect: {
                period: 3.5, // 波纹秒数
                brushType: 'fill', // stroke(涟漪)和fill(扩散)，两种效果
                scale: 5 // 波纹范围
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'top',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  show: true,
                  color: function(params) {
                    // build a color map as your need.
                    // console.log(params)
                    const _index = params.data.level - 1
                    return colorList[_index]
                  }, // 字体和点颜色
                  label: {
                    textStyle: {
                      fontWeight: 'bold', // 字体
                      fontSize: 14, // 字体大小
                      color: '#fff'
                    }
                  }
                }
              }
            }
          ]
        }
        this.mapEcharts.setOption(options) // 实例配置项与数据

        this.mapEcharts.on('click', (params) => {
          console.log(params)
          // if (params.data) {
          //   if (params.data.name !== this.mapName) {
          //     this.mapName = params.data.name
          //     this.getMap(params.data.adcode)
          //   }
          // }
        })

        // 隐藏loading
        this.mapEcharts.hideLoading()
      },
      changeSize() {
        this.mapEcharts.resize()
      }
    }

  }

</script>
<style lang='scss' scoped>
.echarts-map{

}
</style>
