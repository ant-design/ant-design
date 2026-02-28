import type { CountdownProps } from './Countdown';
import Countdown from './Countdown';
import type {
  StatisticProps,
  StatisticSemanticClassNames,
  StatisticSemanticName,
  StatisticSemanticStyles,
} from './Statistic';
import Statistic from './Statistic';
import type { StatisticTimerProps } from './Timer';
import Timer from './Timer';

export type {
  CountdownProps,
  StatisticProps,
  StatisticSemanticClassNames,
  StatisticSemanticName,
  StatisticSemanticStyles,
  StatisticTimerProps,
};

type CompoundedComponent = {
  /**
   * @deprecated Please use `Statistic.Timer` instead
   */
  Countdown: typeof Countdown;
  Timer: typeof Timer;
};

export type CompoundedStatistic = typeof Statistic & CompoundedComponent;

(Statistic as CompoundedStatistic).Timer = Timer;
(Statistic as CompoundedStatistic).Countdown = Countdown;

export default Statistic as CompoundedStatistic;
