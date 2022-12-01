"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[1199],{11265:function(d,r,n){n.r(r);var p=n(2143),c=n(50250),_=n(59378),m=n(78190),v=n(74775),l=n(5937),Z=n(2068),g=n(74399),P=n(46004),x=n(35708),f=n(30138),h=n(56140),o=n(5388),E=n(49545),A=n(92169),b=n(13140),D=n(95127),M=n(74418),O=n(97119),s=n(28257),a=n(67294),e=n(13946);function u(){var i=(0,s.eL)(),t=i.texts;return(0,e.tZ)(s.dY,null,(0,e.tZ)(a.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("p",null,t[1].value,(0,e.tZ)("code",null,t[2].value),t[3].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[4].value),(0,e.tZ)("li",null,t[5].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(o.Z,{items:[{demo:{id:"components-progress-demo-line"},previewerProps:{title:"Progress bar",filename:"components/progress/demo/line.tsx",jsx:`import React from 'react';
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
`,description:"<p>A standard progress bar.</p>"}},{demo:{id:"components-progress-demo-circle"},previewerProps:{title:"Circular progress bar",filename:"components/progress/demo/circle.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </Space>
);
export default App;
`,description:"<p>A circular progress bar.</p>"}},{demo:{id:"components-progress-demo-line-mini"},previewerProps:{title:"Mini size progress bar",filename:"components/progress/demo/line-mini.tsx",jsx:`import React from 'react';
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
`,description:"<p>Appropriate for a narrow area.</p>"}},{demo:{id:"components-progress-demo-circle-micro"},previewerProps:{title:"Responsive circular progress bar",filename:"components/progress/demo/circle-micro.tsx",jsx:`import React from 'react';
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
`,description:"<p>Responsive circular progress bar. When <code>width</code> is smaller than 20, progress information will be displayed in Tooltip.</p>"}},{demo:{id:"components-progress-demo-circle-mini"},previewerProps:{title:"Mini size circular progress bar",filename:"components/progress/demo/circle-mini.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="circle" percent={30} width={80} />
    <Progress type="circle" percent={70} width={80} status="exception" />
    <Progress type="circle" percent={100} width={80} />
  </Space>
);
export default App;
`,description:"<p>A smaller circular progress bar.</p>"}},{demo:{id:"components-progress-demo-circle-dynamic"},previewerProps:{title:"Dynamic circular progress bar",filename:"components/progress/demo/circle-dynamic.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>A dynamic progress bar is better.</p>"}},{demo:{id:"components-progress-demo-dynamic"},previewerProps:{title:"Dynamic",filename:"components/progress/demo/dynamic.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>A dynamic progress bar is better.</p>"}},{demo:{id:"components-progress-demo-format"},previewerProps:{title:"Custom text format",filename:"components/progress/demo/format.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="circle" percent={75} format={(percent) => \`\${percent} Days\`} />
    <Progress type="circle" percent={100} format={() => 'Done'} />
  </Space>
);
export default App;
`,description:"<p>You can set a custom text by setting the <code>format</code> prop.</p>"}},{demo:{id:"components-progress-demo-dashboard"},previewerProps:{title:"Dashboard",filename:"components/progress/demo/dashboard.tsx",jsx:`import React from 'react';
import { Progress, Space } from 'antd';
const App = () => (
  <Space wrap>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </Space>
);
export default App;
`,description:"<p>By setting <code>type=dashboard</code>, you can get a dashboard style of progress easily. Modify <code>gapDegree</code> to set the degree of gap.</p>"}},{demo:{id:"components-progress-demo-segment"},previewerProps:{title:"Progress bar with success segment",filename:"components/progress/demo/segment.tsx",jsx:`import React from 'react';
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
`,description:`<p>A standard progress bar. Doesn't support trail color when <code>type="circle|dashboard"</code>.</p>`}},{demo:{id:"components-progress-demo-linecap"},previewerProps:{title:"Stroke Linecap",filename:"components/progress/demo/linecap.tsx",jsx:`import React from 'react';
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
`,description:'<p>By setting <code>strokeLinecap="butt"</code>, you can change the linecaps from <code>round</code> to <code>butt</code>, see <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap">stroke-linecap</a> for more information.</p>'}},{demo:{id:"components-progress-demo-gradient-line"},previewerProps:{title:"Custom line gradient",filename:"components/progress/demo/gradient-line.tsx",jsx:`import React from 'react';
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
`,description:"<p>A package of <code>linear-gradient</code>. It is recommended to only pass two colors.</p>"}},{demo:{id:"components-progress-demo-steps"},previewerProps:{title:"Progress bar with steps",filename:"components/progress/demo/steps.tsx",jsx:`import React from 'react';
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
`,description:"<p>A progress bar with steps.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("p",null,t[6].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[7].value),(0,e.tZ)("th",null,t[8].value),(0,e.tZ)("th",null,t[9].value),(0,e.tZ)("th",null,t[10].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[11].value),(0,e.tZ)("td",null,t[12].value),(0,e.tZ)("td",null,t[13].value),(0,e.tZ)("td",null,t[14].value,(0,e.tZ)("code",null,t[15].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[16].value),(0,e.tZ)("td",null,t[17].value),(0,e.tZ)("td",null,t[18].value),(0,e.tZ)("td",null,t[19].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[20].value),(0,e.tZ)("td",null,t[21].value),(0,e.tZ)("td",null,t[22].value),(0,e.tZ)("td",null,t[23].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,t[25].value,(0,e.tZ)("code",null,t[26].value),t[27].value,(0,e.tZ)("code",null,t[28].value),t[29].value,(0,e.tZ)("code",null,t[30].value),t[31].value,(0,e.tZ)("code",null,t[32].value),t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null,t[35].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,t[37].value),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null,t[39].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[40].value),(0,e.tZ)("td",null,t[41].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[42].value),t[43].value,(0,e.tZ)("code",null,t[44].value),t[45].value,(0,e.tZ)("code",null,t[46].value),t[47].value,(0,e.tZ)("a",{href:"https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap"},t[48].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[49].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null,t[51].value),(0,e.tZ)("td",null,t[52].value),(0,e.tZ)("td",null,t[53].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[54].value),(0,e.tZ)("td",null,t[55].value),(0,e.tZ)("td",null,t[56].value),(0,e.tZ)("td",null,t[57].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[58].value),(0,e.tZ)("td",null,t[59].value,(0,e.tZ)("code",null,t[60].value),t[61].value,(0,e.tZ)("code",null,t[62].value),t[63].value,(0,e.tZ)("code",null,t[64].value)),(0,e.tZ)("td",null,t[65].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[66].value))))),(0,e.tZ)("h3",{id:"typeline"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typeline"},(0,e.tZ)("span",{className:"icon icon-link"})),(0,e.tZ)("code",null,t[67].value)),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[68].value),(0,e.tZ)("th",null,t[69].value),(0,e.tZ)("th",null,t[70].value),(0,e.tZ)("th",null,t[71].value),(0,e.tZ)("th",null,t[72].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[73].value),(0,e.tZ)("td",null,t[74].value),(0,e.tZ)("td",null,t[75].value),(0,e.tZ)("td",null,t[76].value),(0,e.tZ)("td",null,t[77].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[78].value),(0,e.tZ)("td",null,t[79].value,(0,e.tZ)("code",null,t[80].value),t[81].value,(0,e.tZ)("code",null,t[82].value),t[83].value,(0,e.tZ)("code",null,t[84].value),t[85].value),(0,e.tZ)("td",null,t[86].value),(0,e.tZ)("td",null,t[87].value),(0,e.tZ)("td",null,t[88].value,(0,e.tZ)("code",null,t[89].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[90].value),(0,e.tZ)("td",null,t[91].value,(0,e.tZ)("code",null,t[92].value)),(0,e.tZ)("td",null,t[93].value),(0,e.tZ)("td",null,t[94].value),(0,e.tZ)("td",null,t[95].value)))),(0,e.tZ)("h3",{id:"typecircle"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typecircle"},(0,e.tZ)("span",{className:"icon icon-link"})),(0,e.tZ)("code",null,t[96].value)),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[97].value),(0,e.tZ)("th",null,t[98].value),(0,e.tZ)("th",null,t[99].value),(0,e.tZ)("th",null,t[100].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[101].value),(0,e.tZ)("td",null,t[102].value,(0,e.tZ)("code",null,t[103].value),t[104].value),(0,e.tZ)("td",null,t[105].value),(0,e.tZ)("td",null,t[106].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[107].value),(0,e.tZ)("td",null,t[108].value),(0,e.tZ)("td",null,t[109].value),(0,e.tZ)("td",null,t[110].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[111].value),(0,e.tZ)("td",null,t[112].value,(0,e.tZ)("code",null,t[113].value)),(0,e.tZ)("td",null,t[114].value),(0,e.tZ)("td",null,t[115].value)))),(0,e.tZ)("h3",{id:"typedashboard"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typedashboard"},(0,e.tZ)("span",{className:"icon icon-link"})),(0,e.tZ)("code",null,t[116].value)),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[117].value),(0,e.tZ)("th",null,t[118].value),(0,e.tZ)("th",null,t[119].value),(0,e.tZ)("th",null,t[120].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[121].value),(0,e.tZ)("td",null,t[122].value),(0,e.tZ)("td",null,t[123].value),(0,e.tZ)("td",null,t[124].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[125].value),(0,e.tZ)("td",null,t[126].value,(0,e.tZ)("code",null,t[127].value),t[128].value,(0,e.tZ)("code",null,t[129].value),t[130].value,(0,e.tZ)("code",null,t[131].value),t[132].value,(0,e.tZ)("code",null,t[133].value)),(0,e.tZ)("td",null,t[134].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[135].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[136].value),(0,e.tZ)("td",null,t[137].value),(0,e.tZ)("td",null,t[138].value),(0,e.tZ)("td",null,t[139].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[140].value),(0,e.tZ)("td",null,t[141].value,(0,e.tZ)("code",null,t[142].value)),(0,e.tZ)("td",null,t[143].value),(0,e.tZ)("td",null,t[144].value)))))))}r.default=u}}]);
