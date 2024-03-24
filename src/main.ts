/*
 * @Author: suqi04
 * @Date: 2024-03-16 18:25:55
 * @LastEditTime: 2024-03-24 12:28:43
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/main.ts
 * @Description: 文件描述
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/index.less'

const AppVue = createApp(App)
AppVue.use(router)

AppVue.use(ElementPlus)

AppVue.mount("#app");
