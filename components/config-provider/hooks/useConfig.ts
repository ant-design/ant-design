import { useContext } from 'react';
import DisabledContext from '../DisabledContext';
import SizeContext from '../SizeContext';

function useConfig() {
  const componentDisabled = useContext(DisabledContext);
  const componentSize = useContext(SizeContext);

  return {
    componentDisabled,
    componentSize,
  };
}

export default useConfig;
