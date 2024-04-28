/*
 * @Author: 777
 * @Date: 2024-03-24 14:40:18
 * @LastEditors: 777
 * @LastEditTime: 2024-03-27 19:04:11
 * @FilePath: /final-phrase-demo/src/components/Header/useHeader.ts
 * @Description:
 */

import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const headerHideList: any = ['/', '/home', '/introduction'];
const isRegister = ref(false);

const useHeader = () => {
    const showHeader = ref(true);
    const route = useRoute();
    onMounted(() => {
        headerHideList.map((item: string) => {
            item === location.pathname && (showHeader.value = false);
        });
        location.pathname.includes('register') && (isRegister.value = true);
    });

    // 监听路由变化
    watch(
        route,
        newVal => {
            newVal.name === 'Home' && (showHeader.value = false);
            newVal.name === 'Register' ? (isRegister.value = true) : (isRegister.value = false);
        },
        { deep: true }
    );

    return {
        showHeader,
        isRegister
    };
};

export default useHeader;
