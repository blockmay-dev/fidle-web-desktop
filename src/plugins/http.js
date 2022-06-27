import Vue from 'vue'
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'
Vue.use(Toastify)

import axios from "axios";
const BASE_URL = 'https://dev.api.fidle.io/';

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        // "Content-Type": 'multipart/form-data',
        'Accept': 'application/json',
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Methods": 'GET, HEAD, PUT, PATCH, POST, DELETE'
        // "Authorization": "Token" + " " + store.state.token
    }
});

// Add a request interceptor
http.interceptors.request.use(function(config) {
    // Do something before request is sent
    // alert("requesting")
    // console.log(`${store.state.token}`);

    return config;
}, function(error) {
    // Do something with request error
    alert("something went wrong")
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
    return response;
}, function(error) {

    Toastify({
        text: 'Something went wrong',
        className: "info",
        style: {
            background: "red",
        }
    }).showToast();

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
    // return error
});

export default http