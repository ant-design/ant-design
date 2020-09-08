import React, { Component } from 'react';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Affix, Tooltip, Avatar, Dropdown } from 'antd';
import { injectIntl } from 'react-intl';
import { LeftOutlined, RightOutlined, ExportOutlined } from '@ant-design/icons';
import ContributorsList from '@qixian.cs/github-contributors-list';
import classNames from 'classnames';
import get from 'lodash/get';
import MobileMenu from 'rc-drawer';

import ThemeIcon from './ThemeIcon';
import Article from './Article';
import PrevAndNext from './PrevAndNext';
import Footer from '../Layout/Footer';
import SiteContext from '../Layout/SiteContext';
import ComponentDoc from './ComponentDoc';
import ComponentOverview from './ComponentOverview';
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
  const excludedSuffix = utils.isZhCN(props.location.pathname) ? 'en-US.md' : 'zh-CN.md';
  let data;
  switch (moduleName) {
    case 'docs/react':
    case 'changelog':
    case 'changelog-cn':
      data = [...props.picked['docs/react'], ...props.picked.changelog];
      break;
    default:
      data = props.picked[moduleName];
  }
  return data.filter(({ meta }) => !meta.filename.endsWith(excludedSuffix));
}

function fileNameToPath(filename) {
  const snippets = filename.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

function getSideBarOpenKeys(nextProps) {
  const { themeConfig } = nextProps;
  const { pathname } = nextProps.location;
  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const moduleData = getModuleData(nextProps);
  const shouldOpenKeys = utils
    .getMenuItems(moduleData, locale, themeConfig.categoryOrder, themeConfig.typeOrder)
    .map(m => (m.title && m.title[locale]) || m.title);
  return shouldOpenKeys;
}

function clearActiveToc() {
  [].forEach.call(document.querySelectorAll('.toc-affix li a'), node => {
    node.className = '';
  });
}

function updateActiveToc(id) {
  const currentNode = document.querySelectorAll(`.toc-affix li a[href="#${id}"]`)[0];
  if (currentNode) {
    clearActiveToc();
    currentNode.className = 'current';
  }
}

class MainContent extends Component {
  static contextType = SiteContext;

  state = {
    openKeys: undefined,
  };

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
    window.addEventListener('hashchange', this.handleHashChange);
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
      clearActiveToc();
      window.scrollTo(0, 0);
    }
    // when subMenu not equal
    if (get(this.props, 'route.path') !== get(prevProps, 'route.path')) {
      // reset menu OpenKeys
      this.handleMenuOpenChange();
    }
  }

  componentWillUnmount() {
    if (this.scroller) {
      this.scroller.destroy();
    }
    window.removeEventListener('load', this.handleInitialHashOnLoad);
    window.removeEventListener('hashchange', this.handleHashChange);
    clearTimeout(this.timeout);
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
      if (menuItem.title === 'Overview' || menuItem.title === '组件总览') {
        return menuItem.children.map(leaf => this.generateMenuItem(false, leaf, footerNavIcons));
      }
      if (menuItem.type === 'type') {
        return (
          <Menu.ItemGroup title={menuItem.title} key={menuItem.title}>
            {menuItem.children
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(leaf => this.generateMenuItem(false, leaf, footerNavIcons))}
          </Menu.ItemGroup>
        );
      }
      if (menuItem.children) {
        return (
          <SubMenu title={menuItem.title} key={menuItem.title}>
            {menuItem.children.map(child => {
              if (child.type === 'type') {
                return (
                  <Menu.ItemGroup title={child.title} key={child.title}>
                    {child.children.map(leaf => this.generateMenuItem(false, leaf, footerNavIcons))}
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

  handleLoad = () => {
    if (window.location.hash) {
      updateActiveToc(window.location.hash.replace(/^#/, ''));
    }
    this.bindScroller();
  };

  handleHashChange = () => {
    this.timeout = setTimeout(() => {
      updateActiveToc(window.location.hash.replace(/^#/, ''));
    });
  };

  bindScroller() {
    if (this.scroller) {
      this.scroller.destroy();
    }
    if (!document.querySelector('.markdown > h2, .code-box')) {
      return;
    }
    // eslint-disable-next-line global-require
    require('intersection-observer');
    // eslint-disable-next-line global-require
    const scrollama = require('scrollama');
    this.scroller = scrollama();
    this.scroller
      .setup({
        step: '.markdown > h2, .code-box', // required
        offset: '10px',
      })
      .onStepEnter(({ element }) => {
        updateActiveToc(element.id);
      });
  }

  generateMenuItem(isTop, item, { before = null, after = null }) {
    const {
      intl: { locale },
      location,
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
    const url = item.filename.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '').toLowerCase();

    const child = !item.link ? (
      <Link
        to={utils.getLocalizedPathname(
          /^components/.test(url) ? `${url}/` : url,
          locale === 'zh-CN',
          location.query,
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
        {text} <ExportOutlined />
        {after}
      </a>
    );

    return (
      <Menu.Item key={key.toLowerCase()} disabled={disabled}>
        {child}
      </Menu.Item>
    );
  }

  getThemeSwitchMenu() {
    const { theme } = this.context;
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <Menu onClick={({ key }) => this.changeThemeMode(key)} selectedKeys={[theme]}>
        {[
          { type: 'default', text: formatMessage({ id: 'app.theme.switch.default' }) },
          { type: 'dark', text: formatMessage({ id: 'app.theme.switch.dark' }) },
          { type: 'compact', text: formatMessage({ id: 'app.theme.switch.compact' }) },
        ].map(({ type, text }) => (
          <Menu.Item key={type}>{text}</Menu.Item>
        ))}
      </Menu>
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

  changeThemeMode = theme => {
    const { setTheme, theme: selectedTheme } = this.context;
    if (selectedTheme !== theme) {
      setTheme(theme);
    }
  };

  renderContributors() {
    const {
      localizedPageData: { meta },
      intl: { formatMessage },
    } = this.props;
    return (
      <ContributorsList
        className="contributors-list"
        fileName={meta.filename}
        renderItem={(item, loading) =>
          loading ? (
            <Avatar style={{ opacity: 0.3 }} />
          ) : (
            <Tooltip
              title={`${formatMessage({ id: 'app.content.contributors' })}: ${item.username}`}
              key={item.username}
            >
              <a
                href={`https://github.com/${item.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar src={item.url}>{item.username}</Avatar>
              </a>
            </Tooltip>
          )
        }
        repo="ant-design"
        owner="ant-design"
      />
    );
  }

  renderMainContent({ theme, setIframeTheme }) {
    const { localizedPageData, demos, location } = this.props;
    if (location.pathname.includes('components/overview')) {
      return (
        <ComponentOverview
          {...this.props}
          doc={localizedPageData}
          componentsData={getModuleData(this.props).filter(
            ({ meta }) => meta.category === 'Components',
          )}
        />
      );
    }
    if (demos) {
      return (
        <>
          <ComponentDoc
            {...this.props}
            doc={localizedPageData}
            demos={demos}
            theme={theme}
            setIframeTheme={setIframeTheme}
          />
          {this.renderContributors()}
        </>
      );
    }
    return (
      <>
        <Article {...this.props} content={localizedPageData} />
        {this.renderContributors()}
      </>
    );
  }

  render() {
    const { demos, location } = this.props;
    const { openKeys } = this.state;
    const { isMobile, theme, setIframeTheme } = this.context;
    const activeMenuItem = this.getActiveMenuItem();
    const menuItems = this.getMenuItems();
    const menuItemsForFooterNav = this.getMenuItems({
      before: <LeftOutlined className="footer-nav-icon-before" />,
      after: <RightOutlined className="footer-nav-icon-after" />,
    });
    const { prev, next } = this.getFooterNav(menuItemsForFooterNav, activeMenuItem);
    const mainContainerClass = classNames('main-container', {
      'main-container-component': !!demos,
    });
    const menuChild = (
      <Menu
        inlineIndent={30}
        className="aside-container menu-site"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={[activeMenuItem]}
        onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems}
      </Menu>
    );
    const componentPage = /^\/?components/.test(location.pathname);
    return (
      <div className="main-wrapper">
        <Row>
          {isMobile ? (
            <MobileMenu key="Mobile-menu" wrapperClassName="drawer-wrapper">
              {menuChild}
            </MobileMenu>
          ) : (
            <Col xxl={4} xl={5} lg={6} md={6} sm={24} xs={24} className="main-menu">
              <Affix>
                <section className="main-menu-inner">{menuChild}</section>
              </Affix>
            </Col>
          )}
          <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
            <section className={mainContainerClass}>
              {this.renderMainContent({ theme, setIframeTheme })}
            </section>
            {componentPage && (
              <div className="fixed-widgets">
                <Dropdown overlay={this.getThemeSwitchMenu()} placement="topCenter">
                  <Avatar className="fixed-widgets-avatar" size={44} icon={<ThemeIcon />} />
                </Dropdown>
              </div>
            )}
            <PrevAndNext prev={prev} next={next} />
            <Footer />
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectIntl(MainContent);
