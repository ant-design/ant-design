import * as React from 'react';

import type { StatisticProps } from './Statistic';
import type { valueType } from './utils';
import StatisticTimer from './Timer';

export interface CountdownProps extends StatisticProps {
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: valueType) => void;
}

/**
 * @deprecated Please use `Statistic.Timer` instead
 */
const Countdown: React.FC<CountdownProps> = (props) => {
  return <StatisticTimer type="countdown" {...props} />;
};

export default React.memo(Countdown);
