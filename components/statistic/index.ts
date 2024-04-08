import Countdown, { type CountdownProps } from './Countdown';
import Statistic, { type StatisticProps } from './Statistic';

export type { CountdownProps, StatisticProps };

type CompoundedComponent = {
  Countdown: typeof Countdown;
};

export type CompoundedStatistic = typeof Statistic & CompoundedComponent;

(Statistic as CompoundedStatistic).Countdown = Countdown;

export default Statistic as CompoundedStatistic;
