import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../layouts/feedsLayout.vue'
import UserView from '../layouts/userLayout.vue'
// import store from '../store/modules/auth'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'sign-in',
        // beforeEnter(to, from, next) {
        //     var loggedIn;
        //     loggedIn = store.getters.isLoggedIn
        //     if (loggedIn) {
        //         next({
        //             name: "feeds",
        //         });
        //     } else {
        //         next();
        //     }
        // },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/auth/loginPage.vue')
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        // beforeEnter(to, from, next) {
        //     var loggedIn;
        //     loggedIn = store.getters.isLoggedIn
        //     if (loggedIn) {
        //         next({
        //             name: "feeds",
        //         });
        //     } else {
        //         next();
        //     }
        // },
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
        path: '/feeds',
        component: HomeView,
        async beforeEnter(to, from, next) {
            var loggedIn
            loggedIn = localStorage.getItem("loggedIn")
            if (!loggedIn) {
                next({
                    name: "sign-in",
                    query: { redirectFrom: to.fullPath },
                });
            } else {
                next();
            }
        },
        children: [{
                path: '/feeds',
                name: 'feeds',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/posts/indexPage.vue')
            },
            {
                path: '/referrals',
                name: 'referrals',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/referrals/indexPage.vue')
            },
            {
                path: '/suggestions',
                name: 'suggestions',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/suggestions/indexPage.vue')
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
        path: '/profile',
        component: UserView,
        async beforeEnter(to, from, next) {
            var loggedIn
            loggedIn = localStorage.getItem("loggedIn")
            if (!loggedIn) {
                next({
                    name: "sign-in",
                    query: { redirectFrom: to.fullPath },
                });
            } else {
                next();
            }
        },
        children: [{
                path: '/profile',
                name: 'user-profile',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/user/profile/indexPage.vue'),
                children: [{
                    path: '/profile',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "about" */ '../pages/user/profile/mainProfile.vue'),
                    children: [{
                            path: '/profile',
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () =>
                                import ( /* webpackChunkName: "about" */ '@/components/user/profile/postView.vue'),
                        },
                        {
                            path: '/profile/media',
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () =>
                                import ( /* webpackChunkName: "about" */ '@/components/user/profile/mediaView.vue'),
                        },
                        {
                            path: '/profile/saved-posts',
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () =>
                                import ( /* webpackChunkName: "about" */ '@/components/user/profile/savedPosts.vue'),
                        },
                        {
                            path: '/profile/connections',
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () =>
                                import ( /* webpackChunkName: "about" */ '@/components/user/profile/userConnects.vue'),
                        },
                        {
                            path: '/profile/nft-collections',
                            meta: {
                                breadcrumb: 'HomePage',
                            },
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () =>
                                import ( /* webpackChunkName: "about" */ '@/components/user/nft/indexPage.vue'),

                            children: [{
                                    path: '/profile/nft-collections',
                                    meta: {
                                        breadcrumb: 'Home Page'
                                    },
                                    // route level code-splitting
                                    // this generates a separate chunk (about.[hash].js) for this route
                                    // which is lazy-loaded when the route is visited.
                                    component: () =>
                                        import ( /* webpackChunkName: "about" */ '@/components/user/nft/nftCollections.vue'),
                                },
                                {
                                    path: '/profile/nft-collections/:id',
                                    meta: {
                                        breadcrumb: 'Id Page'
                                    },
                                    // route level code-splitting
                                    // this generates a separate chunk (about.[hash].js) for this route
                                    // which is lazy-loaded when the route is visited.
                                    component: () =>
                                        import ( /* webpackChunkName: "about" */ '@/components/user/nft/nftCollectionId.vue'),
                                },
                                {
                                    path: '/profile/nfts/id',
                                    meta: {
                                        breadcrumb: 'Nft Page'
                                    },
                                    // route level code-splitting
                                    // this generates a separate chunk (about.[hash].js) for this route
                                    // which is lazy-loaded when the route is visited.
                                    component: () =>
                                        import ( /* webpackChunkName: "about" */ '@/components/user/nft/nftId.vue'),
                                },

                            ]
                        },
                        {
                            path: '/profile/boosted-posts',
                            // route level code-splitting
                            // this generates a separate chunk (about.[hash].js) for this route
                            // which is lazy-loaded when the route is visited.
                            component: () =>
                                import ( /* webpackChunkName: "about" */ '@/components/user/profile/boostedPosts.vue'),
                        }
                    ]
                }, ]
            },

            {
                path: '/create-nft-collection',
                name: 'create-nft-collection',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/user/nft/indexView.vue')
            },
            {
                path: '/convert-post-to-nft',
                name: 'convert-to-nft',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../components/user/nft/convertToNFT.vue')
            },

            {
                path: '/messenger',
                name: 'messenger',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../pages/messenger/indexView.vue'),
                children: [{
                        path: '/messenger',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../pages/messenger/noChat.vue')
                    },
                    {
                        path: '/messenger/:id',
                        name: 'single-message',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../pages/messenger/chatArea.vue')
                    },
                ]
            },
            {
                path: '/fidler',
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
        path: '/r',
        name: 'referral-redirect',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../pages/referrals/redirectionPage.vue')
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
    base: process.env.BASE_URL,
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes
})

export default router