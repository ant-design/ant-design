---
category: Components
type: Data Display
title: Comment
cols: 1
---

Single comment component.

## When To Use

Comments can be used to enable discussions on an entity for example page, blog post, issue or other.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| actions | List of action items rendered below the comment content | Array<ReactNode> | - |
| author | The element to display as the comment author | ReactNode | - |
| avatar | The element to display as the comment avatar - generally an antd `Avatar` | ReactNode | - |
| children | Nested comments should be provided as children of the Comment | ReactNode | - |
| className | className of comment | string | - |
| content | The main content of the comment | ReactNode | - |
| contentStyle | Inline style to apply to the comment content | object | - |
| headStyle | Inline style to apply to the comment head | object | - |
| id | Optional ID for the comment | string | - |
| innerStyle | Additional style for the inner content | object | - |
| prefixCls | Comment prefix className defaults to `.ant-comment` | string | .ant-comment |
| style | Additional style for the comment | object | - |
| time | A time element containing the time to be displayed | ReactNode | - |
| tooltipTime | A time element to be displayed as the time tooltip | ReactNode | - |

# Comment.Editor

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| avatar | The element to display as the comment avatar - generally an antd `Avatar` | ReactNode | - |
| className | className of editor | string | - |
| content | The element to display as the editor | ReactNode | - |
| editorStyle | Inline style to apply to the comment editor | object | - |
| headStyle | Inline style to apply to the comment head | object | - |
| innerStyle | Inline style to apply to the comment inner comment editor | object | - |
| prefixCls | prefix className defaults to `.ant-comment` | string | .ant-comment |
| style | Additional style for the editor | object | - |
