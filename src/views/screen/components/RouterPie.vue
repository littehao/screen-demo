<template>
  <scale-card title="光路由" iconname="el-icon-link">
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
          this.fontColorPie = '#009687'
          this.borderColor = 'rgba(255, 255, 255, 0.3)' // 边框颜色
          this.shadowColor = 'rgba(0, 150, 135, 0.5)' // 阴影颜色
          this.shadowBlur = 30
          this.shadowOffsetX = 15
          this.shadowOffsetY = 10
        } else if (this.getTheme === 'blue-theme') {
          this.fontColor = '#000'
          this.fontColorPie = '#122f85'
          this.borderColor = 'rgba(255, 255, 255, 0.3)' // 边框颜色
          this.shadowColor = 'rgba(18, 47, 133, 0.5)' // 阴影颜色
          this.shadowBlur = 30
          this.shadowOffsetX = 15
          this.shadowOffsetY = 10
        } else if (this.getTheme === 'red-theme') {
          this.fontColor = '#000'
          this.fontColorPie = '#ae3737'
          this.borderColor = 'rgba(255, 255, 255, 0.3)' // 边框颜色
          this.shadowColor = 'rgba(174, 55, 55, 0.5)' // 阴影颜色
          this.shadowBlur = 30
          this.shadowOffsetX = 15
          this.shadowOffsetY = 10
        } else {
          this.fontColor = '#fff'
          this.fontColorPie = '#B4E4FF'
          this.borderColor = '#020721' // 边框颜色
          this.shadowColor = null // 内柱状图颜色
          this.shadowBlur = null
          this.shadowOffsetX = null
          this.shadowOffsetY = null
        }
        this.initChart()
      },
      initChart() {
        this.statusChart = this.$echarts.init(this.$refs.chart)
        const _this = this
        const colorList = [
          {
            c1: 'rgba(221, 59, 244, 1)',
            c2: 'rgba(226, 101, 243, 1)'
          },
          {
            c1: 'rgba(109, 84, 227, 1)',
            c2: 'rgba(135, 98, 243, 1)'
          },
          {
            c1: 'rgba(36, 81, 255, 1)',
            c2: 'rgba(17, 49, 173, 1)'
          },
          {
            c1: 'rgba(12, 176, 244, 1)',
            c2: 'rgba(49, 231, 225, 1)'
          }]
        this.option = {
          title: {
            show: true,
            text: '区域路由\n占用比例',
            left: '49%',
            top: '42%',
            textStyle: {
              color: this.fontColorPie,
              fontSize: 14,
              lineHeight: 20
            },
            textAlign: 'center'
          },
          legend: {
            show: false
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [40, 80],
              center: ['50%', '50%'],
              roseType: 'area',
              labelLine: {
                length: 10,
                length2: 10
              },
              label: {
                color: this.fontColor
              },
              itemStyle: {
                normal: {
                  borderRadius: 8,
                  borderColor: this.borderColor,
                  borderWidth: 2,
                  shadowBlur: this.shadowBlur,
                  shadowColor: this.shadowColor,
                  shadowOffsetX: this.shadowOffsetX,
                  shadowOffsetY: this.shadowOffsetY,
                  color: function(params) {
                    return new _this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{ // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      offset: 0,
                      color: colorList[params.dataIndex].c1
                    }, {
                      offset: 1,
                      color: colorList[params.dataIndex].c2
                    }])
                  }
                }
              },
              data: [
                { value: 40, name: '区域1' },
                { value: 38, name: '区域2' },
                { value: 32, name: '区域3' },
                { value: 30, name: '区域4' }
              ]
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
