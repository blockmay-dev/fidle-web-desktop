// import Vue from 'vue';

import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// Vue.prototype.$http = http


import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

const getDefaultState = () => {
    return {
        stories: []
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        getStories: state => {
            return state.stories
        }
    },
    mutations: {
        SET_STORIES: (state, data) => {
            state.stories = data;
        },
    },
    actions: {
        // List Stories
        getStories({ commit }) {
            request().get('user/stories')
                .then((res) => {
                    commit('SET_STORIES', res.data)
                })
                .catch((err) => {
                    return err;
                })
        },

        // Add Story
        createStory({ dispatch }, payload) {
            // commit('SET_LOADING')
            request().post(`/user/stories/`, payload)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Story Created Succesfully`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "13px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        gravity: "bottom",
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    dispatch("getStories")
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },

    }
};