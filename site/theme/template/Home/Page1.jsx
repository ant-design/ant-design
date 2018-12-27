import React from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';

const page1Data = [
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/URIeCOKLMAbRXaeXoNqN.svg',
    name: '设计价值观',
    nameEn: 'Design Values',
    to: '/docs/spec/values',
    svgBg: (
      <svg
        width="213px"
        height="303px"
        viewBox="0 0 213 303"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <circle id="Oval-12-Copy-6" fill="#1D39C4" opacity="0.45" cx="60" cy="157" r="25" />
        <circle id="Oval-12-Copy" fill="#1D39C4" opacity="0.35" cx="167.5" cy="65.5" r="11.5" />
        <rect stroke="#1D39C4" opacity="0.7" x="0.5" y="54.5" width="14" height="14" rx="1" />
        <circle fill="#1D39C4" opacity="0.5" cx="195.5" cy="117.5" r="3.5" />
        <circle fill="#1D39C4" opacity="0.5" cx="117" cy="2" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="82" cy="36" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="26.5" cy="102.5" r="1.5" />
        <circle stroke="#1D39C4" opacity="0.65" cx="180.5" cy="8.5" r="4.5" />
        <g
          id="Group-18"
          transform="translate(197.000000, 157.000000)"
          opacity="0.7"
          stroke="#1D39C4"
        >
          <path d="M10.7320508,3 L15.0621778,10.5 C15.6144626,11.4565852 15.2867123,12.6797661 14.330127,13.2320508 C14.0260886,13.4075875 13.6812003,13.5 13.330127,13.5 L4.66987298,13.5 C3.56530348,13.5 2.66987298,12.6045695 2.66987298,11.5 C2.66987298,11.1489267 2.76228551,10.8040384 2.93782217,10.5 L7.26794919,3 C7.82023394,2.04341475 9.04341475,1.71566444 10,2.26794919 C10.3040384,2.44348586 10.5565141,2.69596158 10.7320508,3 Z" />
        </g>
        <g
          id="Group-17"
          transform="translate(124.000000, 284.000000)"
          opacity="0.65"
          stroke="#1D39C4"
        >
          <path
            d="M13.7320508,6 L18.0621778,13.5 C18.6144626,14.4565852 18.2867123,15.6797661 17.330127,16.2320508 C17.0260886,16.4075875 16.6812003,16.5 16.330127,16.5 L7.66987298,16.5 C6.56530348,16.5 5.66987298,15.6045695 5.66987298,14.5 C5.66987298,14.1489267 5.76228551,13.8040384 5.93782217,13.5 L10.2679492,6 C10.8202339,5.04341475 12.0434148,4.71566444 13,5.26794919 C13.3040384,5.44348586 13.5565141,5.69596158 13.7320508,6 Z"
            transform="translate(12.000000, 11.140576) rotate(25.000000) translate(-12.000000, -11.140576) "
          />
        </g>
      </svg>
    ),
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/qXncdwwUTTgUFnsbCNCE.svg',
    name: '视觉',
    nameEn: 'Visual',
    to: '/docs/spec/colors',
    svgBg: (
      <svg
        width="207px"
        height="295px"
        viewBox="0 0 207 295"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect stroke="#1D39C4" opacity="0.7" x="192.5" y="62.5" width="14" height="14" rx="1" />
        <circle id="Oval-12-Copy-2" fill="#1D39C4" opacity="0.45" cx="21.5" cy="90.5" r="21.5" />
        <circle id="Oval-12-Copy-3" fill="#1D39C4" opacity="0.35" cx="162.5" cy="163.5" r="14.5" />
        <rect
          stroke="#1D39C4"
          opacity="0.7"
          transform="translate(77.500000, 287.500000) rotate(30.000000) translate(-77.500000, -287.500000) "
          x="72.5"
          y="282.5"
          width="10"
          height="10"
          rx="1"
        />
        <circle fill="#1D39C4" opacity="0.5" cx="164.5" cy="117.5" r="3.5" />
        <circle fill="#1D39C4" opacity="0.5" cx="96" cy="2" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="141" cy="36" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="34.5" cy="142.5" r="1.5" />
        <circle stroke="#1D39C4" opacity="0.65" cx="24.5" cy="30.5" r="4.5" />
        <g
          id="Group-19"
          transform="translate(12.000000, 173.000000)"
          opacity="0.7"
          stroke="#1D39C4"
        >
          <path
            d="M13.5216765,6.597413 L17.8518036,14.097413 C18.4040883,15.0539982 18.076338,16.2771791 17.1197527,16.8294638 C16.8157143,17.0050005 16.4708261,17.097413 16.1197527,17.097413 L7.45949871,17.097413 C6.35492921,17.097413 5.45949871,16.2019825 5.45949871,15.097413 C5.45949871,14.7463397 5.55191124,14.4014514 5.7274479,14.097413 L10.0575749,6.597413 C10.6098597,5.64082775 11.8330405,5.31307744 12.7896257,5.86536219 C13.0936641,6.04089886 13.3461399,6.29337458 13.5216765,6.597413 Z"
            transform="translate(11.789626, 11.737989) rotate(40.000000) translate(-11.789626, -11.737989) "
          />
        </g>
      </svg>
    ),
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/YFXXZocxAgjReehpPNbX.svg',
    name: '可视化',
    nameEn: 'Visualization',
    to: '/docs/spec/visual',
    svgBg: (
      <svg
        width="215px"
        height="286px"
        viewBox="0 0 215 286"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        style={{ transform: 'translateX(-30px)' }}
      >
        <circle id="Oval-12-Copy-4" fill="#1D39C4" opacity="0.35" cx="77" cy="152" r="10" />
        <circle id="Oval-12-Copy-5" fill="#1D39C4" opacity="0.45" cx="194.5" cy="74.5" r="20.5" />
        <rect stroke="#1D39C4" opacity="0.7" x="0.5" y="99.5" width="13" height="13" rx="1" />
        <circle fill="#1D39C4" opacity="0.5" cx="44.5" cy="117.5" r="3.5" />
        <circle fill="#1D39C4" opacity="0.5" cx="132" cy="2" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="177" cy="36" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="147.5" cy="182.5" r="1.5" />
        <circle stroke="#1D39C4" opacity="0.65" cx="172" cy="182" r="7" />
        <circle stroke="#1D39C4" opacity="0.65" cx="110" cy="280" r="5" />
        <g id="Group-20" transform="translate(70.000000, 23.000000)" opacity="0.7" stroke="#1D39C4">
          <path
            d="M13.0221683,6.597413 L16.8974466,13.309592 C17.4497314,14.2661772 17.1219811,15.489358 16.1653958,16.0416428 C15.8613574,16.2171794 15.5164692,16.309592 15.1653958,16.309592 L7.41483918,16.309592 C6.31026968,16.309592 5.41483918,15.4141615 5.41483918,14.309592 C5.41483918,13.9585186 5.5072517,13.6136304 5.68278837,13.309592 L9.55806669,6.597413 C10.1103514,5.64082775 11.3335323,5.31307744 12.2901175,5.86536219 C12.5941559,6.04089886 12.8466316,6.29337458 13.0221683,6.597413 Z"
            transform="translate(11.290118, 11.262929) rotate(40.000000) translate(-11.290118, -11.262929) "
          />
        </g>
      </svg>
    ),
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/VPuetGsvJuYBwoDkZWFW.svg',
    name: '动效',
    nameEn: 'Animation',
    to: '/docs/spec/motion',
    svgBg: (
      <svg
        width="193px"
        height="286px"
        viewBox="0 0 193 286"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        style={{ transform: 'translateY(-20px)' }}
      >
        <circle id="Oval-12-Copy-4" fill="#1D39C4" opacity="0.35" cx="71" cy="65" r="10" />
        <circle id="Oval-12-Copy-5" fill="#1D39C4" opacity="0.45" cx="172.5" cy="154.5" r="20.5" />
        <rect stroke="#1D39C4" opacity="0.7" x="0.5" y="99.5" width="13" height="13" rx="1" />
        <circle fill="#1D39C4" opacity="0.5" cx="44.5" cy="117.5" r="3.5" />
        <circle fill="#1D39C4" opacity="0.5" cx="132" cy="2" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="39" cy="34" r="2" />
        <circle fill="#1D39C4" opacity="0.6" cx="147.5" cy="182.5" r="1.5" />
        <circle stroke="#1D39C4" opacity="0.65" cx="55" cy="177" r="7" />
        <circle stroke="#1D39C4" opacity="0.65" cx="110" cy="280" r="5" />
        <g
          id="Group-21"
          transform="translate(171.000000, 25.000000)"
          opacity="0.7"
          stroke="#1D39C4"
        >
          <path
            d="M12.833668,6.38747836 L16.7089463,13.0996573 C17.2612311,14.0562426 16.9334808,15.2794234 15.9768955,15.8317081 C15.6728571,16.0072448 15.3279688,16.0996573 14.9768955,16.0996573 L7.22633886,16.0996573 C6.12176936,16.0996573 5.22633886,15.2042268 5.22633886,14.0996573 C5.22633886,13.748584 5.31875139,13.4036957 5.49428806,13.0996573 L9.36956638,6.38747836 C9.92185113,5.43089311 11.1450319,5.1031428 12.1016172,5.65542755 C12.4056556,5.83096421 12.6581313,6.08343994 12.833668,6.38747836 Z"
            transform="translate(11.101617, 11.052994) rotate(40.000000) translate(-11.101617, -11.052994) "
          />
        </g>
      </svg>
    ),
  },
];

