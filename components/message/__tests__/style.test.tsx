import React from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import message, { actWrapper } from '..';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import { awaitPromise } from './util';

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

      return (
        <StyleProvider cache={cache}>
          {holder}
          <button
            type="button"
            onClick={() => {
              msg.success('2333');
            }}
          >
            Show
          </button>
        </StyleProvider>
      );
    };

    const { container } = render(<Demo />);
    await waitFakeTimer();

    const styleText = extractStyle(cache, true);
    expect(styleText).not.toContain('.ant-message');

    // Render style
    fireEvent.click(container.querySelector('button')!);
    await waitFakeTimer();

    const styleText2 = extractStyle(cache, true);
    expect(styleText2).toContain('.ant-message');
  });
});
