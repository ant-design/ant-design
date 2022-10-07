import React, { type FC } from 'react';
import { useLocale, useNavData, useSiteData } from 'dumi';

const Header: FC = () => {
  // TODO: implement header
  // from: https://github.com/ant-design/ant-design/blob/7846d69bbf7ded0c46fd90041470bb16303145e9/site/theme/template/Layout/Header/index.tsx
  //  1. Navbar
  //  2. Search bar
  //  3. GitHub link
  //  4. RTL button
  //  5. Language switch

  console.log('conventional navbar data', useNavData());
  console.log('locale config', useSiteData().locales);
  console.log('current locale', useLocale());

  return (
    <header
      style={{
        borderBottom: '1px solid #eee',
        padding: 22,
      }}
    >
      Header area
    </header>
  );
};

export default Header;
