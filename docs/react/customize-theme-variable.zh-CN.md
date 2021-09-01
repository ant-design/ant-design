---
order: 7.1
title: 动态主题（实验性）
---

除了 [less 定制主题外](/docs/react/customize-theme) 外，我们还提供了 CSS Variable 版本以支持动态切换主题能力。你可以在 [ConfigProvider](/components/config-provider/#components-config-provider-demo-theme) 进行体验。

## 注意事项

该功能通过动态修改 CSS Variable 实现，因而在 IE 中页面将无法正常展示。请先确认你的用户环境是否需要支持 IE。

## 如何使用

### 引入 antd.variable.min.css

替换当前项目引入样式文件为 CSS Variable 版本：

```diff
-- import 'antd/dist/antd.min.css';
++ import 'antd/dist/antd.variable.min.css';
```

注：如果你使用了 `babel-plugin-import`，需要将其去除。

### 静态方法配置

调用 ConfigProvider 配置方法设置主题色：

```ts
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});
```

## 冲突解决

默认情况下，CSS Variable 会以 `--ant` 作为前缀。当你的项目中引用多份 css 文件时，可以通过修改前缀的方式避免冲突。

### 代码调整

通过 ConfigProvider 在顶层修改 `prefixCls`：

```tsx
import { ConfigProvider } from 'antd';

export default () => (
  <ConfigProvider prefixCls="custom">
    <MyApp />
  </ConfigProvider>
);
```

通过静态方法设置主题色以及对应 `prefixCls`：

```ts
ConfigProvider.config({
  prefixCls: 'custom',
  theme: {
    primaryColor: '#25b864',
  },
});
```

### 编译 less

由于前缀变更，你需要重新生成一份对应的 css 文件。

```bash
lessc --modify-var="ant-prefix=custom" antd/dist/antd.variable.less modified.css
```
