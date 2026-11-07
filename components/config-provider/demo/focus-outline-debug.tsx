import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  Alert,
  Anchor,
  App as AntdApp,
  AutoComplete,
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Collapse,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Drawer,
  Dropdown,
  FloatButton,
  Form,
  Image,
  Input,
  InputNumber,
  Mentions,
  Menu,
  Modal,
  Pagination,
  Radio,
  Rate,
  Segmented,
  Select,
  Slider,
  Space,
  Splitter,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tour,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
} from 'antd';

const { Text, Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
];

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{ value: 'hangzhou', label: 'Hangzhou' }],
  },
];

const treeData = [
  {
    title: 'Parent',
    value: 'parent',
    key: 'parent',
    children: [{ title: 'Child', value: 'child', key: 'child' }],
  },
];

const tableData = [
  { key: '1', name: 'Apple', count: 3, description: 'Apple details' },
  { key: '2', name: 'Orange', count: 5, description: 'Orange details' },
];

const transferData = [
  { key: '1', title: 'Apple' },
  { key: '2', title: 'Orange' },
  { key: '3', title: 'Banana' },
  { key: '4', title: 'Pear' },
];

const tabsItems = Array.from({ length: 8 }, (_, index) => ({
  key: String(index + 1),
  label: `Tab ${index + 1}`,
  children: `Tab panel ${index + 1}`,
}));

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '240px minmax(0, 1fr)',
  alignItems: 'center',
  gap: 16,
  paddingBlock: 10,
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
};

const targetStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.35,
  wordBreak: 'break-all',
};

const controlStyle: React.CSSProperties = {
  maxWidth: 420,
  position: 'relative',
};

const sectionStyle: React.CSSProperties = {
  width: '100%',
};

const sectionTitleStyle: React.CSSProperties = {
  marginBlock: '24px 4px',
};

const inlineFloatButtonStyle: React.CSSProperties = {
  position: 'relative',
  inset: 'auto',
};

