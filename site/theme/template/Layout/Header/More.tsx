import * as React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { DownOutlined } from '@ant-design/icons';
import { SharedProps } from './interface';

export default ({ isZhCN }: SharedProps) => {
  const menu = (
    <Menu>
      <Menu.ItemGroup title={<FormattedMessage id="app.header.menu.ecosystem" />}>
        <Menu.Item key="pro">
          <a
            href="http://pro.ant.design"
            className="header-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="app.header.menu.pro.v4" />
          </a>
        </Menu.Item>
        <Menu.Item key="ng">
          <a
            href="http://ng.ant.design"
            className="header-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Design of Angular
          </a>
        </Menu.Item>
        <Menu.Item key="vue">
          <a
            href="http://vue.ant.design"
            className="header-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Design of Vue
          </a>
        </Menu.Item>
        {isZhCN ? (
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
        ) : null}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button size="small" className="header-button">
        <FormattedMessage id="app.header.menu.more" />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

// .menu-site-more {
//   float: right;
//   height: auto;
//   line-height: 24px;
//   margin-top: 19px;

//   &,
//   .ant-menu-submenu {
//     border-bottom: none !important;

//     .ant-menu-submenu-title {
//       line-height: 24px;
//       padding: 0 0 0 16px;
//     }
//   }

//   .header-button {
//     .anticon {
//       margin: 0 0 0 8px;
//     }
//   }
// }
