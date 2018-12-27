/*
 * @auth lidian
 * @date 2016-05-16
 * @desc
 * 全局安装 fis3: sudo npm install -g fis3
 * 安装less插件 : sudo npm install -g fis-parser-less-2.x
 * 安装sass插件 : sudo npm install fis3-parser-node-sass -g
 * 安装ES6转ES5插件    npm i fis-parser-babel-5.x -g
 * 开发命令     :  fis3 server start //开启fis3 本地server
 *                fis3 server open  //打开fis3 本地server文件夹路径
 *                fis3 server clean //清空本地server文件夹路径内容
 *                fis3 release debug -wL //将当前路径代码发布到本地调试服务器并且监听文件修改自动刷新浏览器
 *                fis3 release prod //发布代码到当前路径\output下
 *
 * FIS3 构建会对 CSS 中，路径带 ?__sprite 的图片进行合并
 * http://fis.baidu.com/fis3/docs/beginning/release.html#CssSprite%E5%9B%BE%E7%89%87%E5%90%88%E5%B9%B6
 */
//FIS3 官方文档 http://fis.baidu.com/fis3/docs/beginning/intro.html
//全局属性文档 http://fis.baidu.com/fis3/docs/api/config-props.html
fis.set('project.ignore', ['printImgNames.js', 'fis-conf.js', 'node_modules/**', 'output/**',]);
// C:\Users\john\AppData\Roaming\npm\node_modules
/*
 *TODO modify
 *folder 对应TCMS系统上为当前专题设定的简称（及images\css路径）
 *imgPath\cssPath  图片和css文件网络路径
*/
var folder = '',
    imgPath = 'images',
    cssPath = 'css',
    jsPath = 'js';

//发布到默认的当前路径output下
fis.media("prod")
    .match('::package', {
        spriter: fis.plugin('csssprites')
    })
    .match('(*.{png,gif,jpg})', {
        release: imgPath + folder + "/$1",
        url: '../' + imgPath + folder + "/$1"
        // domain: imgPath
    })
    .match('(*.css)', {
        release: cssPath + folder + "/$1",
        url: './' + cssPath + folder + "/$1",
        // domain: cssPath,
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer:
            fis.plugin('clean-css'),
        useHash:
            false,
        useSprite:
            true //开启csssprites
    })
    .match("(*.less)", {
        release: cssPath + folder + "/$1",
        url: './' + cssPath + folder + "/$1",
        // domain: cssPath,
        optimizer: fis.plugin('clean-css'),
        useHash: false,
        useSprite: true, //开启csssprites
        parser: fis.plugin('less-2.x'),
        rExt: '.css',
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"],
            "cascade": true
        })
    })
    .match("(*.js)", {
        release: jsPath + folder + "/$1",
        url: './' + jsPath + folder + "/$1"
    })
    .match('*.scss', {
        release: folder + "/$1",
        domain: cssPath,
        optimizer: fis.plugin('clean-css'),
        useHash: false,
        useSprite: true, //开启csssprites
        parser: fis.plugin('node-sass', {
            // options...
        }),
        rExt: '.css',
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"],
            "cascade": true
        })
    })
    .match('*.jsx', {
        parser: fis.plugin('babel-5.x')
    })

    //将代码直接部署至./output下
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: './output'
        })
    });

//开发阶段使用
fis.media("debug")
    .match('::package', {
        spriter: fis.plugin('csssprites')
    })
    .match('*.scss', {
        parser: fis.plugin('node-sass', {
            // options...
        }),
        rExt: '.css',
        // 开发阶段默认不开启csssprites，如有需要设置成true即可
        useSprite: false,
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"],
            "cascade": true
        })
    })
    .match("(*.less)", {
        parser: fis.plugin('less-2.x'),
        rExt: '.css',
        // 开发阶段默认不开启csssprites，如有需要设置成true即可
        useSprite: false,
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"],
            "cascade": true
        })
    });
