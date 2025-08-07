import { check } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...check, 'protection', 'security', 'shield', 'safety', 'privacy'],
  category: 'other',
} as const satisfies IconMetaSchema;
