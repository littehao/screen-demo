<template>
  <div class="content-card">
    <div class="card-title flex align-center p-10"><i class="icon" :class="iconname" />{{ title }}</div>
    <div class="content-cont">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      iconname: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    }

  }

</script>
<style lang='scss' scoped>
.content-card{
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
  .content-cont{
    height: calc(100% - 40px);
  }
 }
</style>
