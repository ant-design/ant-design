import { createContext, useContext } from 'react';

export const ProgressContext = createContext<(value: boolean) => void>(() => {});

const useProgress = () => useContext(ProgressContext);

export default useProgress;
