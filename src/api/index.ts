/*
 * @Author: huangwensong
 * @Date: 2024-03-19 21:09:18
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-23 17:09:35
 * @FilePath: /final-phrase-demo/src/api/index.ts
 * @Description:
 */
import { GET, POST } from "./request";

const reg = '/mock'

/**
 * 获取用户信息
 * @param {}
 * @returns
 */
export const getUserInfo = () => GET(`${reg}/userInfo`, {}, { isToken: true });

/**
 * 登陆
 * @param {}
 * @returns
 */

export const login = (params: { username: string; password: string }) =>
  GET("/login", params, { isToken: false });
