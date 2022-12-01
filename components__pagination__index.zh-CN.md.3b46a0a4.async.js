"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6299],{21713:function(r,l,e){e.r(l);var m=e(2143),p=e(50250),Z=e(59378),v=e(78190),o=e(74775),u=e(5937),c=e(2068),g=e(74399),x=e(46004),P=e(35708),h=e(30138),E=e(56140),i=e(5388),f=e(49545),C=e(92169),A=e(13140),D=e(95127),M=e(74418),O=e(97119),a=e(28257),d=e(67294),t=e(13946);function s(){var _=(0,a.eL)(),n=_.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(d.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[1].value),(0,t.tZ)("li",null,n[2].value)),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(i.Z,{items:[{demo:{id:"components-pagination-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/pagination/demo/basic.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const App = () => <Pagination defaultCurrent={1} total={50} />;
export default App;
`,description:"<p>\u57FA\u7840\u5206\u9875\u3002</p>"}},{demo:{id:"components-pagination-demo-more"},previewerProps:{title:"\u66F4\u591A",filename:"components/pagination/demo/more.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const App = () => <Pagination defaultCurrent={6} total={500} />;
export default App;
`,description:"<p>\u66F4\u591A\u5206\u9875\u3002</p>"}},{demo:{id:"components-pagination-demo-changer"},previewerProps:{title:"\u6539\u53D8",filename:"components/pagination/demo/changer.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const App = () => (
  <>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    />
  </>
);
export default App;
`,description:"<p>\u6539\u53D8\u6BCF\u9875\u663E\u793A\u6761\u76EE\u6570\u3002</p>"}},{demo:{id:"components-pagination-demo-jump"},previewerProps:{title:"\u8DF3\u8F6C",filename:"components/pagination/demo/jump.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const onChange = (pageNumber) => {
  console.log('Page: ', pageNumber);
};
const App = () => (
  <>
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
    <br />
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled />
  </>
);
export default App;
`,description:"<p>\u5FEB\u901F\u8DF3\u8F6C\u5230\u67D0\u4E00\u9875\u3002</p>"}},{demo:{id:"components-pagination-demo-mini"},previewerProps:{title:"\u8FF7\u4F60",filename:"components/pagination/demo/mini.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const showTotal = (total) => \`Total \${total} items\`;
const App = () => (
  <>
    <Pagination size="small" total={50} />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <Pagination size="small" total={50} showTotal={showTotal} />
    <Pagination
      size="small"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />
  </>
);
export default App;
`,description:"<p>\u8FF7\u4F60\u7248\u672C\u3002</p>",style:`#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}`}},{demo:{id:"components-pagination-demo-simple"},previewerProps:{title:"\u7B80\u6D01",filename:"components/pagination/demo/simple.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const App = () => (
  <>
    <Pagination simple defaultCurrent={2} total={50} />
    <br />
    <Pagination disabled simple defaultCurrent={2} total={50} />
  </>
);
export default App;
`,description:"<p>\u7B80\u5355\u7684\u7FFB\u9875\u3002</p>"}},{demo:{id:"components-pagination-demo-controlled"},previewerProps:{title:"\u53D7\u63A7",filename:"components/pagination/demo/controlled.tsx",jsx:`import React, { useState } from 'react';
import { Pagination } from 'antd';
const App = () => {
  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return <Pagination current={current} onChange={onChange} total={50} />;
};
export default App;
`,description:"<p>\u53D7\u63A7\u5236\u7684\u9875\u7801\u3002</p>"}},{demo:{id:"components-pagination-demo-total"},previewerProps:{title:"\u603B\u6570",filename:"components/pagination/demo/total.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const App = () => (
  <>
    <Pagination
      total={85}
      showTotal={(total) => \`Total \${total} items\`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
    <br />
    <Pagination
      total={85}
      showTotal={(total, range) => \`\${range[0]}-\${range[1]} of \${total} items\`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  </>
);
export default App;
`,description:"<p>\u901A\u8FC7\u8BBE\u7F6E <code>showTotal</code> \u5C55\u793A\u603B\u5171\u6709\u591A\u5C11\u6570\u636E\u3002</p>"}},{demo:{id:"components-pagination-demo-all"},previewerProps:{title:"\u5168\u90E8\u5C55\u793A",filename:"components/pagination/demo/all.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const App = () => (
  <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => \`Total \${total} items\`}
  />
);
export default App;
`,description:"<p>\u5C55\u793A\u6240\u6709\u914D\u7F6E\u9009\u9879\u3002</p>"}},{demo:{id:"components-pagination-demo-itemrender"},previewerProps:{title:"\u4E0A\u4E00\u6B65\u548C\u4E0B\u4E00\u6B65",filename:"components/pagination/demo/itemRender.tsx",jsx:`import React from 'react';
import { Pagination } from 'antd';
const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};
const App = () => <Pagination total={500} itemRender={itemRender} />;
export default App;
`,description:"<p>\u4FEE\u6539\u4E0A\u4E00\u6B65\u548C\u4E0B\u4E00\u6B65\u4E3A\u6587\u5B57\u94FE\u63A5\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(o.Z,{lang:"jsx"},n[3].value),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[4].value),(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value),(0,t.tZ)("th",null,n[8].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[9].value),(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[33].value),(0,t.tZ)("td",null,n[34].value),(0,t.tZ)("td",null,n[35].value),(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[37].value),(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null,n[40].value,(0,t.tZ)("code",null,n[41].value),n[42].value,(0,t.tZ)("code",null,n[43].value),n[44].value,(0,t.tZ)("code",null,n[45].value),n[46].value,(0,t.tZ)("code",null,n[47].value),n[48].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null,n[52].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[53].value),(0,t.tZ)("td",null,n[54].value),(0,t.tZ)("td",null,n[55].value),(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null,n[58].value),(0,t.tZ)("td",null,n[59].value),(0,t.tZ)("td",null,n[60].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[61].value),(0,t.tZ)("td",null,n[62].value,(0,t.tZ)("code",null,n[63].value),n[64].value,(0,t.tZ)("code",null,n[65].value),n[66].value),(0,t.tZ)("td",null,n[67].value),(0,t.tZ)("td",null,n[68].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[69].value),(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[73].value),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null,n[75].value),(0,t.tZ)("td",null,n[76].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[77].value),(0,t.tZ)("td",null,n[78].value),(0,t.tZ)("td",null,n[79].value),(0,t.tZ)("td",null,n[80].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[81].value),(0,t.tZ)("td",null,n[82].value,(0,t.tZ)("code",null,n[83].value),n[84].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[85].value),n[86].value,(0,t.tZ)("code",null,n[87].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[88].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[89].value),(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,n[92].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null,n[94].value,(0,t.tZ)("code",null,n[95].value),n[96].value),(0,t.tZ)("td",null,n[97].value),(0,t.tZ)("td",null,n[98].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[99].value),(0,t.tZ)("td",null,n[100].value),(0,t.tZ)("td",null,n[101].value),(0,t.tZ)("td",null,n[102].value),(0,t.tZ)("td",null)))))))}l.default=s}}]);
