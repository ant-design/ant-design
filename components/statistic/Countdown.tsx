import * as React from 'react';

import { devUseWarning } from '../_util/warning';
import type { StatisticProps } from './Statistic';
import StatisticTimer from './Timer';
import type { valueType } from './utils';

export interface CountdownProps extends StatisticProps {
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: valueType) => void;
}

const Countdown: React.FC<CountdownProps> = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Countdown');
    warning.deprecated(false, '<Statistic.Countdown />', '<Statistic.Timer type="countdown" />');
  }
  return <StatisticTimer {...props} type="countdown" />;
};

export default React.memo(Countdown);
