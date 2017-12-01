import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Icon } from 'antd';
import classNames from 'classnames';
import MobileMenu from 'rc-drawer-menu';
import Article from './Article';
import ComponentDoc from './ComponentDoc';
import * as utils from '../utils';

const { SubMenu } = Menu;

function getActiveMenuItem(props) {
  const { children } = props.params;
  return (children && children.replace('-cn', '')) ||
    props.location.pathname.replace(/(^\/|-cn$)/g, '');
}

function getModuleData(props) {
  const { pathname } = props.location;
  const moduleName = /^\/?components/.test(pathname) ?
    'components' : pathname.split('/').filter(item => item).slice(0, 2).join('/');
  const moduleData = moduleName === 'components' || moduleName === 'docs/react' ||
    moduleName === 'changelog' || moduleName === 'changelog-cn' ?
    [...props.picked.components, ...props.picked['docs/react'], ...props.picked.changelog] :
    props.picked[moduleName];
  const excludedSuffix = utils.isZhCN(props.location.pathname) ? 'en-US.md' : 'zh-CN.md';
  return moduleData.filter(({ meta }) => !meta.filename.endsWith(excludedSuffix));
}

function fileNameToPath(filename) {
  const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

function isNotTopLevel(level) {
  return level !== 'topLevel';
}

let isMobile;
utils.enquireScreen((b) => {
  isMobile = b;
});

export default class MainContent extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getSideBarOpenKeys(props) || [],
      isMobile,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
    utils.enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const openKeys = this.getSideBarOpenKeys(nextProps);
    if (openKeys) {
      this.setState({ openKeys });
    }
  }

  componentDidUpdate() {
    if (!window.location.hash) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      window.location.hash = window.location.hash;
    }, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleMenuOpenChange = (openKeys) => {
    this.setState({ openKeys });
  }

  getSideBarOpenKeys(nextProps) {
    const { pathname } = nextProps.location;
    const prevModule = this.currentModule;
    this.currentModule = pathname.replace(/^\//).split('/')[1] || 'components';
    if (this.currentModule === 'react') {
      this.currentModule = 'components';
    }
    const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
    if (prevModule !== this.currentModule) {
      const moduleData = getModuleData(nextProps);
      const shouldOpenKeys = Object.keys(utils.getMenuItems(moduleData, locale));
      return shouldOpenKeys;
    }
  }

  generateMenuItem(isTop, item) {
    const { locale } = this.context.intl;
    const key = fileNameToPath(item.filename);
    const text = isTop ?
      item.title[locale] || item.title : [
        <span key="english">{item.title}</span>,
        <span className="chinese" key="chinese">{item.subtitle}</span>,
      ];
    const { disabled } = item;
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
    const child = !item.link ? (
      <Link
        to={utils.getLocalizedPathname(/^components/.test(url) ? `${url}/` : url, locale === 'zh-CN')}
        disabled={disabled}
      >
        {text}
      </Link>) : (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          disabled={disabled}
          className="menu-item-link-outside"
        >
          {text} <Icon type="export" />
        </a>);

    return (
      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }

  generateSubMenuItems(obj) {
    const { themeConfig } = this.props;
    const topLevel = (obj.topLevel || []).map(this.generateMenuItem.bind(this, true));
    const itemGroups = Object.keys(obj).filter(isNotTopLevel)
      .sort((a, b) => themeConfig.typeOrder[a] - themeConfig.typeOrder[b])
      .map((type) => {
        const groupItems = obj[type].sort((a, b) => {
          return a.title.charCodeAt(0) -
            b.title.charCodeAt(0);
        }).map(this.generateMenuItem.bind(this, false));
        return (
          <Menu.ItemGroup title={type} key={type}>
            {groupItems}
          </Menu.ItemGroup>
        );
      });
    return [...topLevel, ...itemGroups];
  }

  getMenuItems() {
    const { themeConfig } = this.props;
    const moduleData = getModuleData(this.props);
    const menuItems = utils.getMenuItems(
      moduleData, this.context.intl.locale
    );
    const categories = Object.keys(menuItems).filter(isNotTopLevel);
    const topLevel = this.generateSubMenuItems(menuItems.topLevel);
    const result = [...topLevel];
    result.forEach((item, i) => {
      const insertCategory = categories.filter(
        cat => (themeConfig.categoryOrder[cat] ? themeConfig.categoryOrder[cat] <= i : i === result.length - 1)
      )[0];
      if (insertCategory) {
        const target = (
          <SubMenu title={<h4>{insertCategory}</h4>} key={insertCategory}>
            {this.generateSubMenuItems(menuItems[insertCategory])}
          </SubMenu>
        );
        result.splice(i + 1, 0, target);
        categories.splice(categories.indexOf(insertCategory), 1);
      }
    });
    return result;
  }

  flattenMenu(menu) {
    if (menu && menu.type && menu.type.isMenuItem) {
      return menu;
    }
    if (Array.isArray(menu)) {
      return menu.reduce((acc, item) => acc.concat(this.flattenMenu(item)), []);
    }
    return this.flattenMenu((menu.props && menu.props.children) || menu.children);
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

  render() {
    const { props } = this;
    const activeMenuItem = getActiveMenuItem(props);
    const menuItems = this.getMenuItems();
    const { prev, next } = this.getFooterNav(menuItems, activeMenuItem);
    const { localizedPageData } = props;
    const mainContainerClass = classNames('main-container', {
      'main-container-component': !!props.demos,
    });
    const menuChild = (
      <Menu
        inlineIndent="40"
        className="aside-container menu-site"
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[activeMenuItem]}
        onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems}
      </Menu>);
    return (
      <div className="main-wrapper">
        <Row>
          {this.state.isMobile ? (
            <MobileMenu
              iconChild={[<Icon type="menu-unfold" />, <Icon type="menu-fold" />]}
              key="mobile-menu"
              wrapperClassName="drawer-wrapper"
            >
              {menuChild}
            </MobileMenu>) : (
              <Col xxl={4} xl={5} lg={6} md={24} sm={24} xs={24} className="main-menu">
                {menuChild}
              </Col>
            )
          }
          <Col xxl={20} xl={19} lg={18} md={24} sm={24} xs={24} className={mainContainerClass}>
            {
              props.demos ?
                <ComponentDoc {...props} doc={localizedPageData} demos={props.demos} /> :
                <Article {...props} content={localizedPageData} />
            }
          </Col>
        </Row>

        <Row>
          <Col
            xxl={{ span: 20, offset: 4 }}
            xl={{ span: 19, offset: 5 }}
            lg={{ span: 18, offset: 6 }}
            md={24}
            sm={24}
            xs={24}
          >
            <section className="prev-next-nav">
              {
                prev ?
                  React.cloneElement(prev.props.children || prev.children[0], { className: 'prev-page' }) :
                  null
              }
              {
                next ?
                  React.cloneElement(next.props.children || next.children[0], { className: 'next-page' }) :
                  null
              }
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
