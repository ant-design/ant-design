import React from 'react';
import { Tooltip } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTooltip } = Tooltip;

const App: React.FC = () => (
  <>
    <InternalTooltip title="Hello, Pink Pure Panel!" color="pink" />
    <InternalTooltip title="Hello, Customize Color Pure Panel!" color="#f50" />
    <InternalTooltip title="Hello, Pure Panel!" placement="bottomLeft" style={{ width: 200 }} />
  </>
);

export default App;
