import React, { PropTypes } from 'react';
import { Link } from 'bisheng/router';
import { Row, Col, Menu, Icon } from 'antd';
import Article from './Article';
import ComponentDoc from './ComponentDoc';
import * as utils from '../utils';

const SubMenu = Menu.SubMenu;

function getActiveMenuItem(props) {
  const children = props.params.children;
  return (children && children.replace('-cn', '')) ||
    props.location.pathname.replace(/(^\/|-cn$)/g, '');
}

function getModuleData(props) {
  const pathname = props.location.pathname;
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

export default class MainContent extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { openKeys: this.getSideBarOpenKeys(props) || [] };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const openKeys = this.getSideBarOpenKeys(nextProps);
    if (openKeys) {
      this.setState({ openKeys });
    }
  }

  componentDidUpdate() {
    if (!location.hash) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        document.getElementById(decodeURI(location.hash.replace('#', ''))).scrollIntoView();
      }, 10);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleMenuOpenChange = (openKeys) => {
    this.setState({ openKeys });
  }

  getSideBarOpenKeys(nextProps) {
    const pathname = nextProps.location.pathname;
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
    const locale = this.context.intl.locale;
    const key = fileNameToPath(item.filename);
    const text = isTop ?
            item.title[locale] || item.title : [
              <span key="english">{item.title}</span>,
              <span className="chinese" key="chinese">{item.subtitle}</span>,
            ];
    const disabled = item.disabled;
    const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
    const child = !item.link ? (
      <Link
        to={utils.getLocalizedPathname(/^components/.test(url) ? `${url}/` : url, locale === 'zh-CN')}
        disabled={disabled}
      >
        {text}
      </Link>
    ) : (
      <a href={item.link} target="_blank" rel="noopener noreferrer" disabled={disabled} className="menu-item-link-outside">
        {text} <Icon type="export" />
      </a>
    );

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
    const topLevel = this.generateSubMenuItems(menuItems.topLevel);
    const subMenu = Object.keys(menuItems).filter(isNotTopLevel)
      .sort((a, b) => themeConfig.categoryOrder[a] - themeConfig.categoryOrder[b])
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
    const activeMenuItem = getActiveMenuItem(props);
    const menuItems = this.getMenuItems();
    const { prev, next } = this.getFooterNav(menuItems, activeMenuItem);
    const localizedPageData = props.localizedPageData;
    return (
      <div className="main-wrapper">
        <Row>
          <Col lg={4} md={6} sm={24} xs={24}>
            <Menu className="aside-container" mode="inline"
              openKeys={this.state.openKeys}
              selectedKeys={[activeMenuItem]}
              onOpenChange={this.handleMenuOpenChange}
            >
              {menuItems}
            </Menu>
          </Col>
          <Col lg={20} md={18} sm={24} xs={24} className="main-container">
            {
              props.demos ?
                <ComponentDoc {...props} doc={localizedPageData} demos={props.demos} /> :
                <Article {...props} content={localizedPageData} />
            }
          </Col>
        </Row>

        <Row>
          <Col
            lg={{ span: 20, offset: 4 }}
            md={{ span: 18, offset: 6 }}
            sm={24} xs={24}
          >
            <section className="prev-next-nav">
              {
                prev ?
                  React.cloneElement(prev.props.children, { className: 'prev-page' }) :
                  null
              }
              {
                next ?
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
