import Vue from 'vue';
import Router from 'vue-router';

console.log(Vue);

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "routerapp" */'./components/app.vue')
        },
        {
            path: '/other',
            name: 'other',
            component: () => import(/* webpackChunkName: "routerother" */'./components/other.vue')
        }
    ]
});

export default router;