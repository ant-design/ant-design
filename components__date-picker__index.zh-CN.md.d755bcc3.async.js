"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[8242],{46968:function(c,d,l){l.r(d);var Z=l(2143),p=l(50250),v=l(59378),m=l(78190),u=l(74775),a=l(5937),h=l(2068),k=l(74399),_=l(46004),g=l(35708),f=l(30138),P=l(56140),r=l(5388),D=l(49545),E=l(92169),x=l(13140),C=l(95127),b=l(74418),y=l(97119),n=l(28257),o=l(67294),e=l(13946);function i(){var s=(0,n.eL)(),t=s.texts;return(0,e.tZ)(n.dY,null,(0,e.tZ)(o.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,e.tZ)("p",null,t[1].value),(0,e.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,e.tZ)(r.Z,{items:[{demo:{id:"components-date-picker-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/date-picker/demo/basic.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const App = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Space>
);
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\uFF0C\u5728\u6D6E\u5C42\u4E2D\u53EF\u4EE5\u9009\u62E9\u6216\u8005\u8F93\u5165\u65E5\u671F\u3002</p>"}},{demo:{id:"components-date-picker-demo-range-picker"},previewerProps:{title:"\u8303\u56F4\u9009\u62E9\u5668",filename:"components/date-picker/demo/range-picker.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    <RangePicker showTime />
    <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker picker="year" />
  </Space>
);
export default App;
`,description:"<p>\u901A\u8FC7\u8BBE\u7F6E <code>picker</code> \u5C5E\u6027\uFF0C\u6307\u5B9A\u8303\u56F4\u9009\u62E9\u5668\u7C7B\u578B\u3002</p>"}},{demo:{id:"components-date-picker-demo-switchable"},previewerProps:{title:"\u5207\u6362\u4E0D\u540C\u7684\u9009\u62E9\u5668",filename:"components/date-picker/demo/switchable.tsx",jsx:`import React, { useState } from 'react';
import { DatePicker, Select, Space, TimePicker } from 'antd';
const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};
const App = () => {
  const [type, setType] = useState('time');
  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={(value) => console.log(value)} />
    </Space>
  );
};
export default App;
`,description:"<p>\u63D0\u4F9B\u9009\u62E9\u5668\uFF0C\u81EA\u7531\u5207\u6362\u4E0D\u540C\u7C7B\u578B\u7684\u65E5\u671F\u9009\u62E9\u5668\uFF0C\u5E38\u7528\u4E8E\u65E5\u671F\u7B5B\u9009\u573A\u5408\u3002</p>"}},{demo:{id:"components-date-picker-demo-format"},previewerProps:{title:"\u65E5\u671F\u683C\u5F0F",filename:"components/date-picker/demo/format.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const customFormat = (value) => \`custom format: \${value.format(dateFormat)}\`;
const customWeekStartEndFormat = (value) =>
  \`\${dayjs(value).startOf('week').format(weekFormat)} ~ \${dayjs(value)
    .endOf('week')
    .format(weekFormat)}\`;
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
    <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
    <DatePicker defaultValue={dayjs('2015/01', monthFormat)} format={monthFormat} picker="month" />
    <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
    <RangePicker
      defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={customFormat} />
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>format</code> \u5C5E\u6027\uFF0C\u53EF\u4EE5\u81EA\u5B9A\u4E49\u65E5\u671F\u663E\u793A\u683C\u5F0F\u3002</p>"}},{demo:{id:"components-date-picker-demo-time"},previewerProps:{title:"\u65E5\u671F\u65F6\u95F4\u9009\u62E9",filename:"components/date-picker/demo/time.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};
const onOk = (value) => {
  console.log('onOk: ', value);
};
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker showTime onChange={onChange} onOk={onOk} />
    <RangePicker
      showTime={{
        format: 'HH:mm',
      }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      onOk={onOk}
    />
  </Space>
);
export default App;
`,description:"<p>\u589E\u52A0\u9009\u62E9\u65F6\u95F4\u529F\u80FD\uFF0C\u5F53 <code>showTime</code> \u4E3A\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u5176\u5C5E\u6027\u4F1A\u4F20\u9012\u7ED9\u5185\u5EFA\u7684 <code>TimePicker</code>\u3002</p>"}},{demo:{id:"components-date-picker-demo-disabled"},previewerProps:{title:"\u7981\u7528",filename:"components/date-picker/demo/disabled.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={dayjs('2015-06-06', dateFormat)} disabled />
    <DatePicker picker="month" defaultValue={dayjs('2015-06', 'YYYY-MM')} disabled />
    <RangePicker
      defaultValue={[dayjs('2015-06-06', dateFormat), dayjs('2015-06-06', dateFormat)]}
      disabled
    />
    <RangePicker
      defaultValue={[dayjs('2019-09-03', dateFormat), dayjs('2019-11-22', dateFormat)]}
      disabled={[false, true]}
    />
  </Space>
);
export default App;
`,description:"<p>\u9009\u62E9\u6846\u7684\u4E0D\u53EF\u7528\u72B6\u6001\u3002\u4F60\u4E5F\u53EF\u4EE5\u901A\u8FC7\u6570\u7EC4\u5355\u72EC\u7981\u7528 RangePicker \u7684\u5176\u4E2D\u4E00\u9879\u3002</p>"}},{demo:{id:"components-date-picker-demo-disabled-date"},previewerProps:{title:"\u4E0D\u53EF\u9009\u62E9\u65E5\u671F\u548C\u65F6\u95F4",filename:"components/date-picker/demo/disabled-date.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};
const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});
const disabledRangeTime = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{
        defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
      }}
    />
    <DatePicker picker="month" disabledDate={disabledDate} />
    <RangePicker disabledDate={disabledDate} />
    <RangePicker
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
      }}
      format="YYYY-MM-DD HH:mm:ss"
    />
  </Space>
);
export default App;
`,description:"<p>\u53EF\u7528 <code>disabledDate</code> \u548C <code>disabledTime</code> \u5206\u522B\u7981\u6B62\u9009\u62E9\u90E8\u5206\u65E5\u671F\u548C\u65F6\u95F4\uFF0C\u5176\u4E2D <code>disabledTime</code> \u9700\u8981\u548C <code>showTime</code> \u4E00\u8D77\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-date-picker-demo-select-in-range"},previewerProps:{title:"\u9009\u62E9\u4E0D\u8D85\u8FC7\u4E03\u5929\u7684\u8303\u56F4",filename:"components/date-picker/demo/select-in-range.tsx",jsx:`import React, { useState } from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const App = () => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  return (
    <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={(val) => setValue(val)}
      onOpenChange={onOpenChange}
    />
  );
};
export default App;
`,description:"<p>\u8FD9\u91CC\u4E3E\u4F8B\u5982\u4F55\u7528 <code>onCalendarChange</code> \u548C <code>disabledDate</code> \u6765\u9650\u5236\u52A8\u6001\u7684\u65E5\u671F\u533A\u95F4\u9009\u62E9\u3002</p>"}},{demo:{id:"components-date-picker-demo-presetted-ranges"},previewerProps:{title:"\u9884\u8BBE\u8303\u56F4",filename:"components/date-picker/demo/presetted-ranges.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const onChange = (date) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};
const onRangeChange = (dates, dateStrings) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};
const rangePresets = [
  {
    label: 'Last 7 Days',
    value: [dayjs().add(-7, 'd'), dayjs()],
  },
  {
    label: 'Last 14 Days',
    value: [dayjs().add(-14, 'd'), dayjs()],
  },
  {
    label: 'Last 30 Days',
    value: [dayjs().add(-30, 'd'), dayjs()],
  },
  {
    label: 'Last 90 Days',
    value: [dayjs().add(-90, 'd'), dayjs()],
  },
];
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      presets={[
        {
          label: 'Yesterday',
          value: dayjs().add(-1, 'd'),
        },
        {
          label: 'Last Week',
          value: dayjs().add(-7, 'd'),
        },
        {
          label: 'Last Month',
          value: dayjs().add(-1, 'month'),
        },
      ]}
      onChange={onChange}
    />
    <RangePicker presets={rangePresets} onChange={onRangeChange} />
    <RangePicker
      presets={rangePresets}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onRangeChange}
    />
  </Space>
);
export default App;
`,description:"<p>\u53EF\u4EE5\u9884\u8BBE\u5E38\u7528\u7684\u65E5\u671F\u8303\u56F4\u4EE5\u63D0\u9AD8\u7528\u6237\u4F53\u9A8C\u3002</p>"}},{demo:{id:"components-date-picker-demo-extra-footer"},previewerProps:{title:"\u989D\u5916\u7684\u9875\u811A",filename:"components/date-picker/demo/extra-footer.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker renderExtraFooter={() => 'extra footer'} />
    <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
    <RangePicker renderExtraFooter={() => 'extra footer'} />
    <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
    <DatePicker renderExtraFooter={() => 'extra footer'} picker="month" />
  </Space>
);
export default App;
`,description:"<p>\u5728\u6D6E\u5C42\u4E2D\u52A0\u5165\u989D\u5916\u7684\u9875\u811A\uFF0C\u4EE5\u6EE1\u8DB3\u67D0\u4E9B\u5B9A\u5236\u4FE1\u606F\u7684\u9700\u6C42\u3002</p>"}},{demo:{id:"components-date-picker-demo-size"},previewerProps:{title:"\u4E09\u79CD\u5927\u5C0F",filename:"components/date-picker/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { DatePicker, Radio, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => {
  const [size, setSize] = useState('middle');
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <Space direction="vertical" size={12}>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <DatePicker size={size} />
      <DatePicker size={size} picker="month" />
      <RangePicker size={size} />
      <DatePicker size={size} picker="week" />
    </Space>
  );
};
export default App;
`,description:"<p>\u4E09\u79CD\u5927\u5C0F\u7684\u8F93\u5165\u6846\uFF0C\u82E5\u4E0D\u8BBE\u7F6E\uFF0C\u5219\u4E3A <code>middle</code>\u3002</p>"}},{demo:{id:"components-date-picker-demo-date-render"},previewerProps:{title:"\u5B9A\u5236\u65E5\u671F\u5355\u5143\u683C",filename:"components/date-picker/demo/date-render.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
    <RangePicker
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>dateRender</code> \u53EF\u4EE5\u81EA\u5B9A\u4E49\u65E5\u671F\u5355\u5143\u683C\u7684\u5185\u5BB9\u548C\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-date-picker-demo-status"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u72B6\u6001",filename:"components/date-picker/demo/status.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <DatePicker
      status="error"
      style={{
        width: '100%',
      }}
    />
    <DatePicker
      status="warning"
      style={{
        width: '100%',
      }}
    />
    <DatePicker.RangePicker
      status="error"
      style={{
        width: '100%',
      }}
    />
    <DatePicker.RangePicker
      status="warning"
      style={{
        width: '100%',
      }}
    />
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>status</code> \u4E3A DatePicker \u6DFB\u52A0\u72B6\u6001\uFF0C\u53EF\u9009 <code>error</code> \u6216\u8005 <code>warning</code>\u3002</p>"}},{demo:{id:"components-date-picker-demo-bordered"},previewerProps:{title:"\u65E0\u8FB9\u6846",filename:"components/date-picker/demo/bordered.tsx",jsx:`import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker bordered={false} />
    <DatePicker picker="week" bordered={false} />
    <DatePicker picker="month" bordered={false} />
    <DatePicker picker="year" bordered={false} />
    <RangePicker bordered={false} />
    <RangePicker picker="week" bordered={false} />
    <RangePicker picker="month" bordered={false} />
    <RangePicker picker="year" bordered={false} />
  </Space>
);
export default App;
`,description:"<p>\u65E0\u8FB9\u6846\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-date-picker-demo-placement"},previewerProps:{title:"\u5F39\u51FA\u4F4D\u7F6E",filename:"components/date-picker/demo/placement.tsx",jsx:`import React, { useState } from 'react';
import { DatePicker, Radio } from 'antd';
const { RangePicker } = DatePicker;
const App = () => {
  const [placement, SetPlacement] = useState('topLeft');
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <DatePicker placement={placement} />
      <br />
      <br />
      <RangePicker placement={placement} />
    </>
  );
};
export default App;
`,description:"<p>\u53EF\u4EE5\u901A\u8FC7 <code>placement</code> \u624B\u52A8\u6307\u5B9A\u5F39\u51FA\u7684\u4F4D\u7F6E\u3002</p>"}},{demo:{id:"components-date-picker-demo-mode"},previewerProps:{debug:!0,title:"\u53D7\u63A7\u9762\u677F",filename:"components/date-picker/demo/mode.tsx",jsx:`import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const ControlledDatePicker = () => {
  const [mode, setMode] = useState('time');
  const handleOpenChange = (open) => {
    if (open) {
      setMode('time');
    }
  };
  const handlePanelChange = (_, newMode) => {
    setMode(newMode);
  };
  return (
    <DatePicker
      mode={mode}
      showTime
      onOpenChange={handleOpenChange}
      onPanelChange={handlePanelChange}
    />
  );
};
const ControlledRangePicker = () => {
  const [mode, setMode] = useState(['month', 'month']);
  const [value, setValue] = useState([null, null]);
  const handlePanelChange = (newValue, newModes) => {
    setValue(newValue);
    setMode([
      newModes[0] === 'date' ? 'month' : newModes[0],
      newModes[1] === 'date' ? 'month' : newModes[1],
    ]);
  };
  return (
    <RangePicker
      placeholder={['Start month', 'End month']}
      format="YYYY-MM"
      value={value}
      mode={mode}
      onChange={setValue}
      onPanelChange={handlePanelChange}
    />
  );
};
const App = () => (
  <Space direction="vertical" size={12}>
    <ControlledDatePicker />
    <ControlledRangePicker />
  </Space>
);
export default App;
`,description:"<p>\u901A\u8FC7\u7EC4\u5408 <code>mode</code> \u4E0E <code>onPanelChange</code> \u63A7\u5236\u8981\u5C55\u793A\u7684\u9762\u677F\u3002</p>"}},{demo:{id:"components-date-picker-demo-start-end"},previewerProps:{debug:!0,title:"\u81EA\u5B9A\u4E49\u65E5\u671F\u8303\u56F4\u9009\u62E9",filename:"components/date-picker/demo/start-end.tsx",jsx:`import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
const App = () => {
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  const disabledStartDate = (startDate) => {
    if (!startDate || !endValue) {
      return false;
    }
    return startDate.valueOf() > endValue.valueOf();
  };
  const disabledEndDate = (endDate) => {
    if (!endDate || !startValue) {
      return false;
    }
    return endDate.valueOf() <= startValue.valueOf();
  };
  const handleStartOpenChange = (open) => {
    if (!open) {
      setEndOpen(true);
    }
  };
  const handleEndOpenChange = (open) => {
    setEndOpen(open);
  };
  return (
    <Space>
      <DatePicker
        disabledDate={disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={startValue}
        placeholder="Start"
        onChange={setStartValue}
        onOpenChange={handleStartOpenChange}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endValue}
        placeholder="End"
        onChange={setEndValue}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </Space>
  );
};
export default App;
`,description:`<p>\u5F53 <code>RangePicker</code> \u65E0\u6CD5\u6EE1\u8DB3\u4E1A\u52A1\u9700\u6C42\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u4E24\u4E2A <code>DatePicker</code> \u5B9E\u73B0\u7C7B\u4F3C\u7684\u529F\u80FD\u3002</p>
<blockquote>
<ul>
<li>\u901A\u8FC7\u8BBE\u7F6E <code>disabledDate</code> \u65B9\u6CD5\uFF0C\u6765\u7EA6\u675F\u5F00\u59CB\u548C\u7ED3\u675F\u65E5\u671F\u3002</li>
<li>\u901A\u8FC7 <code>open</code> <code>onOpenChange</code> \u6765\u4F18\u5316\u4EA4\u4E92\u3002</li>
</ul>
</blockquote>`}},{demo:{id:"components-date-picker-demo-suffix"},previewerProps:{debug:!0,title:"\u540E\u7F00\u56FE\u6807",filename:"components/date-picker/demo/suffix.tsx",jsx:`import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const App = () => (
  <Space direction="vertical" size={12}>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="week" />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="month" />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="week" />
  </Space>
);
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\uFF0C\u5728\u6D6E\u5C42\u4E2D\u53EF\u4EE5\u9009\u62E9\u6216\u8005\u8F93\u5165\u65E5\u671F\u3002</p>"}},{demo:{id:"components-date-picker-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/date-picker/demo/render-panel.tsx",jsx:`import React from 'react';
import { DatePicker } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDatePicker } = DatePicker;
const App = () => <InternalDatePicker />;
export default App;
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("p",null,t[2].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[3].value),(0,e.tZ)("li",null,t[4].value),(0,e.tZ)("li",null,t[5].value),(0,e.tZ)("li",null,t[6].value),(0,e.tZ)("li",null,t[7].value),(0,e.tZ)("li",null,t[8].value)),(0,e.tZ)("h3",{id:"\u56FD\u9645\u5316\u914D\u7F6E"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u56FD\u9645\u5316\u914D\u7F6E"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u56FD\u9645\u5316\u914D\u7F6E"),(0,e.tZ)("p",null,t[9].value,(0,e.tZ)("a",{href:"https://ant.design/components/config-provider-cn/"},t[10].value),t[11].value),(0,e.tZ)("p",null,t[12].value,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json"},t[13].value),t[14].value),(0,e.tZ)(u.Z,{lang:"jsx"},t[15].value),(0,e.tZ)(u.Z,{lang:"jsx"},t[16].value),(0,e.tZ)("h3",{id:"\u5171\u540C\u7684-api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5171\u540C\u7684-api"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u5171\u540C\u7684 API"),(0,e.tZ)("p",null,t[17].value),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[18].value),(0,e.tZ)("th",null,t[19].value),(0,e.tZ)("th",null,t[20].value),(0,e.tZ)("th",null,t[21].value),(0,e.tZ)("th",null,t[22].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[23].value),(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,t[25].value),(0,e.tZ)("td",null,t[26].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[27].value),(0,e.tZ)("td",null,t[28].value),(0,e.tZ)("td",null,t[29].value),(0,e.tZ)("td",null,t[30].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[35].value),(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,t[37].value),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,t[40].value),(0,e.tZ)("td",null,t[41].value),(0,e.tZ)("td",null,t[42].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[43].value),(0,e.tZ)("td",null,t[44].value),(0,e.tZ)("td",null,t[45].value),(0,e.tZ)("td",null,t[46].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[47].value),(0,e.tZ)("td",null,t[48].value),(0,e.tZ)("td",null,t[49].value),(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[51].value),(0,e.tZ)("td",null,t[52].value),(0,e.tZ)("td",null,t[53].value),(0,e.tZ)("td",null,t[54].value),(0,e.tZ)("td",null,t[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[56].value),(0,e.tZ)("td",null,t[57].value),(0,e.tZ)("td",null,t[58].value),(0,e.tZ)("td",null,t[59].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[60].value),(0,e.tZ)("td",null,t[61].value),(0,e.tZ)("td",null,t[62].value),(0,e.tZ)("td",null,t[63].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[64].value),(0,e.tZ)("td",null,t[65].value),(0,e.tZ)("td",null,t[66].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json"},t[67].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[68].value),(0,e.tZ)("td",null,t[69].value,(0,e.tZ)(n.rU,{to:"/docs/react/faq#%E5%BD%93%E6%88%91%E6%8C%87%E5%AE%9A%E4%BA%86-DatePicker/RangePicker-%E7%9A%84-mode-%E5%B1%9E%E6%80%A7%E5%90%8E%EF%BC%8C%E7%82%B9%E5%87%BB%E5%90%8E%E6%97%A0%E6%B3%95%E9%80%89%E6%8B%A9%E5%B9%B4%E4%BB%BD/%E6%9C%88%E4%BB%BD%EF%BC%9F"},t[70].value),t[71].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[72].value),t[73].value,(0,e.tZ)("code",null,t[74].value),t[75].value,(0,e.tZ)("code",null,t[76].value),t[77].value,(0,e.tZ)("code",null,t[78].value),t[79].value,(0,e.tZ)("code",null,t[80].value)),(0,e.tZ)("td",null,t[81].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[82].value),(0,e.tZ)("td",null,t[83].value),(0,e.tZ)("td",null,t[84].value),(0,e.tZ)("td",null,t[85].value),(0,e.tZ)("td",null,t[86].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[87].value),(0,e.tZ)("td",null,t[88].value),(0,e.tZ)("td",null,t[89].value),(0,e.tZ)("td",null,t[90].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[91].value),(0,e.tZ)("td",null,t[92].value),(0,e.tZ)("td",null,t[93].value),(0,e.tZ)("td",null,t[94].value),(0,e.tZ)("td",null,t[95].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[96].value),(0,e.tZ)("td",null,t[97].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[98].value),t[99].value,(0,e.tZ)("code",null,t[100].value),t[101].value,(0,e.tZ)("code",null,t[102].value),t[103].value,(0,e.tZ)("code",null,t[104].value),t[105].value,(0,e.tZ)("code",null,t[106].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[107].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[108].value),t[109].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[110].value),(0,e.tZ)("td",null,t[111].value),(0,e.tZ)("td",null,t[112].value),(0,e.tZ)("td",null,t[113].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[114].value),(0,e.tZ)("td",null,t[115].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[116].value),t[117].value,(0,e.tZ)("code",null,t[118].value),t[119].value,(0,e.tZ)("code",null,t[120].value),t[121].value,(0,e.tZ)("code",null,t[122].value)),(0,e.tZ)("td",null,t[123].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[124].value),(0,e.tZ)("td",null,t[125].value),(0,e.tZ)("td",null,t[126].value),(0,e.tZ)("td",null,t[127].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[128].value),(0,e.tZ)("td",null,t[129].value),(0,e.tZ)("td",null,t[130].value),(0,e.tZ)("td",null,t[131].value),(0,e.tZ)("td",null,t[132].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[133].value),(0,e.tZ)("td",null,t[134].value),(0,e.tZ)("td",null,t[135].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[136].value),t[137].value),(0,e.tZ)("td",null,t[138].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[139].value),(0,e.tZ)("td",null,t[140].value,(0,e.tZ)("code",null,t[141].value),t[142].value,(0,e.tZ)("code",null,t[143].value),t[144].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[145].value),t[146].value,(0,e.tZ)("code",null,t[147].value),t[148].value,(0,e.tZ)("code",null,t[149].value)),(0,e.tZ)("td",null,t[150].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[151].value),(0,e.tZ)("td",null,t[152].value),(0,e.tZ)("td",null,t[153].value),(0,e.tZ)("td",null,t[154].value),(0,e.tZ)("td",null,t[155].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[156].value),(0,e.tZ)("td",null,t[157].value),(0,e.tZ)("td",null,t[158].value),(0,e.tZ)("td",null,t[159].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[160].value),(0,e.tZ)("td",null,t[161].value),(0,e.tZ)("td",null,t[162].value),(0,e.tZ)("td",null,t[163].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[164].value),(0,e.tZ)("td",null,t[165].value,(0,e.tZ)("code",null,t[166].value),t[167].value),(0,e.tZ)("td",null,t[168].value),(0,e.tZ)("td",null,t[169].value),(0,e.tZ)("td",null,t[170].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[171].value),(0,e.tZ)("td",null,t[172].value,(0,e.tZ)("code",null,t[173].value),t[174].value),(0,e.tZ)("td",null,t[175].value),(0,e.tZ)("td",null,t[176].value),(0,e.tZ)("td",null,t[177].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[178].value),(0,e.tZ)("td",null,t[179].value),(0,e.tZ)("td",null,t[180].value),(0,e.tZ)("td",null,t[181].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[182].value),(0,e.tZ)("td",null,t[183].value),(0,e.tZ)("td",null,t[184].value),(0,e.tZ)("td",null,t[185].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"\u5171\u540C\u7684\u65B9\u6CD5"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5171\u540C\u7684\u65B9\u6CD5"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u5171\u540C\u7684\u65B9\u6CD5"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[186].value),(0,e.tZ)("th",null,t[187].value),(0,e.tZ)("th",null,t[188].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[189].value),(0,e.tZ)("td",null,t[190].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[191].value),(0,e.tZ)("td",null,t[192].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepicker"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepicker"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[193].value),(0,e.tZ)("th",null,t[194].value),(0,e.tZ)("th",null,t[195].value),(0,e.tZ)("th",null,t[196].value),(0,e.tZ)("th",null,t[197].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[198].value),(0,e.tZ)("td",null,t[199].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[200].value)),(0,e.tZ)("td",null,t[201].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[202].value),(0,e.tZ)("td",null,t[203].value,(0,e.tZ)("code",null,t[204].value),t[205].value,(0,e.tZ)("code",null,t[206].value),t[207].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[208].value)),(0,e.tZ)("td",null,t[209].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[210].value),(0,e.tZ)("td",null,t[211].value),(0,e.tZ)("td",null,t[212].value),(0,e.tZ)("td",null,t[213].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[214].value),(0,e.tZ)("td",null,t[215].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[216].value),t[217].value,(0,e.tZ)(n.rU,{to:"#components-date-picker-demo-format"},t[218].value)),(0,e.tZ)("td",null,t[219].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[220].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[221].value),(0,e.tZ)("td",null,t[222].value),(0,e.tZ)("td",null,t[223].value),(0,e.tZ)("td",null,t[224].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[225].value),(0,e.tZ)("td",null,t[226].value,(0,e.tZ)("code",null,t[227].value),t[228].value),(0,e.tZ)("td",null,t[229].value),(0,e.tZ)("td",null,t[230].value),(0,e.tZ)("td",null,t[231].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[232].value),(0,e.tZ)("td",null,t[233].value),(0,e.tZ)("td",null,t[234].value),(0,e.tZ)("td",null,(0,e.tZ)(n.rU,{to:"/components/time-picker/#API"},t[235].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[236].value),(0,e.tZ)("td",null,t[237].value,(0,e.tZ)(n.rU,{to:"#components-date-picker-demo-disabled-date"},t[238].value)),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[239].value)),(0,e.tZ)("td",null,t[240].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[241].value),(0,e.tZ)("td",null,t[242].value),(0,e.tZ)("td",null,t[243].value),(0,e.tZ)("td",null,t[244].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[245].value),(0,e.tZ)("td",null,t[246].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[247].value)),(0,e.tZ)("td",null,t[248].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[249].value),(0,e.tZ)("td",null,t[250].value),(0,e.tZ)("td",null,t[251].value),(0,e.tZ)("td",null,t[252].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[253].value),(0,e.tZ)("td",null,t[254].value),(0,e.tZ)("td",null,t[255].value),(0,e.tZ)("td",null,t[256].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[257].value),(0,e.tZ)("td",null,t[258].value),(0,e.tZ)("td",null,t[259].value),(0,e.tZ)("td",null,t[260].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickeryear"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickeryear"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=year]"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[261].value),(0,e.tZ)("th",null,t[262].value),(0,e.tZ)("th",null,t[263].value),(0,e.tZ)("th",null,t[264].value),(0,e.tZ)("th",null,t[265].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[266].value),(0,e.tZ)("td",null,t[267].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[268].value)),(0,e.tZ)("td",null,t[269].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[270].value),(0,e.tZ)("td",null,t[271].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[272].value)),(0,e.tZ)("td",null,t[273].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[274].value),(0,e.tZ)("td",null,t[275].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[276].value)),(0,e.tZ)("td",null,t[277].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[278].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[279].value),(0,e.tZ)("td",null,t[280].value),(0,e.tZ)("td",null,t[281].value),(0,e.tZ)("td",null,t[282].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[283].value),(0,e.tZ)("td",null,t[284].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[285].value)),(0,e.tZ)("td",null,t[286].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[287].value),(0,e.tZ)("td",null,t[288].value),(0,e.tZ)("td",null,t[289].value),(0,e.tZ)("td",null,t[290].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickerquarter"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickerquarter"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=quarter]"),(0,e.tZ)("p",null,(0,e.tZ)("code",null,t[291].value),t[292].value),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[293].value),(0,e.tZ)("th",null,t[294].value),(0,e.tZ)("th",null,t[295].value),(0,e.tZ)("th",null,t[296].value),(0,e.tZ)("th",null,t[297].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[298].value),(0,e.tZ)("td",null,t[299].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[300].value)),(0,e.tZ)("td",null,t[301].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[302].value),(0,e.tZ)("td",null,t[303].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[304].value)),(0,e.tZ)("td",null,t[305].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[306].value),(0,e.tZ)("td",null,t[307].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[308].value)),(0,e.tZ)("td",null,t[309].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[310].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[311].value),(0,e.tZ)("td",null,t[312].value),(0,e.tZ)("td",null,t[313].value),(0,e.tZ)("td",null,t[314].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[315].value),(0,e.tZ)("td",null,t[316].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[317].value)),(0,e.tZ)("td",null,t[318].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[319].value),(0,e.tZ)("td",null,t[320].value),(0,e.tZ)("td",null,t[321].value),(0,e.tZ)("td",null,t[322].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickermonth"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickermonth"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=month]"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[323].value),(0,e.tZ)("th",null,t[324].value),(0,e.tZ)("th",null,t[325].value),(0,e.tZ)("th",null,t[326].value),(0,e.tZ)("th",null,t[327].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[328].value),(0,e.tZ)("td",null,t[329].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[330].value)),(0,e.tZ)("td",null,t[331].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[332].value),(0,e.tZ)("td",null,t[333].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[334].value)),(0,e.tZ)("td",null,t[335].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[336].value),(0,e.tZ)("td",null,t[337].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[338].value)),(0,e.tZ)("td",null,t[339].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[340].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[341].value),(0,e.tZ)("td",null,t[342].value),(0,e.tZ)("td",null,t[343].value),(0,e.tZ)("td",null,t[344].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[345].value),(0,e.tZ)("td",null,t[346].value),(0,e.tZ)("td",null,t[347].value),(0,e.tZ)("td",null,t[348].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[349].value),(0,e.tZ)("td",null,t[350].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[351].value)),(0,e.tZ)("td",null,t[352].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[353].value),(0,e.tZ)("td",null,t[354].value),(0,e.tZ)("td",null,t[355].value),(0,e.tZ)("td",null,t[356].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickerweek"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickerweek"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=week]"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[357].value),(0,e.tZ)("th",null,t[358].value),(0,e.tZ)("th",null,t[359].value),(0,e.tZ)("th",null,t[360].value),(0,e.tZ)("th",null,t[361].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[362].value),(0,e.tZ)("td",null,t[363].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[364].value)),(0,e.tZ)("td",null,t[365].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[366].value),(0,e.tZ)("td",null,t[367].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[368].value)),(0,e.tZ)("td",null,t[369].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[370].value),(0,e.tZ)("td",null,t[371].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[372].value)),(0,e.tZ)("td",null,t[373].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[374].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[375].value),(0,e.tZ)("td",null,t[376].value),(0,e.tZ)("td",null,t[377].value),(0,e.tZ)("td",null,t[378].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[379].value),(0,e.tZ)("td",null,t[380].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[381].value)),(0,e.tZ)("td",null,t[382].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[383].value),(0,e.tZ)("td",null,t[384].value),(0,e.tZ)("td",null,t[385].value),(0,e.tZ)("td",null,t[386].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"rangepicker"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rangepicker"},(0,e.tZ)("span",{className:"icon icon-link"})),"RangePicker"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[387].value),(0,e.tZ)("th",null,t[388].value),(0,e.tZ)("th",null,t[389].value),(0,e.tZ)("th",null,t[390].value),(0,e.tZ)("th",null,t[391].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[392].value),(0,e.tZ)("td",null,t[393].value),(0,e.tZ)("td",null,t[394].value),(0,e.tZ)("td",null,t[395].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[396].value),(0,e.tZ)("td",null,t[397].value,(0,e.tZ)("code",null,t[398].value),t[399].value),(0,e.tZ)("td",null,t[400].value,(0,e.tZ)("code",null,t[401].value),t[402].value,(0,e.tZ)("code",null,t[403].value),t[404].value),(0,e.tZ)("td",null,t[405].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[406].value),(0,e.tZ)("td",null,t[407].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[408].value),t[409].value),(0,e.tZ)("td",null,t[410].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[411].value),(0,e.tZ)("td",null,t[412].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[413].value),t[414].value),(0,e.tZ)("td",null,t[415].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[416].value),(0,e.tZ)("td",null,t[417].value),(0,e.tZ)("td",null,t[418].value),(0,e.tZ)("td",null,t[419].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[420].value),(0,e.tZ)("td",null,t[421].value),(0,e.tZ)("td",null,t[422].value,(0,e.tZ)("code",null,t[423].value),t[424].value,(0,e.tZ)("code",null,t[425].value),t[426].value),(0,e.tZ)("td",null,t[427].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[428].value),(0,e.tZ)("td",null,t[429].value),(0,e.tZ)("td",null,t[430].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[431].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[432].value),(0,e.tZ)("td",null,t[433].value),(0,e.tZ)("td",null,t[434].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[435].value),t[436].value),(0,e.tZ)("td",null,t[437].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[438].value),(0,e.tZ)("td",null,t[439].value),(0,e.tZ)("td",null,t[440].value),(0,e.tZ)("td",null,t[441].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[442].value),(0,e.tZ)("td",null,t[443].value),(0,e.tZ)("td",null,t[444].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[445].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[446].value),(0,e.tZ)("td",null,t[447].value),(0,e.tZ)("td",null,t[448].value),(0,e.tZ)("td",null,(0,e.tZ)(n.rU,{to:"/components/time-picker/#API"},t[449].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[450].value),(0,e.tZ)("td",null,t[451].value,(0,e.tZ)(n.rU,{to:"#components-date-picker-demo-disabled-date"},t[452].value)),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[453].value),t[454].value),(0,e.tZ)("td",null,t[455].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[456].value),(0,e.tZ)("td",null,t[457].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[458].value),t[459].value),(0,e.tZ)("td",null,t[460].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[461].value),(0,e.tZ)("td",null,t[462].value,(0,e.tZ)("code",null,t[463].value),t[464].value),(0,e.tZ)("td",null,t[465].value,(0,e.tZ)("code",null,t[466].value),t[467].value,(0,e.tZ)("code",null,t[468].value),t[469].value),(0,e.tZ)("td",null,t[470].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[471].value),(0,e.tZ)("td",null,t[472].value),(0,e.tZ)("td",null,t[473].value),(0,e.tZ)("td",null,t[474].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h2",{id:"faq"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,e.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,e.tZ)("h3",{id:"\u5F53\u6211\u6307\u5B9A\u4E86-datepickerrangepicker-\u7684-mode-\u5C5E\u6027\u540E\u70B9\u51FB\u540E\u65E0\u6CD5\u9009\u62E9\u5E74\u4EFD\u6708\u4EFD"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5F53\u6211\u6307\u5B9A\u4E86-datepickerrangepicker-\u7684-mode-\u5C5E\u6027\u540E\u70B9\u51FB\u540E\u65E0\u6CD5\u9009\u62E9\u5E74\u4EFD\u6708\u4EFD"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u5F53\u6211\u6307\u5B9A\u4E86 DatePicker/RangePicker \u7684 mode \u5C5E\u6027\u540E\uFF0C\u70B9\u51FB\u540E\u65E0\u6CD5\u9009\u62E9\u5E74\u4EFD/\u6708\u4EFD\uFF1F"),(0,e.tZ)("p",null,t[475].value,(0,e.tZ)(n.rU,{to:"/docs/react/faq#%E5%BD%93%E6%88%91%E6%8C%87%E5%AE%9A%E4%BA%86-DatePicker/RangePicker-%E7%9A%84-mode-%E5%B1%9E%E6%80%A7%E5%90%8E%EF%BC%8C%E7%82%B9%E5%87%BB%E5%90%8E%E6%97%A0%E6%B3%95%E9%80%89%E6%8B%A9%E5%B9%B4%E4%BB%BD/%E6%9C%88%E4%BB%BD%EF%BC%9F"},t[476].value)),(0,e.tZ)("h3",{id:"\u5982\u4F55\u5728-datepicker-\u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u65E5\u671F\u5E93\u5982-momentjs-"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u5728-datepicker-\u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u65E5\u671F\u5E93\u5982-momentjs-"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u5728 DatePicker \u4E2D\u4F7F\u7528\u81EA\u5B9A\u4E49\u65E5\u671F\u5E93\uFF08\u5982 Moment.js \uFF09\uFF1F"),(0,e.tZ)("p",null,t[477].value,(0,e.tZ)(n.rU,{to:"/docs/react/use-custom-date-library#DatePicker"},t[478].value)),(0,e.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316-locale-\u8BBE\u7F6E\u4E0D\u751F\u6548"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316-locale-\u8BBE\u7F6E\u4E0D\u751F\u6548"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316 locale \u8BBE\u7F6E\u4E0D\u751F\u6548\uFF1F"),(0,e.tZ)("p",null,t[479].value,(0,e.tZ)(n.rU,{to:"/docs/react/faq#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96-locale-%E8%AE%BE%E7%BD%AE%E4%B8%8D%E7%94%9F%E6%95%88%EF%BC%9F"},t[480].value),t[481].value),(0,e.tZ)("h3",{id:"\u5982\u4F55\u4FEE\u6539\u5468\u7684\u8D77\u59CB\u65E5"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u4FEE\u6539\u5468\u7684\u8D77\u59CB\u65E5"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u4FEE\u6539\u5468\u7684\u8D77\u59CB\u65E5\uFF1F"),(0,e.tZ)("p",null,t[482].value,(0,e.tZ)(n.rU,{to:"/docs/react/i18n-cn"},t[483].value),t[484].value,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/5605"},t[485].value),t[486].value,(0,e.tZ)("code",null,t[487].value),t[488].value,(0,e.tZ)("a",{href:"https://codesandbox.io/s/dayjs-day-of-week-x9tuj2?file=/demo.tsx"},t[489].value)),(0,e.tZ)(u.Z,{lang:"js"},t[490].value),(0,e.tZ)("h3",{id:"\u4E3A\u4F55\u4F7F\u7528-panelrender-\u65F6\u539F\u6765\u9762\u677F\u65E0\u6CD5\u5207\u6362"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55\u4F7F\u7528-panelrender-\u65F6\u539F\u6765\u9762\u677F\u65E0\u6CD5\u5207\u6362"},(0,e.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55\u4F7F\u7528 ",(0,e.tZ)("code",null,t[491].value)," \u65F6\uFF0C\u539F\u6765\u9762\u677F\u65E0\u6CD5\u5207\u6362\uFF1F"),(0,e.tZ)("p",null,t[492].value,(0,e.tZ)("code",null,t[493].value),t[494].value,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/27263"},t[495].value),t[496].value))))}d.default=i}}]);
