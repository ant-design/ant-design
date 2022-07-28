import * as React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { DownOutlined } from '@ant-design/icons';
import type { SharedProps } from './interface';

const smallStyle = { fontSize: 12, color: '#777', marginLeft: '0.3em' };

export function getEcosystemGroup(): Exclude<MenuProps['items'], undefined> {
  return [
    {
      label: (
        <a
          href="https://charts.ant.design"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="app.header.menu.charts" />
        </a>
      ),
      key: 'charts',
    },
    {
      label: (
        <a
          href="http://pro.ant.design"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="app.header.menu.pro.v4" />
        </a>
      ),
      key: 'pro',
    },
    {
      label: (
        <a
          href="http://procomponents.ant.design"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="app.header.menu.pro.components" />
        </a>
      ),
      key: 'procomponents',
    },
    {
      label: (
        <a
          href="http://ng.ant.design"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ant Design of Angular
          <span style={smallStyle}>
            (<FormattedMessage id="app.implementation.community" />)
          </span>
        </a>
      ),
      key: 'ng',
    },
    {
      label: (
        <a
          href="http://antdv.com"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ant Design of Vue
          <span style={smallStyle}>
            (<FormattedMessage id="app.implementation.community" />)
          </span>
        </a>
      ),
      key: 'vue',
    },
  ];
}

export default (props: SharedProps) => {
  const menu = <Menu items={getEcosystemGroup()} />;
  const downstyle = props.isRTL ? '-1px 2px 0 0' : '-1px 0 0 2px';
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button size="small" className="header-button">
        <FormattedMessage id="app.header.menu.more" />
        <DownOutlined
          style={{
            fontSize: '9px',
            margin: downstyle,
            verticalAlign: 'middle',
          }}
        />
      </Button>
    </Dropdown>
  );
};
