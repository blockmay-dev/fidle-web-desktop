// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// import router from '@/router'

// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        messages: [],
        loading: false,
        errors: [],
        message: []
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allMessages: state => {
            return state.messages
        },
        isLoading: state => {
            return state.loading
        },
        isError: state => {
            return state.errors
        },
        singleMessage: state => {
            return state.message
        }
    },
    mutations: {

        SET_MESSAGES: (state, messages) => {
            state.messages = messages;
        },
        SINGLE_MESSAGE: (state, message) => {
            state.message = message;
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
        // Get All Messages
        allMessages({ commit }) {
            commit('SET_LOADING')
            request().get('/chat')
                .then((res) => {
                    console.log(res);
                    commit('SET_MESSAGES', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Get Message from User
        getSingleMessage({ commit }, sender_username) {
            commit('SET_LOADING')
            request().get(`/chat/${sender_username}/`)
                .then((res) => {
                    console.log(res);
                    let message = res.data.results
                    let sortedMessage = message.sort((a, b) => a.date_created - b.date_created);
                    commit('SINGLE_MESSAGE', sortedMessage);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        sendMessage({ dispatch }, { sender_username, payload }) {
            request().post(`/chat/${sender_username}/send/`, payload)
                .then((res) => {
                    console.log(res);
                    dispatch("allMessages")
                })
                .catch((err) => {
                    console.log(err);
                    // commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        }

    }
};