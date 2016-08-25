---
category: Components
type: Form Controls
english: Upload
---

Upload file by selecting or dragging

## When to use

Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.


## API

| Property       | Description                                    | Type        | Default|
|------------|----------------------------------------------------| ----------- |--------|
| name       | Optional. The name of uploading file               | String      | file  |
| defaultFileList | Optional. Default list of files that have been uploaded.                   | Array[Object] | -  |
| fileList   | Optional. List of files that have been uploaded.   | Array[Object] | - |
| action     | Required. Uploading URL                            | String      | -    |
| data       | Optional. Uploading params or function which can return uploading params. | Object or function(file) | - |
| headers    | Optional. Set request headers, valid above IE10.   | Object      | -    |
| showUploadList | Optional. Whether to show uploadList.          | Boolean     | true  |
| multiple   | Optional. Whether to support selected multiple file. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true  | Boolean     | false |
| accept     | Optional. File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)    | String      | -   |
| beforeUpload | Optional. Hook function which takes an argument: the uploaded file, will be executed before uploading.  Uploading will be stopped with `false` or a rejected Promise returned. **Warning：this function is not supported by old IE**。 | Function    | -    |
| onChange   | Optional. A callback function, can be executed when uploading state is changing. See [onChange](#onChange)                | Function    | -   |
| listType   | Optional. Built-in stylesheets, support for two types: `text` or `picture`     | String      | 'text'|
| onPreview  | A callback function, will be executed when file link is clicked.  | Function(file) | -  |
| onRemove   | A callback function, will be executed when removing file button is clicked                                       | Function(file) | -   |
| supportServerRender | Need to be turned on while the server side is rendering.| Boolean | false    |

### onChange

> The function will be called when uploading is in progress, completed or  failed

When uploading state change, it returns:

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` File object for the current operation.

   ```js
   {
      uid: 'uid',      // unique identifier，negative is recommend，to prevent interference with internal generated id 
      name: 'xx.png'   // file name
      status: 'done',  // options：uploading, done, error, removed
      response: '{"status": "success"}',  // response from server
   }
   ```
	
   If multiple files are uploaded, this parameter will be Array Object `[file, ...]`

2. `fileList` current list of files
3. `event` response from server, including uploading progress, supported by advanced browsers.

## show download links

please set property `url` of property `fileList` to control content of link

## IE note

- [https://github.com/react-component/upload#ie89-note](https://github.com/react-component/upload#ie89-note)
