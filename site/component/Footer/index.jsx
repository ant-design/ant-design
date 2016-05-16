import React from 'react';
import { Select, Modal } from 'antd';
import { version as antdVersion } from '../../../package.json';
import { docVersions } from '../../website.config';
const Option = Select.Option;

docVersions[antdVersion] = antdVersion;

export default class Footer extends React.Component {
  componentDidMount() {
    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (localStorage.getItem('infoNewVersionSent') !== 'true' ||
        new Date().getTime() > new Date('2016/05/22').getTime()) {
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
            您好，<a target="_blank" href="/#/changelog">antd@1.0</a> 已正式发布，欢迎升级。
            如果您还需要使用旧版，请查阅 <a target="_blank" href="http://012x.ant.design">012x.ant.design</a>
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
              <a target="_blank " href="https://github.com/ant-design/ant-design">仓库</a>
            </div>
            <div>
              <a target="_blank" href="https://github.com/ant-design/antd-init">antd-init</a> - 脚手架
            </div>
            <div>
              <a target="_blank" href="http://ant-tool.github.io">ant-tool</a> - 开发工具
            </div>
          </li>
          <li>
            <h2>相关站点</h2>
            <div><a href="https://g2.alipay.com/">G2</a> - 数据可视化</div>
            <div><a href="https://antv.alipay.com/">AntV</a> - 数据可视化规范</div>
            <div><a href="http://motion.ant.design">Ant Motion</a> - 设计动效</div>
            <div><a href="http://motion.ant.design">Ant UX</a> - 页面逻辑素材</div>
          </li>
          <li>
            <h2>联系我们</h2>
            <div>
              <a target="_blank" href="https://github.com/ant-design/ant-design/issues">
                反馈和建议
              </a>
            </div>
            <div>
              <a target="_blank" href="https://gitter.im/ant-design/ant-design">
                讨论
              </a>
            </div>
            <div>
              <a target="_blank" href="https://github.com/ant-design/ant-design/issues/new">
                报告 Bug
              </a>
            </div>
          </li>
          <li>
            <div>©2016 蚂蚁金服体验技术部出品</div>
            <div style={{ marginTop: 10 }}>
              文档版本：
              <Select
                size="small"
                dropdownMatchSelectWidth={false}
                defaultValue={antdVersion}
                onChange={this.handleVersionChange}>
                {options}
              </Select>
            </div>
          </li>
        </ul>
      </footer>
    );
  }
}
