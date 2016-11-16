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
| visible    | Determine whether a modal dialog is visible or not | Boolean | no |
| confirmLoading | Determine whether to apply loading visual effect for OK button or not  | Boolean    | no           |
| title      | The modal dialog's title          | React.Element    | no           |
| closable   | Determine whether a close (x) button is visible on top right of the modal dialog or not | Boolean    | true        |
| onOk       | Specify a function that will be called when a user clicked OK button | function | no |
| onCancel   | Specify a function that will be called when a user clicked mask, close button on top right or cancel button | function(e)  | no         |
| width      | Width of a modal dialog           | String or Number | 520           |
| footer     | Footer content       | React.Element    | OK and cancel button |
| okText     | Text of the OK button    | String           | OK       |
| cancelText | Text of the Cancel button    | String           | Cancel       |
| maskClosable | Determine whether to close the modal dialog when clicked mask of it. | Boolean   | true       |
| style | Style of floating layer, typically used at least for adjusting the position. | Object   | - |
| wrapClassName | The class name of the container of the modal dialog | String   | - |

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
| title      | Title           | React.Element or String    | no           |
| content    | Content           | React.Element or String    | no          |
| onOk       | Specify a function that will be called when a user clicked OK button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed    | function         | no           |
| onCancel   | Specify a function that will be called when a user clicked Cancel button. The parameter of this function is a function whose execution should include closing the dialog. You can also just return a promise and when the promise is resolved, the modal dialog will also be closed       | function         | no           |
| width      | Width of dialog           | String or Number | 416           |
| iconType   | Type of Icon component    | String | question-circle |
| okText     | Text of OK button    | String           | OK       |
| cancelText | Text of cancel button    | String           | Cancel       |

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>
