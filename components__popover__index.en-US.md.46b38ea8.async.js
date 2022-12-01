"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[4904],{69720:function(_,i,e){e.r(i);var c=e(2143),d=e(50250),u=e(59378),m=e(78190),v=e(74775),l=e(5937),x=e(2068),h=e(74399),P=e(46004),g=e(35708),B=e(30138),f=e(56140),r=e(5388),C=e(49545),E=e(92169),O=e(13140),T=e(95127),Z=e(74418),D=e(97119),o=e(28257),p=e(67294),t=e(13946);function a(){var s=(0,o.eL)(),n=s.texts;return(0,t.tZ)(o.dY,null,(0,t.tZ)(p.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("p",null,n[1].value),(0,t.tZ)("p",null,n[2].value,(0,t.tZ)("code",null,n[3].value),n[4].value,(0,t.tZ)("code",null,n[5].value),n[6].value),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(r.Z,{items:[{demo:{id:"components-popover-demo-basic"},previewerProps:{title:"Basic",filename:"components/popover/demo/basic.tsx",jsx:`import React from 'react';
import { Button, Popover } from 'antd';
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const App = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);
export default App;
`,description:"<p>The most basic example. The size of the floating layer depends on the contents region.</p>",style:`.ant-popover-content p {
  margin: 0;
}`}},{demo:{id:"components-popover-demo-triggertype"},previewerProps:{title:"Three ways to trigger",filename:"components/popover/demo/triggerType.tsx",jsx:`import React from 'react';
import { Button, Popover } from 'antd';
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const App = () => (
  <div>
    <Popover content={content} title="Title" trigger="hover">
      <Button>Hover me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="focus">
      <Button>Focus me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
  </div>
);
export default App;
`,description:"<p>Mouse to click, focus and move in.</p>"}},{demo:{id:"components-popover-demo-placement"},previewerProps:{title:"Placement",filename:"components/popover/demo/placement.tsx",jsx:`import React from 'react';
import { Button, Popover } from 'antd';
const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const buttonWidth = 70;
const App = () => (
  <div className="demo">
    <div
      style={{
        marginLeft: buttonWidth,
        whiteSpace: 'nowrap',
      }}
    >
      <Popover placement="topLeft" title={text} content={content} trigger="click">
        <Button>TL</Button>
      </Popover>
      <Popover placement="top" title={text} content={content} trigger="click">
        <Button>Top</Button>
      </Popover>
      <Popover placement="topRight" title={text} content={content} trigger="click">
        <Button>TR</Button>
      </Popover>
    </div>
    <div
      style={{
        width: buttonWidth,
        float: 'left',
      }}
    >
      <Popover placement="leftTop" title={text} content={content} trigger="click">
        <Button>LT</Button>
      </Popover>
      <Popover placement="left" title={text} content={content} trigger="click">
        <Button>Left</Button>
      </Popover>
      <Popover placement="leftBottom" title={text} content={content} trigger="click">
        <Button>LB</Button>
      </Popover>
    </div>
    <div
      style={{
        width: buttonWidth,
        marginLeft: buttonWidth * 4 + 24,
      }}
    >
      <Popover placement="rightTop" title={text} content={content} trigger="click">
        <Button>RT</Button>
      </Popover>
      <Popover placement="right" title={text} content={content} trigger="click">
        <Button>Right</Button>
      </Popover>
      <Popover placement="rightBottom" title={text} content={content} trigger="click">
        <Button>RB</Button>
      </Popover>
    </div>
    <div
      style={{
        marginLeft: buttonWidth,
        clear: 'both',
        whiteSpace: 'nowrap',
      }}
    >
      <Popover placement="bottomLeft" title={text} content={content} trigger="click">
        <Button>BL</Button>
      </Popover>
      <Popover placement="bottom" title={text} content={content} trigger="click">
        <Button>Bottom</Button>
      </Popover>
      <Popover placement="bottomRight" title={text} content={content} trigger="click">
        <Button>BR</Button>
      </Popover>
    </div>
  </div>
);
export default App;
`,description:"<p>There are 12 <code>placement</code> options available.</p>",style:`.code-box-demo .demo {
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
#components-popover-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
}`}},{demo:{id:"components-popover-demo-control"},previewerProps:{title:"Controlling the close of the dialog",filename:"components/popover/demo/control.tsx",jsx:`import React, { useState } from 'react';
import { Button, Popover } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Click me</Button>
    </Popover>
  );
};
export default App;
`,description:"<p>Use <code>open</code> prop to control the display of the card.</p>"}},{demo:{id:"components-popover-demo-arrow-point-at-center"},previewerProps:{title:"Arrow pointing",filename:"components/popover/demo/arrow-point-at-center.tsx",jsx:`import React from 'react';
import { Button, Popover } from 'antd';
const content = (
  <>
    <p>Content</p>
    <p>Content</p>
  </>
);
const App = () => (
  <>
    <Popover placement="topLeft" title="Title" content={content}>
      <Button>Align edge / \u8FB9\u7F18\u5BF9\u9F50</Button>
    </Popover>
    <Popover placement="topLeft" title="Title" content={content} arrowPointAtCenter>
      <Button>Arrow points to center / \u7BAD\u5934\u6307\u5411\u4E2D\u5FC3</Button>
    </Popover>
  </>
);
export default App;
`,description:"<p>The arrow points to the center of the target element, which set <code>arrowPointAtCenter</code>.</p>"}},{demo:{id:"components-popover-demo-hover-with-click"},previewerProps:{title:"Hover with click popover",filename:"components/popover/demo/hover-with-click.tsx",jsx:`import React, { useState } from 'react';
import { Button, Popover } from 'antd';
const App = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hide = () => {
    setClicked(false);
    setHovered(false);
  };
  const handleHoverChange = (open) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open) => {
    setHovered(false);
    setClicked(open);
  };
  const hoverContent = <div>This is hover content.</div>;
  const clickContent = <div>This is click content.</div>;
  return (
    <Popover
      style={{
        width: 500,
      }}
      content={hoverContent}
      title="Hover title"
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <Popover
        content={
          <div>
            {clickContent}
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Click title"
        trigger="click"
        open={clicked}
        onOpenChange={handleClickChange}
      >
        <Button>Hover and click / \u60AC\u505C\u5E76\u5355\u51FB</Button>
      </Popover>
    </Popover>
  );
};
export default App;
`,description:"<p>The following example shows how to create a popover which can be hovered and clicked.</p>"}},{demo:{id:"components-popover-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/popover/demo/render-panel.tsx",jsx:`import React from 'react';
import { Popover } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopover } = Popover;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const App = () => (
  <>
    <InternalPopover content={content} title="Title" />
    <InternalPopover
      content={content}
      title="Title"
      placement="bottomLeft"
      style={{
        width: 250,
      }}
    />
  </>
);
export default App;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[7].value),(0,t.tZ)("th",null,n[8].value),(0,t.tZ)("th",null,n[9].value),(0,t.tZ)("th",null,n[10].value),(0,t.tZ)("th",null,n[11].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null)))),(0,t.tZ)("p",null,n[20].value,(0,t.tZ)(o.rU,{to:"/components/tooltip/#API"},n[21].value),n[22].value),(0,t.tZ)("h2",{id:"note"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#note"},(0,t.tZ)("span",{className:"icon icon-link"})),"Note"),(0,t.tZ)("p",null,n[23].value,(0,t.tZ)("code",null,n[24].value),n[25].value,(0,t.tZ)("code",null,n[26].value),n[27].value,(0,t.tZ)("code",null,n[28].value),n[29].value,(0,t.tZ)("code",null,n[30].value),n[31].value,(0,t.tZ)("code",null,n[32].value),n[33].value))))}i.default=a}}]);
