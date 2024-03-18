/*
 * @Author: suqi04
 * @Date: 2024-03-16 18:25:55
 * @LastEditTime: 2024-03-16 18:33:19
 * @LastEditors: suqi04
 * @FilePath: /baidu/final-phrase-demo/app-demo/src/router/index.ts
 * @Description: 文件描述
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
