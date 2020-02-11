---
type: Feedback
category: Components
title: Modal
---

Modal dialogs.

## When To Use

When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use `Modal` to create a new floating layer over the current page to get user feedback or display information. Additionally, if you need show a simple confirmation dialog, you can use `antd.Modal.confirm()`, and so on.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| afterClose | Specify a function that will be called when modal is closed completely. | function | - |
| bodyStyle | Body style for modal body element. Such as height, padding etc. | object | {} |
| cancelText | Text of the Cancel button | string\|ReactNode | `Cancel` |
| centered | Centered Modal | Boolean | `false` |
| closable | Whether a close (x) button is visible on top right of the modal dialog or not | boolean | true |
| closeIcon | custom close icon | ReactNode | - |
| confirmLoading | Whether to apply loading visual effect for OK button or not | boolean | false |
| destroyOnClose | Whether to unmount child components on onClose | boolean | false |
| footer | Footer content, set as `footer={null}` when you don't need default buttons | string\|ReactNode | OK and Cancel buttons |
| forceRender | Force render Modal | boolean | false |
| getContainer | Return the mount node for Modal | HTMLElement \| `() => HTMLElement` \| Selectors \| false | document.body |
| mask | Whether show mask or not. | Boolean | true |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean | true |
| maskStyle | Style for modal's mask element. | object | {} |
| okText | Text of the OK button | string\|ReactNode | `OK` |
| okType | Button `type` of the OK button | string | `primary` |
| okButtonProps | The ok button props | [ButtonProps](/components/button) | - |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button) | - |
| style | Style of floating layer, typically used at least for adjusting the position. | object | - |
| title | The modal dialog's title | string\|ReactNode | - |
| visible | Whether the modal dialog is visible or not | boolean | false |
| width | Width of the modal dialog | string\|number | 520 |
| wrapClassName | The class name of the container of the modal dialog | string | - |
| zIndex | The `z-index` of the Modal | Number | 1000 |
| onCancel | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e) | - |
| onOk | Specify a function that will be called when a user clicks the OK button | function(e) | - |

#### Note

> The state of Modal will be preserved at it's component lifecycle by default, if you wish to open it with a brand new state everytime, set `destroyOnClose` on it.

### Modal.method()

There are five ways to display the information based on the content's nature:

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

The items listed above are all functions, expecting a settings object as parameter. The properties of the object are follows:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocusButton | Specify which button to autofocus | null\| `ok` \| `cancel` | `ok` |
| cancelText | Text of the Cancel button with Modal.confirm | string | `Cancel` |
| centered | Centered Modal | Boolean | `false` |
| className | className of container | string | - |
| content | Content | string\|ReactNode | - |
| icon | custom icon (`Added in 3.12.0`) | ReactNode | `<QuestionCircle />` |
| keyboard | Whether support press esc to close | Boolean | true |
| mask | Whether show mask or not. | Boolean | true |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | Boolean | `false` |
| okText | Text of the OK button | string | `OK` |
| okType | Button `type` of the OK button | string | `primary` |
| okButtonProps | The ok button props | [ButtonProps](/components/button) | - |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button) | - |
| title | Title | string\|ReactNode | - |
| width | Width of the modal dialog | string\|number | 416 |
| zIndex | The `z-index` of the Modal | Number | 1000 |
| onCancel | Specify a function that will be called when the user clicks the Cancel button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed | function | - |
| onOk | Specify a function that will be called when the user clicks the OK button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed | function | - |

All the `Modal.method`s will return a reference, and then we can update and close the modal dialog by the reference.

```jsx
const modal = Modal.info();

modal.update({
  title: 'Updated title',
  content: 'Updated content',
});

modal.destroy();
```

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>

- `Modal.destroyAll`

`Modal.destroyAll()` could destroy all confirmation modal dialogs(Modal.info/Modal.success/Modal.error/Modal.warning/Modal.confirm). Usually, you can use it in router change event to destroy confirm modal dialog automatically without use modal reference to close( it's too complex to use for all modal dialogs)

```jsx
import { browserHistory } from 'react-router';

// router change
browserHistory.listen(() => {
  Modal.destroyAll();
});
```

### Modal.useModal()

When you need using Context, you can use `contextHolder` which created by `Modal.useModal` to insert into children. Modal created by hooks will get all the context where `contextHolder` are. Created `modal` has the same creating function with `Modal.method`](<#Modal.method()>).

```jsx
const [modal, contextHolder] = Modal.useModal();

React.useEffect(() => {
  modal.confirm({
    // ...
  });
}, []);

return <div>{contextHolder}</div>;
```

## FAQ

### Why I can not access context, redux in Modal.xxx?

antd will dynamic create React instance by `ReactDOM.render` when call Modal methods. Whose context is different with origin code located context.

When you need context info (like ConfigProvider context), you can use `Modal.useModal` to get `modal` instance and `contextHolder` node. And put it in your children:

```tsx
const [modal, contextHolder] = Modal.useModal();

return (
  <Context1.Provider value="Ant">
    {/* contextHolder is in Context1 which mean modal will not get context of Context1 */}
    {contextHolder}
    <Context2.Provider value="Design">
      {/* contextHolder is out of Context2 which mean modal will not get context of Context2 */}
    </Context2.Provider>
  </Context1.Provider>
);
```

**Note:** You must insert `contextHolder` into your children with hooks. You can use origin method if you do not need context connection.
