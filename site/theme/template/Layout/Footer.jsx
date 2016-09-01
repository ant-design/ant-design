import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Select, Modal } from 'antd';
import { version as antdVersion } from 'antd/package.json';
import { docVersions } from '../../';

const Option = Select.Option;

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

docVersions[antdVersion] = antdVersion;

export default class Footer extends React.Component {
  componentDidMount() {
    // for some iOS
    // http://stackoverflow.com/a/14555361
    if (!isLocalStorageNameSupported()) {
      return;
    }
    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (localStorage.getItem('infoNewVersionSent') !== 'true' &&
        new Date().getTime() < new Date('2016/05/22').getTime()) {
      this.infoNewVersion();
    }
  }

  infoNewVersion() {
    Modal.info({
      title: 'antd 新版发布！',
      content: (
        <div>
          <img src="https://os.alipayobjects.com/rmsportal/nyqBompsynAQCpJ.svg" alt="Ant Design" />
          <p>
            您好，<a target="_blank" rel="noopener noreferrer" href="/#/changelog">antd@1.0</a> 已正式发布，欢迎升级。
            如果您还需要使用旧版，请查阅 <a target="_blank" rel="noopener noreferrer" href="http://012x.ant.design">012x.ant.design</a>
            ，也可通过页面右下角的文档版本选择框进行切换。
          </p>
        </div>
      ),
      onOk: () => localStorage.setItem('infoNewVersionSent', 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  }

  handleVersionChange = (url) => {
    window.location.href = url;
  }

  render() {
    const options = Object.keys(docVersions).map(version => (
      <Option value={docVersions[version]} key={version}>{version}</Option>
    ));
    return (
      <footer id="footer">
        <ul>
          <li>
            <h2>GitHub</h2>
            <div>
              <a target="_blank " href="https://github.com/ant-design/ant-design">
                <FormattedMessage id="app.footer.repo" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/antd-init">antd-init</a> -
              <FormattedMessage id="app.footer.scaffold" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://ant-tool.github.io">ant-tool</a> - <FormattedMessage id="app.footer.dev-tools" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">dva</a> - <FormattedMessage id="app.footer.dva" />
            </div>
          </li>
          <li>
            <h2><FormattedMessage id="app.footer.links" /></h2>
            <div><a href="http://mobile.ant.design">Ant Design Mobile</a> -
              <FormattedMessage id="app.footer.mobile" />
            </div>
            <div><a href="https://g2.alipay.com/">G2</a> -
              <FormattedMessage id="app.footer.data-vis" />
            </div>
            <div><a href="https://antv.alipay.com/">AntV</a> -
              <FormattedMessage id="app.footer.data-vis-spec" />
            </div>
            <div><a href="http://motion.ant.design">Ant Motion</a> -
              <FormattedMessage id="app.footer.motion" />
            </div>
            <div><a href="http://ux.ant.design">Ant UX</a> -
              <FormattedMessage id="app.footer.material" />
            </div>
          </li>
          <li>
            <h2><FormattedMessage id="app.footer.community" /></h2>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://ant.design/changelog">
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
            <div>Powered by <a href="https://github.com/benjycui/bisheng">BiSheng</a></div>
            <div style={{ marginTop: 10 }}>
              <FormattedMessage id="app.footer.version" />
              <Select
                size="small"
                dropdownMatchSelectWidth={false}
                defaultValue={antdVersion}
                onChange={this.handleVersionChange}
              >
                {options}
              </Select>
            </div>
          </li>
        </ul>
      </footer>
    );
  }
}
