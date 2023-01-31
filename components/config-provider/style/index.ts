import { useStyleRegister } from '@ant-design/cssinjs';
import { resetIcon } from '../../style';
import { useToken } from '../../theme/internal';

const useStyle = (iconPrefixCls: string) => {
  const [theme, token] = useToken();
  // Generate style for icons
  return useStyleRegister(
    { theme, token, hashId: '', path: ['ant-design-icons', iconPrefixCls] },
    () => [
      {
        [`.${iconPrefixCls}`]: {
          ...resetIcon(),
          [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
            display: 'block',
          },
        },
      },
    ],
  );
};

export default useStyle;
