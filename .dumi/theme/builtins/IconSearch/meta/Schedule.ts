import { check } from './tags';
import type { IconMetaSchema } from './tags';

export default {
  contributors: ['ant-design'],
  tags: [...check, 'time', 'clock', 'calendar'],
  category: 'other',
} as const satisfies IconMetaSchema;
