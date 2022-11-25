import { css } from '@emotion/react';
import useSiteToken from '../../../hooks/useSiteToken';

const useSharedStyle = () => {
  const { token } = useSiteToken();

  return {
    headerButton: css`
      color: ${token.colorText};
      border-color: ${token.colorBorder};
    `,
  };
};

export default useSharedStyle;
