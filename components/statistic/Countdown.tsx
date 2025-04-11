import * as React from 'react';

import { devUseWarning } from '../_util/warning';
import type { StatisticProps } from './Statistic';
import type { valueType } from './utils';
import StatisticTimer from './Timer';

export interface CountdownProps extends StatisticProps {
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: valueType) => void;
}

const Countdown: React.FC<CountdownProps> = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Countdown');

    warning.deprecated(
      true,
      'Statistic.Countdown',
      'Statistic.Timer type="countdown"',
      'When using version >= 5.25.0, Please use Statistic.Timer instead',
    );
  }
  return <StatisticTimer type="countdown" {...props} />;
};

export default React.memo(Countdown);
