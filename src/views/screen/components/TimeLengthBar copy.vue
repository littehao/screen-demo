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
        const _this = this
        const xAxisData = ['区域1', '区域2', '区域3', '区域4', '区域5', '区域6', '区域7', '区域8', '区域9']
        const dataList = [6, 7, 3, 11, 33, 38, 22, 55, 66]
        // 指定图表的配置项和数据
        const option = {
          tooltip: {},
          grid: {
            top: '8%',
            left: '10%',
            right: '5%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            // 更改坐标轴颜色
            axisLine: {
              lineStyle: {
                color: this.fontColorX
              },
              onZero: false
            },
            // x轴的字体样式
            axisLabel: {
              interval: 0,
              textStyle: {
                color: this.fontColorX, // 更改坐标轴文字颜色
                fontSize: 14, // 更改坐标轴文字大小
                fontFamily: 'MicrosoftYaHei'
              },
              // X轴lable的处理函数，如果x轴的lable有空格，比如:['AM点检 异常', 'PM巡检 异常', 'PM保养 异常'],这里会以空格为分割，显示两行
              formatter: function(params) {
                return params.split(' ').join('\n')
                //                console.log(' formatter',params);
              }
            }

          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: this.fontColorY, // 更改坐标轴文字颜色
                fontSize: 12, // 更改坐标轴文字大小
                fontFamily: 'MicrosoftYaHei'
              }
            },
            // 更改坐标轴颜色
            axisLine: {
              lineStyle: {
                color: '#657CA8'
              }
            },
            // 网格线
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'solid',
                with: 0.5,
                color: this.borderColor
              }
            }
          },
          series: [{
            data: dataList, // this.PLAN_COUNT, this.ACTUAL_COUNT,this.GAP
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  return _this.colorList[0]
                },
                // 以下为是否显示，显示位置和显示格式的设置了
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}',
                  fontSize: 12,
                  color: this.fontColorLabel
                }
              }
            }
          }]
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
