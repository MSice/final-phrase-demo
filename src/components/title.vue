<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 19:36:36
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-28 19:21:54
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

        <div v-if="$route.path === '/editPlay'" class="control">
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
                @click="saveInfo"
            >
                预览
            </el-button>
            <el-button
                type="primary"
                @click="saveInfo"
            >
                保存
            </el-button>
            <el-button
                v-if="$route.query.type && $route.query.type === '2'"
                type="primary"
                :disabled="parseInt($route.query.index || 0, 10) >= content.length - 1"
                @click="nextHandle"
            >
                下一场
            </el-button>
        </div>
        <!-- <el-button type="text" @click="toggleEdit">{{
            editing ? '保存' : '编辑'
        }}</el-button> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, toRefs, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PlayInfo from '@/store/palyInfo';
const { state } = PlayInfo();

const { content }: any = toRefs(state);

const router = useRouter();
const $route = useRoute();
const index = ref(0);

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
                index: index.value + 1
            }
        });
    }
};
const saveInfo = () => {
    setTimeout(() => {
        router.push({
            path: '/showPlay',
            query: {
                showScript: 'read'
            }
        });
    }, 100);}
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
