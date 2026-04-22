import * as React from 'react';

import TextTooltip from '..';

describe('TextTooltip.typescript', () => {
  it('TextTooltip supports string title and trigger array', () => {
    const tooltip = (
      <TextTooltip title="title" trigger={['hover', 'focus']} zIndex={999} open>
        <span />
      </TextTooltip>
    );

    expect(tooltip).toBeTruthy();
  });

  it('TextTooltip supports onOpenChange', () => {
    const tooltip = <TextTooltip title="title" onOpenChange={() => {}} />;

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
    // @ts-expect-error TextTooltip does not support align.
    const tooltip2 = <TextTooltip title="title" align={{}} />;

    expect(tooltip).toBeTruthy();
    expect(tooltip2).toBeTruthy();
  });
});
