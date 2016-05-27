import React from 'react';
import { Link } from 'react-router';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default class Banner extends React.Component {
  typeFunc(a) {
    if (a.key === 'line') {
      return 'right';
    } else if (a.key === 'button') {
      return 'bottom';
    }
    return 'left';
  }

  render() {
    return (
      <section id="banner">
        <ScrollElement scrollName="banner" className="page">
          <QueueAnim className="banner-text-wrapper" type={this.typeFunc} delay={300}>
            <h2 key="h2">ANT <p>DESIGN</p></h2>
            <p key="content">一个 UI 设计语言</p>
            <span className="line" key="line" />
            <div key="button" className="start-button clearfix">
              <Link to="/docs/spec/introduce">
                <Icon type="smile-circle" /> 开始探索
              </Link>
            </div>
            <GitHubButton key="github-button" type="stargazers"
              namespace="ant-design" repo="ant-design" />
          </QueueAnim>
          <Icon type="down" className="down" />
        </ScrollElement>
      </section>
    );
  }
}
