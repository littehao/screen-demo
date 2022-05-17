import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index.vue'
import scale from '@/views/main.vue'
import homeScale from '@/views/screen/index.vue'

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '/login',
    component: login
  },
  {
    path: '',
    redirect: 'screen',
    component: scale,
    children: [{
      path: '/screen',
      component: homeScale
    }]
  }]
})

export default router
