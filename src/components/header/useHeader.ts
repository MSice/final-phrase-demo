/*
 * @Author: huangwensong
 * @Date: 2024-03-24 14:40:18
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 15:39:54
 * @FilePath: /final-phrase-demo/src/components/Header/useHeader.ts
 * @Description:
 */

import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const headerHideList: any = ['/', '/home'];

const useHeader = () => {
    const showHeader = ref(true);
    const route = useRoute();
    onMounted(() => {
        headerHideList.map((item: string) => {
            item === location.pathname && (showHeader.value = false);
        });
    });

    // 监听路由变化
    watch(
        route,
        newVal => {
            newVal.name === 'home' && (showHeader.value = false);
        },
        { deep: true }
    );

    return {
        showHeader
    };
};

export default useHeader;
