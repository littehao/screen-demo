<template>
  <div class="chart-container">
    <div class="card-title flex align-center p-10"><i class="icon el-icon-collection" />告警量统计</div>
    <div ref="chart" class="chart" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        statusChart: null,
        option: {},
        alarmNum: [55, 44, 33, 77]
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

      // 根据窗口变化自动调节图表大小
      window.addEventListener('resize', this.changeSize)
    },
    beforeDestroy() {
      console.log('销毁')
      this.statusChart && this.statusChart.dispose()
      window.removeEventListener('resize', this.changeSize)
    },
    methods: {
      changeTheme() {
        if (this.getTheme === 'green-theme') {
          this.areaColor = ['rgba(0, 150, 135, 0.8)', 'rgba(0, 150, 135, 0.6)', 'rgba(0, 150, 135, 0.4)', 'rgba(0, 150, 135, 0.2)']
          this.areaStyleColor = 'rgba(255, 255, 255, 0.6)'
          this.lineStyleColor = '#009687'
          this.splitLineColor = 'rgba(0, 150, 135, 0.3)'
          this.radarcColor = '#81c5be'
        } else if (this.getTheme === 'blue-theme') {
          this.areaColor = ['rgba(18, 47, 133, 0.8)', 'rgba(18, 47, 133, 0.6)', 'rgba(18, 47, 133, 0.4)', 'rgba(18, 47, 133, 0.2)']
          this.areaStyleColor = 'rgba(255, 255, 255, 0.6)'
          this.lineStyleColor = '#122f85'
          this.splitLineColor = 'rgba(18, 47, 133, 0.3)'
          this.radarcColor = '#8995bd'
        } else if (this.getTheme === 'red-theme') {
          this.areaColor = ['rgba(174, 55, 55, 0.8)', 'rgba(174, 55, 55, 0.6)', 'rgba(174, 55, 55, 0.4)', 'rgba(174, 55, 55, 0.2)']
          this.areaStyleColor = 'rgba(255, 255, 255, 0.6)'
          this.lineStyleColor = '#ae3737'
          this.splitLineColor = 'rgba(174, 55, 55, 0.3)'
          this.radarcColor = '#d09999'
        } else {
          this.areaColor = ['rgba(0, 110, 206, 0.1)', 'rgba(0, 110, 206, 0.2)', 'rgba(0, 110, 206, 0.3)', 'rgba(0, 110, 206, 0.4)']
          this.areaStyleColor = 'rgba(255, 255, 255, 0.3)'
          this.lineStyleColor = 'rgba(58, 145, 221, 1)'
          this.splitLineColor = 'rgba(211, 253, 250, 0.1)'
          this.radarcColor = '#3f4b61'
        }
        this.initChart()
      },
      initChart() {
        this.statusChart = this.$echarts.init(this.$refs.chart)
        const itemArr = [55, 44, 33, 77] // 数据数组
        const n1 = [55, '', '', '']
        const n2 = ['', 44, '', '']
        const n3 = ['', '', 33, '']
        const n4 = ['', '', '', 77]
        const n5 = ['', '', '', '']
        const labelArr = ['一级告警', '二级告警', '三级告警', '四级告警'] // 显示图例用
        this.option = {
          legend: {
            orient: 'vertical',
            left: '10px',
            top: '10px',
            icon: 'diamond',
            data: [
              { name: labelArr[0], textStyle: { color: '#FF0000' }},
              { name: labelArr[1], textStyle: { color: '#CC6600' }},
              { name: labelArr[2], textStyle: { color: '#009900' }},
              { name: labelArr[3], textStyle: { color: '#3399FF' }}
            ]
          },
          radar: [
            {
              splitLine: {
                lineStyle: {
                  color: '#000'
                }
              }
            },
            {
              indicator: [ // 绘制总的图形
                { name: '一级告警', max: 100, color: '#FF0000' },
                { name: '二级告警', max: 100, color: '#CC6600' },
                { name: '三级告警', max: 100, color: '#009900' },
                { name: '四级告警', max: 100, color: '#3399FF' }
              ],
              nameGap: 6,
              center: ['50%', '50%'],
              radius: 90,
              name: {
                textStyle: {
                  color: '#000',
                  fontSize: 14,
                  fontWeight: 400
                }
              },
              splitArea: {
                areaStyle: {
                  color: this.areaColor,
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 10
                }
              },
              axisLine: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: this.splitLineColor
                }
              }
            }
          ],
          series: [
            {
              type: 'radar', // 绘制总的图形不设置拐点
              radarIndex: 1,
              data: [
                {
                  value: itemArr,
                  symbolSize: 4,
                  lineStyle: {
                    width: 1,
                    color: this.lineStyleColor
                  },
                  areaStyle: {
                    normal: {
                      opacity: 0.75,
                      color: this.areaStyleColor
                    }
                  }
                }
              ],
              label: {
                normal: {
                  show: true,
                  color: '#fff',
                  formatter: function(params) {
                    return params.value
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  color: '#000'
                  // show:false
                }
              },
              silent: true,
              z: 1 // 图层是一层一层叠加，所以这个也是一级一级递增
            },
            {
              type: 'radar', // 绘制第一个点
              radarIndex: 1,
              name: labelArr[0],
              silent: true,
              z: 2, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n1,
                  symbolSize: 3
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  color: '#FF0000'
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false // 隐藏标示线
                }
              }
            },
            {
              type: 'radar',
              radarIndex: 1, // 绘制第二个点
              name: labelArr[1],
              silent: true,
              z: 3, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n2,
                  symbolSize: 3
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  color: '#CC6600'
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false // 隐藏标示线
                }
              }

            },
            {
              type: 'radar', // 绘制第三个点
              radarIndex: 1,
              name: labelArr[2],
              silent: true,
              z: 4, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n3,
                  symbolSize: 3
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  color: '#009900'
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false // 隐藏标示线
                }
              }

            },
            {
              type: 'radar', // 绘制第四个点
              radarIndex: 1,
              name: labelArr[3],
              silent: true,
              z: 5, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n4,
                  symbolSize: 3
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  color: '#3399FF'
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false // 隐藏标示线
                }
              }

            },
            {
              type: 'radar', // 这个图层是为了盖住圆心，如果去掉，圆心的颜色为最后一个图层的颜色（不信就自己试试）
              radarIndex: 1,
              name: '',
              silent: true,
              z: 6, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n5,
                  symbolSize: 4
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 4,
                  color: this.radarcColor
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false // 隐藏标示线
                }
              }

            }
          ]
        }
        this.statusChart.setOption(this.option)
      },
      // 自适应宽高
      changeSize() {
        this.statusChart.resize()
      }
    }
  }

</script>
<style lang='scss' scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  .card-title{
   font-size: 14px;
   color:#72d6ff;
   font-weight: bold;
   background:-webkit-linear-gradient(rgba(31,134,250,.1),rgba(10,58,128,.1));
   .icon{
    font-weight: bold;
    margin-right: 5px;
   }
  }
  .chart{
    width: 100%;
    height: calc(100% - 36px);
  }
}
</style>
