import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        posts: [],
        wallet: {},
        transactions: [],
        all_notifications: [],
        all_notificationsCount: '',
        stories: [],
        myStories: [],
        loggedIn: false,
        tags: [],
        post_analytics: [],
        single_post: {}
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isAuthenticated: state => {
            return state.token;
        },
        isLoggedIn: state => {
            return state.loggedIn;
        },
        getUser: state => {
            return state.user;
        },
        getWallet: state => {
            return state.wallet
        },
        getTransactions: state => {
            return state.transactions
        },
        getNotifications: state => {
            return state.all_notifications
        },
        getNotificationsCount: state => {
            return state.all_notificationsCount
        },
        getStories: state => {
            return state.stories
        },
        getMyStories: state => {
            return state.myStories
        },
        getTags: state => {
            return state.tags
        },
        getPostAnalytics: state => {
            return state.post_analytics
        },
        getSinglePost: state => {
            return state.single_post
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        LOGGED_IN: (state, loggedIn) => {
            state.loggedIn = loggedIn;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        UPDATE_USER: (state, userData) => {
            state.user = userData;
        },
        SET_WALLET: (state, wallet) => {
            state.wallet = wallet;
        },
        UPDATE_WALLET: (state, new_wallet) => {
            state.wallet = new_wallet;
        },
        SET_TRANSACTIONS: (state, transactions) => {
            state.transactions = transactions;
        },
        UPDATE_TRANSACTIONS: (state, new_transactions) => {
            state.transactions = new_transactions;
        },
        SET_NOTIFICATIONS: (state, all_notifications) => {
            state.all_notifications = all_notifications;
        },
        UPDATE_NOTIFICATIONS: (state, new_notifications) => {
            state.all_notifications.push(new_notifications);
        },
        SET_NOTIFICATIONS_COUNT: (state, all_notificationsCount) => {
            state.all_notificationsCount = all_notificationsCount;
        },
        UPDATE_NOTIFICATIONS_COUNT: (state, new_notificationsCount) => {
            state.all_notificationsCount = new_notificationsCount;
        },
        SET_STORIES: (state, stories) => {
            state.stories = stories;
        },
        SET_MY_STORIES: (state, myStories) => {
            state.myStories = myStories;
        },
        UPDATE_MY_STORIES: (state, updateStories) => {
            state.myStories = updateStories;
        },
        SET_TAGS: (state, tags) => {
            state.tags = tags;
        },
        UPDATE_TAGS: (state, new_tags) => {
            state.tags = new_tags;
        },
        SET_POST_ANALYTICS: (state, post_analytics) => {
            state.post_analytics = post_analytics;
        },
        SET_SINGLE_POST: (state, single_post) => {
            state.single_post = single_post;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        login: ({ commit }, { token, user, loggedIn }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
            commit('LOGGED_IN', loggedIn);
        },
        updateUser: ({ commit }, { userData }) => {
            commit('UPDATE_USER', userData);
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        },
        wallets: ({ commit }, { wallet }) => {
            commit('SET_WALLET', wallet);
        },
        updateWallet: ({ commit }, { new_wallet }) => {
            commit('UPDATE_WALLET', new_wallet);
        },
        transactions: ({ commit }, { transactions }) => {
            commit('SET_TRANSACTIONS', transactions);
        },
        updateTransaction: ({ commit }, { new_transactions }) => {
            commit('UPDATE_TRANSACTIONS', new_transactions);
        },
        getNotifications: ({ commit }, { all_notifications }) => {
            commit('SET_NOTIFICATIONS', all_notifications);
        },
        updateNotification: ({ commit }, { new_notifications }) => {
            commit('UPDATE_NOTIFICATIONS', new_notifications);
        },
        setNotificationsCount: ({ commit }, { all_notificationsCount }) => {
            commit('SET_NOTIFICATIONS_COUNT', all_notificationsCount);
        },
        updateNotificationsCount: ({ commit }, { new_notificationsCount }) => {
            commit('UPDATE_NOTIFICATIONS_COUNT', new_notificationsCount);
        },

        setStories: ({ commit }, { stories }) => {
            commit('SET_STORIES', stories);
        },
        setMyStories: ({ commit }, { myStories }) => {
            commit('SET_MY_STORIES', myStories);
        },
        updateMyStories: ({ commit }, { updateStories }) => {
            commit('UPDATE_MY_STORIES', updateStories);
        },
        setTags: ({ commit }, { tags }) => {
            commit('SET_TAGS', tags);
        },
        updateTags: ({ commit }, { new_tags }) => {
            commit('UPDATE_TAGS', new_tags);
        },
        setPostAnalytics: ({ commit }, { post_analytics }) => {
            commit('SET_POST_ANALYTICS', post_analytics)
        },
        setSinglePost: ({ commit }, { single_post }) => {
            commit('SET_SINGLE_POST', single_post)
        }
    },
    modules: {
        auth
    },
})