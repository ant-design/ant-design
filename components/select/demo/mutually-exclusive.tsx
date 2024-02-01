import React from 'react';
import { Flex, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';

const allOptions: DefaultOptionType[] = [
  { value: 'Ava Swift', label: <span>Ava Swift</span> },
  { value: 'Cole Reed', label: <span>Cole Reed</span> },
  { value: 'Mia Blake', label: <span>Mia Blake</span> },
  { value: 'Jake Stone', label: <span>Jake Stone</span> },
  { value: 'Lily Lane', label: <span>Lily Lane</span> },
  { value: 'Ryan Chase', label: <span>Ryan Chase</span> },
  { value: 'Zoe Fox', label: <span>Zoe Fox</span> },
  { value: 'Alex Grey', label: <span>Alex Grey</span> },
  { value: 'Elle Blair', label: <span>Elle Blair</span> },
];

const useMappedOptions = (options: DefaultOptionType[], disabledValuesSet: (string | number)[][]) =>
  React.useMemo<DefaultOptionType[]>(
    () =>
      options.map((option) => ({
        ...option,
        disabled: disabledValuesSet.some((values) => option.value && values.includes(option.value)),
      })),
    [options, ...disabledValuesSet],
  );

const App: React.FC = () => {
  const [teacherValue, setTeacherValue] = React.useState<(string | number)[]>([]);
  const [trainerValue, setTrainerValue] = React.useState<(string | number)[]>([]);
  const [classmateValue, setClassmateValue] = React.useState<(string | number)[]>([]);

  const teacherOptions = useMappedOptions(allOptions, [trainerValue, classmateValue]);
  const trainerOptions = useMappedOptions(allOptions, [teacherValue, classmateValue]);
  const classmateOptions = useMappedOptions(allOptions, [teacherValue, trainerValue]);

  return (
    <Flex gap="middle" vertical>
      <Select
        mode="multiple"
        placeholder="Please select teache"
        style={{ width: '100%' }}
        value={teacherValue}
        onChange={setTeacherValue}
        options={teacherOptions}
      />
      <Select
        mode="multiple"
        placeholder="Please select trainer"
        style={{ width: '100%' }}
        value={trainerValue}
        onChange={setTrainerValue}
        options={trainerOptions}
      />
      <Select
        mode="multiple"
        placeholder="Please select classmate"
        style={{ width: '100%' }}
        value={classmateValue}
        onChange={setClassmateValue}
        options={classmateOptions}
      />
    </Flex>
  );
};

export default App;
