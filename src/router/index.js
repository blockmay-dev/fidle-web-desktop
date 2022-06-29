import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../layouts/feedsLayout.vue'
import UserView from '../layouts/userLayout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'sign-in',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/auth/loginPage.vue')
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/auth/registerPage.vue'),
        children: [{
                path: '/sign-up',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/registration/registerUser.vue')
            },
            {
                path: '/sign-up/complete-profile',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/registration/completeProfile.vue')
            }
        ]
    },
    {
        path: '/',
        component: HomeView,
        children: [{
                path: '/all-posts',
                name: 'all-posts',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/posts/indexPage.vue')
            },
            {
                path: '/stories/create',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/stories/indexPage.vue'),
                children: [{
                    path: '/stories/create',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../components/stories/chooseType.vue')
                }, {
                    path: '/stories/view',
                    name: 'view-story',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../components/stories/viewPostedStories.vue')
                }, ]
            },
        ]
    },

    {
        path: '/',
        component: UserView,
        children: [{
                path: '/profile',
                name: 'user-profile',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/user/profile/indexPage.vue')
            },
            {
                path: '/messenger',
                name: 'messenger',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/messenger/indexView.vue')
            },
            {
                path: '/fidler/:id',
                name: 'fidler-profile',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/fidler/indexPage.vue')
            },
            {
                path: '/wallet',
                name: 'wallet',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/user/wallet/indexPage.vue')
            },
            {
                path: '/search-results',
                name: 'search-results',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/static/search/searchResults.vue')
            },
            {
                path: '/notifications',
                name: 'notifications',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/user/notifications/userNotifications.vue')
            },
            {
                path: '/settings',
                name: 'settings',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/settings/indexPage.vue')
            },
            {
                path: '/fidle/external-post-source',
                name: 'single-fidle-post',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/posts/singlePost.vue')
            },
            {
                path: '/fidle/:id',
                name: 'single-fidle',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/posts/_id.vue')
            },
            {
                path: '/stories/create',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/stories/indexPage.vue'),
                children: [{
                    path: '/stories/create',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../components/stories/chooseType.vue')
                }, {
                    path: '/stories/view',
                    name: 'view-story',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../components/stories/viewPostedStories.vue')
                }, ]
            },
        ]
    },

    {
        path: '/follow-to-continue',
        name: 'follow',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/registration/followFive.vue')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_ROOT_API,
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes
})

export default router