import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, Icon } from 'antd';

function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

class Footer extends React.Component {
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
      localStorage.getItem('antd@2.0.0-notification-sent') !== 'true' &&
        Date.now() < new Date('2016/10/14').getTime()
    ) {
      this.infoNewVersion();
    }
  }

  infoNewVersion() {
    const messages = this.props.intl.messages;
    Modal.info({
      title: messages['app.publish.title'],
      content: (
        <div>
          <img src="https://os.alipayobjects.com/rmsportal/nyqBompsynAQCpJ.svg" alt="Ant Design" />
          <p>
            {messages['app.publish.greeting']}
            <a target="_blank" rel="noopener noreferrer" href="/changelog">antd@2.0.0</a>
            {messages['app.publish.intro']}
            {messages['app.publish.old-version-guide']}
            <a target="_blank" rel="noopener noreferrer" href="http://1x.ant.design">1x.ant.design</a>
            {messages['app.publish.old-version-tips']}
          </p>
        </div>
      ),
      okText: 'OK',
      onOk: () => localStorage.setItem('antd@2.0.0-notification-sent', 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  }

  render() {
    return (
      <footer id="footer">
        <ul>
          <li>
            <h2><Icon type="github" /> GitHub</h2>
            <div>
              <a target="_blank " href="https://github.com/ant-design/ant-design">
                <FormattedMessage id="app.footer.repo" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">dva</a> - <FormattedMessage id="app.footer.dva" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva-cli">dva-cli</a> -
              <FormattedMessage id="app.footer.scaffold" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://ant-tool.github.io">ant-tool</a> - <FormattedMessage id="app.footer.dev-tools" />
            </div>
          </li>
          <li>
            <h2><Icon type="link" /> <FormattedMessage id="app.footer.links" /></h2>
            <div>
              <a href="http://mobile.ant.design">Ant Design Mobile</a>
              <span> - </span>
              <FormattedMessage id="app.footer.mobile" />
            </div>
            <div>
              <a href="https://antv.alipay.com/">AntV</a>
              <span> - </span>
              <FormattedMessage id="app.footer.data-vis" />
            </div>
            <div>
              <a href="http://motion.ant.design">Ant Motion</a>
              <span> - </span>
              <FormattedMessage id="app.footer.motion" />
            </div>
            <div>
              <a href="http://library.ant.design/">AntD Library</a>
              <span> - </span>
              <FormattedMessage id="app.footer.antd-library" />
            </div>
            <div>
              <a href="http://ux.ant.design">Ant UX</a>
              <span> - </span>
              <FormattedMessage id="app.footer.material" />
            </div>
          </li>
          <li>
            <h2><Icon type="customer-service" /> <FormattedMessage id="app.footer.community" /></h2>
            <div>
              <a rel="noopener noreferrer" href="/changelog">
                <FormattedMessage id="app.footer.change-log" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/issues">
                <FormattedMessage id="app.footer.feedback" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design">
                <FormattedMessage id="app.footer.discuss" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/issues/new">
                <FormattedMessage id="app.footer.bug-report" />
              </a>
            </div>
          </li>
          <li>
            <div>©2016 <FormattedMessage id="app.footer.author" /></div>
            <div>Built with <a href="https://github.com/benjycui/bisheng">BiSheng</a></div>
          </li>
        </ul>
      </footer>
    );
  }
}

export default injectIntl(Footer);
