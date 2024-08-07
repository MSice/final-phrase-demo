<!--
 * @Author: 777
 * @Date: 2024-03-24 19:36:36
 * @LastEditors: suqi suqi.777@bytedance.com
 * @LastEditTime: 2024-08-07 21:55:47
 * @FilePath: /final-phrase-demo/src/components/title.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="edit-title">
        <div class="editing">
            <!-- <input
                v-if="editing"
                v-model="editedText"
                class="editable-textarea"
                contenteditable="true"
                ref="input"
                autosize
            />
            <div v-else>{{ originalText }}</div> -->
            <div>{{ originalText }}</div>
        </div>

        <div
            v-if="$route.path === '/editPlay'"
            class="control"
        >
            <el-button
                v-if="$route.query.type && $route.query.type === '2'"
                type="primary"
                :disabled="parseInt($route.query.index || 0, 10) <= 0"
                @click="upHandle"
            >
                上一场
            </el-button>
            <el-button
                type="primary"
                @click="drawer = true"
            > 概述 </el-button>
            <el-button
                type="primary"
                @click="saveInfo(1)"
            > 预览 </el-button>
            <el-button
                type="primary"
                @click="saveInfo(0)"
            > 保存 </el-button>
            <el-button
                v-if="$route.query.type && $route.query.type === '2'"
                type="primary"
                :disabled="
                    parseInt($route.query.index || 0, 10) >= content.length - 1
                "
                @click="nextHandle"
            >
                下一场
            </el-button>
        </div>
        <!-- <el-button type="text" @click="toggleEdit">{{
            editing ? '保存' : '编辑'
        }}</el-button> -->
        <el-drawer
            v-model="drawer"
            :with-header="false"
        >
            <span v-html="jjInfo" :contenteditable="false"></span>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import {
    ref,
    defineProps,
    defineEmits,
    watch,
    toRefs,
    onBeforeMount
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PlayInfo from '@/store/palyInfo';
const { state, Prequel } = PlayInfo();

const { content }: any = toRefs(state);

const router = useRouter();
const $route = useRoute();
const index = ref($route.query.index || 0);

const jjInfo = ref('');
const drawer = ref(false);

Prequel.content.forEach(item => {
    jjInfo.value += `<h3 class="text-content-title" style="margin:20px 0 10px 20px">${
        item.sessionTitle
    }</h3>${removeInputTags(item.text)}`;
});

function removeInputTags(htmlString: string) {
    // 定义匹配<input>标签的正则表达式
    var inputPattern = /<input[^>]*>/g;
    // 使用replace()方法替换匹配到的<input>标签为空字符串
    var result = htmlString.replace(inputPattern, '');
    return result;
}
watch(
    $route,
    val => {
        console.log(content.value);

        if (parseInt(val.query.index || 1, 10) > content.value.length - 1) {
            router.push({
                query: {
                    type: 2,
                    index: content.value.length - 1
                }
            });
        }
        index.value = parseInt(val.query.index || 0, 10);
    },
    {
        deep: true
    }
);

const props = defineProps({
    initialText: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['textSaved']);

const originalText = ref(props.initialText);
const editedText = ref('');
const input = ref('input');
const editing = ref(false);

const toggleEdit = () => {
    if (editing.value) {
        // Save the edited text
        originalText.value = editedText.value;
    } else {
        // Switch to edit mode
        editedText.value = originalText.value;
        console.log('cs');
        // Focus on the textarea when entering edit mode
        setTimeout(() => {
            const inputElement = document.querySelector('.editable-textarea');
            inputElement.focus();
        }, 0);
    }
    editing.value = !editing.value;
};

const upHandle = () => {
    console.log(index.value + 1);
    if (index.value > 0) {
        router.push({
            query: {
                type: 2,
                index: index.value - 1
            }
        });
    }
};
const nextHandle = () => {
    console.log(index.value + 1);
    if (index.value + 1 < content.value.length) {
        router.push({
            query: {
                type: 2,
                index: (index.value || 0) + 1
            }
        });
    }
};
const saveInfo = (type = 0) => {
    
    localStorage.setItem('MainScript_history', JSON.stringify(state));
    setTimeout(() => {
        router.push({
            path: '/showPlay',
            query: {
                showScript: 'read',
                preview: 1
            }
        });
    }, 100);
};
// Emit an event when the editing mode changes
// const emitEditModeChange = () => {
//     emit('edit-mode-change', editing.value);
// };

// Emit an event when the text is saved
const emitTextSaved = () => {
    emit('textSaved', originalText.value);
};
onBeforeMount(() => {
    console.log($route.query.index);

    index.value = parseInt($route.query.index || 2, 10);
});
</script>
<style>
.el-drawer {
    min-width: 700px!important;
}
.el-drawer h3 {
    text-align: left;
    font-size: 20px;
}
.el-drawer .ql-editor {
    height: auto;
}
</style>
<style lang="less" scoped>
.edit-title {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    height: 60px;
    padding: 10px;
    // font-weight: bold;;
    .editing {
        margin-right: 10px;
        // width: 400px;
        text-align: left;
        height: 100%;
        font-weight: bold;
    }
    .editable-textarea {
        border: none;
        outline: none;
        resize: none;
        overflow: hidden;
        background: transparent;
        font-size: inherit;
        font-family: inherit;
        color: inherit;
        padding: 0;
        height: 60px;
        margin: 0;
        box-sizing: border-box;
        line-height: inherit;
    }

    .editable-textarea::placeholder {
        color: transparent;
    }

    /* Customize cursor */
    .editable-textarea:focus {
        cursor: text;
    }
}
</style>
