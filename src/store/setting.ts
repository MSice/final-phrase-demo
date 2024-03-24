/*
 * @Author: suqi04
 * @Date: 2024-03-23 17:14:43
 * @LastEditTime: 2024-03-24 13:04:19
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/store/setting.ts
 * @Description: 项目全局组件配置文件
 */


import { ref } from "vue";
const showLogin = ref(false);
const AppControlSetting = () => {
    
    return {
        showLogin
    }
}
export default AppControlSetting