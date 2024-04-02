---
title: 非必要的渲染
date: 2022-12-31
author: zombieJ
---

对于重型组件而言，随着时间推移，一些 BUG Fix 或者新增 Feature 很容易不经意间将原本的性能优化给破坏掉。而最近，我们在对 Table 进行重构将一些历史更新导致的性能损失进行排查并恢复。在此，我们介绍一些常用的排查技巧以及常见问题。

在此之前，我们建议你先阅读官方的 [性能工具](https://reactjs.org/docs/perf.html) 以选择你需要调试的内容。

### 渲染次数统计

在大部分情况下，无效的渲染相对于未优化的循环而言，体感并没有那么强烈。但是在某一些场景诸如大型表单、表格、列表下，由于其子组件众多，无效的渲染叠加后其性能影响也十分可怕。

举个例子，在 antd v4 中，我们为了提升 `rowSpan` Table Hover 的高亮体验，我们为 `tr` 添加了事件监听，同时在 `td` 中为选中行添加额外的 `className` 以支持多行高亮能力。但是由于 `td` 消费了 context 中 `hoverStartRow` 和 `hoverEndRow` 数据，导致了非相关 Row 都会因为 `hoverStartRow` 和 `hoverEndRow` 变化而[重新渲染](https://github.com/ant-design/ant-design/issues/33342)。

诸如此类的问题在重型组件循环往复，因而我们需要一些辅助方式来确定渲染次数。在最新的 [`rc-table`](https://github.com/react-component/table) 中，我们封装了一个 [`useRenderTimes`](https://github.com/react-component/table/blob/ecf3fdb77523b370ee86e19164e95f00e65281a8/src/hooks/useRenderTimes.tsx) 方法。它会在开发模式下通过 React 的 `useDebugValue` 将监听的渲染次数标注在 React Dev Tools 上：

![VDM](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*vlwQQIcEXFkAAAAAAAAAAAAADrJ8AQ/original)

```tsx
// Sample Code, please view real world code if needed
import React from 'react';

function useRenderTimes<T>(props: T) {
  // Render times
  const timesRef = React.useRef(0);
  timesRef.current += 1;

  // Cache for prev props
  const cacheProps = React.useRef(props);
  const changedPropKeys = getDiff(props, cacheProps.current); // Some compare logic

  React.useDebugValue(timesRef.current);
  React.useDebugValue(changedPropKeys);

  cacheProps.current = props;
}

export default process.env.NODE_ENV !== 'production' ? useRenderTimes : () => {};
```

### Context

#### useMemo

一般在组件的根节点上，我们会根据 `props` 和 `state` 创建一个 Context 来将聚合数据传递下去。但是在某些情况下可能 Context 实际内容没有变化也触发子组件的重新渲染：

```tsx
// pseudocode
const MyContext = React.createContext<{ prop1: string; prop2: string }>();

const Child = React.memo(() => {
  const { prop1 } = React.useContext(MyContext);
  return <>{prop1}</>;
});

const Root = ({ prop1, prop2 }) => {
  const [count, setCount] = React.useState(0);

  // Some logic to trigger rerender
  React.useEffect(() => {
    setCount(1);
  }, []);

  return (
    <MyContext.Provider value={{ prop1, prop2 }}>
      <Child />
    </MyContext.Provider>
  );
};
```

在示例中，虽然 `prop1` 和 `prop2` 并没有变化，但是显然 MyContext 里的 `value` 是一个新的 Object 导致子组件即便 `prop1` 没有变化也会重新渲染。因而我们需要对 Context `value` 进行 Memo：

```tsx
// pseudocode
const context = React.useMemo(() => ({ prop1, prop2 }), [prop1, prop2]);

return (
  <MyContext.Provider value={context}>
    <Child />
  </MyContext.Provider>
);
```

注：你可以配置 eslint [规则](https://github.com/jsx-eslint/eslint-plugin-react/blob/3256c92ca1b3bc7ec3461a89c278c797e7dc18cb/docs/rules/jsx-no-constructed-context-values.md) 来避免遗漏。

#### 拆分 Context

此外，参考上面的示例。如果我们将 `prop1` 和 `prop2` 都放在 Context 中，那么即便 `prop1` 没有变化，`prop2` 变化了，也会导致子组件重新渲染。因而我们可以根据功能将 Context 拆分成多个，从而减小影响范围：

```tsx
// pseudocode
const MyContext1 = React.createContext<{ prop1: string }>();
const MyContext2 = React.createContext<{ prop2: string }>();

// Child
const { prop1 } = React.useContext(MyContext1);

// Root
<MyContext1.Provider value={context1}>
  <MyContext2.Provider value={context2}>
    <Child />
  </MyContext2.Provider>
</MyContext1.Provider>;
```

在 `rc-table` 中，我们将其拆分为多个以优化渲染性能：

- BodyContext
- ExpandedRowContext
- HoverContext
- PerfContext
- ResizeContext
- StickyContext
- TableContext

#### useContextSelector

如果你使用过 Redux，那么你可能会对 `useSelector` 比较熟悉，它只会在需要消费的数据变更时才会触发更新。在 React 中，也同样有相关的 RFC([#118](https://github.com/reactjs/rfcs/pull/118))([#119](https://github.com/reactjs/rfcs/pull/119))，未来在 React 18 也将实装：

![React 18](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-UFKR7TTSv0AAAAAAAAAAAAADrJ8AQ/original)

在 API 正式落地之前，业界也有不少三方库实现该 API（当然，你也可以直接使用 redux）。通过 `useContextSelector` 就不再需要考虑功能拆分 Context 的问题，这也降低了开发者的心智负担：

```tsx
// pseudocode
const Child = React.memo(() => {
  const prop1 = useContextSelector(MyContext, (context) => context.prop1);
  return <>{prop1}</>;
});
```

### 闭包问题

在通过各种方式优化过后，我们还不得不面对一个问题。如果某些渲染需要通过外界的 render 方式，并且碰巧该方式使用了闭包。那么 `React.memo` 是无法感知的：

```tsx
// pseudocode
import React from 'react';

const MyComponent = React.memo(({ valueRender }: { valueRender: () => React.ReactElement }) =>
  valueRender(),
);

const App = () => {
  const countRef = React.useRef(0);
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    countRef.current += 1;
    forceUpdate({});
  }, []);

  // In real world, class component often meet this by `this.state`
  const valueRender = React.useCallback(() => countRef.current, []);

  return <MyComponent valueRender={valueRender} />;
};
```

由于闭包的存在，在调用 `render` 方法之前我们无法确定组件最终形态是否发生变化，这也是为何在 antd v4 早期我们通过 memo 对 Table 进行了优化而随着时间推移又将一部分移除的原因（实际上，Table 仍然有一些场景会遇到这个问题需要解决）。

考虑到 Table 提供了 `shouldCellUpdate` 方法，我们准备未来调整 Table 渲染逻辑。当 Parent 节点渲染时，Table 会完整的重新渲染，而当 Table 内部更新时（例如水平滚动位置同步），则会命中缓存而跳过。

### 最后

antd 的 Table 优化仍在进行中，我们也会持续关注 React 的新特性，以及社区的新思路。如果你有任何想法，欢迎在 GitHub 留言讨论。此外，对于自行研发组件的建议，我们推荐在每次完成优化后，都要创建对应的测试用例，并且备注来源 issue 以便于未来的回溯。以上。
