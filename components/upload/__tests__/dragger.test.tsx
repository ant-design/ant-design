/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import Upload from '..';
import mountTest from '../../../tests/shared/mountTest';
import { act, fireEvent, render, waitFor } from '../../../tests/utils';
import { setup, teardown } from './mock';

describe('Upload.Dragger', () => {
  mountTest(Upload.Dragger);

  beforeEach(() => setup());
  afterEach(() => teardown());

  it('support drag file with over style', async () => {
    jest.useFakeTimers();
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
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.querySelector('.ant-upload-drag')).toHaveClass('ant-upload-drag-hover');
    });

    jest.useRealTimers();
  });

  it('support onDrop when files are dropped onto upload area', async () => {
    const onDrop = jest.fn();
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

    await waitFor(() => {
      expect(onDrop).toHaveBeenCalled();
    });
  });
});
