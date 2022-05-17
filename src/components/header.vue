<template>
  <div class="screen-header flex align-center">
    <div class="logo flex">
      <img src="@/assets/img/scale/logo.png" style="height:40px" alt="">
      <span style="font-size:30px;color:#fff">大屏展示</span>
    </div>
    <div class="screen-main-box">
      <el-menu
        ref="topNavMenu"
        mode="horizontal"
        background-color="#030F30"
        text-color="#FFFFFF"
        active-text-color="#fff"
        :default-active="$route.path"
        unique-opened
        router
        class="flex"
      >
        <template v-for="item in getMenu">
          <template v-if="item.children">
            <el-submenu :key="item.id" :index="item.id" popper-class="screen-menu">
              <template v-slot:title>
                <i v-if="item.icon" :class="item.icon" />
                <span slot="title">{{ item.enName }}</span>
              </template>
              <template v-for="subItem in item.children">
                  <el-menu-item :key="subItem.id" :index="subItem.path">
                    <template v-slot:title>
                      <i v-if="subItem.icon" :class="subItem.icon" />
                      <span slot="title">{{ subItem.enName }}</span>
                    </template>
                  </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="item.id" :index="item.path">
              <i v-if="item.icon" :class="item.icon" />
              <span slot="title">{{ item.enName }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div class="userinfo flex justify-end">

      <el-menu mode="horizontal" class="user-menu" menu-trigger="hover" active-text-color="#fff" background-color="#030F30">
        <el-submenu index="themes" popper-class="screen-menu">
          <template v-slot:title>主题颜色</template>
          <el-menu-item @click="setThemeFn('')">默认颜色</el-menu-item>
          <el-menu-item
            v-for="item in themeList"
            :key="item.value"
            @click="setThemeFn(item.value)"
          >{{ item.label }}</el-menu-item>
        </el-submenu>
        <el-submenu index="1" class="user-menu-item1" :popper-append-to-body="true" popper-class="screen-menu">
          <template slot="title">
            <el-avatar src="@/assets/img/scale/1.23.png" size="small" />
            <span style="margin-left: 8px;">admin</span>
          </template>
          <el-menu-item class="user-menu-item2" @click="logout">
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        themeList:[
          {label:'绿色主题',value:'green-theme'},
          {label:'蓝色主题',value:'blue-theme'},
          {label:'红色色主题',value:'red-theme'},
          {label:'深黑主题',value:'dark-theme'},
        ],
        getMenu:[
          {id:'1',enName:'一级菜单',path:'/',icon:''},
          {id:'2',enName:'一级菜单',path:'/',icon:'',children:[
            {id:'2-1',enName:'二级菜单',path:'/',icon:''},
            {id:'2-2',enName:'二级菜单',path:'/',icon:''},
            {id:'2-4',enName:'二级菜单',path:'/',icon:''},
          ]},
          {id:'3',enName:'一级菜单',path:'/',icon:'',children:[
            {id:'3-1',enName:'二级菜单',path:'/',icon:''},
            {id:'3-2',enName:'二级菜单',path:'/',icon:''},
            {id:'3-4',enName:'二级菜单',path:'/',icon:''},
          ]},
          {id:'4',enName:'一级菜单',path:'/',icon:'',children:[
            {id:'4-1',enName:'二级菜单',path:'/',icon:''},
            {id:'4-2',enName:'二级菜单',path:'/',icon:''},
            {id:'4-4',enName:'二级菜单',path:'/',icon:''},
          ]},
          
        ]
      }
    },
    methods: {
      ...mapMutations(['setTheme']),
      logout() {

      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      /**
       * 使用此方法设置主题
       */
      // 默认主题

      setThemeFn(themeName) {
        themeName = themeName.toLowerCase().replace('_', '-')
        // console.log(themeName)
        document.body.setAttribute('data-theme', themeName)
        localStorage.currentTheme = themeName
        this.setTheme(themeName)
      }
    }

  }

</script>
<style lang='scss'>
.screen-header{
 height: 94px;
 .logo{
   width:18%;
   height: 100%;
   padding:10px 0 0 15px;
   background-image: url("../assets/img/scale/header_left.png");
   background-size: 100% 100%;
 }
 .userinfo{
    width: 18%;
    height: 100%;
    float: right;
    background-image: url("../assets/img/scale/header_right.png");
    background-size: 100% 100%;
    .user-menu {
      float: right;
      margin-right: 20px;
      width: auto;
      .user-menu-item1 {
        .el-submenu__title {
          padding: 0;
        }
      }
      .user-menu-item2 {
        &:hover {
          background: none;
        }
      }
      .user-menu-item2.is-active {
        border: none;
      }
    }
 }
 .screen-main-box{
    flex:1;
    height: 100%;
    background-image: url("../assets/img/scale/header_middle.png");
    background-size: 100% 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    > .el-menu{
     height: 60px;
    }
 }
 .el-menu--horizontal>.el-submenu .el-submenu__title{
  background-color: transparent !important;
  color:#fff !important;
 }
 .el-menu.el-menu--horizontal{
  border-bottom:0;
  background-color:transparent !important;
 }

}
.el-menu--horizontal.screen-menu .el-menu .el-menu-item,
.el-menu--horizontal.screen-menu .el-menu .el-submenu__title{
 color: #fff;
}
.el-menu--horizontal.screen-menu .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal.screen-menu .el-menu-item:not(.is-disabled):hover{
 color: #fff;
}
.screen-menu{
 .el-menu-item:hover{
  background-color: #0B2C87 !important;
 }
}
</style>
