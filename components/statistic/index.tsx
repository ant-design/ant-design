import type { StatisticTimerProps } from './Timer';
import Timer from './Timer';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';

export type { StatisticTimerProps, StatisticProps };

type CompoundedComponent = {
  Timer: typeof Timer;
};

export type CompoundedStatistic = typeof Statistic & CompoundedComponent;

(Statistic as CompoundedStatistic).Timer = Timer;

export default Statistic as CompoundedStatistic;
