import React from 'react';
import { Row, Col, Tag } from 'antd';
import QueueAnim from 'rc-queue-anim';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';
import svgBgToParallax from './util';

const page3Data = [
  {
    title: <FormattedMessage id="app.home.tool-package-title" />,
    content: <FormattedMessage id="app.home.tool-package-content" />,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/qggKjIGNFlVmMpwDUXPU.svg',
    to: '/docs/spec/download',
  },
  {
    title: <FormattedMessage id="app.home.tool-library-title" />,
    content: <FormattedMessage id="app.home.tool-library-content" />,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/dgjVqwkJvptQEtlfctvk.svg',
    link: 'http://library.ant.design/',
  },
  {
    title: <FormattedMessage id="app.home.tool-kitchen-title" />,
    content: <FormattedMessage id="app.home.tool-kitchen-content" />,
    img: 'https://gw.alipayobjects.com/zos/rmsportal/vUxYuDdsbBBcMDxSGmwc.svg',
    link: 'http://kitchen.alipay.com/',
    hot: true,
  },
];

const svgBg = [
  <circle stroke="#13C2C2" cx="530" cy="195" r="5" />,
  <circle fillOpacity="0.4" fill="#9EE6E6" cx="606" cy="76" r="3" />,
  <circle stroke="#13C2C2" cx="165" cy="540" r="5" />,
  <circle stroke="#CED4D9" cx="701.5" cy="650" r="3.5" />,
  <circle stroke="#F5222D" cx="526.5" cy="381.5" r="3.5" />,
  <circle fillOpacity="0.4" fill="#9EE6E6" cx="944" cy="251" r="5" />,
  <g transform="translate(0, 180)">
    <path
      d="M1182.79367,448.230356 L1186.00213,453.787581 C1186.55442,454.744166 1186.22667,455.967347 1185.27008,456.519632 C1184.96604,456.695168 1184.62116,456.787581 1184.27008,456.787581 L1177.85315,456.787581 C1176.74858,456.787581 1175.85315,455.89215 1175.85315,454.787581 C1175.85315,454.436507 1175.94556,454.091619 1176.1211,453.787581 L1179.32957,448.230356 C1179.88185,447.273771 1181.10503,446.946021 1182.06162,447.498305 C1182.36566,447.673842 1182.61813,447.926318 1182.79367,448.230356 Z"
      stroke="#CED4D9"
      transform="translate(1181.061784, 452.008801) rotate(40.000000) translate(-1181.061784, -452.008801) "
    />
  </g>,
  <g transform="translate(0, 100)">
    <path
      d="M1376.79367,204.230356 L1380.00213,209.787581 C1380.55442,210.744166 1380.22667,211.967347 1379.27008,212.519632 C1378.96604,212.695168 1378.62116,212.787581 1378.27008,212.787581 L1371.85315,212.787581 C1370.74858,212.787581 1369.85315,211.89215 1369.85315,210.787581 C1369.85315,210.436507 1369.94556,210.091619 1370.1211,209.787581 L1373.32957,204.230356 C1373.88185,203.273771 1375.10503,202.946021 1376.06162,203.498305 C1376.36566,203.673842 1376.61813,203.926318 1376.79367,204.230356 Z"
      stroke="#2F54EB"
      transform="translate(1375.061784, 208.008801) rotate(40.000000) translate(-1375.061784, -208.008801) "
    />
  </g>,
  <rect
    strokeOpacity="0.4"
    stroke="#1D39C4"
    transform="translate(949.801502, 129.801502) rotate(30.000000) translate(-949.801502, -129.801502) "
    x="942.626304"
    y="222.626304"
    width="14.3503946"
    height="14.3503946"
    rx="1"
  />,
  <rect
    stroke="#CED4D9"
    transform="translate(111.673081, 158.673081) rotate(30.000000) translate(-111.673081, -158.673081) "
    x="107.288047"
    y="254.288047"
    width="8.77006914"
    height="8.77006914"
    rx="1"
  />,
];
const svgChildren = svgBgToParallax(svgBg);

export default function Page3({ locale }) {
  const isZhCN = locale === 'zh-CN';
  const children = page3Data.map((item, i) => {
    const child = [
      <div className="page3-img-wrapper" key="img">
        <img src={item.img} alt="icon" />
      </div>,
      <div className="page3-text-wrapper" key="a">
        <h3>
          {item.title}
          {item.hot ? (
            <Tag
              style={{
                marginLeft: 8,
                position: 'relative',
                top: -3,
                height: 18,
                lineHeight: '16px',
                padding: '0 2px',
              }}
              color="#f50"
            >
              HOT
            </Tag>
          ) : null}
        </h3>
        <p>{item.content}</p>
      </div>,
    ];
    return (
      <Col key={i.toString()} md={8} xs={24} className="page3-block">
        {item.to ? (
          <Link to={utils.getLocalizedPathname(item.to, isZhCN)}>{child}</Link>
        ) : (
          <a href={item.link} target="_black">
            {child}
          </a>
        )}
      </Col>
    );
  });
  return (
    <div className="home-page-wrapper page3" id="page3">
      <div className="parallax-bg top">
        <svg
          width="1440px"
          height="557px"
          viewBox="0 0 1440 557"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {svgChildren}
        </svg>
      </div>
      <div className="page">
        <h2>
          <FormattedMessage id="app.home.tool-title" />
        </h2>
        <ScrollOverPack location="page3">
          <QueueAnim key="queue" component={Row} type="bottom" leaveReverse>
            {children}
          </QueueAnim>
        </ScrollOverPack>
      </div>
    </div>
  );
}
