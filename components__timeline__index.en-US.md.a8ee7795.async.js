"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6812],{6783:function(_,i,t){t.r(i);var u=t(2143),c=t(50250),p=t(59378),v=t(78190),a=t(74775),l=t(5937),T=t(2068),x=t(74399),Z=t(46004),I=t(35708),h=t(30138),g=t(56140),m=t(5388),E=t(49545),C=t(92169),f=t(13140),P=t(95127),O=t(74418),R=t(97119),o=t(28257),s=t(67294),e=t(13946);function d(){var r=(0,o.eL)(),n=r.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(s.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value),(0,e.tZ)("li",null,n[2].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(m.Z,{items:[{demo:{id:"components-timeline-demo-basic"},previewerProps:{title:"Basic",filename:"components/timeline/demo/basic.tsx",jsx:`import React from 'react';
import { Timeline } from 'antd';
const App = () => (
  <Timeline>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>
);
export default App;
`,description:"<p>Basic timeline.</p>"}},{demo:{id:"components-timeline-demo-color"},previewerProps:{title:"Color",filename:"components/timeline/demo/color.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
const App = () => (
  <Timeline>
    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item color="red">
      <p>Solve initial network problems 1</p>
      <p>Solve initial network problems 2</p>
      <p>Solve initial network problems 3 2015-09-01</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2015-09-01</p>
    </Timeline.Item>
    <Timeline.Item color="gray">
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2015-09-01</p>
    </Timeline.Item>
    <Timeline.Item color="gray">
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2015-09-01</p>
    </Timeline.Item>
    <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
      <p>Custom color testing</p>
    </Timeline.Item>
  </Timeline>
);
export default App;
`,description:"<p>Set the color of circles. <code>green</code> means completed or success status, <code>red</code> means warning or error, and <code>blue</code> means ongoing or other default status, <code>gray</code> for unfinished or disabled status.</p>"}},{demo:{id:"components-timeline-demo-pending"},previewerProps:{title:"Last node and Reversing",filename:"components/timeline/demo/pending.tsx",jsx:`import React, { useState } from 'react';
import { Button, Timeline } from 'antd';
const App = () => {
  const [reverse, setReverse] = useState(false);
  const handleClick = () => {
    setReverse(!reverse);
  };
  return (
    <div>
      <Timeline pending="Recording..." reverse={reverse}>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
      </Timeline>
      <Button
        type="primary"
        style={{
          marginTop: 16,
        }}
        onClick={handleClick}
      >
        Toggle Reverse
      </Button>
    </div>
  );
};
export default App;
`,description:"<p>When the timeline is incomplete and ongoing, put a ghost node at last. Set <code>pending</code> as truthy value to enable displaying pending item. You can customize the pending content by passing a React Element. Meanwhile, <code>pendingDot={a React Element}</code> is used to customize the dot of the pending item. <code>reverse={true}</code> is used for reversing nodes.</p>"}},{demo:{id:"components-timeline-demo-alternate"},previewerProps:{title:"Alternate",filename:"components/timeline/demo/alternate.tsx",jsx:`import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
const App = () => (
  <Timeline mode="alternate">
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item
      dot={
        <ClockCircleOutlined
          style={{
            fontSize: '16px',
          }}
        />
      }
    >
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.
    </Timeline.Item>
    <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item
      dot={
        <ClockCircleOutlined
          style={{
            fontSize: '16px',
          }}
        />
      }
    >
      Technical testing 2015-09-01
    </Timeline.Item>
  </Timeline>
);
export default App;
`,description:"<p>Alternate timeline.</p>"}},{demo:{id:"components-timeline-demo-custom"},previewerProps:{title:"Custom",filename:"components/timeline/demo/custom.tsx",jsx:`import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
const App = () => (
  <Timeline>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
      Technical testing 2015-09-01
    </Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>
);
export default App;
`,description:"<p>Set a node as an icon or other custom element.</p>",style:`.timeline-clock-icon {
  font-size: 16px;
}

[data-theme='compact'] .timeline-clock-icon {
  font-size: 14px;
}`}},{demo:{id:"components-timeline-demo-right"},previewerProps:{title:"Right alternate",filename:"components/timeline/demo/right.tsx",jsx:`import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
const App = () => (
  <Timeline mode="right">
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item
      dot={
        <ClockCircleOutlined
          style={{
            fontSize: '16px',
          }}
        />
      }
      color="red"
    >
      Technical testing 2015-09-01
    </Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>
);
export default App;
`,description:"<p>Right alternate timeline.</p>"}},{demo:{id:"components-timeline-demo-label"},previewerProps:{title:"Label",filename:"components/timeline/demo/label.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Timeline } from 'antd';
const App = () => {
  const [mode, setMode] = useState('left');
  const onChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline mode={mode}>
        <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
        <Timeline.Item>Technical testing</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
      </Timeline>
    </>
  );
};
export default App;
`,description:"<p>Use <code>label</code> show time alone.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)(a.Z,{lang:"jsx"},n[3].value),(0,e.tZ)("h3",{id:"timeline"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#timeline"},(0,e.tZ)("span",{className:"icon icon-link"})),"Timeline"),(0,e.tZ)("p",null,n[4].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[5].value),(0,e.tZ)("th",null,n[6].value),(0,e.tZ)("th",null,n[7].value),(0,e.tZ)("th",null,n[8].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[9].value),(0,e.tZ)("td",null,n[10].value,(0,e.tZ)("code",null,n[11].value),n[12].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[13].value),n[14].value,(0,e.tZ)("code",null,n[15].value),n[16].value,(0,e.tZ)("code",null,n[17].value)),(0,e.tZ)("td",null,n[18].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null,n[22].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null,n[26].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null,n[30].value)))),(0,e.tZ)("h3",{id:"timelineitem"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#timelineitem"},(0,e.tZ)("span",{className:"icon icon-link"})),"Timeline.Item"),(0,e.tZ)("p",null,n[31].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[32].value),(0,e.tZ)("th",null,n[33].value),(0,e.tZ)("th",null,n[34].value),(0,e.tZ)("th",null,n[35].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value,(0,e.tZ)("code",null,n[38].value),n[39].value,(0,e.tZ)("code",null,n[40].value),n[41].value,(0,e.tZ)("code",null,n[42].value),n[43].value,(0,e.tZ)("code",null,n[44].value),n[45].value),(0,e.tZ)("td",null,n[46].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[47].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[48].value),(0,e.tZ)("td",null,n[49].value),(0,e.tZ)("td",null,n[50].value),(0,e.tZ)("td",null,n[51].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[52].value),(0,e.tZ)("td",null,n[53].value),(0,e.tZ)("td",null,n[54].value),(0,e.tZ)("td",null,n[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[56].value),(0,e.tZ)("td",null,n[57].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[58].value),n[59].value,(0,e.tZ)("code",null,n[60].value)),(0,e.tZ)("td",null,n[61].value)))))))}i.default=d}}]);
