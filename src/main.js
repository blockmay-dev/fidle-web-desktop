import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
Vue.component("PopperComponent", Popper)

import '@/assets/css/fidle.css'
import '@/assets/css/media-query.css'

import instance from '@/plugins/axios.js'

import http from '@/plugins/http'

import "toastify-js/src/toastify.css"
import toastify from 'toastify-js'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)


import { Icon } from '@iconify/vue2';

Vue.component("IconComponent", Icon)

Vue.prototype.$toastify = toastify

Vue.prototype.$axios = instance

Vue.prototype.$http = http

import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    mounted() {
        AOS.init()
    },
    render: h => h(App)
}).$mount('#app')