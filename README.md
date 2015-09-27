# TheOne.io

[www.theone.io](http://www.theone.io 'theone.io 网址')

## 网站功能
  * 个人笔记本
  * 人脸识别登录(单用户模式)

### 代码环境
  * 后台服务
    1. Node.js 环境
    2. express 4.x 框架
    3. mongodb 数据库

  * 前台框架
    1. Bootstrap
    2. Angular.js 1.3

### 服务 Server 

启动命令

```
$ export NODE_ENV=production
$ node app
```


### 配置
计划任务清空 `/data/tmp/`

`/express_tc/app/controllers/admin/login.js` 修改 `help.facePlusPlusDetect`


## 未来计划
1. sphinx 搜索
2. article 图片增加
3. 后台使用markdown编辑器,使用图片库

