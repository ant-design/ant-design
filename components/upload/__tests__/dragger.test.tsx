/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import Upload from '..';
import mountTest from '../../../tests/shared/mountTest';
import { act, fireEvent, render } from '../../../tests/utils';
import { setup, teardown } from './mock';

describe('Upload.Dragger', () => {
  mountTest(Upload.Dragger);

  beforeEach(() => setup());
  afterEach(() => teardown());

  it('support drag file with over style', async () => {
    vi.useFakeTimers();
    const { container: wrapper } = render(
      <Upload.Dragger action="http://upload.com">
        <div />
      </Upload.Dragger>,
    );

    fireEvent.dragOver(wrapper.querySelector('.ant-upload-drag-container')!, {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(wrapper.querySelector('.ant-upload-drag')).toHaveClass('ant-upload-drag-hover');

    vi.useRealTimers();
  });

  it('support onDrop when files are dropped onto upload area', async () => {
    const onDrop = vi.fn();
    const { container: wrapper } = render(
      <Upload.Dragger onDrop={onDrop}>
        <div />
      </Upload.Dragger>,
    );

    fireEvent.drop(wrapper.querySelector('.ant-upload-drag-container')!, {
      dataTransfer: {
        files: [new File(['foo'], 'foo.png', { type: 'image/png' })],
      },
    });

    expect(onDrop).toHaveBeenCalled();
  });
});
