/*
<<<<<<< HEAD
 * @LastEditTime: 2024-03-24 21:31:13
 * @LastEditors: suqi04
=======
 * @LastEditTime: 2024-03-24 17:19:43
 * @LastEditors: huangwensong
>>>>>>> db47d25f62a66887781f1067d6eec59bd3bfda41
 * @FilePath: /final-phrase-demo/src/router/index.ts
 * @Description: 文件描述
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home-page/index.vue'
<<<<<<< HEAD
import Register from '@/views/Register/index.vue'
import Creation from '@/views/creation/index.vue'
import CreationForm from '@/views/creation/form.vue'
=======
import Register from '../views/register/index.vue'
import Creation from '../views/creation/index.vue'
import ShowPlay from '../views/show-play/index.vue'
import EditPlay from '../views/edit-play/index.vue'
>>>>>>> db47d25f62a66887781f1067d6eec59bd3bfda41

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
<<<<<<< HEAD
        children: [
            {
                path: '',
                component: Creation
            },
            {
                path: '/form',
                name: 'Form',
                component: CreationForm
            },
        ]
=======
        component: Creation
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
>>>>>>> db47d25f62a66887781f1067d6eec59bd3bfda41
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
