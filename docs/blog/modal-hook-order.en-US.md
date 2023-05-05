---
title: Funny Modal hook BUG
date: 2022-12-21
author: zombieJ
---

Recently we encountered an [issue](https://github.com/ant-design/ant-design/issues/39427), saying that when `contextHolder` of `Modal.useModal` is placed in different positions, `modal.confirm` popup location will be different:

```tsx
import React from 'react';
import { Button, Modal } from 'antd';

export default () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <div>
      <Modal open>
        <Button
          onClick={() => {
            modal.confirm({ title: 'Hello World' });
          }}
        >
          Confirm
        </Button>

        {/* 🚨 BUG when put here */}
        {contextHolder}
      </Modal>

      {/* ✅ Work as expect when put here */}
      {/* {contextHolder} */}
    </div>
  );
};
```

Workable version:

![Normal](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VJJUTL88uM4AAAAAAAAAAAAADrJ8AQ/original)

Bug version:

![BUG](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a_ulS7EaylkAAAAAAAAAAAAADrJ8AQ/original)

From the figure above, we can see that when `contextHolder` is placed inside `Modal`, the pop-up position of the hooks call is incorrect.

### Why?

antd's Modal internal calls the `rc-dialog` component library, which accepts a `mousePosition` attribute to control the pop-up position([Dialog/Content/index.tsx](https://github.com/react-component/dialog/blob/79649e187ee512be6b3eb3b76e4a6b618b67ebc7/src/Dialog/Content/index.tsx#L43))：

```tsx
// pseudocode
const elementOffset = offset(dialogElement);
const transformOrigin = `${mousePosition.x - elementOffset.left}px ${
  mousePosition.y - elementOffset.top
}px`;
```

The `offset` method is used to obtain the coordinate position of the form itself([util.ts](https://github.com/react-component/dialog/blob/79649e187ee512be6b3eb3b76e4a6b618b67ebc7/src/util.ts#L28))：

```tsx
// pseudocode
function offset(el: Element) {
  const { left, top } = el.getBoundingClientRect();
  return { left, top };
}
```

Through breakpoint debugging, we can find that the value of `mousePosition` is correct, but the value of `rect` obtained in `offset` is wrong:

```json
{
  "left": 0,
  "top": 0,
  "width": 0,
  "height": 0
}
```

This value obviously means that the form component has not been added to the DOM tree at the animation start node, so we need to check the logic added by Dialog.

### createPortal

`rc-dialog` creates a node in the document through `rc-portal`, and then renders the component to this node through `ReactDOM.createPortal`. For the different positions of `contextHolder` and different interactive, it can be speculated that there must be a problem with the timing of creating nodes in the document, so we can take a closer look at the part of adding nodes by default in `rc-portal`([useDom.tsx](https://github.com/react-component/portal/blob/85e6e15ee97c70ec260c5409d9d273d6967e3560/src/useDom.tsx#L55))：

```tsx
// pseudocode
function append() {
  // This is not real world code, just for explain
  document.body.appendChild(document.createElement('div'));
}

useLayoutEffect(() => {
  if (queueCreate) {
    queueCreate(append);
  } else {
    append();
  }
}, []);
```

Among them, `queueCreate` is obtained through `context`, the purpose is to prevent the situation that the child element is created before the parent element under the nesting level:

```tsx
<Modal title="Hello 1" open>
  <Modal title="Hello 2" open>
  <Modal>
<Modal>
```

```html
<!-- Child `useLayoutEffect` is run before parent. Which makes inject dom before parent -->
<div data-title="Hello 2"></div>
<div data-title="Hello 1"></div>
```

Use `queueCreate` to add the `append` of the child element to the queue, and then use `useLayoutEffect` to execute:

```tsx
// pseudocode
const [queue, setQueue] = useState<VoidFunction[]>([]);

function queueCreate(appendFn: VoidFunction) {
  setQueue((origin) => {
    const newQueue = [appendFn, ...origin];
    return newQueue;
  });
}

useLayoutEffect(() => {
  if (queue.length) {
    queue.forEach((appendFn) => appendFn());
    setQueue([]);
  }
}, [queue]);
```

### Resolution

Due to the above queue operation, the dom of the portal will be triggered in the next `useLayoutEffect` under nesting. This causes the `uesLayoutEffect` timing of the animation to start in `rc-dialog` after the node behavior is added, resulting in the element not being in the document and unable to obtain the correct coordinate information.

Since Modal is already enabled, it does not need to be executed asynchronously through `queue`, so we only need to add a judgment if it is enabled, and execute `append` directly:

```tsx
// pseudocode
const appendedRef = useRef(false);

const queueCreate = !appendedRef.current
  ? (appendFn: VoidFunction) => {
      // same code
    }
  : undefined;

function append() {
  // This is not real world code, just for explain
  document.body.appendChild(document.createElement('div'));
  appendedRef.current = true;
}

// ...

return <PortalContext value={queueCreate}>{children}</PortalContext>;
```

That's all.
