import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import edit from '../components/edit'
import visit from '../components/visit'
import code from '../components/code'
import saoma from '../components/saoma'
import Register from "../components/Register";
import Activate from "../components/Activate";
import Loginbacks from "../components/Loginbacks";
import FrontActivate from "../components/FrontActivate";
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:'/home',
          name:'home',
          component: () => import('@/components/home'),
        },
        {
          path:'/nacty',
          name:'newActivity',
          component: () => import('@/components/newActivity'),
        },
        {
          path:'/qiandao',
          name:'qiandao',
          component: () => import('@/components/qiandao'),
        },
        {
          path:'/qingk',
          name:'qingk',
          component: () => import('@/components/qingk'),
        }
      ]
    },
    {
      path:'/edit',
      name:'edit',
      component:edit
    },
    {
      path:'/visit',
      name:'visit',
      component:visit
    },
    {
      path:'/code',
      name:'code',
      component:code
    },
    {
      path: '/saoma',
      name: 'saoma',
      component: saoma
    },
    //登陆注册
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/loginbacks',
      name: 'Loginbacks',
      component: Loginbacks,
    },{
      path: '/frontActivate',
      name: 'FrontActivate',
      component: FrontActivate,
    }
  ]
})
