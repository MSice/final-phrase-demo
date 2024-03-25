/*
 * @LastEditTime: 2024-03-25 19:00:56
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/router/index.ts
 * @Description: 文件描述
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AppUserInfo from '@/store/userInfo'
const { userInfo } = AppUserInfo()

import AppDomConfig from '@/store/fullSituation'
const { ShowLoaginDialog } = AppDomConfig()

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
        meta: {
            needLogin: true
        },
        component: Register
    },
    {
        path: '/creation',
        name: 'Creation',
        children: [
            {
                path: '',
                meta: {
                    needLogin: true
                },
                component: Creation
            },
            {
                path: 'form',
                name: 'Form',
                meta: {
                    needLogin: true
                },
                component: CreationForm
            }
        ]
    },
    {
        path: '/showPlay',
        name: 'ShowPlay',
        meta: {
            needLogin: true
        },
        component: ShowPlay
    },
    {
        path: '/editPlay',
        name: 'EditPlay',
        meta: {
            needLogin: true
        },
        component: EditPlay
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin && !localStorage.getItem('token') && !userInfo.name) {
        ShowLoaginDialog.value = true
        next({
            path: '/'
        })
    } else {
        next()
    }
})
export default router
