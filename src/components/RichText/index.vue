<!--
 * @Author: huangwensong
 * @Date: 2024-03-24 14:20:27
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 21:38:11
 * @FilePath: /final-phrase-demo/src/components/RichText/index.vue
 * @Description:
-->
<!--  -->
<template>
    <div>
        <quill-editor
            content-type="html"
            :content="state.text"
            :options="editorOption"
            @blur="editorBlur($event)"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    reactive,
    toRefs,
    onMounted,
    ref,
    defineProps,
    defineEmits
} from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
const props = defineProps({
    content: {
        type: String,
        default: ''
    }
});

const state = reactive({
    text: props.content
});

const emit = defineEmits(['saveRich']);

let editorOption = {
    modules: {
        // toolbar: [
        //     [
        //         'bold',
        //         'italic',
        //         'underline',
        //         'strike',
        //         { color: [] },
        //         { background: [] } // 字体颜色、字体背景颜色
        //     ], // 加粗 斜体 下划线 删除线
        //     [{ align: [] }], // 对齐方式
        //     [{ size: ['small', 'large', 'huge'] }], // 字体大小
        //     [{ font: [] }], // 字体种类
        //     [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
        //     // [{ direction: 'ltl' }], // 文本方向
        //     // [{ direction: 'rtl' }], // 文本方向
        //     // [{ indent: '-1' }, { indent: '+1' }], // 缩进
        //     [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
        //     [{ script: 'sub' }, { script: 'super' }], // 上标/下标
        //     // ['blockquote', 'code-block'], // 引用  代码块
        //     ['clean'] // 清除文本格式
        //     // ['link', 'image', 'video'] // 链接、图片、视频
        // ]
        toolbar: false
    }
};

function editorBlur(val: any) {
    emit('saveRich', val.value.innerHTML);
    console.log(val.value.innerHTML);
    console.log('当前的文本框的内容：' + val);
}
</script>
<style lang="less">
.ql-editor p {
    font-size: 18px;
}
.editor {
    line-height: normal !important;
    height: 500px !important;
}

.ql-container {
    min-height: 500px !important;
}

.ql-snow .ql-tooltip[data-mode='link']::before {
    content: '请输入链接地址:' !important;
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px !important;
    content: '保存' !important;
    padding-right: 0px !important;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
    content: '请输入视频地址:' !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: '10px' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: '18px' !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: '32px' !important;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: '标题1' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: '标题2' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: '标题3' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: '标题4' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: '标题5' !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: '标题6' !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: '衬线字体' !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: '等宽字体' !important;
}
</style>
