<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 17:18:58
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 21:25:42
 * @FilePath: /final-phrase-demo/src/views/edit-play/index.vue
 * @Description: 
-->
<!--  -->
<template>
    <div>
        <Title :initial-text="title"></Title>
        <div v-for="(item, index) in content" :key="item.sessionTitle">
            <RichText
                :content="item.text"
                @saveRich="
                    text => {
                        html = text;
                    }
                "
            ></RichText>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive, toRefs, onMounted } from 'vue';
import RichText from '@/components/RichText/index.vue';
import Title from '@/components/title.vue';

const state = reactive({
    title: '标题',
    content: [
        {
            sessionTitle: '场次1',
            text: '正文'
        }
    ],
    html: ''
});

const { title, content, html } = toRefs(state);
</script>
<style lang="less" scoped></style>
