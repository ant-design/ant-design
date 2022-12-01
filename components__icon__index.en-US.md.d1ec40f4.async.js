"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7578],{18323:function(r,a,l){l.r(a);var Z=l(2143),v=l(50250),p=l(59378),m=l(78190),e=l(74775),o=l(5937),h=l(2068),x=l(74399),f=l(46004),g=l(35708),E=l(30138),I=l(56140),i=l(5388),d=l(49545),P=l(92169),M=l(13140),O=l(95127),C=l(74418),D=l(97119),u=l(28257),c=l(67294),t=l(13946);function s(){var _=(0,u.eL)(),n=_.texts;return(0,t.tZ)(u.dY,null,(0,t.tZ)(c.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value,(0,t.tZ)("code",null,n[1].value),n[2].value),(0,t.tZ)(e.Z,{lang:"bash"},n[3].value),(0,t.tZ)("h2",{id:"list-of-icons"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#list-of-icons"},(0,t.tZ)("span",{className:"icon icon-link"})),"List of icons")),(0,t.tZ)(d.Z,null),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(i.Z,{items:[{demo:{id:"components-icon-demo-basic"},previewerProps:{title:"Basic",filename:"components/icon/demo/basic.tsx",jsx:`import React from 'react';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
const App = () => (
  <Space>
    <HomeOutlined />
    <SettingFilled />
    <SmileOutlined />
    <SyncOutlined spin />
    <SmileOutlined rotate={180} />
    <LoadingOutlined />
  </Space>
);
export default App;
`,description:"<p>Import icons from <code>@ant-design/icons</code>, component name of icons with different theme is the icon name suffixed by the theme name. Specify the <code>spin</code> property to show spinning animation.</p>"}},{demo:{id:"components-icon-demo-two-tone"},previewerProps:{title:"Two-tone icon and colorful icon",filename:"components/icon/demo/two-tone.tsx",jsx:`import React from 'react';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
const App = () => (
  <Space>
    <SmileTwoTone />
    <HeartTwoTone twoToneColor="#eb2f96" />
    <CheckCircleTwoTone twoToneColor="#52c41a" />
  </Space>
);
export default App;
`,description:"<p>You can set <code>twoToneColor</code> prop to specific primary color for two-tone icons.</p>"}},{demo:{id:"components-icon-demo-custom"},previewerProps:{title:"Custom Icon",filename:"components/icon/demo/custom.tsx",jsx:`import React from 'react';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path
      d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFEBD2"
    />
    <path
      d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
      fill="#E9D7C3"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
      fill="#6B676E"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
      fill="#464655"
    />
    <path
      d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
    />
    <path
      d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
    />
  </svg>
);
const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;
const PandaIcon = (props) => <Icon component={PandaSvg} {...props} />;
const App = () => (
  <Space>
    <HeartIcon
      style={{
        color: 'hotpink',
      }}
    />
    <PandaIcon
      style={{
        fontSize: '32px',
      }}
    />
    <Icon component={HomeOutlined} />
    <HomeOutlined />
  </Space>
);
export default App;
`,description:"<p>Create a reusable React component by using <code>&#x3C;Icon component={...} /></code>. The property <code>component</code> takes a React component that renders to <code>svg</code> element.</p>"}},{demo:{id:"components-icon-demo-iconfont"},previewerProps:{title:"Use iconfont.cn",filename:"components/icon/demo/iconfont.tsx",jsx:`import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const App = () => (
  <Space>
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
  </Space>
);
export default App;
`,description:'<p>If you are using <a href="http://iconfont.cn/">iconfont.cn</a>, you can use the icons in your project gracefully.</p>'}},{demo:{id:"components-icon-demo-scripturl"},previewerProps:{title:"Multiple resources from iconfont.cn",filename:"components/icon/demo/scriptUrl.tsx",jsx:`import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});

const App = () => (
  <Space>
    <IconFont type="icon-javascript" />
    <IconFont type="icon-java" />
    <IconFont type="icon-shoppingcart" />
    <IconFont type="icon-python" />
  </Space>
);
export default App;
`,description:'<p>You can use <code>scriptUrl</code> as an array after <code>@ant-design/icons@4.1.0</code>, manage icons in one <code>&#x3C;Icon /></code> from multiple <a href="http://iconfont.cn/">iconfont.cn</a> resources. If icon with a duplicate name in resources, it will overrided in array order.</p>'}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h3",{id:"common-icon"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#common-icon"},(0,t.tZ)("span",{className:"icon icon-link"})),"Common Icon"),(0,t.tZ)(o.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[4].value),(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value),(0,t.tZ)("th",null,n[8].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[9].value),(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value,(0,t.tZ)("code",null,n[23].value),n[24].value,(0,t.tZ)("code",null,n[25].value)),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null)))),(0,t.tZ)("p",null,n[32].value),(0,t.tZ)(e.Z,{lang:"jsx"},n[33].value),(0,t.tZ)("h3",{id:"custom-icon"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#custom-icon"},(0,t.tZ)("span",{className:"icon icon-link"})),"Custom Icon"),(0,t.tZ)(o.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[34].value),(0,t.tZ)("th",null,n[35].value),(0,t.tZ)("th",null,n[36].value),(0,t.tZ)("th",null,n[37].value),(0,t.tZ)("th",null,n[38].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null,n[42].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null,n[52].value,(0,t.tZ)("code",null,n[53].value),n[54].value,(0,t.tZ)("code",null,n[55].value)),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"about-svg-icons"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#about-svg-icons"},(0,t.tZ)("span",{className:"icon icon-link"})),"About SVG icons"),(0,t.tZ)("p",null,n[58].value,(0,t.tZ)("code",null,n[59].value),n[60].value),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[61].value),(0,t.tZ)("li",null,n[62].value),(0,t.tZ)("li",null,n[63].value),(0,t.tZ)("li",null,n[64].value)),(0,t.tZ)("p",null,n[65].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/10353"},n[66].value),n[67].value),(0,t.tZ)("blockquote",null,(0,t.tZ)("p",null,n[68].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/12011"},n[69].value),n[70].value),(0,t.tZ)("p",null,n[71].value,(0,t.tZ)("a",{href:"https://github.com/Beven91/webpack-ant-icon-loader"},n[72].value),n[73].value)),(0,t.tZ)("p",null,n[74].value,(0,t.tZ)("code",null,n[75].value),n[76].value,(0,t.tZ)("code",null,n[77].value),n[78].value,(0,t.tZ)("code",null,n[79].value),n[80].value,(0,t.tZ)("code",null,n[81].value),n[82].value,(0,t.tZ)("code",null,n[83].value),n[84].value,(0,t.tZ)("code",null,n[85].value),n[86].value),(0,t.tZ)(e.Z,{lang:"jsx"},n[87].value),(0,t.tZ)("p",null,n[88].value,(0,t.tZ)("code",null,n[89].value),n[90].value,(0,t.tZ)("code",null,n[91].value),n[92].value,(0,t.tZ)("code",null,n[93].value),n[94].value),(0,t.tZ)(e.Z,{lang:"jsx"},n[95].value),(0,t.tZ)("h3",{id:"set-twotone-color"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#set-twotone-color"},(0,t.tZ)("span",{className:"icon icon-link"})),"Set TwoTone Color"),(0,t.tZ)("p",null,n[96].value,(0,t.tZ)("code",null,n[97].value),n[98].value,(0,t.tZ)("code",null,n[99].value),n[100].value),(0,t.tZ)(e.Z,{lang:"jsx"},n[101].value),(0,t.tZ)("h3",{id:"custom-font-icon"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#custom-font-icon"},(0,t.tZ)("span",{className:"icon icon-link"})),"Custom Font Icon"),(0,t.tZ)("p",null,n[102].value,(0,t.tZ)("code",null,n[103].value),n[104].value,(0,t.tZ)("a",{href:"http://iconfont.cn/"},n[105].value),n[106].value),(0,t.tZ)("blockquote",null,(0,t.tZ)("p",null,n[107].value,(0,t.tZ)("a",{href:"http://iconfont.cn/"},n[108].value),n[109].value)),(0,t.tZ)(e.Z,{lang:"js"},n[110].value),(0,t.tZ)("p",null,n[111].value),(0,t.tZ)("p",null,n[112].value),(0,t.tZ)(o.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[113].value),(0,t.tZ)("th",null,n[114].value),(0,t.tZ)("th",null,n[115].value),(0,t.tZ)("th",null,n[116].value),(0,t.tZ)("th",null,n[117].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[118].value),(0,t.tZ)("td",null,n[119].value),(0,t.tZ)("td",null,n[120].value),(0,t.tZ)("td",null,n[121].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[122].value),(0,t.tZ)("td",null,n[123].value,(0,t.tZ)("a",{href:"http://iconfont.cn/"},n[124].value),n[125].value,(0,t.tZ)("code",null,n[126].value),n[127].value,(0,t.tZ)("code",null,n[128].value)),(0,t.tZ)("td",null,n[129].value),(0,t.tZ)("td",null,n[130].value),(0,t.tZ)("td",null)))),(0,t.tZ)("p",null,n[131].value,(0,t.tZ)("code",null,n[132].value),n[133].value),(0,t.tZ)("p",null,n[134].value,(0,t.tZ)("a",{href:"http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code"},n[135].value),n[136].value,(0,t.tZ)("code",null,n[137].value),n[138].value),(0,t.tZ)("h3",{id:"custom-svg-icon"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#custom-svg-icon"},(0,t.tZ)("span",{className:"icon icon-link"})),"Custom SVG Icon"),(0,t.tZ)("p",null,n[139].value,(0,t.tZ)("code",null,n[140].value),n[141].value,(0,t.tZ)("a",{href:"https://www.npmjs.com/package/@svgr/webpack"},(0,t.tZ)("code",null,n[142].value)),n[143].value,(0,t.tZ)("code",null,n[144].value),n[145].value,(0,t.tZ)("code",null,n[146].value),n[147].value,(0,t.tZ)("a",{href:"https://github.com/smooth-code/svgr#options"},n[148].value),n[149].value),(0,t.tZ)(e.Z,{lang:"js"},n[150].value),(0,t.tZ)(e.Z,{lang:"jsx"},n[151].value),(0,t.tZ)("p",null,n[152].value),(0,t.tZ)(o.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[153].value),(0,t.tZ)("th",null,n[154].value),(0,t.tZ)("th",null,n[155].value),(0,t.tZ)("th",null,n[156].value),(0,t.tZ)("th",null,n[157].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[158].value),(0,t.tZ)("td",null,n[159].value,(0,t.tZ)("code",null,n[160].value),n[161].value),(0,t.tZ)("td",null,n[162].value),(0,t.tZ)("td",null,n[163].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[164].value),(0,t.tZ)("td",null,n[165].value,(0,t.tZ)("code",null,n[166].value),n[167].value),(0,t.tZ)("td",null,n[168].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[169].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[170].value),(0,t.tZ)("td",null,n[171].value,(0,t.tZ)("code",null,n[172].value),n[173].value),(0,t.tZ)("td",null,n[174].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[175].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[176].value),(0,t.tZ)("td",null,n[177].value,(0,t.tZ)("code",null,n[178].value),n[179].value),(0,t.tZ)("td",null,n[180].value),(0,t.tZ)("td",null,n[181].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[182].value),(0,t.tZ)("td",null,n[183].value,(0,t.tZ)("code",null,n[184].value),n[185].value),(0,t.tZ)("td",null,n[186].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[187].value)),(0,t.tZ)("td",null)))))))}a.default=s}}]);
