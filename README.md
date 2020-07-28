# night-kay-boilerplate

## 目录规范

```
config
  webpack.config.${env}.js
  postcss.config.js
data
src
  index.js: 独立运行时模拟父项目入口
  App.js: 独立运行时模拟父项目App
  vendor.js: 独立运行时vendor，修改后需要运行build:vendor命令，data目录下有一个默认版本
  components: UI组件/公用业务组件
  decorators: HOC
  constants: 常量定义
  utils: 工具函数
  containers: 容器组件
    components: 业务组件
    constants: 常量定义
    actions: actions定义
    store: store配置
```

## Tips
