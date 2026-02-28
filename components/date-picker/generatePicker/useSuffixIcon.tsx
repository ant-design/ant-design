import React from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import type { PickerMode } from '@rc-component/picker/interface';

import { TIME } from './constant';

interface UseSuffixIconProps {
  picker?: PickerMode;
  hasFeedback?: boolean;
  feedbackIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const useSuffixIcon = ({ picker, hasFeedback, feedbackIcon, suffixIcon }: UseSuffixIconProps) => {
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

export default useSuffixIcon;
