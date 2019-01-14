import React from 'react';
import { mount } from 'enzyme';
import Title from '../Title';
import { Base } from '../Base';

describe('Text', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    jest.useRealTimers();
    errorSpy.mockRestore();
  });

  describe('Title', () => {
    it('warning if `important` not correct', () => {
      mount(<Title important={false} />);

      expect(errorSpy).toBeCalledWith(
        'Warning: Title only accept `1 | 2 | 3 | 4` as `important` value.',
      );
    });
  });

  describe('Base', () => {
    it('trigger ellipsis update', () => {
      const onSyncEllipsis = jest.fn();

      class TestBase extends Base {
        syncEllipsis = () => {
          super.syncEllipsis();
          onSyncEllipsis();
        };
      }

      const wrapper = mount(
        <TestBase lines={1} component="p" onSyncEllipsis={onSyncEllipsis}>
          Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little
          Light Bamboo is Little Light
        </TestBase>,
      );

      jest.runAllTimers();
      expect(onSyncEllipsis).toHaveBeenCalledTimes(1);

      wrapper.setProps({ lines: 2 });
      jest.runAllTimers();
      expect(onSyncEllipsis).toHaveBeenCalledTimes(2);
    });
  });
});
