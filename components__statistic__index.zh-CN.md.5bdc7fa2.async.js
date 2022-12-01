"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[3005],{13555:function(o,e,l){l.r(e);var r=l(2143),Z=l(50250),v=l(59378),c=l(78190),m=l(74775),u=l(5937),p=l(2068),x=l(74399),C=l(46004),E=l(35708),h=l(30138),P=l(56140),d=l(5388),D=l(49545),O=l(92169),f=l(13140),M=l(95127),U=l(74418),A=l(97119),a=l(28257),i=l(67294),t=l(13946);function s(){var _=(0,a.eL)(),n=_.texts;return(0,t.tZ)(a.dY,null,(0,t.tZ)(i.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[1].value),(0,t.tZ)("li",null,n[2].value)),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-statistic-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/statistic/demo/basic.tsx",jsx:`import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
const App = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} />
    </Col>
    <Col span={12}>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      <Button
        style={{
          marginTop: 16,
        }}
        type="primary"
      >
        Recharge
      </Button>
    </Col>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} loading />
    </Col>
  </Row>
);
export default App;
`,description:"<p>\u7B80\u5355\u7684\u5C55\u793A\u3002</p>"}},{demo:{id:"components-statistic-demo-unit"},previewerProps:{title:"\u5355\u4F4D",filename:"components/statistic/demo/unit.tsx",jsx:`import React from 'react';
import { LikeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
const App = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
    </Col>
    <Col span={12}>
      <Statistic title="Unmerged" value={93} suffix="/ 100" />
    </Col>
  </Row>
);
export default App;
`,description:"<p>\u901A\u8FC7\u524D\u7F00\u548C\u540E\u7F00\u6DFB\u52A0\u5355\u4F4D\u3002</p>"}},{demo:{id:"components-statistic-demo-card"},previewerProps:{title:"\u5728\u5361\u7247\u4E2D\u4F7F\u7528",filename:"components/statistic/demo/card.tsx",jsx:`import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const App = () => (
  <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{
              color: '#cf1322',
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
);
export default App;
`,description:"<p>\u5728\u5361\u7247\u4E2D\u5C55\u793A\u7EDF\u8BA1\u6570\u503C\u3002</p>",style:`.site-statistic-demo-card {
  padding: 30px;
  background: #ececec;
}`}},{demo:{id:"components-statistic-demo-countdown"},previewerProps:{title:"\u5012\u8BA1\u65F6",filename:"components/statistic/demo/countdown.tsx",jsx:`import React from 'react';
import { Col, Row, Statistic } from 'antd';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const App = () => {
  const onFinish = () => {
    console.log('finished!');
  };
  const onChange = (val) => {
    if (4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
      </Col>
      <Col span={12}>
        <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
      </Col>
      <Col
        span={24}
        style={{
          marginTop: 32,
        }}
      >
        <Countdown title="Day Level" value={deadline} format="D \u5929 H \u65F6 m \u5206 s \u79D2" />
      </Col>
      <Col span={12}>
        <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
      </Col>
    </Row>
  );
};
export default App;
`,description:"<p>\u5012\u8BA1\u65F6\u7EC4\u4EF6\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("h4",{id:"statistic"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#statistic"},(0,t.tZ)("span",{className:"icon icon-link"})),"Statistic"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[3].value),(0,t.tZ)("th",null,n[4].value),(0,t.tZ)("th",null,n[5].value),(0,t.tZ)("th",null,n[6].value),(0,t.tZ)("th",null,n[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[8].value),(0,t.tZ)("td",null,n[9].value),(0,t.tZ)("td",null,n[10].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[11].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[12].value),(0,t.tZ)("td",null,n[13].value),(0,t.tZ)("td",null,n[14].value),(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[19].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null,n[24].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[33].value),(0,t.tZ)("td",null,n[34].value),(0,t.tZ)("td",null,n[35].value),(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[37].value),(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null,n[42].value),(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h4",{id:"statisticcountdown"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#statisticcountdown"},(0,t.tZ)("span",{className:"icon icon-link"})),"Statistic.Countdown"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[49].value),(0,t.tZ)("th",null,n[50].value),(0,t.tZ)("th",null,n[51].value),(0,t.tZ)("th",null,n[52].value),(0,t.tZ)("th",null,n[53].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[54].value),(0,t.tZ)("td",null,n[55].value,(0,t.tZ)("a",{href:"https://day.js.org/"},n[56].value)),(0,t.tZ)("td",null,n[57].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[58].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[59].value),(0,t.tZ)("td",null,n[60].value),(0,t.tZ)("td",null,n[61].value),(0,t.tZ)("td",null,n[62].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[63].value),(0,t.tZ)("td",null,n[64].value),(0,t.tZ)("td",null,n[65].value),(0,t.tZ)("td",null,n[66].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[67].value),(0,t.tZ)("td",null,n[68].value),(0,t.tZ)("td",null,n[69].value),(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null,n[73].value),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[75].value),(0,t.tZ)("td",null,n[76].value),(0,t.tZ)("td",null,n[77].value),(0,t.tZ)("td",null,n[78].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[79].value),(0,t.tZ)("td",null,n[80].value),(0,t.tZ)("td",null,n[81].value),(0,t.tZ)("td",null,n[82].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[83].value),(0,t.tZ)("td",null,n[84].value),(0,t.tZ)("td",null,n[85].value),(0,t.tZ)("td",null,n[86].value),(0,t.tZ)("td",null,n[87].value)))))))}e.default=s}}]);
