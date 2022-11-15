---
category: Components
subtitle: 步骤条
group: 导航
title: Steps
cover: https://gw.alipayobjects.com/zos/antfincdn/UZYqMizXHaj/Steps.svg
---

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

### 4.24.0 用法升级

<Alert message="在 4.24.0 版本后，我们提供了 &lt;Steps items={[...]} /&gt; 的简写方式，有更好的性能和更方便的数据组织方式，开发者不再需要自行拼接 JSX。同时我们废弃了原先的写法，你还是可以在 4.x 继续使用，但会在控制台看到警告，并会在 5.0 后移除。"></Alert>

```jsx
// >=4.24.0 可用，推荐的写法 ✅
const items = [{ title: '第一步' }, { title: '第二步' }, { title: '第三步' }];
return <Steps items={items} />;

// <4.24.0 可用，>=4.24.0 时不推荐 🙅🏻‍♀️
<Steps>
  <Step title="第一步" />
  <Step title="第二步" />
  <Step title="第三步" />
</Steps>;
```

## 代码演示

<code src="./demo/deprecated.tsx">基本用法 (废弃的语法糖)</code>
<code src="./demo/simple.tsx">基本用法</code>
<code src="./demo/small-size.tsx">迷你版</code>
<code src="./demo/icon.tsx">带图标的步骤条</code>
<code src="./demo/step-next.tsx">步骤切换</code>
<code src="./demo/vertical.tsx">竖直方向的步骤条</code>
<code src="./demo/vertical-small.tsx">竖直方向的小型步骤条</code>
<code src="./demo/error.tsx">步骤运行错误</code>
<code src="./demo/progress-dot.tsx">点状步骤条</code>
<code src="./demo/customized-progress-dot.tsx">自定义点状步骤条</code>
<code src="./demo/progress-dot-small.tsx" debug>迷你版点状步骤条</code>
<code src="./demo/clickable.tsx">可点击</code>
<code src="./demo/nav.tsx">导航步骤</code>
<code src="./demo/progress.tsx">带有进度的步骤</code>
<code src="./demo/label-placement.tsx">标签放置位置</code>
<code src="./demo/progress-debug.tsx" debug>Progress Debug</code>
<code src="./demo/steps-in-steps.tsx" debug>Steps 嵌套 Steps</code>
<code src="./demo/inline.tsx">内联步骤</code>

## API

### Steps

整体步骤条。

| 参数           | 说明                                                                          | 类型                                                                   | 默认值       | 版本        |
| -------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------ | ----------- |
| className      | 步骤条类名                                                                    | string                                                                 | -            |             |
| current        | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number                                                                 | 0            |             |
| direction      | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向      | string                                                                 | `horizontal` |             |
| initial        | 起始序号，从 0 开始记数                                                       | number                                                                 | 0            |             |
| labelPlacement | 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方              | string                                                                 | `horizontal` |             |
| percent        | 当前 `process` 步骤显示的进度条进度（只对基本类型的 Steps 生效）              | number                                                                 | -            | 4.5.0       |
| progressDot    | 点状步骤条，可以设置为一个 function，labelPlacement 将强制为 `vertical`       | boolean \| (iconDot, {index, status, title, description}) => ReactNode | false        |             |
| responsive     | 当屏幕宽度小于 `532px` 时自动变为垂直模式                                     | boolean                                                                | true         |             |
| size           | 指定大小，目前支持普通（`default`）和迷你（`small`）                          | string                                                                 | `default`    |             |
| status         | 指定当前步骤的状态，可选 `wait` `process` `finish` `error`                    | string                                                                 | `process`    |             |
| type           | 步骤条类型，可选 `default` `navigation` `inline`                              | string                                                                 | `default`    | inline: 5.0 |
| onChange       | 点击切换步骤时触发                                                            | (current) => void                                                      | -            |             |
| items          | 配置选项卡内容                                                                | [StepItem](#StepItem)                                                  | []           | 4.24.0      |

### `type="inline"`

| 参数      | 说明                                                                          | 类型                  | 默认值    | 版本   |
| --------- | ----------------------------------------------------------------------------- | --------------------- | --------- | ------ |
| className | 步骤条类名                                                                    | string                | -         |        |
| current   | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number                | 0         |        |
| initial   | 起始序号，从 0 开始记数                                                       | number                | 0         |        |
| status    | 指定当前步骤的状态，可选 `wait` `process` `finish` `error`                    | string                | `process` |        |
| onChange  | 点击切换步骤时触发                                                            | (current) => void     | -         |        |
| items     | 配置选项卡内容，不支持 `icon` `subtitle`                                      | [StepItem](#StepItem) | []        | 4.24.0 |

### StepItem

步骤条内的每一个步骤。

| 参数        | 说明                                                                                                          | 类型      | 默认值 | 版本 |
| ----------- | ------------------------------------------------------------------------------------------------------------- | --------- | ------ | ---- |
| description | 步骤的详情描述，可选                                                                                          | ReactNode | -      |      |
| disabled    | 禁用点击                                                                                                      | boolean   | false  |      |
| icon        | 步骤图标的类型，可选                                                                                          | ReactNode | -      |      |
| status      | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | string    | `wait` |      |
| subTitle    | 子标题                                                                                                        | ReactNode | -      |      |
| title       | 标题                                                                                                          | ReactNode | -      |      |
