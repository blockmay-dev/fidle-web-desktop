import Vue from 'vue'
import Vuex from 'vuex'

// Modules 
import auth from './modules/auth'
import posts from './modules/posts'
import suggestions from './modules/suggestions'
import messages from './modules/messages'
import fidler from './modules/fidler'
import notifications from './modules/notifications'
import extras from './modules/extras'
import user from './modules/user'
import nft from './modules/nft'
import stories from './modules/stories'



import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

const getDefaultState = () => {
    return {

    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        auth,
        posts,
        suggestions,
        messages,
        fidler,
        notifications,
        extras,
        user,
        nft,
        stories
    },
})