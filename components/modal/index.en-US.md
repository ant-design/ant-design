---
type: Feedback
category: Components
title: Modal
---

Modal dialogs.

## When To Use

When requiring users to interact with the application, but without jumping to a new page and interrupting
the user's workflow, you can use `Modal` to create a new floating layer over the current page to get user
feedback or display information.
Additionally, if you need show a simple confirmation dialog, you can use `antd.Modal.confirm()`,
and so on.

## API

| Property       | Description           | Type             | Default       |
|------------|----------------|------------------|--------------|
| visible    | Whether the modal dialog is visible or not | boolean | false |
| confirmLoading | Whether to apply loading visual effect for OK button or not  | boolean    | false           |
| title      | The modal dialog's title          | string\|ReactNode | -           |
| closable   | Whether a close (x) button is visible on top right of the modal dialog or not | boolean    | true        |
| onOk       | Specify a function that will be called when a user clicks the OK button | function(e) | - |
| onCancel   | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e)  | -         |
| width      | Width of the modal dialog           | string\|number | 520           |
| footer     | Footer content, set as `footer={null}` when you don't need default buttons | string\|ReactNode | OK and Cancel buttons |
| okText     | Text of the OK button    | string           | `OK`       |
| okType    | Button `type` of the OK button            | string        | `primary`   |
| cancelText | Text of the Cancel button    | string           | `Cancel`       |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean   | true       |
| style | Style of floating layer, typically used at least for adjusting the position. | object   | - |
| wrapClassName | The class name of the container of the modal dialog | string   | - |
| bodyStyle | Body style for modal body element. Such as height, padding etc. | object | {} |
| maskStyle | Style for modal's mask element. | object | {} |
| mask | Whether show mask or not. | Boolean | true |
| afterClose | Specify a function that will be called when modal is closed completely. | function | - |
| getContainer | Return the mount node for Modal | (instance): HTMLElement | () => document.body |
| zIndex | The `z-index` of the Modal | Number | 1000 |

#### Destroy on close

> The state of Modal will be preserved at it's component lifecycle.
> If you wish to open it with a brand new state everytime, you need to reset state manually.

### Modal.method()

There are five ways to display the information based on the content's nature:

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

The items listed above are all functions, expecting a settings object as parameter.
The properties of the object are follows:

| Property   | Description    | Type             | Default       |
|------------|----------------|------------------|---------------|
| title      | Title           | string\|ReactNode | -           |
| content    | Content           | string\|ReactNode | -          |
| onOk       | Specify a function that will be called when the user clicks the OK button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed    | function         | -           |
| onCancel   | Specify a function that will be called when the user clicks the Cancel button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed       | function         | -           |
| width      | Width of the modal dialog           | string\|number | 416           |
| iconType   | Icon `type` of the Icon component    | string | `question-circle` |
| okText     | Text of the OK button    | string           | `OK`       |
| okType    | Button `type` of the OK button                              | string        | `primary`   |
| cancelText | Text of the Cancel button    | string           | `Cancel`       |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | Boolean   | `false`       |
| zIndex | The `z-index` of the Modal | Number | 1000 |

All the `Modal.method`s will return a reference, and then we can close the modal dialog by the reference.

```jsx
const ref = Modal.info();
ref.destroy();
```

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>
