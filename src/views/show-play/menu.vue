<!--
 * @Author: huangwensong
 * @Date: 2024-03-25 14:15:10
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-27 10:23:54
 * @FilePath: /final-phrase-demo/src/views/show-play/menu.vue
 * @Description: 
-->
<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
        <div class="collapse-button" @click="toggleCollapse">
            <el-icon v-if="isCollapsed"><DArrowRight /></el-icon>
            <el-icon v-else><DArrowLeft /></el-icon>
        </div>
        <ul class="sidebar-content">
            <li
                :class="{ active: activeItemId === item.sessionId }"
                v-for="(item, index) in props.menuItems"
                :key="item.sessionTitle"
                @click="selectMenuItem(item)"
            >
                {{ isCollapsed ? ChOrder(index + 1) : item.sessionTitle }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { ChOrder } from '@/utils';

const props = defineProps({
    menuItems: {
        type: Array,
        required: true
    },
    isCollapsed: {
        type: Boolean,
        default: false
    },
    activeItemId: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['select', 'setCollapsed']);

const selectMenuItem = (item: any) => {
    // 触发选中菜单项的事件
    emit('select', item);
};
const toggleCollapse = () => {
    emit('setCollapsed', !props.isCollapsed);
};
</script>

<style scoped>
.sidebar {
    box-sizing: border-box;
    width: 200px;
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 20px;
    font-size: 14px;
    color: rgb(95, 94, 92);
    position: fixed;
    bottom: 0;
    left: 0;
    padding-top: 80px;
    &-content {
        background-color: rgba(255, 255, 255, 0.5);
    }
}

.collapsed {
    width: 50px;
    text-align: center;
    li {
        text-align: center;
        border-radius: 50%;
        height: 48px;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    background-color: #e9f1e9;
    padding: 15px;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 20px;
}

.active {
    opacity: 0.8;
    background-color: #b1c6a7;
    color: #fff;
}

li:hover {
    opacity: 0.5;
}

.collapse-button {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #e9f2f5;
    cursor: pointer;
    text-align: center;
    border-radius: 20px;
}
</style>
