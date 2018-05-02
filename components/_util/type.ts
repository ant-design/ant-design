// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
