import React from 'react';
import TweenOne from 'rc-tween-one';
import PathPlugin from 'rc-tween-one/lib/plugin/PathPlugin';
import moment from 'moment';

TweenOne.plugins.push(PathPlugin);
const duration = 7000;
const ease = 'easeInOutSine';
const p =
  'M123.5,89.5 C148,82.5 239.5,48.5 230,17.5 C220.5,-13.5 127,6 99.5,13.5 C72,21 -9.5,56.5 1.5,84.5 C12.5,112.5 99,96.5 123.5,89.5 Z';
const easePath =
  'M0,100 C7.33333333,89 14.3333333,81.6666667 21,78 C25.3601456,75.6019199 29.8706084,72.9026327 33,70 C37.0478723,66.2454406 39.3980801,62.0758689 42.5,57 C48,46.5 61.5,32.5 70,28 C77.5,23.5 81.5,20 86.5,16 C89.8333333,13.3333333 94.3333333,8 100,0';
const loop = {
  yoyo: true,
  repeat: -1,
  duration,
  ease,
};
const animate = {
  path: {
    path: { x: p, y: p },
    duration: 5000,
    repeat: -1,
    ease: TweenOne.easing.path(easePath, { lengthPixel: 400 }),
  },
  rotate: {
    ...loop,
    rotate: 15,
  },
  rotateR: {
    ...loop,
    rotate: -15,
  },
  yGroup: {
    ...loop,
    y: 24,
  },
  track: {
    ...loop,
    rotate: 15,
  },
  rotateY: {
    ...loop,
    y: 24,
    rotate: 15,
  },
  y: {
    ...loop,
    y: 15,
    duration: 3000,
  },
  yR: {
    ...loop,
    y: -15,
    duration: 3000,
  },
};

function TweenOneG(props) {
  return <TweenOne component="g" {...props} />;
}

