import { createContext } from 'react';
import type { ValidateMessages } from 'rc-field-form/lib/interface';

// ZombieJ: We export single file here since
// ConfigProvider use this which will make loop deps
// to import whole `rc-field-form`
export default createContext<ValidateMessages | undefined>(undefined);
