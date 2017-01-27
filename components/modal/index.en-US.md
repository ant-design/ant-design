---
type: Feedback
category: Components
title: Modal
---

Modal dialogs.

## When To Use

When requiring users to interact with application, but without jumping to a new page to interrupt
the user's workflow, you can use `Modal` to create a new floating layer over the current page for user
getting feedback or information purposes.
Additionally, if you need show a simple confirmation dialog, you can use `ant.Modal.confirm()`,
and so on.

## API

| Property       | Description           | Type             | Default       |
|------------|----------------|------------------|--------------|
| visible    | Determine whether a modal dialog is visible or not | boolean | no |
| confirmLoading | Determine whether to apply loading visual effect for OK button or not  | boolean    | no           |
| title      | The modal dialog's title          | string\|ReactNode | no           |
| closable   | Determine whether a close (x) button is visible on top right of the modal dialog or not | boolean    | true        |
| onOk       | Specify a function that will be called when a user clicked OK button | function | no |
| onCancel   | Specify a function that will be called when a user clicked mask, close button on top right or cancel button | function(e)  | no         |
| width      | Width of a modal dialog           | string\|number | 520           |
| footer     | Footer content       | string\|ReactNode | OK and cancel button |
| okText     | Text of the OK button    | string           | OK       |
| cancelText | Text of the Cancel button    | string           | Cancel       |
| maskClosable | Determine whether to close the modal dialog when clicked mask of it. | boolean   | true       |
| style | Style of floating layer, typically used at least for adjusting the position. | object   | - |
| wrapClassName | The class name of the container of the modal dialog | string   | - |
| afterClose | Specify a function that will be called when modal is closed completely. | function | - |

#### Destroy on close

> The state of Modal will be preserved at it's component lifecircle.
> If you wish to open it with brand new state everytime, you need to reset state manually. Or simply [give a new random key](https://github.com/ant-design/ant-design/issues/4165) to Modal when visible is changed to `true`, React will treat it as a new component.

> ```
> <Modal key={this.state.newRandomKey} visible={this.state.visible} />
> ```

### Modal.xxx()

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
| title      | Title           | string\|ReactNode | no           |
| content    | Content           | string\|ReactNode | no          |
| onOk       | Specify a function that will be called when a user clicked OK button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed    | function         | no           |
| onCancel   | Specify a function that will be called when a user clicked Cancel button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed       | function         | no           |
| width      | Width of dialog           | string\|number | 416           |
| iconType   | Type of Icon component    | string | question-circle |
| okText     | Text of OK button    | string           | OK       |
| cancelText | Text of cancel button    | string           | Cancel       |
| maskClosable | Determine whether to close the modal dialog when clicked mask of it. | Boolean   | `false`       |

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>
