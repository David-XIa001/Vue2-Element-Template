# 使用Vue2 + element + axios 的一个后台管理系统

## 现有功能

- 国际化(目前支持中英文,后续可增量拓展其他语言)
- OAuth2.0的refreshToken前端无痛刷新登录鉴权
- Screenfull全屏
- 自适应收缩侧边栏
- 快捷导航(标签页)
- UTC时间与当地时间的转换
- eslint 校验及格式化代码(统一规范和增强可读性) 
- validate 常用表单校验方法
- 全国省市区联动
- 高德地图标注点位
- mock数据持久化


## 开发

## 安装依赖
npm install

## 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

## 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash

## 构建测试环境
npm run build:stage

## 构建生产环境
npm run build:prod

```

## 其它

```bash

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