const getTransformXY = t => {
  const s = t.replace(/[a-z()]/g, '').split(',');
  return {
    x: s[0],
    y: s[1],
  };
};

const svgToXY = page1Data.map(item => {
  const c = item.svgBg.props.children;
  return c.map(child => {
    const p = child.props;
    const trnasformXY = p.transform ? getTransformXY(p.transform) : {};
    return {
      x: parseFloat(p.x || p.cx || trnasformXY.x),
      y: parseFloat(p.y || p.cy || trnasformXY.y),
    };
  });
});

export default class Page1 extends React.PureComponent {
  state = {
    hoverKey: null,
  };

  leave = {
    opacity: 0,
    duration: 300,
    x: 100,
    y: 150,
    ease: 'easeInBack',
  };

  onMouseOver = key => {
    this.setState({
      hoverKey: key,
    });
  };

  onMouseOut = () => {
    this.setState({
      hoverKey: null,
    });
  };

  getEnter = (i, e) => {
    const ii = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 10;
    const delay = Math.round(Math.random() * (ii * 30));
    const pos = svgToXY[i][ii];
    return [
      { x: 100, y: 150, duration: 0 },
      {
        delay,
        opacity: 1,
        x: pos.x,
        y: pos.y,
        ease: 'easeOutBack',
        duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ];
  };

  getSvgChild = child =>
    child.map((item, i) => {
      const props = { ...item.props };
      if (item.type === 'g') {
        props.transform = null;
      } else {
        ['x', 'y', 'cx', 'cy'].forEach(str => {
          if (str in props) {
            props[str] = null;
          }
        });
      }
      return <g key={i.toString()}>{React.cloneElement(item, props)}</g>;
    });

  render() {
    const { locale, isMobile } = this.props;
    const { hoverKey } = this.state;
    const isZhCN = locale === 'zh-CN';
    const children = page1Data.map((item, i) => {
      const isHover = item.nameEn === hoverKey;
      return (
        <Col key={item.nameEn} md={6} xs={24}>
          <TweenOneGroup
            className="page1-point-wrapper"
            enter={e => this.getEnter(i, e)}
            leave={this.leave}
            {...item.svgBg.props}
            component="svg"
            resetStyle={false}
            exclusive
          >
            {(isMobile || isHover) && this.getSvgChild(item.svgBg.props.children)}
          </TweenOneGroup>
          <QueueAnim
            className="page1-block"
            type="bottom"
            component={Link}
            componentProps={{ to: utils.getLocalizedPathname(item.to, isZhCN) }}
            onMouseEnter={() => {
              this.onMouseOver(item.nameEn);
            }}
            onMouseLeave={this.onMouseOut}
          >
            <div className="page1-image">
              <img src={item.img} alt="icon" />
            </div>
            <h3>{isZhCN ? item.name : item.nameEn}</h3>
          </QueueAnim>
        </Col>
      );
    });
    return (
      <div className="home-page-wrapper page1">
        <div className="page">
          <h2>
            <FormattedMessage id="app.home.design-language" />
          </h2>
          <ScrollOverPack playScale="0.3">
            <QueueAnim
              component={Row}
              key="queue"
              type="bottom"
              ease={['easeOutQuart', 'easeInQuart']}
              leaveReverse
            >
              {children}
            </QueueAnim>
          </ScrollOverPack>
        </div>
      </div>
    );
  }
}
