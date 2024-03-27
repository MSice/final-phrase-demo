/*
 * @Author: huangwensong
 * @Date: 2024-03-25 21:08:30
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-27 10:23:29
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

export function ChOrder(number: number): string | false {
    number = parseInt(number.toString(), 10);
    const util: string[] = ['个', '十', '百', '千'];
    const cindex: string[] = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九'
    ];
    const numArr: string[] = number
        .toString()
        .replace(/^0*/, '')
        .split('')
        .reverse();
    if (numArr.length > 3) {
        return false;
    } else {
        const rNum: string[] = numArr.map((num, index) => {
            const addr: string = util[index];
            const cor: string = cindex[parseInt(num)];
            if (num === '0') {
                return '零';
            }
            if (index === 0) {
                return cor;
            }

            if (numArr.length === 2 && numArr[1] === '1') {
                return addr;
            }
            return cor + addr;
        });
        const res: string = rNum
            .reverse()
            .join('')
            .replace(/零{1,}/g, '零')
            .replace(/零{1,}$/g, '');
        return res;
    }
}
