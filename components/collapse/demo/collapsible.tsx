import React from 'react';
import { Collapse, Space } from 'antd';
import { createStyles } from 'antd-style';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const useStyles = createStyles((props) => {
  const { css } = props;
  return {
    content: css`
      width: 100%;
    `,
  };
});

const App: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Space className={styles.content} vertical>
      <Collapse
        collapsible="header"
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: 'This panel can be collapsed by clicking text or icon',
            children: <p>{text}</p>,
          },
        ]}
      />
      <Collapse
        collapsible="icon"
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: 'This panel can only be collapsed by clicking icon',
            children: <p>{text}</p>,
          },
        ]}
      />
      <Collapse
        collapsible="disabled"
        items={[
          {
            key: '1',
            label: "This panel can't be collapsed",
            children: <p>{text}</p>,
          },
        ]}
      />
    </Space>
  );
};

export default App;
