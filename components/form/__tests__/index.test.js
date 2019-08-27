/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { mount } from 'enzyme';
import Form from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Form', () => {
  mountTest(Form);
  mountTest(Form.Item);

  it('hideRequiredMark', () => {
    const wrapper = mount(<Form hideRequiredMark />);
    expect(wrapper.find('form').hasClass('ant-form-hide-required-mark')).toBe(true);
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
