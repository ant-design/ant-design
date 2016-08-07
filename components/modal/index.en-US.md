---
type: Views
category: Components
english: Modal
---

Modal dialogs.

## When to use

When requiring users to interact with application, but don't want to jump to a new page to interrupt
user's workflow, you can use `Modal` to create a new floating layer over currtent page for user 
operations.

In addition, if you need a simple confirm dialog to users, you can use `ant.Modal.confirm()`, 
and so on.



## API


| Property       | Description           | Type             | Default       |
|------------|----------------|------------------|--------------|
| visible    | Determine whether a modal dialog is visible | Boolean          | no           |
| confirmLoading | Determine whether to apply loding visual effect for OK button  | Boolean    | no           |
| title      | A title of a modal dialog           | React.Element    | no           |
| closable   | Determine whether a closable button is visible on top right of a modal dialog | Boolean    | true        |
| onOk       | Specify a function that will be called when a user clicked OK button       | function     | no           |
| onCancel   | Specify a function that will be called when a user clicked mask, close button on top right or cancel button | function(e)  | no         |
| width      | Width of a modal dialog           | String or Number | 520           |
| footer     | Footer content       | React.Element    | OK and cancel button |
| okText     | Text of OK button    | String           | OK       |
| cancelText | Text of cancel button    | String           | Cancel       |
| maskClosable | Determine whether to close the modal dialog when clicked mask of it. | Boolean   | true       |
| style | Style of floating layer, typically can be used to adjust position, and so on | Object   | - |
| wrapClassName | The class name of the container of the modal dialog | String   | - |

### Modal.xxx()

as following：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

The item of above list is all function, the parameter of the function is an object, 
the propeties of the object are as follows:

| Property   | Description    | Type             | Default       |
|------------|----------------|------------------|---------------|
| title      | Title           | React.Element or String    | no           |
| content    | Content           | React.Element or String    | no          |
| onOk       | Specify a function that will be called when a user clicked OK button, the parameter of this function is a function to close dialog. You can also just return a promise, when the promise be resolved, the modal dialog will also be closed    | function         | no           |
| onCancel   | Specify a function that will be called when a user clicked cancel button, the parameter of this function is a function to close dialog. You can also just return a promise, when the promise be resolved, the modal dialog will also be closed       | function         | no           |
| width      | Width of dialog           | String or Number | 416           |
| iconType   | Type of Icon component    | String | question-circle |
| okText     | Text of OK button    | String           | OK       |
| cancelText | Text of cancel button    | String           | Cancel       |

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>
