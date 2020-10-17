# 🚀 超精简ts+webpack+react样板

生成过程

```bash
npm init
npm i -D webpack webpack-cli webpack-dev-server
./node_modules/.bin/webpack init
npm i react react-dom react-router-dom
```

已集成
- css相关，默认打开了module
- 使用ts-loader
- 使用webpack5
- 开启pnp支持
- lodash替换为[rambda](https://selfrefactor.github.io/rambda/#/)，更轻量，更好的tree-shaking，原生ts支持

保留了一些测试页面，可删除

缺少很多常用的东西，也是为了最简化，方便拓展和框架依赖更新
