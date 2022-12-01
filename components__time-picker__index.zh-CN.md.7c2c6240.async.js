"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[1176],{31126:function(m,i,l){l.r(i);var p=l(2143),c=l(50250),Z=l(59378),_=l(78190),a=l(74775),u=l(5937),v=l(2068),x=l(74399),P=l(46004),f=l(35708),k=l(30138),h=l(56140),d=l(5388),g=l(49545),T=l(92169),E=l(13140),C=l(95127),A=l(74418),O=l(97119),n=l(28257),o=l(67294),t=l(13946);function r(){var s=(0,n.eL)(),e=s.texts;return(0,t.tZ)(n.dY,null,(0,t.tZ)(o.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,e[0].value),(0,t.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,t.tZ)("hr",null),(0,t.tZ)("p",null,e[1].value),(0,t.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,t.tZ)(d.Z,{items:[{demo:{id:"components-time-picker-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/time-picker/demo/basic.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};
const App = () => (
  <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
);
export default App;
`,description:"<p>\u70B9\u51FB TimePicker\uFF0C\u7136\u540E\u53EF\u4EE5\u5728\u6D6E\u5C42\u4E2D\u9009\u62E9\u6216\u8005\u8F93\u5165\u67D0\u4E00\u65F6\u95F4\u3002</p>"}},{demo:{id:"components-time-picker-demo-value"},previewerProps:{title:"\u53D7\u63A7\u7EC4\u4EF6",filename:"components/time-picker/demo/value.tsx",jsx:`import React, { useState } from 'react';
import { TimePicker } from 'antd';
const App = () => {
  const [value, setValue] = useState(null);
  const onChange = (time) => {
    setValue(time);
  };
  return <TimePicker value={value} onChange={onChange} />;
};
export default App;
`,description:"<p>value \u548C onChange \u9700\u8981\u914D\u5408\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-time-picker-demo-size"},previewerProps:{title:"\u4E09\u79CD\u5927\u5C0F",filename:"components/time-picker/demo/size.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const App = () => (
  <>
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="small" />
  </>
);
export default App;
`,description:"<p>\u4E09\u79CD\u5927\u5C0F\u7684\u8F93\u5165\u6846\uFF0C\u5927\u7684\u7528\u5728\u8868\u5355\u4E2D\uFF0C\u4E2D\u7684\u4E3A\u9ED8\u8BA4\u3002</p>"}},{demo:{id:"components-time-picker-demo-disabled"},previewerProps:{title:"\u7981\u7528",filename:"components/time-picker/demo/disabled.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const App = () => <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} disabled />;
export default App;
`,description:"<p>\u7981\u7528\u65F6\u95F4\u9009\u62E9\u3002</p>"}},{demo:{id:"components-time-picker-demo-hide-column"},previewerProps:{title:"\u9009\u62E9\u65F6\u5206",filename:"components/time-picker/demo/hide-column.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
const format = 'HH:mm';
const App = () => <TimePicker defaultValue={dayjs('12:08', format)} format={format} />;
export default App;
`,description:"<p>TimePicker \u6D6E\u5C42\u4E2D\u7684\u5217\u4F1A\u968F\u7740 <code>format</code> \u53D8\u5316\uFF0C\u5F53\u7565\u53BB <code>format</code> \u4E2D\u7684\u67D0\u90E8\u5206\u65F6\uFF0C\u6D6E\u5C42\u4E2D\u5BF9\u5E94\u7684\u5217\u4E5F\u4F1A\u6D88\u5931\u3002</p>"}},{demo:{id:"components-time-picker-demo-interval-options"},previewerProps:{title:"\u6B65\u957F\u9009\u9879",filename:"components/time-picker/demo/interval-options.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
const App = () => <TimePicker minuteStep={15} secondStep={10} />;
export default App;
`,description:"<p>\u53EF\u4EE5\u4F7F\u7528 <code>hourStep</code> <code>minuteStep</code> <code>secondStep</code> \u6309\u6B65\u957F\u5C55\u793A\u53EF\u9009\u7684\u65F6\u5206\u79D2\u3002</p>"}},{demo:{id:"components-time-picker-demo-addon"},previewerProps:{title:"\u9644\u52A0\u5185\u5BB9",filename:"components/time-picker/demo/addon.tsx",jsx:`import React, { useState } from 'react';
import { Button, TimePicker } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <TimePicker
      open={open}
      onOpenChange={setOpen}
      renderExtraFooter={() => (
        <Button size="small" type="primary" onClick={() => setOpen(false)}>
          OK
        </Button>
      )}
    />
  );
};
export default App;
`,description:"<p>\u5728 TimePicker \u9009\u62E9\u6846\u5E95\u90E8\u663E\u793A\u81EA\u5B9A\u4E49\u7684\u5185\u5BB9\u3002</p>"}},{demo:{id:"components-time-picker-demo-12hours"},previewerProps:{title:"12 \u5C0F\u65F6\u5236",filename:"components/time-picker/demo/12hours.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
const onChange = (time, timeString) => {
  console.log(time, timeString);
};
const App = () => (
  <>
    <TimePicker use12Hours onChange={onChange} />
    <TimePicker
      use12Hours
      format="h:mm:ss A"
      onChange={onChange}
      style={{
        width: 140,
      }}
    />
    <TimePicker use12Hours format="h:mm a" onChange={onChange} />
  </>
);
export default App;
`,description:"<p>12 \u5C0F\u65F6\u5236\u7684\u65F6\u95F4\u9009\u62E9\u5668\uFF0C\u9ED8\u8BA4\u7684 format \u4E3A <code>h:mm:ss a</code>\u3002</p>"}},{demo:{id:"components-time-picker-demo-colored-popup"},previewerProps:{debug:!0,title:"\u8272\u4ED8\u304D\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7",filename:"components/time-picker/demo/colored-popup.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};
const App = () => (
  <TimePicker
    onChange={onChange}
    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
    popupClassName="myCustomClassName"
  />
);
export default App;
`,description:"<p>\u30AB\u30B9\u30BF\u30E0\u30AF\u30E9\u30B9\u3092 <code>TimePicker</code>\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u306B\u6E21\u3059</p>",style:`.myCustomClassName .ant-picker-time-panel-cell-inner {
  color: red !important;
}`}},{demo:{id:"components-time-picker-demo-range-picker"},previewerProps:{title:"\u8303\u56F4\u9009\u62E9\u5668",filename:"components/time-picker/demo/range-picker.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
const App = () => <TimePicker.RangePicker />;
export default App;
`,description:"<p>\u901A\u8FC7 <code>TimePicker.RangePicker</code> \u4F7F\u7528\u65F6\u95F4\u8303\u56F4\u9009\u62E9\u5668\u3002</p>"}},{demo:{id:"components-time-picker-demo-bordered"},previewerProps:{title:"\u65E0\u8FB9\u6846",filename:"components/time-picker/demo/bordered.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
const { RangePicker } = TimePicker;
const App = () => (
  <>
    <TimePicker bordered={false} />
    <RangePicker bordered={false} />
  </>
);
export default App;
`,description:"<p>\u65E0\u8FB9\u6846\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-time-picker-demo-status"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u72B6\u6001",filename:"components/time-picker/demo/status.tsx",jsx:`import React from 'react';
import { Space, TimePicker } from 'antd';
const App = () => (
  <Space direction="vertical">
    <TimePicker status="error" />
    <TimePicker status="warning" />
    <TimePicker.RangePicker status="error" />
    <TimePicker.RangePicker status="warning" />
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>status</code> \u4E3A TimePicker \u6DFB\u52A0\u72B6\u6001\uFF0C\u53EF\u9009 <code>error</code> \u6216\u8005 <code>warning</code>\u3002</p>"}},{demo:{id:"components-time-picker-demo-suffix"},previewerProps:{debug:!0,title:"\u540E\u7F00\u56FE\u6807",filename:"components/time-picker/demo/suffix.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};
const App = () => (
  <TimePicker
    suffixIcon={<SmileOutlined />}
    onChange={onChange}
    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
  />
);
export default App;
`,description:"<p>\u70B9\u51FB TimePicker\uFF0C\u7136\u540E\u53EF\u4EE5\u5728\u6D6E\u5C42\u4E2D\u9009\u62E9\u6216\u8005\u8F93\u5165\u67D0\u4E00\u65F6\u95F4\u3002</p>"}},{demo:{id:"components-time-picker-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/time-picker/demo/render-panel.tsx",jsx:`import React from 'react';
import { TimePicker } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTimePicker } = TimePicker;
const App = () => <InternalTimePicker />;
export default App;
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)("hr",null),(0,t.tZ)(a.Z,{lang:"jsx"},e[2].value),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[3].value),(0,t.tZ)("th",null,e[4].value),(0,t.tZ)("th",null,e[5].value),(0,t.tZ)("th",null,e[6].value),(0,t.tZ)("th",null,e[7].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[8].value),(0,t.tZ)("td",null,e[9].value),(0,t.tZ)("td",null,e[10].value),(0,t.tZ)("td",null,e[11].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[12].value),(0,t.tZ)("td",null,e[13].value),(0,t.tZ)("td",null,e[14].value),(0,t.tZ)("td",null,e[15].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[16].value),(0,t.tZ)("td",null,e[17].value),(0,t.tZ)("td",null,e[18].value),(0,t.tZ)("td",null,e[19].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[20].value),(0,t.tZ)("td",null,e[21].value),(0,t.tZ)("td",null,e[22].value),(0,t.tZ)("td",null,e[23].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[24].value),(0,t.tZ)("td",null,e[25].value),(0,t.tZ)("td",null,e[26].value),(0,t.tZ)("td",null,e[27].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[28].value),(0,t.tZ)("td",null,e[29].value),(0,t.tZ)("td",null,e[30].value),(0,t.tZ)("td",null,e[31].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[32].value),(0,t.tZ)("td",null,e[33].value),(0,t.tZ)("td",null,(0,t.tZ)("a",{href:"http://day.js.org/"},e[34].value)),(0,t.tZ)("td",null,e[35].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[36].value),(0,t.tZ)("td",null,e[37].value),(0,t.tZ)("td",null,e[38].value),(0,t.tZ)("td",null,e[39].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[40].value),(0,t.tZ)("td",null,e[41].value),(0,t.tZ)("td",null,(0,t.tZ)(n.rU,{to:"#DisabledTime"},e[42].value)),(0,t.tZ)("td",null,e[43].value),(0,t.tZ)("td",null,e[44].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[45].value),(0,t.tZ)("td",null,e[46].value),(0,t.tZ)("td",null,e[47].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[48].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[49].value),(0,t.tZ)("td",null,e[50].value),(0,t.tZ)("td",null,e[51].value),(0,t.tZ)("td",null,e[52].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[53].value),(0,t.tZ)("td",null,e[54].value),(0,t.tZ)("td",null,e[55].value),(0,t.tZ)("td",null,e[56].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[57].value),(0,t.tZ)("td",null,e[58].value),(0,t.tZ)("td",null,e[59].value),(0,t.tZ)("td",null,e[60].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[61].value),(0,t.tZ)("td",null,e[62].value),(0,t.tZ)("td",null,e[63].value),(0,t.tZ)("td",null,e[64].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[65].value),(0,t.tZ)("td",null,e[66].value),(0,t.tZ)("td",null,e[67].value),(0,t.tZ)("td",null,e[68].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[69].value),(0,t.tZ)("td",null,e[70].value),(0,t.tZ)("td",null,e[71].value),(0,t.tZ)("td",null,e[72].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[73].value),(0,t.tZ)("td",null,e[74].value),(0,t.tZ)("td",null,e[75].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[76].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[77].value),(0,t.tZ)("td",null,e[78].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,e[79].value),e[80].value,(0,t.tZ)("code",null,e[81].value),e[82].value,(0,t.tZ)("code",null,e[83].value),e[84].value,(0,t.tZ)("code",null,e[85].value)),(0,t.tZ)("td",null,e[86].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[87].value),(0,t.tZ)("td",null,e[88].value),(0,t.tZ)("td",null,e[89].value),(0,t.tZ)("td",null,e[90].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[91].value),(0,t.tZ)("td",null,e[92].value),(0,t.tZ)("td",null,e[93].value),(0,t.tZ)("td",null,e[94].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[95].value),(0,t.tZ)("td",null,e[96].value),(0,t.tZ)("td",null,e[97].value),(0,t.tZ)("td",null,e[98].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[99].value),(0,t.tZ)("td",null,e[100].value),(0,t.tZ)("td",null,e[101].value),(0,t.tZ)("td",null,e[102].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[103].value),(0,t.tZ)("td",null,e[104].value),(0,t.tZ)("td",null,e[105].value),(0,t.tZ)("td",null,e[106].value),(0,t.tZ)("td",null,e[107].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[108].value),(0,t.tZ)("td",null,e[109].value),(0,t.tZ)("td",null,e[110].value),(0,t.tZ)("td",null,e[111].value),(0,t.tZ)("td",null,e[112].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[113].value),(0,t.tZ)("td",null,e[114].value),(0,t.tZ)("td",null,e[115].value),(0,t.tZ)("td",null,e[116].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[117].value),(0,t.tZ)("td",null,e[118].value,(0,t.tZ)("code",null,e[119].value),e[120].value,(0,t.tZ)("code",null,e[121].value)),(0,t.tZ)("td",null,e[122].value),(0,t.tZ)("td",null,e[123].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[124].value),(0,t.tZ)("td",null,e[125].value),(0,t.tZ)("td",null,(0,t.tZ)("a",{href:"http://day.js.org/"},e[126].value)),(0,t.tZ)("td",null,e[127].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[128].value),(0,t.tZ)("td",null,e[129].value),(0,t.tZ)("td",null,e[130].value),(0,t.tZ)("td",null,e[131].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[132].value),(0,t.tZ)("td",null,e[133].value),(0,t.tZ)("td",null,e[134].value),(0,t.tZ)("td",null,e[135].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h4",{id:"disabledtime"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#disabledtime"},(0,t.tZ)("span",{className:"icon icon-link"})),"DisabledTime"),(0,t.tZ)(a.Z,{lang:"typescript"},e[136].value),(0,t.tZ)("h2",{id:"\u65B9\u6CD5"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u65B9\u6CD5"},(0,t.tZ)("span",{className:"icon icon-link"})),"\u65B9\u6CD5"),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[137].value),(0,t.tZ)("th",null,e[138].value),(0,t.tZ)("th",null,e[139].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[140].value),(0,t.tZ)("td",null,e[141].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[142].value),(0,t.tZ)("td",null,e[143].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h2",{id:"rangepicker"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rangepicker"},(0,t.tZ)("span",{className:"icon icon-link"})),"RangePicker"),(0,t.tZ)("p",null,e[144].value,(0,t.tZ)(n.rU,{to:"/components/date-picker/#RangePicker"},e[145].value),e[146].value),(0,t.tZ)(u.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,e[147].value),(0,t.tZ)("th",null,e[148].value),(0,t.tZ)("th",null,e[149].value),(0,t.tZ)("th",null,e[150].value),(0,t.tZ)("th",null,e[151].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[152].value),(0,t.tZ)("td",null,e[153].value),(0,t.tZ)("td",null,(0,t.tZ)(n.rU,{to:"#RangeDisabledTime"},e[154].value)),(0,t.tZ)("td",null,e[155].value),(0,t.tZ)("td",null,e[156].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,e[157].value),(0,t.tZ)("td",null,e[158].value),(0,t.tZ)("td",null,e[159].value),(0,t.tZ)("td",null,e[160].value),(0,t.tZ)("td",null,e[161].value)))),(0,t.tZ)("h3",{id:"rangedisabledtime"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rangedisabledtime"},(0,t.tZ)("span",{className:"icon icon-link"})),"RangeDisabledTime"),(0,t.tZ)(a.Z,{lang:"typescript"},e[162].value),(0,t.tZ)("style",{dangerouslySetInnerHTML:{__html:`
.code-box-demo .ant-picker { margin: 0 8px 12px 0; }
.ant-row-rtl .code-box-demo .ant-picker { margin: 0 0 12px 8px; }
`}}),(0,t.tZ)("h2",{id:"faq"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,t.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,(0,t.tZ)(n.rU,{to:"/docs/react/use-custom-date-library#TimePicker"},e[163].value))))))}i.default=r}}]);
