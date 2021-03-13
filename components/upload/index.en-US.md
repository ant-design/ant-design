---
category: Components
type: Data Entry
title: Upload
cover: https://gw.alipayobjects.com/zos/alicdn/QaeBt_ZMg/Upload.svg
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
| action | Uploading URL | string \| (file) => Promise&lt;string> | - |  |
| beforeUpload | Hook function which will be executed before uploading. Uploading will be stopped with `false` or a rejected Promise returned. **Warning：this function is not supported in IE9** | (file, fileList) => boolean \| Promise&lt;File> | - |  |
| customRequest | Override for the default xhr behavior allowing for additional customization and ability to implement your own XMLHttpRequest | function | - |  |
| data | Uploading extra params or function which can return uploading extra params | object \| (file) => object \| Promise&lt;object> | - |  |
| defaultFileList | Default list of files that have been uploaded | object\[] | - |  |
| directory | Support upload whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory)) | boolean | false |  |
| disabled | Disable upload button | boolean | false |  |
| fileList | List of files that have been uploaded (controlled). Here is a common issue [#2423](https://github.com/ant-design/ant-design/issues/2423) when using it | [UploadFile](#UploadFile)\[] | - |  |
| headers | Set request headers, valid above IE10 | object | - |  |
| iconRender | Custom show icon | (file: UploadFile, listType?: UploadListType) => ReactNode | - |  |
| isImageUrl | Customize if render &lt;img /> in thumbnail | (file: UploadFile) => boolean | [(inside implementation)](https://github.com/ant-design/ant-design/blob/4ad5830eecfb87471cd8ac588c5d992862b70770/components/upload/utils.tsx#L47-L68) |  |
| itemRender | Custom item of uploadList | (originNode: ReactElement, file: UploadFile, fileList?: object\[]) => React.ReactNode | - | 4.7.0 |
| listType | Built-in stylesheets, support for three types: `text`, `picture` or `picture-card` | string | `text` |  |
| method | The http method of upload request | string | `post` |  |
| multiple | Whether to support selected multiple file. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | boolean | false |  |
| name | The name of uploading file | string | `file` |  |
| openFileDialogOnClick | Click open file dialog | boolean | true |  |
| previewFile | Customize preview file logic | (file: File \| Blob) => Promise&lt;dataURL: string> | - |  |
| progress | Custom progress bar | [ProgressProps](/components/progress/#API) (support `type="line"` only) | { strokeWidth: 2, showInfo: false } | 4.3.0 |
| showUploadList | Whether to show default upload list, could be an object to specify `showPreviewIcon`, `showRemoveIcon`, `showDownloadIcon`, `removeIcon` and `downloadIcon` individually | boolean \| { showPreviewIcon?: boolean, showDownloadIcon?: boolean, showRemoveIcon?: boolean, removeIcon?: ReactNode \| (file: UploadFile) => ReactNode, downloadIcon?: ReactNode \| (file: UploadFile) => ReactNode } | true | function: 4.7.0 |
| withCredentials | The ajax upload with cookie sent | boolean | false |  |
| onChange | A callback function, can be executed when uploading state is changing, see [onChange](#onChange) | function | - |  |
| onDownload | Click the method to download the file, pass the method to perform the method logic, do not pass the default jump to the new TAB | function(file): void | (Jump to new TAB) |  |
| onPreview | A callback function, will be executed when file link or preview icon is clicked | function(file) | - |  |
| onRemove | A callback function, will be executed when removing file button is clicked, remove event will be prevented when return value is false or a Promise which resolve(false) or reject | function(file): boolean \| Promise | - |  |

### UploadFile

Extends File with additional props.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| name | File name | string | - |
| percent | Upload progress percent | number | - |
| status | Upload status. Show different style when configured | `error` \| `success` \| `done` \| `uploading` \| `removed` | - |
| thumbUrl | Thumb image url | string | - |
| uid | unique id. Will auto generate when not provided | string | - |
| url | Download url | string | - |

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
      status: 'done', // options：uploading, done, error, removed. Intercepted file by beforeUpload don't have status field.
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

### Why `fileList` in control will not trigger `onChange` `status` update when file not in the list?

`onChange` only trigger when file in the list, it will ignore left events when removed from the list. Please note that there exist bug which makes event still trigger even the file is not in the list before `4.13.0`.

### Why sometime `onChange` return File object and sometime return { originFileObj: File }?

For compatible case, we return File object when `beforeUpload` return `false`. It will merge to `{ originFileObj: File }` in next major version. Current version is compatible to get origin file by `info.file.originFileObj`. You can change this before major release.
