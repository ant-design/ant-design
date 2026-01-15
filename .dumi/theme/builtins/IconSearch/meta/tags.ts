import type { CategoriesKeys } from '../fields';

export type IconMetaSchema = Readonly<{
  contributors: string[];
  tags: readonly string[];
  category: CategoriesKeys;
}>;

export const check = [
  'check',
  'done',
  'todo',
  'tick',
  'complete',
  'finish',
  'task',

  'ok',
  'success',
  'confirm',
  'approve',
  'agree',
  'validation',

  '√',
  '✔',
  '✓',
  '勾',
  '对',
  '正确',
  'right',
] as const;

export const financial = [
  'monetization',
  'marketing',
  'currency',
  'money',
  'payment',
  'finance',
  'cash',
  'bank',
  'transaction',
  'balance',
  'expense',
  'income',
  'budget',
  'investment',
  'savings',
  'profit',
  'cost',
  'wealth',
  'economy',
  'wallet',
  'exchange',
] as const;

export const ellipsis = [
  '...',
  '。。。',
  '…',
  'more',
  '更多',
  'dots',
  'ellipsis',
  'expand',
  'collapse',
  'menu',
  'dropdown',
  'options',
  'settings',
  'et cetera',
  'etc',
  'loader',
  'loading',
  'progress',
  'pending',
  'throbber',
  'spinner',
  'operator',
  'code',
  'spread',
  'rest',
  'further',
  'extra',
  'overflow',
] as const;
