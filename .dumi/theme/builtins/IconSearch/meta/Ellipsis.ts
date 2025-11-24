import { ellipsis } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...ellipsis],
  category: 'other',
} as const satisfies IconMetaSchema;
