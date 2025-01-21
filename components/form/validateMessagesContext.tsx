import { createContext } from 'react';
import type { ValidateMessages } from '@rc-component/form/lib/interface';

// ZombieJ: We export single file here since
// ConfigProvider use this which will make loop deps
// to import whole `rc-component/form`
export default createContext<ValidateMessages | undefined>(undefined);
