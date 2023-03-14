import React, { useState } from 'react';
import { Switch, Typography, Modal } from 'antd';

const { Paragraph } = Typography;

const App: React.FC = () => {
  const [expandable, setExpandable] = useState<boolean>(false);
  const content ='Ant Design, a design language for background applications, is refined by Ant UED Team.'.repeat(5);
  return (
    <>
      <Switch
        checked={expandable}
        checkedChildren="expand"
        unCheckedChildren="notExpand"
        onChange={() => {
          setExpandable(!expandable);
        }}
      />
      <Paragraph
        ellipsis={{
          rows: 2,
          expandable,
          symbol: 'more',
          onExpand: (_event) => {
            Modal.info({
              title: 'this is my custom onExpand',
              content: `The Paragraph ${expandable ? 'can' : "can't"} expand.`,
            });
          },
        }}
      >
        {content}
      </Paragraph>
    </>
  );
};

export default App;
