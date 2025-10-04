import { financial } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...financial, 'safety', 'protection', 'security', 'shield'],
  category: 'other',
} as const satisfies IconMetaSchema;
