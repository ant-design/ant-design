/* eslint-disable react/jsx-key */

import React from 'react';
import { mount } from 'enzyme';
import Form from '..';
import Input from '../../input';
import Button from '../../button';

describe('Form.Ref', () => {
  const Test = ({
    onRef,
    show,
  }: {
    onRef: (node: React.ReactElement, originRef: React.RefObject<any>) => void;
    show?: boolean;
  }) => {
    const [form] = Form.useForm();
    const removeRef = React.useRef<any>();
    const testRef = React.useRef<any>();
    const listRef = React.useRef<any>();

    return (
      <Form form={form} initialValues={{ list: ['light'] }}>
        {show && (
          <Form.Item name="remove" label="remove">
            <Input ref={removeRef} />
          </Form.Item>
        )}

        <Form.Item name="test" label="test">
          <Input ref={testRef} />
        </Form.Item>

        <Form.List name="list">
          {fields =>
            fields.map(field => (
              <Form.Item {...field}>
                <Input ref={listRef} />
              </Form.Item>
            ))
          }
        </Form.List>

        <Button
          className="ref-item"
          onClick={() => {
            onRef(form.getFieldInstance('test'), testRef.current);
          }}
        >
          Form.Item
        </Button>
        <Button
          className="ref-list"
          onClick={() => {
            onRef(form.getFieldInstance(['list', 0]), listRef.current);
          }}
        >
          Form.List
        </Button>
        <Button
          className="ref-remove"
          onClick={() => {
            onRef(form.getFieldInstance('remove'), removeRef.current);
          }}
        >
          Removed
        </Button>
      </Form>
    );
  };

  it('should ref work', () => {
    const onRef = jest.fn();
    const wrapper = mount(<Test onRef={onRef} show />);

    wrapper.find('.ref-item').last().simulate('click');
    expect(onRef).toHaveBeenCalled();
    expect(onRef.mock.calls[0][0]).toBe(onRef.mock.calls[0][1]);

    onRef.mockReset();
    wrapper.find('.ref-list').last().simulate('click');
    expect(onRef).toHaveBeenCalled();
    expect(onRef.mock.calls[0][0]).toBe(onRef.mock.calls[0][1]);

    onRef.mockReset();
    wrapper.setProps({ show: false });
    wrapper.update();
    wrapper.find('.ref-remove').last().simulate('click');
    expect(onRef).toHaveBeenCalledWith(undefined, null);
  });
});
