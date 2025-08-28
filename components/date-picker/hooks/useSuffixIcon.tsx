import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { PickerMode } from 'rc-picker/lib/interface';
import { TIME } from '../generatePicker/constant';

export default function useSuffixIcon(
  mergedPicker?: PickerMode,
  hasFeedback?: boolean,
  feedbackIcon?: React.ReactNode,
  suffixIcon?: React.ReactNode,
) {
  return React.useMemo(() => {
    const suffixNode = (
      <>
        {mergedPicker === TIME ? <ClockCircleOutlined /> : <CalendarOutlined />}
        {hasFeedback && feedbackIcon}
      </>
    );
    if (suffixIcon === null) {
      return null;
    }
    return suffixIcon ?? suffixNode;
  }, [suffixIcon, mergedPicker, hasFeedback, feedbackIcon]);
}
