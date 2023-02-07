---
category: Components
subtitle: 时间轴
group: 数据展示
title: Timeline
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FkTySqNt3sYAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/color.tsx">圆圈颜色</code>
<code src="./demo/pending.tsx">最后一个及排序</code>
<code src="./demo/alternate.tsx">交替展现</code>
<code src="./demo/custom.tsx">自定义时间轴点</code>
<code src="./demo/right.tsx">右侧时间轴点</code>
<code src="./demo/label.tsx">标签</code>
<code src="./demo/wireframe.tsx" debug>线框风格</code>

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="After version 5.3.0, we provide a simpler usage <Timeline items={[...]} />  with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 6.0." />, mountNode);
```

```jsx
// >=5.3.0 可用，推荐的写法 ✅
const items = [{ children: 'sample', label: 'sample' }];
return <Timeline items={items} />;

// <5.3.0 可用，>=5.3.0 时不推荐 🙅🏻‍♀️
<Timeline onChange={onChange}>
  <Timeline.Item>Sample</Timeline.Item>
</Timeline>;
```

## API

### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `left` \| `alternate` \| `right` | - |
| pending | 指定最后一个幽灵节点是否存在或内容 | boolean \| ReactNode | false |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | ReactNode | &lt;LoadingOutlined /> |
| reverse | 节点排序 | boolean | false |
| items | 选项配置 | [Items](#Items) | [] | 5.3.0 |

### Items

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `blue`、`red`、`green`、`gray`，或自定义的色值 | string | `blue` |
| dot | 自定义时间轴点 | ReactNode | - |
| label | 设置标签 | ReactNode | - |
| children | 设置内容 | ReactNode | - |
| position | 自定义节点位置 | `left` \| `right` | - |
