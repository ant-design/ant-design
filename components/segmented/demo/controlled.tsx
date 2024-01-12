import React, { useState } from 'react';
import { Segmented } from 'antd';

enum Options {
  Map = 'Map',
  Transit = 'Transit',
  Satellite = 'Satellite',
}

const Demo: React.FC = () => {
  const [value, setValue] = useState(Options.Map);

  return (
    <Segmented
      options={Object.values(Options)}
      value={value}
      // Why not `onChange={setValue}`? Need tsconfig.json `strict:true`
      onChange={(v) => setValue(v)}
    />
  );
};

export default Demo;
