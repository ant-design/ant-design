// import type { DeepPartial } from 'utility-types';
// import type { OverrideToken, GlobalToken } from '../../interface';
// import {
//   textAlphaPalettes,
//   primaryPalettes,
//   errorPalettes,
//   successPalettes,
//   warningPalettes,
//   bgPalettes,
// } from './palettes';
// import { genAliasToken, genComponentToken } from '../token';
//
// // 全局 Alias Token
// const aliasToken: Partial<GlobalToken> = {
//   ...genAliasToken({
//     textAlphaPalettes,
//     primaryPalettes,
//     errorPalettes,
//     successPalettes,
//     warningPalettes,
//     bgPalettes,
//   }),
//   // FIXME: 亮暗色用的不是用同一个色板体系
//   //  暗色用的是 ['4']
//   //  亮色用的是 ['8']
//   colorDefaultOutline: textAlphaPalettes['8'],
//   // FIXME: Menu 用了
//   // 在暗色模式下用的是透明色 textAlphaPalettes['4']
//   // 再亮色模式下用的是实色
//   colorBgComponentSecondary: bgPalettes['light-2'],
//   // FIXME：需要修正这个关系
//   //  在暗色用的是 bgPalettes['26']
//   //  但亮色用的是 bgPalettes['light-12']
//   colorBgContainerSecondary: bgPalettes['light-12'],
//   // FIXME: 亮色模式和暗色模式逻辑不统一
//   //  暗色模式下 textAlphaPalettes['25']
//   //  亮色模式下 bgPalettes['light-10']
//   controlItemBgActiveDisabled: bgPalettes['light-10'],
// };
//
// const baseComponentToken = genComponentToken({
//   textAlphaPalettes,
//   bgPalettes,
// });
//
// const componentToken: DeepPartial<OverrideToken> = {
//   ...baseComponentToken,
//
//   // FIXME：Segmented 的
//   Segmented: {
//     ...baseComponentToken.Segmented,
//     bgColor: textAlphaPalettes['8'],
//     bgColorHover: textAlphaPalettes['12'],
//     bgColorSelected: bgPalettes['8'],
//   },
//   Tooltip: {
//     colorBgDefault: textAlphaPalettes['75'],
//   },
// };
//
// export { aliasToken, componentToken };
