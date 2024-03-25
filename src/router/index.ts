/*
 * @LastEditTime: 2024-03-25 09:59:07
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/router/index.ts
 * @Description: 文件描述
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home-page/index.vue'
import Register from '@/views/register/index.vue'
import Creation from '@/views/creation/index.vue'
import CreationForm from '@/views/creation/form.vue'
import ShowPlay from '../views/show-play/index.vue'
import EditPlay from '../views/edit-play/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: { name: 'home' }
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/creation',
        name: 'Creation',
        children: [
            {
                path: '',
                component: Creation
            },
            {
                path: 'form',
                name: 'Form',
                component: CreationForm
            }
        ]
    },
    {
        path: '/showPlay',
        name: 'ShowPlay',
        component: ShowPlay
    },
    {
        path: '/editPlay',
        name: 'EditPlay',
        component: EditPlay
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
