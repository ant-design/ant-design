export interface PrimaryPalettes {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
}

export interface SuccessPalettes {
  1: string;
  3: string;
  6: string;
}

export interface WarningPalettes {
  1: string;
  3: string;
  6: string;
}
export interface ErrorPalettes {
  1: string;
  3: string;
  6: string;
}

export interface TextAlphaPalettes {
  85: string;
  75: string;
  65: string;
  45: string;
  30: string;
  25: string;
  // FIXME: 只有 Popover 用了
  'light-75'?: string;

  // 从 12 往下基本上就是偏背景和装饰性元素了
  12: string;
  // 另外一种 hover 色 或者禁用的背景色
  8: string;
  // 不透明度叠加色或文本色强化
  4: string;
  // 文本 hover 色
  3: string;
}
export interface BgPalettes {
  // 作为比较重的描边或者填充内容
  26: string;
  // 表达 选中态，或者作为弱一级的实色 border
  19: string;
  // 用于表达选中态或用于与区分 component 区分
  15: string;
  // 8 是卡片容器底色
  8: string;
  // Container 类型
  // 12 是 elevated 模式
  12: string;
  // 0 是 base 模式
  0: string;
  // FIXME: 亮色需要额外增加的色彩序列
  'light-12'?: string;
  'light-2'?: string;
  'light-10'?: string;
}
