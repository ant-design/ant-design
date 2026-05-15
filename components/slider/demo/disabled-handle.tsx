import React from 'react';
import { Checkbox, Slider, Space } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = React.useState([20, 50, 80]);
  const [disabled, setDisabled] = React.useState<boolean[]>([false, false, false]);

  const handleDisabledChange = (index: number, checked: boolean) => {
    const newDisabled = [...disabled];
    newDisabled[index] = checked;
    setDisabled(newDisabled);
  };

  return (
    <>
      <Slider
        range={{
          draggableTrack: true,
          minCount: 2,
          maxCount: 5,
        }}
        value={value}
        onChange={setValue}
        disabled={disabled}
      />
      <Space>
        {value.map((_, index) => (
          <Checkbox
            key={`handle-${index}`}
            checked={disabled[index]}
            onChange={(e) => handleDisabledChange(index, e.target.checked)}
          >
            Handle {index + 1}
          </Checkbox>
        ))}
      </Space>
    </>
  );
};

export default App;
