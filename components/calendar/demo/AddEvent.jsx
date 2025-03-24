import React, { useState } from 'react';
import { Badge, Calendar, Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const App = () => {
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form] = Form.useForm();

  const getListData = (value) => {
    return events[value.format('YYYY-MM-DD')] || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const handleDateClick = (value) => {
    setSelectedDate(value);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newEvent = { type: values.type, content: values.content };
      setEvents(prev => ({
        ...prev,
        [selectedDate.format('YYYY-MM-DD')]: [...(prev[selectedDate.format('YYYY-MM-DD')] || []), newEvent],
      }));
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  return (
    <>
      <Calendar cellRender={cellRender} onSelect={handleDateClick} />
      <Modal title="Add Event" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="content" label="Event Description" rules={[{ required: true, message: 'Please enter event description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Event Type" rules={[{ required: true, message: 'Please select event type!' }]}>
            <Select>
              <Option value="success">Success</Option>
              <Option value="warning">Warning</Option>
              <Option value="error">Error</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
