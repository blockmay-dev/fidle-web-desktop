// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        suggestions: [],
        loading: false,
        errors: []
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allSuggestions: state => {
            return state.suggestions
        },
        isLoading: state => {
            return state.loading
        },
        isError: state => {
            return state.errors
        }
    },
    mutations: {

        SET_SUGGESTIONS: (state, suggestions) => {
            state.suggestions = suggestions;
        },
        SET_LOADING: (state) => {
            state.loading = true
        },
        END_LOADING: (state) => {
            state.loading = false
        },
        SET_ERRORS: (state, data) => {
            state.errors = data
        },

    },
    actions: {
        // Get All Suggestions 
        allSuggestions({ commit }) {
            commit('SET_LOADING')
            request().get('/users-suggestion/')
                .then((res) => {
                    console.log(res);
                    commit('SET_SUGGESTIONS', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Follow Suggested User
        followUser({ dispatch, commit }, id) {
            request().post(`users/${id}/follow/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `You are now following ${res.data.following.name}`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "13px",
                            borderRadius: "5px",
                        },
                        gravity: "bottom",
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    dispatch("allSuggestions")
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch("allSuggestions")
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
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        updateUser({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            request().post('/auth/update-profile-details', payload)
                .then((res) => {
                    Toastify({
                        text: `User Data Update Successful`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })

        },

        setUser({ commit }) {
            request().get('/auth/user-profile')
                .then((res) => {
                    commit('SET_USER', res.data.user)
                    console.log(res.data.user)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                })
        },

        becomeAVendor({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            request().post('/user-role-upgrade', payload)
                .then((res) => {
                    Toastify({
                        text: `Congratulations!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    router.push('/vendor')
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },
        createShop({ commit, dispatch }, payload) {
            commit('SET_LOADING')
            request().post('/create-shop', payload)
                .then((res) => {
                    Toastify({
                        text: `Shop Created Successfully!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })

        },

        // Add Item to Cart
        addToCart({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            request().post('/add-to-cart', payload)
                .then((res) => {
                    Toastify({
                        text: `Item Added to Cart!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },

        // Remove Item from Cart
        deleteItemFromCart({ dispatch, commit }, id) {
            commit('SET_LOADING')
            request().post(`/remove-cart-item/${id}`)
                .then((res) => {
                    Toastify({
                        text: `Item Removed from Cart!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },

        // Update Cart Item
        updateCart({ dispatch, commit }, { id, payload }) {
            commit('SET_LOADING')
            request().post(`/update-cart-item/${id}`, payload)
                .then((res) => {
                    Toastify({
                        text: `Cart Item Updated!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },


    }
};