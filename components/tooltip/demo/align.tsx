import React from 'react';
import { InputNumber, Tag, Tooltip } from 'antd';

const App: React.FC = () => {
  const [offsetX, setOffsetX] = React.useState<number | undefined>(10);
  const [offsetY, setOffsetY] = React.useState<number | undefined>(20);

  const onOffsetXChange = React.useCallback((v: number) => {
    setOffsetX(v);
  }, []);

  const onOffsetYChange = React.useCallback((v: number) => {
    setOffsetY(v);
  }, []);

  const offset = React.useMemo(() => [offsetX || 0, offsetY || 0], [offsetX, offsetY]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{ paddingRight: 10 }}>
          <span style={{ paddingRight: 10 }}>offsetX:</span>
          <InputNumber step={1} defaultValue={offsetX} value={offsetX} onChange={onOffsetXChange} />
        </span>
        <span>
          <span style={{ paddingRight: 10 }}>offsetY:</span>
          <InputNumber step={1} defaultValue={offsetY} value={offsetY} onChange={onOffsetYChange} />
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Tooltip title="default content" placement="bottom">
          <Tag color="success">default</Tag>
        </Tooltip>
        <Tooltip
          title="offset content"
          placement="bottom"
          align={{
            offset,
          }}
        >
          <Tag color="success">align.offset</Tag>
        </Tooltip>
        <Tooltip
          title="builtinPlacements content"
          placement="bottom"
          builtinPlacements={{
            bottom: {
              points: ['tc', 'bc'],
              overflow: {
                shiftX: 50,
                adjustY: true,
              },
              offset,
              _experimental: {
                dynamicInset: true,
              },
            },
          }}
        >
          <Tag color="success">builtinPlacements</Tag>
        </Tooltip>
      </div>
    </div>
  );
};

export default App;
