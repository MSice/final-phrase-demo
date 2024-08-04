/*
 * @Author: 777
 * @Date: 2021-07-23 18:27:20
 * @LastEditTime: 2024-08-03 12:31:18
 * @LastEditors: suqi suqi.777@bytedance.com
 * @FilePath: /final-phrase-demo/vue.config.js
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const mock = require('./mock')

function resolve(dir) {
    console.log(path.join(__dirname, dir));
    return path.join(__dirname, dir);
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to '/bar/'.
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    filenameHashing: false,
    devServer: {
        port: 9097,
        open: true,
        hotOnly: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://47.251.101.232:8005', // 后台接口域名
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/api': '' // 重写路径，将前缀/api转为/
                }
            }
        }
        // before: function (app, server) {
        //     mock.forEach(item => {
        //         if (item.method === 'GET') {
        //             app.get(item.url, (req, res) => {
        //                 item.result(req, res);
        //             });
        //         }
        //         if (item.method === 'POST') {
        //             app.post(item.url, (req, res) => {
        //                 item.result(req, res);
        //             });
        //         }
        //     });
        // }
    },

    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                components: '@/components',
                views: '@/views',
                layout: '@/layout',
                styles: '@/styles',
                api: '@/api',
                icons: '@/icons'
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/style/index.less')]
        }
    },
    chainWebpack(config) {
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
        config.plugin('html').tap(args => {
            args[0].title = 'Final Phrase';
            return args;
        });
    }
};
