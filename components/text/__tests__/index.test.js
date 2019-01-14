import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Title from '../Title';
import Paragraph from '../Paragraph';
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

    describe('editable', () => {
      function testStep(name, submitFunc) {
        it(name, () => {
          const onChange = jest.fn();

          const wrapper = mount(
            <Paragraph onChange={onChange} editable>
              Bamboo
            </Paragraph>,
          );

          wrapper
            .find('.ant-text-edit')
            .first()
            .simulate('click');

          wrapper.find('TextArea').simulate('change', {
            target: { value: 'Bamboo' },
          });

          submitFunc(wrapper);

          expect(onChange).toBeCalledWith('Bamboo');
        });
      }

      testStep('by click', wrapper => {
        wrapper
          .find('.ant-text-edit-content-confirm')
          .first()
          .simulate('click');
      });

      testStep('by key up', wrapper => {
        wrapper.find('TextArea').simulate('keyDown', { keyCode: KeyCode.ENTER });
        wrapper.find('TextArea').simulate('keyUp', { keyCode: KeyCode.ENTER });
      });

      testStep('by blur', wrapper => {
        wrapper.find('TextArea').simulate('blur');
      });
    });
  });
});
