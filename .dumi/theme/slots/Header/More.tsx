import { DownOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { FormattedMessage } from 'dumi';
import React from 'react';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import type { SharedProps } from './interface';

const useStyle = createStyles(({ css, token }) => ({
  smallStyle: css`
    font-size: 12px;
    color: #777;
    margin-left: 0.3em;
  `,
  down: css`
    color: ${token.colorTextQuaternary};
  `,
  downOutlined: css`
    font-size: 9px;
    margin: -1px 0 0 2px;
    vertical-align: middle;
  `,
  downOutlinedRTL: css`
    font-size: 9px;
    margin: -1px 2px 0 0;
    vertical-align: middle;
  `,
}));

const Community: React.FC = () => {
  const { styles } = useStyle();
  return (
    <span className={styles.smallStyle}>
      (<FormattedMessage id="app.implementation.community" />)
    </span>
  );
};

export const getEcosystemGroup = (): Exclude<MenuProps['items'], undefined> => [
  {
    label: (
      <a href="https://charts.ant.design" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="app.header.menu.charts" />
      </a>
    ),
    key: 'charts',
  },
  {
    label: (
      <a href="http://pro.ant.design" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="app.header.menu.pro.v4" />
      </a>
    ),
    key: 'pro',
  },
  {
    label: (
      <a href="http://procomponents.ant.design" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="app.header.menu.pro.components" />
      </a>
    ),
    key: 'procomponents',
  },
  {
    label: (
      <a href="http://ng.ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design of Angular
        <Community />
      </a>
    ),
    key: 'ng',
  },
  {
    label: (
      <a href="http://antdv.com" target="_blank" rel="noopener noreferrer">
        Ant Design of Vue
        <Community />
      </a>
    ),
    key: 'vue',
  },
];

const More: React.FC<SharedProps> = ({ isRTL }) => {
  const { styles } = useStyle();
  return (
    <Dropdown menu={{ items: getEcosystemGroup() }} placement="bottomRight">
      <Button size="small">
        <FormattedMessage id="app.header.menu.more" />
        <DownOutlined
          className={classnames(isRTL ? styles.downOutlinedRTL : styles.downOutlined, styles.down)}
        />
      </Button>
    </Dropdown>
  );
};

export default More;
