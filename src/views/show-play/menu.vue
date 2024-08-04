<!--
 * @Author: 777
 * @Date: 2024-03-25 14:15:10
 * @LastEditors: suqi suqi.777@bytedance.com
 * @LastEditTime: 2024-08-04 21:03:34
 * @FilePath: /final-phrase-demo/src/views/show-play/menu.vue
 * @Description: 
-->
<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
        <div class="collapse-button" @click="toggleCollapse">
            <el-icon v-if="isCollapsed"><Expand /></el-icon>
            <el-icon v-else><Fold /></el-icon>
        </div>
        <ul v-show="!isCollapsed" class="sidebar-content">
            <li
                :class="{ active: activeItemId === item.id }"
                v-for="(item, index) in props.menuItems.filter(_item => {
                    if ($route.query.showScript) {
                        if (_item.menuType === 'script') {
                            return _item
                        }
                    } else {
                        return _item
                    }
                })"
                :key="item.sessionTitle"
                @click="selectMenuItem(item)"
            >
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { ChOrder } from '@/utils';
import { useRoute } from 'vue-router';
const $route = useRoute();

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
        type: String,
        default: ''
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
    padding: 0 10px;
    margin: 0;
}

li {
    /* background-color: #e9f1e9; */
    padding: 5px;
    cursor: pointer;
    /* border: 1px solid #fff; */
    font-weight: 600;
}

.active {
    color: #4096fe;
}

li:hover {
    /* opacity: 0.5; */
    color: #4096fe;
}

.collapse-button {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    text-align: left;
    border-radius: 20px;
}
</style>