export default function BannerImage() {
  if (moment().format('YYYY-MM-DD') === '2018-10-24') {
    return (
      <a
        href="https://1024.yuque.com"
        target="_blank"
        rel="noopener noreferrer"
        className="banner-1024"
      >
        <img src="https://gw.alipayobjects.com/zos/rmsportal/BaqKyDBXRAzoncSoBQGU.svg" alt="1024" />
      </a>
    );
  }
  return (
    <svg width="482px" height="500px" viewBox="0 0 482 500">
      <defs>
        <path
          d="M151,55 C129.666667,62.6666667 116,74.3333333 110,90 C104,105.666667 103,118.5 107,128.5 L225.5,96 C219.833333,79 209.666667,67 195,60 C180.333333,53 165.666667,51.3333333 151,55 L137,0 L306.5,6.5 L306.5,156 L227,187.5 L61.5,191 C4.5,175 -12.6666667,147.833333 10,109.5 C32.6666667,71.1666667 75,34.6666667 137,0 L151,55 Z"
          id="mask"
        />
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(0, 30)">
        <g id="Group-7" transform="translate(56.000000, 124)">
          <TweenOneG animation={animate.rotateY}>
            <image
              id="cc2"
              alt="globe"
              xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/DJWUmdpxcQakQHwhPjzf.png"
              width="124px"
              height="130px"
            />
          </TweenOneG>
        </g>
        <g id="Group-8" transform="translate(127.000000, 82)">
          <TweenOneG animation={animate.rotateR}>
            <image
              id="cc1"
              alt="globe"
              xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/DEaRdiYbAyVNRelJpwXx.png"
              width="195px"
              height="163px"
            />
          </TweenOneG>
        </g>
        <g id="Group-13" transform="translate(0.000000, 41.000000)">
          <TweenOneG animation={animate.y}>
            <ellipse
              fillOpacity="0.4"
              fill="#2F54EB"
              opacity="0.3"
              cx="390"
              cy="25.9920529"
              rx="6"
              ry="5.99205288"
            />
          </TweenOneG>
          <TweenOneG animation={{ ...animate.yR, delay: 100 }}>
            <circle fillOpacity="0.4" fill="#2F54EB" opacity="0.3" cx="402" cy="3" r="3" />
          </TweenOneG>
          <TweenOneG animation={{ ...animate.y, delay: 100 }}>
            <ellipse
              stroke="#13C2C2"
              strokeWidth="1.6"
              cx="419"
              cy="313.994702"
              rx="4"
              ry="3.99470192"
            />
          </TweenOneG>
          <TweenOneG animation={{ ...animate.yR, delay: 150 }}>
            <rect
              fill="#FFE600"
              opacity="0.6"
              transform="translate(285.224453, 179.218136) rotate(-340.000000) translate(-285.224453, -179.218136) "
              x="277.244453"
              y="171.248705"
              width="15.96"
              height="15.9388607"
              rx="3.6"
            />
          </TweenOneG>
          <TweenOneG animation={{ ...animate.y, delay: 200 }}>
            <rect
              stroke="#F5222D"
              strokeWidth="1.6"
              transform="translate(184.000000, 18.000000) rotate(8.000000) translate(-184.000000, -18.000000) "
              x="176.8"
              y="10.8"
              width="14.4"
              height="14.4"
              rx="3.6"
            />
          </TweenOneG>
          <TweenOneG animation={{ ...animate.yR, delay: 200 }}>
            <path
              d="M11.6005591,127.582431 L14.1769733,132.010943 C15.1767883,133.729492 14.5941396,135.933161 12.8755911,136.932976 C12.325874,137.25279 11.7012453,137.421269 11.0652659,137.421269 L5.91243747,137.421269 C3.92421237,137.421269 2.31243747,135.809494 2.31243747,133.821269 C2.31243747,133.185289 2.48091636,132.560661 2.80073009,132.010943 L5.37714432,127.582431 C6.37695929,125.863883 8.58062832,125.281234 10.2991769,126.281049 C10.8384011,126.594758 11.2868499,127.043207 11.6005591,127.582431 Z"
              stroke="#13C2C2"
              strokeWidth="1.6"
              transform="translate(8.489147, 131.606717) rotate(18.000000) translate(-8.489147, -131.606717) "
            />
          </TweenOneG>
          <TweenOneG animation={{ ...animate.y, delay: 300 }}>
            <path
              d="M168.708021,336.081114 L171.995111,342.213024 C172.516977,343.186539 172.150843,344.398784 171.177328,344.920649 C170.88673,345.076428 170.562126,345.157945 170.232408,345.157945 L163.658227,345.157945 C162.553657,345.157945 161.658227,344.262514 161.658227,343.157945 C161.658227,342.828226 161.739744,342.503622 161.895523,342.213024 L165.182613,336.081114 C165.704478,335.1076 166.916723,334.741466 167.890238,335.263331 C168.237419,335.449442 168.52191,335.733933 168.708021,336.081114 Z"
              stroke="#2F54EB"
              strokeWidth="1.6"
              transform="translate(166.945513, 340.091794) rotate(18.000000) translate(-166.945513, -340.091794) "
            />
          </TweenOneG>
        </g>
        <TweenOneG animation={{ ...animate.loop, ...animate.yGroup }}>
          <g id="Group-15" transform="translate(373.000000, 204.000000)" strokeWidth="1.35">
            <path
              d="M19.8372093,0.173184358 L1.82452431,52.3407821"
              id="Path-2-Copy-5"
              stroke="#000000"
            />
            <ellipse
              id="Oval-9-Copy-14"
              stroke="#0D1A26"
              fill="#FFFFFF"
              cx="2.27484144"
              cy="50.9916201"
              rx="1.35095137"
              ry="1.34916201"
            />
          </g>
          <g id="Group-9" transform="translate(322.000000, 107.000000)">
            <TweenOneG style={{ transformOrigin: '50px 40px' }} animation={animate.rotateR}>
              <image
                id="cc3"
                alt="globe"
                xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/cCmuVrmQIJYlrhFjiPDZ.png"
                width="160px"
                height="66px"
              />
            </TweenOneG>
          </g>
          <g id="Group-12" transform="translate(271.000000, 2)">
            <TweenOneG style={{ transformOrigin: '125px 200px' }} animation={animate.rotate}>
              <image
                id="cc0"
                alt="globe"
                xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/TOElddMOrCWlgZvWTJna.png"
                width="184px"
                height="293px"
              />
            </TweenOneG>
          </g>
        </TweenOneG>
        <g id="Group-14" transform="translate(150.000000, 230.000000)">
          <g id="Group-22" transform="translate(62.000000, 7.000000)">
            <image
              id="cc4"
              alt="globe"
              xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/FpKOqFadwoFFIZFExjaf.png"
              width="151px"
              height="234px"
            />
          </g>
          <mask id="mask-2">
            <use xlinkHref="#mask" fill="white" transform="translate(-42, -33)" />
          </mask>
          <g mask="url(#mask-2)">
            <TweenOneG animation={animate.track} style={{ transformOrigin: '122.7px 58px' }}>
              <g transform="translate(-16, -52)">
                <g transform="translate(16, 52)">
                  <path
                    d="M83.1700911,35.9320015 C63.5256194,37.9279025 44.419492,43.1766434 25.8517088,51.6782243 C14.3939956,57.7126276 7.77167019,64.8449292 7.77167019,72.4866248 C7.77167019,94.1920145 61.1993389,111.787709 127.105708,111.787709 C193.012078,111.787709 246.439746,94.1920145 246.439746,72.4866248 C246.439746,55.2822262 212.872939,40.6598106 166.13127,35.3351955"
                    id="line-s"
                    stroke="#0D1A26"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    transform="translate(127.105708, 73.561453) rotate(-16.000000) translate(-127.105708, -73.561453) "
                  />
                </g>
                <TweenOneG animation={animate.path}>
                  <image
                    alt="globe"
                    id="id2"
                    xlinkHref="https://gw.alipayobjects.com/zos/rmsportal/IauKICnGjGnotJBEyCRK.png"
                    x="16"
                    y="62"
                    width="26px"
                    height="26px"
                  />
                </TweenOneG>
              </g>
            </TweenOneG>
          </g>
        </g>
      </g>
    </svg>
  );
}
