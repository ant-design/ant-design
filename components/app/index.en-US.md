---
category: Components
group: container components
title: App
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

New App Component which provide global style & static function replacement.

## When To Use

Static function in React 18 concurrent mode will not well support. In v5, we recommend to use hooks for the static replacement. But it will make user manual work on define this.

## Examples

<!-- prettier-ignore -->
<code src="./demo/message.tsx">message</code>
<code src="./demo/Modal.tsx">modal</code>
<code src="./demo/notification.tsx">notification</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| useApp | Static method for obtaining message, modal, and notification | ()=>{message,notification,Modal} | - |  |
