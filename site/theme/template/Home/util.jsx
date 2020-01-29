/* eslint no-undef: 0 */
import React from 'react';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';

function ParallaxG(props) {
  return <ScrollParallax component="g" {...props} />;
}

export default function svgBgToParallax(children, i = 0) {
  const svgChildren = React.Children.toArray(children).map((child, ii) => (
    <ParallaxG
      key={ii.toString()}
      location="page2"
      animation={{
        y: Math.random() * -200 - 30 - i * 20,
        playScale: [0, Math.random() + 2],
      }}
    >
      {child}
    </ParallaxG>
  ));
  return svgChildren;
}

if (typeof window !== 'undefined') {
  // 图处预加载；
  const div = document.createElement('div');
  div.style.display = 'none';
  document.body.appendChild(div);
  [
    'https://gw.alipayobjects.com/zos/rmsportal/DJWUmdpxcQakQHwhPjzf.png',
    'https://gw.alipayobjects.com/zos/rmsportal/DEaRdiYbAyVNRelJpwXx.png',
    'https://gw.alipayobjects.com/zos/rmsportal/cCmuVrmQIJYlrhFjiPDZ.png',
    'https://gw.alipayobjects.com/zos/rmsportal/TOElddMOrCWlgZvWTJna.png',
    'https://gw.alipayobjects.com/zos/rmsportal/FpKOqFadwoFFIZFExjaf.png',
    'https://gw.alipayobjects.com/zos/rmsportal/IauKICnGjGnotJBEyCRK.png',

    'https://gw.alipayobjects.com/zos/rmsportal/URIeCOKLMAbRXaeXoNqN.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/qXncdwwUTTgUFnsbCNCE.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/YFXXZocxAgjReehpPNbX.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/VPuetGsvJuYBwoDkZWFW.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/eYNnmGagLWdrkdMHVUuA.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/EPaPtDVGnJhyqyBAUZMl.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/GobRAKexhfTSJdLFzDFY.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/slVtnOCcgeAcLEPwtewY.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/UtBesTOkoZsBUxPqfDlZ.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/VrADJaRPMnFjmtmIhObV.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/MnLEmwjipfhzPUmBJnJE.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/dyNuxLOZtvjoHSVisbhQ.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/qggKjIGNFlVmMpwDUXPU.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/dgjVqwkJvptQEtlfctvk.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/vUxYuDdsbBBcMDxSGmwc.svg',
  ].forEach(src => {
    const img = new Image();
    img.src = src;
    div.appendChild(img);
  });
}
