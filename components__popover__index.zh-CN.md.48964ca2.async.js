"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2990],{46012:function(s,i,e){e.r(i);var d=e(2143),c=e(50250),u=e(59378),m=e(78190),v=e(74775),l=e(5937),x=e(2068),P=e(74399),h=e(46004),g=e(35708),B=e(30138),C=e(56140),r=e(5388),E=e(49545),f=e(92169),O=e(13140),Z=e(95127),W=e(74418),D=e(97119),o=e(28257),p=e(67294),t=e(13946);function a(){var _=(0,o.eL)(),n=_.texts;return(0,t.tZ)(o.dY,null,(0,t.tZ)(p.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("p",null,n[1].value),(0,t.tZ)("p",null,n[2].value,(0,t.tZ)("code",null,n[3].value),n[4].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(r.Z,{items:[{demo:{id:"components-popover-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/popover/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\uFF0C\u6D6E\u5C42\u7684\u5927\u5C0F\u7531\u5185\u5BB9\u533A\u57DF\u51B3\u5B9A\u3002</p>",style:`.ant-popover-content p {
  margin: 0;
}`}},{demo:{id:"components-popover-demo-triggertype"},previewerProps:{title:"\u4E09\u79CD\u89E6\u53D1\u65B9\u5F0F",filename:"components/popover/demo/triggerType.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u9F20\u6807\u79FB\u5165\u3001\u805A\u96C6\u3001\u70B9\u51FB\u3002</p>"}},{demo:{id:"components-popover-demo-placement"},previewerProps:{title:"\u4F4D\u7F6E",filename:"components/popover/demo/placement.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4F4D\u7F6E\u6709\u5341\u4E8C\u4E2A\u65B9\u5411\u3002</p>",style:`.code-box-demo .demo {
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
}`}},{demo:{id:"components-popover-demo-control"},previewerProps:{title:"\u4ECE\u6D6E\u5C42\u5185\u5173\u95ED",filename:"components/popover/demo/control.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u4F7F\u7528 <code>open</code> \u5C5E\u6027\u63A7\u5236\u6D6E\u5C42\u663E\u793A\u3002</p>"}},{demo:{id:"components-popover-demo-arrow-point-at-center"},previewerProps:{title:"\u7BAD\u5934\u6307\u5411",filename:"components/popover/demo/arrow-point-at-center.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u8BBE\u7F6E\u4E86 <code>arrowPointAtCenter</code> \u540E\uFF0C\u7BAD\u5934\u5C06\u6307\u5411\u76EE\u6807\u5143\u7D20\u7684\u4E2D\u5FC3\u3002</p>"}},{demo:{id:"components-popover-demo-hover-with-click"},previewerProps:{title:"\u60AC\u505C\u70B9\u51FB\u5F39\u51FA\u7A97\u53E3",filename:"components/popover/demo/hover-with-click.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u4EE5\u4E0B\u793A\u4F8B\u663E\u793A\u5982\u4F55\u521B\u5EFA\u53EF\u60AC\u505C\u548C\u5355\u51FB\u7684\u5F39\u51FA\u7A97\u53E3\u3002</p>"}},{demo:{id:"components-popover-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/popover/demo/render-panel.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(l.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value),(0,t.tZ)("th",null,n[8].value),(0,t.tZ)("th",null,n[9].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,n[11].value),(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null)))),(0,t.tZ)("p",null,n[18].value,(0,t.tZ)(o.rU,{to:"/components/tooltip/#API"},n[19].value),n[20].value),(0,t.tZ)("h2",{id:"\u6CE8\u610F"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6CE8\u610F"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u6CE8\u610F"),(0,t.tZ)("p",null,n[21].value,(0,t.tZ)("code",null,n[22].value),n[23].value,(0,t.tZ)("code",null,n[24].value),n[25].value,(0,t.tZ)("code",null,n[26].value),n[27].value,(0,t.tZ)("code",null,n[28].value),n[29].value,(0,t.tZ)("code",null,n[30].value),n[31].value))))}i.default=a}}]);
