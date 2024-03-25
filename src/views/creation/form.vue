<!--
 * @Author: suqi04
 * @Date: 2024-03-24 21:29:19
 * @LastEditTime: 2024-03-25 11:25:34
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/views/creation/form.vue
 * @Description: 文件描述
-->
<template>
    <div class="creation-form">
        <div class="title">
            <h2>剧本信息填写</h2>
        </div>
        <div class="form-content">
            <el-form
                :model="creationFormParams"
                label-width="auto"
                style="width: 100%"
                size="large"
            >
                <el-form-item label="剧本类型">
                    <div class="mock-inp">
                        {{ creationFormParams.scriptType }}
                    </div>
                </el-form-item>
                <el-form-item label="细分类型">
                    <el-select
                        v-model="creationFormParams.agruements.detailedScriptType"
                        multiple
                        collapse-tags
                        placeholder="请选择细分类型(选填)"
                    >
                        <el-option
                            v-for="(item, index) in detailedScriptTypeList"
                            :key="index"
                            :label="item"
                            :value="item"
                            :disabled="item in noneDisableDetailedScriptTypeList"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="历史时代">

                    <el-input
                        v-model="creationFormParams.agruements.historicalEra"
                        placeholder="请输入历史时代(选填)"
                    />
                </el-form-item>
            </el-form>
            <el-form
                :model="creationFormParams"
                :inline="true"
                label-width="auto"
                style="width: 100%;display: flex;justify-content: space-between;flex-wrap: wrap;"
                size="large"
            >
                <el-form-item
                    label="主角性别"
                    style="width: calc(50% - 15px); margin-right: 0;flex-shrink: 0;"
                >

                    <el-input
                        v-model="creationFormParams.agruements.historicalEra"
                        placeholder="请输入主角性别(选填)"
                    />
                </el-form-item>
                <el-form-item
                    label="主角年龄"
                    style="width: calc(50% - 15px); margin-right: 0;flex-shrink: 0;"
                >

                    <el-input
                        v-model="creationFormParams.agruements.historicalEra"
                        placeholder="请输入主角年龄(选填)"
                    />
                </el-form-item>
                <el-form-item
                    label="剧情描述"
                    style="width: 100%;margin-right: 0;heightflex-shrink: 0;margin-bottom: 0;"
                >

                    <el-input
                        v-model="creationFormParams.agruements.description"
                        maxlength="300"
                        :rows="10"
                        show-word-limit
                        placeholder="请对您期望的剧情进行简易描述(选填)"
                        type="textarea"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="btn-group">
            <el-button
                type="primary"
                link
            >上一步</el-button>
            <el-button
                type="primary"
                link
            >直接生成</el-button>
            <el-button
                type="primary"
                link
            >下一步</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

import paramsStore from '@/store/paramsStore';
const { creationFormParams } = paramsStore();

import { ElMessage } from 'element-plus';

import { useRouter } from 'vue-router';
const router = useRouter();

const detailedScriptTypeList = reactive([
    '悬疑',
    '喜剧',
    '亲情',
    '动作',
    '科幻',
    '爱情',
    '音乐',
    '体育'
]);
const noneDisableDetailedScriptTypeList = reactive(['悬疑']);
</script>

<style lang="less">
.form-content {
    .el-form-item__label {
        font-weight: 600;
    }
}
</style>
<style lang="less" scoped>
.creation-form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 940px;
    margin: 0 auto;
    border-radius: 5px;
    // background-color: #ffffff4f;
    // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    margin-top: 20px;
    .form-content {
        width: 100%;
        max-width: 940px;
        height: calc(100% - 100px);
        overflow-y: scroll;
        padding: 20px 0;
        .el-form-item--large .el-form-item__label {
            font-weight: 600;
        }
    }
    .form-content::-webkit-scrollbar {
        display: none;
    }
    .btn-group {
        width: 100%;
        max-width: 940px;
        display: flex;
        height: 30px;
        line-height: 30px;
        align-items: center;
        justify-content: space-evenly;
        .el-button {
            font-size: 16px;
        }
    }
}
.mock-inp {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 15px;
    background-color: #f9f9f9;
    user-select: none;
    font-weight: 400;
    font-size: 12px;
    color: #606266;
    cursor: pointer;
}
</style>
