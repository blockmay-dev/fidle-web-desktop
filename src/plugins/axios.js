import Vue from 'vue'
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'
// import store from '../store'
// import router from '../router'
Vue.use(Toastify)

import axios from "axios";
const BASE_URL = 'https://dev.api.fidle.io/';
let token = localStorage.getItem('token')

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        // "Content-Type": 'multipart/form-data',
        'Accept': 'application/json',
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Methods": 'GET, HEAD, PUT, PATCH, POST, DELETE'
        "Authorization": "Token" + " " + token
    }
});

// Add a request interceptor
instance.interceptors.request.use(function(config) {
    // Do something before request is sent
    // alert("requesting")
    // console.log(`${token}`);
    const token = `${token}`;

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
    return response;
}, function(error) {

    // Toastify({
    //     text: 'Something went wrong',
    //     className: "info",
    //     style: {
    //         background: "red",
    //     }
    // }).showToast();

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
    // return error
});

export default instance