"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[9653],{17343:function(_,u,n){n.r(u);var c=n(2143),p=n(50250),b=n(59378),Z=n(78190),r=n(74775),l=n(5937),o=n(2068),h=n(74399),v=n(46004),x=n(35708),B=n(30138),I=n(56140),d=n(5388),f=n(49545),E=n(92169),A=n(13140),g=n(95127),P=n(74418),D=n(97119),a=n(28257),i=n(67294),e=n(13946);function s(){var m=(0,a.eL)(),t=m.texts;return(0,e.tZ)(a.dY,null,(0,e.tZ)(i.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[1].value),(0,e.tZ)("li",null,t[2].value),(0,e.tZ)("li",null,t[3].value)),(0,e.tZ)("h3",{id:"usage-upgrade-after-4240"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#usage-upgrade-after-4240"},(0,e.tZ)("span",{className:"icon icon-link"})),"Usage upgrade after 4.24.0")),(0,e.tZ)(o.Z,{message:"After version 4.24.0, we provide a simpler usage <Breadcrumb.Item menu={{ items: [...] }}> with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0."}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)(r.Z,{lang:"jsx"},t[4].value),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(d.Z,{items:[{demo:{id:"components-breadcrumb-demo-basic"},previewerProps:{title:"Basic Usage",filename:"components/breadcrumb/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>The simplest use.</p>"}},{demo:{id:"components-breadcrumb-demo-withicon"},previewerProps:{title:"With an Icon",filename:"components/breadcrumb/demo/withIcon.tsx",jsx:`import React from 'react';
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
`,description:"<p>The icon should be placed in front of the text.</p>"}},{demo:{id:"components-breadcrumb-demo-react-router"},previewerProps:{iframe:"200",title:"react-router V6",filename:"components/breadcrumb/demo/react-router.tsx",jsx:`import React from 'react';
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
`,description:"<p>Used together with <code>react-router@6+</code>.</p>",style:`.demo {
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
}`}},{demo:{id:"components-breadcrumb-demo-separator"},previewerProps:{title:"Configuring the Separator",filename:"components/breadcrumb/demo/separator.tsx",jsx:`import React from 'react';
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
`,description:'<p>The separator can be customized by setting the separator property: <code>separator=">"</code>.</p>'}},{demo:{id:"components-breadcrumb-demo-overlay"},previewerProps:{title:"Bread crumbs with drop down menu",filename:"components/breadcrumb/demo/overlay.tsx",jsx:`import React from 'react';
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
`,description:"<p>Breadcrumbs support drop down menu.</p>"}},{demo:{id:"components-breadcrumb-demo-separator-component"},previewerProps:{title:"Configuring the Separator",filename:"components/breadcrumb/demo/separator-component.tsx",jsx:`import React from 'react';
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
`,description:"<p>The separator can be customized by setting the separator property: <code>Breadcrumb.Separator</code>.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("h3",{id:"breadcrumb"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#breadcrumb"},(0,e.tZ)("span",{className:"icon icon-link"})),"Breadcrumb"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[5].value),(0,e.tZ)("th",null,t[6].value),(0,e.tZ)("th",null,t[7].value),(0,e.tZ)("th",null,t[8].value),(0,e.tZ)("th",null,t[9].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[10].value),(0,e.tZ)("td",null,t[11].value),(0,e.tZ)("td",null,t[12].value),(0,e.tZ)("td",null,t[13].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[14].value),(0,e.tZ)("td",null,t[15].value),(0,e.tZ)("td",null,t[16].value),(0,e.tZ)("td",null,t[17].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null,t[19].value),(0,e.tZ)("td",null,(0,e.tZ)(a.rU,{to:"#routes"},t[20].value)),(0,e.tZ)("td",null,t[21].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[22].value),(0,e.tZ)("td",null,t[23].value),(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[25].value)),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"breadcrumbitem"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#breadcrumbitem"},(0,e.tZ)("span",{className:"icon icon-link"})),"Breadcrumb.Item"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[26].value),(0,e.tZ)("th",null,t[27].value),(0,e.tZ)("th",null,t[28].value),(0,e.tZ)("th",null,t[29].value),(0,e.tZ)("th",null,t[30].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[35].value),(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,(0,e.tZ)(a.rU,{to:"/components/dropdown"},t[37].value)),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,t[40].value),(0,e.tZ)("td",null,t[41].value),(0,e.tZ)("td",null,t[42].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[43].value),(0,e.tZ)("td",null,t[44].value),(0,e.tZ)("td",null,(0,e.tZ)(a.rU,{to:"/components/menu/#API"},t[45].value)),(0,e.tZ)("td",null,t[46].value),(0,e.tZ)("td",null,t[47].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[48].value),(0,e.tZ)("td",null,t[49].value),(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null,t[51].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"breadcrumbseparator"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#breadcrumbseparator"},(0,e.tZ)("span",{className:"icon icon-link"})),"Breadcrumb.Separator"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[52].value),(0,e.tZ)("th",null,t[53].value),(0,e.tZ)("th",null,t[54].value),(0,e.tZ)("th",null,t[55].value),(0,e.tZ)("th",null,t[56].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[57].value),(0,e.tZ)("td",null,t[58].value),(0,e.tZ)("td",null,t[59].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[60].value)),(0,e.tZ)("td",null)))),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,t[61].value,(0,e.tZ)("code",null,t[62].value),t[63].value,(0,e.tZ)("code",null,t[64].value),t[65].value)),(0,e.tZ)("h3",{id:"routes"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#routes"},(0,e.tZ)("span",{className:"icon icon-link"})),"routes"),(0,e.tZ)(r.Z,{lang:"ts"},t[66].value),(0,e.tZ)("h3",{id:"use-with-browserhistory"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#use-with-browserhistory"},(0,e.tZ)("span",{className:"icon icon-link"})),"Use with browserHistory"),(0,e.tZ)("p",null,t[67].value,(0,e.tZ)("code",null,t[68].value),t[69].value,(0,e.tZ)("code",null,t[70].value),t[71].value,(0,e.tZ)("code",null,t[72].value),t[73].value),(0,e.tZ)(r.Z,{lang:"jsx"},t[74].value))))}u.default=s}}]);
