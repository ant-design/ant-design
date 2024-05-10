import React, { useState } from 'react';
import { Segmented, Space } from 'antd';

enum LogicalOperator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

const Demo: React.FC = () => {
  const [foo, setFoo] = useState<LogicalOperator>(LogicalOperator.AND);

  return (
    <Space direction="vertical">
      <Segmented value={foo} options={Object.values(LogicalOperator)} onChange={setFoo} />
      <Segmented value={foo} options={['AND', 'OR', 'NOT'] as any} onChange={setFoo} />
    </Space>
  );
};

export default Demo;
