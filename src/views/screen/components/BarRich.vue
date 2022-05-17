<template>
  <scale-card title="光缆总长度" iconname="el-icon-s-data">
    <div class="chart-container">
      <div ref="chart" class="chart" />
    </div>
  </scale-card>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ScaleCard from './ScaleCard.vue'
  export default {
    components: { ScaleCard },
    data() {
      return {
        statusChart: null,
        option: {}
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
          this.fontColor = '#000'
          this.fontColorRight = '#009687'
          this.bgColor = 'rgba(0, 150, 135, 0.1)' // 背景颜色
          this.myColor = [['#009687', '#009687'], ['#009687', '#009687']] // 内柱状图颜色
        } else if (this.getTheme === 'blue-theme') {
          this.fontColor = '#000'
          this.fontColorRight = '#122f85'
          this.bgColor = 'rgba(18, 47, 133, 0.1)' // 背景颜色
          this.myColor = [['#122f85', '#122f85'], ['#122f85', '#122f85']] // 内柱状图颜色
        } else if (this.getTheme === 'red-theme') {
          this.fontColor = '#000'
          this.fontColorRight = '#ae3737'
          this.bgColor = 'rgba(174, 55, 55, 0.1)' // 背景颜色
          this.myColor = [['#ae3737', '#ae3737'], ['#ae3737', '#ae3737']] // 内柱状图颜色
        } else {
          this.fontColor = '#fff'
          this.fontColorRight = '#ccc'
          this.bgColor = '#020721' // 背景颜色
          this.myColor = [['#00AFFF', '#00F1FB'], ['#6A27D5', '#8159F1']] // 内柱状图颜色
        }
        this.initChart()
      },
      // 图表初始化
      initChart() {
        // const arr = Array.from(document.querySelectorAll('.chart'))
        // console.log(arr)
        this.statusChart = this.$echarts.init(this.$refs.chart)

        var dataLine = [50, 66, 33, 25]
        const positionLeft = 0.4
        const max = 100 + 2 * positionLeft
        const _this = this
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
          },
          grid: [
            {
              left: '8%',
              top: '12%',
              right: '5%',
              bottom: '8%',
              containLabel: true
            },
            {
              left: '10%',
              top: '12%',
              right: '5%',
              bottom: '8%',
              containLabel: true
            }
          ],
          xAxis: [{
            max: max,
            show: false
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            offset: '27',
            axisLabel: {
              textStyle: {
                color: this.fontColor, // y轴字体颜色
                fontSize: '16'
              }
            },
            data: ['区域1', '区域2', '区域3', '区域4']
          }, {
            axisTick: 'none',
            axisLine: 'none',
            show: false,
            axisLabel: {
              textStyle: {
                color: this.fontColor,
                fontSize: '16'
              }
            },
            data: [1, 1, 1, 1]
          }, {
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)' // y轴线颜色
              }
            },
            data: []
          }, { // 设置柱状图右边参数
            show: true,
            inverse: false,
            data: dataLine,
            axisLabel: {
              textStyle: {
                color: this.fontColorRight
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
          ],
          series: [

            {
              name: '条',
              type: 'bar',
              stack: 'b',
              yAxisIndex: 0,
              data: dataLine,
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  distance: 10,
                  formatter: function(param) {
                    return param.value + '%'
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '16'
                  }
                }
              },
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: function(params) {
                    const dataIndex = params.dataIndex % 2 === 0 ? 1 : 0
                    return new _this.$echarts.graphic.LinearGradient(
                      1, 0, 0, 0,
                      [
                        { offset: 0, color: _this.myColor[dataIndex][0] },
                        { offset: 1, color: _this.myColor[dataIndex][1] }
                      ]
                    )
                  },
                  barBorderRadius: [100, 100, 100, 100]
                }
              },
              z: 2
            }, { // 背景灰框
              name: '白框',
              type: 'bar',
              yAxisIndex: 1,
              barGap: '-100%', // 设置-100% 则表示灰色柱状图与红色柱状图重合
              data: [99.8, 99.9, 99.9, 99.9],
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: this.bgColor,
                  barBorderRadius: [100, 100, 100, 100]
                }

              },
              z: 1 // 设置维度越高这表示覆盖低的
            },
            {
              name: '外框',
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [100, 100, 100, 100],
              barWidth: 15,
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  distance: 10,
                  color: this.bgColor,
                  formatter: function(data) {
                    return dataLine[data.dataIndex] + '/' + dataLine[data.dataIndex]
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: this.bgColor,
                  barBorderRadius: [100, 100, 100, 100]
                }
              },

              z: 0
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
  .chart{
    width: 100%;
    height: 100%;
  }
}
</style>
