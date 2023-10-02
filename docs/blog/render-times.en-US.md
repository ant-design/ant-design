---
title: Unnecessary Rerender
date: 2022-12-31
author: zombieJ
---

For heavy components, some bug fixes or new features can easily destroy the original performance optimization inadvertently over time. Recently, we are refactoring the Table to troubleshoot and restore the performance loss caused by some historical updates. Here, we introduce some common troubleshooting method and frequently meet problems.

Before that, we recommend you to read the official [Perf tool](https://reactjs.org/docs/perf.html) to choose what you need.

### Render count statistics

In most cases, invalid rendering is not as dramatic as an un-optimized loop. However, in some scenarios such as large forms, tables, and lists, due to the large number of sub components, the performance impact of invalid rendering overlays is also terrible.

For example, in antd v4, in order to improve Table hover highlighting experience of `rowSpan`, we added an event listener for `tr`, and added an additional `className` for the selected row in `td` to support multiple row highlighting capability. However, because `td` consumes `hoverStartRow` and `hoverEndRow` data in the context, non-related rows will [re-render](https://github.com/ant-design/ant-design/issues/33342) due to changes of `hoverStartRow` and `hoverEndRow`.

Problems like this are repeated in heavy components, so we need some helper way to determine the number of renders. In the latest [`rc-table`](https://github.com/react-component/table), we encapsulate a [`useRenderTimes`](https://github.com/react-component/table/blob/ecf3fdb77523b370ee86e19164e95f00e65281a8/src/hooks/useRenderTimes.tsx) method. It will mark the monitored rendering times on React Dev Tools through React's `useDebugValue` in development mode:

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

Generally on the root node of the component, we will create a Context based on `props` and `state` to pass the aggregated data down. But in some cases, the actual content of the Context may not change and trigger the re-render of the child component:

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

In the example, although `prop1` and `prop2` have not changed, it is obvious that `value` in MyContext is a new object, causing the child component to re-render even if `prop1` has not changed. So we need to Memo the Context `value`:

```tsx
// pseudocode
const context = React.useMemo(() => ({ prop1, prop2 }), [prop1, prop2]);

return (
  <MyContext.Provider value={context}>
    <Child />
  </MyContext.Provider>
);
```

Note: You can configure eslint [rules](https://github.com/jsx-eslint/eslint-plugin-react/blob/3256c92ca1b3bc7ec3461a89c278c797e7dc18cb/docs/rules/jsx-no-constructed-context-values.md) to avoid this case.

#### Split Context

Also, refer to the example above. If we put both `prop1` and `prop2` in the Context, then even if `prop1` does not change, `prop2` changes will cause the child component to re-render. Therefore, we can split the Context into several according to the function, thereby reducing the scope of influence:

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

In `rc-table`, we split it into multiple to optimize rendering performance:

- BodyContext
- ExpandedRowContext
- HoverContext
- PerfContext
- ResizeContext
- StickyContext
- TableContext

#### useContextSelector

If you have used Redux, then you may be familiar with `useSelector`, which only rerender when the data that needs to be consumed changes. In React, there is also a related RFC([#118](https://github.com/reactjs/rfcs/pull/118))([#119](https://github.com/reactjs/rfcs/pull/119)) about `useContextSelector`, which will also be implemented in React 18 in the future:

![React 18](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-UFKR7TTSv0AAAAAAAAAAAAADrJ8AQ/original)

Before the API is officially launched, there are many third-party libraries implement (of course, you can also use redux directly). It is no longer necessary to consider the problem of function splitting Context through `useContextSelector`, which also reduces the mental burden of developers:

```tsx
// pseudocode
const Child = React.memo(() => {
  const prop1 = useContextSelector(MyContext, (context) => context.prop1);
  return <>{prop1}</>;
});
```

### Closure problem

After optimizing in various ways, we still have to face a problem. If some rendering needs to pass through the external render method, and it happens that the method uses a closure. Then `React.memo` is unaware:

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

Due to the existence of closures, we cannot determine whether the final dom has changed before calling the `render` method, which is why we optimized the Table through memo in the early days of antd v4 and removed some of it over time (Actually, Table still has some scenarios where this problem needs to be solved).

Considering that Table provides `shouldCellUpdate` method, we plan to adjust Table rendering logic in the future. When the Parent node renders, the Table will be completely re-rendered, and when the Table is updated internally (such as horizontal scrolling position synchronization), it will hit the cache and skip.

### Finally

antd Table optimization is still in progress, and we will continue to pay attention to new features of React and new ideas from the community. If you have any ideas, welcome to discuss on Github. In addition, for the suggestion of self-developed components, we recommend that after each optimization, a corresponding test case should be created, and the source issue should be noted for future retrospection. That's all. Thank you for reading.
