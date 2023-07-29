import React from 'react';
import { Avatar, ConfigProvider, Divider, List, Typography } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const data1 = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        List: {
          headerBg: 'pink',
          footerBg: 'pink',
          emptyTextPadding: 32,
          itemPadding: '26px',
          itemPaddingSM: '16px',
          itemPaddingLG: '36px',
          metaMarginBottom: 20,
          avatarMarginRight: 20,
          titleMarginBottom: 10,
          descriptionFontSize: 20,
        },
      },
    }}
  >
    <Divider orientation="left">Default Size</Divider>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
    <Divider orientation="left">Small Size</Divider>
    <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    <Divider orientation="left">Large Size</Divider>
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    <Divider orientation="left">Meta</Divider>
    <List
      itemLayout="horizontal"
      dataSource={data1}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
    <Divider orientation="left">Vertical</Divider>
    <List
      itemLayout="vertical"
      dataSource={data1}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
    <Divider orientation="left">Empty Text</Divider>
    <List />
  </ConfigProvider>
);

export default App;
