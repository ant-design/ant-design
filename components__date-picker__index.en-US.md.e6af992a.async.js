"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[8182],{96347:function(c,d,l){l.r(d);var Z=l(2143),p=l(50250),v=l(59378),m=l(78190),u=l(74775),a=l(5937),h=l(2068),k=l(74399),g=l(46004),f=l(35708),_=l(30138),P=l(56140),o=l(5388),D=l(49545),y=l(92169),x=l(13140),b=l(95127),R=l(74418),C=l(97119),n=l(28257),r=l(67294),e=l(13946);function i(){var s=(0,n.eL)(),t=s.texts;return(0,e.tZ)(n.dY,null,(0,e.tZ)(r.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("p",null,t[1].value),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(o.Z,{items:[{demo:{id:"components-date-picker-demo-basic"},previewerProps:{title:"Basic",filename:"components/date-picker/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>Basic use case. Users can select or input a date in panel.</p>"}},{demo:{id:"components-date-picker-demo-range-picker"},previewerProps:{title:"Range Picker",filename:"components/date-picker/demo/range-picker.tsx",jsx:`import React from 'react';
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
`,description:"<p>Set range picker type by <code>picker</code> prop.</p>"}},{demo:{id:"components-date-picker-demo-switchable"},previewerProps:{title:"Switchable picker",filename:"components/date-picker/demo/switchable.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Switch in different types of pickers by Select.</p>"}},{demo:{id:"components-date-picker-demo-format"},previewerProps:{title:"Date Format",filename:"components/date-picker/demo/format.tsx",jsx:`import React from 'react';
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
`,description:"<p>We can set the date format by <code>format</code>.</p>"}},{demo:{id:"components-date-picker-demo-time"},previewerProps:{title:"Choose Time",filename:"components/date-picker/demo/time.tsx",jsx:`import React from 'react';
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
`,description:"<p>This property provide an additional time selection. When <code>showTime</code> is an Object, its properties will be passed on to built-in <code>TimePicker</code>.</p>"}},{demo:{id:"components-date-picker-demo-disabled"},previewerProps:{title:"Disabled",filename:"components/date-picker/demo/disabled.tsx",jsx:`import React from 'react';
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
`,description:"<p>A disabled state of the <code>DatePicker</code>. You can also set as array to disable one of input.</p>"}},{demo:{id:"components-date-picker-demo-disabled-date"},previewerProps:{title:"Disabled Date & Time",filename:"components/date-picker/demo/disabled-date.tsx",jsx:`import React from 'react';
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
`,description:"<p>Disabled part of dates and time by <code>disabledDate</code> and <code>disabledTime</code> respectively, and <code>disabledTime</code> only works with <code>showTime</code>.</p>"}},{demo:{id:"components-date-picker-demo-select-in-range"},previewerProps:{title:"Select range dates in 7 days",filename:"components/date-picker/demo/select-in-range.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>A example shows how to select a dynamic range by using <code>onCalendarChange</code> and <code>disabledDate</code>.</p>"}},{demo:{id:"components-date-picker-demo-presetted-ranges"},previewerProps:{title:"Preset Ranges",filename:"components/date-picker/demo/presetted-ranges.tsx",jsx:`import React from 'react';
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
`,description:"<p>We can set preset ranges to RangePicker to improve user experience.</p>"}},{demo:{id:"components-date-picker-demo-extra-footer"},previewerProps:{title:"Extra Footer",filename:"components/date-picker/demo/extra-footer.tsx",jsx:`import React from 'react';
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
`,description:"<p>Render extra footer in panel for customized requirements.</p>"}},{demo:{id:"components-date-picker-demo-size"},previewerProps:{title:"Three Sizes",filename:"components/date-picker/demo/size.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>The input box comes in three sizes. <code>middle</code> will be used if <code>size</code> is omitted.</p>"}},{demo:{id:"components-date-picker-demo-date-render"},previewerProps:{title:"Customized Date Rendering",filename:"components/date-picker/demo/date-render.tsx",jsx:`import React from 'react';
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
`,description:"<p>We can customize the rendering of date cells in the calendar by providing a <code>dateRender</code> function to <code>DatePicker</code>.</p>"}},{demo:{id:"components-date-picker-demo-status"},previewerProps:{title:"Status",filename:"components/date-picker/demo/status.tsx",jsx:`import React from 'react';
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
`,description:"<p>Add status to DatePicker with <code>status</code>, which could be <code>error</code> or <code>warning</code>.</p>"}},{demo:{id:"components-date-picker-demo-bordered"},previewerProps:{title:"Bordered-less",filename:"components/date-picker/demo/bordered.tsx",jsx:`import React from 'react';
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
`,description:"<p>Bordered-less style component.</p>"}},{demo:{id:"components-date-picker-demo-placement"},previewerProps:{title:"Placement",filename:"components/date-picker/demo/placement.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>You can manually specify the position of the popup via <code>placement</code>.</p>"}},{demo:{id:"components-date-picker-demo-mode"},previewerProps:{debug:!0,title:"Controlled Panels",filename:"components/date-picker/demo/mode.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Determing which panel to show with <code>mode</code> and <code>onPanelChange</code>.</p>"}},{demo:{id:"components-date-picker-demo-start-end"},previewerProps:{debug:!0,title:"Customized Range Picker",filename:"components/date-picker/demo/start-end.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p>When <code>RangePicker</code> does not satisfied your requirements, try to implement similar functionality with two <code>DatePicker</code>.</p>
<blockquote>
<ul>
<li>Use the <code>disabledDate</code> property to limit the start and end dates.</li>
<li>Improve user experience with <code>open</code> and <code>onOpenChange</code>.</li>
</ul>
</blockquote>`}},{demo:{id:"components-date-picker-demo-suffix"},previewerProps:{debug:!0,title:"Suffix",filename:"components/date-picker/demo/suffix.tsx",jsx:`import React from 'react';
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
`,description:"<p>Basic use case. Users can select or input a date in panel.</p>"}},{demo:{id:"components-date-picker-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/date-picker/demo/render-panel.tsx",jsx:`import React from 'react';
import { DatePicker } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDatePicker } = DatePicker;
const App = () => <InternalDatePicker />;
export default App;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)("p",null,t[2].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[3].value),(0,e.tZ)("li",null,t[4].value),(0,e.tZ)("li",null,t[5].value),(0,e.tZ)("li",null,t[6].value),(0,e.tZ)("li",null,t[7].value),(0,e.tZ)("li",null,t[8].value)),(0,e.tZ)("h3",{id:"localization"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#localization"},(0,e.tZ)("span",{className:"icon icon-link"})),"Localization"),(0,e.tZ)("p",null,t[9].value,(0,e.tZ)("a",{href:"https://ant.design/components/config-provider/"},t[10].value),t[11].value),(0,e.tZ)("p",null,t[12].value,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json"},t[13].value),t[14].value),(0,e.tZ)(u.Z,{lang:"jsx"},t[15].value),(0,e.tZ)(u.Z,{lang:"jsx"},t[16].value),(0,e.tZ)("h3",{id:"common-api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#common-api"},(0,e.tZ)("span",{className:"icon icon-link"})),"Common API"),(0,e.tZ)("p",null,t[17].value),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[18].value),(0,e.tZ)("th",null,t[19].value),(0,e.tZ)("th",null,t[20].value),(0,e.tZ)("th",null,t[21].value),(0,e.tZ)("th",null,t[22].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[23].value),(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,t[25].value),(0,e.tZ)("td",null,t[26].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[27].value),(0,e.tZ)("td",null,t[28].value),(0,e.tZ)("td",null,t[29].value),(0,e.tZ)("td",null,t[30].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[35].value),(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,t[37].value),(0,e.tZ)("td",null,t[38].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[39].value),(0,e.tZ)("td",null,t[40].value),(0,e.tZ)("td",null,t[41].value),(0,e.tZ)("td",null,t[42].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[43].value),(0,e.tZ)("td",null,t[44].value),(0,e.tZ)("td",null,t[45].value),(0,e.tZ)("td",null,t[46].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[47].value),(0,e.tZ)("td",null,t[48].value),(0,e.tZ)("td",null,t[49].value),(0,e.tZ)("td",null,t[50].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[51].value),(0,e.tZ)("td",null,t[52].value),(0,e.tZ)("td",null,t[53].value),(0,e.tZ)("td",null,t[54].value),(0,e.tZ)("td",null,t[55].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[56].value),(0,e.tZ)("td",null,t[57].value,(0,e.tZ)("code",null,t[58].value),t[59].value,(0,e.tZ)("code",null,t[60].value)),(0,e.tZ)("td",null,t[61].value),(0,e.tZ)("td",null,t[62].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[63].value),(0,e.tZ)("td",null,t[64].value,(0,e.tZ)("code",null,t[65].value),t[66].value),(0,e.tZ)("td",null,t[67].value),(0,e.tZ)("td",null,t[68].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[69].value),(0,e.tZ)("td",null,t[70].value),(0,e.tZ)("td",null,t[71].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json"},t[72].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[73].value),(0,e.tZ)("td",null,t[74].value,(0,e.tZ)(n.rU,{to:"/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?"},t[75].value),t[76].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[77].value),t[78].value,(0,e.tZ)("code",null,t[79].value),t[80].value,(0,e.tZ)("code",null,t[81].value),t[82].value,(0,e.tZ)("code",null,t[83].value),t[84].value,(0,e.tZ)("code",null,t[85].value)),(0,e.tZ)("td",null,t[86].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[87].value),(0,e.tZ)("td",null,t[88].value),(0,e.tZ)("td",null,t[89].value),(0,e.tZ)("td",null,t[90].value),(0,e.tZ)("td",null,t[91].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[92].value),(0,e.tZ)("td",null,t[93].value),(0,e.tZ)("td",null,t[94].value),(0,e.tZ)("td",null,t[95].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[96].value),(0,e.tZ)("td",null,t[97].value),(0,e.tZ)("td",null,t[98].value),(0,e.tZ)("td",null,t[99].value),(0,e.tZ)("td",null,t[100].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[101].value),(0,e.tZ)("td",null,t[102].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[103].value),t[104].value,(0,e.tZ)("code",null,t[105].value),t[106].value,(0,e.tZ)("code",null,t[107].value),t[108].value,(0,e.tZ)("code",null,t[109].value),t[110].value,(0,e.tZ)("code",null,t[111].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[112].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[113].value),t[114].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[115].value),(0,e.tZ)("td",null,t[116].value),(0,e.tZ)("td",null,t[117].value),(0,e.tZ)("td",null,t[118].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[119].value),(0,e.tZ)("td",null,t[120].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[121].value),t[122].value,(0,e.tZ)("code",null,t[123].value),t[124].value,(0,e.tZ)("code",null,t[125].value),t[126].value,(0,e.tZ)("code",null,t[127].value)),(0,e.tZ)("td",null,t[128].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[129].value),(0,e.tZ)("td",null,t[130].value),(0,e.tZ)("td",null,t[131].value),(0,e.tZ)("td",null,t[132].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[133].value),(0,e.tZ)("td",null,t[134].value),(0,e.tZ)("td",null,t[135].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[136].value),t[137].value),(0,e.tZ)("td",null,t[138].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[139].value),(0,e.tZ)("td",null,t[140].value),(0,e.tZ)("td",null,t[141].value),(0,e.tZ)("td",null,t[142].value),(0,e.tZ)("td",null,t[143].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[144].value),(0,e.tZ)("td",null,t[145].value,(0,e.tZ)("code",null,t[146].value),t[147].value,(0,e.tZ)("code",null,t[148].value),t[149].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[150].value),t[151].value,(0,e.tZ)("code",null,t[152].value),t[153].value,(0,e.tZ)("code",null,t[154].value)),(0,e.tZ)("td",null,t[155].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[156].value),(0,e.tZ)("td",null,t[157].value),(0,e.tZ)("td",null,t[158].value),(0,e.tZ)("td",null,t[159].value),(0,e.tZ)("td",null,t[160].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[161].value),(0,e.tZ)("td",null,t[162].value),(0,e.tZ)("td",null,t[163].value),(0,e.tZ)("td",null,t[164].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[165].value),(0,e.tZ)("td",null,t[166].value),(0,e.tZ)("td",null,t[167].value),(0,e.tZ)("td",null,t[168].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[169].value),(0,e.tZ)("td",null,t[170].value),(0,e.tZ)("td",null,t[171].value),(0,e.tZ)("td",null,t[172].value),(0,e.tZ)("td",null,t[173].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[174].value),(0,e.tZ)("td",null,t[175].value),(0,e.tZ)("td",null,t[176].value),(0,e.tZ)("td",null,t[177].value),(0,e.tZ)("td",null,t[178].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[179].value),(0,e.tZ)("td",null,t[180].value),(0,e.tZ)("td",null,t[181].value),(0,e.tZ)("td",null,t[182].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[183].value),(0,e.tZ)("td",null,t[184].value),(0,e.tZ)("td",null,t[185].value),(0,e.tZ)("td",null,t[186].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"common-methods"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#common-methods"},(0,e.tZ)("span",{className:"icon icon-link"})),"Common Methods"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[187].value),(0,e.tZ)("th",null,t[188].value),(0,e.tZ)("th",null,t[189].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[190].value),(0,e.tZ)("td",null,t[191].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[192].value),(0,e.tZ)("td",null,t[193].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepicker"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepicker"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[194].value),(0,e.tZ)("th",null,t[195].value),(0,e.tZ)("th",null,t[196].value),(0,e.tZ)("th",null,t[197].value),(0,e.tZ)("th",null,t[198].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[199].value),(0,e.tZ)("td",null,t[200].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[201].value)),(0,e.tZ)("td",null,t[202].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[203].value),(0,e.tZ)("td",null,t[204].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[205].value)),(0,e.tZ)("td",null,t[206].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[207].value),(0,e.tZ)("td",null,t[208].value),(0,e.tZ)("td",null,t[209].value),(0,e.tZ)("td",null,t[210].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[211].value),(0,e.tZ)("td",null,t[212].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[213].value),t[214].value,(0,e.tZ)(n.rU,{to:"#components-date-picker-demo-format"},t[215].value)),(0,e.tZ)("td",null,t[216].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[217].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[218].value),(0,e.tZ)("td",null,t[219].value),(0,e.tZ)("td",null,t[220].value),(0,e.tZ)("td",null,t[221].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[222].value),(0,e.tZ)("td",null,t[223].value,(0,e.tZ)("code",null,t[224].value),t[225].value),(0,e.tZ)("td",null,t[226].value),(0,e.tZ)("td",null,t[227].value),(0,e.tZ)("td",null,t[228].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[229].value),(0,e.tZ)("td",null,t[230].value),(0,e.tZ)("td",null,t[231].value),(0,e.tZ)("td",null,(0,e.tZ)(n.rU,{to:"/components/time-picker/#API"},t[232].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[233].value),(0,e.tZ)("td",null,t[234].value,(0,e.tZ)(n.rU,{to:"#components-date-picker-demo-disabled-date"},t[235].value)),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[236].value)),(0,e.tZ)("td",null,t[237].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[238].value),(0,e.tZ)("td",null,t[239].value,(0,e.tZ)("code",null,t[240].value),t[241].value),(0,e.tZ)("td",null,t[242].value),(0,e.tZ)("td",null,t[243].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[244].value),(0,e.tZ)("td",null,t[245].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[246].value)),(0,e.tZ)("td",null,t[247].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[248].value),(0,e.tZ)("td",null,t[249].value),(0,e.tZ)("td",null,t[250].value),(0,e.tZ)("td",null,t[251].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[252].value),(0,e.tZ)("td",null,t[253].value),(0,e.tZ)("td",null,t[254].value),(0,e.tZ)("td",null,t[255].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[256].value),(0,e.tZ)("td",null,t[257].value),(0,e.tZ)("td",null,t[258].value),(0,e.tZ)("td",null,t[259].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickeryear"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickeryear"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=year]"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[260].value),(0,e.tZ)("th",null,t[261].value),(0,e.tZ)("th",null,t[262].value),(0,e.tZ)("th",null,t[263].value),(0,e.tZ)("th",null,t[264].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[265].value),(0,e.tZ)("td",null,t[266].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[267].value)),(0,e.tZ)("td",null,t[268].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[269].value),(0,e.tZ)("td",null,t[270].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[271].value)),(0,e.tZ)("td",null,t[272].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[273].value),(0,e.tZ)("td",null,t[274].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[275].value)),(0,e.tZ)("td",null,t[276].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[277].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[278].value),(0,e.tZ)("td",null,t[279].value),(0,e.tZ)("td",null,t[280].value),(0,e.tZ)("td",null,t[281].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[282].value),(0,e.tZ)("td",null,t[283].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[284].value)),(0,e.tZ)("td",null,t[285].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[286].value),(0,e.tZ)("td",null,t[287].value),(0,e.tZ)("td",null,t[288].value),(0,e.tZ)("td",null,t[289].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickerquarter"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickerquarter"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=quarter]"),(0,e.tZ)("p",null,t[290].value,(0,e.tZ)("code",null,t[291].value),t[292].value),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[293].value),(0,e.tZ)("th",null,t[294].value),(0,e.tZ)("th",null,t[295].value),(0,e.tZ)("th",null,t[296].value),(0,e.tZ)("th",null,t[297].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[298].value),(0,e.tZ)("td",null,t[299].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[300].value)),(0,e.tZ)("td",null,t[301].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[302].value),(0,e.tZ)("td",null,t[303].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[304].value)),(0,e.tZ)("td",null,t[305].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[306].value),(0,e.tZ)("td",null,t[307].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[308].value)),(0,e.tZ)("td",null,t[309].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[310].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[311].value),(0,e.tZ)("td",null,t[312].value),(0,e.tZ)("td",null,t[313].value),(0,e.tZ)("td",null,t[314].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[315].value),(0,e.tZ)("td",null,t[316].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[317].value)),(0,e.tZ)("td",null,t[318].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[319].value),(0,e.tZ)("td",null,t[320].value),(0,e.tZ)("td",null,t[321].value),(0,e.tZ)("td",null,t[322].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickermonth"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickermonth"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=month]"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[323].value),(0,e.tZ)("th",null,t[324].value),(0,e.tZ)("th",null,t[325].value),(0,e.tZ)("th",null,t[326].value),(0,e.tZ)("th",null,t[327].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[328].value),(0,e.tZ)("td",null,t[329].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[330].value)),(0,e.tZ)("td",null,t[331].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[332].value),(0,e.tZ)("td",null,t[333].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[334].value)),(0,e.tZ)("td",null,t[335].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[336].value),(0,e.tZ)("td",null,t[337].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[338].value)),(0,e.tZ)("td",null,t[339].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[340].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[341].value),(0,e.tZ)("td",null,t[342].value),(0,e.tZ)("td",null,t[343].value),(0,e.tZ)("td",null,t[344].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[345].value),(0,e.tZ)("td",null,t[346].value),(0,e.tZ)("td",null,t[347].value),(0,e.tZ)("td",null,t[348].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[349].value),(0,e.tZ)("td",null,t[350].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[351].value)),(0,e.tZ)("td",null,t[352].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[353].value),(0,e.tZ)("td",null,t[354].value),(0,e.tZ)("td",null,t[355].value),(0,e.tZ)("td",null,t[356].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"datepickerpickerweek"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#datepickerpickerweek"},(0,e.tZ)("span",{className:"icon icon-link"})),"DatePicker[picker=week]"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[357].value),(0,e.tZ)("th",null,t[358].value),(0,e.tZ)("th",null,t[359].value),(0,e.tZ)("th",null,t[360].value),(0,e.tZ)("th",null,t[361].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[362].value),(0,e.tZ)("td",null,t[363].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[364].value)),(0,e.tZ)("td",null,t[365].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[366].value),(0,e.tZ)("td",null,t[367].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[368].value)),(0,e.tZ)("td",null,t[369].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[370].value),(0,e.tZ)("td",null,t[371].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[372].value)),(0,e.tZ)("td",null,t[373].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[374].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[375].value),(0,e.tZ)("td",null,t[376].value),(0,e.tZ)("td",null,t[377].value),(0,e.tZ)("td",null,t[378].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[379].value),(0,e.tZ)("td",null,t[380].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[381].value)),(0,e.tZ)("td",null,t[382].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[383].value),(0,e.tZ)("td",null,t[384].value),(0,e.tZ)("td",null,t[385].value),(0,e.tZ)("td",null,t[386].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"rangepicker"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rangepicker"},(0,e.tZ)("span",{className:"icon icon-link"})),"RangePicker"),(0,e.tZ)(a.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[387].value),(0,e.tZ)("th",null,t[388].value),(0,e.tZ)("th",null,t[389].value),(0,e.tZ)("th",null,t[390].value),(0,e.tZ)("th",null,t[391].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[392].value),(0,e.tZ)("td",null,t[393].value),(0,e.tZ)("td",null,t[394].value),(0,e.tZ)("td",null,t[395].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[396].value),(0,e.tZ)("td",null,t[397].value,(0,e.tZ)("code",null,t[398].value),t[399].value),(0,e.tZ)("td",null,t[400].value,(0,e.tZ)("code",null,t[401].value),t[402].value,(0,e.tZ)("code",null,t[403].value),t[404].value),(0,e.tZ)("td",null,t[405].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[406].value),(0,e.tZ)("td",null,t[407].value),(0,e.tZ)("td",null,t[408].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[409].value),t[410].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[411].value),t[412].value),(0,e.tZ)("td",null,t[413].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[414].value),(0,e.tZ)("td",null,t[415].value),(0,e.tZ)("td",null,t[416].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[417].value),t[418].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[419].value),t[420].value),(0,e.tZ)("td",null,t[421].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[422].value),(0,e.tZ)("td",null,t[423].value),(0,e.tZ)("td",null,t[424].value),(0,e.tZ)("td",null,t[425].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[426].value),(0,e.tZ)("td",null,t[427].value),(0,e.tZ)("td",null,t[428].value,(0,e.tZ)("code",null,t[429].value),t[430].value,(0,e.tZ)("code",null,t[431].value),t[432].value),(0,e.tZ)("td",null,t[433].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[434].value),(0,e.tZ)("td",null,t[435].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[436].value),t[437].value),(0,e.tZ)("td",null,t[438].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[439].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[440].value),(0,e.tZ)("td",null,t[441].value),(0,e.tZ)("td",null,t[442].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[443].value),t[444].value),(0,e.tZ)("td",null,t[445].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[446].value),(0,e.tZ)("td",null,t[447].value),(0,e.tZ)("td",null,t[448].value),(0,e.tZ)("td",null,t[449].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[450].value),(0,e.tZ)("td",null,t[451].value),(0,e.tZ)("td",null,t[452].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[453].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[454].value),(0,e.tZ)("td",null,t[455].value),(0,e.tZ)("td",null,t[456].value),(0,e.tZ)("td",null,(0,e.tZ)(n.rU,{to:"/components/time-picker/#API"},t[457].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[458].value),(0,e.tZ)("td",null,t[459].value,(0,e.tZ)(n.rU,{to:"#components-date-picker-demo-disabled-date"},t[460].value)),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://day.js.org/"},t[461].value),t[462].value),(0,e.tZ)("td",null,t[463].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[464].value),(0,e.tZ)("td",null,t[465].value),(0,e.tZ)("td",null,t[466].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[467].value),t[468].value,(0,e.tZ)("a",{href:"https://day.js.org/"},t[469].value),t[470].value),(0,e.tZ)("td",null,t[471].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[472].value),(0,e.tZ)("td",null,t[473].value,(0,e.tZ)("code",null,t[474].value),t[475].value),(0,e.tZ)("td",null,t[476].value,(0,e.tZ)("code",null,t[477].value),t[478].value,(0,e.tZ)("code",null,t[479].value),t[480].value),(0,e.tZ)("td",null,t[481].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[482].value),(0,e.tZ)("td",null,t[483].value),(0,e.tZ)("td",null,t[484].value),(0,e.tZ)("td",null,t[485].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h2",{id:"faq"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,e.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,e.tZ)("h3",{id:"when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore"},(0,e.tZ)("span",{className:"icon icon-link"})),"When set mode to DatePicker/RangePicker, cannot select year or month anymore?"),(0,e.tZ)("p",null,t[486].value,(0,e.tZ)(n.rU,{to:"/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?"},t[487].value)),(0,e.tZ)("h3",{id:"how-to-use-datepicker-with-customize-date-library-like-dayjs"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-use-datepicker-with-customize-date-library-like-dayjs"},(0,e.tZ)("span",{className:"icon icon-link"})),"How to use DatePicker with customize date library like dayjs?"),(0,e.tZ)("p",null,t[488].value,(0,e.tZ)(n.rU,{to:"/docs/react/use-custom-date-library#DatePicker"},t[489].value)),(0,e.tZ)("h3",{id:"why-config-dayjslocale-globally-not-work"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-config-dayjslocale-globally-not-work"},(0,e.tZ)("span",{className:"icon icon-link"})),"Why config dayjs.locale globally not work?"),(0,e.tZ)("p",null,t[490].value,(0,e.tZ)("code",null,t[491].value),t[492].value,(0,e.tZ)("code",null,t[493].value),t[494].value,(0,e.tZ)("code",null,t[495].value),t[496].value,(0,e.tZ)(n.rU,{to:"/components/config-provider"},t[497].value,(0,e.tZ)("code",null,t[498].value)),t[499].value),(0,e.tZ)("h4",{id:"date-related-components-locale-is-not-working"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#date-related-components-locale-is-not-working"},(0,e.tZ)("span",{className:"icon icon-link"})),"Date-related components locale is not working?"),(0,e.tZ)("p",null,t[500].value,(0,e.tZ)(n.rU,{to:"/docs/react/faq#Date-related-components-locale-is-not-working?"},t[501].value)),(0,e.tZ)("h3",{id:"how-to-modify-start-day-of-week"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-modify-start-day-of-week"},(0,e.tZ)("span",{className:"icon icon-link"})),"How to modify start day of week?"),(0,e.tZ)("p",null,t[502].value,(0,e.tZ)(n.rU,{to:"/docs/react/i18n"},t[503].value),t[504].value,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/5605"},t[505].value),t[506].value,(0,e.tZ)("code",null,t[507].value),t[508].value),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[509].value,(0,e.tZ)("a",{href:"https://codesandbox.io/s/dayjs-day-of-week-x9tuj2?file=/demo.tsx"},t[510].value))),(0,e.tZ)(u.Z,{lang:"js"},t[511].value),(0,e.tZ)("h3",{id:"why-origin-panel-dont-switch-when-using-panelrender"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-origin-panel-dont-switch-when-using-panelrender"},(0,e.tZ)("span",{className:"icon icon-link"})),"Why origin panel don't switch when using ",(0,e.tZ)("code",null,t[512].value),"?"),(0,e.tZ)("p",null,t[513].value,(0,e.tZ)("code",null,t[514].value),t[515].value,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/27263"},t[516].value),t[517].value))))}d.default=i}}]);
