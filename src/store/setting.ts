/*
 * @Author: suqi04
 * @Date: 2024-03-24 16:37:46
 * @LastEditTime: 2024-03-24 16:46:36
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/store/setting.ts
 * @Description: 全局配置
 */
import { ref } from 'vue';
const ShowLoaginDialog = ref(false);

const AppDomConfig = () => {
    return {
        ShowLoaginDialog
    };
};

export default AppDomConfig;
