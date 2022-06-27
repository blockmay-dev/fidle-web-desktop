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
        myStories: []
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
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
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
            state.notifications = new_notifications;
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
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        login: ({ commit }, { token, user }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
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
    },
    modules: {
        auth
    },
})