"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[5874],{33355:function(d,u,l){l.r(u);var c=l(2143),p=l(50250),v=l(59378),Z=l(78190),o=l(74775),a=l(5937),h=l(2068),f=l(74399),F=l(46004),g=l(35708),I=l(30138),b=l(56140),r=l(5388),x=l(49545),y=l(92169),C=l(13140),k=l(95127),_=l(74418),B=l(97119),t=l(28257),m=l(67294),n=l(13946);function i(){var s=(0,t.eL)(),e=s.texts;return(0,n.tZ)(t.dY,null,(0,n.tZ)(m.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[1].value),(0,n.tZ)("li",null,e[2].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(r.Z,{items:[{demo:{id:"components-form-demo-basic"},previewerProps:{title:"\u57FA\u672C\u4F7F\u7528",filename:"components/form/demo/basic.tsx",jsx:`import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u57FA\u672C\u7684\u8868\u5355\u6570\u636E\u57DF\u63A7\u5236\u5C55\u793A\uFF0C\u5305\u542B\u5E03\u5C40\u3001\u521D\u59CB\u5316\u3001\u9A8C\u8BC1\u3001\u63D0\u4EA4\u3002</p>"}},{demo:{id:"components-form-demo-control-hooks"},previewerProps:{title:"\u8868\u5355\u65B9\u6CD5\u8C03\u7528",filename:"components/form/demo/control-hooks.tsx",jsx:`import React from 'react';
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const App = () => {
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;
      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;
      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:`<p>\u901A\u8FC7 <code>Form.useForm</code> \u5BF9\u8868\u5355\u6570\u636E\u57DF\u8FDB\u884C\u4EA4\u4E92\u3002</p>
<blockquote>
<p>\u6CE8\u610F <code>useForm</code> \u662F <a href="https://reactjs.org/docs/hooks-intro.html">React Hooks</a> \u7684\u5B9E\u73B0\uFF0C\u53EA\u80FD\u7528\u4E8E\u51FD\u6570\u7EC4\u4EF6\uFF0Cclass \u7EC4\u4EF6\u8BF7\u67E5\u770B\u4E0B\u9762\u7684\u4F8B\u5B50\u3002</p>
</blockquote>`,style:`#components-form-demo-control-hooks .ant-btn {
  margin-right: 8px;
}`}},{demo:{id:"components-form-demo-control-ref"},previewerProps:{title:"\u8868\u5355\u65B9\u6CD5\u8C03\u7528\uFF08Class component\uFF09",filename:"components/form/demo/control-ref.tsx",jsx:`import React from 'react';
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class App extends React.Component {
  formRef = React.createRef();
  onGenderChange = (value) => {
    switch (value) {
      case 'male':
        this.formRef.current.setFieldsValue({
          note: 'Hi, man!',
        });
        return;
      case 'female':
        this.formRef.current.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;
      case 'other':
        this.formRef.current.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
    }
  };
  onFinish = (values) => {
    console.log(values);
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item
          name="note"
          label="Note"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default App;
`,description:"<p>\u6211\u4EEC\u63A8\u8350\u4F7F\u7528 <code>Form.useForm</code> \u521B\u5EFA\u8868\u5355\u6570\u636E\u57DF\u8FDB\u884C\u63A7\u5236\u3002\u5982\u679C\u662F\u5728 class component \u4E0B\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u901A\u8FC7 <code>ref</code> \u83B7\u53D6\u6570\u636E\u57DF\u3002</p>",style:`#components-form-demo-control-ref .ant-btn {
  margin-right: 8px;
}`}},{demo:{id:"components-form-demo-layout"},previewerProps:{title:"\u8868\u5355\u5E03\u5C40",filename:"components/form/demo/layout.tsx",jsx:`import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
const App = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="Form Layout" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u8868\u5355\u6709\u4E09\u79CD\u5E03\u5C40\u3002</p>"}},{demo:{id:"components-form-demo-disabled"},previewerProps:{title:"\u8868\u5355\u7981\u7528",filename:"components/form/demo/disabled.tsx",jsx:`import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <FormDisabledDemo />;
`,description:"<p>\u8BBE\u7F6E\u8868\u5355\u7EC4\u4EF6\u7981\u7528\uFF0C\u4EC5\u5BF9 antd \u7EC4\u4EF6\u6709\u6548\u3002</p>"}},{demo:{id:"components-form-demo-required-mark"},previewerProps:{title:"\u5FC5\u9009\u6837\u5F0F",filename:"components/form/demo/required-mark.tsx",jsx:`import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
const App = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Required Mark" name="requiredMarkValue">
        <Radio.Group>
          <Radio.Button value="optional">Optional</Radio.Button>
          <Radio.Button value>Required</Radio.Button>
          <Radio.Button value={false}>Hidden</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Field A" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Field B"
        tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u901A\u8FC7 <code>requiredMark</code> \u5207\u6362\u5FC5\u9009\u4E0E\u53EF\u9009\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-form-demo-size"},previewerProps:{title:"\u8868\u5355\u5C3A\u5BF8",filename:"components/form/demo/size.tsx",jsx:`import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
const App = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Input">
        <Input />
      </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="TreeSelect">
        <TreeSelect
          treeData={[
            {
              title: 'Light',
              value: 'light',
              children: [
                {
                  title: 'Bamboo',
                  value: 'bamboo',
                },
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                },
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u8BBE\u7F6E\u8868\u5355\u7EC4\u4EF6\u5C3A\u5BF8\uFF0C\u4EC5\u5BF9 antd \u7EC4\u4EF6\u6709\u6548\u3002</p>"}},{demo:{id:"components-form-demo-layout-can-wrap"},previewerProps:{title:"\u8868\u5355\u6807\u7B7E\u53EF\u6362\u884C",filename:"components/form/demo/layout-can-wrap.tsx",jsx:`import React from 'react';
import { Button, Form, Input } from 'antd';
const App = () => (
  <Form
    name="wrap"
    labelCol={{
      flex: '110px',
    }}
    labelAlign="left"
    labelWrap
    wrapperCol={{
      flex: 1,
    }}
    colon={false}
  >
    <Form.Item
      label="\u6B63\u5E38\u6807\u7B7E\u6587\u6848"
      name="username"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="\u8D85\u957F\u6807\u7B7E\u6587\u6848\u8D85\u957F\u6807\u7B7E\u6587\u6848"
      name="password"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>labelWrap</code> \u53EF\u4EE5\u5F00\u542F <code>label</code> \u6362\u884C\u3002</p>"}},{demo:{id:"components-form-demo-warning-only"},previewerProps:{title:"\u975E\u963B\u585E\u6821\u9A8C",filename:"components/form/demo/warning-only.tsx",jsx:`import React from 'react';
import { Button, Form, Input, message, Space } from 'antd';
const App = () => {
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Submit success!');
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  const onFill = () => {
    form.setFieldsValue({
      url: 'https://taobao.com/',
    });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="url"
        label="URL"
        rules={[
          {
            required: true,
          },
          {
            type: 'url',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 6,
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onFill}>
            Fill
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p><code>rule</code> \u6DFB\u52A0 <code>warningOnly</code> \u540E\u6821\u9A8C\u4E0D\u518D\u963B\u585E\u8868\u5355\u63D0\u4EA4\u3002</p>"}},{demo:{id:"components-form-demo-usewatch"},previewerProps:{title:"\u5B57\u6BB5\u76D1\u542C Hooks",filename:"components/form/demo/useWatch.tsx",jsx:`import React from 'react';
import { Form, Input, InputNumber, Typography } from 'antd';
const Demo = () => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch('name', form);
  return (
    <>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="name" label="Name (Watch to trigger rerender)">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age (Not Watch)">
          <InputNumber />
        </Form.Item>
      </Form>

      <Typography>
        <pre>Name Value: {nameValue}</pre>
      </Typography>
    </>
  );
};
export default Demo;
`,description:'<p><code>useWatch</code> \u5141\u8BB8\u4F60\u76D1\u542C\u5B57\u6BB5\u53D8\u5316\uFF0C\u540C\u65F6\u4EC5\u5F53\u8BE5\u5B57\u6BB5\u53D8\u5316\u65F6\u91CD\u65B0\u6E32\u67D3\u3002API \u6587\u6863\u8BF7<a href="#Form.useWatch">\u67E5\u9605\u6B64\u5904</a>\u3002</p>'}},{demo:{id:"components-form-demo-dynamic-form-item"},previewerProps:{title:"\u52A8\u6001\u589E\u51CF\u8868\u5355\u9879",filename:"components/form/demo/dynamic-form-item.tsx",jsx:`import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="passenger name"
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{
                  width: '60%',
                  marginTop: '20px',
                }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u52A8\u6001\u589E\u52A0\u3001\u51CF\u5C11\u8868\u5355\u9879\u3002<code>add</code> \u65B9\u6CD5\u53C2\u6570\u53EF\u7528\u4E8E\u8BBE\u7F6E\u521D\u59CB\u503C\u3002</p>",style:`.dynamic-delete-button {
  position: relative;
  top: 4px;
  margin: 0 8px;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}`}},{demo:{id:"components-form-demo-dynamic-form-items"},previewerProps:{title:"\u52A8\u6001\u589E\u51CF\u5D4C\u5957\u5B57\u6BB5",filename:"components/form/demo/dynamic-form-items.tsx",jsx:`import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing last name',
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u5D4C\u5957\u8868\u5355\u5B57\u6BB5\u9700\u8981\u5BF9 <code>field</code> \u8FDB\u884C\u62D3\u5C55\uFF0C\u5C06 <code>field.name</code> \u5E94\u7528\u4E8E\u63A7\u5236\u5B57\u6BB5\u3002</p>"}},{demo:{id:"components-form-demo-dynamic-form-items-no-style"},previewerProps:{debug:!0,title:"\u52A8\u6001\u589E\u51CF\u5D4C\u5957\u7EAF\u5B57\u6BB5",filename:"components/form/demo/dynamic-form-items-no-style.tsx",jsx:`import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <Form name="dynamic_form_no_style" onFinish={onFinish} autoComplete="off">
      <Form.Item label="Users">
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Form.Item
                    noStyle
                    name={[field.name, 'lastName']}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    name={[field.name, 'firstName']}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u5D4C\u5957 <code>noStyle</code> \u5B57\u6BB5\u7684\u52A8\u6001\u8868\u5355\u793A\u4F8B\u3002</p>"}},{demo:{id:"components-form-demo-dynamic-form-items-complex"},previewerProps:{title:"\u590D\u6742\u7684\u52A8\u6001\u589E\u51CF\u8868\u5355\u9879",filename:"components/form/demo/dynamic-form-items-complex.tsx",jsx:`import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
const { Option } = Select;
const areas = [
  {
    label: 'Beijing',
    value: 'Beijing',
  },
  {
    label: 'Shanghai',
    value: 'Shanghai',
  },
];
const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};
const App = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  return (
    <Form form={form} name="dynamic_form_complex" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="area"
        label="Area"
        rules={[
          {
            required: true,
            message: 'Missing area',
          },
        ]}
      >
        <Select options={areas} onChange={handleChange} />
      </Form.Item>
      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Sight"
                      name={[field.name, 'sight']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing sight',
                        },
                      ]}
                    >
                      <Select
                        disabled={!form.getFieldValue('area')}
                        style={{
                          width: 130,
                        }}
                      >
                        {(sights[form.getFieldValue('area')] || []).map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Price"
                  name={[field.name, 'price']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing price',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u8FD9\u4E2A\u4F8B\u5B50\u6F14\u793A\u4E86\u4E00\u4E2A\u8868\u5355\u4E2D\u5305\u542B\u591A\u4E2A\u8868\u5355\u63A7\u4EF6\u7684\u60C5\u51B5\u3002</p>"}},{demo:{id:"components-form-demo-nest-messages"},previewerProps:{title:"\u5D4C\u5957\u7ED3\u6784\u4E0E\u6821\u9A8C\u4FE1\u606F",filename:"components/form/demo/nest-messages.tsx",jsx:`import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '\${label} is required!',
  types: {
    email: '\${label} is not a valid email!',
    number: '\${label} is not a valid number!',
  },
  number: {
    range: '\${label} must be between \${min} and \${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const App = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:'<p><code>name</code> \u5C5E\u6027\u652F\u6301\u5D4C\u5957\u6570\u636E\u7ED3\u6784\u3002\u901A\u8FC7 <code>validateMessages</code> \u6216 <code>message</code> \u81EA\u5B9A\u4E49\u6821\u9A8C\u4FE1\u606F\u6A21\u677F\uFF0C\u6A21\u677F\u5185\u5BB9\u53EF\u53C2\u8003<a href="https://github.com/react-component/field-form/blob/master/src/utils/messages.ts">\u6B64\u5904</a>\u3002</p>'}},{demo:{id:"components-form-demo-complex-form-control"},previewerProps:{title:"\u590D\u6742\u4E00\u70B9\u7684\u63A7\u4EF6",filename:"components/form/demo/complex-form-control.tsx",jsx:`import React from 'react';
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
const { Option } = Select;
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item label="Username">
        <Space>
          <Form.Item
            name="username"
            noStyle
            rules={[
              {
                required: true,
                message: 'Username is required',
              },
            ]}
          >
            <Input
              style={{
                width: 160,
              }}
              placeholder="Please input"
            />
          </Form.Item>
          <Tooltip title="Useful information">
            <Typography.Link href="#API">Need Help?</Typography.Link>
          </Tooltip>
        </Space>
      </Form.Item>
      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[
              {
                required: true,
                message: 'Province is required',
              },
            ]}
          >
            <Select placeholder="Select province">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[
              {
                required: true,
                message: 'Street is required',
              },
            ]}
          >
            <Input
              style={{
                width: '50%',
              }}
              placeholder="Input street"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        label="BirthDate"
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="year"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
          }}
        >
          <Input placeholder="Input birth year" />
        </Form.Item>
        <Form.Item
          name="month"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
          }}
        >
          <Input placeholder="Input birth month" />
        </Form.Item>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:'<p>\u8FD9\u91CC\u6F14\u793A <code>Form.Item</code> \u5185\u6709\u591A\u4E2A\u5143\u7D20\u7684\u4F7F\u7528\u65B9\u5F0F\u3002<code>&#x3C;Form.Item name="field" /></code> \u53EA\u4F1A\u5BF9\u5B83\u7684\u76F4\u63A5\u5B50\u5143\u7D20\u7ED1\u5B9A\u8868\u5355\u529F\u80FD\uFF0C\u4F8B\u5982\u76F4\u63A5\u5305\u88F9\u4E86 Input/Select\u3002\u5982\u679C\u63A7\u4EF6\u524D\u540E\u8FD8\u6709\u4E00\u4E9B\u6587\u6848\u6216\u6837\u5F0F\u88C5\u70B9\uFF0C\u6216\u8005\u4E00\u4E2A\u8868\u5355\u9879\u5185\u6709\u591A\u4E2A\u63A7\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u5185\u5D4C\u7684 <code>Form.Item</code> \u5B8C\u6210\u3002\u4F60\u53EF\u4EE5\u7ED9 <code>Form.Item</code> \u81EA\u5B9A\u4E49 <code>style</code> \u8FDB\u884C\u5185\u8054\u5E03\u5C40\uFF0C\u6216\u8005\u6DFB\u52A0 <code>noStyle</code> \u4F5C\u4E3A\u7EAF\u7CB9\u7684\u65E0\u6837\u5F0F\u7ED1\u5B9A\u7EC4\u4EF6\uFF08\u7C7B\u4F3C 3.x \u4E2D\u7684 <code>getFieldDecorator</code>\uFF09\u3002</p>'}},{demo:{id:"components-form-demo-customized-form-controls"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u8868\u5355\u63A7\u4EF6",filename:"components/form/demo/customized-form-controls.tsx",jsx:`import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;
const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('rmb');
  const triggerChange = (changedValue) => {
    onChange?.({
      number,
      currency,
      ...value,
      ...changedValue,
    });
  };
  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({
      number: newNumber,
    });
  };
  const onCurrencyChange = (newCurrency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({
      currency: newCurrency,
    });
  };
  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};
const App = () => {
  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };
  const checkPrice = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            validator: checkPrice,
          },
        ]}
      >
        <PriceInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:`<p>\u81EA\u5B9A\u4E49\u6216\u7B2C\u4E09\u65B9\u7684\u8868\u5355\u63A7\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u4E0E Form \u7EC4\u4EF6\u4E00\u8D77\u4F7F\u7528\u3002\u53EA\u8981\u8BE5\u7EC4\u4EF6\u9075\u5FAA\u4EE5\u4E0B\u7684\u7EA6\u5B9A\uFF1A</p>
<blockquote>
<ul>
<li>\u63D0\u4F9B\u53D7\u63A7\u5C5E\u6027 <code>value</code> \u6216\u5176\u5B83\u4E0E <a href="https://ant.design/components/form-cn/#Form.Item"><code>valuePropName</code></a> \u7684\u503C\u540C\u540D\u7684\u5C5E\u6027\u3002</li>
<li>\u63D0\u4F9B <code>onChange</code> \u4E8B\u4EF6\u6216 <a href="https://ant.design/components/form-cn/#Form.Item"><code>trigger</code></a> \u7684\u503C\u540C\u540D\u7684\u4E8B\u4EF6\u3002</li>
</ul>
</blockquote>`}},{demo:{id:"components-form-demo-global-state"},previewerProps:{title:"\u8868\u5355\u6570\u636E\u5B58\u50A8\u4E8E\u4E0A\u5C42\u7EC4\u4EF6",filename:"components/form/demo/global-state.tsx",jsx:`import React, { useState } from 'react';
import { Form, Input } from 'antd';
const CustomizedForm = ({ onChange, fields }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="username"
      label="Username"
      rules={[
        {
          required: true,
          message: 'Username is required!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
);
const App = () => {
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'Ant Design',
    },
  ]);
  return (
    <>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
    </>
  );
};
export default App;
`,description:`<p>\u901A\u8FC7 <code>onFieldsChange</code> \u548C <code>fields</code>\uFF0C\u53EF\u4EE5\u628A\u8868\u5355\u7684\u6570\u636E\u5B58\u50A8\u5230\u4E0A\u5C42\u7EC4\u4EF6\u6216\u8005 <a href="https://github.com/reactjs/redux">Redux</a>\u3001<a href="https://github.com/dvajs/dva">dva</a> \u4E2D\uFF0C\u66F4\u591A\u53EF\u53C2\u8003 <a href="https://rc-field-form.react-component.now.sh/?selectedKind=rc-field-form&#x26;selectedStory=StateForm-redux&#x26;full=0&#x26;addons=1&#x26;stories=1&#x26;panelRight=0&#x26;addonPanel=storybook%2Factions%2Factions-panel">rc-field-form \u793A\u4F8B</a>\u3002</p>
<p><strong>\u6CE8\u610F\uFF1A</strong> \u5C06\u8868\u5355\u6570\u636E\u5B58\u50A8\u4E8E\u5916\u90E8\u5BB9\u5668<a href="https://github.com/reduxjs/redux/issues/1287#issuecomment-175351978">\u5E76\u975E\u597D\u7684\u5B9E\u8DF5</a>\uFF0C\u5982\u65E0\u5FC5\u8981\u8BF7\u907F\u514D\u4F7F\u7528\u3002</p>`,style:`#components-form-demo-global-state .language-bash {
  max-width: 400px;
  border-radius: 6px;
  margin-top: 24px;
}`}},{demo:{id:"components-form-demo-form-context"},previewerProps:{title:"\u591A\u8868\u5355\u8054\u52A8",filename:"components/form/demo/form-context.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, InputNumber, Modal, Typography } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
const ModalForm = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });
  const onOk = () => {
    form.submit();
  };
  return (
    <Modal title="Basic Drawer" open={open} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="name"
          label="User Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="User Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const App = () => {
  const [open, setOpen] = useState(false);
  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        if (name === 'userForm') {
          const { basicForm } = forms;
          const users = basicForm.getFieldValue('users') || [];
          basicForm.setFieldsValue({
            users: [...users, values],
          });
          setOpen(false);
        }
      }}
    >
      <Form {...layout} name="basicForm" onFinish={onFinish}>
        <Form.Item
          name="group"
          label="Group Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="User List"
          shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
        >
          {({ getFieldValue }) => {
            const users = getFieldValue('users') || [];
            return users.length ? (
              <ul>
                {users.map((user) => (
                  <li key={user.name} className="user">
                    <Avatar icon={<UserOutlined />} />
                    {user.name} - {user.age}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography.Text className="ant-form-text" type="secondary">
                ( <SmileOutlined /> No user yet. )
              </Typography.Text>
            );
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button
            htmlType="button"
            style={{
              margin: '0 8px',
            }}
            onClick={showUserModal}
          >
            Add User
          </Button>
        </Form.Item>
      </Form>

      <ModalForm open={open} onCancel={hideUserModal} />
    </Form.Provider>
  );
};
export default App;
`,description:'<p>\u901A\u8FC7 <code>Form.Provider</code> \u5728\u8868\u5355\u95F4\u5904\u7406\u6570\u636E\u3002\u672C\u4F8B\u5B50\u4E2D\uFF0CModal \u7684\u786E\u8BA4\u6309\u94AE\u5728 Form \u4E4B\u5916\uFF0C\u901A\u8FC7 <code>form.submit</code> \u65B9\u6CD5\u8C03\u7528\u8868\u5355\u63D0\u4EA4\u529F\u80FD\u3002\u53CD\u4E4B\uFF0C\u5219\u63A8\u8350\u4F7F\u7528 <code>&#x3C;Button htmlType="submit" /></code> \u8C03\u7528 web \u539F\u751F\u63D0\u4EA4\u903B\u8F91\u3002</p>',style:`#components-form-demo-form-context .user {
  margin-bottom: 8px;
}

#components-form-demo-form-context .user .ant-avatar {
  margin-right: 8px;
}

.ant-row-rtl #components-form-demo-form-context .user .ant-avatar {
  margin-right: 0;
  margin-left: 8px;
}`}},{demo:{id:"components-form-demo-inline-login"},previewerProps:{title:"\u5185\u8054\u767B\u5F55\u680F",filename:"components/form/demo/inline-login.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
const App = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u5185\u8054\u767B\u5F55\u680F\uFF0C\u5E38\u7528\u5728\u9876\u90E8\u5BFC\u822A\u680F\u4E2D\u3002</p>"}},{demo:{id:"components-form-demo-normal-login"},previewerProps:{title:"\u767B\u5F55\u6846",filename:"components/form/demo/normal-login.tsx",jsx:`import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:`<p>\u666E\u901A\u7684\u767B\u5F55\u6846\uFF0C\u53EF\u4EE5\u5BB9\u7EB3\u66F4\u591A\u7684\u5143\u7D20\u3002</p>
<blockquote>
<p>\u{1F6CE}\uFE0F \u60F3\u8981 3 \u5206\u949F\u5B9E\u73B0\uFF1F\u8BD5\u8BD5 <a href="https://procomponents.ant.design/components/form/#%E7%99%BB%E5%BD%95">ProForm</a>\uFF01</p>
</blockquote>`,style:`#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
  float: left;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}`}},{demo:{id:"components-form-demo-register"},previewerProps:{title:"\u6CE8\u518C\u65B0\u7528\u6237",filename:"components/form/demo/register.tsx",jsx:`import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const App = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">\xA5</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => \`\${value}\${domain}\`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'Please select your habitual residence!',
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="donation"
        label="Donation"
        rules={[
          {
            required: true,
            message: 'Please input donation amount!',
          },
        ]}
      >
        <InputNumber
          addonAfter={suffixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: 'Please input website!',
          },
        ]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[
          {
            required: true,
            message: 'Please input Intro',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u7528\u6237\u586B\u5199\u5FC5\u987B\u7684\u4FE1\u606F\u4EE5\u6CE8\u518C\u65B0\u7528\u6237\u3002</p>"}},{demo:{id:"components-form-demo-advanced-search"},previewerProps:{title:"\u9AD8\u7EA7\u641C\u7D22",filename:"components/form/demo/advanced-search.tsx",jsx:`import React, { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
const { Option } = Select;
const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={\`field-\${i}\`}
            label={\`Field \${i}\`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            {i % 3 !== 1 ? (
              <Input placeholder="placeholder" />
            ) : (
              <Select defaultValue="2">
                <Option value="1">1</Option>
                <Option value="2">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
              </Select>
            )}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{
              fontSize: 12,
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a>
        </Col>
      </Row>
    </Form>
  );
};
const App = () => (
  <div>
    <AdvancedSearchForm />
    <div className="search-result-list">Search Result List</div>
  </div>
);
export default App;
`,description:`<p>\u4E09\u5217\u6805\u683C\u5F0F\u7684\u8868\u5355\u6392\u5217\u65B9\u5F0F\uFF0C\u5E38\u7528\u4E8E\u6570\u636E\u8868\u683C\u7684\u9AD8\u7EA7\u641C\u7D22\u3002</p>
<p>\u6709\u90E8\u5206\u5B9A\u5236\u7684\u6837\u5F0F\u4EE3\u7801\uFF0C\u7531\u4E8E\u8F93\u5165\u6807\u7B7E\u957F\u5EA6\u4E0D\u786E\u5B9A\uFF0C\u9700\u8981\u6839\u636E\u5177\u4F53\u60C5\u51B5\u81EA\u884C\u8C03\u6574\u3002</p>
<blockquote>
<p>\u{1F6CE}\uFE0F \u60F3\u8981 3 \u5206\u949F\u5B9E\u73B0\uFF1F \u8BD5\u8BD5 ProForm \u7684<a href="https://procomponents.ant.design/components/form#%E6%9F%A5%E8%AF%A2%E7%AD%9B%E9%80%89">\u67E5\u8BE2\u8868\u5355</a>\uFF01</p>
</blockquote>`,style:`[data-theme='compact'] .ant-advanced-search-form,
.ant-advanced-search-form {
  padding: 24px !important;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}

[data-theme='compact'] .ant-advanced-search-form .ant-form-item,
.ant-advanced-search-form .ant-form-item {
  display: flex;
}

[data-theme='compact'] .ant-advanced-search-form .ant-form-item-control-wrapper,
.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}`}},{demo:{id:"components-form-demo-form-in-modal"},previewerProps:{title:"\u5F39\u51FA\u5C42\u4E2D\u7684\u65B0\u5EFA\u8868\u5355",filename:"components/form/demo/form-in-modal.tsx",jsx:`import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const App = () => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default App;
`,description:`<p>\u5F53\u7528\u6237\u8BBF\u95EE\u4E00\u4E2A\u5C55\u793A\u4E86\u67D0\u4E2A\u5217\u8868\u7684\u9875\u9762\uFF0C\u60F3\u65B0\u5EFA\u4E00\u9879\u4F46\u53C8\u4E0D\u60F3\u8DF3\u8F6C\u9875\u9762\u65F6\uFF0C\u53EF\u4EE5\u7528 Modal \u5F39\u51FA\u4E00\u4E2A\u8868\u5355\uFF0C\u7528\u6237\u586B\u5199\u5FC5\u8981\u4FE1\u606F\u540E\u521B\u5EFA\u65B0\u7684\u9879\u3002</p>
<blockquote>
<p>\u{1F6CE}\uFE0F \u60F3\u8981 3 \u5206\u949F\u5B9E\u73B0\uFF1F\u8BD5\u8BD5 ProForm \u7684 <a href="https://procomponents.ant.design/components/form#modal-%E8%A1%A8%E5%8D%95">Modal \u8868\u5355</a>\uFF01</p>
</blockquote>`,style:`.collection-create-form_last-form-item {
  margin-bottom: 0;
}`}},{demo:{id:"components-form-demo-time-related-controls"},previewerProps:{title:"\u65F6\u95F4\u7C7B\u63A7\u4EF6",filename:"components/form/demo/time-related-controls.tsx",jsx:`import React from 'react';
import { Button, DatePicker, Form, TimePicker } from 'antd';
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const App = () => {
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };
  return (
    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      <Form.Item name="date-picker" label="DatePicker" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item name="month-picker" label="MonthPicker" {...config}>
        <DatePicker picker="month" />
      </Form.Item>
      <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
        <RangePicker />
      </Form.Item>
      <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item name="time-picker" label="TimePicker" {...config}>
        <TimePicker />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684 <code>value</code> \u7C7B\u578B\u4E3A <code>dayjs</code> \u5BF9\u8C61\uFF0C\u6240\u4EE5\u5728\u63D0\u4EA4\u670D\u52A1\u5668\u524D\u9700\u8981\u9884\u5904\u7406\u3002</p>"}},{demo:{id:"components-form-demo-without-form-create"},previewerProps:{title:"\u81EA\u884C\u5904\u7406\u8868\u5355\u6570\u636E",filename:"components/form/demo/without-form-create.tsx",jsx:`import React, { useState } from 'react';
import { Form, InputNumber } from 'antd';
const validatePrimeNumber = (number) => {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'The prime between 8 and 12 is 11!',
  };
};
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};
const App = () => {
  const [number, setNumber] = useState({
    value: 11,
  });
  const tips =
    'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';
  const onNumberChange = (value) => {
    setNumber({
      ...validatePrimeNumber(value),
      value,
    });
  };
  return (
    <Form>
      <Form.Item
        {...formItemLayout}
        label="Prime between 8 & 12"
        validateStatus={number.validateStatus}
        help={number.errorMsg || tips}
      >
        <InputNumber min={8} max={12} value={number.value} onChange={onNumberChange} />
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p><code>Form</code> \u5177\u6709\u81EA\u52A8\u6536\u96C6\u6570\u636E\u5E76\u6821\u9A8C\u7684\u529F\u80FD\uFF0C\u4F46\u5982\u679C\u60A8\u4E0D\u9700\u8981\u8FD9\u4E2A\u529F\u80FD\uFF0C\u6216\u8005\u9ED8\u8BA4\u7684\u884C\u4E3A\u65E0\u6CD5\u6EE1\u8DB3\u4E1A\u52A1\u9700\u6C42\uFF0C\u53EF\u4EE5\u9009\u62E9\u81EA\u884C\u5904\u7406\u6570\u636E\u3002</p>"}},{demo:{id:"components-form-demo-validate-static"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u6821\u9A8C",filename:"components/form/demo/validate-static.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const App = () => (
  <Form {...formItemLayout}>
    <Form.Item
      label="Fail"
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
    </Form.Item>

    <Form.Item label="Warning" validateStatus="warning">
      <Input placeholder="Warning" id="warning" prefix={<SmileOutlined />} />
    </Form.Item>

    <Form.Item
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input placeholder="I'm the content is being validated" id="validating" />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <Input placeholder="I'm the content" id="success" />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <Input placeholder="Warning" id="warning2" />
    </Form.Item>

    <Form.Item
      label="Fail"
      hasFeedback
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error2" />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <DatePicker
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <TimePicker
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item label="Error" hasFeedback validateStatus="error">
      <DatePicker.RangePicker
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item label="Error" hasFeedback validateStatus="error">
      <Select placeholder="I'm Select" allowClear>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Validating"
      hasFeedback
      validateStatus="error"
      help="Something breaks the rule."
    >
      <Cascader
        placeholder="I'm Cascader"
        options={[
          {
            value: 'xx',
            label: 'xx',
          },
        ]}
        allowClear
      />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning" help="Need to be checked">
      <TreeSelect
        placeholder="I'm TreeSelect"
        treeData={[
          {
            value: 'xx',
            label: 'xx',
          },
        ]}
        allowClear
      />
    </Form.Item>

    <Form.Item
      label="inline"
      style={{
        marginBottom: 0,
      }}
    >
      <Form.Item
        validateStatus="error"
        help="Please select right date"
        style={{
          display: 'inline-block',
          width: 'calc(50% - 12px)',
        }}
      >
        <DatePicker />
      </Form.Item>
      <span
        style={{
          display: 'inline-block',
          width: '24px',
          lineHeight: '32px',
          textAlign: 'center',
        }}
      >
        -
      </span>
      <Form.Item
        style={{
          display: 'inline-block',
          width: 'calc(50% - 12px)',
        }}
      >
        <DatePicker />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <InputNumber
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <Input allowClear placeholder="with allowClear" />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <Input.Password placeholder="with input password" />
    </Form.Item>

    <Form.Item label="Error" hasFeedback validateStatus="error">
      <Input.Password allowClear placeholder="with input password and allowClear" />
    </Form.Item>

    <Form.Item label="Fail" validateStatus="error" hasFeedback>
      <Mentions />
    </Form.Item>

    <Form.Item label="Fail" validateStatus="error" hasFeedback help="Should have something">
      <Input.TextArea allowClear showCount />
    </Form.Item>
  </Form>
);
export default App;
`,description:`<p>\u6211\u4EEC\u63D0\u4F9B\u4E86 <code>validateStatus</code> <code>help</code> <code>hasFeedback</code> \u7B49\u5C5E\u6027\uFF0C\u4F60\u53EF\u4EE5\u4E0D\u901A\u8FC7 Form \u81EA\u5DF1\u5B9A\u4E49\u6821\u9A8C\u7684\u65F6\u673A\u548C\u5185\u5BB9\u3002</p>
<ol>
<li><code>validateStatus</code>: \u6821\u9A8C\u72B6\u6001\uFF0C\u53EF\u9009 'success', 'warning', 'error', 'validating'\u3002</li>
<li><code>hasFeedback</code>\uFF1A\u7528\u4E8E\u7ED9\u8F93\u5165\u6846\u6DFB\u52A0\u53CD\u9988\u56FE\u6807\u3002</li>
<li><code>help</code>\uFF1A\u8BBE\u7F6E\u6821\u9A8C\u6587\u6848\u3002</li>
</ol>`}},{demo:{id:"components-form-demo-dynamic-rule"},previewerProps:{title:"\u52A8\u6001\u6821\u9A8C\u89C4\u5219",filename:"components/form/demo/dynamic-rule.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};
const App = () => {
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick, form]);
  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return (
    <Form form={form} name="dynamic_rule">
      <Form.Item
        {...formItemLayout}
        name="username"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="nickname"
        label="Nickname"
        rules={[
          {
            required: checkNick,
            message: 'Please input your nickname',
          },
        ]}
      >
        <Input placeholder="Please input your nickname" />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Checkbox checked={checkNick} onChange={onCheckboxChange}>
          Nickname is required
        </Checkbox>
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={onCheck}>
          Check
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u6839\u636E\u4E0D\u540C\u60C5\u51B5\u6267\u884C\u4E0D\u540C\u7684\u6821\u9A8C\u89C4\u5219\u3002</p>"}},{demo:{id:"components-form-demo-validate-other"},previewerProps:{title:"\u6821\u9A8C\u5176\u4ED6\u7EC4\u4EF6",filename:"components/form/demo/validate-other.tsx",jsx:`import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
      <Form.Item label="Plain Text">
        <span className="ant-form-text">China</span>
      </Form.Item>
      <Form.Item
        name="select"
        label="Select"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
      >
        <Select placeholder="Please select a country">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="select-multiple"
        label="Select[multiple]"
        rules={[
          {
            required: true,
            message: 'Please select your favourite colors!',
            type: 'array',
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select favourite colors">
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
        </Select>
      </Form.Item>

      <Form.Item label="InputNumber">
        <Form.Item name="input-number" noStyle>
          <InputNumber min={1} max={10} />
        </Form.Item>
        <span
          className="ant-form-text"
          style={{
            marginLeft: 8,
          }}
        >
          machines
        </span>
      </Form.Item>

      <Form.Item name="switch" label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="slider" label="Slider">
        <Slider
          marks={{
            0: 'A',
            20: 'B',
            40: 'C',
            60: 'D',
            80: 'E',
            100: 'F',
          }}
        />
      </Form.Item>

      <Form.Item name="radio-group" label="Radio.Group">
        <Radio.Group>
          <Radio value="a">item 1</Radio>
          <Radio value="b">item 2</Radio>
          <Radio value="c">item 3</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="radio-button"
        label="Radio.Button"
        rules={[
          {
            required: true,
            message: 'Please pick an item!',
          },
        ]}
      >
        <Radio.Group>
          <Radio.Button value="a">item 1</Radio.Button>
          <Radio.Button value="b">item 2</Radio.Button>
          <Radio.Button value="c">item 3</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="checkbox-group" label="Checkbox.Group">
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox
                value="A"
                style={{
                  lineHeight: '32px',
                }}
              >
                A
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="B"
                style={{
                  lineHeight: '32px',
                }}
                disabled
              >
                B
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="C"
                style={{
                  lineHeight: '32px',
                }}
              >
                C
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="D"
                style={{
                  lineHeight: '32px',
                }}
              >
                D
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="E"
                style={{
                  lineHeight: '32px',
                }}
              >
                E
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                value="F"
                style={{
                  lineHeight: '32px',
                }}
              >
                F
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item name="rate" label="Rate">
        <Rate />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>\u4EE5\u4E0A\u6F14\u793A\u6CA1\u6709\u51FA\u73B0\u7684\u8868\u5355\u63A7\u4EF6\u5BF9\u5E94\u7684\u6821\u9A8C\u6F14\u793A\u3002</p>"}},{demo:{id:"components-form-demo-disabled-input-debug"},previewerProps:{debug:!0,title:"Disabled Input Debug",filename:"components/form/demo/disabled-input-debug.tsx",jsx:`import React from 'react';
import { Form, Input } from 'antd';
const App = () => (
  <Form>
    <Form.Item label="Normal0">
      <Input placeholder="unavailable choice" value="Buggy!" />
    </Form.Item>
    <Form.Item label="Fail0" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" value="Buggy!" />
    </Form.Item>
    <Form.Item label="FailDisabled0" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" disabled value="Buggy!" />
    </Form.Item>
    <Form.Item label="Normal1">
      <Input placeholder="unavailable choice" value="Buggy!" />
    </Form.Item>
    <Form.Item label="Fail1" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" value="Buggy!" />
    </Form.Item>
    <Form.Item label="FailDisabled1" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" disabled value="Buggy!" />
    </Form.Item>
    <Form.Item label="Normal2">
      <Input placeholder="unavailable choice" addonBefore="Buggy!" />
    </Form.Item>
    <Form.Item label="Fail2" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" addonBefore="Buggy!" />
    </Form.Item>
    <Form.Item label="FailDisabled2" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" disabled addonBefore="Buggy!" />
    </Form.Item>
    <Form.Item label="Normal3">
      <Input placeholder="unavailable choice" prefix="\u4EBA\u6C11\u5E01" value="50" />
    </Form.Item>
    <Form.Item label="Fail3" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" prefix="\u4EBA\u6C11\u5E01" value="50" />
    </Form.Item>
    <Form.Item label="FailDisabled3" validateStatus="error" help="Buggy!">
      <Input placeholder="unavailable choice" disabled prefix="\u4EBA\u6C11\u5E01" value="50" />
    </Form.Item>
  </Form>
);
export default App;
`,description:"<p>Test disabled Input with validate state</p>"}},{demo:{id:"components-form-demo-dep-debug"},previewerProps:{debug:!0,title:"Dep Debug",filename:"components/form/demo/dep-debug.tsx",jsx:`import React from 'react';
import { Form, Input } from 'antd';
let acc = 0;
const App = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="debug"
      initialValues={{
        debug1: 'debug1',
        debug2: 'debug2',
      }}
    >
      <Form.Item noStyle dependencies={['debug1']}>
        {
          () => acc++
          // return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
        }
      </Form.Item>
      <Form.Item label="debug1" name="debug1">
        <Input />
      </Form.Item>
      <Form.Item label="debug2" name="debug2">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default App;
`,description:"<p>Buggy!</p>"}},{demo:{id:"components-form-demo-label-debug"},previewerProps:{debug:!0,title:"\u6D4B\u8BD5 label \u7701\u7565",filename:"components/form/demo/label-debug.tsx",jsx:`import React from 'react';
import { Form, Input, Typography } from 'antd';
const App = () => (
  <Form
    name="label-ellipsis"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
  >
    <Form.Item
      label={
        <Typography.Text ellipsis>
          longtextlongtextlongtextlongtextlongtextlongtextlongtext
        </Typography.Text>
      }
      name="username"
    >
      <Input />
    </Form.Item>

    <Form.Item
      label={
        <Typography.Text ellipsis>
          longtext longtext longtext longtext longtext longtext longtext
        </Typography.Text>
      }
      name="password"
    >
      <Input.Password />
    </Form.Item>
  </Form>
);
export default App;
`,description:"<p><code>label</code> \u4E2D\u4F7F\u7528 <code>&#x3C;Typography.Text ellipsis></code> \u65F6\u5E94\u8BE5\u663E\u793A <code>...</code>\u3002</p>"}},{demo:{id:"components-form-demo-col-24-debug"},previewerProps:{debug:!0,title:"\u6D4B\u8BD5\u7279\u6B8A col 24 \u7528\u6CD5",filename:"components/form/demo/col-24-debug.tsx",jsx:`import React from 'react';
import { Button, Select, Form, Input, Divider } from 'antd';
const sharedItem = (
  <Form.Item
    label={<a href="https://github.com/ant-design/ant-design/issues/36459">#36459</a>}
    initialValue={['bamboo']}
    name="select"
    style={{
      boxShadow: '0 0 3px red',
    }}
  >
    <Select
      style={{
        width: '70%',
      }}
      mode="multiple"
      options={[
        {
          label: 'Bamboo',
          value: 'bamboo',
        },
        {
          label: 'Little',
          value: 'little',
        },
        {
          label: 'Light',
          value: 'light',
        },
      ]}
    />
  </Form.Item>
);
const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {sharedItem}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Form
        name="responsive"
        labelCol={{
          sm: 24,
          xl: 24,
        }}
        wrapperCol={{
          sm: 24,
          xl: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Form layout="vertical">
        {sharedItem}

        <Form.Item
          label="col12"
          name="col12"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
export default App;
`,description:'<p>See issue <a href="https://github.com/ant-design/ant-design/issues/32980">#32980</a>.</p>'}},{demo:{id:"components-form-demo-ref-item"},previewerProps:{debug:!0,title:"\u5F15\u7528\u5B57\u6BB5",filename:"components/form/demo/ref-item.tsx",jsx:`import React from 'react';
import { Button, Form, Input } from 'antd';
const App = () => {
  const [form] = Form.useForm();
  const ref = React.useRef(null);
  return (
    <Form
      form={form}
      initialValues={{
        list: ['light'],
      }}
    >
      <Form.Item name="test" label="test">
        <Input ref={ref} />
      </Form.Item>

      <Form.List name="list">
        {(fields) =>
          fields.map((field) => (
            <Form.Item {...field} key={field.key}>
              <Input ref={ref} />
            </Form.Item>
          ))
        }
      </Form.List>

      <Button
        htmlType="button"
        onClick={() => {
          form.getFieldInstance('test').focus();
        }}
      >
        Focus Form.Item
      </Button>
      <Button
        onClick={() => {
          form.getFieldInstance(['list', 0]).focus();
        }}
      >
        Focus Form.List
      </Button>
    </Form>
  );
};
export default App;
`,description:"<p>\u8BF7\u4F18\u5148\u4F7F\u7528 <code>ref</code>\uFF01</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"form"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#form"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[3].value),(0,n.tZ)("th",null,e[4].value),(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[8].value),(0,n.tZ)("td",null,e[9].value,(0,n.tZ)("code",null,e[10].value),e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value,(0,n.tZ)("code",null,e[21].value),e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-global-state"},e[27].value)),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#FieldData"},e[28].value),e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value,(0,n.tZ)("code",null,e[33].value),e[34].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#FormInstance"},e[35].value)),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[43].value),e[44].value,(0,n.tZ)("code",null,e[45].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[46].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value,(0,n.tZ)("code",null,e[54].value),e[55].value,(0,n.tZ)("code",null,e[56].value),e[57].value,(0,n.tZ)("code",null,e[58].value),e[59].value,(0,n.tZ)("code",null,e[60].value),e[61].value,(0,n.tZ)("code",null,e[62].value)),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"/components/grid/#Col"},e[63].value)),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[67].value),e[68].value,(0,n.tZ)("code",null,e[69].value),e[70].value,(0,n.tZ)("code",null,e[71].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[72].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value,(0,n.tZ)("code",null,e[75].value),e[76].value),(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,e[78].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,e[83].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null,e[86].value,(0,n.tZ)("code",null,e[87].value)),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value,(0,n.tZ)("a",{href:"https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options"},e[93].value)),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[97].value),e[98].value,(0,n.tZ)("code",null,e[99].value),e[100].value,(0,n.tZ)("code",null,e[101].value)),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value,(0,n.tZ)(t.rU,{to:"#validateMessages"},e[105].value)),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/react-component/field-form/blob/master/src/utils/messages.ts"},e[106].value)),(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[111].value)),(0,n.tZ)("td",null,e[112].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"/components/grid/#Col"},e[115].value)),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[129].value),(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"validatemessages"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#validatemessages"},(0,n.tZ)("span",{className:"icon icon-link"})),"validateMessages"),(0,n.tZ)("p",null,e[133].value,(0,n.tZ)("a",{href:"https://github.com/react-component/field-form/blob/master/src/utils/messages.ts"},e[134].value),e[135].value,(0,n.tZ)("code",null,e[136].value),e[137].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[138].value),(0,n.tZ)("p",null,e[139].value,(0,n.tZ)(t.rU,{to:"/components/config-provider/"},e[140].value),e[141].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[142].value),(0,n.tZ)("h2",{id:"formitem"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formitem"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.Item"),(0,n.tZ)("p",null,e[143].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[144].value),(0,n.tZ)("th",null,e[145].value),(0,n.tZ)("th",null,e[146].value),(0,n.tZ)("th",null,e[147].value),(0,n.tZ)("th",null,e[148].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value,(0,n.tZ)("code",null,e[151].value),e[152].value,(0,n.tZ)("code",null,e[153].value),e[154].value),(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null,e[158].value,(0,n.tZ)(t.rU,{to:"#dependencies"},e[159].value)),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#NamePath"},e[160].value),e[161].value),(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[163].value),(0,n.tZ)("td",null,e[164].value,(0,n.tZ)("code",null,e[165].value),e[166].value),(0,n.tZ)("td",null,e[167].value),(0,n.tZ)("td",null,e[168].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[169].value),(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null,e[171].value),(0,n.tZ)("td",null,e[172].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[173].value),(0,n.tZ)("td",null,e[174].value),(0,n.tZ)("td",null,e[175].value),(0,n.tZ)("td",null,e[176].value),(0,n.tZ)("td",null,e[177].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value,(0,n.tZ)("code",null,e[180].value),e[181].value),(0,n.tZ)("td",null,e[182].value),(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null,e[192].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null,e[194].value,(0,n.tZ)("code",null,e[195].value),e[196].value),(0,n.tZ)("td",null,e[197].value),(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,e[200].value,(0,n.tZ)("code",null,e[201].value),e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[206].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[207].value),e[208].value),(0,n.tZ)("td",null,e[209].value),(0,n.tZ)("td",null,e[210].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null,e[212].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[213].value),e[214].value,(0,n.tZ)("code",null,e[215].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[216].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[217].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[218].value),e[219].value,(0,n.tZ)("code",null,e[220].value),e[221].value,(0,n.tZ)("code",null,e[222].value),e[223].value,(0,n.tZ)("code",null,e[224].value),e[225].value,(0,n.tZ)("code",null,e[226].value),e[227].value,(0,n.tZ)("code",null,e[228].value),e[229].value,(0,n.tZ)("code",null,e[230].value),e[231].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"/components/grid/#Col"},e[232].value)),(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null,e[237].value),(0,n.tZ)("td",null,e[238].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#NamePath"},e[241].value)),(0,n.tZ)("td",null,e[242].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[243].value),(0,n.tZ)("td",null,e[244].value),(0,n.tZ)("td",null,e[245].value),(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null,e[248].value,(0,n.tZ)("code",null,e[249].value),e[250].value),(0,n.tZ)("td",null,e[251].value),(0,n.tZ)("td",null,e[252].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[253].value),(0,n.tZ)("td",null,e[254].value),(0,n.tZ)("td",null,e[255].value),(0,n.tZ)("td",null,e[256].value),(0,n.tZ)("td",null,e[257].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[258].value),(0,n.tZ)("td",null,e[259].value),(0,n.tZ)("td",null,e[260].value),(0,n.tZ)("td",null,e[261].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[262].value),(0,n.tZ)("td",null,e[263].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-basic"},e[264].value),e[265].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#Rule"},e[266].value),e[267].value),(0,n.tZ)("td",null,e[268].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[269].value),(0,n.tZ)("td",null,e[270].value,(0,n.tZ)(t.rU,{to:"#shouldUpdate"},e[271].value)),(0,n.tZ)("td",null,e[272].value),(0,n.tZ)("td",null,e[273].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[274].value),(0,n.tZ)("td",null,e[275].value),(0,n.tZ)("td",null,e[276].value,(0,n.tZ)(t.rU,{to:"/components/tooltip#API"},e[277].value)),(0,n.tZ)("td",null,e[278].value),(0,n.tZ)("td",null,e[279].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[280].value),(0,n.tZ)("td",null,e[281].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-customized-form-controls"},e[282].value),e[283].value),(0,n.tZ)("td",null,e[284].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[285].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[286].value),(0,n.tZ)("td",null,e[287].value,(0,n.tZ)("code",null,e[288].value),e[289].value),(0,n.tZ)("td",null,e[290].value,(0,n.tZ)("code",null,e[291].value)),(0,n.tZ)("td",null,e[292].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[293].value),e[294].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[295].value),(0,n.tZ)("td",null,e[296].value),(0,n.tZ)("td",null,e[297].value),(0,n.tZ)("td",null,e[298].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[299].value),(0,n.tZ)("td",null,e[300].value),(0,n.tZ)("td",null,e[301].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[302].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[303].value),(0,n.tZ)("td",null,e[304].value,(0,n.tZ)("code",null,e[305].value),e[306].value,(0,n.tZ)("code",null,e[307].value),e[308].value),(0,n.tZ)("td",null,e[309].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[310].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[311].value),(0,n.tZ)("td",null,e[312].value,(0,n.tZ)("code",null,e[313].value),e[314].value,(0,n.tZ)("code",null,e[315].value),e[316].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"/components/grid/#Col"},e[317].value)),(0,n.tZ)("td",null,e[318].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,e[319].value,(0,n.tZ)("code",null,e[320].value),e[321].value,(0,n.tZ)("code",null,e[322].value),e[323].value,(0,n.tZ)("code",null,e[324].value),e[325].value,(0,n.tZ)("code",null,e[326].value),e[327].value,(0,n.tZ)("code",null,e[328].value),e[329].value,(0,n.tZ)("code",null,e[330].value),e[331].value),(0,n.tZ)("ol",null,(0,n.tZ)("li",null,e[332].value,(0,n.tZ)("strong",null,e[333].value),e[334].value,(0,n.tZ)("code",null,e[335].value),e[336].value,(0,n.tZ)("code",null,e[337].value),e[338].value,(0,n.tZ)("code",null,e[339].value),e[340].value),(0,n.tZ)("li",null,e[341].value,(0,n.tZ)("code",null,e[342].value),e[343].value,(0,n.tZ)("code",null,e[344].value),e[345].value,(0,n.tZ)("code",null,e[346].value),e[347].value,(0,n.tZ)("code",null,e[348].value),e[349].value,(0,n.tZ)("code",null,e[350].value),e[351].value,(0,n.tZ)("code",null,e[352].value),e[353].value),(0,n.tZ)("li",null,e[354].value,(0,n.tZ)("code",null,e[355].value),e[356].value,(0,n.tZ)("code",null,e[357].value),e[358].value)),(0,n.tZ)("h3",{id:"dependencies"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#dependencies"},(0,n.tZ)("span",{className:"icon icon-link"})),"dependencies"),(0,n.tZ)("p",null,e[359].value,(0,n.tZ)("code",null,e[360].value),e[361].value,(0,n.tZ)("code",null,e[362].value),e[363].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-register"},e[364].value),e[365].value),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[366].value),e[367].value,(0,n.tZ)("code",null,e[368].value),e[369].value),(0,n.tZ)("p",null,e[370].value,(0,n.tZ)("code",null,e[371].value),e[372].value,(0,n.tZ)("code",null,e[373].value),e[374].value,(0,n.tZ)("code",null,e[375].value),e[376].value),(0,n.tZ)("h3",{id:"shouldupdate"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#shouldupdate"},(0,n.tZ)("span",{className:"icon icon-link"})),"shouldUpdate"),(0,n.tZ)("p",null,e[377].value,(0,n.tZ)(t.rU,{to:"#dependencies"},(0,n.tZ)("code",null,e[378].value)),e[379].value,(0,n.tZ)("code",null,e[380].value),e[381].value),(0,n.tZ)("p",null,e[382].value,(0,n.tZ)("code",null,e[383].value),e[384].value,(0,n.tZ)("code",null,e[385].value),e[386].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[387].value),(0,n.tZ)("p",null,e[388].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-horizontal-login"},e[389].value),e[390].value),(0,n.tZ)("p",null,e[391].value,(0,n.tZ)("code",null,e[392].value),e[393].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[394].value),(0,n.tZ)("p",null,e[395].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-control-hooks"},e[396].value),e[397].value),(0,n.tZ)("h3",{id:"messagevariables"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#messagevariables"},(0,n.tZ)("span",{className:"icon icon-link"})),"messageVariables"),(0,n.tZ)("p",null,e[398].value,(0,n.tZ)("code",null,e[399].value),e[400].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[401].value),(0,n.tZ)("h2",{id:"formlist"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formlist"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.List"),(0,n.tZ)("p",null,e[402].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[403].value),(0,n.tZ)("th",null,e[404].value),(0,n.tZ)("th",null,e[405].value),(0,n.tZ)("th",null,e[406].value),(0,n.tZ)("th",null,e[407].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[408].value),(0,n.tZ)("td",null,e[409].value),(0,n.tZ)("td",null,e[410].value),(0,n.tZ)("td",null,e[411].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[412].value),(0,n.tZ)("td",null,e[413].value,(0,n.tZ)("code",null,e[414].value),e[415].value),(0,n.tZ)("td",null,e[416].value),(0,n.tZ)("td",null,e[417].value),(0,n.tZ)("td",null,e[418].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[419].value),(0,n.tZ)("td",null,e[420].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#NamePath"},e[421].value)),(0,n.tZ)("td",null,e[422].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[423].value),(0,n.tZ)("td",null,e[424].value,(0,n.tZ)(t.rU,{to:"#Form.ErrorList"},e[425].value),e[426].value),(0,n.tZ)("td",null,e[427].value),(0,n.tZ)("td",null,e[428].value),(0,n.tZ)("td",null,e[429].value)))),(0,n.tZ)(o.Z,{lang:"tsx"},e[430].value),(0,n.tZ)("p",null,e[431].value,(0,n.tZ)("code",null,e[432].value),e[433].value,(0,n.tZ)("code",null,e[434].value),e[435].value,(0,n.tZ)("code",null,e[436].value),e[437].value),(0,n.tZ)("h2",{id:"operation"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#operation"},(0,n.tZ)("span",{className:"icon icon-link"})),"operation"),(0,n.tZ)("p",null,e[438].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[439].value),(0,n.tZ)("th",null,e[440].value),(0,n.tZ)("th",null,e[441].value),(0,n.tZ)("th",null,e[442].value),(0,n.tZ)("th",null,e[443].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[444].value),(0,n.tZ)("td",null,e[445].value),(0,n.tZ)("td",null,e[446].value),(0,n.tZ)("td",null,e[447].value),(0,n.tZ)("td",null,e[448].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[449].value),(0,n.tZ)("td",null,e[450].value),(0,n.tZ)("td",null,e[451].value),(0,n.tZ)("td",null,e[452].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[453].value),(0,n.tZ)("td",null,e[454].value),(0,n.tZ)("td",null,e[455].value),(0,n.tZ)("td",null,e[456].value),(0,n.tZ)("td",null,e[457].value)))),(0,n.tZ)("h2",{id:"formerrorlist"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formerrorlist"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.ErrorList"),(0,n.tZ)("p",null,e[458].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-dynamic-form-item"},e[459].value),e[460].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[461].value),(0,n.tZ)("th",null,e[462].value),(0,n.tZ)("th",null,e[463].value),(0,n.tZ)("th",null,e[464].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[465].value),(0,n.tZ)("td",null,e[466].value),(0,n.tZ)("td",null,e[467].value),(0,n.tZ)("td",null,e[468].value)))),(0,n.tZ)("h2",{id:"formprovider"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formprovider"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.Provider"),(0,n.tZ)("p",null,e[469].value,(0,n.tZ)("code",null,e[470].value),e[471].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-form-context"},e[472].value),e[473].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[474].value),(0,n.tZ)("th",null,e[475].value),(0,n.tZ)("th",null,e[476].value),(0,n.tZ)("th",null,e[477].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[478].value),(0,n.tZ)("td",null,e[479].value),(0,n.tZ)("td",null,e[480].value),(0,n.tZ)("td",null,e[481].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[482].value),(0,n.tZ)("td",null,e[483].value),(0,n.tZ)("td",null,e[484].value),(0,n.tZ)("td",null,e[485].value)))),(0,n.tZ)(o.Z,{lang:"jsx"},e[486].value),(0,n.tZ)("h3",{id:"forminstance"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#forminstance"},(0,n.tZ)("span",{className:"icon icon-link"})),"FormInstance"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[487].value),(0,n.tZ)("th",null,e[488].value),(0,n.tZ)("th",null,e[489].value),(0,n.tZ)("th",null,e[490].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[491].value),(0,n.tZ)("td",null,e[492].value),(0,n.tZ)("td",null,e[493].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[494].value),e[495].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[496].value),(0,n.tZ)("td",null,e[497].value),(0,n.tZ)("td",null,e[498].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[499].value),e[500].value),(0,n.tZ)("td",null,e[501].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[502].value),(0,n.tZ)("td",null,e[503].value),(0,n.tZ)("td",null,e[504].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[505].value),e[506].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[507].value),(0,n.tZ)("td",null,e[508].value,(0,n.tZ)("code",null,e[509].value),e[510].value),(0,n.tZ)("td",null,e[511].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[512].value),e[513].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[514].value),(0,n.tZ)("td",null,e[515].value),(0,n.tZ)("td",null,e[516].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[517].value),e[518].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[519].value),(0,n.tZ)("td",null,e[520].value,(0,n.tZ)("code",null,e[521].value),e[522].value,(0,n.tZ)("code",null,e[523].value),e[524].value),(0,n.tZ)("td",null,e[525].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[526].value),e[527].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[528].value),(0,n.tZ)("td",null,e[529].value),(0,n.tZ)("td",null,e[530].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[531].value),e[532].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[533].value),(0,n.tZ)("td",null,e[534].value),(0,n.tZ)("td",null,e[535].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[536].value),e[537].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[538].value),(0,n.tZ)("td",null,e[539].value,(0,n.tZ)("code",null,e[540].value)),(0,n.tZ)("td",null,e[541].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[542].value),e[543].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[544].value),(0,n.tZ)("td",null,e[545].value),(0,n.tZ)("td",null,e[546].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[547].value),e[548].value,(0,n.tZ)("a",{href:"https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options"},e[549].value),e[550].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[551].value),(0,n.tZ)("td",null,e[552].value),(0,n.tZ)("td",null,e[553].value,(0,n.tZ)(t.rU,{to:"#FieldData"},e[554].value),e[555].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[556].value),(0,n.tZ)("td",null,e[557].value),(0,n.tZ)("td",null,e[558].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[559].value),e[560].value),(0,n.tZ)("td",null,e[561].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[562].value),(0,n.tZ)("td",null,e[563].value,(0,n.tZ)("code",null,e[564].value),e[565].value),(0,n.tZ)("td",null,e[566].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[567].value),(0,n.tZ)("td",null,e[568].value,(0,n.tZ)("code",null,e[569].value),e[570].value),(0,n.tZ)("td",null,e[571].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[572].value),(0,n.tZ)("td",null,e[573].value),(0,n.tZ)("td",null,e[574].value,(0,n.tZ)(t.rU,{to:"#NamePath"},e[575].value),e[576].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"validatefields-\u8FD4\u56DE\u793A\u4F8B"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#validatefields-\u8FD4\u56DE\u793A\u4F8B"},(0,n.tZ)("span",{className:"icon icon-link"})),"validateFields \u8FD4\u56DE\u793A\u4F8B"),(0,n.tZ)(o.Z,{lang:"jsx"},e[577].value),(0,n.tZ)("h2",{id:"hooks"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#hooks"},(0,n.tZ)("span",{className:"icon icon-link"})),"Hooks"),(0,n.tZ)("h3",{id:"formuseform"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formuseform"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.useForm"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[578].value)),(0,n.tZ)("p",null,e[579].value),(0,n.tZ)("h3",{id:"formuseforminstance"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formuseforminstance"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.useFormInstance"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[580].value)),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[581].value),e[582].value),(0,n.tZ)(o.Z,{lang:"tsx"},e[583].value),(0,n.tZ)("h3",{id:"formusewatch"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formusewatch"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.useWatch"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[584].value)),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[585].value),e[586].value,(0,n.tZ)("code",null,e[587].value),e[588].value),(0,n.tZ)(o.Z,{lang:"tsx"},e[589].value),(0,n.tZ)("h3",{id:"formitemusestatus"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#formitemusestatus"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form.Item.useStatus"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[590].value)),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[591].value),e[592].value,(0,n.tZ)("code",null,e[593].value),e[594].value,(0,n.tZ)("code",null,e[595].value),e[596].value),(0,n.tZ)(o.Z,{lang:"tsx"},e[597].value),(0,n.tZ)("h4",{id:"\u4E0E\u5176\u4ED6\u83B7\u53D6\u6570\u636E\u7684\u65B9\u5F0F\u7684\u533A\u522B"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E0E\u5176\u4ED6\u83B7\u53D6\u6570\u636E\u7684\u65B9\u5F0F\u7684\u533A\u522B"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E0E\u5176\u4ED6\u83B7\u53D6\u6570\u636E\u7684\u65B9\u5F0F\u7684\u533A\u522B"),(0,n.tZ)("p",null,e[598].value,(0,n.tZ)("code",null,e[599].value),e[600].value,(0,n.tZ)("code",null,e[601].value),e[602].value,(0,n.tZ)("code",null,e[603].value),e[604].value),(0,n.tZ)("h3",{id:"interface"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#interface"},(0,n.tZ)("span",{className:"icon icon-link"})),"Interface"),(0,n.tZ)("h4",{id:"namepath"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#namepath"},(0,n.tZ)("span",{className:"icon icon-link"})),"NamePath"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[605].value)),(0,n.tZ)("h4",{id:"fielddata"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#fielddata"},(0,n.tZ)("span",{className:"icon icon-link"})),"FieldData"),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[606].value),(0,n.tZ)("th",null,e[607].value),(0,n.tZ)("th",null,e[608].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[609].value),(0,n.tZ)("td",null,e[610].value),(0,n.tZ)("td",null,e[611].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[612].value),(0,n.tZ)("td",null,e[613].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#NamePath"},e[614].value),e[615].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[616].value),(0,n.tZ)("td",null,e[617].value),(0,n.tZ)("td",null,e[618].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[619].value),(0,n.tZ)("td",null,e[620].value),(0,n.tZ)("td",null,e[621].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[622].value),(0,n.tZ)("td",null,e[623].value),(0,n.tZ)("td",null,e[624].value)))),(0,n.tZ)("h4",{id:"rule"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rule"},(0,n.tZ)("span",{className:"icon icon-link"})),"Rule"),(0,n.tZ)("p",null,e[625].value),(0,n.tZ)(o.Z,{lang:"tsx"},e[626].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[627].value),(0,n.tZ)("th",null,e[628].value),(0,n.tZ)("th",null,e[629].value),(0,n.tZ)("th",null,e[630].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[631].value),(0,n.tZ)("td",null,e[632].value,(0,n.tZ)("code",null,e[633].value),e[634].value,(0,n.tZ)("code",null,e[635].value),e[636].value),(0,n.tZ)("td",null,(0,n.tZ)(t.rU,{to:"#Rule"},e[637].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[638].value),(0,n.tZ)("td",null,e[639].value,(0,n.tZ)("code",null,e[640].value),e[641].value,(0,n.tZ)("code",null,e[642].value),e[643].value),(0,n.tZ)("td",null,e[644].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[645].value),(0,n.tZ)("td",null,e[646].value,(0,n.tZ)("code",null,e[647].value),e[648].value,(0,n.tZ)("code",null,e[649].value),e[650].value,(0,n.tZ)("code",null,e[651].value),e[652].value),(0,n.tZ)("td",null,e[653].value,(0,n.tZ)(t.rU,{to:"#Rule"},e[654].value),e[655].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[656].value),(0,n.tZ)("td",null,e[657].value),(0,n.tZ)("td",null,e[658].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[659].value),(0,n.tZ)("td",null,e[660].value,(0,n.tZ)("code",null,e[661].value),e[662].value),(0,n.tZ)("td",null,e[663].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[664].value),(0,n.tZ)("td",null,e[665].value,(0,n.tZ)(t.rU,{to:"#validateMessages"},e[666].value),e[667].value),(0,n.tZ)("td",null,e[668].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[669].value),(0,n.tZ)("td",null,e[670].value,(0,n.tZ)("code",null,e[671].value),e[672].value),(0,n.tZ)("td",null,e[673].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[674].value),(0,n.tZ)("td",null,e[675].value),(0,n.tZ)("td",null,e[676].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[677].value),(0,n.tZ)("td",null,e[678].value),(0,n.tZ)("td",null,e[679].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[680].value),(0,n.tZ)("td",null,e[681].value),(0,n.tZ)("td",null,e[682].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[683].value),(0,n.tZ)("td",null,e[684].value,(0,n.tZ)("code",null,e[685].value),e[686].value,(0,n.tZ)("code",null,e[687].value),e[688].value,(0,n.tZ)("code",null,e[689].value),e[690].value,(0,n.tZ)("code",null,e[691].value),e[692].value,(0,n.tZ)("code",null,e[693].value),e[694].value,(0,n.tZ)("a",{href:"https://github.com/yiminghe/async-validator#type"},e[695].value)),(0,n.tZ)("td",null,e[696].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[697].value),(0,n.tZ)("td",null,e[698].value,(0,n.tZ)("code",null,e[699].value),e[700].value),(0,n.tZ)("td",null,e[701].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[702].value),(0,n.tZ)("td",null,e[703].value,(0,n.tZ)(t.rU,{to:"#components-form-demo-register"},e[704].value),e[705].value),(0,n.tZ)("td",null,e[706].value,(0,n.tZ)(t.rU,{to:"#Rule"},e[707].value),e[708].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[709].value),(0,n.tZ)("td",null,e[710].value),(0,n.tZ)("td",null,e[711].value),(0,n.tZ)("td",null,e[712].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[713].value),(0,n.tZ)("td",null,e[714].value,(0,n.tZ)("code",null,e[715].value),e[716].value),(0,n.tZ)("td",null,e[717].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h2",{id:"\u4ECE-v3-\u5347\u7EA7\u5230-v4"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4ECE-v3-\u5347\u7EA7\u5230-v4"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4ECE v3 \u5347\u7EA7\u5230 v4"),(0,n.tZ)("p",null,e[718].value,(0,n.tZ)(t.rU,{to:"/components/form/v3"},e[719].value),e[720].value),(0,n.tZ)("style",{dangerouslySetInnerHTML:{__html:`
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:nth-of-type(4) {
  white-space: nowrap;
  word-wrap: break-word;
}
`}}),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u81EA\u5B9A\u4E49-validator-\u6CA1\u6709\u6548\u679C"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u81EA\u5B9A\u4E49-validator-\u6CA1\u6709\u6548\u679C"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u81EA\u5B9A\u4E49 validator \u6CA1\u6709\u6548\u679C"),(0,n.tZ)("p",null,e[721].value,(0,n.tZ)("code",null,e[722].value),e[723].value,(0,n.tZ)("code",null,e[724].value),e[725].value,(0,n.tZ)("code",null,e[726].value),e[727].value,(0,n.tZ)("code",null,e[728].value),e[729].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[730].value),(0,n.tZ)("h3",{id:"name-\u4E3A\u6570\u7EC4\u65F6\u7684\u8F6C\u6362\u89C4\u5219"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#name-\u4E3A\u6570\u7EC4\u65F6\u7684\u8F6C\u6362\u89C4\u5219"},(0,n.tZ)("span",{className:"icon icon-link"})),"name \u4E3A\u6570\u7EC4\u65F6\u7684\u8F6C\u6362\u89C4\u5219\uFF1F"),(0,n.tZ)("p",null,e[731].value,(0,n.tZ)("code",null,e[732].value),e[733].value,(0,n.tZ)("code",null,e[734].value),e[735].value),(0,n.tZ)("h3",{id:"\u4E3A\u4F55\u5728-modal-\u4E2D\u8C03\u7528-form-\u63A7\u5236\u53F0\u4F1A\u62A5\u9519"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55\u5728-modal-\u4E2D\u8C03\u7528-form-\u63A7\u5236\u53F0\u4F1A\u62A5\u9519"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55\u5728 Modal \u4E2D\u8C03\u7528 form \u63A7\u5236\u53F0\u4F1A\u62A5\u9519\uFF1F"),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,e[736].value,(0,n.tZ)("code",null,e[737].value),e[738].value,(0,n.tZ)("code",null,e[739].value),e[740].value)),(0,n.tZ)("p",null,e[741].value,(0,n.tZ)("code",null,e[742].value),e[743].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/antd-reproduction-template-ibu5c"},e[744].value),e[745].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-formitem-\u4E0B\u7684\u5B50\u7EC4\u4EF6-defaultvalue-\u4E0D\u751F\u6548"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-formitem-\u4E0B\u7684\u5B50\u7EC4\u4EF6-defaultvalue-\u4E0D\u751F\u6548"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 Form.Item \u4E0B\u7684\u5B50\u7EC4\u4EF6 ",(0,n.tZ)("code",null,e[746].value)," \u4E0D\u751F\u6548\uFF1F"),(0,n.tZ)("p",null,e[747].value,(0,n.tZ)("code",null,e[748].value),e[749].value,(0,n.tZ)("code",null,e[750].value),e[751].value,(0,n.tZ)("code",null,e[752].value),e[753].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48\u7B2C\u4E00\u6B21\u8C03\u7528-ref-\u7684-from-\u4E3A\u7A7A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48\u7B2C\u4E00\u6B21\u8C03\u7528-ref-\u7684-from-\u4E3A\u7A7A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48\u7B2C\u4E00\u6B21\u8C03\u7528 ",(0,n.tZ)("code",null,e[754].value)," \u7684 From \u4E3A\u7A7A\uFF1F"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[755].value),e[756].value,(0,n.tZ)("a",{href:"https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs"},e[757].value)),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-resetfields-\u4F1A\u91CD\u65B0-mount-\u7EC4\u4EF6"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-resetfields-\u4F1A\u91CD\u65B0-mount-\u7EC4\u4EF6"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 ",(0,n.tZ)("code",null,e[758].value)," \u4F1A\u91CD\u65B0 mount \u7EC4\u4EF6\uFF1F"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[759].value),e[760].value),(0,n.tZ)("h3",{id:"form-\u7684-initialvalues-\u4E0E-item-\u7684-initialvalue-\u533A\u522B"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#form-\u7684-initialvalues-\u4E0E-item-\u7684-initialvalue-\u533A\u522B"},(0,n.tZ)("span",{className:"icon icon-link"})),"Form \u7684 initialValues \u4E0E Item \u7684 initialValue \u533A\u522B\uFF1F"),(0,n.tZ)("p",null,e[761].value,(0,n.tZ)("code",null,e[762].value),e[763].value,(0,n.tZ)("code",null,e[764].value),e[765].value),(0,n.tZ)("ol",null,(0,n.tZ)("li",null,e[766].value,(0,n.tZ)("code",null,e[767].value),e[768].value),(0,n.tZ)("li",null,e[769].value,(0,n.tZ)("code",null,e[770].value),e[771].value,(0,n.tZ)("code",null,e[772].value),e[773].value,(0,n.tZ)("code",null,e[774].value),e[775].value,(0,n.tZ)("code",null,e[776].value),e[777].value)),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48\u5B57\u6BB5\u8BBE\u7F6E-rules-\u540E\u66F4\u6539\u503C-onfieldschange-\u4F1A\u89E6\u53D1\u4E09\u6B21"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48\u5B57\u6BB5\u8BBE\u7F6E-rules-\u540E\u66F4\u6539\u503C-onfieldschange-\u4F1A\u89E6\u53D1\u4E09\u6B21"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48\u5B57\u6BB5\u8BBE\u7F6E ",(0,n.tZ)("code",null,e[778].value)," \u540E\u66F4\u6539\u503C ",(0,n.tZ)("code",null,e[779].value)," \u4F1A\u89E6\u53D1\u4E09\u6B21\uFF1F"),(0,n.tZ)("p",null,e[780].value),(0,n.tZ)("ol",null,(0,n.tZ)("li",null,e[781].value),(0,n.tZ)("li",null,e[782].value),(0,n.tZ)("li",null,e[783].value)),(0,n.tZ)("p",null,e[784].value,(0,n.tZ)("code",null,e[785].value),e[786].value,(0,n.tZ)("code",null,e[787].value),e[788].value,(0,n.tZ)("code",null,e[789].value),e[790].value,(0,n.tZ)("code",null,e[791].value),e[792].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-formlist-\u4E0D\u652F\u6301-label-\u8FD8\u9700\u8981\u4F7F\u7528-errorlist-\u5C55\u793A\u9519\u8BEF"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-formlist-\u4E0D\u652F\u6301-label-\u8FD8\u9700\u8981\u4F7F\u7528-errorlist-\u5C55\u793A\u9519\u8BEF"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 Form.List \u4E0D\u652F\u6301 ",(0,n.tZ)("code",null,e[793].value)," \u8FD8\u9700\u8981\u4F7F\u7528 ErrorList \u5C55\u793A\u9519\u8BEF\uFF1F"),(0,n.tZ)("p",null,e[794].value,(0,n.tZ)("code",null,e[795].value),e[796].value,(0,n.tZ)("code",null,e[797].value),e[798].value,(0,n.tZ)("code",null,e[799].value),e[800].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-formitem-\u7684-dependencies-\u5BF9-formlist-\u4E0B\u7684\u5B57\u6BB5\u6CA1\u6709\u6548\u679C"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-formitem-\u7684-dependencies-\u5BF9-formlist-\u4E0B\u7684\u5B57\u6BB5\u6CA1\u6709\u6548\u679C"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 Form.Item \u7684 ",(0,n.tZ)("code",null,e[801].value)," \u5BF9 Form.List \u4E0B\u7684\u5B57\u6BB5\u6CA1\u6709\u6548\u679C\uFF1F"),(0,n.tZ)("p",null,e[802].value,(0,n.tZ)("code",null,e[803].value),e[804].value),(0,n.tZ)(o.Z,{lang:"tsx"},e[805].value),(0,n.tZ)("p",null,e[806].value,(0,n.tZ)("code",null,e[807].value)),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-normalize-\u4E0D\u80FD\u662F\u5F02\u6B65\u65B9\u6CD5"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-normalize-\u4E0D\u80FD\u662F\u5F02\u6B65\u65B9\u6CD5"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 ",(0,n.tZ)("code",null,e[808].value)," \u4E0D\u80FD\u662F\u5F02\u6B65\u65B9\u6CD5\uFF1F"),(0,n.tZ)("p",null,e[809].value,(0,n.tZ)("code",null,e[810].value),e[811].value,(0,n.tZ)("code",null,e[812].value),e[813].value),(0,n.tZ)("style",{dangerouslySetInnerHTML:{__html:`
  .site-form-item-icon {
    color: rgba(0, 0, 0, 0.25);
  }
  [data-theme="dark"] .site-form-item-icon {
    color: rgba(255,255,255,.3);
  }
`}}),(0,n.tZ)("h3",{id:"\u81EA\u5B9A\u4E49\u8868\u5355\u63A7\u4EF6-scrolltofirsterror-\u548C-scrolltofield-\u5931\u6548"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u81EA\u5B9A\u4E49\u8868\u5355\u63A7\u4EF6-scrolltofirsterror-\u548C-scrolltofield-\u5931\u6548"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u81EA\u5B9A\u4E49\u8868\u5355\u63A7\u4EF6 ",(0,n.tZ)("code",null,e[814].value)," \u548C ",(0,n.tZ)("code",null,e[815].value)," \u5931\u6548\uFF1F"),(0,n.tZ)("p",null,e[816].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/28370"},e[817].value),e[818].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/27994"},e[819].value)),(0,n.tZ)("p",null,e[820].value,(0,n.tZ)("code",null,e[821].value),e[822].value,(0,n.tZ)("code",null,e[823].value),e[824].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/antd-reproduction-template-forked-25nul?file=/index.js"},e[825].value),e[826].value),(0,n.tZ)("h3",{id:"setfieldsvalue-\u4E0D\u4F1A\u89E6\u53D1-onfieldschange-\u548C-onvalueschange"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#setfieldsvalue-\u4E0D\u4F1A\u89E6\u53D1-onfieldschange-\u548C-onvalueschange"},(0,n.tZ)("span",{className:"icon icon-link"})),(0,n.tZ)("code",null,e[827].value)," \u4E0D\u4F1A\u89E6\u53D1 ",(0,n.tZ)("code",null,e[828].value)," \u548C ",(0,n.tZ)("code",null,e[829].value),"\uFF1F"),(0,n.tZ)("p",null,e[830].value,(0,n.tZ)("code",null,e[831].value),e[832].value,(0,n.tZ)("code",null,e[833].value),e[834].value,(0,n.tZ)("code",null,e[835].value),e[836].value),(0,n.tZ)("h3",{id:"\u6709\u66F4\u591A\u53C2\u8003\u6587\u6863\u5417"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6709\u66F4\u591A\u53C2\u8003\u6587\u6863\u5417"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u6709\u66F4\u591A\u53C2\u8003\u6587\u6863\u5417\uFF1F"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[837].value,(0,n.tZ)("a",{href:"https://zhuanlan.zhihu.com/p/375753910"},e[838].value),e[839].value),(0,n.tZ)("li",null,e[840].value,(0,n.tZ)("a",{href:"https://zhuanlan.zhihu.com/p/422752055"},e[841].value),e[842].value),(0,n.tZ)("li",null,e[843].value,(0,n.tZ)("a",{href:"https://zhuanlan.zhihu.com/p/388222294"},e[844].value),e[845].value)))))}u.default=i}}]);
