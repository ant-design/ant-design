---
order: 5
title:
  zh-CN: Custom close icon
  en-US: Custom close icon
---

## zh-CN

Usage of Tag with custom close icon

## en-US

Usage of Tag with custom close icon

````jsx
import { Tag, Popconfirm, Icon } from 'antd';

function log(e) {
  console.log(e);
}

ReactDOM.render(
  <div>
    <Tag
      closable
      onClose={log}
      customCloseIcon={onClose => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={onClose}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="cross" />
        </Popconfirm>
      )}
    >
      custom close 1
    </Tag>
    <Tag
      closable
      onClose={log}
      customCloseIcon={onClose => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={onClose}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="cross" />
        </Popconfirm>
      )}
    >
      custom close 2
    </Tag>
    <Tag
      closable
      onClose={log}
      customCloseIcon={onClose => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={onClose}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="cross" />
        </Popconfirm>
      )}
    >
      custom close 3
    </Tag>
  </div>,
  mountNode
);
````
