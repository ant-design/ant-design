import React, { useState } from 'react';
import { Segmented } from 'antd';

enum Options {
  Map = 'Map',
  Transit = 'Transit',
  Satellite = 'Satellite',
}

const Demo: React.FC = () => {
  const [value, setValue] = useState(Options.Map);

  return <Segmented options={Object.values(Options)} value={value} onChange={setValue} />;
};

export default Demo;