const focusTargetMap: Record<string, string> = {
  'Alert.Close': '描边位置：关闭按钮',
  'Anchor.Link': '描边位置：锚点链接',
  'Breadcrumb.Link': '描边位置：面包屑链接',
  Button: '描边位置：按钮根节点、链接形态',
  Checkbox: '描边位置：checkbox 方框外圈',
  'Collapse.Header': '描边位置：面板标题外框',
  'DatePicker.Operation': '描边位置：清除按钮',
  'Drawer.Close': '描边位置：关闭按钮',
  'Dropdown.Menu': '描边位置：菜单根节点、菜单项；触发按钮由 Button 处理',
  FloatButton: '描边位置：悬浮按钮外框',
  'FloatButton.Group': '描边位置：Group 触发按钮外框',
  'FloatButton.BackTop': '描边位置：回到顶部按钮外框',
  'Image.Root': '描边位置：图片根节点',
  'Image.Preview': '描边位置：预览层关闭按钮、工具栏按钮',
  'Input.ClearIcon': '描边位置：清除按钮；输入框 active shadow 在其他分组',
  'Menu.Item': '描边位置：菜单根节点、菜单项',
  Modal: '描边位置：对话框根节点、关闭按钮；底部按钮由 Button 处理',
  'Notification.Close': '描边位置：关闭按钮；操作按钮由 Button 处理',
  'Pagination.Item': '描边位置：页码、跳转项、上一页和下一页按钮',
  Radio: '描边位置：radio 圆点外圈',
  'Radio.Button': '描边位置：Radio.Button 分段外框',
  Segmented: '描边位置：根节点、当前聚焦项',
  Switch: '描边位置：开关外框',
  'Table.Expand': '描边位置：行展开按钮',
  Tabs: '描边位置：标签、更多、添加和删除按钮',
  'Tag.Link': '描边位置：链接形态 Tag',
  'Tour.Close': '描边位置：关闭按钮；步骤按钮由 Button 处理',
  'Transfer.Operation': '描边位置：目标列表移除按钮、穿梭按钮',
  'Tree.Node': '描边位置：树节点标题',
  'Typography.Operation': '描边位置：链接、编辑、复制和展开操作',
  'Upload.Dragger': '描边位置：拖拽上传区域',
  'Steps.Item': '原生描边位置：可点击步骤项',
  'Splitter.Collapse': '原生描边位置：分割条折叠按钮区域',
  'Form.NativeControl': 'shadow 位置：原生 file、radio、checkbox 控件',
  'Input.Outlined': 'shadow 位置：常规输入框外层',
  'Input.OTP': 'shadow 位置：当前 OTP 单格输入框',
  'InputNumber.Outlined': 'shadow 位置：常规数字输入框外层',
  'Mentions.Outlined': 'shadow 位置：常规文本域外层',
  'DatePicker.Outlined': 'shadow 位置：常规日期输入框外层',
  'TimePicker.Outlined': 'shadow 位置：常规时间输入框外层',
  'Select.Outlined': 'shadow 位置：常规选择框外层',
  'AutoComplete.Outlined': 'shadow 位置：常规自动完成输入框外层',
  'Cascader.Outlined': 'shadow 位置：常规级联选择框外层',
  'TreeSelect.Outlined': 'shadow 位置：常规树选择框外层',
  'ColorPicker.Trigger': 'shadow 位置：颜色触发器外框',
  'Pagination.QuickJumper': 'shadow 位置：快速跳转输入框',
  'Radio.FocusShadow': 'shadow 位置：radio 与 Radio.Button 聚焦节点',
  'Input.Borderless': '自定义描边位置：无边框输入框自身轮廓',
  'Input.Search.Borderless': '自定义描边位置：无边框搜索框自身轮廓',
  'Input.Password.Borderless': '自定义描边位置：无边框密码框自身轮廓',
  'Input.TextArea.Borderless': '自定义描边位置：无边框文本域自身轮廓',
  'InputNumber.Borderless': '自定义描边位置：无边框数字输入框自身轮廓',
  'Mentions.Borderless': '自定义描边位置：无边框文本域自身轮廓',
  'DatePicker.Borderless': '自定义描边位置：无边框日期输入框自身轮廓',
  'DatePicker.RangePicker.Borderless': '自定义描边位置：无边框范围输入框自身轮廓',
  'TimePicker.Borderless': '自定义描边位置：无边框时间输入框自身轮廓',
  'TimePicker.RangePicker.Borderless': '自定义描边位置：无边框时间范围输入框自身轮廓',
  'Select.Borderless': '自定义描边位置：无边框选择框自身轮廓',
  'AutoComplete.Borderless': '自定义描边位置：无边框自动完成输入框自身轮廓',
  'Cascader.Borderless': '自定义描边位置：无边框级联选择框自身轮廓',
  'TreeSelect.Borderless': '自定义描边位置：无边框树选择框自身轮廓',
  Rate: '自定义描边位置：当前星星',
  Slider: '自定义描边位置：滑块拖拽点',
  'ColorPicker.Panel': '自定义描边位置：面板内色板、滑条拖拽点、输入框',
  'AutoComplete.Token': '传递位置：AutoComplete 公开 Token 到内部 Select',
  'TimePicker.Token': '传递位置：TimePicker 公开 Token 到内部 DatePicker',
  'TimePicker.RangePicker.Token': '传递位置：TimePicker 公开 Token 到时间范围选择器',
  'Cascader.Token': '传递位置：Cascader 公开 Token 到内部 Select 和弹层',
  'TreeSelect.Token': '传递位置：TreeSelect 公开 Token 到内部 Select、Tree、Checkbox 和弹层',
  'Select.PopupToken': '传递位置：Select 组件 Token 到弹层',
  'DatePicker.PopupToken': '传递位置：DatePicker 组件 Token 到日期弹层',
  'DatePicker.RangePicker.Token': '传递位置：DatePicker 组件 Token 到 RangePicker 和弹层',
  'ColorPicker.PopupToken': '传递位置：ColorPicker 组件 Token 到 panel 弹层',
  'Dropdown.PopupToken': '传递位置：Dropdown 组件 Token 到 Menu 弹层',
  'Image.PreviewToken': '传递位置：Image 组件 Token 到预览层',
  'Modal.Token': '传递位置：Modal 组件 Token 到 portal 内容',
  'Drawer.Token': '传递位置：Drawer 组件 Token 到 portal 内容',
  'Notification.Token': '传递位置：Notification 组件 Token 到 portal 内容',
  'Tour.Token': '传递位置：Tour 组件 Token 到 portal 内容',
};

