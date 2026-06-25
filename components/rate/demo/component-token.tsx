import React from 'react';
import { ConfigProvider, Flex, Rate } from 'antd';

const customCharacter = (
  <svg aria-hidden="true" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
    <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" />
  </svg>
);

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
      <Rate character={customCharacter} defaultValue={2.5} allowHalf />
    </Flex>
  </ConfigProvider>
);
