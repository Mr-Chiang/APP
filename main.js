import Vue from 'vue';
import App from './App';
import {apis,baseUrl} from './common/js/api.js';//api文件
import uniLoadMore from "./components/uni-load-more/uni-load-more.vue"
import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
Vue.component('load',uniLoadMore);
Vue.config.productionTip = false;
Vue.prototype.apis = apis;
Vue.prototype.baseUrl = baseUrl;

App.mpType = 'app';

const app = new Vue({
    ...App,
})
app.$mount()
