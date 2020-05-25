import React from 'react';
import Button from '..';
import imageTest from '../../../tests/shared/imageTest';

describe('Button image', () => {
  imageTest(
    <>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </>,
  );
});
