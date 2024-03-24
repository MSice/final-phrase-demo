/*
 * @Author: suqi04
 * @Date: 2021-08-06 09:14:11
 * @LastEditTime: 2024-03-24 12:27:43
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/mock/web.js
 * @Description:
 */
/**
 * @file mock /web
 */

module.exports = [
    {
        enable: true,
        url: "/api/mock/userInfo",
        method: "GET",
        result: (req, res) => res.send({
            code: 200,
            data: {
                name: "suqi04",
            },
            message: "success",
        })
    },
    {
        enable: true,
        url: "/imgs",
        method: "POST",
        result: (req, res) =>
            res.send({
                retCode: 0,
                retData: {
                    name: "小叮当",
                    url:
                        "https://yt3.googleusercontent.com/ytc/AOPolaQTmS-rvSvKJHIlH4amDMS8jD0JM-ABuj5XJf8o=s900-c-k-c0x00ffffff-no-rj"
                },
                retMsg: "OK"
            })
    }
];
