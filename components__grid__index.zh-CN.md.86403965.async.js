"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2764],{64024:function(i,o,l){l.r(o);var c=l(2143),p=l(50250),v=l(59378),m=l(78190),_=l(74775),t=l(5937),C=l(2068),x=l(74399),g=l(46004),Z=l(35708),f=l(30138),R=l(56140),a=l(5388),w=l(49545),D=l(92169),y=l(13140),h=l(95127),E=l(74418),P=l(97119),s=l(28257),d=l(67294),n=l(13946);function r(){var u=(0,s.eL)(),e=u.texts;return(0,n.tZ)(s.dY,null,(0,n.tZ)(d.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u8BBE\u8BA1\u7406\u5FF5"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u8BBE\u8BA1\u7406\u5FF5"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u8BBE\u8BA1\u7406\u5FF5"),(0,n.tZ)("div",{className:"grid-demo"},e[1].value,(0,n.tZ)("img",{src:"https://gw.alipayobjects.com/zos/bmw-prod/9189c9ef-c601-40dc-9960-c11dbb681888.svg",alt:"grid design"})),(0,n.tZ)("p",null,e[2].value),(0,n.tZ)("p",null,e[3].value),(0,n.tZ)("h2",{id:"\u6982\u8FF0"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6982\u8FF0"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u6982\u8FF0"),(0,n.tZ)("p",null,e[4].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[5].value,(0,n.tZ)("code",null,e[6].value),e[7].value,(0,n.tZ)("code",null,e[8].value),e[9].value),(0,n.tZ)("li",null,e[10].value,(0,n.tZ)("code",null,e[11].value),e[12].value,(0,n.tZ)("code",null,e[13].value),e[14].value,(0,n.tZ)("code",null,e[15].value),e[16].value),(0,n.tZ)("li",null,e[17].value,(0,n.tZ)("code",null,e[18].value),e[19].value),(0,n.tZ)("li",null,e[20].value,(0,n.tZ)("code",null,e[21].value),e[22].value,(0,n.tZ)("code",null,e[23].value),e[24].value,(0,n.tZ)("code",null,e[25].value),e[26].value)),(0,n.tZ)("p",null,e[27].value),(0,n.tZ)("p",null,e[28].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(a.Z,{items:[{demo:{id:"components-grid-demo-basic"},previewerProps:{title:"\u57FA\u7840\u6805\u683C",filename:"components/grid/demo/basic.tsx",jsx:`import React from 'react';
import { Col, Row } from 'antd';
const App = () => (
  <>
    <Row>
      <Col span={24}>col</Col>
    </Row>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </>
);
export default App;
`,description:`<p>\u4ECE\u5806\u53E0\u5230\u6C34\u5E73\u6392\u5217\u3002</p>
<p>\u4F7F\u7528\u5355\u4E00\u7684\u4E00\u7EC4 <code>Row</code> \u548C <code>Col</code> \u6805\u683C\u7EC4\u4EF6\uFF0C\u5C31\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u57FA\u672C\u7684\u6805\u683C\u7CFB\u7EDF\uFF0C\u6240\u6709\u5217\uFF08Col\uFF09\u5FC5\u987B\u653E\u5728 <code>Row</code> \u5185\u3002</p>`}},{demo:{id:"components-grid-demo-gutter"},previewerProps:{title:"\u533A\u5757\u95F4\u9694",filename:"components/grid/demo/gutter.tsx",jsx:`import React from 'react';
import { Col, Divider, Row } from 'antd';
const style = {
  background: '#0092ff',
  padding: '8px 0',
};
const App = () => (
  <>
    <Divider orientation="left">Horizontal</Divider>
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
    <Divider orientation="left">Responsive</Divider>
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
    <Divider orientation="left">Vertical</Divider>
    <Row gutter={[16, 24]}>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
  </>
);
export default App;
`,description:`<p>\u6805\u683C\u5E38\u5E38\u9700\u8981\u548C\u95F4\u9694\u8FDB\u884C\u914D\u5408\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528 <code>Row</code> \u7684 <code>gutter</code> \u5C5E\u6027\uFF0C\u6211\u4EEC\u63A8\u8350\u4F7F\u7528 <code>(16+8n)px</code> \u4F5C\u4E3A\u6805\u683C\u95F4\u9694(n \u662F\u81EA\u7136\u6570)\u3002</p>
<p>\u5982\u679C\u8981\u652F\u6301\u54CD\u5E94\u5F0F\uFF0C\u53EF\u4EE5\u5199\u6210 <code>{ xs: 8, sm: 16, md: 24, lg: 32 }</code>\u3002</p>
<p>\u5982\u679C\u9700\u8981\u5782\u76F4\u95F4\u8DDD\uFF0C\u53EF\u4EE5\u5199\u6210\u6570\u7EC4\u5F62\u5F0F <code>[\u6C34\u5E73\u95F4\u8DDD, \u5782\u76F4\u95F4\u8DDD]</code> <code>[16, { xs: 8, sm: 16, md: 24, lg: 32 }]</code>\u3002</p>
<blockquote>
<p>\u6570\u7EC4\u5F62\u5F0F\u5782\u76F4\u95F4\u8DDD\u5728 <code>3.24.0</code> \u4E4B\u540E\u652F\u6301\u3002</p>
</blockquote>`,style:`.gutter-box {
  padding: 8px 0;
  background: #00a0e9;
}`}},{demo:{id:"components-grid-demo-offset"},previewerProps:{title:"\u5DE6\u53F3\u504F\u79FB",filename:"components/grid/demo/offset.tsx",jsx:`import React from 'react';
import { Col, Row } from 'antd';
const App = () => (
  <>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8} offset={8}>
        col-8
      </Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>
        col-6 col-offset-6
      </Col>
      <Col span={6} offset={6}>
        col-6 col-offset-6
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={6}>
        col-12 col-offset-6
      </Col>
    </Row>
  </>
);
export default App;
`,description:`<p>\u5217\u504F\u79FB\u3002</p>
<p>\u4F7F\u7528 <code>offset</code> \u53EF\u4EE5\u5C06\u5217\u5411\u53F3\u4FA7\u504F\u3002\u4F8B\u5982\uFF0C<code>offset={4}</code> \u5C06\u5143\u7D20\u5411\u53F3\u4FA7\u504F\u79FB\u4E86 4 \u4E2A\u5217\uFF08column\uFF09\u7684\u5BBD\u5EA6\u3002</p>`}},{demo:{id:"components-grid-demo-sort"},previewerProps:{title:"\u6805\u683C\u6392\u5E8F",filename:"components/grid/demo/sort.tsx",jsx:`import React from 'react';
import { Col, Row } from 'antd';
const App = () => (
  <Row>
    <Col span={18} push={6}>
      col-18 col-push-6
    </Col>
    <Col span={6} pull={18}>
      col-6 col-pull-18
    </Col>
  </Row>
);
export default App;
`,description:`<p>\u5217\u6392\u5E8F\u3002</p>
<p>\u901A\u8FC7\u4F7F\u7528 <code>push</code> \u548C <code>pull</code> \u7C7B\u5C31\u53EF\u4EE5\u5F88\u5BB9\u6613\u7684\u6539\u53D8\u5217\uFF08column\uFF09\u7684\u987A\u5E8F\u3002</p>`}},{demo:{id:"components-grid-demo-flex"},previewerProps:{title:"\u6392\u7248",filename:"components/grid/demo/flex.tsx",jsx:`import React from 'react';
import { Col, Divider, Row } from 'antd';
const App = () => (
  <>
    <Divider orientation="left">sub-element align left</Divider>
    <Row justify="start">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align center</Divider>
    <Row justify="center">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align right</Divider>
    <Row justify="end">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element monospaced arrangement</Divider>
    <Row justify="space-between">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align full</Divider>
    <Row justify="space-around">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>

    <Divider orientation="left">sub-element align evenly</Divider>
    <Row justify="space-evenly">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>
  </>
);
export default App;
`,description:`<p>\u5E03\u5C40\u57FA\u7840\u3002</p>
<p>\u5B50\u5143\u7D20\u6839\u636E\u4E0D\u540C\u7684\u503C <code>start</code>\u3001<code>center</code>\u3001<code>end</code>\u3001<code>space-between</code>\u3001<code>space-around</code> \u548C <code>space-evenly</code>\uFF0C\u5206\u522B\u5B9A\u4E49\u5176\u5728\u7236\u8282\u70B9\u91CC\u9762\u7684\u6392\u7248\u65B9\u5F0F\u3002</p>`,style:`#components-grid-demo-flex [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}`}},{demo:{id:"components-grid-demo-flex-align"},previewerProps:{title:"\u5BF9\u9F50",filename:"components/grid/demo/flex-align.tsx",jsx:`import React from 'react';
import { Col, Divider, Row } from 'antd';
const DemoBox = (props) => <p className={\`height-\${props.value}\`}>{props.children}</p>;
const App = () => (
  <>
    <Divider orientation="left">Align Top</Divider>
    <Row justify="center" align="top">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>

    <Divider orientation="left">Align Middle</Divider>
    <Row justify="space-around" align="middle">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>

    <Divider orientation="left">Align Bottom</Divider>
    <Row justify="space-between" align="bottom">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>
  </>
);
export default App;
`,description:"<p>\u5B50\u5143\u7D20\u5782\u76F4\u5BF9\u9F50\u3002</p>",style:`#components-grid-demo-flex-align [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}`}},{demo:{id:"components-grid-demo-flex-order"},previewerProps:{title:"\u6392\u5E8F",filename:"components/grid/demo/flex-order.tsx",jsx:`import React from 'react';
import { Col, Divider, Row } from 'antd';
const App = () => (
  <>
    <Divider orientation="left">Normal</Divider>
    <Row>
      <Col span={6} order={4}>
        1 col-order-4
      </Col>
      <Col span={6} order={3}>
        2 col-order-3
      </Col>
      <Col span={6} order={2}>
        3 col-order-2
      </Col>
      <Col span={6} order={1}>
        4 col-order-1
      </Col>
    </Row>
    <Divider orientation="left">Responsive</Divider>
    <Row>
      <Col
        span={6}
        xs={{
          order: 1,
        }}
        sm={{
          order: 2,
        }}
        md={{
          order: 3,
        }}
        lg={{
          order: 4,
        }}
      >
        1 col-order-responsive
      </Col>
      <Col
        span={6}
        xs={{
          order: 2,
        }}
        sm={{
          order: 1,
        }}
        md={{
          order: 4,
        }}
        lg={{
          order: 3,
        }}
      >
        2 col-order-responsive
      </Col>
      <Col
        span={6}
        xs={{
          order: 3,
        }}
        sm={{
          order: 4,
        }}
        md={{
          order: 2,
        }}
        lg={{
          order: 1,
        }}
      >
        3 col-order-responsive
      </Col>
      <Col
        span={6}
        xs={{
          order: 4,
        }}
        sm={{
          order: 3,
        }}
        md={{
          order: 1,
        }}
        lg={{
          order: 2,
        }}
      >
        4 col-order-responsive
      </Col>
    </Row>
  </>
);
export default App;
`,description:"<p>\u901A\u8FC7 <code>order</code> \u6765\u6539\u53D8\u5143\u7D20\u7684\u6392\u5E8F\u3002</p>",style:`#components-grid-demo-flex-order [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}`}},{demo:{id:"components-grid-demo-flex-stretch"},previewerProps:{title:"Flex \u586B\u5145",filename:"components/grid/demo/flex-stretch.tsx",jsx:`import React from 'react';
import { Col, Divider, Row } from 'antd';
const App = () => (
  <>
    <Divider orientation="left">Percentage columns</Divider>
    <Row>
      <Col flex={2}>2 / 5</Col>
      <Col flex={3}>3 / 5</Col>
    </Row>
    <Divider orientation="left">Fill rest</Divider>
    <Row>
      <Col flex="100px">100px</Col>
      <Col flex="auto">Fill Rest</Col>
    </Row>
    <Divider orientation="left">Raw flex style</Divider>
    <Row>
      <Col flex="1 1 200px">1 1 200px</Col>
      <Col flex="0 1 300px">0 1 300px</Col>
    </Row>

    <Row wrap={false}>
      <Col flex="none">
        <div
          style={{
            padding: '0 16px',
          }}
        >
          none
        </div>
      </Col>
      <Col flex="auto">auto with no-wrap</Col>
    </Row>
  </>
);
export default App;
`,description:"<p>Col \u63D0\u4F9B <code>flex</code> \u5C5E\u6027\u4EE5\u652F\u6301\u586B\u5145\u3002</p>"}},{demo:{id:"components-grid-demo-responsive"},previewerProps:{title:"\u54CD\u5E94\u5F0F\u5E03\u5C40",filename:"components/grid/demo/responsive.tsx",jsx:`import React from 'react';
import { Col, Row } from 'antd';
const App = () => (
  <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
      Col
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col
    </Col>
  </Row>
);
export default App;
`,description:'<p>\u53C2\u7167 Bootstrap \u7684 <a href="http://getbootstrap.com/css/#grid-media-queries">\u54CD\u5E94\u5F0F\u8BBE\u8BA1</a>\uFF0C\u9884\u8BBE\u516D\u4E2A\u54CD\u5E94\u5C3A\u5BF8\uFF1A<code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code>\xA0<code>xxl</code>\u3002</p>'}},{demo:{id:"components-grid-demo-responsive-more"},previewerProps:{title:"\u5176\u4ED6\u5C5E\u6027\u7684\u54CD\u5E94\u5F0F",filename:"components/grid/demo/responsive-more.tsx",jsx:`import React from 'react';
import { Col, Row } from 'antd';
const App = () => (
  <Row>
    <Col
      xs={{
        span: 5,
        offset: 1,
      }}
      lg={{
        span: 6,
        offset: 2,
      }}
    >
      Col
    </Col>
    <Col
      xs={{
        span: 11,
        offset: 1,
      }}
      lg={{
        span: 6,
        offset: 2,
      }}
    >
      Col
    </Col>
    <Col
      xs={{
        span: 5,
        offset: 1,
      }}
      lg={{
        span: 6,
        offset: 2,
      }}
    >
      Col
    </Col>
  </Row>
);
export default App;
`,description:`<p><code>span</code> <code>pull</code> <code>push</code> <code>offset</code> <code>order</code> \u5C5E\u6027\u53EF\u4EE5\u901A\u8FC7\u5185\u5D4C\u5230 <code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code> <code>xxl</code> \u5C5E\u6027\u4E2D\u6765\u4F7F\u7528\u3002</p>
<p>\u5176\u4E2D <code>xs={6}</code> \u76F8\u5F53\u4E8E <code>xs={{ span: 6 }}</code>\u3002</p>`}},{demo:{id:"components-grid-demo-playground"},previewerProps:{title:"\u6805\u683C\u914D\u7F6E\u5668",filename:"components/grid/demo/playground.tsx",jsx:`import React, { useState } from 'react';
import { Col, Row, Slider } from 'antd';
const gutters = {};
const vgutters = {};
const colCounts = {};
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value;
});
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
  vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value;
});
const App = () => {
  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVgutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);
  const cols = [];
  const colCount = colCounts[colCountKey];
  let colCode = '';
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>Column</div>
      </Col>,
    );
    colCode += \`  <Col span={\${24 / colCount}} />\\n\`;
  }
  return (
    <>
      <span>Horizontal Gutter (px): </span>
      <div
        style={{
          width: '50%',
        }}
      >
        <Slider
          min={0}
          max={Object.keys(gutters).length - 1}
          value={gutterKey}
          onChange={setGutterKey}
          marks={gutters}
          step={null}
          tooltip={{
            formatter: (value) => value && gutters[value],
          }}
        />
      </div>
      <span>Vertical Gutter (px): </span>
      <div
        style={{
          width: '50%',
        }}
      >
        <Slider
          min={0}
          max={Object.keys(vgutters).length - 1}
          value={vgutterKey}
          onChange={setVgutterKey}
          marks={vgutters}
          step={null}
          tooltip={{
            formatter: (value) => value && vgutters[value],
          }}
        />
      </div>
      <span>Column Count:</span>
      <div
        style={{
          width: '50%',
          marginBottom: 48,
        }}
      >
        <Slider
          min={0}
          max={Object.keys(colCounts).length - 1}
          value={colCountKey}
          onChange={setColCountKey}
          marks={colCounts}
          step={null}
          tooltip={{
            formatter: (value) => value && colCounts[value],
          }}
        />
      </div>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
        {cols}
        {cols}
      </Row>
      Another Row:
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
      <pre className="demo-code">{\`<Row gutter={[\${gutters[gutterKey]}, \${vgutters[vgutterKey]}]}>\\n\${colCode}\\n\${colCode}</Row>\`}</pre>
      <pre className="demo-code">{\`<Row gutter={[\${gutters[gutterKey]}, \${vgutters[vgutterKey]}]}>\\n\${colCode}</Row>\`}</pre>
    </>
  );
};
export default App;
`,description:"<p>\u53EF\u4EE5\u7B80\u5355\u914D\u7F6E\u51E0\u79CD\u7B49\u5206\u6805\u683C\u548C\u95F4\u8DDD\u3002</p>",style:`#components-grid-demo-playground [class~='ant-col'] {
  background: transparent;
  border: 0;
}
#components-grid-demo-playground [class~='ant-col'] > div {
  height: 120px;
  font-size: 14px;
  line-height: 120px;
  background: #0092ff;
  border-radius: 4px;
}
#components-grid-demo-playground pre {
  padding: 8px 16px;
  font-size: 13px;
  background: #f9f9f9;
  border-radius: 6px;
}
#components-grid-demo-playground pre.demo-code {
  direction: ltr;
}
#components-grid-demo-playground .ant-col {
  padding: 0;
}`}},{demo:{id:"components-grid-demo-usebreakpoint"},previewerProps:{title:"useBreakpoint Hook",filename:"components/grid/demo/useBreakpoint.tsx",jsx:`import React from 'react';
import { Grid, Tag } from 'antd';
const { useBreakpoint } = Grid;
const App = () => {
  const screens = useBreakpoint();
  return (
    <>
      Current break point:{' '}
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
    </>
  );
};
export default App;
`,description:"<p>\u4F7F\u7528 <code>useBreakpoint</code> Hook \u4E2A\u6027\u5316\u5E03\u5C40\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("p",null,e[29].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"http://roylee0704.github.io/react-flexbox-grid/"},e[30].value)),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://github.com/whoisandy/react-blocks/"},e[31].value))),(0,n.tZ)("h3",{id:"row"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#row"},(0,n.tZ)("span",{className:"icon icon-link"})),"Row"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[32].value),(0,n.tZ)("th",null,e[33].value),(0,n.tZ)("th",null,e[34].value),(0,n.tZ)("th",null,e[35].value),(0,n.tZ)("th",null,e[36].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[39].value),e[40].value,(0,n.tZ)("code",null,e[41].value),e[42].value,(0,n.tZ)("code",null,e[43].value),e[44].value,(0,n.tZ)("code",null,e[45].value),e[46].value,(0,n.tZ)("code",null,e[47].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[48].value)),(0,n.tZ)("td",null,e[49].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value,(0,n.tZ)("code",null,e[52].value)),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[57].value),e[58].value,(0,n.tZ)("code",null,e[59].value),e[60].value,(0,n.tZ)("code",null,e[61].value),e[62].value,(0,n.tZ)("code",null,e[63].value),e[64].value,(0,n.tZ)("code",null,e[65].value),e[66].value,(0,n.tZ)("code",null,e[67].value),e[68].value,(0,n.tZ)("code",null,e[69].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[70].value)),(0,n.tZ)("td",null,e[71].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value)))),(0,n.tZ)("h3",{id:"col"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#col"},(0,n.tZ)("span",{className:"icon icon-link"})),"Col"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[77].value),(0,n.tZ)("th",null,e[78].value),(0,n.tZ)("th",null,e[79].value),(0,n.tZ)("th",null,e[80].value),(0,n.tZ)("th",null,e[81].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,e[83].value),(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[86].value),(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,e[103].value,(0,n.tZ)("code",null,e[104].value)),(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[108].value),e[109].value),(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[113].value),e[114].value),(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[118].value),e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[123].value),e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[128].value),e[129].value),(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[133].value),e[134].value),(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null,e[136].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,e[137].value,(0,n.tZ)("a",{href:"https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints"},e[138].value),e[139].value,(0,n.tZ)("code",null,e[140].value),e[141].value),(0,n.tZ)("style",{dangerouslySetInnerHTML:{__html:`
  [data-theme="dark"] #components-grid-demo-playground pre {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,.65);
  }
`}}))))}o.default=r}}]);
