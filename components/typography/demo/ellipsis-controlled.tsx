import React, { useState } from 'react';
import { Switch, Typography } from 'antd';

const App = () => {
  const [expandable, setExpandable] = useState(true);

  return (
    <>
      <Switch checked={expandable} onChange={() => setExpandable((c) => !c)} />

      <Typography.Paragraph
        ellipsis={{
          rows: 2,
          expandable: true,
          // expanded: true,
          // symbol: 'aa',
          onExpand: (_, { expanded }) => {
            console.log('e', expanded);
          },
        }}
      >
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Typography.Paragraph>
    </>
  );
};

export default App;
