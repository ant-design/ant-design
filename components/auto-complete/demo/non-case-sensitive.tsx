import React from 'react';
import { AutoComplete } from 'antd';

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const App: React.FC = () => (
  <AutoComplete
		className="w-25 h-4 rounde-md shasow-sm shadow-[#c0c0c0] hover:shasow-[#ccc]"
    style={{ width: 200 }}
    options={options}
    placeholder="try to type `b`"
    filterOption={(inputValue, option) =>
      option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);

export default App;
