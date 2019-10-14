/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';
import { setup, teardown } from './mock';
import mountTest from '../../../tests/shared/mountTest';

describe('Upload.Dragger', () => {
  mountTest(Upload.Dragger);

  beforeEach(() => setup());
  afterEach(() => teardown());

  it('support drag file with over style', () => {
    const wrapper = mount(
      <Upload.Dragger action="http://upload.com">
        <div />
      </Upload.Dragger>,
    );

    wrapper.find('.ant-upload-drag-container').simulate('dragover', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
    expect(wrapper.find('.ant-upload-drag').hasClass('ant-upload-drag-hover')).toBe(true);
  });
});
