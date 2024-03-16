import React, { useState } from 'react';
import { Switch, Typography } from 'antd';

const App = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Switch checked={expanded} onChange={() => setExpanded((c) => !c)} />

      <Typography.Paragraph
        ellipsis={{
          rows: 2,
          expandable: true,
          expanded,
          onExpand: (_, info) => setExpanded(info.expanded),
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
