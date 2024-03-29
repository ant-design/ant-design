---
title: Suspense breaks styles
date: 2023-07-07
author: zombieJ
---

We know that React 18 provides a `useInsertionEffect` hooks specifically for CSS-IN-JS, which has a faster timing priority than `useLayoutEffect`, so that the order of calls will not be affected by the order of writing:

```tsx
useLayoutEffect(() => {
  console.log('layout effect');
}, []);

useInsertionEffect(() => {
  console.log('insertion effect');
}, []);

// Console:
// - insertion effect
// - layout effect
```

In early `@ant-design/cssinjs` implementation, we did not choose `useInsertionEffect` because we needed to be compatible with React 17 version, but simulated the effect of inserting in advance by adding styles in the render phase:

```tsx
// pseudocode. Not used in real world
function useStyleInsertion(hash: string, counter: Record<string, number>) {
  useMemo(() => {
    if (!counter[hash]) {
      // Insert only when current style not inserted
    }

    counter[hash] += 1;
  }, [hash]);

  useEffect(
    () => () => {
      counter[hash] -= 1;

      if (!counter[hash]) {
        // Remove if set to clear on destroy
      }
    },
    [hash],
  );
}
```

Above code will count the usage of styles, if the current style has not been inserted, it will insert the style in the render phase. Similarly, if the current style is configured to be unloaded when it is not in use, it will be cleared after the effect confirms the count. In addition, there is a similar logic that listens for changes in tokens, and when there are multiple tokens, it will clear all styles `<style />` corresponding to tokens that are no longer in use to avoid memory leaks caused by too many theme switches.

These code can run perfectly in React 17, and also run very well in React 18's StrictMode. `counter` always appears and disappears in pairs. But under Suspense, it may have problems.

## StrictMode

