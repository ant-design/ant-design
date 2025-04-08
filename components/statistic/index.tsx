import type { StatisticTimerProps } from './Timer';
import Timer from './Timer';
import type { CountdownProps } from './Countdown';
import Countdown from './Countdown';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';

export type { CountdownProps, StatisticTimerProps, StatisticProps };

type CompoundedComponent = {
  Countdown: typeof Countdown;
  Timer: typeof Timer;
};

export type CompoundedStatistic = typeof Statistic & CompoundedComponent;

(Statistic as CompoundedStatistic).Timer = Timer;
(Statistic as CompoundedStatistic).Countdown = Countdown;

export default Statistic as CompoundedStatistic;
