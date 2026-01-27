# Upload Component

**Purpose**: File upload component with drag and drop support.

## When to Use

- File upload functionality
- Image upload
- Drag and drop file upload

## Basic Usage

```typescript
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

<Upload
  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  listType="text"
>
  <Button icon={<UploadOutlined />}>Click to Upload</Button>
</Upload>
```

## Common Props

| Property       | Description           | Type                                        | Default  |
| -------------- | --------------------- | ------------------------------------------- | -------- |
| `action`       | Upload URL            | string                                      | -        |
| `fileList`     | File list             | UploadFile[]                                | -        |
| `onChange`     | Change handler        | (info) => void                              | -        |
| `beforeUpload` | Before upload handler | (file) => boolean \| Promise                | -        |
| `listType`     | List type             | `'text'` \| `'picture'` \| `'picture-card'` | `'text'` |
| `multiple`     | Multiple upload       | boolean                                     | false    |

## Best Practices

1. **Form integration** - Use with Form for form uploads
2. **Validation** - Use beforeUpload for file validation
3. **Progress** - Show upload progress
4. **File types** - Validate file types and sizes
