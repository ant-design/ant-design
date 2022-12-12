/**
 * https://stackoverflow.com/a/59187769 Extract the type of an element of an array without
 * performing indexing
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends U, U> = T | (U & {});
