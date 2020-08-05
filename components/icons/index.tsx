import * as React from 'react';
import Icon from '@ant-design/icons';

import formCalendarIconSrc from './formCalendar.svg';
import formDropdownIconSrc from './formDropdown.svg';

export const FormDropdownIcon = (props: {className?: string}) => {
  return (
    <Icon
      className={`no-pointer-events .icons-form-dropdown ${props.className}`}
      component={() => <img src={formDropdownIconSrc} alt="" />}
    />
  );
};
export const FormCalendarIcon = (props: {className?: string}) => {
  return (
    <Icon
      className={`no-pointer-events .icons-form-calendar ${props.className}`}
      component={() => <img src={formCalendarIconSrc} alt="" />}
    />
  );
};

export default {
  FormDropdownIcon,
  FormCalendarIcon,
};
