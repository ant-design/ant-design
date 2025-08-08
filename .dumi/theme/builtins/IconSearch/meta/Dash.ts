import { ellipsis } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...ellipsis],
  category: 'editor',
} as const satisfies IconMetaSchema;
