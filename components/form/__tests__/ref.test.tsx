/* eslint-disable react/jsx-key */

import React from 'react';
import { mount } from 'enzyme';
import Form from '..';
import Input from '../../input';
import Button from '../../button';

describe('Form.Ref', () => {
  const Test = ({ onRef }: { onRef: (node: React.ReactElement) => void }) => {
    const [form] = Form.useForm();
    const ref = React.useRef<any>();

    return (
      <Form form={form} initialValues={{ list: ['light'] }}>
        <Form.Item name="test" label="test" referable={referable}>
          <Input ref={ref} />
        </Form.Item>

        <Form.List name="list">
          {fields =>
            fields.map(field => (
              <Form.Item {...field} referable={referable}>
                <Input ref={ref} />
              </Form.Item>
            ))
          }
        </Form.List>

        <Button
          className="ref-item"
          onClick={() => {
            onRef(form.getFieldInstance('test'));
          }}
        >
          Focus Form.Item
        </Button>
        <Button
          className="ref-list"
          onClick={() => {
            onRef(form.getFieldInstance(['list', 0]));
          }}
        >
          Focus Form.List
        </Button>
      </Form>
    );
  };

  it('itemReferable', () => {
    const onRef = jest.fn();
    const wrapper = mount(<Test itemReferable onRef={onRef} />);

    wrapper.find('.ref-item').last().simulate('click');
    expect(onRef).toHaveBeenCalledWith(expect.anything());

    onRef.mockReset();
    wrapper.find('.ref-list').last().simulate('click');
    expect(onRef).toHaveBeenCalledWith(expect.anything());
  });

  it('referable', () => {
    const onRef = jest.fn();
    const wrapper = mount(<Test referable onRef={onRef} />);

    wrapper.find('.ref-item').last().simulate('click');
    expect(onRef).toHaveBeenCalledWith(expect.anything());

    onRef.mockReset();
    wrapper.find('.ref-list').last().simulate('click');
    expect(onRef).toHaveBeenCalledWith(expect.anything());
  });
});
