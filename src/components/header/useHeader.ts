/*
 * @Author: huangwensong
 * @Date: 2024-03-24 14:40:18
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 16:29:59
 * @FilePath: /final-phrase-demo/src/components/Header/useHeader.ts
 * @Description:
 */

import { reactive, toRefs, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const headerHideList: any = ['/', '/home'];

const useHeader = () => {
    const route = useRoute();
    const showHeader = ref(true);
    onMounted(() => {
        console.log(route);
        headerHideList.map((item: string) => {
            item === route.path && (showHeader.value = false);
        });

        console.log(showHeader.value);
    });

    return {
        showHeader
    };
};

export default useHeader;
