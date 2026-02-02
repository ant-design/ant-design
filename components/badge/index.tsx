import InternalBadge from './Badge';
import Ribbon from './Ribbon';

export type {
  BadgeClassNamesType,
  BadgeProps,
  BadgeSemanticClassNames,
  BadgeSemanticName,
  BadgeSemanticStyles,
  BadgeStylesType,
} from './Badge';

export type {
  RibbonProps,
  RibbonSemanticClassNames,
  RibbonSemanticName,
  RibbonSemanticStyles,
} from './Ribbon';

export type { ScrollNumberProps } from './ScrollNumber';

type CompoundedComponent = typeof InternalBadge & {
  Ribbon: typeof Ribbon;
};

const Badge = InternalBadge as CompoundedComponent;

Badge.Ribbon = Ribbon;

export default Badge;
