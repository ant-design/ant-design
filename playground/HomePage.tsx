import React from 'react';
import { Tooltip, Form, Tree, Checkbox, Card, FloatButton, Popover, Switch, theme } from 'antd';
// eslint-disable-next-line import/no-unresolved
import autoRoutes from '~react-pages';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { useUrl } from './Provider';

const { DirectoryTree } = Tree;

const dataTransform = (data: any) => {
  const changeData = (d: any, level = 0, prefix = '') => {
    const key = `${prefix}/${d.path}`;
    const clonedData: any = {
      ...d,
      key,
    };

    if (Array.isArray(clonedData.children)) {
      clonedData.children = clonedData.children.map((child: any) =>
        changeData(child, level + 1, key),
      );
    } else {
      clonedData.isLeaf = true;
    }

    return clonedData;
  };
  return data.map((d: any) => changeData(d));
};

function useConfig() {
  const [config, setConfig] = useUrl({
    theme: [], // theme algorithm
    cssVar: false,
    hashed: true,
  });

  const configHolder = (
    <Card title="Config">
      <Form
        initialValues={config}
        onValuesChange={(_, allValues) => {
          setConfig(allValues);
        }}
        layout="vertical"
      >
        <Form.Item name="theme" label="Theme">
          <Checkbox.Group options={['light', 'dark', 'compact']} />
        </Form.Item>
        <Form.Item name="cssVar" label="cssVar" layout="horizontal">
          <Switch size="small" />
        </Form.Item>
        <Form.Item name="hashed" label="hashed" layout="horizontal">
          <Switch size="small" />
        </Form.Item>
      </Form>
    </Card>
  );

  return [config, configHolder] as const;
}

function HomePage() {
  const { token } = theme.useToken();
  const [, configHolder] = useConfig();
  const navigate = useNavigate();

  const { search, origin } = new URL(window.location.href);

  const treeData = React.useMemo(() => dataTransform(autoRoutes), []);

  const titleRender = (nodeData: any) => {
    const title = nodeData.path;
    if (nodeData.isLeaf) {
      return (
        <Tooltip title="Double click to preview directly" placement="right">
          <span
            onDoubleClick={() => {
              navigate(nodeData.key + search);
            }}
          >
            {title}
          </span>
        </Tooltip>
      );
    }
    return title;
  };

  const [selectedKey, setSelectedKeys] = React.useState<string>('/button/demo/basic');
  const previewUrl = `${origin}${selectedKey}${search || ''}`;

  return (
    <>
      <div
        style={{
          height: 'calc(100dvh - 48px)',
          width: 'calc(100vw - 24px)',
        }}
      >
        <div style={{ width: 320, height: '100%', overflowY: 'auto' }}>
          <DirectoryTree
            treeData={treeData}
            fieldNames={{ title: 'path' }}
            titleRender={titleRender}
            defaultExpandedKeys={treeData.map((d: any) => d.key)}
            onSelect={(selectedKeys, info) => {
              if (info.node.isLeaf && selectedKeys?.[0]) {
                setSelectedKeys((selectedKeys as any)[0]);
              }
            }}
          />
        </div>
        {selectedKey && (
          <iframe
            title="preview"
            style={{
              all: 'unset',
              height: 'calc(100% - 48px)',
              width: 'calc(100% - (24px + 320px))',
              position: 'absolute',
              borderRadius: token.borderRadius,
              border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
              right: 12,
              top: 24,
            }}
            src={previewUrl}
          />
        )}
      </div>
      <Popover content={configHolder} defaultOpen>
        <FloatButton icon={<SettingOutlined />} />
      </Popover>
    </>
  );
}

export default HomePage;
