const http = require("http");
const url = require("url");
const path = require("path");
//操作文件的包
const fs = require("fs");

//启动主服务器
http.createServer((req, res) => {
    console.log('启动服务器了')
    // 从命令行参数获取root目录，默认是当前目录:在NodeJS中可以通过process.argv获取命令行参数。
    // 但是比较意外的是，node执行程序路径和主模块文件路径固定占据了argv[0]和argv[1]两个位置，
    // 而第一个命令行参数从argv[2]开始
    let root = path.resolve(process.argv[2] || '.');
    //
    let pathname = url.parse(req.url).pathname;
    let filepath = path.join(root + '../../../view', pathname);
    // let ajaxServerHandle = {req: req, res: res};
    //
    res.setHeader('Access-Control-Allow-Origin', '*');
    //
    console.log(req.url)
    let api = /^\/api/
    if (api.test(pathname)) {
        console.log('请求的是接口')
    }
    else {
        console.log('请求的是index')
        fs.stat(filepath, (err, stats) => {
            if (pathname == '/') {
                res.writeHead(200);
                filepath += '/index.html';
                fs.createReadStream(filepath).pipe(res);
            }
            else {
                if (!err && stats.isFile()) {
                    // 没有出错并且文件存在:
                    res.writeHead(200);
                    // 将文件流导向response:
                    fs.createReadStream(filepath).pipe(res);
                } else {
                    // 出错了或者文件不存在,发送404响应:
                    res.writeHead(404);
                    res.end('404 Not Found');
                }
            }
        });
    }
}).listen(3389);
