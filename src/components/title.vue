<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 19:36:36
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 21:12:45
 * @FilePath: /final-phrase-demo/src/views/edit-play/title.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="edit-title">
        <div class="editing">
            <input
                v-if="editing"
                v-model="editedText"
                class="editable-textarea"
                contenteditable="true"
                ref="input"
                autosize
            />
            <div v-else>{{ originalText }}</div>
        </div>

        <!-- <el-button type="text" @click="toggleEdit">{{
            editing ? '保存' : '编辑'
        }}</el-button> -->
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

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

// Emit an event when the editing mode changes
// const emitEditModeChange = () => {
//     emit('edit-mode-change', editing.value);
// };

// Emit an event when the text is saved
const emitTextSaved = () => {
    emit('textSaved', originalText.value);
};
</script>
<style lang="less" scoped>
.edit-title {
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 42px;
    // font-weight: bold;
    padding: 10px;
    .editing {
        margin-right: 10px;
        // width: 400px;
        text-align: left;
        height: 60px;
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
