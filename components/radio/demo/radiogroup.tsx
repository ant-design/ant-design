import React, { useState } from 'react';
import {
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Flex, Radio } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      options={[
        {
          value: 1,
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <LineChartOutlined style={{ fontSize: 18 }} />
              LineChart
            </Flex>
          ),
        },
        {
          value: 2,
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <DotChartOutlined style={{ fontSize: 18 }} />
              DotChart
            </Flex>
          ),
        },
        {
          value: 3,
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <BarChartOutlined style={{ fontSize: 18 }} />
              BarChart
            </Flex>
          ),
        },
        {
          value: 4,
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <PieChartOutlined style={{ fontSize: 18 }} />
              PieChart
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default App;
