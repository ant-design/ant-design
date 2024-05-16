import React from 'react';
import { Space, Spin, Switch } from 'antd';

const App: React.FC = () => {
  const [auto, setAuto] = React.useState(false);
  const [percent, setPercent] = React.useState(-50);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [percent]);

  const mergedPercent = auto ? 'auto' : percent;

  return (
    <Space>
      <Switch
        checkedChildren="Auto"
        unCheckedChildren="Auto"
        checked={auto}
        onChange={() => {
          setAuto(!auto);
          setPercent(-50);
        }}
      />
      <Spin percent={mergedPercent} size="small" />
      <Spin percent={mergedPercent} />
      <Spin percent={mergedPercent} size="large" />
    </Space>
  );
};

export default App;
