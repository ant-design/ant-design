import * as React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { DownOutlined } from '@ant-design/icons';
import { SharedProps } from './interface';

export function getEcosystemGroup({ isZhCN }: SharedProps): React.ReactNode {
  return [
    <Menu.Item key="charts">
      <a
        href="https://charts.ant.design"
        className="header-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="app.header.menu.charts" />
      </a>
    </Menu.Item>,
    <Menu.Item key="pro">
      <a
        href="http://pro.ant.design"
        className="header-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="app.header.menu.pro.v4" />
      </a>
    </Menu.Item>,
    <Menu.Item key="ng">
      <a
        href="http://ng.ant.design"
        className="header-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ant Design of Angular
      </a>
    </Menu.Item>,
    <Menu.Item key="vue">
      <a
        href="http://vue.ant.design"
        className="header-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ant Design of Vue
      </a>
    </Menu.Item>,
    isZhCN ? (
      <Menu.Item key="course" className="hide-in-home-page">
        <a
          href="https://www.yuque.com/ant-design/course"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ant Design 实战教程
        </a>
      </Menu.Item>
    ) : null,
  ];
}

export default (props: SharedProps) => {
  const menu = <Menu>{getEcosystemGroup(props)}</Menu>;
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
