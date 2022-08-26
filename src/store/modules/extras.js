// import Vue from 'vue';

import request from '@/config/axios'
import createPersistedState from 'vuex-persistedstate';

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        countries: [],
        tags: [],
        states: [],
        lgas: [],
        users: [],
        user_search_result: []
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
        statesList: state => {
            return state.states
        },
        lgasList: state => {
            return state.lgas
        },
        getTags: state => {
            return state.tags
        },
        getAllUsers: state => {
            return state.users
        },
        getUserResult: state => {
            return state.user_search_result
        }
    },
    mutations: {
        SET_COUNTRIES: (state, countries) => {
            state.countries = countries;
        },
        SET_STATES: (state, states) => {
            state.states = states;
        },
        SET_LGAS: (state, lgas) => {
            state.lgas = lgas;
        },
        SET_TAGS: (state, tags) => {
            state.tags = tags
        },
        SET_USERS: (state, users) => {
            state.users = users
        },
        USER_SEARCH_RESULT: (state, data) => {
            state.user_search_result = data
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        // List Tags
        getTags({ commit }) {
            request().get('hashtags')
                .then((res) => {
                    commit('SET_TAGS', res.data)
                })
                .catch((err) => {
                    return err;
                })
        },

        // List Users 
        listUsers({ commit }) {
            request().get('/users/')
                .then((res) => {
                    commit('SET_USERS', res.data)
                })
                .catch((err) => {
                    return err;
                })
        },

        // Search Users 
        searchUsers({ commit }, search_item) {
            request().get(`/users?search=${search_item}`)
                .then((res) => {
                    commit('USER_SEARCH_RESULT', res.data)
                })
                .catch((err) => {
                    return err;
                })
        },

        // List Countries
        listCountries({ commit }) {
            request().get("/locations/countries")
                .then((res) => {
                    commit("SET_COUNTRIES", res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // List States
        listStates({ commit }, selectedCountry) {
            request().get(`locations/countries/${selectedCountry}/states/`)
                .then((res) => {
                    commit("SET_STATES", res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // List States
        listCities({ commit }, selectedState) {
            request().get(`locations/states/${selectedState}/cities/`)
                .then((res) => {
                    commit("SET_LGAS", res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

    }
};