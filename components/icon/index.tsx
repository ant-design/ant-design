import BaseIcon, { IconComponent, IconProps } from './Icon';
import createFromIconfontCN from './IconFont';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
export { ThemeType, CustomIconComponentProps, IconProps, IconComponent } from './Icon';

const Icon: any = BaseIcon;
Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon as IconComponent<IconProps> & {
  createFromIconfontCN: typeof createFromIconfontCN;
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
};
