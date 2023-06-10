---
category: Components
group: Data Entry
title: Upload
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*93ymR4RD4S0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*l1nlSryXib8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

Upload the file by selecting or dragging.

## When To Use

Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Upload by clicking</code>
<code src="./demo/avatar.tsx">Avatar</code>
<code src="./demo/defaultFileList.tsx">Default Files</code>
<code src="./demo/picture-card.tsx">Pictures Wall</code>
<code src="./demo/picture-circle.tsx">Pictures with picture-circle type</code>
<code src="./demo/fileList.tsx">Complete control over file list</code>
<code src="./demo/drag.tsx">Drag and Drop</code>
<code src="./demo/directory.tsx">Upload directory</code>
<code src="./demo/upload-manually.tsx">Upload manually</code>
<code src="./demo/upload-png-only.tsx">Upload png file only</code>
<code src="./demo/picture-style.tsx">Pictures with list style</code>
<code src="./demo/preview-file.tsx">Customize preview file</code>
<code src="./demo/max-count.tsx">Max Count</code>
<code src="./demo/transform-file.tsx">Transform file before request</code>
<code src="./demo/upload-with-aliyun-oss.tsx">Aliyun OSS</code>
<code src="./demo/file-type.tsx" debug>custom show icon</code>
<code src="./demo/upload-custom-action-icon.tsx">custom action icon</code>
<code src="./demo/drag-sorting.tsx">Drag sorting of uploadList</code>
<code src="./demo/crop-image.tsx">Crop image before uploading</code>
<code src="./demo/customize-progress-bar.tsx">Customize Progress Bar</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| accept | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |  |
| action | Uploading URL | string \| (file) => Promise&lt;string> | - |  |
| beforeUpload | Hook function which will be executed before uploading. Uploading will be stopped with `false` or a rejected Promise returned. When returned value is `Upload.LIST_IGNORE`, the list of files that have been uploaded will ignore it. **Warning：this function is not supported in IE9** | (file, fileList) => boolean \| Promise&lt;File> \| `Upload.LIST_IGNORE` | - |  |
| customRequest | Override for the default xhr behavior allowing for additional customization and the ability to implement your own XMLHttpRequest | function | - |  |
| data | Uploading extra params or function which can return uploading extra params | object \| (file) => object \| Promise&lt;object> | - |  |
| defaultFileList | Default list of files that have been uploaded | object\[] | - |  |
| directory | Support upload whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory)) | boolean | false |  |
| disabled | Disable upload button | boolean | false |  |
| fileList | List of files that have been uploaded (controlled). Here is a common issue [#2423](https://github.com/ant-design/ant-design/issues/2423) when using it | [UploadFile](#uploadfile)\[] | - |  |
| headers | Set request headers, valid above IE10 | object | - |  |
| iconRender | Custom show icon | (file: UploadFile, listType?: UploadListType) => ReactNode | - |  |
| isImageUrl | Customize if render &lt;img /> in thumbnail | (file: UploadFile) => boolean | [(inside implementation)](https://github.com/ant-design/ant-design/blob/4ad5830eecfb87471cd8ac588c5d992862b70770/components/upload/utils.tsx#L47-L68) |  |
| itemRender | Custom item of uploadList | (originNode: ReactElement, file: UploadFile, fileList: object\[], actions: { download: function, preview: function, remove: function }) => React.ReactNode | - | 4.16.0 |
| listType | Built-in stylesheets, support for four types: `text`, `picture`, `picture-card` or `picture-circle` | string | `text` | `picture-circle`(5.2.0+) |
| maxCount | Limit the number of uploaded files. Will replace current one when `maxCount` is `1` | number | - | 4.10.0 |
| method | The http method of upload request | string | `post` |  |
| multiple | Whether to support selected multiple files. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | boolean | false |  |
| name | The name of uploading file | string | `file` |  |
| openFileDialogOnClick | Click open file dialog | boolean | true |  |
| previewFile | Customize preview file logic | (file: File \| Blob) => Promise&lt;dataURL: string> | - |  |
| progress | Custom progress bar | [ProgressProps](/components/progress/#api) (support `type="line"` only) | { strokeWidth: 2, showInfo: false } | 4.3.0 |
| showUploadList | Whether to show default upload list, could be an object to specify `showPreviewIcon`, `showRemoveIcon`, `showDownloadIcon`, `removeIcon` and `downloadIcon` individually | boolean \| { showPreviewIcon?: boolean, showDownloadIcon?: boolean, showRemoveIcon?: boolean, previewIcon?: ReactNode \| (file: UploadFile) => ReactNode, removeIcon?: ReactNode \| (file: UploadFile) => ReactNode, downloadIcon?: ReactNode \| (file: UploadFile) => ReactNode } | true | function: 4.7.0 |
| withCredentials | The ajax upload with cookie sent | boolean | false |  |
| onChange | A callback function, can be executed when uploading state is changing, see [onChange](#onchange) | function | - |  |
| onDrop | A callback function executed when files are dragged and dropped into the upload area | (event: React.DragEvent) => void | - | 4.16.0 |
| onDownload | Click the method to download the file, pass the method to perform the method logic, and do not pass the default jump to the new TAB | function(file): void | (Jump to new TAB) |  |
| onPreview | A callback function, will be executed when the file link or preview icon is clicked | function(file) | - |  |
| onRemove | A callback function, will be executed when removing file button is clicked, remove event will be prevented when the return value is false or a Promise which resolve(false) or reject | function(file): boolean \| Promise | - |  |

### UploadFile

Extends File with additional props.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| crossOrigin | CORS settings attributes | `'anonymous'` \| `'use-credentials'` \| `''` | - | 4.20.0 |
| name | File name | string | - | - |
| percent | Upload progress percent | number | - | - |
| status | Upload status. Show different style when configured | `error` \| `success` \| `done` \| `uploading` \| `removed` | - | - |
| thumbUrl | Thumb image url | string | - | - |
| uid | unique id. Will auto-generate when not provided | string | - | - |
| url | Download url | string | - | - |

### onChange

> The function will be called when uploading is in progress, completed, or failed.

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
      uid: 'uid',      // unique identifier, negative is recommended, to prevent interference with internally generated id
      name: 'xx.png',   // file name
      status: 'done', // options： uploading, done, error, removed. Intercepted file by beforeUpload doesn't have a status field.
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}', // additional HTML props of file link
      xhr: 'XMLHttpRequest{ ... }', // XMLHttpRequest Header
   }
   ```

2. `fileList` current list of files

3. `event` response from the server, including uploading progress, supported by advanced browsers.

## Design Token

<ComponentTokenTable component="Upload"></ComponentTokenTable>

## FAQ

### How do I implement upload server side?

- You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki#server-side) about how to implement server side upload interface.
- There is a mock example of [express](https://github.com/react-component/upload/blob/master/server.js) in rc-upload.

### I want to display download links.

Please set property `url` of each item in `fileList` to control the content of the link.

### How to use `customRequest`?

See <https://github.com/react-component/upload#customrequest>.

### Why will the `fileList` that's in control not trigger `onChange` `status` update when the file is not in the list?

`onChange` will only trigger when the file is in the list, it will ignore any events removed from the list. Please note that there does exist a bug which makes an event still trigger even when the file is not in the list before `4.13.0`.

### Why does `onChange` sometimes return File object and other times return { originFileObj: File }?

For compatible case, we return File object when `beforeUpload` return `false`. It will merge to `{ originFileObj: File }` in the next major version. Current version is compatible to get origin file by `info.file.originFileObj`. You can change this before a major release.

### Why sometimes Chrome can not upload?

Chrome update will also break native upload. Please restart Chrome to finish the upload work. Ref:

- [#32672](https://github.com/ant-design/ant-design/issues/32672)
- [#32913](https://github.com/ant-design/ant-design/issues/32913)
- [#33988](https://github.com/ant-design/ant-design/issues/33988)
