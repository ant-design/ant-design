---
title: about antd test library migration
date: 2022-12-20
author: li-jia-nan,zombieJ
---

Hello, I am **[@li-jia-nan](https://github.com/li-jia-nan)**. It is also a new Collaborator who joined antd in the past few months. Fortunately, as one of the Collaborators, I developed the **[FloatButton component](/components/float-button)** and **[QRCode component](/components/qrcode)**, as well as some other maintenance work. Let me share the migration of the antd test library son~

## introduction

In `antd@4.x`, **[enzyme](https://enzymejs.github.io/enzyme)** is used as the test framework. However, due to the lack of maintenance of enzyme, it is difficult to support it in the React 18 era . Therefore, I had to start a long **[@testing-lib](https://testing-library.com/docs/react-testing-library/intro)** migration road for antd.

During the migration process, I undertook about a quarter of the workload of antd. Here I mainly record the problems encountered during the migration process.

> Thanks for the time [@zombieJ](https://github.com/zombieJ) [@MadCcc](https://github.com/MadCcc) [@miracles1919](https://github.com/miracles1919) for help.

![image](https://user-images.githubusercontent.com/49217418/207530591-1faaf171-638b-40af-8d61-3f07cb60abe2.png)

![image](https://user-images.githubusercontent.com/49217418/207530491-4988ecc4-2da0-4a0c-ba5d-b9797edecd1a.png)

![image](https://user-images.githubusercontent.com/49217418/207530507-412f0244-3d88-4500-9eb4-054f3e112731.png)

## start

Before migrating, we need to figure out what the purpose of the migration is. In `enzyme`, most scenarios are to test whether the state in the component is correct, or whether the static properties on the class are assigned normally, which is actually unreasonable, because we need to care more about whether the "function" is normal , rather than whether the "attribute" is correct, because the source code is a black box for the user, and the user only cares about whether the component is correct.

Basically, test cases should be written based on "behavior", not "implementation" (this is also the goal of `testing-library`). In principle, several use cases were found to be redundant (because some functions would not be triggered individually in real code), and their removal did not affect the test coverage.

Of course, this is only one of the reasons to drop `enzyme`. More importantly it is unmaintained and does not support React 18 anymore.

## migrate

### 1. render

`enzyme` supports rendering in three ways:

- shallow: Shallow rendering, which is an encapsulation of the official Shallow Renderer. Render the component into a virtual DOM object. The component obtained through Shallow Render will not have a part asserted to the sub-component, and the information of the component can be accessed using jQuery.

- render: Static rendering, which renders the React component into a static HTML string, then parses the string, and returns an instance object, which can be used to analyze the html structure of the component.

- mount: Fully rendered, it loads component rendering into a real DOM node to test the interaction of DOM API and the life cycle of components, and uses jsdom to simulate the browser environment.

In order to be close to the real scene of the browser, `antd@4.x` uses `mount` for rendering, and the corresponding `render` method in `@testing-library`:

```diff
--  import { mount } from 'enzyme';
++  import { render } from '@testing-library/react';

--  const wrapper = mount(
++  const { container } = render(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <Slider />
      </ConfigProvider>,
    );
```

### 2. interact & event

`enzyme` provides `simulate(event)` method to simulate event triggering and user interaction, `event` is the name of the event, and the corresponding `fireEvent` method in `@testing-library`:

```diff
++  import { fireEvent } from '@testing-library/react';

--  wrapper.find('.ant-handle').simulate('click');
++  fireEvent.click(container.querySelector('.ant-handle'));
```

### 3. DOM element

In `enzyme`, some built-in APIs are provided to manipulate dom, or find components:

- instance(): Returns an instance of the test component
- at(index): returns a rendered object
- text(): Returns the text content of the current component
- html(): Returns the HTML code form of the current component
- props(): Returns all properties of the component
- prop(key): Returns the specified property of the component
- state(): Returns the state of the component
- setState(nextState): Set the state of the component
- setProps(nextProps): Set the properties of the component
- find(selector): Find the node according to the selector, the selector can be the selector in CSS, or the constructor of the component, and the displayName of the component, etc.

In `testing-library`, these APIs are not provided (as mentioned above - `testing-library` focuses more on behavioral testing), so it needs to be replaced by native dom operations:

```diff
    expect(ref.current.getPopupDomNode()).toBe(null);
--  popover.find('span').simulate('click');
--  expect(popover.find('Trigger PopupInner').props().visible).toBeTruthy();

++  expect(container.querySelector('.ant-popover-inner-content')).toBeFalsy();
++  fireEvent.click(popover.container.querySelector('span'));
++  expect(container.querySelector('.ant-popover-inner-content')).toBeTruthy();
```

### 4. compatibility test

While the major version is being upgraded, some components are discarded, but they are not removed in antd. For example, the BackTop component needs to add warning to the component to ensure compatibility, so it is also necessary to write a special unit test for warning:

```diff
    describe('BackTop', () => {
++    it('should console Error', () => {
++        const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
++        render(<BackTop />);
++        expect(errSpy).toHaveBeenCalledWith(
++          'Warning: [antd: BackTop] `BackTop` is deprecated, please use `FloatButton.BackTop` instead.',
++        );
++      errSpy.mockRestore();
++    });
    });
```

## Diff Mystery

During the conversion process, I discovered a magical phenomenon. In some cases, the DOM snapshot generated by the same case will be different, so I began to explore what has changed in React 18:

In the past, the `snapshot` comparison of `enzyme` was to convert the `enzyme object` into a serialized object through the `enzyme-to-json` plugin:

```js
// jest.config.js
module.exports = {
  // ...
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
```

When it comes to `@testing-library/react`, directly call `render` to generate dom elements, and then compare the dom:

```diff
--  import { mount } from 'enzyme';
++  import { render } from '@testing-library/react';

    describe('xxx', () => {
      it('yyy', () => {
--      const wrapper = mount(<Demo />);
++      const { container } = render(<Demo />);
--      expect(wrapper.render()).toMatchSnapshot();
++      expect(container.firstChild).toMatchSnapshot();
      });
    });

```

Interestingly, in some test cases. It will hang, the difference is that React 18 sometimes has fewer blank lines:

```diff
    <div>
--
      Hello World
    </div>
```

After testing `innerHTML` of dom, it is found that 17 and 18 are the same. So at the beginning of the problem, we simply changed the test case to compare `innerHTML`:

```ts
expect(container.querySelector('.className').innerHTML).toMatchSnapshot();
```

However, as you migrate more, you will gradually see this happening over and over again. Comparing `innerHTML` is also not a long-term solution. So began to explore why this happens.

## pretty-format

`pretty-format` is an interesting library that converts any object into a string. One of its uses is for snapshot comparison of jest. One of its features is that conversion rules can be customized.

Compared with `snapshot` in `jest`, `format` will be done first, for common objects such as native `dom`, `object`. It has built-in a set of `plugins` for format conversion:

```html
<div>
  <span>Hello</span>
  <p>World</p>
</div>
↓
<div>
  <span> Hello </span>
  <p>World</p>
</div>
```

The first reaction to the appearance of extra spaces is whether it is because the version of `@testing-lib/react` introduced by 17 & 18 is different, which affects the version of `pretty-format` that `jest` depends on. After checking, they are all consistent:

```json
{
  "devDependencies": {
    "pretty-format": "^29.0.0",
    "@testing-library/react": "^13.0.0"
  }
}
```

After this judgment is wrong, it is another situation. There is an `empty element` in the dom, which makes `pretty-format` perceptible, but it does not affect `innerHTML`, so I wrote a simple test case:

```ts
const holder = document.createElement('div');
holder.append('');
holder.append(document.createElement('a'));
expect(holder).toMatchSnapshot();
console.log(holder.innerHTML);
```

and get the following output:

```snap
// snapshot
exports[`debug exports modules correctly 1`] = `
<div>

  <a />
</div>
`;

// console.log
<a></a>
```

Consistent with the idea, then it is very simple. Then there is a high probability that the `render` of `React 18` will ignore empty elements. Let's do a simple experiment:

```tsx
import React, { useEffect, useRef, version } from 'react';

const App: React.FC = () => {
  const holderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(holderRef.current?.childNodes);
  }, []);
  return (
    <div ref={holderRef}>
      <p>{version}</p>
    </div>
  );
};

export default App;
```

as predicted:

| React 17                | React 18       |
| ----------------------- | -------------- |
| NodeList(2) \[text, p\] | NodeList \[p\] |

Check the `Fiber` node information, you can find that `React 17` will treat empty elements as `Fiber` nodes, while `React 18` will ignore empty elements:

> React 17:

![image](https://user-images.githubusercontent.com/49217418/207533725-fb8f9e4d-7f09-4a13-a04a-cbb2d3eb2aea.png)

> React 18:

![image](https://user-images.githubusercontent.com/49217418/207533740-328d10ea-d9bc-4469-bc00-f08e33857e6f.png)

You can find the relevant PR by following the map:

- https://github.com/facebook/react/pull/22807

![WX20230319-145539@2x](https://user-images.githubusercontent.com/49217418/226159376-497fd490-153e-4e88-92e2-29dda50b3426.png)

## a solution

Antd needs to test React16, 17, and 18. If snapshot is not feasible, it will cause too much cost. So we need to modify jest. `enzyme-to-json` gave me inspiration, we can modify the snapshot generation logic to smooth out the diff between different versions of React:

```ts
expect.addSnapshotSerializer({
  // Determine whether it is a dom element, if yes, go to our own serialization logic
  // The code has been simplified, more logic is needed for real judgment, you can refer to setupAfterEnv.ts of antd
  test: (element) => element instanceof HTMLElement,
  // ...
});
```

Then access `pretty-format` and add your own logic:

```ts
const htmlContent = format(element, {
  plugins: [plugins.DOMCollection, plugins.DOMElement],
});

expect.addSnapshotSerializer({
  test: '//...',
  print: (element) => {
    const filtered = htmlContent
      .split(/[\n\r]+/)
      .filter((line) => line.trim())
      .map((line) => line.replace(/\s+$/, ''))
      .join('\n');
    return filtered;
  },
});
```

## knock off

The above are some problems encountered during the migration of the antd test framework. I hope to help students who need to migrate or have not yet started writing test cases. Everyone is also welcome to join the antd community and contribute to open source together.
