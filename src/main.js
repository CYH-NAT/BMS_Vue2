import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; //引入elementui
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-TW'
import '@/common/reset.css'
import '@/mock/mock'
import '@/router/guards'  //router有被引入這，所以不用特別export，不引入的話不會執行

Vue.use(ElementUI,{ locale }); //引入vue專用的elementui

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
