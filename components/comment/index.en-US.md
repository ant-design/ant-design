---
category: Components
type: Data Display
title: Comment
cols: 1
---

A comment displays user feedback and discussion to website content.

## When To Use

Comments can be used to enable discussions on an entity such as a page, blog post, issue or other.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | List of action items rendered below the comment content | Array<ReactNode> | - | 3.11.0 |
| author | The element to display as the comment author | string\|ReactNode | - | 3.11.0 |
| avatar | The element to display as the comment avatar - generally an antd `Avatar` or src | string\|ReactNode | - | 3.11.0 |
| children | Nested comments should be provided as children of the Comment | ReactNode | - | 3.11.0 |
| content | The main content of the comment | string\|ReactNode | - | 3.11.0 |
| datetime | A datetime element containing the time to be displayed | string\|ReactNode | - | 3.11.0 |
