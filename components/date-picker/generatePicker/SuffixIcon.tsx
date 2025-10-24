import React from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import type { PickerMode } from 'rc-picker/lib/interface';

import { TIME } from '../generatePicker/constant';

interface SuffixIconProps {
  picker?: PickerMode;
  hasFeedback?: boolean;
  feedbackIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const SuffixIcon: React.FC<SuffixIconProps> = ({
  picker,
  hasFeedback,
  feedbackIcon,
  suffixIcon,
}) => {
  if (suffixIcon === null || suffixIcon === false) {
    return null;
  }
  if (suffixIcon === true || suffixIcon === undefined) {
    return (
      <>
        {picker === TIME ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {hasFeedback && feedbackIcon}
      </>
    );
  }

  return suffixIcon;
};

export default SuffixIcon;
