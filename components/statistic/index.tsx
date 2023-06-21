import type { CountdownProps } from './Countdown';
import Countdown from './Countdown';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';

export type { StatisticProps, CountdownProps };

type CompoundedComponent = {
  Countdown: typeof Countdown;
};

export type CompoundedStatistic = typeof Statistic & CompoundedComponent;

(Statistic as CompoundedStatistic).Countdown = Countdown;

export default Statistic as CompoundedStatistic;
