import { useId } from 'react';

const useEmptyId = () => '';

const useThemeKey = typeof useId === 'undefined' ? useEmptyId : useId;

export default useThemeKey;
