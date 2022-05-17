<template>
  <el-container class="w-100 h-100 scale-page">
    <div class="wrapper">
      <v-header></v-header>
      <el-main style="padding:0;position: relative;">
        <transition name="move" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </div>
  </el-container>
</template>

<script>
  
  import vHeader from '@/components/header.vue'
  export default {
    name:'main-name',
    components: { vHeader },
    data() {
      return {

      }
    },
    mounted() {

    },

    methods: {

    }
  }
</script>

<style scoped>
.scale-page{
  background-color:#020721;
}
.el-header {
  background-color: #242f42;
  color: #ffffff;
  line-height: 60px;
  padding: 0;
  overflow: hidden;
}

.el-main {
  flex-basis: 0px;
  overflow: auto;
  height: calc(100vh - 94px);
}
.el-main > div {
  height: 100%;
}
</style>
