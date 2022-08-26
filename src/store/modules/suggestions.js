// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// import router from '@/router'

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

    }
};