<template>
  <div class="GridLayout w-100 h-100">
    <div
      id="drag-box"
      class="flex draggable-block"
    >
      <div class="left" style="width:25%;">
        <div class="item-box">
          <div class="content-box Block--isDraggable" draggable="true">
            <!--资源统计-->
            <ResourcesPie ref="pie" />
            <div class="border-content" />
          </div>
        </div>
        <div class="item-box">
          <div class="content-box Block--isDraggable" draggable="true">
            <!--光缆总长度-->
            <BarRich />
            <div class="border-content" />
          </div>
        </div>
        <div class="item-box">
          <div class="content-box Block--isDraggable" draggable="true">
            <!--光路由-->
            <RouterPie />
            <div class="border-content" />
          </div>
        </div>
      </div>
      <div class="center" style="width:50%;">
        <div class="item-box" style="height:66%">
          <div class="content-box mapbg">
            <!--中国地图-->
            <Map />
            <div class="border-content" />
          </div>
        </div>
        <div class="item-box">
          <div class="content-box flex align-center">
            <div class="alarm-echarts flex-1">
              <!--告警统计-->
              <AlarmRadar />
            </div>
            <div class="alarm-echarts flex-1">
              <!--告警趋势-->
              <AlarmLine />
            </div>
            <div class="border-content" />
          </div>
        </div>
      </div>
      <div class="right" style="width:25%;">
        <div class="item-box">
          <div class="content-box Block--isDraggable" draggable="true">
            <!--光通道-->
            <OpticalChannelPie />
            <div class="border-content" />
          </div>
        </div>
        <div class="item-box">
          <div class="content-box Block--isDraggable" draggable="true">
            <!--移纤徘行-->
            <LineRanking />
            <div class="border-content" />
          </div>
        </div>
        <div class="item-box">
          <div class="content-box Block--isDraggable" draggable="true">
            <!--月度故障业务平均恢复时长-->
            <TimeLengthBar />
            <div class="border-content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ResourcesPie from './components/ResourcesPie.vue'
  import OpticalChannelPie from './components/OpticalChannelPie.vue'
  import BarRich from './components/BarRich.vue'
  import Map from './components/Map.vue'
  import LineRanking from './components/Line.vue'
  import RouterPie from './components/RouterPie.vue'
  import AlarmRadar from './components/AlarmRadar.vue'
  import AlarmLine from './components/AlarmLine.vue'
  import TimeLengthBar from './components/TimeLengthBar.vue'
  export default {
    components: { ResourcesPie, BarRich, Map, OpticalChannelPie, LineRanking, RouterPie, AlarmRadar, AlarmLine, TimeLengthBar },
    data() {
      return {
        scaleTimer: null,
        scale: this.getScale()
      }
    },
    mounted() {
      /* 窗口改变事件*/
      window.addEventListener('resize', this.setScale)
      // 拖动
      this.dragHandler()
    },
    beforeDestroy() {
      if (this.mirrortime)clearTimeout(this.mirrortime)
      window.removeEventListener('resize', this.setScale)
    },
    methods: {
      dragHandler() {
        // 用来存取被拖拽的节点
        let draggedNode = null
        // 获取可拖拽节点
        const dragNodes = document.querySelectorAll('div[draggable="true"]')
        // 给可拖拽节点绑定事件
        dragNodes.forEach(item => {
          item.ondragstart = () => {
            draggedNode = item
          }
          // 默认情况下,数据/元素不能在其他元素中被拖放,也就是会阻止你做drop操作，所以取消其默认行为
          item.ondragover = e => {
            e.preventDefault()
          }
          // 被拖拽的节点，被释放后进行节点替换
          item.ondrop = e => {
            if (draggedNode !== null && draggedNode !== item) {
              const temp = document.createElement('div')
              const aParent = draggedNode.parentNode
              const target = e.path.filter(item => item.draggable)[0]
              if (!target) return
              let bParent
              if (aParent) {
                bParent = target.parentNode
                if (bParent) {
                  bParent.replaceChild(temp, target)
                  aParent.replaceChild(target, draggedNode)
                  bParent.replaceChild(draggedNode, temp)
                }
              }
            }
          }
        })
      },
      getScale() {
        const w = window.innerWidth / 1920
        const h = (window.innerHeight - 94) / 1080
        return w > h ? h : w
      },
      setScale() {
        clearTimeout(this.scaleTimer)
        this.scaleTimer = setTimeout(() => {
          this.scale = this.getScale()
        }, 500)
      }
    }
  }

</script>
<style lang='scss' scoped>
.GridLayout{
 .draggable-scale{
  width: var(--width) !important;
  height: var(--height) !important;
  display: none;
 }
 .mirror-block{
  display: block;
 }
 .draggable-block{
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  transition: 0.3s;
 }
 .item-box{
  width: 100%;
  height: 33%;
  box-sizing: border-box;
  padding:5px;
 }
 .content-box{
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-shadow: #122f85 0px 0px 40px inset;
  border: 1px solid rgb(18, 47, 133);
  position: relative;
  color: #fff;
 }
 .mapbg{
    background: url(../../assets/img/scale/mapbg.png) no-repeat center;
    background-size:cover;
}
.alarm-echarts{
  height: 100%;
}
 .content-box::before{
   display: block;
   content: "";
   width: 8px;
   height: 8px;
   border: 2px solid rgba(114, 215, 255, 0.616);
   border-right: 0;
   border-bottom: 0;
   position: absolute;
   top: -1px;
   left: -1px;
 }
 .content-box::after{
   display: block;
   content: "";
   width: 8px;
   height: 8px;
   border: 2px solid rgba(114, 215, 255, 0.616);
   border-left: 0;
   border-bottom: 0;
   position: absolute;
   top: -1px;
   right: -1px;
 }
 .content-box > .border-content::before{
   display: block;
   content: "";
   width: 8px;
   height: 8px;
   border: 2px solid rgba(114, 215, 255, 0.616);
   border-right: 0;
   border-top: 0;
   position: absolute;
   bottom: -1px;
   left: -1px;
 }
 .content-box > .border-content::after{
   display: block;
   content: "";
   width: 8px;
   height: 8px;
   border: 2px solid rgba(114, 215, 255, 0.616);
   border-left: 0;
   border-top: 0;
   position: absolute;
   bottom: -1px;
   right: -1px;
 }
}

</style>
