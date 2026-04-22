import * as React from 'react';

import TextTooltip from '..';

describe('TextTooltip.typescript', () => {
  it('TextTooltip supports string title and trigger array', () => {
    const tooltip = (
      <TextTooltip title="title" trigger={['hover', 'focus']} zIndex={999}>
        <span />
      </TextTooltip>
    );

    expect(tooltip).toBeTruthy();
  });

  it('TextTooltip children should accept ReactNode', () => {
    const tooltip = (
      <TextTooltip title="title">
        <div />
        <div />
      </TextTooltip>
    );
    const tooltip2 = <TextTooltip title="title">{null}</TextTooltip>;

    expect(tooltip).toBeTruthy();
    expect(tooltip2).toBeTruthy();
  });

  it('disallows unsupported prop types', () => {
    // @ts-expect-error TextTooltip only supports string title.
    const tooltip = <TextTooltip title={<span>title</span>} />;
    // @ts-expect-error TextTooltip does not support open.
    const tooltip2 = <TextTooltip title="title" open />;

    expect(tooltip).toBeTruthy();
    expect(tooltip2).toBeTruthy();
  });
});
