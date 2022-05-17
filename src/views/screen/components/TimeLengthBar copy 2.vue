<template>
  <scale-card title="月度故障业务平均恢复时长" iconname="el-icon-data-analysis">
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
        xData: [], // x轴
        yBarData: [] // y轴
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
          this.fontColorX = '#009687'
          this.fontColorY = '#555'
          this.fontColorLabel = '#009687'
          this.borderColor = 'rgba(0, 150, 135, 0.1)' // 背景颜色
          this.colorList = [
            new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: 'rgba(0, 150, 135, 0.5)' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#009687' // 100% 处的颜色
            }], false)
          ]
        } else if (this.getTheme === 'blue-theme') {
          this.fontColor = '#000'
          this.fontColorX = '#122f85'
          this.fontColorY = '#555'
          this.fontColorLabel = '#122f85'
          this.borderColor = 'rgba(18, 47, 133, 0.1)' // 背景颜色
          this.colorList = [
            new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: 'rgba(18, 47, 133, 0.5)' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#122f85' // 100% 处的颜色
            }], false)
          ]
        } else if (this.getTheme === 'red-theme') {
          this.fontColor = '#000'
          this.fontColorX = '#ae3737'
          this.fontColorY = '#555'
          this.fontColorLabel = '#ae3737'
          this.borderColor = 'rgba(174, 55, 55, 0.1)' // 背景颜色
          this.colorList = [
            new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: 'rgba(174, 55, 55, 0.5)' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#ae3737' // 100% 处的颜色
            }], false)
          ]
        } else {
          this.fontColor = '#fff'
          this.fontColorX = '#6FCEFF'
          this.fontColorY = '#CFD4EB'
          this.fontColorLabel = '#B8CBF7'
          this.borderColor = 'rgba(77, 91, 107, 0.2)' // 背景颜色
          this.colorList = [
            new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#4DA9FF' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#1D92FF' // 100% 处的颜色
            }], false)
          ]
        }
        this.initChart()
      },
      initChart() {
        this.statusChart = this.$echarts.init(this.$refs.chart)
        var colorArr = ['#0C628C', '#3887D5', '#2570BB']
        var color = {
          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: colorArr[0]
            },
            {
              offset: 0.5,
              color: colorArr[0]
            },
            {
              offset: 0.5,
              color: colorArr[1]
            },
            {
              offset: 1,
              color: colorArr[1]
            }
          ]
        }
        var barWidth = 30
        const data = [6, 7, 3, 11, 33, 38, 22, 55, 66]
        const sideData = data.map(item => item + 90)
        // 指定图表的配置项和数据
        const option = {
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var str = params[0].name + ':'
              params.filter(function(item) {
                if (item.componentSubType == 'bar') {
                  str += '<br/>' + item.seriesName + '：' + item.value
                }
              })
              return str
            }
          },
          grid: {
            x: '7%',
            x2: '0%',
            y: '15%',
            y2: '15%'
          },
          legend: {
            show: false,
            data: ['本期', '同期'],
            textStyle: {
              color: '#fff',
              fontSize: '20'
            }
          },
          xAxis: {
            data: ['区域1', '区域2', '区域3', '区域4', '区域5', '区域6', '区域7', '区域8', '区域9'],
            // 坐标轴
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: '#214776'
              },
              textStyle: {
                color: '#fff',
                fontSize: '10'
              }
            },
            type: 'category',
            axisLabel: {
              textStyle: {
                color: '#C5DFFB',
                fontWeight: 500,
                fontSize: '14'
              }
            },
            axisTick: {
              textStyle: {
                color: '#fff',
                fontSize: '16'
              },
              show: false
            },
            splitLine: { show: false }
          },
          yAxis: {
            type: 'value',
            // 坐标轴
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: '#214776'
              },
              textStyle: {
                color: '#fff',
                fontSize: '10'
              }
            },
            axisTick: {
              show: false
            },
            // 坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: '#C5DFFB'
              }
            },
            // 分格线
            splitLine: {
              lineStyle: {
                color: '#13365f'
              }
            }
          },
          series: [
            {
              z: 1,
              name: '本期',
              type: 'bar',
              barWidth: barWidth,
              barGap: '0%',
              data: data,
              itemStyle: {
                normal: {
                  color: color
                }
              }
            },
            {
              z: 2,
              name: '本期',
              type: 'pictorialBar',
              data: sideData,
              symbol: 'diamond',
              symbolOffset: ['0%', '50%'],
              symbolSize: [barWidth, 10],
              itemStyle: {
                normal: {
                  color: color
                }
              },
              tooltip: {
                show: false
              }
            },
            {
              z: 3,
              name: '本期',
              type: 'pictorialBar',
              symbolPosition: 'end',
              data: data,
              symbol: 'diamond',
              symbolOffset: ['0%', '-50%'],
              symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  color: colorArr[2]
                }
              },
              tooltip: {
                show: false
              }
            }
          ]
        }
        this.statusChart.setOption(option)
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
