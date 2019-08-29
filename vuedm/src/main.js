// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import hd from './App'
import router from './router/index.js'
import './assets/icon/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import QRCode from 'qrcodejs2'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
require('./mock')



Vue.use(ElementUI)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    title: false, //    显示当前图片的标题
    scalable: false, //图片是否可翻转
    rotatable: false, //图片是否可旋转
    tooltip: false, //显示缩放百分比
    navbar: false, //显示缩略图导航
    loop: false,
    loading: false
  }
});

Vue.config.productionTip = false

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
