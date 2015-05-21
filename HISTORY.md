# 致命更新
1、user 实例方法 对比密码
2、人脸识别


# 战略更新
1、由于blog文章限制无法完美呈现与手机端，故手机端做降级处理
2、文章图片

# 亮点
1、svg - logo 动画
2、滑动组件－优雅降级
3、编辑器继承tab

- 3.15 -
mobile-siderBar 
  消失动画 不能很好的处理
  拖拽系统还没有实现 



# 2015.4.5 修改search 页面
  add 关键词 高亮(ok)
  add content 最高显示字数 默认(260) (ok)
  add filter 在在$digest过程 至少执行两次 可以在controller 中 注入 $filter
    |- 左侧 分类信息 使用 filter 控制
    |- Q:缺少动画
    |- 数据量少可以全部展出，数据量大 ?
    |- 缺少容错信息, no result?

# 2015.4.6 index 修改
  ｜－ resolve 增加 
  ｜－ 右侧 信息

  ready - 新增 图片展示 cloud 云端
  ready - 首页分类信息输出，
    |- ready  cate推荐 字段

# 2015.4.7 cate 模型修改
  cate 增加 权重 weight
       推荐 文章 topArticles
       添加完成 

# 2015.4.8  index 信息处理
  main.scss 分离(ok)
  首页展示 锚点偏移量修改 (未解决)
 

# 2015-4-11 分类 alias - single string 

# 2015-4-11 分类文章列表页面, 编辑cate 统计文章数量

# 2015-5-21 scrollspy 完美解决，滚动动画