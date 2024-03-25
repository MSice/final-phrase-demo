<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 17:18:58
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 20:27:28
 * @FilePath: /final-phrase-demo/src/views/edit-play/index.vue
 * @Description: 
-->
<!--  -->
<template>
    <div>
        <AllContent v-if="playTyle === '1'"></AllContent>
        <ItemContent v-else></ItemContent>
        <!-- <div v-for="item in content" :key="item.sessionTitle">
            <RichText
                :content="item.text"
                @saveRich="
                    text => {
                        console.log(text);
                    }
                "
            ></RichText>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref, reactive, toRefs, onMounted } from 'vue';
import RichText from '@/components/RichText/index.vue';
import AllContent from './AllContent.vue';
import ItemContent from './ItemContent.vue';
import Title from '@/components/title.vue';
import { useRoute } from 'vue-router';
import PlayInfo from '../../store/palyInfo';

const { state } = PlayInfo();

const route = useRoute();

const playTyle = ref<string>('1');

onMounted(() => {
    console.log(route.query);
    playTyle.value = route?.query?.type == '1' ? '1' : '2';
});

const { title, content } = toRefs(state);
</script>
<style lang="less" scoped></style>
