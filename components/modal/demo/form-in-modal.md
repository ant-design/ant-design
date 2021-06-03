---
order: 14
title:
zh-CN: 在Modal中使用Form表单
en-US: use Form in Modal Component
---

## zh-CN

使用 useToggleModal 处理复杂表单

## en-US

use useToggleModal handle complex form

```jsx
import React, { useEffect, useState } from 'react';
import { Form, Modal, useToggleModal, DatePicker, Button } from 'antd';

const request = (data, timeout = 2000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
const useMounted = fn =>
  useEffect(() => {
    fn();
  }, []);
const list = [
  {
    jobId: 1,
    jobTitle: '111',
  },
  {
    jobId: 2,
    jobTitle: '222',
  },
];
const App = () => {
  const [dataList, setDataList] = useState([]);
  useMounted(() => {
    request(list).then(value => setDataList(value));
  });
  // 传入一个函数（组件），将返回的组件在jsx中渲染一下即可。
  const execModal = useToggleModal(record => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [jobInfo, setJobInfo] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMounted(() => {
      request({
        jobCreator: 'chen',
      }).then(value => setJobInfo(value));
    });
    const onSubmit = formValue => {
      // eslint-disable-next-line no-console
      console.log(formValue);
      // 关闭对话框
      // execModal.hideComponent()
    };
    return (
      <Modal
        {...execModal.modalProps}
        okButtonProps={execModal.okButtonProps}
        title={`任务名-${record.jobTitle}`}
      >
        <Form {...execModal.formProps} onFinish={onSubmit}>
          <Form.Item name="timeRange" label="同步分区" rules={rules.required}>
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <div>创建人: {jobInfo.jobCreator}</div>
        </Form>
      </Modal>
    );
  });
  return (
    <div>
      {dataList.map(value => (
        <Button onClick={() => execModal.showComponent(value)} key={value.jobId}>
          edit
        </Button>
      ))}
      <execModal.Component />
    </div>
  );
};
ReactDOM.render(<App />, mountNode);
```
