// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        posts: [],
        loading: false,
        errors: [],
        comments: [],
        single_post: {},
        posts_results: [],
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allPosts: state => {
            return state.posts
        },
        postsSearchResult: state => {
            return state.posts_results
        },
        getSinglePost: state => {
            return state.single_post
        },
        isLoading: state => {
            return state.loading
        },
        isError: state => {
            return state.errors
        },
        allComments: state => {
            return state.comments
        }
    },
    mutations: {

        SET_POSTS: (state, posts) => {
            state.posts = posts;
        },
        POSTS_SEARCH_RESULTS: (state, data) => {
            state.posts_results = data
        },
        SET_SINGLE_POST: (state, single_post) => {
            state.single_post = single_post
        },
        ALL_COMMENTS: (state, comments) => {
            state.comments = comments
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
        MORE_POSTS: (state, post) => {
            state.posts.push(post)
        }

    },
    actions: {
        // Get All Posts 
        allPosts({ commit }) {
            // commit('SET_LOADING')
            request().get('/user/feeds')
                .then((res) => {
                    console.log(res);
                    commit('SET_POSTS', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },

        // Search posts
        searchPosts({ commit }, search_item) {
            request().get(`/user/feeds?search=${search_item}`)
                .then((res) => {
                    console.log(res);
                    commit('POSTS_SEARCH_RESULTS', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },

        viewMorePosts({ commit }, page) {
            // commit('SET_LOADING')
            request().get(`/user/feeds?page=${page}`)
                .then((res) => {
                    console.log(res);
                    let newPosts = res.data.results;
                    for (let i = 0; i < newPosts.length; i++) {
                        // this.posts.push(newPosts[i]);
                        let post = newPosts[i]
                        commit('MORE_POSTS', post);
                    }

                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },

        // View Post By Id 
        singlePost({ commit }, id) {
            commit('SET_LOADING')
            request().get(`posts/${id}`)
                .then((res) => {
                    console.log(res);
                    commit('SET_SINGLE_POST', res.data);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Create Post
        createPost({ dispatch }, payload) {
            // commit('SET_LOADING')
            request().post(`/posts/`, payload)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Post Created Succesfully`,
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
                    dispatch("allPosts")
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },


        // To Like Posts
        likePost({ dispatch }, id) {
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
                    dispatch('allPosts')
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // Save Posts
        savePost({ dispatch }, post_id) {
            // commit('SET_LOADING')
            request().post(`posts/${post_id}/save/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Post Saved`,
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
                    dispatch("allPosts")
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },


        // Hide Posts
        hidePost({ dispatch }, post_id) {
            // commit('SET_LOADING')
            request().post(`posts/${post_id}/hide/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Post Hidden`,
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
                    dispatch("allPosts")
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },


        // Flag Posts
        flagPost({ dispatch }, { post_id, payload }) {
            // commit('SET_LOADING')
            request().post(`posts/${post_id}/report-abuse/`, payload)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Post Flagged`,
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
                    dispatch("allPosts")
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    // commit('END_LOADING')
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
                    dispatch('allPosts')
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
                    dispatch("allPosts")
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },
    }


};