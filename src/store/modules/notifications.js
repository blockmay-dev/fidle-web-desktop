// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// import router from '@/router'

// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'


const getDefaultState = () => {
    return {
        notifications: [],
        loading: false,
        errors: [],
        notifications_count: {}
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allNotifications: state => {
            return state.notifications
        },
        isLoading: state => {
            return state.loading
        },
        notificationsCount: state => {
            return state.notifications_count
        },
        isError: state => {
            return state.errors
        }
    },
    mutations: {

        SET_NOTIFICATIONS: (state, notifications) => {
            state.notifications = notifications;
        },
        SET_NOTIFICATIONS_COUNT: (state, notifications_count) => {
            state.notifications_count = notifications_count
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
        // Get All Notifications
        allNotifications({ commit }) {
            commit('SET_LOADING')
            request().get('/user/notifications')
                .then((res) => {
                    console.log(res);
                    commit('SET_NOTIFICATIONS', res.data.results);
                })
                .catch((err) => {
                    commit('SET_ERRORS', err.response.data);
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        // Get Notifications Count
        getNotificationsStatistics({ commit }) {
            request()
                .get("/notification-statistics")
                .then((res) => {
                    commit('SET_NOTIFICATIONS_COUNT', res.data);
                })
                .catch((err) => {
                    return err
                });
        },

    }
};