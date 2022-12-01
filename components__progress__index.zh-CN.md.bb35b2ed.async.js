"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7579],{38461:function(p,r,n){n.r(r);var i=n(2143),c=n(50250),_=n(59378),m=n(78190),v=n(74775),l=n(5937),Z=n(2068),P=n(74399),g=n(46004),x=n(35708),f=n(30138),h=n(56140),o=n(5388),E=n(49545),A=n(92169),O=n(13140),D=n(95127),M=n(74418),W=n(97119),s=n(28257),a=n(67294),e=n(13946);function u(){var d=(0,s.eL)(),t=d.texts;return(0,e.tZ)(s.dY,null,(0,e.tZ)(a.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("p",null,t[1].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[2].value),(0,e.tZ)("li",null,t[3].value)),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(o.Z,{items:[{demo:{id:"components-progress-demo-line"},previewerProps:{title:"\u8FDB\u5EA6\u6761",filename:"components/progress/demo/line.tsx",jsx:`import React from 'react';
import { Progress } from 'antd';
const App = () => (
  <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </>
);
export default App;
`,description:"<p>\u6807\u51C6\u7684\u8FDB\u5EA6\u6761\u3002</p>"}},{demo:{id:"components-progress-demo-circle"},previewerProps:{title:"\u8FDB\u5EA6\u5708",filename:"components/progress/demo/circle.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </Space>
);
export default App;
`,description:"<p>\u5708\u5F62\u7684\u8FDB\u5EA6\u3002</p>"}},{demo:{id:"components-progress-demo-line-mini"},previewerProps:{title:"\u5C0F\u578B\u8FDB\u5EA6\u6761",filename:"components/progress/demo/line-mini.tsx",jsx:`import React from 'react';
import { Progress } from 'antd';
const App = () => (
  <div
    style={{
      width: 170,
    }}
  >
    <Progress percent={30} size="small" />
    <Progress percent={50} size="small" status="active" />
    <Progress percent={70} size="small" status="exception" />
    <Progress percent={100} size="small" />
  </div>
);
export default App;
`,description:"<p>\u9002\u5408\u653E\u5728\u8F83\u72ED\u7A84\u7684\u533A\u57DF\u5185\u3002</p>"}},{demo:{id:"components-progress-demo-circle-micro"},previewerProps:{title:"\u54CD\u5E94\u5F0F\u8FDB\u5EA6\u5708",filename:"components/progress/demo/circle-micro.tsx",jsx:`import React from 'react';
import { Progress } from 'antd';
const App = () => (
  <>
    <Progress
      type="circle"
      trailColor="#e6f4ff"
      percent={60}
      strokeWidth={20}
      width={14}
      format={(number) => \`\u8FDB\u884C\u4E2D\uFF0C\u5DF2\u5B8C\u6210\${number}%\`}
    />
    <span
      style={{
        marginLeft: 8,
      }}
    >
      \u4EE3\u7801\u53D1\u5E03
    </span>
  </>
);
export default App;
`,description:"<p>\u54CD\u5E94\u5F0F\u7684\u5708\u5F62\u8FDB\u5EA6\uFF0C\u5F53 <code>width</code> \u5C0F\u4E8E\u7B49\u4E8E 20 \u7684\u65F6\u5019\uFF0C\u8FDB\u5EA6\u4FE1\u606F\u5C06\u4E0D\u4F1A\u663E\u793A\u5728\u8FDB\u5EA6\u5708\u91CC\u9762\uFF0C\u800C\u662F\u4EE5 Tooltip \u7684\u5F62\u5F0F\u663E\u793A\u3002</p>"}},{demo:{id:"components-progress-demo-circle-mini"},previewerProps:{title:"\u5C0F\u578B\u8FDB\u5EA6\u5708",filename:"components/progress/demo/circle-mini.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="circle" percent={30} width={80} />
    <Progress type="circle" percent={70} width={80} status="exception" />
    <Progress type="circle" percent={100} width={80} />
  </Space>
);
export default App;
`,description:"<p>\u5C0F\u4E00\u53F7\u7684\u5708\u5F62\u8FDB\u5EA6\u3002</p>"}},{demo:{id:"components-progress-demo-circle-dynamic"},previewerProps:{title:"\u8FDB\u5EA6\u5708\u52A8\u6001\u5C55\u793A",filename:"components/progress/demo/circle-dynamic.tsx",jsx:`import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';
const App = () => {
  const [percent, setPercent] = useState(0);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  return (
    <>
      <Progress
        type="circle"
        percent={percent}
        style={{
          marginRight: 8,
        }}
      />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};
export default App;
`,description:"<p>\u4F1A\u52A8\u7684\u8FDB\u5EA6\u6761\u624D\u662F\u597D\u8FDB\u5EA6\u6761\u3002</p>"}},{demo:{id:"components-progress-demo-dynamic"},previewerProps:{title:"\u52A8\u6001\u5C55\u793A",filename:"components/progress/demo/dynamic.tsx",jsx:`import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';
const App = () => {
  const [percent, setPercent] = useState(0);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  return (
    <>
      <Progress percent={percent} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};
export default App;
`,description:"<p>\u4F1A\u52A8\u7684\u8FDB\u5EA6\u6761\u624D\u662F\u597D\u8FDB\u5EA6\u6761\u3002</p>"}},{demo:{id:"components-progress-demo-format"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u6587\u5B57\u683C\u5F0F",filename:"components/progress/demo/format.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="circle" percent={75} format={(percent) => \`\${percent} Days\`} />
    <Progress type="circle" percent={100} format={() => 'Done'} />
  </Space>
);
export default App;
`,description:"<p><code>format</code> \u5C5E\u6027\u6307\u5B9A\u683C\u5F0F\u3002</p>"}},{demo:{id:"components-progress-demo-dashboard"},previewerProps:{title:"\u4EEA\u8868\u76D8",filename:"components/progress/demo/dashboard.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </Space>
);
export default App;
`,description:"<p>\u901A\u8FC7\u8BBE\u7F6E <code>type=dashboard</code>\uFF0C\u53EF\u4EE5\u5F88\u65B9\u4FBF\u5730\u5B9E\u73B0\u4EEA\u8868\u76D8\u6837\u5F0F\u7684\u8FDB\u5EA6\u6761\u3002\u82E5\u60F3\u8981\u4FEE\u6539\u7F3A\u53E3\u7684\u89D2\u5EA6\uFF0C\u53EF\u4EE5\u8BBE\u7F6E <code>gapDegree</code> \u4E3A\u4F60\u60F3\u8981\u7684\u503C\u3002</p>"}},{demo:{id:"components-progress-demo-segment"},previewerProps:{title:"\u5206\u6BB5\u8FDB\u5EA6\u6761",filename:"components/progress/demo/segment.tsx",jsx:`import React from 'react';
import { Progress, Tooltip, Space } from 'antd';
const App = () => (
  <>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress
        percent={60}
        success={{
          percent: 30,
        }}
      />
    </Tooltip>
    <Space wrap>
      <Tooltip title="3 done / 3 in progress / 4 to do">
        <Progress
          percent={60}
          success={{
            percent: 30,
          }}
          type="circle"
        />
      </Tooltip>
      <Tooltip title="3 done / 3 in progress / 4 to do">
        <Progress
          percent={60}
          success={{
            percent: 30,
          }}
          type="dashboard"
        />
      </Tooltip>
    </Space>
  </>
);
export default App;
`,description:'<p>\u6807\u51C6\u7684\u8FDB\u5EA6\u6761\u3002<code>type="circle|dashboard"</code> \u65F6\u4E0D\u652F\u6301\u5206\u6BB5\u989C\u8272\u3002</p>'}},{demo:{id:"components-progress-demo-linecap"},previewerProps:{title:"\u8FB9\u7F18\u5F62\u72B6",filename:"components/progress/demo/linecap.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <>
    <Progress strokeLinecap="butt" percent={75} />
    <Space wrap>
      <Progress strokeLinecap="butt" type="circle" percent={75} />
      <Progress strokeLinecap="butt" type="dashboard" percent={75} />
    </Space>
  </>
);
export default App;
`,description:'<p>\u901A\u8FC7\u8BBE\u5B9A <code>strokeLinecap="butt"</code> \u53EF\u4EE5\u8C03\u6574\u8FDB\u5EA6\u6761\u8FB9\u7F18\u7684\u5F62\u72B6\u4E3A\u65B9\u5F62\uFF0C\u8BE6\u89C1 <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap">stroke-linecap</a>\u3002</p>'}},{demo:{id:"components-progress-demo-gradient-line"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u8FDB\u5EA6\u6761\u6E10\u53D8\u8272",filename:"components/progress/demo/gradient-line.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <>
    <Progress
      percent={99.9}
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
    />
    <Progress
      percent={99.9}
      status="active"
      strokeColor={{
        from: '#108ee9',
        to: '#87d068',
      }}
    />
    <Space wrap>
      <Progress
        type="circle"
        percent={90}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
      <Progress
        type="circle"
        percent={100}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
    </Space>
  </>
);
export default App;
`,description:"<p><code>linear-gradient</code> \u7684\u5C01\u88C5\u3002\u63A8\u8350\u53EA\u4F20\u4E24\u79CD\u989C\u8272\u3002</p>"}},{demo:{id:"components-progress-demo-steps"},previewerProps:{title:"\u6B65\u9AA4\u8FDB\u5EA6\u6761",filename:"components/progress/demo/steps.tsx",jsx:`import React from 'react';
import { Progress } from 'antd';
import { red, green } from '@ant-design/colors';
const App = () => (
  <>
    <Progress percent={50} steps={3} />
    <br />
    <Progress percent={30} steps={5} />
    <br />
    <Progress percent={100} steps={5} size="small" strokeColor={green[6]} />
    <br />
    <Progress percent={60} steps={5} strokeColor={[green[6], green[6], red[5]]} />
  </>
);
export default App;
`,description:"<p>\u5E26\u6B65\u9AA4\u7684\u8FDB\u5EA6\u6761\u3002</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("p",null,t[4].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[5].value),(0,e.tZ)("th",null,t[6].value),(0,e.tZ)("th",null,t[7].value),(0,e.tZ)("th",null,t[8].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[9].value),(0,e.tZ)("td",null,t[10].value),(0,e.tZ)("td",null,t[11].value),(0,e.tZ)("td",null,t[12].value,(0,e.tZ)("code",null,t[13].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[14].value),(0,e.tZ)("td",null,t[15].value),(0,e.tZ)("td",null,t[16].value),(0,e.tZ)("td",null,t[17].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null,t[19].value),(0,e.tZ)("td",null,t[20].value),(0,e.tZ)("td",null,t[21].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[22].value),(0,e.tZ)("td",null,t[23].value,(0,e.tZ)("code",null,t[24].value),t[25].value,(0,e.tZ)("code",null,t[26].value),t[27].value,(0,e.tZ)("code",null,t[28].value),t[29].value,(0,e.tZ)("code",null,t[30].value),t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null,t[35].value),(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,t[37].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[40].value),t[41].value,(0,e.tZ)("code",null,t[42].value),t[43].value,(0,e.tZ)("code",null,t[44].value),t[45].value,(0,e.tZ)("a",{href:"https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap"},t[46].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[47].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[48].value),(0,e.tZ)("td",null,t[49].value),(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null,t[51].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[52].value),(0,e.tZ)("td",null,t[53].value),(0,e.tZ)("td",null,t[54].value),(0,e.tZ)("td",null,t[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[56].value),(0,e.tZ)("td",null,t[57].value,(0,e.tZ)("code",null,t[58].value),t[59].value,(0,e.tZ)("code",null,t[60].value),t[61].value,(0,e.tZ)("code",null,t[62].value)),(0,e.tZ)("td",null,t[63].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[64].value))))),(0,e.tZ)("h3",{id:"typeline"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typeline"},(0,e.tZ)("span",{className:"icon icon-link"})),(0,e.tZ)("code",null,t[65].value)),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[66].value),(0,e.tZ)("th",null,t[67].value),(0,e.tZ)("th",null,t[68].value),(0,e.tZ)("th",null,t[69].value),(0,e.tZ)("th",null,t[70].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[71].value),(0,e.tZ)("td",null,t[72].value),(0,e.tZ)("td",null,t[73].value),(0,e.tZ)("td",null,t[74].value),(0,e.tZ)("td",null,t[75].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[76].value),(0,e.tZ)("td",null,t[77].value,(0,e.tZ)("code",null,t[78].value),t[79].value),(0,e.tZ)("td",null,t[80].value),(0,e.tZ)("td",null,t[81].value),(0,e.tZ)("td",null,t[82].value,(0,e.tZ)("code",null,t[83].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[84].value),(0,e.tZ)("td",null,t[85].value),(0,e.tZ)("td",null,t[86].value),(0,e.tZ)("td",null,t[87].value),(0,e.tZ)("td",null,t[88].value)))),(0,e.tZ)("h3",{id:"typecircle"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typecircle"},(0,e.tZ)("span",{className:"icon icon-link"})),(0,e.tZ)("code",null,t[89].value)),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[90].value),(0,e.tZ)("th",null,t[91].value),(0,e.tZ)("th",null,t[92].value),(0,e.tZ)("th",null,t[93].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[94].value),(0,e.tZ)("td",null,t[95].value),(0,e.tZ)("td",null,t[96].value),(0,e.tZ)("td",null,t[97].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[98].value),(0,e.tZ)("td",null,t[99].value),(0,e.tZ)("td",null,t[100].value),(0,e.tZ)("td",null,t[101].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[102].value),(0,e.tZ)("td",null,t[103].value),(0,e.tZ)("td",null,t[104].value),(0,e.tZ)("td",null,t[105].value)))),(0,e.tZ)("h3",{id:"typedashboard"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typedashboard"},(0,e.tZ)("span",{className:"icon icon-link"})),(0,e.tZ)("code",null,t[106].value)),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[107].value),(0,e.tZ)("th",null,t[108].value),(0,e.tZ)("th",null,t[109].value),(0,e.tZ)("th",null,t[110].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[111].value),(0,e.tZ)("td",null,t[112].value),(0,e.tZ)("td",null,t[113].value),(0,e.tZ)("td",null,t[114].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[115].value),(0,e.tZ)("td",null,t[116].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[117].value),t[118].value,(0,e.tZ)("code",null,t[119].value),t[120].value,(0,e.tZ)("code",null,t[121].value),t[122].value,(0,e.tZ)("code",null,t[123].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[124].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[125].value),(0,e.tZ)("td",null,t[126].value),(0,e.tZ)("td",null,t[127].value),(0,e.tZ)("td",null,t[128].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[129].value),(0,e.tZ)("td",null,t[130].value),(0,e.tZ)("td",null,t[131].value),(0,e.tZ)("td",null,t[132].value)))))))}r.default=u}}]);
