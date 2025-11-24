import { financial } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...financial, 'ledger'],
  category: 'other',
} as const satisfies IconMetaSchema;
