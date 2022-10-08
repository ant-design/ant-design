import { theme } from 'antd';

const { useToken } = theme;

const useSiteToken = () => {
  const result = useToken();
  const { token } = result;
  return {
    ...result,
    token: {
      ...token,
      headerHeight: 64,
      menuItemBorder: 2,
      mobileMaxWidth: 767.99,
      siteHeaderBoxShadow: '0 2px 8px rgba(240, 241, 242, 65',
      siteMarkdownCodeBg: '#f2f4f5',
    },
  };
};

export default useSiteToken;
