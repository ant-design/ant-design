import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import type { FloatButtonProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorBorder}`,
    borderRadius: 8,
    padding: '6px 16px',
    height: 'auto',
  },
  content: {
    color: token.colorText,
  },
}));

const stylesObject: FloatButtonProps['styles'] = {
  root: {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
  },
};

const stylesFn: FloatButtonProps['styles'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: {
        backgroundColor: '#171717',
      },
      content: {
        color: '#fff',
      },
    } satisfies FloatButtonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 + 70 }}>
      <FloatButton
        type="primary"
        classNames={classNames}
        href="https://ant.design/index-cn"
        styles={stylesFn}
        tooltip={<div>custom style class</div>}
      />
      <FloatButton
        type="default"
        classNames={classNames}
        styles={stylesObject}
        icon={<QuestionCircleOutlined />}
      />
    </FloatButton.Group>
  );
};

export default App;
