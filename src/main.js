import Vue from 'vue'
import App from './App.vue'
import router from './router';

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// tag


Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App),
  // beforeCreate() {
  //   Vue.prototype.$bus = this;
  // }
}).$mount('#app')
