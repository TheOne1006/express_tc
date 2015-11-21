### 重要更新
1. user 实例方法 对比密码
2. 人脸识别


### 战略更新
1. 由于blog文章限制无法完美呈现与手机端，故手机端做降级处理
2. 文章图片

### 战略 - 还未加入
1. svg - logo 动画
2. 滑动组件－优雅降级
3. 编辑器继承tab


- - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 兼容性问题 ##
* 手机浏览器上文章详情页切换到首页,有重合。－2015.6.14

- - - - - - - - - - - - - - - - - - - - - - - - - - - -

## 更新历史 ##
######    2015.3.15 mobile-siderBar 
 1. 消失动画不能很好的处理 
 2. 拖拽系统还没有实现 


###### 2015.4.5 修改search 页面
 1. add 关键词 高亮(done)
 2. add content 最高显示字数 默认(260) (done)
 3. add filter 在在$digest过程 至少执行两次 可以在controller 中 注入 $filter(done)
 4. 其他  
    |- 左侧 分类信息 使用 filter 控制(done)   
    |- 数据量少可以全部展出，数据量大 ?  
    |- 缺少容错信息, no result?  

###### 2015.4.6 index 修改
 1. resolve 增加(over) 
 2. 右侧 信息(over)
 3. 首页滚动图片未cloud 数据
 4. 首页推荐文章
 
##### 2015.4.7 Node cate 模型修改
 1. 增加权重 `weight` 字段
 2. 增加推荐文章 `topArticles` 字段 

###### 2015.4.8  index 信息处理
 1. main.scss 细化拆分(over)
 2. 首页展示 锚点偏移量与&lt;header&gt;冲突 (over)
 
##### 2015.4.11 Node cate alias
 1. cate 模型 `alias`字段

##### 2015.4.11 后台页面
 1. 分类文章列表页面
 2. 编辑cate时 统计文章数量

##### 2015.5.21 scrollspy 解决首页滚动动画
 * 残留问题 右侧滚动时，出现波动

##### 2015.6.08 后台文章列表 
 * 后台文章列表 增加gotoanything
 * 后台文章列表 增加分页查询，支持大部分grid插件
 * 前台类别列表页 增加分页功能，12篇每页
 * 前台首页优化 小标题锚点标识改为`_id`

##### 2015.6.14 md文件
 * 规范化markdown文件

##### 2015.6.20 功能升级
* 上传文件设置为仅特定目录
* 增加人脸识别登录（文件目录形式）


##### 2015.8.15 取消URL的hash
* express.js 中通过http.referer 判断是否进行跳转
* app/controllers/admin/login.js 取消删除任务,改为shell 脚本


##### 2015.8.23 增加搜索支持
* 通过<https://github.com/TheOne1006/phantom_build_html> 构建支持 angularJS 的搜索引起
* 前台增加 title ,keyword, description的属性


##### 2015.9.27 尝试解决搜索引起不抓取的问题
* 取消base 标签,
* 修改 svg theone.io 外部引入

#### 2015.9.28 引入md 解析工具
_配套版本_:
```
"showdown": "1.0.x",
"showdown-table": "^1.0.1"
```


#### 2015.10.02 mongoose
因`mongolab` 强制更新 `mongo` 版本至 3.0,  
导致 `mongoose~3.8.20`无法使用,  
因此更新 `mongoose~3.8.35`  


#### 2015.10.11 更新链接
``
修改所有前台的ajax 真是请求地址,
后台判断来自这些地址时全部跳转
'/h/*'为 ajax请求
``

#### 2015.10.26 更新grunt js合并选项
1. 取消js注释

#### 2015.11.08 title 替换,使用 docenv

#### 2015.11.15 引入 mermaid 绘制简单流程图
1. 引入 mermaid
2. 引入 angular-mermaid
3. 取消 article pre boerder bg-color

#### 2015.11.20 前台将js 移动到header中

1. 不会造成js 加载两次的问题
2. 准备简化手机端的显示效果,以后会打造专门的 mobile 站点(left)
3. 加载 view 完成后 回到顶部
4. 取消侧滑,改为 bootstrap 下拉菜单
5. header 不自动缩放
6. "theOne.io" 文字
  - grunt task svgmin 与 vivus 的自定属性冲突

7. 'search input' 多余





