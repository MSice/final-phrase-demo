/*
 * @Author: 777
 * @Date: 2024-03-19 21:09:18
 * @LastEditors: suqi suqi.777@bytedance.com
 * @LastEditTime: 2024-08-03 12:54:54
 * @FilePath: /final-phrase-demo/src/api/index.ts
 * @Description:
 */
import { GET, POST } from './request';

/**
 * 获取用户信息
 * @param {}
 * @returns
 */
export const getUserInfo = () => GET('/userInfo', {}, { isToken: true });

/**
 * 登陆
 * @param {}
 * @returns
 */

export const login = (params: { username: string; password: string }) =>
    GET('/login', params, { isToken: false });

export const start = () => GET('/start');

export const createOutline = () => GET('/create_outline');

export const create_main = () => GET('/create_main');

export const create_role = () => GET('/create_role');

export const create_storyline = () => GET('/create_storyline');

export const get_script_list = () => GET('/get_script_list');

export const create_script = (params: { script_name: string }) =>
    POST('/create_script', params);

export const update_bg = (params: { backgroud: string; desc: string }) =>
    POST('/update_bg', params);
