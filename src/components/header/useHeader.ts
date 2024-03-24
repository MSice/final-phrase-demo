/*
 * @Author: huangwensong
 * @Date: 2024-03-24 14:40:18
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 16:36:02
 * @FilePath: /final-phrase-demo/src/components/Header/useHeader.ts
 * @Description:
 */

import { reactive, toRefs, onMounted, ref } from 'vue';

const headerHideList: any = ['/', '/home'];

const useHeader = () => {
    const showHeader = ref(true);
    onMounted(() => {
        headerHideList.map((item: string) => {
            item === location.pathname && (showHeader.value = false);
        });

        console.log(showHeader.value);
    });

    return {
        showHeader
    };
};

export default useHeader;
