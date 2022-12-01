"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7738],{88495:function(p,o,n){n.r(o);var s=n(2143),_=n(50250),m=n(59378),v=n(78190),c=n(74775),u=n(5937),Z=n(2068),x=n(74399),T=n(46004),h=n(35708),f=n(30138),P=n(56140),a=n(5388),B=n(49545),g=n(92169),E=n(13140),D=n(95127),W=n(74418),A=n(97119),e=n(28257),i=n(67294),t=n(13946);function d(){var r=(0,e.eL)(),l=r.texts;return(0,t.tZ)(e.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,l[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,l[1].value),(0,t.tZ)("li",null,l[2].value,(0,t.tZ)("code",null,l[3].value),l[4].value,(0,t.tZ)("code",null,l[5].value),l[6].value)),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(a.Z,{items:[{demo:{id:"components-tooltip-demo-basic"},previewerProps:{title:"Basic",filename:"components/tooltip/demo/basic.tsx",jsx:`import React from 'react';
import { Tooltip } from 'antd';
const App = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);
export default App;
`,description:"<p>The simplest usage.</p>"}},{demo:{id:"components-tooltip-demo-placement"},previewerProps:{title:"Placement",filename:"components/tooltip/demo/placement.tsx",jsx:`import React from 'react';
import { Button, Tooltip } from 'antd';
const text = <span>prompt text</span>;
const buttonWidth = 70;
const App = () => (
  <div className="demo">
    <div
      style={{
        marginLeft: buttonWidth,
        whiteSpace: 'nowrap',
      }}
    >
      <Tooltip placement="topLeft" title={text}>
        <Button>TL</Button>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip placement="topRight" title={text}>
        <Button>TR</Button>
      </Tooltip>
    </div>
    <div
      style={{
        width: buttonWidth,
        float: 'left',
      }}
    >
      <Tooltip placement="leftTop" title={text}>
        <Button>LT</Button>
      </Tooltip>
      <Tooltip placement="left" title={text}>
        <Button>Left</Button>
      </Tooltip>
      <Tooltip placement="leftBottom" title={text}>
        <Button>LB</Button>
      </Tooltip>
    </div>
    <div
      style={{
        width: buttonWidth,
        marginLeft: buttonWidth * 4 + 24,
      }}
    >
      <Tooltip placement="rightTop" title={text}>
        <Button>RT</Button>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip placement="rightBottom" title={text}>
        <Button>RB</Button>
      </Tooltip>
    </div>
    <div
      style={{
        marginLeft: buttonWidth,
        clear: 'both',
        whiteSpace: 'nowrap',
      }}
    >
      <Tooltip placement="bottomLeft" title={text}>
        <Button>BL</Button>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip placement="bottomRight" title={text}>
        <Button>BR</Button>
      </Tooltip>
    </div>
  </div>
);
export default App;
`,description:"<p>There are 12 placement options available.</p>",style:`.code-box-demo .demo {
  overflow: auto;
}
.code-box-demo .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
.code-box-demo .ant-btn-rtl {
  margin-right: 0;
  margin-left: 8px;
  margin-bottom: 8px;
}
#components-tooltip-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
}`}},{demo:{id:"components-tooltip-demo-arrow-point-at-center"},previewerProps:{title:"Arrow pointing at the center",filename:"components/tooltip/demo/arrow-point-at-center.tsx",jsx:`import React from 'react';
import { Button, Tooltip } from 'antd';
const App = () => (
  <>
    <Tooltip placement="topLeft" title="Prompt Text">
      <Button>Align edge / \u8FB9\u7F18\u5BF9\u9F50</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
      <Button>Arrow points to center / \u7BAD\u5934\u6307\u5411\u4E2D\u5FC3</Button>
    </Tooltip>
  </>
);
export default App;
`,description:"<p>By specifying <code>arrowPointAtCenter</code> prop, the arrow will point to the center of the target element.</p>"}},{demo:{id:"components-tooltip-demo-auto-adjust-overflow"},previewerProps:{debug:!0,title:"Adjust placement automatically",filename:"components/tooltip/demo/auto-adjust-overflow.tsx",jsx:`import React from 'react';
import { Button, Tooltip } from 'antd';
const wrapStyles = {
  overflow: 'hidden',
  position: 'relative',
  padding: '24px',
  border: '1px solid #e9e9e9',
};
const App = () => (
  <div style={wrapStyles}>
    <Tooltip
      placement="left"
      title="Prompt Text"
      getPopupContainer={(trigger) => trigger.parentElement}
    >
      <Button>Adjust automatically / \u81EA\u52A8\u8C03\u6574</Button>
    </Tooltip>
    <br />
    <Tooltip
      placement="left"
      title="Prompt Text"
      getPopupContainer={(trigger) => trigger.parentElement}
      autoAdjustOverflow={false}
    >
      <Button>Ignore / \u4E0D\u5904\u7406</Button>
    </Tooltip>
  </div>
);
export default App;
`,description:"<p>Adjust placement automatically when tooltip is invisible.</p>"}},{demo:{id:"components-tooltip-demo-destroy-tooltip-on-hide"},previewerProps:{debug:!0,title:"Destroy tooltip when hidden",filename:"components/tooltip/demo/destroy-tooltip-on-hide.tsx",jsx:`import React from 'react';
import { Tooltip } from 'antd';
const App = () => (
  <Tooltip
    destroyTooltipOnHide={{
      keepParent: false,
    }}
    title="prompt text"
  >
    <span>Tooltip will destroy when hidden.</span>
  </Tooltip>
);
export default App;
`,description:"<p>Setting <code>destroyTooltipOnHide</code> to control whether destroy dom node of tooltip when hidden.</p>"}},{demo:{id:"components-tooltip-demo-colorful"},previewerProps:{title:"Colorful Tooltip",filename:"components/tooltip/demo/colorful.tsx",jsx:`import React from 'react';
import { Button, Divider, Tooltip } from 'antd';
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
const App = () => (
  <>
    <Divider orientation="left">Presets</Divider>
    <div>
      {colors.map((color) => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </div>
    <Divider orientation="left">Custom</Divider>
    <div>
      {customColors.map((color) => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </div>
  </>
);
export default App;
`,description:"<p>We preset a series of colorful Tooltip styles for use in different situations.</p>",style:`.ant-tag {
  margin-bottom: 8px;
}`}},{demo:{id:"components-tooltip-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/tooltip/demo/render-panel.tsx",jsx:`import React from 'react';
import { Tooltip } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTooltip } = Tooltip;
const App = () => (
  <>
    <InternalTooltip title="Hello, Pink Pure Panel!" color="pink" />
    <InternalTooltip title="Hello, Customize Color Pure Panel!" color="#f50" />
    <InternalTooltip
      title="Hello, Pure Panel!"
      placement="bottomLeft"
      style={{
        width: 200,
      }}
    />
  </>
);
export default App;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[7].value),(0,t.tZ)("th",null,l[8].value),(0,t.tZ)("th",null,l[9].value),(0,t.tZ)("th",null,l[10].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[11].value),(0,t.tZ)("td",null,l[12].value),(0,t.tZ)("td",null,l[13].value),(0,t.tZ)("td",null,l[14].value)))),(0,t.tZ)("h3",{id:"common-api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#common-api"},(0,t.tZ)("span",{className:"icon icon-link"})),"Common API"),(0,t.tZ)("p",null,l[15].value),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[16].value),(0,t.tZ)("th",null,l[17].value),(0,t.tZ)("th",null,l[18].value),(0,t.tZ)("th",null,l[19].value),(0,t.tZ)("th",null,l[20].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[21].value),(0,t.tZ)("td",null,l[22].value,(0,t.tZ)("a",{href:"https://github.com/react-component/tooltip"},l[23].value)),(0,t.tZ)("td",null,l[24].value),(0,t.tZ)("td",null,l[25].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[26].value),(0,t.tZ)("td",null,l[27].value),(0,t.tZ)("td",null,l[28].value),(0,t.tZ)("td",null,l[29].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[30].value),(0,t.tZ)("td",null,l[31].value),(0,t.tZ)("td",null,l[32].value),(0,t.tZ)("td",null,l[33].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[34].value),(0,t.tZ)("td",null,l[35].value),(0,t.tZ)("td",null,l[36].value),(0,t.tZ)("td",null,l[37].value),(0,t.tZ)("td",null,l[38].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[39].value),(0,t.tZ)("td",null,l[40].value),(0,t.tZ)("td",null,l[41].value),(0,t.tZ)("td",null,l[42].value),(0,t.tZ)("td",null,l[43].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[44].value),(0,t.tZ)("td",null,l[45].value,(0,t.tZ)("code",null,l[46].value),l[47].value),(0,t.tZ)("td",null,l[48].value),(0,t.tZ)("td",null,l[49].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[50].value),(0,t.tZ)("td",null,l[51].value,(0,t.tZ)("code",null,l[52].value),l[53].value,(0,t.tZ)("code",null,l[54].value)),(0,t.tZ)("td",null,l[55].value),(0,t.tZ)("td",null,l[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[57].value),(0,t.tZ)("td",null,l[58].value),(0,t.tZ)("td",null,l[59].value),(0,t.tZ)("td",null,l[60].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[61].value),(0,t.tZ)("td",null,l[62].value),(0,t.tZ)("td",null,l[63].value),(0,t.tZ)("td",null,l[64].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[65].value),(0,t.tZ)("td",null,l[66].value),(0,t.tZ)("td",null,l[67].value),(0,t.tZ)("td",null,l[68].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[69].value),(0,t.tZ)("td",null,l[70].value),(0,t.tZ)("td",null,l[71].value),(0,t.tZ)("td",null,l[72].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[73].value),(0,t.tZ)("td",null,l[74].value),(0,t.tZ)("td",null,l[75].value),(0,t.tZ)("td",null,l[76].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[77].value),(0,t.tZ)("td",null,l[78].value,(0,t.tZ)("code",null,l[79].value),l[80].value,(0,t.tZ)("code",null,l[81].value),l[82].value,(0,t.tZ)("code",null,l[83].value),l[84].value,(0,t.tZ)("code",null,l[85].value),l[86].value,(0,t.tZ)("code",null,l[87].value),l[88].value,(0,t.tZ)("code",null,l[89].value),l[90].value,(0,t.tZ)("code",null,l[91].value),l[92].value,(0,t.tZ)("code",null,l[93].value),l[94].value,(0,t.tZ)("code",null,l[95].value),l[96].value,(0,t.tZ)("code",null,l[97].value),l[98].value,(0,t.tZ)("code",null,l[99].value),l[100].value,(0,t.tZ)("code",null,l[101].value)),(0,t.tZ)("td",null,l[102].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[103].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[104].value),(0,t.tZ)("td",null,l[105].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[106].value),l[107].value,(0,t.tZ)("code",null,l[108].value),l[109].value,(0,t.tZ)("code",null,l[110].value),l[111].value,(0,t.tZ)("code",null,l[112].value),l[113].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[114].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[115].value),(0,t.tZ)("td",null,l[116].value,(0,t.tZ)("code",null,l[117].value),l[118].value,(0,t.tZ)(e.rU,{to:"/docs/react/faq#why-open"},l[119].value),l[120].value),(0,t.tZ)("td",null,l[121].value),(0,t.tZ)("td",null,l[122].value),(0,t.tZ)("td",null,l[123].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[124].value),(0,t.tZ)("td",null,l[125].value,(0,t.tZ)("code",null,l[126].value),l[127].value),(0,t.tZ)("td",null,l[128].value),(0,t.tZ)("td",null,l[129].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[130].value),(0,t.tZ)("td",null,l[131].value),(0,t.tZ)("td",null,l[132].value),(0,t.tZ)("td",null,l[133].value),(0,t.tZ)("td",null,l[134].value)))),(0,t.tZ)("h2",{id:"note"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#note"},(0,t.tZ)("span",{className:"icon icon-link"})),"Note"),(0,t.tZ)("p",null,l[135].value,(0,t.tZ)("code",null,l[136].value),l[137].value,(0,t.tZ)("code",null,l[138].value),l[139].value,(0,t.tZ)("code",null,l[140].value),l[141].value,(0,t.tZ)("code",null,l[142].value),l[143].value,(0,t.tZ)("code",null,l[144].value),l[145].value))))}o.default=d}}]);
