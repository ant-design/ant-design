import React from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { PickerMode } from 'rc-picker/lib/interface';

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
  if (suffixIcon === null) {
    return null;
  }

  return (
    suffixIcon ?? (
      <>
        {picker === TIME ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {hasFeedback && feedbackIcon}
      </>
    )
  );
};

export default SuffixIcon;
