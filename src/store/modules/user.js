// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        followers: [],
        five_followers: [],
        posts: [],
        comments: [],
        media_files: [],
        saved_posts: [],
        following: [],
        wallet_balance: {},
        wallet_address: "",
        transactions: [],
        pin_verification: false,
        loading: false,
        transaction: {},
        error: "",
        referrals: [],
        referral_statistics: {}
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
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
        savedPosts: state => {
            return state.saved_posts
        },
        walletBalance: state => {
            return state.wallet_balance
        },
        walletAddress: state => {
            return state.wallet_address
        },
        getTransactions: state => {
            return state.transactions
        },
        singleTransaction: state => {
            return state.transaction
        },
        isPinVerified: state => {
            return state.pin_verification
        },
        isLoading: state => {
            return state.loading
        },
        getError: state => {
            return state.error
        },
        getReferrals: state => {
            return state.referrals
        },
        getReferralStatistics: state => {
            return state.referral_statistics
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
        SET_POSTS: (state, posts) => {
            state.posts = posts
        },
        ALL_COMMENTS: (state, comments) => {
            state.comments = comments
        },
        MEDIA_FILES: (state, media_files) => {
            state.media_files = media_files
        },
        SAVED_POSTS: (state, saved_posts) => {
            state.saved_posts = saved_posts
        },
        SET_WALLET_BALANCE: (state, wallet_balance) => {
            state.wallet_balance = wallet_balance;
        },
        SET_WALLET_ADDRESS: (state, wallet_address) => {
            state.wallet_address = wallet_address
        },
        SET_TRANSACTIONS: (state, transactions) => {
            state.transactions = transactions;
        },
        SET_SINGLE_TRANSACTION: (state, transaction) => {
            state.transaction = transaction
        },
        SET_REFERRALS: (state, referrals) => {
            state.referrals = referrals
        },
        SET_REFERRALS_STATISTICS: (state, data) => {
            state.referral_statistics = data
        },
        SET_VERIFICATION: (state) => {
            state.pin_verification = true
        },
        REMOVE_VERIFICATION: (state) => {
            state.pin_verification = false
            state.error = ""
        },
        SET_ERROR: (state, error) => {
            state.error = error
        },
        SET_LOADING: (state) => {
            state.loading = true
        },
        END_LOADING: (state) => {
            state.loading = false
        },

    },
    actions: {
        // Get Followers
        getFollowers({ commit }) {
            request().get('/user/followers')
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
        getFollowing({ commit }) {
            request().get('/user/following')
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
        allPosts({ commit }) {
            request().get('/user/posts')
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
        // Get Posts
        savedPosts({ commit }) {
            request().get('/user/saved-posts')
                .then((res) => {
                    commit('SAVED_POSTS', res.data)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
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
                    dispatch('savedPosts')
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
        // To Add Comments
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
                    dispatch('savedPosts')
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

        // Get Wallet Balance
        walletBalance({ commit }) {
            request().get('/user/wallet-balances')
                .then((res) => {
                    console.log(res);
                    commit('SET_WALLET_BALANCE', res.data.balances);
                    commit('SET_WALLET_ADDRESS', res.data.wallet_address);
                })
                .catch((err) => {
                    // commit('SET_ERRORS', err.response.data);
                    console.log(err);
                })
        },

        // Get Transactions
        getTransactions({ commit }, currency) {
            request().get(`user/wallet/transactions/?currency__symbol=${currency}`)
                .then((res) => {
                    console.log(res);
                    commit('SET_TRANSACTIONS', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },

        // Get transactions by Id
        getTransactionById({ commit }, id) {
            commit("SET_LOADING")
            request().get(`/user/wallet/transactions/${id}`)
                .then((res) => {
                    console.log(res);
                    commit("SET_SINGLE_TRANSACTION", res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("END_LOADING")
                })
        },

        // Swap Fidle
        swapFidle({ dispatch }, payload) {
            // commit('SET_LOADING')
            request().post(`user/wallet/swap/`, payload)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Swap Successful`,
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
                    dispatch("walletBalance")
                    dispatch("getTransactions", "")
                })
                .catch((err) => {
                    console.log(err);
                    Toastify({
                        text: `${err.response.data.error}`,
                        className: "info",
                        style: {
                            background: "red",
                            fontSize: "13px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                })
                .finally(() => {
                    // commit('END_LOADING')
                })
        },

        // Verify Pin
        verifyPin({ commit }, pin) {
            commit('SET_LOADING')
            request().post(`user/verify-pin`, pin)
                .then((res) => {
                    console.log(res);
                    commit("SET_VERIFICATION")
                    Toastify({
                        text: `Pin verified`,
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
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    Toastify({
                        text: `${err.response.data.error}`,
                        className: "info",
                        style: {
                            background: "red",
                            fontSize: "13px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    commit('SET_ERROR', err.response.data.error)
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },
        removePinVerification({ commit }) {
            commit("REMOVE_VERIFICATION")
        },
        // Get referrals
        getReferrals({ commit }) {
            request().get('/user/referrals')
                .then((res) => {
                    console.log(res.data);
                    commit('SET_REFERRALS', res.data)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                })
        },

        // Get referral Statistics
        getReferralStatistics({ commit }) {
            request().get('/user/referrals-statistics')
                .then((res) => {
                    console.log(res.data);
                    commit('SET_REFERRALS_STATISTICS', res.data)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data)
                })
        },

        // Claim referral Bonus
        claimReward({ commit, dispatch }, id) {
            commit('SET_LOADING')
            request().post(`/user/referrals/${id}/claim-reward/`)
                .then((res) => {
                    console.log(res);
                    Toastify({
                        text: `Reward Claimed`,
                        className: "info",
                        style: {
                            background: "green",
                            fontSize: "13px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    dispatch("getReferralStatistics");
                    dispatch("getReferrals")
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    Toastify({
                        text: `${err.response.data.error}`,
                        className: "info",
                        style: {
                            background: "red",
                            fontSize: "13px",
                            borderRadius: "5px",
                            padding: "10px 20px"
                        },
                        offset: {
                            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                        },
                    }).showToast();
                    commit('SET_ERROR', err.response.data.error)
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },
    },


};