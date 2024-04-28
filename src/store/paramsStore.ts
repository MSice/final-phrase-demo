/*
 * @Author: 777
 * @Date: 2024-03-24 16:37:46
 * @LastEditTime: 2024-03-25 15:45:39
 * @LastEditors: 777
 * @FilePath: /final-phrase-demo/src/store/paramsStore.ts
 * @Description: 全局参数
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
