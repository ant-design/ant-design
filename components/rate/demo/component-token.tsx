import React from 'react';
import { ConfigProvider, Flex, Rate } from 'antd';

/** Test usage. Do not use in your production. */
export default () => (
  <ConfigProvider
    theme={{
      components: {
        Rate: {
          starColor: 'blue',
          starSize: 40,
          starHoverScale: 'scale(2)',
          starBg: 'red',
          starBorderColor: 'green',
          starBorderColorSelected: 'purple',
          starBorderWidthDefault: 2,
          starBorderWidthSelected: 2,
        },
      },
    }}
  >
    <Flex vertical gap="middle">
      <Rate defaultValue={2.5} />
      <Rate character="A" defaultValue={2.5} allowHalf />
      <Rate character="好" defaultValue={2.5} allowHalf />
    </Flex>
  </ConfigProvider>
);
