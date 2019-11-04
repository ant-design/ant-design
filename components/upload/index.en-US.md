---
category: Components
type: Data Entry
title: Upload
---

Upload file by selecting or dragging.

## When To Use

Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| accept | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |  |
| action | Uploading URL | string\|(file) => `Promise` | - |  |
| method | http method of upload request | string | 'post' | 3.25.0 |
| directory | support upload whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory)) | boolean | false | 3.7.0 |
| beforeUpload | Hook function which will be executed before uploading. Uploading will be stopped with `false` or a rejected Promise returned. **Warning：this function is not supported in IE9**。 | (file, fileList) => `boolean | Promise` | - |  |
| customRequest | override for the default xhr behavior allowing for additional customization and ability to implement your own XMLHttpRequest | Function | - |  |
| data | Uploading extra params or function which can return uploading extra params. | object\|function(file) | - |  |
| defaultFileList | Default list of files that have been uploaded. | object\[] | - |  |
| disabled | disable upload button | boolean | false |  |
| fileList | List of files that have been uploaded (controlled). Here is a common issue [#2423](https://github.com/ant-design/ant-design/issues/2423) when using it | object\[] | - |  |
| headers | Set request headers, valid above IE10. | object | - |  |
| listType | Built-in stylesheets, support for three types: `text`, `picture` or `picture-card` | string | 'text' |  |
| multiple | Whether to support selected multiple file. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | boolean | false |  |
| name | The name of uploading file | string | 'file' |  |
| previewFile | Customize preview file logic | (file: File \| Blob) => Promise<dataURL: string> | - | 3.17.0 |
| showUploadList | Whether to show default upload list, could be an object to specify `showPreviewIcon`, `showRemoveIcon` and `showDownloadIcon` individually | Boolean or { showPreviewIcon?: boolean, showDownloadIcon?: boolean, showRemoveIcon?: boolean } | true |  |
| supportServerRender | Need to be turned on while the server side is rendering | boolean | false |  |
| withCredentials | ajax upload with cookie sent | boolean | false |  |
| openFileDialogOnClick | click open file dialog | boolean | true | 3.10.0 |
| onChange | A callback function, can be executed when uploading state is changing, see [onChange](#onChange) | Function | - |  |
| onPreview | A callback function, will be executed when file link or preview icon is clicked | Function(file) | - |  |
| onRemove | A callback function, will be executed when removing file button is clicked, remove event will be prevented when return value is `false` or a Promise which resolve(false) or reject | Function(file): `boolean | Promise` | - |  |
| onDownload | Click the method to download the file, pass the method to perform the method logic, do not pass the default jump to the new TAB. | Function(file): void | Jump to new TAB |  |
| transformFile   | Customize transform file before request | Function(file): `string | Blob | File | Promise<string | Blob | File>` | - | 3.21.0 |

### onChange

> The function will be called when uploading is in progress, completed or failed.

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
      uid: 'uid',      // unique identifier, negative is recommend, to prevent interference with internal generated id
      name: 'xx.png',   // file name
      status: 'done', // options：uploading, done, error, removed
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}', // additional html props of file link
      xhr: 'XMLHttpRequest{ ... }', // XMLHttpRequest Header
   }
   ```

2. `fileList` current list of files
3. `event` response from server, including uploading progress, supported by advanced browsers.

## FAQ

### How to implement upload server side?

- You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki#server-side) about how to implement server side upload interface.
- There is a mock example of [express](https://github.com/react-component/upload/blob/master/server.js) in rc-upload.

### I want to display download links.

Please set property `url` of each item in `fileList` to control content of link.

### How to use `customRequest`?

See <https://github.com/react-component/upload#customrequest>.

### IE8/9 Note

See <https://github.com/react-component/upload#ie89-note>.
