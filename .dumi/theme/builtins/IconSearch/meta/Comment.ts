import { ellipsis } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...ellipsis, 'feedback', 'discussion', 'reply', 'opinion', 'note'],
  category: 'other',
} as const satisfies IconMetaSchema;
