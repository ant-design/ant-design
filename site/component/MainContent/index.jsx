import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Menu } from '../../../';
import * as utils from '../utils';

export default class MainContent extends React.Component {
  getMenuItems() {
    const props = this.props;
    return props.menuItems.map((item) => {
      const key = item.english.toLowerCase();
      const text = item.chinese || item.english;
      const disabled = item.disabled === 'true';

      const child = !item.link ?
              <Link to={`/${props.category}/${key}`} disabled={disabled}>
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
    });
  }

  render() {
    const activeMenuItem = utils.getActiveMenuItem(this.props);
    const menuItems = this.getMenuItems();
    const { prev, next } = utils.getFooterNav(menuItems, activeMenuItem);

    return (
      <Row className="main-wrapper">
        <Col span="4">
          <Menu mode="inline" selectedKeys={[activeMenuItem]} className="sidebar">
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
