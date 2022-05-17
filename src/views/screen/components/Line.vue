<template>
  <scale-card title="月度移纤次数排行" iconname="el-icon-set-up">
    <div class="chart-container">
      <div id="data-lf-body" class="data-lf-top" />
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
        statusChart: null
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
          this.borderColor = 'rgba(0, 150, 135, 0.1)' // 背景颜色
        } else if (this.getTheme === 'blue-theme') {
          this.fontColor = '#000'
          this.fontColorX = '#122f85'
          this.fontColorY = '#555'
          this.borderColor = 'rgba(18, 47, 133, 0.1)' // 背景颜色
        } else if (this.getTheme === 'red-theme') {
          this.fontColor = '#000'
          this.fontColorX = '#ae3737'
          this.fontColorY = '#555'
          this.borderColor = 'rgba(174, 55, 55, 0.1)' // 背景颜色
        } else {
          this.fontColor = '#fff'
          this.fontColorX = '#6FCEFF'
          this.fontColorY = '#CFD4EB'
          this.borderColor = 'rgba(77, 91, 107, 0.2)' // 背景颜色
        }
        this.initChart()
      },
      initChart() {
        this.statusChart = this.$echarts.init(document.getElementById('data-lf-body'))
        const myChart = this.statusChart
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '移纤次数',
            left: '2%',
            textStyle: {
              color: this.fontColor,
              fontSize: 14
            }
          },
          legend: {
            type: 'plain',
            itemWidth: 20,
            itemHeight: 10,
            right: 10,
            data: [{ name: '区域1', icon: 'rect' },
                   { name: '区域2', icon: 'rect' }],
            textStyle: {
              fontSize: 12,
              color: this.fontColor
            }
          },
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
                color: '#262571'
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
                color: '#262571'
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
              name: '区域1',
              data: [44, 40, 60, 55, 35, 66, 111, 25, 22, 44, 55, 11],
              type: 'line',
              smooth: true,
              symbolSize: 2,
              itemStyle: { // 折线拐点标志的样式
                borderColor: '#6633CC', // 拐点的边框颜色
                borderWidth: 2,
                color: '#6633CC'
              },
              lineStyle: { // 折线的样式
                color: '#6633CC'
              }
            }, {
              name: '区域2',
              data: [77, 88, 99, 88, 111, 123, 66, 77, 44, 66, 88, 98],
              type: 'line',
              smooth: true,
              symbolSize: 2,
              itemStyle: { // 折线拐点标志的样式
                borderColor: 'rgba(0, 182, 206, 1)', // 拐点的边框颜色
                borderWidth: 2,
                color: 'rgba(0, 182, 206, 1)'
              },
              lineStyle: { // 折线的样式
                color: 'rgba(0, 182, 206, 1)'
              }
            }
          ]

        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
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
  .data-lf-top{
    width: 100%;
    height: 100%;
  }
}
</style>
