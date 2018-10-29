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
| className | Addtional className for comment | string | - |
| content | The main content of the comment | ReactNode | - |
| id | Optional ID for the comment | string | - |
| style | Additional style for the comment | object | - |
| datetime | A datetime element containing the time to be displayed | ReactNode | - |
