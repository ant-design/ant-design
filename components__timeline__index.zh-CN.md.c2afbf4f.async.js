"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2079],{49225:function(d,i,t){t.r(i);var u=t(2143),c=t(50250),p=t(59378),v=t(78190),o=t(74775),l=t(5937),T=t(2068),x=t(74399),Z=t(46004),I=t(35708),h=t(30138),g=t(56140),a=t(5388),E=t(49545),C=t(92169),P=t(13140),f=t(95127),O=t(74418),D=t(97119),m=t(28257),s=t(67294),e=t(13946);function _(){var r=(0,m.eL)(),n=r.texts;return(0,e.tZ)(m.dY,null,(0,e.tZ)(s.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value),(0,e.tZ)("li",null,n[2].value)),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(a.Z,{items:[{demo:{id:"components-timeline-demo-basic"},previewerProps:{title:"\u57FA\u672C\u7528\u6CD5",filename:"components/timeline/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u57FA\u672C\u7684\u65F6\u95F4\u8F74\u3002</p>"}},{demo:{id:"components-timeline-demo-color"},previewerProps:{title:"\u5706\u5708\u989C\u8272",filename:"components/timeline/demo/color.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5706\u5708\u989C\u8272\uFF0C\u7EFF\u8272\u7528\u4E8E\u5DF2\u5B8C\u6210\u3001\u6210\u529F\u72B6\u6001\uFF0C\u7EA2\u8272\u8868\u793A\u544A\u8B66\u6216\u9519\u8BEF\u72B6\u6001\uFF0C\u84DD\u8272\u53EF\u8868\u793A\u6B63\u5728\u8FDB\u884C\u6216\u5176\u4ED6\u9ED8\u8BA4\u72B6\u6001\uFF0C\u7070\u8272\u8868\u793A\u672A\u5B8C\u6210\u6216\u5931\u6548\u72B6\u6001\u3002</p>"}},{demo:{id:"components-timeline-demo-pending"},previewerProps:{title:"\u6700\u540E\u4E00\u4E2A\u53CA\u6392\u5E8F",filename:"components/timeline/demo/pending.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u5F53\u4EFB\u52A1\u72B6\u6001\u6B63\u5728\u53D1\u751F\uFF0C\u8FD8\u5728\u8BB0\u5F55\u8FC7\u7A0B\u4E2D\uFF0C\u53EF\u7528\u5E7D\u7075\u8282\u70B9\u6765\u8868\u793A\u5F53\u524D\u7684\u65F6\u95F4\u8282\u70B9\uFF0C\u5F53 pending \u4E3A\u771F\u503C\u65F6\u5C55\u793A\u5E7D\u7075\u8282\u70B9\uFF0C\u5982\u679C pending \u662F React \u5143\u7D20\u53EF\u7528\u4E8E\u5B9A\u5236\u8BE5\u8282\u70B9\u5185\u5BB9\uFF0C\u540C\u65F6 pendingDot \u5C06\u53EF\u4EE5\u7528\u4E8E\u5B9A\u5236\u5176\u8F74\u70B9\u3002reverse \u5C5E\u6027\u7528\u4E8E\u63A7\u5236\u8282\u70B9\u6392\u5E8F\uFF0C\u4E3A false \u65F6\u6309\u6B63\u5E8F\u6392\u5217\uFF0C\u4E3A true \u65F6\u6309\u5012\u5E8F\u6392\u5217\u3002</p>"}},{demo:{id:"components-timeline-demo-alternate"},previewerProps:{title:"\u4EA4\u66FF\u5C55\u73B0",filename:"components/timeline/demo/alternate.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5185\u5BB9\u5728\u65F6\u95F4\u8F74\u4E24\u4FA7\u8F6E\u6D41\u51FA\u73B0\u3002</p>"}},{demo:{id:"components-timeline-demo-custom"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u65F6\u95F4\u8F74\u70B9",filename:"components/timeline/demo/custom.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u53EF\u4EE5\u8BBE\u7F6E\u4E3A\u56FE\u6807\u6216\u5176\u4ED6\u81EA\u5B9A\u4E49\u5143\u7D20\u3002</p>",style:`.timeline-clock-icon {
  font-size: 16px;
}

[data-theme='compact'] .timeline-clock-icon {
  font-size: 14px;
}`}},{demo:{id:"components-timeline-demo-right"},previewerProps:{title:"\u53F3\u4FA7\u65F6\u95F4\u8F74\u70B9",filename:"components/timeline/demo/right.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u65F6\u95F4\u8F74\u70B9\u53EF\u4EE5\u5728\u5185\u5BB9\u7684\u53F3\u8FB9\u3002</p>"}},{demo:{id:"components-timeline-demo-label"},previewerProps:{title:"\u6807\u7B7E",filename:"components/timeline/demo/label.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u4F7F\u7528 <code>label</code> \u6807\u7B7E\u5355\u72EC\u5C55\u793A\u65F6\u95F4\u3002</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)(o.Z,{lang:"jsx"},n[3].value),(0,e.tZ)("h3",{id:"timeline"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#timeline"},(0,e.tZ)("span",{className:"icon icon-link"})),"Timeline"),(0,e.tZ)("p",null,n[4].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[5].value),(0,e.tZ)("th",null,n[6].value),(0,e.tZ)("th",null,n[7].value),(0,e.tZ)("th",null,n[8].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[9].value),(0,e.tZ)("td",null,n[10].value,(0,e.tZ)("code",null,n[11].value),n[12].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[13].value),n[14].value,(0,e.tZ)("code",null,n[15].value),n[16].value,(0,e.tZ)("code",null,n[17].value)),(0,e.tZ)("td",null,n[18].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[19].value),(0,e.tZ)("td",null,n[20].value),(0,e.tZ)("td",null,n[21].value),(0,e.tZ)("td",null,n[22].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[23].value),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null,n[26].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null,n[30].value)))),(0,e.tZ)("h3",{id:"timelineitem"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#timelineitem"},(0,e.tZ)("span",{className:"icon icon-link"})),"Timeline.Item"),(0,e.tZ)("p",null,n[31].value),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[32].value),(0,e.tZ)("th",null,n[33].value),(0,e.tZ)("th",null,n[34].value),(0,e.tZ)("th",null,n[35].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value,(0,e.tZ)("code",null,n[38].value),n[39].value,(0,e.tZ)("code",null,n[40].value),n[41].value,(0,e.tZ)("code",null,n[42].value),n[43].value,(0,e.tZ)("code",null,n[44].value),n[45].value),(0,e.tZ)("td",null,n[46].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[47].value))),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[48].value),(0,e.tZ)("td",null,n[49].value),(0,e.tZ)("td",null,n[50].value),(0,e.tZ)("td",null,n[51].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[52].value),(0,e.tZ)("td",null,n[53].value),(0,e.tZ)("td",null,n[54].value),(0,e.tZ)("td",null,n[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[56].value),(0,e.tZ)("td",null,n[57].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[58].value),n[59].value,(0,e.tZ)("code",null,n[60].value)),(0,e.tZ)("td",null,n[61].value)))))))}i.default=_}}]);
