import React from 'react';
import { TimePicker } from 'antd';

import { PickerSemanticTemplate } from '../../date-picker/demo/_semantic';

const App: React.FC = () => {
  return (
    <PickerSemanticTemplate
      singleComponent={['TimePicker', TimePicker]}
      multipleComponent={['TimePicker.RangePicker', TimePicker.RangePicker]}
      ignoreSemantics={['popup.header', 'popup.body']}
    />
  );
};

export default App;
