import React from 'react';
import { Checkbox, Flex, Slider } from 'antd';

const handleOptions = [
  { key: 'start', label: 'Disabled Handle 1' },
  { key: 'middle', label: 'Disabled Handle 2' },
  { key: 'end', label: 'Disabled Handle 3' },
];

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
        range={{ draggableTrack: true, minCount: 2, maxCount: 5 }}
        value={value}
        onChange={setValue}
        disabled={disabled}
      />
      <Flex gap="small" align="center" justify="flex-start" style={{ marginTop: 16 }}>
        {handleOptions.map((handle, index) => {
          return (
            <Checkbox
              key={`item-${handle.key}`}
              checked={disabled[index]}
              onChange={(e) => handleDisabledChange(index, e.target.checked)}
            >
              {handle.label}
            </Checkbox>
          );
        })}
      </Flex>
    </>
  );
};

export default App;
