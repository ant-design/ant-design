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
 * @deprecated Countdown 已被废弃，请使用 Statistic.Timer 替代。
 */
const Countdown: React.FC<CountdownProps> = (props) => {
  return <StatisticTimer type="countdown" {...props} />;
};

export default React.memo(Countdown);
