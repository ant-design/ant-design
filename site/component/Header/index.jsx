import React from 'react';
import { Link } from 'react-router';
import { Select, Menu } from '../../../';
const Option = Select.Option;

import './index.less';

import componentsList from '../../../_site/data/components-list';
export default function Header() {
  const options = [];
  for (let key of Object.keys(componentsList)) {
    componentsList[key].forEach((item) => {
      options.push(<Option value={item.english.toLowerCase()} key={key}>
                     {item.english}
                   </Option>);
    });
  }

  return (<header id="header" className="clearfix">
    <Link to="/" id="logo">
      <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
      <span>Ant Design</span>
    </Link>
    <div id="search-box">
      <Select combobox searchPlaceholder="搜索组件...">
        {options}
      </Select>
    </div>
    <Menu mode="horizontal" defaultSelectedKeys={['home']} id="nav">
      <Menu.Item key="home">
        <Link to="/">
          首页
        </Link>
      </Menu.Item>
      <Menu.Item key="practice">
        实践
      </Menu.Item>
      <Menu.Item key="pattern">
        模式
      </Menu.Item>
      <Menu.Item key="components">
        <Link to="/components">
          组件
        </Link>
      </Menu.Item>
      <Menu.Item key="design">
        <Link to="/spec">
          语言
        </Link>
      </Menu.Item>
      <Menu.Item key="resource">
        <Link to="/resource">
          资源
        </Link>
      </Menu.Item>
    </Menu>
  </header>);
}
