import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';
import * as utils from '../utils';
const SubMenu = Menu.SubMenu;

function dashed(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '-');
}

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.generateMenuItem = this.generateMenuItem.bind(this);
  }

  generateMenuItem(item) {
    const key = dashed(item.english);
    const text = item.chinese || item.english;
    const disabled = item.disabled === 'true';

    const child = !item.link ?
            <Link to={`/${this.props.category}/${key}`} disabled={disabled}>
              { text }
            </Link> :
            <a href={item.link} target="_blank" disabled={disabled}>
              { text }
            </a>;

    return (
        <Menu.Item key={key} disabled={disabled}>
        { child }
      </Menu.Item>
    );
  }

  getMenuItems() {
    const props = this.props;
    const menuItems = props.menuItems;
    const topLevel = menuItems.topLevel.map(this.generateMenuItem);
    const subMenu = Object.keys(menuItems).filter((category) => category !== 'topLevel')
            .map((category) => {
              const subMenuItems = menuItems[category].map(this.generateMenuItem);

              return (
                <SubMenu title={<h4>{category}</h4>} key={category}>
                  { subMenuItems }
                </SubMenu>
              );
            });

    return [...topLevel, ...subMenu];
  }

  render() {
    const activeMenuItem = utils.getActiveMenuItem(this.props);
    const menuItems = this.getMenuItems();
    const { prev, next } = utils.getFooterNav(menuItems, activeMenuItem);

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu className="sidebar" mode="inline"
            defaultOpenKeys={Object.keys(this.props.menuItems)}
            selectedKeys={[activeMenuItem]}>
            { menuItems }
          </Menu>
        </Col>
        <Col span="20" className="main-container">
          { this.props.children }
          <section className="prev-next-nav">
            { !!prev ? React.cloneElement(prev.props.children, { className: 'prev-page' }) : null }
            { !!next ? React.cloneElement(next.props.children, { className: 'next-page' }) : null }
          </section>
        </Col>
      </Row>
    );
  }
}
