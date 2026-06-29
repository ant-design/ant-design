import { check } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...check],
  category: 'suggestion',
} as const satisfies IconMetaSchema;
