// import Vue from 'vue';
import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'


const getDefaultState = () => {
    return {
        wallet_balance: {},
        transactions: [],
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        walletBalance: state => {
            return state.wallet_balance
        },
        getTransactions: state => {
            return state.transactions
        },
    },
    mutations: {


    },
    actions: {

    }
};