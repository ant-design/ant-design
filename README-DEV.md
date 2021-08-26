# 如何开发

## 如何切换新分支

从 master 切出分支，分支名称规范 `[feature|hotfix|...etc]-[功能描述]`

```sh
  gcb feature-xxx
```

## 修改已有组件后如何更新 test Case

```sh
npm test -- -u
```

## 开发&发布

1. 分支提 pull request 到 master（注意！选择 infra 仓库，因为是 fork 的 antd，默认是 ant-design）
2. pull request 找shengbo.ma@shopee.com or taofeng.yang@shopee.com进行 review
3. 怎么预览
   ```sh
    npm run deploy
   ```
4. 怎么发版

```sh
  npm run pub
```
