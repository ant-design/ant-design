import React from 'react';
import { Form, Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含表单项的底边距、垂直对齐、过渡动画、隐藏状态、错误警告状态等表单项容器的基础样式',
    label:
      '标签元素，包含 flex 布局、溢出隐藏、文本不换行、文本对齐、垂直对齐，以及标签的颜色、字体大小、高度、必填标记等标签显示样式',
    content: '内容元素，包含表单内容区域的布局、样式和控件容器的相关样式',
    help: '帮助信息容器元素，包含帮助文案与校验信息区域的间距、过渡与展示样式',
    helpItem: '帮助信息单项元素，包含错误、警告与提示文案的排版样式',
    extra: '额外提示容器元素，包含补充说明文案的间距、颜色与排版样式',
  },
  en: {
    root: 'Root element with form item margin-bottom, vertical-align, transitions, hidden states, error/warning states and other basic form item container styles',
    label:
      'Label element with flex layout, overflow hidden, whitespace nowrap, text alignment, vertical alignment, plus label color, font size, height, required marks and other label display styles',
    content:
      'Content element with form content area layout, styling and control container related styles',
    help: 'Help container element with spacing, motion, and presentation styles for help and validation areas',
    helpItem: 'Single help message item with typography styles for prompt, error, and warning text',
    extra:
      'Extra prompt container element with spacing, color, and typography styles for supplementary text',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFields([
      {
        name: 'password',
        errors: ['Please input your password!', 'Use at least 8 characters.'],
      },
    ]);
  }, [form]);

  return (
    <SemanticPreview
      componentName="Form"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'label', desc: locale.label, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'help', desc: locale.help, version: '6.4.0' },
        { name: 'helpItem', desc: locale.helpItem, version: '6.4.0' },
        { name: 'extra', desc: locale.extra, version: '6.4.0' },
      ]}
    >
      <Form
        form={form}
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
          help="Use 4 to 16 characters."
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          extra="Password must contain letters and numbers."
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Use at least 8 characters.' },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </SemanticPreview>
  );
};

export default App;
