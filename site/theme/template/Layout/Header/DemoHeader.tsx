import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'bisheng/router';

import * as utils from '../../utils';
import Github from './Github';
import SiteContext from '../SiteContext';
import VarnishHeader from '../../../../../components/header';
import Popover from '../../../../../components/popover';
import Menu from '../../../../../components/menu';

import LogoSrc from './VarnishLogo.svg';

const { HeaderColumns, HeaderTitle } = VarnishHeader;

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

export interface HeaderProps {
  location: { pathname: string };
}

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
}

class DemoHeader extends React.Component<HeaderProps, HeaderState> {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    menuVisible: false,
    windowWidth: 1400,
  };

  componentDidMount() {
    const { router } = this.context;
    router.listen(this.handleHideMenu);

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

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

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  render() {
    return (
      <SiteContext.Consumer>
        {({ isMobile }) => {
          const { menuVisible, windowWidth } = this.state;
          const { location } = this.props;

          const pathname = location.pathname.replace(/(^\/|\/$)/g, '');

          const isHome = ['', 'index', 'index-cn'].includes(pathname);

          let responsive: null | 'narrow' | 'crowded' = null;
          if (windowWidth < RESPONSIVE_XS) {
            responsive = 'crowded';
          } else if (windowWidth < RESPONSIVE_SM) {
            responsive = 'narrow';
          }

          const menuMode = isMobile ? 'inline' : 'horizontal';
          const basePath = pathname.split('/').shift();
          const activeMenuItem = basePath || 'home';

          const menu: React.ReactElement | null = (
            <PushedUpMenu
              ismobile={isMobile}
              className={classNames('menu-site')}
              mode={menuMode}
              selectedKeys={[activeMenuItem]}
              id="nav"
            >
              {isHome ? null : (
                <MenuItem ismobile={isMobile} key="home" className="hide-in-home-page">
                  <CleanLink to={utils.getLocalizedPathname('/')}>Home</CleanLink>
                </MenuItem>
              )}
              <MenuItem ismobile={isMobile} key="components">
                <CleanLink to={utils.getLocalizedPathname('/components/button/')}>
                  Components
                </CleanLink>
              </MenuItem>
              <MenuItem ismobile={isMobile} key="shellac">
                <CleanLink to={utils.getLocalizedPathname('/shellac')}>Shellac</CleanLink>
              </MenuItem>
            </PushedUpMenu>
          );

          return (
            <VarnishHeader>
              <HeaderColumns gridTemplateColumns="auto auto 1fr auto auto">
                <CleanLink ismobile={isMobile} to={utils.getLocalizedPathname('/')}>
                  <Logo />
                  <HomeTitle>Varnish</HomeTitle>
                </CleanLink>
                <span>{!isMobile && menu}</span>
                <span />
                <span>
                  <Github key="github" responsive={responsive} />
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
                      <UnorderedListOutlined
                        className="nav-phone-icon"
                        onClick={this.handleShowMenu}
                      />
                    </Popover>
                  )}
                </span>
              </HeaderColumns>
            </VarnishHeader>
          );
        }}
      </SiteContext.Consumer>
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

const PushedUpMenu = styled(Menu)<{ ismobile: boolean }>`
  margin-top: ${({ ismobile }) => (!ismobile ? '-24px' : null)};
  height: ${({ ismobile }) => (!ismobile ? '55px' : null)};
`;

const MenuItem = styled(Menu.Item)<{ ismobile: boolean }>`
  ${CleanLink} {
    line-height: ${({ ismobile }) => (!ismobile ? '79px' : null)};
  }
`;

const HomeTitle = styled(HeaderTitle as any)`
  /* any fixes a bug, https://github.com/microsoft/TypeScript/issues/37597 */
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

export default injectIntl(DemoHeader as any);
