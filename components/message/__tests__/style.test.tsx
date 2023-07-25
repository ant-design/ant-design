import React from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import message, { actWrapper } from '..';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import { awaitPromise, triggerMotionEnd } from './util';

describe('message.style', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    jest.clearAllTimers();
    jest.useRealTimers();
    await awaitPromise();
  });

  it('not export style if not use yet', async () => {
    const cache = createCache();

    const Demo = () => {
      const [msg, holder] = message.useMessage();

      return <StyleProvider cache={cache}>{holder}</StyleProvider>;
    };

    const { container } = render(<Demo />);

    const styleText = extractStyle(cache, true);

    console.log(styleText);

    expect(styleText).not.toContain('.ant-message');
  });
});
