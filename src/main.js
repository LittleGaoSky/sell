// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRsource from 'vue-resource';
import App from './App';
import router from './router';
import './common/stylus/index.styl';

// 注册引入的第三方插件
Vue.use(VueRsource);
// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
});

// 默认打开goods组件
router.push('/goods');
