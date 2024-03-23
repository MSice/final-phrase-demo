/*
 * @LastEditTime: 2024-03-23 17:49:52
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/router/index.ts
 * @Description: 文件描述
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import HomePage from '@/views/home-page/index.vue'
import Register from '../views/Register/index.vue'
import Creation from '../views/creation/index.vue'

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
    },
    {
        path: '/creation',
        component: layout,
        children: [
            {
                path: '',
                component: Creation
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
