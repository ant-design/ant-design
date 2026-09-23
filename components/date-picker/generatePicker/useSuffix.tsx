import React from 'react';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import type { PickerMode } from '@rc-component/picker/interface';

import { TIME } from './constant';

interface UseSuffixProps {
  picker?: PickerMode;
  hasFeedback?: boolean;
  feedbackIcon?: React.ReactNode;
  suffix?: React.ReactNode;
}

const useSuffix = ({ picker, hasFeedback, feedbackIcon, suffix }: UseSuffixProps) => {
  if (suffix === null || suffix === false) {
    return null;
  }
  if (suffix === true || suffix === undefined) {
    return (
      <>
        {picker === TIME ? (
          <ClockCircleOutlined aria-hidden="true" />
        ) : (
          <CalendarOutlined aria-hidden="true" />
        )}
        {hasFeedback && feedbackIcon}
      </>
    );
  }

  return suffix;
};

export default useSuffix;
