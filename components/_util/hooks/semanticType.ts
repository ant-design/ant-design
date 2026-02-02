type RemoveString<T> = T extends string ? never : T;
export type RemoveClassNamesString<T> = {
  [K in keyof T]: string | Record<string, any> extends T[K] ? RemoveString<T[K]> : T[K];
};

export type DeepClassNameType<T> = {
  [K in keyof T]?: string extends T[K] ? string | DeepClassNameType<T[K]> : DeepClassNameType<T[K]>;
};
type CSS = React.CSSProperties;
export type DeepStylesType<T> = {
  [K in keyof T]?: CSS extends T[K] ? CSS : DeepStylesType<T[K]>;
};
// export type demo = DeepStylesType<{ a: CSS; popup: { root: CSS } }>;
// export type demo1 = NonNullable<demo['a']>['color'];
// export type demo3 = NonNullable<demo['popup']>['root'];
// export const ddd2: NonNullable<demo['popup']> = { root: { color: 'red' } };

export type GenerateSemantic<T extends { classNames?: any; styles?: any }, Props> = {
  classNames: DeepClassNameType<T['classNames']>;
  classNamesFn: (info: { props: Props }) => DeepClassNameType<T['classNames']>;
  classNamesNoString: RemoveClassNamesString<DeepClassNameType<T['classNames']>>;
  styles: DeepStylesType<T['styles']>;
  stylesFn: (info: { props: Props }) => DeepStylesType<T['styles']>;
};
