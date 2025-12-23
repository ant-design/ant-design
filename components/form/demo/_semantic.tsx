import React from 'react';
import { Form, Input } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含表单项的底边距、垂直对齐、过渡动画、隐藏状态、错误警告状态等表单项容器的基础样式',
    label:
      '标签元素，包含 flex 布局、溢出隐藏、文本不换行、文本对齐、垂直对齐，以及标签的颜色、字体大小、高度、必填标记等标签显示样式',
    content: '内容元素，包含表单内容区域的布局、样式和控件容器的相关样式',
  },
  en: {
    root: 'Root element with form item margin-bottom, vertical-align, transitions, hidden states, error/warning states and other basic form item container styles',
    label:
      'Label element with flex layout, overflow hidden, whitespace nowrap, text alignment, vertical alignment, plus label color, font size, height, required marks and other label display styles',
    content:
      'Content element with form content area layout, styling and control container related styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Form"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'label', desc: locale.label, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </SemanticPreview>
  );
};

export default App;
