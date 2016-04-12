import React from 'react';
import { Select } from 'antd';
import { version as antdVersion } from '../../../package.json';
import { docVersions } from '../../website.config';
const Option = Select.Option;

docVersions[antdVersion] = antdVersion;

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  handleVersionChange(url) {
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
            <a target="_blank " href="https://github.com/ant-design/ant-design">
              仓库
            </a>
            <a target="_blank" href="https://github.com/ant-design/ant-design/tree/master/style">
              样式
            </a>
            <a target="_blank" href="https://github.com/ant-design/antd-bin">
              开发工具
            </a>
          </li>
          <li>
            <h2>关于我们</h2>
            <a href="https://github.com/alipay/x/issues">博客 - Ant UED</a>
          </li>
          <li>
            <h2>联系我们</h2>
            <a target="_blank" href="https://github.com/ant-design/ant-design/issues">
              反馈和建议
            </a>
            <a target="_blank" href="https://gitter.im/ant-design/ant-design">
              讨论
            </a>
            <a target="_blank" href="https://github.com/ant-design/ant-design/issues/new">
              报告 Bug
            </a>
          </li>
          <li>
            <div>©2015 蚂蚁金服体验技术部出品</div>
            <div>
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
