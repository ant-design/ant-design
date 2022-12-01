"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[3451],{63729:function(r,o,n){n.r(o);var _=n(2143),s=n(50250),v=n(59378),m=n(78190),Z=n(74775),u=n(5937),c=n(2068),x=n(74399),T=n(46004),h=n(35708),P=n(30138),f=n(56140),a=n(5388),E=n(49545),B=n(92169),g=n(13140),D=n(95127),A=n(74418),O=n(97119),e=n(28257),i=n(67294),t=n(13946);function d(){var p=(0,e.eL)(),l=p.texts;return(0,t.tZ)(e.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,l[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("p",null,l[1].value),(0,t.tZ)("p",null,l[2].value,(0,t.tZ)("code",null,l[3].value),l[4].value,(0,t.tZ)("code",null,l[5].value),l[6].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(a.Z,{items:[{demo:{id:"components-tooltip-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/tooltip/demo/basic.tsx",jsx:`import React from 'react';
import { Tooltip } from 'antd';
const App = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\u3002</p>"}},{demo:{id:"components-tooltip-demo-placement"},previewerProps:{title:"\u4F4D\u7F6E",filename:"components/tooltip/demo/placement.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4F4D\u7F6E\u6709 12 \u4E2A\u65B9\u5411\u3002</p>",style:`.code-box-demo .demo {
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
}`}},{demo:{id:"components-tooltip-demo-arrow-point-at-center"},previewerProps:{title:"\u7BAD\u5934\u6307\u5411",filename:"components/tooltip/demo/arrow-point-at-center.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u8BBE\u7F6E\u4E86 <code>arrowPointAtCenter</code> \u540E\uFF0C\u7BAD\u5934\u5C06\u6307\u5411\u76EE\u6807\u5143\u7D20\u7684\u4E2D\u5FC3\u3002</p>"}},{demo:{id:"components-tooltip-demo-auto-adjust-overflow"},previewerProps:{debug:!0,title:"\u81EA\u52A8\u8C03\u6574\u4F4D\u7F6E",filename:"components/tooltip/demo/auto-adjust-overflow.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u6C14\u6CE1\u6846\u4E0D\u53EF\u89C1\u65F6\u81EA\u52A8\u8C03\u6574\u4F4D\u7F6E</p>"}},{demo:{id:"components-tooltip-demo-destroy-tooltip-on-hide"},previewerProps:{debug:!0,title:"\u9690\u85CF\u540E\u9500\u6BC1",filename:"components/tooltip/demo/destroy-tooltip-on-hide.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u901A\u8FC7 <code>destroyTooltipOnHide</code> \u63A7\u5236\u63D0\u793A\u5173\u95ED\u65F6\u662F\u5426\u9500\u6BC1 dom \u8282\u70B9\u3002</p>"}},{demo:{id:"components-tooltip-demo-colorful"},previewerProps:{title:"\u591A\u5F69\u6587\u5B57\u63D0\u793A",filename:"components/tooltip/demo/colorful.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u6211\u4EEC\u6DFB\u52A0\u4E86\u591A\u79CD\u9884\u8BBE\u8272\u5F69\u7684\u6587\u5B57\u63D0\u793A\u6837\u5F0F\uFF0C\u7528\u4F5C\u4E0D\u540C\u573A\u666F\u4F7F\u7528\u3002</p>",style:`.ant-tag {
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
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[7].value),(0,t.tZ)("th",null,l[8].value),(0,t.tZ)("th",null,l[9].value),(0,t.tZ)("th",null,l[10].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[11].value),(0,t.tZ)("td",null,l[12].value),(0,t.tZ)("td",null,l[13].value),(0,t.tZ)("td",null,l[14].value)))),(0,t.tZ)("h3",{id:"\u5171\u540C\u7684-api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5171\u540C\u7684-api"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u5171\u540C\u7684 API"),(0,t.tZ)("p",null,l[15].value),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,l[16].value),(0,t.tZ)("th",null,l[17].value),(0,t.tZ)("th",null,l[18].value),(0,t.tZ)("th",null,l[19].value),(0,t.tZ)("th",null,l[20].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[21].value),(0,t.tZ)("td",null,l[22].value,(0,t.tZ)("a",{href:"https://github.com/react-component/tooltip"},l[23].value)),(0,t.tZ)("td",null,l[24].value),(0,t.tZ)("td",null,l[25].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[26].value),(0,t.tZ)("td",null,l[27].value),(0,t.tZ)("td",null,l[28].value),(0,t.tZ)("td",null,l[29].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[30].value),(0,t.tZ)("td",null,l[31].value),(0,t.tZ)("td",null,l[32].value),(0,t.tZ)("td",null,l[33].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[34].value),(0,t.tZ)("td",null,l[35].value),(0,t.tZ)("td",null,l[36].value),(0,t.tZ)("td",null,l[37].value),(0,t.tZ)("td",null,l[38].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[39].value),(0,t.tZ)("td",null,l[40].value),(0,t.tZ)("td",null,l[41].value),(0,t.tZ)("td",null,l[42].value),(0,t.tZ)("td",null,l[43].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[44].value),(0,t.tZ)("td",null,l[45].value,(0,t.tZ)("code",null,l[46].value),l[47].value,(0,t.tZ)("code",null,l[48].value),l[49].value),(0,t.tZ)("td",null,l[50].value),(0,t.tZ)("td",null,l[51].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[52].value),(0,t.tZ)("td",null,l[53].value),(0,t.tZ)("td",null,l[54].value),(0,t.tZ)("td",null,l[55].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[56].value),(0,t.tZ)("td",null,l[57].value),(0,t.tZ)("td",null,l[58].value),(0,t.tZ)("td",null,l[59].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[60].value),(0,t.tZ)("td",null,l[61].value),(0,t.tZ)("td",null,l[62].value),(0,t.tZ)("td",null,l[63].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[64].value),(0,t.tZ)("td",null,l[65].value),(0,t.tZ)("td",null,l[66].value),(0,t.tZ)("td",null,l[67].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[68].value),(0,t.tZ)("td",null,l[69].value),(0,t.tZ)("td",null,l[70].value),(0,t.tZ)("td",null,l[71].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[72].value),(0,t.tZ)("td",null,l[73].value),(0,t.tZ)("td",null,l[74].value),(0,t.tZ)("td",null,l[75].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[76].value),(0,t.tZ)("td",null,l[77].value,(0,t.tZ)("code",null,l[78].value),l[79].value,(0,t.tZ)("code",null,l[80].value),l[81].value,(0,t.tZ)("code",null,l[82].value),l[83].value,(0,t.tZ)("code",null,l[84].value),l[85].value,(0,t.tZ)("code",null,l[86].value),l[87].value,(0,t.tZ)("code",null,l[88].value),l[89].value,(0,t.tZ)("code",null,l[90].value),l[91].value,(0,t.tZ)("code",null,l[92].value),l[93].value,(0,t.tZ)("code",null,l[94].value),l[95].value,(0,t.tZ)("code",null,l[96].value),l[97].value,(0,t.tZ)("code",null,l[98].value),l[99].value,(0,t.tZ)("code",null,l[100].value)),(0,t.tZ)("td",null,l[101].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[102].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[103].value),(0,t.tZ)("td",null,l[104].value,(0,t.tZ)("code",null,l[105].value),l[106].value,(0,t.tZ)("code",null,l[107].value),l[108].value,(0,t.tZ)("code",null,l[109].value),l[110].value,(0,t.tZ)("code",null,l[111].value),l[112].value),(0,t.tZ)("td",null,l[113].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,l[114].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[115].value),(0,t.tZ)("td",null,l[116].value,(0,t.tZ)("code",null,l[117].value),l[118].value,(0,t.tZ)(e.rU,{to:"/docs/react/faq#why-open"},l[119].value),l[120].value),(0,t.tZ)("td",null,l[121].value),(0,t.tZ)("td",null,l[122].value),(0,t.tZ)("td",null,l[123].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[124].value),(0,t.tZ)("td",null,l[125].value,(0,t.tZ)("code",null,l[126].value)),(0,t.tZ)("td",null,l[127].value),(0,t.tZ)("td",null,l[128].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,l[129].value),(0,t.tZ)("td",null,l[130].value),(0,t.tZ)("td",null,l[131].value),(0,t.tZ)("td",null,l[132].value),(0,t.tZ)("td",null,l[133].value)))),(0,t.tZ)("h2",{id:"\u6CE8\u610F"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6CE8\u610F"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u6CE8\u610F"),(0,t.tZ)("p",null,l[134].value,(0,t.tZ)("code",null,l[135].value),l[136].value,(0,t.tZ)("code",null,l[137].value),l[138].value,(0,t.tZ)("code",null,l[139].value),l[140].value,(0,t.tZ)("code",null,l[141].value),l[142].value,(0,t.tZ)("code",null,l[143].value),l[144].value))))}o.default=d}}]);