const FocusRow: React.FC<React.PropsWithChildren<{ name: string; height?: number }>> = ({
  name,
  height,
  children,
}) => (
  <div style={{ ...rowStyle, minHeight: height }}>
    <div style={labelStyle}>
      <Text strong>{name}</Text>
      <Text type="secondary" style={targetStyle}>
        {focusTargetMap[name]}
      </Text>
    </div>
    <div style={controlStyle}>{children}</div>
  </div>
);

const FocusSection: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <section style={sectionStyle}>
    <Title level={4} style={sectionTitleStyle}>
      {title}
    </Title>
    {children}
  </section>
);

const getPopupContainer = (triggerNode?: HTMLElement) => {
  if (!triggerNode || triggerNode === document.body) {
    return document.body;
  }

  return triggerNode.parentElement ?? document.body;
};

interface FocusOutlineDebugContentProps {
  focusOutline: boolean;
  notificationContainerRef: React.RefObject<HTMLElement | null>;
  setFocusOutline: React.Dispatch<React.SetStateAction<boolean>>;
}

const FocusOutlineDebugContent: React.FC<FocusOutlineDebugContentProps> = ({
  focusOutline,
  notificationContainerRef,
  setFocusOutline,
}) => {
  const { notification } = AntdApp.useApp();
  const tourTargetRef = React.useRef<HTMLButtonElement | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tourOpen, setTourOpen] = React.useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = React.useState(false);
  const [tokenImagePreviewOpen, setTokenImagePreviewOpen] = React.useState(false);
  const [transferTargetKeys, setTransferTargetKeys] = React.useState<React.Key[]>(['2']);
  const [transferSelectedKeys, setTransferSelectedKeys] = React.useState<React.Key[]>([]);

  const showNotification: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    notificationContainerRef.current = event.currentTarget.parentElement;
    notification.open({
      message: 'Notification focus target',
      description: 'Focus the close button.',
      btn: <Button size="small">Action</Button>,
    });
  };

  const showTour: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    tourTargetRef.current = event.currentTarget;
    setTourOpen(true);
  };

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          <Switch checked={focusOutline} onChange={setFocusOutline} />
          <Text>focusOutline: {String(focusOutline)}</Text>
        </Space>

        <FocusSection title="只需要覆盖 lineWidthFocus 的">
          <FocusRow name="Alert.Close">
            <Alert closable message="Closable Alert" type="info" />
          </FocusRow>

          <FocusRow name="Breadcrumb.Link">
            <Breadcrumb
              items={[
                { title: <a href="#focus-outline-debug-home">Home</a> },
                { title: <a href="#focus-outline-debug-list">List</a> },
                { title: 'Detail' },
              ]}
            />
          </FocusRow>

          <FocusRow name="Button">
            <Space>
              <Button type="primary">Button</Button>
              <Button type="link">Link Button</Button>
            </Space>
          </FocusRow>

          <FocusRow name="Checkbox">
            <Checkbox>Checkbox</Checkbox>
          </FocusRow>

          <FocusRow name="Collapse.Header">
            <Collapse
              items={[
                {
                  key: '1',
                  label: 'Collapse Header',
                  children: 'Collapse content',
                },
              ]}
            />
          </FocusRow>

          <FocusRow name="DatePicker.Operation">
            <DatePicker defaultValue={dayjs('2026-07-08')} style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="Drawer.Close">
            <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          </FocusRow>

          <FocusRow name="Dropdown.Menu">
            <Dropdown
              menu={{
                items: [
                  { key: '1', label: 'Menu Item 1' },
                  { key: '2', label: 'Menu Item 2' },
                ],
              }}
            >
              <Button>Open Dropdown</Button>
            </Dropdown>
          </FocusRow>

          <FocusRow name="Image.Root">
            <Image
              width={96}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </FocusRow>

          <FocusRow name="Image.Preview">
            <Image
              width={96}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              preview={{
                getContainer: false,
                open: imagePreviewOpen,
                onOpenChange: setImagePreviewOpen,
              }}
            />
          </FocusRow>

          <FocusRow name="Input.ClearIcon">
            <Input allowClear defaultValue="Clearable Input" />
          </FocusRow>

          <FocusRow name="Menu.Item">
            <Menu
              mode="horizontal"
              selectable={false}
              items={[
                { key: 'mail', label: 'Mail' },
                { key: 'app', label: 'App' },
              ]}
            />
          </FocusRow>

          <FocusRow name="Modal">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </FocusRow>

          <FocusRow name="Notification.Close">
            <Button onClick={showNotification}>Open Notification</Button>
          </FocusRow>

          <FocusRow name="Pagination.Item">
            <Pagination defaultCurrent={5} total={500} size="small" showLessItems />
          </FocusRow>

          <FocusRow name="Radio">
            <Radio.Group defaultValue="a">
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
            </Radio.Group>
          </FocusRow>

          <FocusRow name="Radio.Button">
            <Radio.Group defaultValue="left">
              <Radio.Button value="left">Left</Radio.Button>
              <Radio.Button value="right">Right</Radio.Button>
            </Radio.Group>
          </FocusRow>

          <FocusRow name="Segmented">
            <Segmented options={['Daily', 'Weekly', 'Monthly']} />
          </FocusRow>

          <FocusRow name="Switch">
            <Switch />
          </FocusRow>

          <FocusRow name="Table.Expand">
            <Table
              size="small"
              pagination={false}
              dataSource={tableData}
              columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'Count', dataIndex: 'count' },
              ]}
              expandable={{
                expandedRowRender: (record) => <Text>{record.description}</Text>,
              }}
            />
          </FocusRow>

          <FocusRow name="Tabs">
            <Tabs type="editable-card" onEdit={() => {}} items={tabsItems} />
          </FocusRow>

          <FocusRow name="Tour.Close">
            <Button onClick={showTour}>Open Tour</Button>
          </FocusRow>

          <FocusRow name="Transfer.Operation">
            <Transfer
              oneWay
              dataSource={transferData}
              targetKeys={transferTargetKeys}
              selectedKeys={transferSelectedKeys}
              onChange={setTransferTargetKeys}
              onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                setTransferSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
              }}
              render={(item) => item.title}
            />
          </FocusRow>

          <FocusRow name="Tree.Node">
            <Tree defaultExpandAll treeData={treeData} />
          </FocusRow>

          <FocusRow name="Typography.Operation">
            <Space wrap>
              <Typography.Link href="#focus-outline-debug-typography">Link</Typography.Link>
              <Text editable>Editable</Text>
              <Text copyable>Copyable</Text>
              <Typography.Paragraph
                ellipsis={{ rows: 1, expandable: true }}
                style={{ width: 120, margin: 0 }}
              >
                Expandable typography content
              </Typography.Paragraph>
            </Space>
          </FocusRow>

          <FocusRow name="Upload.Dragger">
            <Dragger beforeUpload={() => false} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Focus Upload Dragger</p>
            </Dragger>
          </FocusRow>
        </FocusSection>

        <FocusSection title="需要处理共享或复用样式 Token 归属的">
          <FocusRow name="Anchor.Link">
            <Anchor
              affix={false}
              items={[
                { key: '1', href: '#focus-outline-anchor-1', title: 'Anchor 1' },
                { key: '2', href: '#focus-outline-anchor-2', title: 'Anchor 2' },
              ]}
            />
          </FocusRow>

          <FocusRow name="Tag.Link">
            <Tag href="#focus-outline-debug-tag" color="blue">
              Link Tag
            </Tag>
          </FocusRow>

          <FocusRow name="FloatButton">
            <FloatButton style={inlineFloatButtonStyle} />
          </FocusRow>

          <FocusRow name="FloatButton.Group" height={120}>
            <FloatButton.Group
              trigger="click"
              open
              style={inlineFloatButtonStyle}
              placement="right"
            >
              <FloatButton />
              <FloatButton />
            </FloatButton.Group>
          </FocusRow>

          <FocusRow name="FloatButton.BackTop">
            <FloatButton.BackTop visibilityHeight={0} style={inlineFloatButtonStyle} />
          </FocusRow>
        </FocusSection>

        <FocusSection title="需要覆盖浏览器原生 outline 的">
          <FocusRow name="Steps.Item">
            <Steps
              current={1}
              onChange={() => {}}
              items={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]}
            />
          </FocusRow>

          <FocusRow name="Splitter.Collapse">
            <Splitter style={{ height: 96, boxShadow: '0 0 10px rgba(0, 0, 0, 0.08)' }}>
              <Splitter.Panel collapsible min="20%">
                Panel 1
              </Splitter.Panel>
              <Splitter.Panel>Panel 2</Splitter.Panel>
            </Splitter>
          </FocusRow>
        </FocusSection>

        <FocusSection title="需要覆盖 controlOutlineWidth 的">
          <FocusRow name="Form.NativeControl">
            <Form>
              <Space wrap>
                <input aria-label="File" type="file" />
                <label>
                  <input name="native-radio" type="radio" /> Native radio
                </label>
                <label>
                  <input type="checkbox" /> Native checkbox
                </label>
              </Space>
            </Form>
          </FocusRow>

          <FocusRow name="Input.Outlined">
            <Input placeholder="Outlined Input" />
          </FocusRow>

          <FocusRow name="Input.OTP">
            <Input.OTP length={4} defaultValue="1234" />
          </FocusRow>

          <FocusRow name="InputNumber.Outlined">
            <InputNumber placeholder="Outlined InputNumber" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="Mentions.Outlined">
            <Mentions
              placeholder="Outlined Mentions"
              options={[{ value: 'antd', label: 'antd' }]}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="DatePicker.Outlined">
            <DatePicker placeholder="Outlined DatePicker" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="TimePicker.Outlined">
            <TimePicker placeholder="Outlined TimePicker" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="Select.Outlined">
            <Select placeholder="Outlined Select" options={options} style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="AutoComplete.Outlined">
            <AutoComplete
              placeholder="Outlined AutoComplete"
              options={options}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="Cascader.Outlined">
            <Cascader
              placeholder="Outlined Cascader"
              options={cascaderOptions}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="TreeSelect.Outlined">
            <TreeSelect
              treeDefaultExpandAll
              placeholder="Outlined TreeSelect"
              treeData={treeData}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="ColorPicker.Trigger">
            <ColorPicker defaultValue="#1677ff" />
          </FocusRow>

          <FocusRow name="Pagination.QuickJumper">
            <Pagination defaultCurrent={2} total={50} size="small" showQuickJumper />
          </FocusRow>

          <FocusRow name="Radio.FocusShadow">
            <Space direction="vertical">
              <Radio>Radio</Radio>
              <Radio.Group defaultValue="left">
                <Radio.Button value="left">Left</Radio.Button>
                <Radio.Button value="right">Right</Radio.Button>
              </Radio.Group>
            </Space>
          </FocusRow>
        </FocusSection>

        <FocusSection title="需要覆盖自定义 outline 或 box-shadow 的">
          <FocusRow name="Input.Borderless">
            <Input variant="borderless" placeholder="Borderless Input" />
          </FocusRow>

          <FocusRow name="Input.Search.Borderless">
            <Input.Search variant="borderless" placeholder="Borderless Search" />
          </FocusRow>

          <FocusRow name="Input.Password.Borderless">
            <Input.Password variant="borderless" placeholder="Borderless Password" />
          </FocusRow>

          <FocusRow name="Input.TextArea.Borderless">
            <TextArea variant="borderless" placeholder="Borderless TextArea" rows={2} />
          </FocusRow>

          <FocusRow name="InputNumber.Borderless">
            <InputNumber
              variant="borderless"
              placeholder="Borderless InputNumber"
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="Mentions.Borderless">
            <Mentions
              variant="borderless"
              placeholder="Borderless Mentions"
              options={[{ value: 'antd', label: 'antd' }]}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="DatePicker.Borderless">
            <DatePicker
              variant="borderless"
              placeholder="Borderless DatePicker"
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="DatePicker.RangePicker.Borderless">
            <RangePicker variant="borderless" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="TimePicker.Borderless">
            <TimePicker
              variant="borderless"
              placeholder="Borderless TimePicker"
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="TimePicker.RangePicker.Borderless">
            <TimePicker.RangePicker variant="borderless" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="Select.Borderless">
            <Select
              variant="borderless"
              placeholder="Borderless Select"
              options={options}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="AutoComplete.Borderless">
            <AutoComplete
              variant="borderless"
              placeholder="Borderless AutoComplete"
              options={options}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="Cascader.Borderless">
            <Cascader
              variant="borderless"
              placeholder="Borderless Cascader"
              options={cascaderOptions}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="TreeSelect.Borderless">
            <TreeSelect
              variant="borderless"
              treeDefaultExpandAll
              placeholder="Borderless TreeSelect"
              treeData={treeData}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="Rate">
            <Rate defaultValue={3} />
          </FocusRow>

          <FocusRow name="Slider">
            <Slider defaultValue={40} />
          </FocusRow>

          <FocusRow name="ColorPicker.Panel" height={280}>
            <ColorPicker defaultValue="#1677ff" open placement="right" />
          </FocusRow>
        </FocusSection>

        <FocusSection title="需要处理复合组件公开 Token 的">
          <FocusRow name="AutoComplete.Token">
            <AutoComplete
              placeholder="AutoComplete public token"
              options={options}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="TimePicker.Token">
            <TimePicker placeholder="TimePicker public token" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="TimePicker.RangePicker.Token">
            <TimePicker.RangePicker style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="Cascader.Token">
            <Cascader
              placeholder="Cascader public token"
              options={cascaderOptions}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="TreeSelect.Token">
            <TreeSelect
              treeCheckable
              treeDefaultExpandAll
              placeholder="TreeSelect public token"
              treeData={treeData}
              style={{ width: '100%' }}
            />
          </FocusRow>

          <FocusRow name="Select.PopupToken">
            <Select placeholder="Select popup token" options={options} style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="DatePicker.PopupToken">
            <DatePicker placeholder="DatePicker popup token" style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="DatePicker.RangePicker.Token">
            <RangePicker style={{ width: '100%' }} />
          </FocusRow>

          <FocusRow name="ColorPicker.PopupToken">
            <ColorPicker defaultValue="#1677ff" />
          </FocusRow>

          <FocusRow name="Dropdown.PopupToken">
            <Dropdown
              menu={{
                items: [
                  { key: '1', label: 'Menu Item 1' },
                  { key: '2', label: 'Menu Item 2' },
                ],
              }}
            >
              <Button>Open Dropdown</Button>
            </Dropdown>
          </FocusRow>

          <FocusRow name="Image.PreviewToken">
            <Image
              width={96}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              preview={{
                getContainer: false,
                open: tokenImagePreviewOpen,
                onOpenChange: setTokenImagePreviewOpen,
              }}
            />
          </FocusRow>

          <FocusRow name="Modal.Token">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </FocusRow>

          <FocusRow name="Drawer.Token">
            <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          </FocusRow>

          <FocusRow name="Notification.Token">
            <Button onClick={showNotification}>Open Notification</Button>
          </FocusRow>

          <FocusRow name="Tour.Token">
            <Button onClick={showTour}>Open Tour</Button>
          </FocusRow>
        </FocusSection>
      </Space>

      <Modal
        getContainer={false}
        title="Modal focus target"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
      >
        Focus the dialog root and close button.
      </Modal>

      <Drawer
        getContainer={false}
        title="Drawer focus target"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        Focus the close button.
      </Drawer>

      <Tour
        open={tourOpen}
        getPopupContainer={(node) => node.parentElement ?? document.body}
        onClose={() => setTourOpen(false)}
        steps={[
          {
            title: 'Tour focus target',
            description: 'Focus the close button.',
            target: () => tourTargetRef.current!,
          },
        ]}
      />
    </>
  );
};

const FocusOutlineDebugDemo = () => {
  const notificationContainerRef = React.useRef<HTMLElement | null>(null);
  const [focusOutline, setFocusOutline] = React.useState(false);

  return (
    <ConfigProvider
      getPopupContainer={getPopupContainer}
      theme={{
        token: {
          focusOutline,
        },
      }}
    >
      <AntdApp
        notification={{
          getContainer: () => notificationContainerRef.current ?? document.body,
        }}
      >
        <FocusOutlineDebugContent
          focusOutline={focusOutline}
          notificationContainerRef={notificationContainerRef}
          setFocusOutline={setFocusOutline}
        />
      </AntdApp>
    </ConfigProvider>
  );
};

export default FocusOutlineDebugDemo;
