import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, message, Row, Col, Badge, Icon } from 'antd';
import { isLocalStorageNameSupported, loadScript } from '../utils';
import ColorPicker from '../Color/ColorPicker';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.lessLoaded = false;

    this.state = {
      color: '#1890ff',
    };
  }

  componentDidMount() {
    // for some iOS
    // http://stackoverflow.com/a/14555361
    if (!isLocalStorageNameSupported()) {
      return;
    }
    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (
      localStorage.getItem('antd@3.0.0-notification-sent') !== 'true'
        && Date.now() < new Date('2017/12/20').getTime()
    ) {
      this.infoNewVersion();
    }
  }

  handleColorChange = (color) => {
    const changeColor = () => {
      const { intl: { messages } } = this.props;
      window.less.modifyVars({
        '@primary-color': color,
      }).then(() => {
        Icon.setTwoToneColor({ primaryColor: color });
        message.success(messages['app.footer.primary-color-changed']);
        this.setState({ color });
      });
    };

    const lessUrl = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      window.less = {
        async: true,
      };
      loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  infoNewVersion() {
    const { intl: { messages } } = this.props;
    Modal.info({
      title: messages['app.publish.title'],
      content: (
        <div>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="Ant Design" />
          <p>
            {messages['app.publish.greeting']}
            <a target="_blank" rel="noopener noreferrer" href="/changelog">antd@3.0.0</a>
            {messages['app.publish.intro']}
            {messages['app.publish.old-version-guide']}
            <a target="_blank" rel="noopener noreferrer" href="http://2x.ant.design">2x.ant.design</a>
            {messages['app.publish.old-version-tips']}
          </p>
        </div>
      ),
      okText: 'OK',
      onOk: () => localStorage.setItem('antd@3.0.0-notification-sent', 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  }

  render() {
    const { color } = this.state;
    return (
      <footer id="footer">
        <div className="footer-wrap">
          <Row>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.resources" /></h2>
                <div>
                  <a href="http://pro.ant.design">Ant Design Pro</a>
                </div>
                <div>
                  <a href="http://mobile.ant.design">Ant Design Mobile</a>
                </div>
                <div>
                  <a href="http://ng.ant.design">NG-ZORRO</a>
                  <span> - </span>
                  Ant Design of Angular
                </div>
                <div>
                  <a target="_blank " href="https://github.com/websemantics/awesome-ant-design">
                    <FormattedMessage id="app.footer.awesome" />
                  </a>
                </div>
                <div>
                  <Badge dot offset={[3, 0]}>
                    <a target="_blank" rel="noopener noreferrer" href="http://kitchen.alipay.com">Kitchen</a>
                    <span> - </span>
                    <FormattedMessage id="app.footer.kitchen" />
                  </Badge>
                </div>
                <div>
                  <a href="http://scaffold.ant.design">Scaffolds</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.scaffolds" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">dva</a> - <FormattedMessage id="app.footer.dva" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://motion.ant.design">Ant Motion</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.motion" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://library.ant.design/">Axure Library</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.antd-library" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://ux.ant.design">Ant UX</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.antux" />
                </div>
                <div>
                  <a target="_blank " href="http://ant-design.gitee.io/">
                    <FormattedMessage id="app.footer.chinamirror" />
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.community" /></h2>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://zhuanlan.zhihu.com/antdesign">
                    <FormattedMessage id="app.footer.zhihu" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://medium.com/ant-design/">
                    Medium
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://twitter.com/antdesignui">
                    Twitter
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://zhuanlan.zhihu.com/xtech">
                    <FormattedMessage id="app.footer.zhihu.xtech" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://seeconf.alipay.com/">
                    SEE Conf
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.seeconf" />
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.help" /></h2>
                <div>
                  <a target="_blank " href="https://github.com/ant-design/ant-design">
                    GitHub
                  </a>
                </div>
                <div>
                  <a href="/changelog">
                    <FormattedMessage id="app.footer.change-log" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/wiki/FAQ">
                    <FormattedMessage id="app.footer.faq" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design">
                    <FormattedMessage id="app.footer.discuss-cn" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design-english">
                    <FormattedMessage id="app.footer.discuss-en" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://new-issue.ant.design/">
                    <FormattedMessage id="app.footer.bug-report" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/issues">
                    <FormattedMessage id="app.footer.issues" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://stackoverflow.com/questions/tagged/antd">
                    <FormattedMessage id="app.footer.stackoverflow" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://segmentfault.com/t/antd">
                    <FormattedMessage id="app.footer.segmentfault" />
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <img className="title-icon" src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg" alt="AFX Cloud" />
                  <FormattedMessage id="app.footer.more-product" />
                </h2>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://yuque.com/">
                    <FormattedMessage id="app.footer.yuque" />
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.yuque.slogan" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://yunfengdie.com/">
                    <FormattedMessage id="app.footer.fengdie" />
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.fengdie.slogan" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://antv.alipay.com/">AntV</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.data-vis" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Egg</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.eggjs" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://xcloud.alipay.com/">
                    <FormattedMessage id="app.footer.xcloud" />
                  </a>
                </div>
                <div style={{ marginTop: 20 }}>
                  <ColorPicker
                    type="sketch"
                    small
                    color={color}
                    position="top"
                    presetColors={[
                      '#F5222D',
                      '#FA541C',
                      '#FA8C16',
                      '#FAAD14',
                      '#FADB14',
                      '#A0D911',
                      '#52C41A',
                      '#13C2C2',
                      '#1890FF',
                      '#2F54EB',
                      '#722ED1',
                      '#EB2F96',
                    ]}
                    onChangeComplete={this.handleColorChange}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-bar">
          Made with <span className="heart">❤</span> by
          <a target="_blank" rel="noopener noreferrer" href="https://yuque.com/afx/blog">
            <FormattedMessage id="app.footer.company" />
          </a>
        </div>
      </footer>
    );
  }
}

export default injectIntl(Footer);
