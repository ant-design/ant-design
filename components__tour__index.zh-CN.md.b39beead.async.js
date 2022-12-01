"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[9871],{40236:function(_,n,e){e.r(n);var i=e(2143),Z=e(50250),c=e(59378),v=e(78190),p=e(74775),u=e(5937),m=e(2068),f=e(74399),x=e(46004),E=e(35708),h=e(30138),P=e(56140),d=e(5388),g=e(49545),O=e(92169),D=e(13140),B=e(95127),W=e(74418),U=e(97119),a=e(28257),o=e(67294),t=e(13946);function s(){var r=(0,a.eL)(),l=r.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(o.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,l[0].value,(0,t.tZ)("code",null,l[1].value),l[2].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("p",null,l[3].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-tour-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/tour/demo/basic.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, Divider, Space, Tour } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
const App = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}> Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>"}},{demo:{id:"components-tour-demo-non-modal"},previewerProps:{title:"\u975E\u6A21\u6001",filename:"components/tour/demo/non-modal.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, Divider, Space, Tour } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
const App = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin non-modal Tour
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}> Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>

      <Tour open={open} onClose={() => setOpen(false)} mask={false} type="primary" steps={steps} />
    </>
  );
};
export default App;
`,description:'<p>\u4F7F\u7528 <code>mask={false}</code> \u53EF\u4EE5\u5C06\u5F15\u5BFC\u53D8\u4E3A\u975E\u6A21\u6001\uFF0C\u540C\u65F6\u4E3A\u4E86\u5F3A\u8C03\u5F15\u5BFC\u672C\u8EAB\uFF0C\u5EFA\u8BAE\u4E0E <code>type="primary"</code> \u7EC4\u5408\u4F7F\u7528\u3002</p>'}},{demo:{id:"components-tour-demo-placement"},previewerProps:{title:"\u4F4D\u7F6E",filename:"components/tour/demo/placement.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, Tour } from 'antd';
const App = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Center',
      description: 'Displayed in the center of screen.',
      target: null,
    },
    {
      title: 'Right',
      description: 'On the right of target.',
      placement: 'right',
      target: () => ref.current,
    },
    {
      title: 'Top',
      description: 'On the top of target.',
      placement: 'top',
      target: () => ref.current,
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} ref={ref}>
        Begin Tour
      </Button>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};
export default App;
`,description:"<p>\u6539\u53D8\u5F15\u5BFC\u76F8\u5BF9\u4E8E\u76EE\u6807\u7684\u4F4D\u7F6E\uFF0C\u5171\u6709 12 \u79CD\u4F4D\u7F6E\u53EF\u4F9B\u9009\u62E9\u3002\u5F53 <code>target={null}</code> \u65F6\u5F15\u5BFC\u5C06\u4F1A\u5C55\u793A\u5728\u6B63\u4E2D\u592E\u3002</p>"}},{demo:{id:"components-tour-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/tour/demo/render-panel.tsx",jsx:`import React from 'react';
import { Tour } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Tour;
export default () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 16,
      background: 'rgba(50,0,0,0.65)',
      padding: 8,
    }}
  >
    <InternalPanel title="Hello World!" description="Hello World?!" />
    <InternalPanel
      title="Hello World!"
      description="Hello World?!"
      cover={
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      }
      current={5}
      total={7}
    />
    <InternalPanel
      title="Hello World!"
      description="Hello World?!"
      type="primary"
      current={4}
      total={5}
    />
  </div>
);
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h3",{id:"tour"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tour"},(0,t.tZ)("span",{className:"icon icon-link"})),"Tour"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[4].value),(0,t.tZ)("th",null,l[5].value),(0,t.tZ)("th",null,l[6].value),(0,t.tZ)("th",null,l[7].value),(0,t.tZ)("th",null,l[8].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[9].value),(0,t.tZ)("td",null,l[10].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[11].value),l[12].value,(0,t.tZ)("code",null,l[13].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[14].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[15].value),(0,t.tZ)("td",null,l[16].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[17].value),l[18].value,(0,t.tZ)("code",null,l[19].value),l[20].value,(0,t.tZ)("code",null,l[21].value),l[22].value,(0,t.tZ)("code",null,l[23].value),l[24].value,(0,t.tZ)("code",null,l[25].value),l[26].value,(0,t.tZ)("code",null,l[27].value),l[28].value,(0,t.tZ)("code",null,l[29].value),l[30].value,(0,t.tZ)("code",null,l[31].value),l[32].value,(0,t.tZ)("code",null,l[33].value),l[34].value,(0,t.tZ)("code",null,l[35].value),l[36].value,(0,t.tZ)("code",null,l[37].value),l[38].value,(0,t.tZ)("code",null,l[39].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[40].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[41].value),(0,t.tZ)("td",null,l[42].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[43].value)),(0,t.tZ)("td",null,l[44].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[45].value),(0,t.tZ)("td",null,l[46].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[47].value)),(0,t.tZ)("td",null,l[48].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[49].value),(0,t.tZ)("td",null,l[50].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[51].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[52].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[53].value),(0,t.tZ)("td",null,l[54].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[55].value),l[56].value,(0,t.tZ)("code",null,l[57].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[58].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[59].value),(0,t.tZ)("td",null,l[60].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[61].value)),(0,t.tZ)("td",null,l[62].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[63].value),(0,t.tZ)("td",null,l[64].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[65].value)),(0,t.tZ)("td",null,l[66].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[67].value),(0,t.tZ)("td",null,l[68].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[69].value)),(0,t.tZ)("td",null,l[70].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h3",{id:"tourstep-\u5F15\u5BFC\u6B65\u9AA4\u5361\u7247"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tourstep-\u5F15\u5BFC\u6B65\u9AA4\u5361\u7247"},(0,t.tZ)("span",{className:"icon icon-link"})),"TourStep \u5F15\u5BFC\u6B65\u9AA4\u5361\u7247"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[71].value),(0,t.tZ)("th",null,l[72].value),(0,t.tZ)("th",null,l[73].value),(0,t.tZ)("th",null,l[74].value),(0,t.tZ)("th",null,l[75].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[76].value),(0,t.tZ)("td",null,l[77].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[78].value),l[79].value,(0,t.tZ)("code",null,l[80].value)),(0,t.tZ)("td",null,l[81].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[82].value),(0,t.tZ)("td",null,l[83].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[84].value),l[85].value,(0,t.tZ)("code",null,l[86].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[87].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[88].value),(0,t.tZ)("td",null,l[89].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[90].value)),(0,t.tZ)("td",null,l[91].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[92].value),(0,t.tZ)("td",null,l[93].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[94].value)),(0,t.tZ)("td",null,l[95].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[96].value),(0,t.tZ)("td",null,l[97].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[98].value)),(0,t.tZ)("td",null,l[99].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[100].value),(0,t.tZ)("td",null,l[101].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[102].value),l[103].value,(0,t.tZ)("code",null,l[104].value),l[105].value,(0,t.tZ)("code",null,l[106].value),l[107].value,(0,t.tZ)("code",null,l[108].value),l[109].value,(0,t.tZ)("code",null,l[110].value),l[111].value,(0,t.tZ)("code",null,l[112].value),l[113].value,(0,t.tZ)("code",null,l[114].value),l[115].value,(0,t.tZ)("code",null,l[116].value),l[117].value,(0,t.tZ)("code",null,l[118].value),l[119].value,(0,t.tZ)("code",null,l[120].value),l[121].value,(0,t.tZ)("code",null,l[122].value),l[123].value,(0,t.tZ)("code",null,l[124].value),l[125].value,(0,t.tZ)("code",null,l[126].value)),(0,t.tZ)("td",null),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[127].value),(0,t.tZ)("td",null,l[128].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[129].value)),(0,t.tZ)("td",null,l[130].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[131].value),(0,t.tZ)("td",null,l[132].value,(0,t.tZ)("code",null,l[133].value),l[134].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[135].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[136].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[137].value),(0,t.tZ)("td",null,l[138].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[139].value),l[140].value,(0,t.tZ)("code",null,l[141].value)),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[142].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[143].value),(0,t.tZ)("td",null,l[144].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[145].value)),(0,t.tZ)("td",null,l[146].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[147].value),(0,t.tZ)("td",null,l[148].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[149].value)),(0,t.tZ)("td",null,l[150].value),(0,t.tZ)("td",null)))))))}n.default=s}}]);
