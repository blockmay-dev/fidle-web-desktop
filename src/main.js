import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Axios from 'axios'

import '@/assets/css/fidle.css'
import '@/assets/css/media-query.css'

import instance from '@/plugins/axios.js'

import "toastify-js/src/toastify.css"
import toastify from 'toastify-js'

Vue.prototype.$toastify = toastify

Vue.prototype.$axios = instance

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