/*
 * @Author: huangwensong
 * @Date: 2024-03-25 21:08:30
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 21:08:34
 * @FilePath: /final-phrase-demo/src/utils/index.ts
 * @Description:
 */
export const textHandle = (htmlString: string) => {
    // 使用正则表达式去除最外层 <div> 标签
    const regex = /<div[^>]*>(.*?)<\/div>/;
    const match = htmlString.match(regex);
    if (match && match.length >= 2) {
        htmlString = match[1];
    }
    return htmlString;
};
