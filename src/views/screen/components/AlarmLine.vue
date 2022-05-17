<template>
  <div class="chart-container">
    <div class="card-title flex align-center p-10"><i class="icon el-icon-data-line" />告警趋势</div>
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
        alarmNum: [55, 44, 33, 77, 44, 22, 66, 55, 44, 33, 77, 44]
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
          this.lineStyleColor = '#009687'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(0, 150, 135, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 150, 135, 0)' //
            }
          ]
        } else if (this.getTheme === 'blue-theme') {
          this.fontColor = '#000'
          this.fontColorX = '#122f85'
          this.fontColorY = '#555'
          this.fontColorLabel = '#122f85'
          this.borderColor = 'rgba(18, 47, 133, 0.1)' // 背景颜色
          this.lineStyleColor = '#122f85'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(18, 47, 133, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(18, 47, 133, 0)' //
            }
          ]
        } else if (this.getTheme === 'red-theme') {
          this.fontColor = '#000'
          this.fontColorX = '#ae3737'
          this.fontColorY = '#555'
          this.fontColorLabel = '#ae3737'
          this.borderColor = 'rgba(174, 55, 55, 0.1)' // 背景颜色
          this.lineStyleColor = '#ae3737'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(174, 55, 55, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(174, 55, 55, 0)' //
            }
          ]
        } else {
          this.fontColor = '#fff'
          this.fontColorX = '#6FCEFF'
          this.fontColorY = '#CFD4EB'
          this.fontColorLabel = '#B8CBF7'
          this.borderColor = 'rgba(77, 91, 107, 0.2)' // 背景颜色
          this.lineStyleColor = 'rgba(77, 169, 255, 1)'
          this.colorStops = [
            {
              offset: 0,
              color: 'rgba(77, 169, 255, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(77, 169, 255, 0)' //
            }
          ]
        }
        this.initChart()
      },
      initChart() {
        this.statusChart = this.$echarts.init(this.$refs.chart)
        this.option = {
          grid: {
            // 坐标系地板的定位
            top: '40',
            left: '10%',
            right: '4%',
            bottom: '15%'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisLine: {
              // 坐标轴轴线相关设置
              lineStyle: {
                color: this.fontColorX
              }
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              show: true,
              textStyle: {
                color: this.fontColorX,
                fontSize: 14 // 让字zhi体变大dao
              }
            },
            axisTick: { // 刻度相关设置
              show: false// 让刻度隐藏
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              // 坐标轴轴线相关设置
              lineStyle: {
                color: '#657CA8'
              }
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              show: true,
              textStyle: {
                color: this.fontColorY,
                fontSize: 14 // 让字体变大
              }
            },
            axisTick: {
              // y轴刻度相关设置
              show: false
            },
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'solid',
                with: 0.5,
                color: this.borderColor
              }
            }
          },
          series: [
            {
              label: {
                show: false,
                position: 'top',
                formatter: '{c}',
                color: '#00fff0',
                fontSize: 12
              },
              data: this.alarmNum,
              symbol: 'circle',
              showSymbol: false,
              type: 'line',
              lineStyle: {
                color: this.lineStyleColor,
                width: 1
              },
              itemStyle: {
                color: '#ffffff',
                borderColor: this.lineStyleColor,
                borderWidth: 2
              },
              smooth: true,
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: this.colorStops,
                  global: false // 缺省为 false
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
