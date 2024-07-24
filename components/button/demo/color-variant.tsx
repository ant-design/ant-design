import React from 'react';
import { Button, Flex } from 'antd';

import { ButtonColorTypes, ButtonVariantTypes } from '../buttonHelpers';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    {ButtonColorTypes.map((color) => (
      <Flex key={color} gap={5}>
        {ButtonVariantTypes.map((variant) => (
          <Button key={variant} color={color} variant={variant}>
            {variant}
          </Button>
        ))}
      </Flex>
    ))}
  </Flex>
);

export default App;