The StrictMode of React 18 is different from [React 17](https://17.reactjs.org/docs/strict-mode.html) in that it will be called multiple times in each phase to ensure that developers clean up the Effect:

````tsx

```tsx
const My = () => {
  console.log('render');

  useMemo(() => {
    console.log('memo');
  }, []);

  useEffect(() => {
    console.log('effect');

    return () => {
      console.log('effect cleanup');
    };
  }, []);
};

<StrictMode>
  <My />
</StrictMode>;

// Console:
// - render
// - memo
// - render
// - memo
// - effect
// - effect cleanup
// - effect
````

With above sample, we can know that `counter` in StrictMode will be accumulated, but the final value will be correct (that is, each component will only be counted once):

- memo: 1
- memo: 2
- effect cleanup: 1

But StrictMode is just a simulation of Suspense. In the real scenario, the number of executions is not guaranteed to appear in pairs.

## Suspense

We use [umi](https://github.com/umijs/umi) for site development, which is split by page and loaded on demand by default. Display the loading state during the loading process through Suspense:

```tsx
<BrowserRoutes>
  <Routs>
    <Suspense fallback={<Loading />} />
  </Routs>
</BrowserRoutes>
```

When switching pages, there is a chance that some styles will be lost when the page is switched back and forth:

<img width="300" alt="Fetch Failed" src="https://github.com/ant-design/ant-design/assets/5378891/f2bc49ed-9db6-4d7e-a5d3-8db0cda7b640" />

Part of the style lost in Page 1 is the style unique to Page 1 (some tokens are customized through ConfigProvider), and the style of Page 2 is the style common to Page 1 and Page 2.

With the style management logic we introduced at the beginning, Page 1 will be cleared all styles `<style />` corresponding to the token when Page 2 is rendered because it has styles corresponding to the independent token. This looks as expected, so the problem is that the style is not re-inserted when switching back to Page 1.

### Wrong Counter

With a series of breakpoints, we found that this problem is caused by the asynchronous nature of Suspense. It will call the component multiple times during the loading process, so the timing of the component style registration will also be called multiple times. And since our counter is in the render phase, the counter will be called multiple times under Suspense, which will cause the value of the counter to be incorrect:

- render: 0
- useMemo: 1
- render: 1
- useMemo: 2
- effect: 2
- Not like StrictMode, effect is not executed again, so effect cleanup will not be executed

Counter is not synchronized, so the token manager thinks that the style is no longer in use, so it performs batch cleaning, while the component style manager thinks that other components are still in use, so when re-entering Page 1, the style will not be re-inserted.

## useInsertionEffect

Obviously, due to its characteristics, we cannot use `useMemo` as a counter, it will not appear in pairs with `useEffect`. So we consider using `useInsertionEffect` to insert styles:

```tsx
// pseudocode. Not used in real world
useInsertionEffect(() => {
  if (!counter[hash]) {
    // Insert only when current style not inserted
  }
  counter[hash] += 1;

  return () => {
    counter[hash] -= 1;

    if (!counter[hash]) {
      // Remove if set to clear on destroy
    }
  };
}, [hash]);
```

And for React 17 version, it is downgraded to `useLayoutEffect`:

```tsx
const useMergedInsertionEffect = useInsertionEffect || useLayoutEffect;

useMergedInsertionEffect(() => {
  // Same as above
}, [hash]);
```

With this modification, we found that React 17's CI was failed. After checking, we found that `useLayoutEffect` will have a timing problem:

```tsx
// Some logic measure DOM size
useLayoutEffect(() => {
  // This is not correct since style is not applied
  const { clientHeight } = nodeRef.current;
}, []);

// Inject style
useLayoutEffect(() => {
  // ...
}, [hash]);
```

Measure logic in `useLayoutEffect` is executed before injecting style, resulting in incorrect size information. It can also be predicted that this will have an impact on developers. So we have to compromise, and in React 17 version, it will be downgraded to the original `useMemo` insertion.

## New Problem under React 17

With the above solution, `useInsertionEffect` perfectly solve the rendering problem. But in React 17 and below versions, we still insert styles in the render phase, but we will increase the reference count in the effect phase. But this brings a new problem, let's look at a piece of code ([CodeSandbox](https://codesandbox.io/s/aged-cdn-qjxmpz?file=/src/App.tsx:23-886)):

```tsx
import React from 'react';

const A = () => {
  React.useMemo(() => {
    console.log('A render');
  }, []);

  React.useEffect(() => {
    console.log('A mounted');
    return () => {
      console.log('A unmounted');
    };
  }, []);

  return <div>A</div>;
};

const B = () => {
  React.useMemo(() => {
    console.log('B render');
  }, []);

  React.useEffect(() => {
    console.log('B mounted');
    return () => {
      console.log('B unmounted');
    };
  }, []);

  return <div>B</div>;
};

export default function App() {
  const [show, setShow] = React.useState(true);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggle}>toggle</button>
      <div>{show ? <A /> : <B />}</div>
    </div>
  );
}
```

In this code (strict mode), clicking the button will switch the rendering of A and B. So what will the order of console be when switching from A to B? The answer is:

```
B render
B render
A unmounted
B mounted
B unmounted
B mounted
```

We can see that the rendering of the new component is before the unmount callback of the old component. Remember the processing logic of `cssinjs` in React 17? Let's mark it:

```
B render      // Write to cache and insert style tag
B render      // Write to cache and insert style tag
A unmounted   // **Reference count--** (Reference count changed from 1 to 0, so the style was unloaded)
B mounted     // Reference count++ (Reference count changed from 0 to 1, but the style was inserted before unloaded)
B unmounted   // Reference count--
B mounted     // Reference count++
```

We finally find out that due to reference count is not updated in time, the style was unloaded, which in not as expected.

And the solution is simple: when the count changes from 0 to 1, style will be inserted again.

## Summary

Suspense brings rendering performance improvements, but it also makes timing very important. It is not the best way to only 'work on' StrictMode. Different logic is used for different React versions is not good choice since it will have timing problem. `render` will trigger from parent node to child node in turn, while `useInsertionEffect` is the opposite. However, from the perspective of antd, the component styles are independent of each other, so this problem will not affect us.
