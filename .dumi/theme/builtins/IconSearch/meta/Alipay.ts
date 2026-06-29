import { financial } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...financial],
  category: 'logo',
} as const satisfies IconMetaSchema;
