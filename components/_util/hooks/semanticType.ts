type RemoveString<T> = T extends string ? never : T;
type RemoveStringKey<T, K extends keyof T> = string extends T[K]
  ? RemoveString<T[K]>
  : T[K];
export type RemoveClassNamesString<T> = { [K in keyof T]: RemoveStringKey<T, K> };

export type DeepClassNameType<T> = {
  [K in keyof T]?: T[K] extends string ? string | DeepClassNameType<T[K]> : DeepClassNameType<T[K]>;
};
export type DeepStylesType<T> = {
  [K in keyof T]?: React.CSSProperties extends T[K] ? React.CSSProperties : DeepStylesType<T[K]>;
};
export type GenerateSemantic<T extends { classNames?: any; styles?: any }, Props> = {
  classNames: DeepClassNameType<T['classNames']>;
  styles: DeepStylesType<T['styles']>;
  classNamesFn: (info: { props: Props }) => DeepClassNameType<T['classNames']>;
  stylesFn: (info: { props: Props }) => DeepStylesType<T['styles']>;
  classNamesNoString: RemoveClassNamesString<DeepClassNameType<T['classNames']>>;
};

// ------ demo type ------
// export type MenuSemanticType = {
//   classNames: {
//     root?: string;
//     popup?: string | { root?: string };
//   };
//   styles: {
//     root?: React.CSSProperties;
//     popup?: { root?: React.CSSProperties };
//   };
// };

// export type MenuClassNamesType = GenerateSemantic<MenuSemanticType, MenuProps>;
// export interface MenuProps {
//   disabled?: boolean;
//   classNames?: MenuClassNamesType['classNames'] | MenuClassNamesType['classNamesFn'];
//   styles?: MenuClassNamesType['styles'] | MenuClassNamesType['stylesFn'];
//   classNamesNoString?: MenuClassNamesType['classNamesNoString'];
// }
// export const menuConfig: MenuProps = {
//   classNames: { root: 'root-class', popup: { root: 'popup-root-class' } },
//   styles: { root: { color: 'red' }, popup: { root: { backgroundColor: 'blue' } } },
//   classNamesNoString: { popup: { root: 'popup-root-class' } },
// };
// export const menuConfig3: MenuProps = {
//   classNames: { root: 'root-class', popup: 'string' },
//   styles: { root: { color: 'red' }, popup: { root: { backgroundColor: 'blue' } } },
// };

// export const menuConfig2: MenuProps = {
//   classNames: ({ props }): MenuClassNamesType['classNames'] => ({
//     root: props ? 'a' : 'b',
//     popup: { root: 'c' },
//   }),
//   styles: ({ props }): MenuClassNamesType['styles'] => ({
//     root: { color: props ? 'pink' : 'gray' },
//     popup: { root: { backgroundColor: 'black' } },
//   }),
// };
