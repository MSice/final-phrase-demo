<!--
 * @Author: 777
 * @Date: 2024-03-24 17:18:58
 * @LastEditors: 777
 * @LastEditTime: 2024-03-28 17:50:12
 * @FilePath: /final-phrase-demo/src/views/edit-play/index.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="edit-play">
        <AllContent v-if="playType === '1'"></AllContent>
        <ItemContent v-else></ItemContent>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import AllContent from './AllContent.vue';
import ItemContent from './ItemContent.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const playType = ref<string>('1');

onMounted(() => {
    playType.value = route?.query?.type == '1' ? '1' : '2';
});
</script>
<style lang="less" scoped>
.edit-play {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
