/*
 * @Author: 777
 * @Date: 2024-03-16 18:25:55
 * @LastEditTime: 2024-08-03 13:06:09
 * @LastEditors: suqi suqi.777@bytedance.com
 * @FilePath: /final-phrase-demo/src/main.ts
 * @Description: 文件描述
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/style/index.less';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import "./style/index.less"

const AppVue = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    AppVue.component(key, component);
}
AppVue.use(router);

AppVue.use(ElementPlus);

AppVue.mount('#app');
