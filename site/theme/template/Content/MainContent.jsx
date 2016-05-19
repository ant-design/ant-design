import React from 'react';
import { Link } from 'react-router';
import scrollIntoView from 'dom-scroll-into-view';
import { Row, Col, Menu } from 'antd';
import Article from './Article';
import * as utils from '../utils';
import config from '../../';
const SubMenu = Menu.SubMenu;

export default class MainContent extends React.Component {
  static contextTypes = {
    intl: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.scrollToAnchor(this.props);
  }

  shouldComponentUpdate(nextProps) {
    this.scrollToAnchor(nextProps);

    const pathname = this.props.location.pathname;
    return pathname !== nextProps.location.pathname ||
      /^\/components\//i.test(pathname);
  }

  scrollToAnchor(props) {
    const scrollTo = props.location.query.scrollTo;
    if (scrollTo !== undefined) {
      const target = document.getElementById(scrollTo);

      if (target !== null) {
        scrollIntoView(
          target,
          document,
          { alignWithTop: true, onlyScrollIfNeeded: false }
        );
      }
    } else {
      scrollIntoView(document.body, document, { alignWithTop: true });
    }
  }

  getActiveMenuItem(props) {
    return props.params.children;
  }

  fileNameToPath(filename) {
    const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
    return snippets[snippets.length - 1];
  }

  generateMenuItem(isTop, item) {
    const key = this.fileNameToPath(item.filename);
    const text = isTop ?
            item.title || item.chinese || item.english : [
              <span key="english">{item.title || item.english}</span>,
              <span className="chinese" key="chinese">{item.subtitle || item.chinese}</span>,
            ];
    const disabled = item.disabled;
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '');
    const child = !item.link ?
      <Link to={url} disabled={disabled}>
        {text}
      </Link> :
      <a href={item.link} target="_blank" disabled={disabled}>
        {text}
      </a>;

    return (
      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }

  isNotTopLevel(level) {
    return level !== 'topLevel';
  }

  generateSubMenuItems(obj) {
    const topLevel = (obj.topLevel || []).map(this.generateMenuItem.bind(this, true));
    const itemGroups = Object.keys(obj).filter(this.isNotTopLevel)
            .sort((a, b) => {
              return config.typeOrder[a] - config.typeOrder[b];
            })
            .map((type, index) => {
              const groupItems = obj[type].sort((a, b) => {
                return (a.title || a.english).charCodeAt(0) -
                  (b.title || b.english).charCodeAt(0);
              }).map(this.generateMenuItem.bind(this, false));

              return (
                <Menu.ItemGroup title={type} key={index}>
                  {groupItems}
                </Menu.ItemGroup>
              );
            });
    return [...topLevel, ...itemGroups];
  }

  getMenuItems() {
    const props = this.props;
    // TODO: data
    const menuItems = utils.getMenuItems(props.data.docs.resource, this.context.intl.locale);
    const topLevel = this.generateSubMenuItems(menuItems.topLevel);
    const subMenu = Object.keys(menuItems).filter(this.isNotTopLevel)
            .sort((a, b) => {
              return config.categoryOrder[a] - config.categoryOrder[b];
            })
            .map((category) => {
              const subMenuItems = this.generateSubMenuItems(menuItems[category]);

              return (
                <SubMenu title={<h4>{category}</h4>} key={category}>
                  {subMenuItems}
                </SubMenu>
              );
            });

    return [...topLevel, ...subMenu];
  }

  flattenMenu(menu) {
    if (menu.type === Menu.Item) {
      return menu;
    }

    if (Array.isArray(menu)) {
      return menu.reduce((acc, item) => acc.concat(this.flattenMenu(item)), []);
    }

    return this.flattenMenu(menu.props.children);
  }

  getFooterNav(menuItems, activeMenuItem) {
    const menuItemsList = this.flattenMenu(menuItems);
    let activeMenuItemIndex = -1;
    menuItemsList.forEach((menuItem, i) => {
      if (menuItem.key === activeMenuItem) {
        activeMenuItemIndex = i;
      }
    });
    const prev = menuItemsList[activeMenuItemIndex - 1];
    const next = menuItemsList[activeMenuItemIndex + 1];
    return { prev, next };
  }

  render() {
    const props = this.props;
    const activeMenuItem = this.getActiveMenuItem(props);
    const menuItems = this.getMenuItems();
    const { prev, next } = this.getFooterNav(menuItems, activeMenuItem);

    const locale = this.context.intl.locale;
    const moduleData = props.utils.get(props.data, props.location.pathname.split('/').slice(0, 2));
    return (
      <div className="main-wrapper">
        <Row>
          <Col lg={4} md={6} sm={24} xs={24}>
            <Menu className="aside-container" mode="inline"
              defaultOpenKeys={Object.keys(utils.getMenuItems(moduleData, locale))}
              selectedKeys={[activeMenuItem]}>
              {menuItems}
            </Menu>
          </Col>
          <Col lg={20} md={18} sm={24} xs={24} className="main-container">
            <Article {...props} content={props.pageData[locale] || props.pageData} />
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 20, offset: 4 }}
            md={{ span: 18, offset: 6 }}
            sm={24} xs={24}>
            <section className="prev-next-nav">
              {
                !!prev ?
                  React.cloneElement(prev.props.children, { className: 'prev-page' }) :
                  null
              }
              {
                !!next ?
                  React.cloneElement(next.props.children, { className: 'next-page' }) :
                  null
              }
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
