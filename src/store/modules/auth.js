// import Vue from 'vue';

import http from '@/plugins/http'
import createPersistedState from 'vuex-persistedstate';

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        countries: [],
        token: '',
        user: {},
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        countriesList: state => {
            return state.countries
        },
        isAuthenticated: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        },
    },
    mutations: {
        SET_COUNTRIES: (state, countries) => {
            state.countries = countries;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {

        // Get Countries
        async getCountries({ commit }) {
            const res = await http.get('locations/countries')
            commit('SET_COUNTRIES', res.data);
            return res
        },
        login: ({ commit }, { token, user }) => {
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
        },
    }
};