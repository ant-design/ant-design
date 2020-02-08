import { Dictionary } from '../../../_util/varnish/base';
import { animation } from './animation';
import { breakpoints } from './breakpoints';
import { button } from './button';
import { color, chartingColor, Color, RGB } from './colors';
import { link } from './link';
import { palette } from './palette';
import { shape } from './shape';
import { spacing } from './spacing';
import { typography } from './typography';
import { zIndex } from './zIndex';

// when adding more, consider what material and ant have done:
// https://material-ui.com/customization/default-theme/
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const Default = {
    animation,
    breakpoints,
    button,
    chartingColor,
    color,
    link,
    palette,
    shape,
    spacing,
    typography,
    zIndex,
}

export type VarnishTheme = typeof Default;

export const Theme: Dictionary<VarnishTheme> = {
    default: Default,
}

export { Color, RGB };
