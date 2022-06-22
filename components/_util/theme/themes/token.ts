import type { DeepPartial } from 'utility-types';
import type { GlobalToken, OverrideToken } from '../interface';
import type {
  BgPalettes,
  ErrorPalettes,
  PrimaryPalettes,
  SuccessPalettes,
  TextAlphaPalettes,
  WarningPalettes,
} from './IPalettes';

interface PaletteSheets {
  primaryPalettes: PrimaryPalettes;
  successPalettes: SuccessPalettes;
  errorPalettes: ErrorPalettes;
  warningPalettes: WarningPalettes;
  textAlphaPalettes: TextAlphaPalettes;
  bgPalettes: BgPalettes;
}

// 全局 Alias Token
const genAliasToken = ({
  primaryPalettes,
  successPalettes,
  errorPalettes,
  warningPalettes,
  textAlphaPalettes,
  bgPalettes,
}: PaletteSheets): Partial<GlobalToken> => ({
  // ============== 基础公用  ============== //

  colorPrimary: primaryPalettes['6'],
  colorPrimaryHover: primaryPalettes['5'],
  colorPrimaryActive: primaryPalettes['7'],
  // TODO: 建议改名为 colorPrimaryBorder
  colorPrimarySecondary: primaryPalettes['3'],
  colorPrimaryBorderHover: primaryPalettes['4'],

  colorBgSuccess: successPalettes['1'],
  colorSuccess: successPalettes['6'],
  colorSuccessSecondary: successPalettes['3'],

  colorBgError: errorPalettes['1'],
  colorError: errorPalettes['6'],
  colorErrorSecondary: errorPalettes['3'],

  colorBgWarning: warningPalettes['1'],
  colorWarning: warningPalettes['6'],
  colorWarningSecondary: warningPalettes['3'],

  colorInfo: primaryPalettes['6'],
  colorBgInfo: primaryPalettes['1'],
  colorInfoSecondary: primaryPalettes['3'],

  colorLink: primaryPalettes['6'],
  colorLinkHover: primaryPalettes['5'],
  colorLinkActive: primaryPalettes['7'],

  // TODO： `命名不对，这个用在 Button 的阴影上 干点
  // 且亮色模式用值也不对，应该是不透明度的用法
  colorDefaultOutline: textAlphaPalettes['4'],
  // ============== 背景  ============== //
  colorBg: bgPalettes['0'],

  colorBgContainer: bgPalettes['0'],
  // 这个 token 是 浮窗等组件的背景色 token
  colorBgElevated: bgPalettes['12'],

  colorBgComponent: bgPalettes['8'],
  // TODO：Menu 用了这个 感觉命名有问题
  // TODO：能不能用透明色？用透明色会造成重叠后变亮的问题，是不是得用实色？
  colorBgComponentSecondary: textAlphaPalettes['4'],
  colorBgComponentDisabled: textAlphaPalettes['8'],
  // TODO： Slider 和 Progress 需要一个名字
  colorBgComponentTmp: bgPalettes['15'],
  // TODO: 只有 Slider 用了，感觉命名有问题
  colorBgContainerSecondary: bgPalettes['26'],

  // ============== 分割线  ============== //
  colorBorder: bgPalettes['26'],
  // TODO：Secondary 在纯实色背景下的颜色和 Split 是一样的
  colorBorderSecondary: bgPalettes['19'],
  colorSplit: textAlphaPalettes['12'],

  // ============== 文本  ============== //
  colorText: textAlphaPalettes['85'],
  colorTextHeading: textAlphaPalettes['85'],
  colorTextSecondary: textAlphaPalettes['45'],
  //  @disabled-color -> colorTextDisabled
  // TODO: 这个 30 估计要改成 25
  colorTextDisabled: textAlphaPalettes['30'],
  colorTextPlaceholder: textAlphaPalettes['25'],

  // TODO： 确认 Action的色彩关系
  colorActionTmp: textAlphaPalettes['30'],
  colorAction: textAlphaPalettes['45'],
  // @icon-color-hover -> colorActionHover
  // 用在 draw、modal 的按钮 hover 色
  colorActionHover: textAlphaPalettes['75'],

  // ============== Control Token  ============== //
  // TODO: 确认下 hover 是用 Alpha 还是实色
  // 暂时确认下来应该用 alpha
  controlItemBgHover: textAlphaPalettes['8'],

  controlItemBgActive: primaryPalettes['1'],
  controlItemBgActiveDisabled: textAlphaPalettes['25'],
  // TODO: 需要在设计上确认暗色模式的交互逻辑。现在是hover以后就变暗，很怪
  controlItemBgActiveHover: primaryPalettes['0'],
});

const genComponentToken = ({
  textAlphaPalettes,
  bgPalettes,
}: Pick<PaletteSheets, 'textAlphaPalettes' | 'bgPalettes'>): DeepPartial<OverrideToken> => ({
  Button: {
    colorBgTextHover: textAlphaPalettes['3'],
    colorBgTextActive: textAlphaPalettes['4'],
  },
  // TODO: Segmented 样式逻辑设计的不统一
  Segmented: {
    bgColor: 'rgba(0,0,0,0.25)',
    bgColorHover: 'rgba(0,0,0,0.45)',
    bgColorSelected: bgPalettes['19'],
    labelColor: textAlphaPalettes['65'],
    labelColorHover: textAlphaPalettes['85'],
  },
  // TODO: Skeleton 亮色模式没有使用色板里的值
  // TODO: 用实色还是透明色？
  //  color : #f2f2f2
  //  colorGradientEnd :	  #e1e1e1
  Skeleton: {
    color: textAlphaPalettes['12'],
    colorGradientEnd: textAlphaPalettes['25'],
  },
  // TODO：整体考虑优化下禁用的效果
  // 要用 whiteAlphaPalettes['25']
  Pagination: {},
  Rate: { defaultColor: textAlphaPalettes['12'] },
  Radio: {},
  Calendar: {},
  Avatar: {
    bgColor: textAlphaPalettes['25'],
    groupBorderColor: bgPalettes['0'],
  },
  // FIXME：TimePicker 的 now 要用 antd 自己的 link

  Table: {
    // TODO: 激活样式该不该用实色？还是不透明的用法？
    headerSortActiveBgColor: bgPalettes['15'],
    headerHoverBgColor: textAlphaPalettes['12'],
  },
  Tooltip: {
    colorBgDefault: bgPalettes['26'],
  },
});

export { genAliasToken, genComponentToken };
