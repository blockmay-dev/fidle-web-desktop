// import Vue from 'vue';

import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// Vue.prototype.$http = http

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

const getDefaultState = () => {
    return {
        nftCollections: [],
        singleCollection: {},
        loading: false,
        success: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        nftCollections: state => {
            return state.nftCollections
        },
        isLoading: state => {
            return state.loading
        },
        isSuccess: state => {
            return state.success
        },
        singleCollection: state => {
            return state.singleCollection
        }

    },
    mutations: {
        SET_COLLECTIONS: (state, nftCollections) => {
            state.nftCollections = nftCollections;
        },
        SET_COLLECTION: (state, singleCollection) => {
            state.singleCollection = singleCollection
        },
        SET_LOADING: (state) => {
            state.loading = true
        },
        END_LOADING: (state) => {
            state.loading = false
        },
        SET_SUCCESS: (state) => {
            state.success = true
        },
        REMOVE_SUCCESS: (state) => {
            state.success = false
        },
    },
    actions: {
        // Get All Collections
        getCollections({ commit }, id) {
            request().get(`/collections?owner=${id}`, )
                .then((res) => {
                    console.log(res);
                    commit('SET_COLLECTIONS', res.data)
                })
                .catch((err) => {
                    return err;
                })
        },

        // Get Collection By Id
        getCollectionById({ commit }, id) {
            request().get(`/collections/${id}/nfts`, )
                .then((res) => {
                    console.log(res);
                    commit('SET_COLLECTION', res.data)
                })
                .catch((err) => {
                    return err;
                })
        },

        // Create Collection
        createCollection({ dispatch, commit }, payload) {
            commit("SET_LOADING")
            request().post('/collections/', payload)
                .then((res) => {
                    Toastify({
                        text: `New Collection Added`,
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
                    dispatch("getCollections");
                    console.log(res);
                })
                .catch((err) => {
                    return err;
                })
                .finally(() => {
                    commit("END_LOADING")
                    commit("SET_SUCCESS")
                })
        },
        // Create Collection
        convertToNFT({ commit }, payload) {
            commit("SET_LOADING")
            request().post('/nft/', payload)
                .then((res) => {
                    Toastify({
                        text: `Post Converted to NFT`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "13px",
                            borderRadius: "5px",
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    console.log(res);
                    commit("SET_SUCCESS")
                })
                .catch((err) => {
                    return err;
                })
                .finally(() => {
                    commit("END_LOADING")
                })
        },

        removeNFTCreationSuccess({ commit }) {
            commit("REMOVE_SUCCESS");
        }
    }
};