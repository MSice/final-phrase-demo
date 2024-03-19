/*
 * @Author: huangwensong
 * @Date: 2024-03-19 19:43:23
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-19 19:46:49
 * @FilePath: /final-phrase-demo/src/utils/auth.ts
 * @Description:
 */
/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token: string) =>
  sessionStorage.setItem("token", token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => window.localStorage.getItem("token");

/**
 * 获取token
 * @returns
 */
export const clearToken = () => window.localStorage.removeItem("token");
