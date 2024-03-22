/*
 * @LastEditTime: 2024-03-22 20:53:25
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/router/index.ts
 * @Description: 文件描述
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home-page/index.vue'
import Register from '../views/Register/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home-page',
        component: HomePage
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
