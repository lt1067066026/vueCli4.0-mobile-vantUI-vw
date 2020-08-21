// vue.config.js
const path = require('path');
const defaultSettings = require('./src/config/index.js')
const name = defaultSettings.title || 'vue mobile template'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
    //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
    outputDir: 'dist', //  生产环境构建文件的目录
    assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
    // 使用运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 开启生产环境SourceMap，设为false打包时不生成.map文件
    productionSourceMap: false,

    // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
    lintOnSave: false,

    devServer: {
        open: true,        // 是否自动打开浏览器页面
        host: '0.0.0.0',    // 指定使用一个 host，默认是 localhost
        port: 8080,         // 端口地址
        https: false,       // 使用https提供服务
        proxy: {
            //配置跨域
            '/api': {
                target: "http://192.168.218.146",
                // ws:true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/style/mixin.scss";
                @import "@/style/_var.scss";
                `
            }
        }
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
    },

    configureWebpack: config => {
        // 生产环境打包分析体积
        config.name = name
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },

};
