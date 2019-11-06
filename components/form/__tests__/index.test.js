/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { mount, render } from 'enzyme';
import Form from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Form', () => {
  mountTest(Form);
  mountTest(Form.Item);

  it('hideRequiredMark', () => {
    const wrapper = mount(<Form hideRequiredMark />);
    expect(wrapper.find('form').hasClass('ant-form-hide-required-mark')).toBe(true);
  });

  it('Form.Item should support data-*、aria-* and custom attribute', () => {
    const wrapper = render(
      <Form>
        <Form.Item data-text="123" aria-hidden="true" cccc="bbbb">
          text
        </Form.Item>
      </Form>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('wrappedComponentRef', () => {
    it('warns on functional component', () => {
      if (process.env.REACT === '15') {
        return;
      }
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const TestForm = () => <Form />;
      const Wrapped = Form.create()(TestForm);
      mount(<Wrapped wrappedComponentRef={() => {}} />);
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
      spy.mockRestore();
    });

    it('get component ref', () => {
      class TestForm extends React.Component {
        // eslint-disable-line
        render() {
          return <Form />;
        }
      }
      const Wrapped = Form.create()(TestForm);
      let form;
      mount(
        <Wrapped
          wrappedComponentRef={node => {
            form = node;
          }}
        />,
      );
      expect(form).toBeInstanceOf(TestForm);
    });
  });
});
