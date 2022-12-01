"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6914],{26433:function(_,l,n){n.r(l);var c=n(2143),p=n(50250),Z=n(59378),b=n(78190),u=n(74775),r=n(5937),d=n(2068),v=n(74399),x=n(46004),h=n(35708),B=n(30138),E=n(56140),o=n(5388),I=n(49545),A=n(92169),f=n(13140),D=n(95127),P=n(74418),C=n(97119),a=n(28257),i=n(67294),e=n(13946);function m(){var s=(0,a.eL)(),t=s.texts;return(0,e.tZ)(a.dY,null,(0,e.tZ)(i.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[1].value),(0,e.tZ)("li",null,t[2].value),(0,e.tZ)("li",null,t[3].value)),(0,e.tZ)("h3",{id:"4240-\u7528\u6CD5\u5347\u7EA7"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#4240-\u7528\u6CD5\u5347\u7EA7"},(0,e.tZ)("span",{className:"icon icon-link"})),"4.24.0 \u7528\u6CD5\u5347\u7EA7")),(0,e.tZ)(d.Z,{message:"\u5728 4.24.0 \u7248\u672C\u540E\uFF0C\u6211\u4EEC\u63D0\u4F9B\u4E86 <Breadcrumb.Item menu={{ items: [...] }}> \u7684\u7B80\u5199\u65B9\u5F0F\uFF0C\u6709\u66F4\u597D\u7684\u6027\u80FD\u548C\u66F4\u65B9\u4FBF\u7684\u6570\u636E\u7EC4\u7EC7\u65B9\u5F0F\uFF0C\u5F00\u53D1\u8005\u4E0D\u518D\u9700\u8981\u81EA\u884C\u62FC\u63A5 JSX\u3002\u540C\u65F6\u6211\u4EEC\u5E9F\u5F03\u4E86\u539F\u5148\u7684\u5199\u6CD5\uFF0C\u4F60\u8FD8\u662F\u53EF\u4EE5\u5728 4.x \u7EE7\u7EED\u4F7F\u7528\uFF0C\u4F46\u4F1A\u5728\u63A7\u5236\u53F0\u770B\u5230\u8B66\u544A\uFF0C\u5E76\u4F1A\u5728 5.0 \u540E\u79FB\u9664\u3002"}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)(u.Z,{lang:"jsx"},t[4].value),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(o.Z,{items:[{demo:{id:"components-breadcrumb-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/breadcrumb/demo/basic.tsx",jsx:`import React from 'react';
import { Breadcrumb } from 'antd';
const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application Center</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Application List</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
);
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>"}},{demo:{id:"components-breadcrumb-demo-withicon"},previewerProps:{title:"\u5E26\u6709\u56FE\u6807\u7684",filename:"components/breadcrumb/demo/withIcon.tsx",jsx:`import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item href="">
      <HomeOutlined />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <UserOutlined />
      <span>Application List</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Application</Breadcrumb.Item>
  </Breadcrumb>
);
export default App;
`,description:"<p>\u56FE\u6807\u653E\u5728\u6587\u5B57\u524D\u9762\u3002</p>"}},{demo:{id:"components-breadcrumb-demo-react-router"},previewerProps:{iframe:"200",title:"react-router V6",filename:"components/breadcrumb/demo/react-router.tsx",jsx:`import React from 'react';
import { Alert, Breadcrumb } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>\uFF1A<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>\uFF1A<Link to="/apps/2/detail">Detail</Link>
    </li>
  </ul>
);
const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};
const Home = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = \`/\${pathSnippets.slice(0, index + 1).join('/')}\`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <div className="demo">
      <div className="demo-nav">
        <Link to="/">Home</Link>
        <Link to="/apps">Application List</Link>
      </div>
      <Routes>
        <Route path="/apps" element={<Apps />} />
        <Route path="*" element={<span>Home Page</span>} />
      </Routes>
      <Alert
        style={{
          margin: '16px 0',
        }}
        message="Click the navigation above to switch:"
      />
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};
const App = () => (
  <HashRouter>
    <Home />
  </HashRouter>
);
export default App;
`,description:"<p>\u4E0E <code>react-router@6+</code> \u7ED3\u5408\u4F7F\u7528\uFF0C\u751F\u6210\u548C\u8DEF\u7531\u7ED1\u5B9A\u7684\u9762\u5305\u5C51\u3002</p>",style:`.demo {
  margin: 16px;
}
.demo-nav {
  height: 30px;
  margin-bottom: 16px;
  line-height: 30px;
  background: #f8f8f8;
}
.demo-nav a {
  padding: 0 8px;
  line-height: 30px;
}
.app-list {
  margin-top: 16px;
}`}},{demo:{id:"components-breadcrumb-demo-separator"},previewerProps:{title:"\u5206\u9694\u7B26",filename:"components/breadcrumb/demo/separator.tsx",jsx:`import React from 'react';
import { Breadcrumb } from 'antd';
const App = () => (
  <Breadcrumb separator=">">
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
);
export default App;
`,description:'<p>\u4F7F\u7528 <code>separator=">"</code> \u53EF\u4EE5\u81EA\u5B9A\u4E49\u5206\u9694\u7B26\u3002</p>'}},{demo:{id:"components-breadcrumb-demo-overlay"},previewerProps:{title:"\u5E26\u4E0B\u62C9\u83DC\u5355\u7684\u9762\u5305\u5C51",filename:"components/breadcrumb/demo/overlay.tsx",jsx:`import React from 'react';
import { Breadcrumb } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];
const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Component</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item
      menu={{
        items,
      }}
    >
      <a href="">General</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Button</Breadcrumb.Item>
  </Breadcrumb>
);
export default App;
`,description:"<p>\u9762\u5305\u5C51\u652F\u6301\u4E0B\u62C9\u83DC\u5355\u3002</p>"}},{demo:{id:"components-breadcrumb-demo-separator-component"},previewerProps:{title:"\u5206\u9694\u7B26",filename:"components/breadcrumb/demo/separator-component.tsx",jsx:`import React from 'react';
import { Breadcrumb } from 'antd';
const App = () => (
  <Breadcrumb separator="">
    <Breadcrumb.Item>Location</Breadcrumb.Item>
    <Breadcrumb.Separator>:</Breadcrumb.Separator>
    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>Breadcrumb.Separator</code> \u53EF\u4EE5\u81EA\u5B9A\u4E49\u5206\u9694\u7B26\u3002</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"breadcrumb"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#breadcrumb"},(0,e.tZ)("span",{className:"icon icon-link"})),"Breadcrumb"),(0,e.tZ)(r.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[5].value),(0,e.tZ)("th",null,t[6].value),(0,e.tZ)("th",null,t[7].value),(0,e.tZ)("th",null,t[8].value),(0,e.tZ)("th",null,t[9].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[10].value),(0,e.tZ)("td",null,t[11].value),(0,e.tZ)("td",null,t[12].value),(0,e.tZ)("td",null,t[13].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[14].value),(0,e.tZ)("td",null,t[15].value),(0,e.tZ)("td",null,t[16].value),(0,e.tZ)("td",null,t[17].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null,t[19].value),(0,e.tZ)("td",null,(0,e.tZ)(a.rU,{to:"#routes"},t[20].value)),(0,e.tZ)("td",null,t[21].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[22].value),(0,e.tZ)("td",null,t[23].value),(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[25].value)),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"breadcrumbitem"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#breadcrumbitem"},(0,e.tZ)("span",{className:"icon icon-link"})),"Breadcrumb.Item"),(0,e.tZ)(r.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[26].value),(0,e.tZ)("th",null,t[27].value),(0,e.tZ)("th",null,t[28].value),(0,e.tZ)("th",null,t[29].value),(0,e.tZ)("th",null,t[30].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[35].value),(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,(0,e.tZ)(a.rU,{to:"/components/dropdown"},t[37].value)),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,t[40].value),(0,e.tZ)("td",null,t[41].value),(0,e.tZ)("td",null,t[42].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[43].value),(0,e.tZ)("td",null,t[44].value),(0,e.tZ)("td",null,(0,e.tZ)(a.rU,{to:"/components/menu/#API"},t[45].value)),(0,e.tZ)("td",null,t[46].value),(0,e.tZ)("td",null,t[47].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[48].value),(0,e.tZ)("td",null,t[49].value),(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null,t[51].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"breadcrumbseparator"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#breadcrumbseparator"},(0,e.tZ)("span",{className:"icon icon-link"})),"Breadcrumb.Separator"),(0,e.tZ)(r.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[52].value),(0,e.tZ)("th",null,t[53].value),(0,e.tZ)("th",null,t[54].value),(0,e.tZ)("th",null,t[55].value),(0,e.tZ)("th",null,t[56].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[57].value),(0,e.tZ)("td",null,t[58].value),(0,e.tZ)("td",null,t[59].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[60].value)),(0,e.tZ)("td",null)))),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,t[61].value,(0,e.tZ)("code",null,t[62].value),t[63].value,(0,e.tZ)("code",null,t[64].value),t[65].value)),(0,e.tZ)("h3",{id:"routes"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#routes"},(0,e.tZ)("span",{className:"icon icon-link"})),"routes"),(0,e.tZ)(u.Z,{lang:"ts"},t[66].value),(0,e.tZ)("h3",{id:"\u548C-browserhistory-\u914D\u5408"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u548C-browserhistory-\u914D\u5408"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u548C browserHistory \u914D\u5408"),(0,e.tZ)("p",null,t[67].value,(0,e.tZ)("code",null,t[68].value),t[69].value,(0,e.tZ)("code",null,t[70].value),t[71].value),(0,e.tZ)(u.Z,{lang:"jsx"},t[72].value))))}l.default=m}}]);
