// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        loggedIn: false,
        loading: false,
        errors: [],
        update_loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isAuthenticated: state => {
            return state.token;
        },
        isLoggedIn: state => {
            return state.loggedIn
        },
        getUser: state => {
            return state.user;
        },
        isLoading: state => {
            return state.loading
        },
        isError: state => {
            return state.errors
        },
        isUpdateLoading: state => {
            return state.update_loading
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_LOGGED_IN: state => {
            state.loggedIn = true;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_LOADING: (state) => {
            state.loading = true
        },
        SET_UPDATE_LOADING: (state) => {
            state.update_loading = true
        },
        END_UPDATE_LOADING: (state) => {
            state.update_loading = false
        },
        END_LOADING: (state) => {
            state.loading = false
        },
        SET_ERRORS: (state, data) => {
            state.errors = data
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        logout({ commit }) {
            commit('SET_LOADING')
            request().post("/auth/token/logout/")
                .then((res) => {
                    localStorage.clear();
                    commit('RESET', '');
                    Toastify({
                        text: `User Logged Out`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "13px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    return err
                })
                .finally(() => {
                    window.location = '/'
                })

        },
        // User Login
        userLogin({ commit, dispatch }, payload) {
            commit('SET_LOADING')
            request().post('/auth/token/login', payload)
                .then((res) => {
                    commit('SET_TOKEN', res.data.auth_token);
                    commit('SET_USER', res.data.user);
                    let token = res.data.auth_token;
                    localStorage.setItem('token', token)
                    localStorage.setItem('loggedIn', true)
                    let loggedIn = true
                    commit('SET_LOGGED_IN', loggedIn)
                    Toastify({
                        text: `Welcome back, ${res.data.user.username}`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "15px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    router.push('/feeds')
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                    Toastify({
                        text: `Email or Password Incorrect!`,
                        className: "info",
                        style: {
                            background: "red",
                            fontSize: "13px",
                            borderRadius: "5px",
                        }
                    }).showToast();
                })
                .finally(() => {
                    dispatch('setUser')
                    commit('END_LOADING')
                })
        },

        // Underground Login in registration
        userRegistrationLogin({ commit, dispatch }, payload) {
            request().post('/auth/token/login', payload)
                .then((res) => {
                    commit('SET_TOKEN', res.data.auth_token);
                    commit('SET_USER', res.data.user);
                    let token = res.data.auth_token;
                    localStorage.setItem('token', token)
                    localStorage.setItem('loggedIn', true)
                    let loggedIn = true
                    commit('SET_LOGGED_IN', loggedIn)
                    Toastify({
                        text: `Hello, ${res.data.user.username}`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "15px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    dispatch('setUser')
                })
        },

        userRegister({ commit }, payload) {
            commit('SET_LOADING')
            request().post('/auth/signup', payload)
                .then((res) => {
                    router.push('/login')
                    Toastify({
                        text: `Registration Successful`,
                        className: "info",
                        style: {
                            background: "green",
                            fontSize: "13px",
                            borderRadius: "5px",
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                            fontSize: "13px",
                            borderRadius: "5px",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        updateUser({ dispatch, commit }, payload) {
            commit('SET_UPDATE_LOADING')
            request().put('auth/users/me/', payload)
                .then((res) => {
                    Toastify({
                        text: `User Data Update Successful`,
                        className: "info",
                        style: {
                            background: "green",
                            fontSize: "13px",
                            borderRadius: "5px",
                        }
                    }).showToast();
                    if (window.location.pathname == '/sign-up/complete-profile') {
                        window.location.href = "/follow-to-continue"
                    }
                    return res
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                            fontSize: "13px",
                            borderRadius: "5px",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_UPDATE_LOADING')
                    dispatch('setUser')
                })

        },

        setUser({ commit }) {
            request().get('/auth/users/me')
                .then((res) => {
                    commit('SET_USER', res.data)
                    return res
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data)
                })
        },

    }
};