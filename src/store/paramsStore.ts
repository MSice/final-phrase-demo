/*
 * @Author: suqi04
 * @Date: 2024-03-24 16:37:46
 * @LastEditTime: 2024-03-24 23:01:37
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/store/paramsStore.ts
 * @Description: 全局配置
 */
import { ref, reactive } from 'vue';
const creationFormParams = reactive({
    scriptType: '',
    agruements: {} 
})
const ParamsStore = () => {
    return {
        creationFormParams
    };
};

export default ParamsStore;
