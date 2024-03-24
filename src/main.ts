/*
 * @Author: suqi04
 * @Date: 2024-03-16 18:25:55
 * @LastEditTime: 2024-03-24 14:26:18
 * @LastEditors: huangwensong
 * @FilePath: /final-phrase-demo/src/main.ts
 * @Description: 文件描述
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/style/index.less';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const AppVue = createApp(App);
AppVue.use(store).use(router);

AppVue.use(ElementPlus);

AppVue.mount("#app");
