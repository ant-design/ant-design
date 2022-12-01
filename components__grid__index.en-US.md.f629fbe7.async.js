"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[5841],{39052:function(i,o,l){l.r(o);var c=l(2143),p=l(50250),v=l(59378),m=l(78190),_=l(74775),t=l(5937),C=l(2068),g=l(74399),x=l(46004),Z=l(35708),f=l(30138),h=l(56140),s=l(5388),R=l(49545),w=l(92169),y=l(13140),D=l(95127),b=l(74418),E=l(97119),a=l(28257),d=l(67294),n=l(13946);function r(){var u=(0,a.eL)(),e=u.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(d.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"design-concept"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#design-concept"},(0,n.tZ)("span",{className:"icon icon-link"})),"Design concept"),(0,n.tZ)("div",{className:"grid-demo"},e[1].value,(0,n.tZ)("img",{src:"https://gw.alipayobjects.com/zos/bmw-prod/9189c9ef-c601-40dc-9960-c11dbb681888.svg",alt:"grid design"})),(0,n.tZ)("p",null,e[2].value),(0,n.tZ)("p",null,e[3].value),(0,n.tZ)("h2",{id:"outline"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#outline"},(0,n.tZ)("span",{className:"icon icon-link"})),"Outline"),(0,n.tZ)("p",null,e[4].value,(0,n.tZ)("code",null,e[5].value),e[6].value,(0,n.tZ)("code",null,e[7].value),e[8].value),(0,n.tZ)("p",null,e[9].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[10].value,(0,n.tZ)("code",null,e[11].value),e[12].value,(0,n.tZ)("code",null,e[13].value),e[14].value),(0,n.tZ)("li",null,e[15].value,(0,n.tZ)("code",null,e[16].value),e[17].value,(0,n.tZ)("code",null,e[18].value),e[19].value,(0,n.tZ)("code",null,e[20].value),e[21].value),(0,n.tZ)("li",null,e[22].value,(0,n.tZ)("code",null,e[23].value),e[24].value),(0,n.tZ)("li",null,e[25].value,(0,n.tZ)("code",null,e[26].value),e[27].value,(0,n.tZ)("code",null,e[28].value),e[29].value,(0,n.tZ)("code",null,e[30].value),e[31].value)),(0,n.tZ)("p",null,e[32].value,(0,n.tZ)("code",null,e[33].value),e[34].value),(0,n.tZ)("p",null,e[35].value),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(s.Z,{items:[{demo:{id:"components-grid-demo-basic"},previewerProps:{title:"Basic Grid",filename:"components/grid/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:`<p>From the stack to the horizontal arrangement.</p>
<p>You can create a basic grid system by using a single set of <code>Row</code> and <code>Col</code> grid assembly, all of the columns (Col) must be placed in <code>Row</code>.</p>`}},{demo:{id:"components-grid-demo-gutter"},previewerProps:{title:"Grid Gutter",filename:"components/grid/demo/gutter.tsx",jsx:`import React from 'react';
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
`,description:`<p>You can use the <code>gutter</code> property of <code>Row</code> as grid spacing, we recommend set it to <code>(16 + 8n) px</code> (<code>n</code> stands for natural number).</p>
<p>You can set it to a object like <code>{ xs: 8, sm: 16, md: 24, lg: 32 }</code> for responsive design.</p>
<p>You can use an array to set vertical spacing, <code>[horizontal, vertical]</code> <code>[16, { xs: 8, sm: 16, md: 24, lg: 32 }]</code>.</p>
<blockquote>
<p>vertical gutter was supported after <code>3.24.0</code>.</p>
</blockquote>`,style:`.gutter-box {
  padding: 8px 0;
  background: #00a0e9;
}`}},{demo:{id:"components-grid-demo-offset"},previewerProps:{title:"Column offset",filename:"components/grid/demo/offset.tsx",jsx:`import React from 'react';
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
`,description:"<p><code>offset</code> can set the column to the right side. For example, using <code>offset = {4}</code> can set the element shifted to the right four columns width.</p>"}},{demo:{id:"components-grid-demo-sort"},previewerProps:{title:"Grid sort",filename:"components/grid/demo/sort.tsx",jsx:`import React from 'react';
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
`,description:"<p>By using <code>push</code> and <code>pull</code> class you can easily change column order.</p>"}},{demo:{id:"components-grid-demo-flex"},previewerProps:{title:"Typesetting",filename:"components/grid/demo/flex.tsx",jsx:`import React from 'react';
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
`,description:"<p>Child elements depending on the value of the <code>start</code>, <code>center</code>, <code>end</code>, <code>space-between</code>, <code>space-around</code> and <code>space-evenly</code>, which are defined in its parent node typesetting mode.</p>",style:`#components-grid-demo-flex [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}`}},{demo:{id:"components-grid-demo-flex-align"},previewerProps:{title:"Alignment",filename:"components/grid/demo/flex-align.tsx",jsx:`import React from 'react';
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
`,description:"<p>Child elements vertically aligned.</p>",style:`#components-grid-demo-flex-align [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}`}},{demo:{id:"components-grid-demo-flex-order"},previewerProps:{title:"Order",filename:"components/grid/demo/flex-order.tsx",jsx:`import React from 'react';
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
`,description:"<p>To change the element sort by <code>order</code>.</p>",style:`#components-grid-demo-flex-order [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}`}},{demo:{id:"components-grid-demo-flex-stretch"},previewerProps:{title:"Flex Stretch",filename:"components/grid/demo/flex-stretch.tsx",jsx:`import React from 'react';
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
`,description:"<p>Col provides <code>flex</code> prop to support fill rest.</p>"}},{demo:{id:"components-grid-demo-responsive"},previewerProps:{title:"Responsive",filename:"components/grid/demo/responsive.tsx",jsx:`import React from 'react';
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
`,description:'<p>Referring to the Bootstrap <a href="http://getbootstrap.com/css/#grid-media-queries">responsive design</a>, here preset six dimensions: <code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code> <code>xxl</code>.</p>'}},{demo:{id:"components-grid-demo-responsive-more"},previewerProps:{title:"More responsive",filename:"components/grid/demo/responsive-more.tsx",jsx:`import React from 'react';
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
`,description:"<p><code>span</code> <code>pull</code> <code>push</code> <code>offset</code> <code>order</code> property can be embedded into <code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code> <code>xxl</code> properties to use, where <code>xs={6}</code> is equivalent to <code>xs={{span: 6}}</code>.</p>"}},{demo:{id:"components-grid-demo-playground"},previewerProps:{title:"Playground",filename:"components/grid/demo/playground.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>A simple playground for column count and gutter.</p>",style:`#components-grid-demo-playground [class~='ant-col'] {
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
`,description:"<p>Use <code>useBreakpoint</code> Hook provide personalized layout.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("p",null,e[36].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"http://roylee0704.github.io/react-flexbox-grid/"},e[37].value)),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://github.com/whoisandy/react-blocks/"},e[38].value))),(0,n.tZ)("h3",{id:"row"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#row"},(0,n.tZ)("span",{className:"icon icon-link"})),"Row"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[39].value),(0,n.tZ)("th",null,e[40].value),(0,n.tZ)("th",null,e[41].value),(0,n.tZ)("th",null,e[42].value),(0,n.tZ)("th",null,e[43].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[46].value),e[47].value,(0,n.tZ)("code",null,e[48].value),e[49].value,(0,n.tZ)("code",null,e[50].value),e[51].value,(0,n.tZ)("code",null,e[52].value),e[53].value,(0,n.tZ)("code",null,e[54].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[55].value)),(0,n.tZ)("td",null,e[56].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value,(0,n.tZ)("code",null,e[59].value)),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null,e[61].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[64].value),e[65].value,(0,n.tZ)("code",null,e[66].value),e[67].value,(0,n.tZ)("code",null,e[68].value),e[69].value,(0,n.tZ)("code",null,e[70].value),e[71].value,(0,n.tZ)("code",null,e[72].value),e[73].value,(0,n.tZ)("code",null,e[74].value),e[75].value,(0,n.tZ)("code",null,e[76].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[77].value)),(0,n.tZ)("td",null,e[78].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,e[83].value)))),(0,n.tZ)("h3",{id:"col"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#col"},(0,n.tZ)("span",{className:"icon icon-link"})),"Col"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[84].value),(0,n.tZ)("th",null,e[85].value),(0,n.tZ)("th",null,e[86].value),(0,n.tZ)("th",null,e[87].value),(0,n.tZ)("th",null,e[88].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null,e[110].value,(0,n.tZ)("code",null,e[111].value)),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[115].value),e[116].value,(0,n.tZ)("code",null,e[117].value),e[118].value),(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[122].value),e[123].value,(0,n.tZ)("code",null,e[124].value),e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[129].value),e[130].value,(0,n.tZ)("code",null,e[131].value),e[132].value),(0,n.tZ)("td",null,e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[136].value),e[137].value,(0,n.tZ)("code",null,e[138].value),e[139].value),(0,n.tZ)("td",null,e[140].value),(0,n.tZ)("td",null,e[141].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[142].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[143].value),e[144].value,(0,n.tZ)("code",null,e[145].value),e[146].value),(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[150].value),e[151].value,(0,n.tZ)("code",null,e[152].value),e[153].value),(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,e[156].value,(0,n.tZ)("a",{href:"https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints"},e[157].value),e[158].value,(0,n.tZ)("code",null,e[159].value),e[160].value),(0,n.tZ)("style",{dangerouslySetInnerHTML:{__html:`
  [data-theme="dark"] #components-grid-demo-playground pre {
    background: rgba(255,255,255,0.8);
    color: rgba(255,255,255,.65);
  }
`}}))))}o.default=r}}]);
