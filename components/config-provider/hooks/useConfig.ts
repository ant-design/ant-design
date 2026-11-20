import { useContext } from 'react';

import { SpaceCompactItemContext } from '../../space/context';
import DisabledContext from '../DisabledContext';
import SizeContext from '../SizeContext';

function useConfig() {
  const componentDisabled = useContext(DisabledContext);
  const componentSize = useContext(SizeContext);
  const compactItemContext = useContext(SpaceCompactItemContext);

  return {
    componentDisabled,
    componentSize: compactItemContext?.compactSize ?? componentSize,
  };
}

export default useConfig;
