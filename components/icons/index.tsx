import * as React from 'react';
import Icon from '@ant-design/icons';

import formCalendarIconSrc from './formCalendar.svg';
import formDropdownIconSrc from './formDropdown.svg';

export const FormDropdownIcon = () => {
  return (
    <Icon
      className="no-pointer-events"
      component={() => <img src={formDropdownIconSrc} alt="" />}
    />
  );
};
export const FormCalendarIcon = () => {
  return (
    <Icon
      className="no-pointer-events"
      component={() => <img src={formCalendarIconSrc} alt="" />}
    />
  );
};

export default {
  FormDropdownIcon,
  FormCalendarIcon,
};
