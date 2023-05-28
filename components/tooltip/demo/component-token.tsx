import { ConfigProvider, Tooltip } from 'antd';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTooltip } = Tooltip;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Tooltip: {
          tooltipMaxWidth: 200,
          tooltipColor: '#000',
          tooltipBg: '#fff',
          tooltipBorderRadius: 20,
        },
      },
    }}
  >
    <>
      <InternalTooltip title="Hello, Pink Pure Panel!" />
      <InternalTooltip title="Hello, Customize Color Pure Panel!" />
      <InternalTooltip title="Hello, Pure Panel!" placement="bottomLeft" style={{ width: 200 }} />
    </>
  </ConfigProvider>
);
