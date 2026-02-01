type RemoveString<T> = T extends string ? never : T;
type RemoveStringKey<T, K extends keyof T> = string extends T[K] ? RemoveString<T[K]> : T[K];
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
