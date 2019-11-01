import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Icon, Affix } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import get from 'lodash/get';
import MobileMenu from 'rc-drawer';
import Article from './Article';
import PrevAndNext from './PrevAndNext';
import Footer from '../Layout/Footer';
import ComponentDoc from './ComponentDoc';
import * as utils from '../utils';

const { SubMenu } = Menu;

function getModuleData(props) {
  const { pathname } = props.location;
  const moduleName = /^\/?components/.test(pathname)
    ? 'components'
    : pathname
        .split('/')
        .filter(item => item)
        .slice(0, 2)
        .join('/');
  const moduleData =
    moduleName === 'components' ||
    moduleName === 'docs/react' ||
    moduleName === 'changelog' ||
    moduleName === 'changelog-cn'
      ? [...props.picked.components, ...props.picked['docs/react'], ...props.picked.changelog]
      : props.picked[moduleName];
  const excludedSuffix = utils.isZhCN(props.location.pathname) ? 'en-US.md' : 'zh-CN.md';
  return moduleData.filter(({ meta }) => !meta.filename.endsWith(excludedSuffix));
}

function fileNameToPath(filename) {
  const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

const getSideBarOpenKeys = nextProps => {
  const { themeConfig } = nextProps;
  const { pathname } = nextProps.location;
  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const moduleData = getModuleData(nextProps);
  const shouldOpenKeys = utils
    .getMenuItems(moduleData, locale, themeConfig.categoryOrder, themeConfig.typeOrder)
    .map(m => (m.title && m.title[locale]) || m.title);
  return shouldOpenKeys;
};

const getSubMenuTitle = menuItem => {
  if (menuItem.title !== 'Components') {
    return menuItem.title;
  }
  let count = 0;
  menuItem.children.forEach(item => {
    if (item.children) {
      count += item.children.length;
    }
  });
  return (
    <h4>
      <FormattedMessage id="app.header.menu.components" />
      <span className="menu-antd-components-count">{count}</span>
    </h4>
  );
};

class MainContent extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

  state = {
    openKeys: undefined,
  };

  componentDidMount() {
    this.componentDidUpdate();
    window.addEventListener('load', this.handleInitialHashOnLoad);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.openKeys) {
      return {
        ...state,
        openKeys: getSideBarOpenKeys(props),
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation = {} } = prevProps || {};
    if (!prevProps || prevLocation.pathname !== location.pathname) {
      this.bindScroller();
    }
    if (!window.location.hash && prevLocation.pathname !== location.pathname) {
      window.scrollTo(0, 0);
    }
    // when subMenu not equal
    if (get(this.props, 'route.path') !== get(prevProps, 'route.path')) {
      // reset menu OpenKeys
      this.handleMenuOpenChange();
    }
  }

  componentWillUnmount() {
    this.scroller.destroy();
    window.removeEventListener('load', this.handleInitialHashOnLoad);
  }

  getMenuItems(footerNavIcons = {}) {
    const {
      themeConfig,
      intl: { locale },
    } = this.props;
    const moduleData = getModuleData(this.props);
    const menuItems = utils.getMenuItems(
      moduleData,
      locale,
      themeConfig.categoryOrder,
      themeConfig.typeOrder,
    );
    return menuItems.map(menuItem => {
      if (menuItem.children) {
        return (
          <SubMenu title={getSubMenuTitle(menuItem)} key={menuItem.title}>
            {menuItem.children.map(child => {
              if (child.type === 'type') {
                return (
                  <Menu.ItemGroup title={child.title} key={child.title}>
                    {child.children
                      .sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
                      .map(leaf => this.generateMenuItem(false, leaf, footerNavIcons))}
                  </Menu.ItemGroup>
                );
              }
              return this.generateMenuItem(false, child, footerNavIcons);
            })}
          </SubMenu>
        );
      }
      return this.generateMenuItem(true, menuItem, footerNavIcons);
    });
  }

  getFooterNav(menuItems, activeMenuItem) {
    const menuItemsList = this.flattenMenu(menuItems);
    let activeMenuItemIndex = -1;
    menuItemsList.forEach((menuItem, i) => {
      if (menuItem && menuItem.key === activeMenuItem) {
        activeMenuItemIndex = i;
      }
    });
    const prev = menuItemsList[activeMenuItemIndex - 1];
    const next = menuItemsList[activeMenuItemIndex + 1];
    return { prev, next };
  }

  getActiveMenuItem() {
    const {
      params: { children },
      location,
    } = this.props;
    return (
      (children && children.replace('-cn', '')) || location.pathname.replace(/(^\/|-cn$)/g, '')
    );
  }

  handleMenuOpenChange = openKeys => {
    this.setState({ openKeys });
  };

  handleInitialHashOnLoad = () => {
    setTimeout(() => {
      if (!window.location.hash) {
        return;
      }
      const element = document.getElementById(
        decodeURIComponent(window.location.hash.replace('#', '')),
      );
      if (element && document.documentElement.scrollTop === 0) {
        element.scrollIntoView();
      }
    }, 0);
  };

  bindScroller() {
    if (this.scroller) {
      this.scroller.destroy();
    }
    if (!document.querySelector('.markdown > h2, .code-box')) {
      return;
    }
    require('intersection-observer'); // eslint-disable-line
    const scrollama = require('scrollama'); // eslint-disable-line
    this.scroller = scrollama();
    this.scroller
      .setup({
        step: '.markdown > h2, .code-box', // required
        offset: 0,
      })
      .onStepEnter(({ element }) => {
        [].forEach.call(document.querySelectorAll('.toc-affix li a'), node => {
          node.className = ''; // eslint-disable-line
        });
        const currentNode = document.querySelectorAll(`.toc-affix li a[href="#${element.id}"]`)[0];
        if (currentNode) {
          currentNode.className = 'current';
        }
      });
  }

  generateMenuItem(isTop, item, { before = null, after = null }) {
    const {
      intl: { locale },
    } = this.props;
    const key = fileNameToPath(item.filename);
    if (!item.title) {
      return null;
    }
    const title = item.title[locale] || item.title;
    const text = isTop
      ? title
      : [
          <span key="english">{title}</span>,
          <span className="chinese" key="chinese">
            {item.subtitle}
          </span>,
        ];
    const { disabled } = item;
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
    const child = !item.link ? (
      <Link
        to={utils.getLocalizedPathname(
          /^components/.test(url) ? `${url}/` : url,
          locale === 'zh-CN',
        )}
        disabled={disabled}
      >
        {before}
        {text}
        {after}
      </Link>
    ) : (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        disabled={disabled}
        className="menu-item-link-outside"
      >
        {before}
        {text} <Icon type="export" />
        {after}
      </a>
    );

    return (
      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }

  flattenMenu(menu) {
    if (!menu) {
      return null;
    }
    if (menu.type && menu.type.isMenuItem) {
      return menu;
    }
    if (Array.isArray(menu)) {
      return menu.reduce((acc, item) => acc.concat(this.flattenMenu(item)), []);
    }
    return this.flattenMenu((menu.props && menu.props.children) || menu.children);
  }

  render() {
    const { isMobile } = this.context;
    const { openKeys } = this.state;
    const { localizedPageData, demos } = this.props;
    const activeMenuItem = this.getActiveMenuItem();
    const menuItems = this.getMenuItems();
    const menuItemsForFooterNav = this.getMenuItems({
      before: <Icon className="footer-nav-icon-before" type="left" />,
      after: <Icon className="footer-nav-icon-after" type="right" />,
    });
    const { prev, next } = this.getFooterNav(menuItemsForFooterNav, activeMenuItem);
    const mainContainerClass = classNames('main-container', {
      'main-container-component': !!demos,
    });
    const menuChild = (
      <Menu
        inlineIndent={40}
        className="aside-container menu-site"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[activeMenuItem]}
        onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems}
      </Menu>
    );
    return (
      <div className="main-wrapper">
        <Row>
          {isMobile ? (
            <MobileMenu
              iconChild={[
                <Icon key="menu-unfold" type="menu-unfold" />,
                <Icon key="menu-fold" type="menu-fold" />,
              ]}
              key="Mobile-menu"
              wrapperClassName="drawer-wrapper"
            >
              {menuChild}
            </MobileMenu>
          ) : (
            <Col xxl={4} xl={5} lg={6} md={24} sm={24} xs={24} className="main-menu">
              <Affix>
                <section className="main-menu-inner">{menuChild}</section>
              </Affix>
            </Col>
          )}
          <Col xxl={20} xl={19} lg={18} md={24} sm={24} xs={24}>
            <section className={mainContainerClass}>
              {demos ? (
                <ComponentDoc {...this.props} doc={localizedPageData} demos={demos} />
              ) : (
                <Article {...this.props} content={localizedPageData} />
              )}
            </section>
            <PrevAndNext prev={prev} next={next} />
            <Footer />
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectIntl(MainContent);
