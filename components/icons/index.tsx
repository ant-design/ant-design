import * as React from 'react';
import Icon from '@ant-design/icons';

import formCalendarIconSrc from './formCalendar.svg';
import formDropdownIconSrc from './formDropdown.svg';

export const FormDropdownIcon = () => (props: any) => (
  <Icon {...props} component={() => <img src={formDropdownIconSrc} alt="" />} />
);
export const FormCalendarIcon = (props: any) => (
  <Icon {...props} component={() => <img src={formCalendarIconSrc} alt="" />} />
);
