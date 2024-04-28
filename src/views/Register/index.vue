<!--
 * @Author: 777
 * @Date: 2024-03-19 17:12:59
 * @LastEditors: 777
 * @LastEditTime: 2024-03-27 11:37:31
 * @FilePath: /final-phrase-demo/src/views/Register/index.vue
 * @Description: 
-->
<template>
    <session class="register">
        <div class="register-box">
            <h1>注册</h1>
            <el-form
                ref="ruleFormRef"
                style="max-width: 600px"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
            >
                <el-form-item label="手机号" prop="phone">
                    <el-input
                        v-model="ruleForm.phone"
                        type="phone"
                        placeholder="手机号"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="验证码" prop="verificationCode">
                    <el-input
                        v-model="ruleForm.verificationCode"
                        placeholder="验证码"
                        autocomplete="off"
                    >
                        <template #append>
                            <span
                                @click="getVerificationCode"
                                class="form-text-btn"
                            >
                                {{
                                    verificationTime
                                        ? verificationTime + 's'
                                        : '获取验证码'
                                }}
                            </span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="设置密码" prop="password1">
                    <el-input
                        v-model="ruleForm.password1"
                        type="password"
                        placeholder="8-18位数字、字母组合"
                        show-password
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input
                        v-model="ruleForm.password2"
                        type="password"
                        placeholder="确认密码"
                        show-password
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="推荐码" prop="invitationCode">
                    <el-input
                        v-model.number="ruleForm.invitationCode"
                        placeholder="非必填"
                    />
                </el-form-item>
            </el-form>
            <el-button
                class="register-btn"
                type="primary"
                size="large"
                @click="submitForm(ruleFormRef)"
                >注册</el-button
            >

            <span class="register-text"
                >为保障您的账号安全和正常使用，请使用实名注册</span
            >

            <!-- <el-button class="register-btn" @click="resetForm(ruleFormRef)"
                >Reset</el-button
            > -->
        </div>
    </session>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import SQLTest from '@/store/SqlTest';

const router = useRouter();
const { userLoginSql } = SQLTest();

interface RuleForm {
    phone: string;
    verificationCode: string;
    password1: string;
    password2: string;
    invitationCode: string;
}

const formSize = ref('large');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    phone: '',
    verificationCode: '',
    password1: '',
    password2: '',
    invitationCode: ''
});

const validatePass = (rule: any, value: any, callback: any) => {
    // 8-18位数字、字母组合
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
    if (value === '') {
        callback(new Error('请输入密码！'));
    } else if (!reg.test(value)) {
        callback(new Error('密码应为8-18位数字、字母组合！'));
    } else {
        if (ruleForm.password2 !== '') {
            if (!ruleFormRef.value) return;
            ruleFormRef.value.validateField('password2', () => null);
        }
        callback();
    }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入确认密码！'));
    } else if (value !== ruleForm.password1) {
        callback(new Error('两次输入密码不一致！'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules<RuleForm>>({
    phone: [
        {
            validator: (rule: any, value: any, callback: any) => {
                // 验证手机号
                if (value === '') {
                    callback(new Error('请输入手机号！'));
                } else if (!/^1[3456789]\d{9}$/.test(value)) {
                    callback(new Error('请输入正确的手机号！'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    verificationCode: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === '') {
                    callback(new Error('请输入验证码！'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    password1: [{ validator: validatePass, trigger: 'blur' }],
    password2: [{ validator: validatePass2, trigger: 'blur' }]
});

const verificationTime = ref(0);
const getVerificationCode = () => {
    if (ruleForm.phone === '') {
        ElMessage.warning('请输入手机号！');
        return;
    }
    if (verificationTime.value > 0) {
        return;
    }
    verificationTime.value = 60;
    const timer = setInterval(() => {
        verificationTime.value--;
        if (verificationTime.value <= 0) {
            clearInterval(timer);
        }
    }, 1000);
    ElMessage.success('验证码已发送，请注意查收！');
};

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(valid => {
        if (valid) {
            console.log('submit!');
            console.log(ruleForm);
            userLoginSql.push({
                account: ruleForm.phone,
                password: ruleForm.password1
            });
            ElMessage.success('注册成功，即将跳转到登陆页面！');
            setTimeout(() => {
                router.push({
                    path: './home',
                    query: {
                        type: 1
                    }
                });
            }, 1000);
        } else {
            console.log('error submit!');
            return false;
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>
<style lang="less" scoped>
.register {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-box {
        h1 {
            padding: 20px 0;
        }
        padding: 20px;
        width: 500px;
        height: 550px;
        background-color: #ffffff88;
        text-align: center;
    }
    &-btn {
        width: 100%;
        margin: 0;
    }
    &-text {
        display: inline-block;
        margin-top: 10px;
        color: rgb(111, 114, 114);
        font-size: 14px;
    }
    .form-text-btn {
        cursor: pointer;
    }
}
</style>
