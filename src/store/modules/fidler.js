// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        fidler: {},
        loading: false,
        errors: [],
        message: [],
        fidler_search_result: [],
        followers: [],
        five_followers: [],
        following: [],
        posts: [],
        comments: [],
        media_files: [],
        blocked_users: []
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        getFidler: state => {
            return state.fidler
        },
        isLoading: state => {
            return state.loading
        },
        isError: state => {
            return state.errors
        },
        singleMessage: state => {
            return state.message
        },
        fidlerSearchResult: state => {
            return state.fidler_search_result
        },
        getFollowers: state => {
            return state.followers
        },
        getFollowing: state => {
            return state.following
        },
        getFiveFollowers: state => {
            return state.five_followers
        },
        allPosts: state => {
            return state.posts
        },
        allComments: state => {
            return state.comments
        },
        allMediaFiles: state => {
            return state.media_files
        },
        getBlockedUsers: state => {
            return state.blocked_users
        }
    },
    mutations: {
        SET_FOLLOWERS: (state, followers) => {
            state.followers = followers
        },
        SET_FOLLOWING: (state, following) => {
            state.following = following
        },
        FIVE_FOLLOWERS: (state, five_followers) => {
            state.five_followers = five_followers
        },
        SET_MESSAGES: (state, messages) => {
            state.messages = messages;
        },
        SET_FIDLER: (state, fidler) => {
            state.fidler = fidler;
        },
        FIDLER_SEARCH_RESULT: (state, fidler_search_result) => {
            state.fidler_search_result = fidler_search_result
        },
        CLEAR_SEARCH_RESULTS: (state) => {
            state.fidler_search_result = []
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
        SET_POSTS: (state, posts) => {
            state.posts = posts
        },
        ALL_COMMENTS: (state, comments) => {
            state.comments = comments
        },
        MEDIA_FILES: (state, media_files) => {
            state.media_files = media_files
        },
        SET_BLOCKED_USERS: (state, data) => {
            state.blocked_users = data
        }

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

        // List Fidlers
        listFidlers({ commit }) {
            commit('SET_LOADING')
            request().get(`/users/`)
                .then((res) => {
                    console.log(res);
                    commit('SET_FIDLERS', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Get Fidler Profile
        getFidler({ commit }, id) {
            commit('SET_LOADING')
            request().get(`/users/${id}/`)
                .then((res) => {
                    console.log(res);
                    commit('SET_FIDLER', res.data);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Search Fidler
        searchFidler({ commit }, search) {
            commit('SET_LOADING')
            request().get(`/users?search=${search}`)
                .then((res) => {
                    console.log(res);
                    commit('FIDLER_SEARCH_RESULT', res.data.results);
                    let results = res.data.results
                    if (results.lenght > 0) {
                        commit('END_LOADING')
                    }
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
        },
        // Clear Search results
        clearSearchResults({ commit }) {
            commit("CLEAR_SEARCH_RESULTS")
            commit('SET_LOADING')
        },

        // Follow User
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
                    dispatch("getFidler", id)
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response);
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch("getFidler", id)
                })
        },

        // Block User
        blockUser({ commit }, id) {
            request().post(`users/${id}/toggle-block/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `User blocked Succsssfully`,
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
                    router.push('/feeds')
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Block User
        unblockUser({ dispatch, commit }, id) {
            request().post(`users/${id}/toggle-block/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `User Unblocked Succsssfully`,
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

                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response);
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch("getBlockedUsers")
                })
        },

        // List Blocked Users
        getBlockedUsers({ commit }) {
            request().get(`user/blocked-users`)
                .then((res) => {
                    commit('SET_BLOCKED_USERS', res.data.results)
                    console.log(res.data)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                })
        },

        // Follow User
        unFollowUser({ dispatch, commit }, id) {
            request().post(`users/${id}/follow/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `You have unfollowed ${res.data.following.name}`,
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
                    dispatch("getFidler", id)
                })
                .catch((err) => {
                    commit('SET_ERRORS', err);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Get Followers
        getFollowers({ commit }, id) {
            request().get(`users/${id}/followers`)
                .then((res) => {
                    commit('SET_FOLLOWERS', res.data.results)
                    let fiveFollowers = res.data.results
                    let slicedFollowers = fiveFollowers.slice(0, 5)
                    commit('FIVE_FOLLOWERS', slicedFollowers)
                    console.log(res.data)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                })
        },

        // Get Following
        getFollowing({ commit }, id) {
            request().get(`users/${id}/following`)
                .then((res) => {
                    commit('SET_FOLLOWING', res.data.results)
                    console.log(res);
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                })
        },

        // Get Posts
        allPosts({ commit }, id) {
            request().get(`users/${id}/posts`)
                .then((res) => {
                    commit('SET_POSTS', res.data)
                    console.log(res.data)
                    let posts = res.data.results
                    const value = posts.filter((elem) => elem.media.length !== 0);
                    commit('MEDIA_FILES', value)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                })
        },


        // To Like Posts
        likePost({ dispatch }, { id, user_id }) {
            request().post(`posts/${id}/likes/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Post Liked`,
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
                    dispatch('allPosts', user_id)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // To View Post Comments
        viewComments({ commit }, id) {
            // commit('SET_LOADING')
            request().get(`/posts/${id}/comments/`)
                .then((res) => {
                    console.log(res);
                    commit('ALL_COMMENTS', res.data.results)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },
        // To View Post Comments
        addComment({ dispatch }, { id, payload }) {
            // commit('SET_LOADING')
            request().post(`/posts/${id}/comments/`, payload)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Comment Posted`,
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
                    dispatch("viewComments", id)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },
        // To Like a comment
        likeComment({ dispatch }, { post_id, comment_id }) {
            // commit('SET_LOADING')
            request().post(`posts/${post_id}/comments/${comment_id}/like/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Comment Liked`,
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
                    dispatch("viewComments", post_id)
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