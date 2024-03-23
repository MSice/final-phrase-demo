/*
 * @Author: suqi04
 * @Date: 2024-03-16 18:25:55
 * @LastEditTime: 2024-03-23 17:30:25
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/store/index.ts
 * @Description: 文件描述
 */
import { createStore } from 'vuex';
// import getters from './getters';
import setting from './setting';

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    // getters,
    modules: {
        setting
    }
});
