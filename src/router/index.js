import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/view/Home.vue';
import Sliding from '@/components/MainContent/Sliding.vue';
import MainContentVue from '@/App.vue';
import Rain from '@/App.vue'
import MobileLogin from '@/components/MainContent/MobileLogin.vue';
import App from '@/App.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'App',
            components: App
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta:{requiresAuth:true} // 添加该字段，表示进入这个路由是需要登录的
        },
        {
            path: '/mobile-login',
            name: 'MobileLogin',
            component: MobileLogin
        }
    ]
});

// 导航守卫 用于判断是否登录
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('user'); // 检查用户是否已登录
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'App' }); // 未登录，重定向到登录页面
    } else {
        next(); // 已登录，允许访问
    }
});

export default router;