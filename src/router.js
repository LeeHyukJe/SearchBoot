import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//import About from './views/About.vue'
import Login from './views/Login.vue'
import AccessDenied from './views/Access.vue'

Vue.use(Router)

// const UsersDetail = () => {
//     return import ('./view/UsersDetail.vue')
// }


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/search',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => {
                import ('./views/About.vue')
            }
        },
        {
            path: '/users',
            name: 'users',
            component: () =>
                import ('./views/Users.vue'),
            children: [{
                    path: ':id',
                    name: 'users-detail',
                    component: () =>
                        import ('./views/UsersDetail.vue')
                },
                {
                    path: ':id/edit',
                    name: 'users-edit',
                    component: () =>
                        import ('./views/UsersEdit.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'search',
            component: () =>
                import ('./views/Search.vue')
        },
        {
            path: '/access',
            name: 'access',
            component: AccessDenied

        },
        {
            path: '/admin',
            name: 'admin',
            component: () =>
                import ('./views/Admin.vue')
        }
    ]
})