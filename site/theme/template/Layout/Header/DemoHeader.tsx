/*
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import { Link } from 'bisheng/router';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Popover } from 'antd';
import { Header as VarnishHeader, HeaderColumns, HeaderTitle } from '../../../../../components/header';
import * as utils from '../../utils';

import LogoSrc from './VarnishLogo.svg';

class DemoHeader extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    theme: PropTypes.oneOf(['default', 'dark']),
    direction: PropTypes.string,
  };

  state = {
    menuVisible: false,
  };

  componentDidMount() {
    const { router } = this.context;
    router.listen(this.handleHideMenu);
    const { searchInput } = this;
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput.focus();
      }
    });
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  onMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    });
  };

  render() {
    const { menuVisible } = this.state;
    const { isMobile } = this.context;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const { location } = this.props;

    const pathname = location.pathname.replace(/(^\/|\/$)/g, '');
    const module = pathname.split('/').slice(0, -1).join('/');
    const activeMenuItem = module || 'home';

    const isHome = ['', 'index', 'index-cn'].includes(pathname);

    const headerClassName = classNames({
      clearfix: true,
      'home-header': isHome,
    });

    const menu = (
      <PushedUpMenu
        isMobile={isMobile}
        className="menu-site"
        mode={menuMode}
        selectedKeys={[activeMenuItem]}
        id="nav"
        key="nav"
      >
        {isHome ? null : (
          <MenuItem isMobile={isMobile} key="home" className="hide-in-home-page">
            <CleanLink to={utils.getLocalizedPathname('/')}>
              <FormattedMessage id="app.header.menu.home" />
            </CleanLink>
          </MenuItem>
        )}
        <MenuItem isMobile={isMobile} key="components">
          <CleanLink to={utils.getLocalizedPathname('/components/button/')}>
            <FormattedMessage id="app.header.menu.components" />
          </CleanLink>
        </MenuItem>
      </PushedUpMenu>
    );

    return (
      <VarnishHeader id="header" className={headerClassName}>
        <HeaderColumns gridTemplateColumns="auto auto 1fr auto auto">
          <CleanLink isMobile={isMobile} to={utils.getLocalizedPathname('/')}>
            <Logo />
            <HomeTitle>Varnish</HomeTitle>
          </CleanLink>
          <span>{!isMobile && menu}</span>
          <span />
          <span>
            <GitHubButton key="github" type="stargazers" namespace="allenai" repo="ant-design" />
          </span>
          <span>
            {isMobile && (
              <Popover
                overlayClassName="popover-menu"
                placement="bottomRight"
                content={menu}
                trigger="click"
                visible={menuVisible}
                arrowPointAtCenter
                onVisibleChange={this.onMenuVisibleChange}
              >
                <MenuOutlined className="nav-phone-icon" onClick={this.handleShowMenu} />
              </Popover>
            )}
          </span>
        </HeaderColumns>
      </VarnishHeader>
    );
  }
}

const CleanLink = styled(Link)`
  &&& {
    margin-left: ${({ isMobile }) => (isMobile ? '35px' : null)};
    padding: 0;

    :hover {
      text-decoration: none;
    }
  }
`;

const PushedUpMenu = styled(Menu)`
  margin-top: ${({ isMobile }) => (!isMobile ? '-24px' : null)};
  height: ${({ isMobile }) => (!isMobile ? '55px' : null)};
`;

const MenuItem = styled(Menu.Item)`
  ${CleanLink} {
    line-height: ${({ isMobile }) => (!isMobile ? '79px' : null)};
  }
`;

const HomeTitle = styled(HeaderTitle)`
  vertical-align: middle;
  margin-left: 10px;
`;

const Logo = styled.img.attrs({
  alt: 'logo',
  src: LogoSrc,
})`
  height: 56px;
  width: auto;
`;

export default injectIntl(DemoHeader);
*/
