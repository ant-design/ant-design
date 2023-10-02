import React from 'react';
import Form from '..';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../../button';
import type { InputRef } from '../../input';
import Input from '../../input';

interface TestProps {
  show?: boolean;
  onRef: (node: React.ReactNode, originRef: InputRef) => void;
}

describe('Form.Ref', () => {
  const Test: React.FC<TestProps> = ({ show, onRef }) => {
    const [form] = Form.useForm();
    const removeRef = React.useRef<InputRef>(null);
    const testRef = React.useRef<InputRef>(null);
    const listRef = React.useRef<InputRef>(null);

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
          {(fields) =>
            fields.map((field) => (
              <Form.Item {...field} key={field.key}>
                <Input ref={listRef} />
              </Form.Item>
            ))
          }
        </Form.List>

        <Button
          className="ref-item"
          onClick={() => {
            onRef(form.getFieldInstance('test'), testRef.current!);
          }}
        >
          Form.Item
        </Button>
        <Button
          className="ref-list"
          onClick={() => {
            onRef(form.getFieldInstance(['list', 0]), listRef.current!);
          }}
        >
          Form.List
        </Button>
        <Button
          className="ref-remove"
          onClick={() => {
            onRef(form.getFieldInstance('remove'), removeRef.current!);
          }}
        >
          Removed
        </Button>
      </Form>
    );
  };

  it('should ref work', () => {
    const onRef = jest.fn();
    const { container, rerender } = render(<Test onRef={onRef} show />);

    fireEvent.click(container.querySelector('.ref-item')!);
    expect(onRef).toHaveBeenCalled();
    expect(onRef.mock.calls[0][0]).toBe(onRef.mock.calls[0][1]);

    onRef.mockReset();
    fireEvent.click(container.querySelector('.ref-list')!);
    expect(onRef).toHaveBeenCalled();
    expect(onRef.mock.calls[0][0]).toBe(onRef.mock.calls[0][1]);

    onRef.mockReset();
    rerender(<Test onRef={onRef} show={false} />);
    fireEvent.click(container.querySelector('.ref-remove')!);
    expect(onRef).toHaveBeenCalledWith(undefined, null);
  });
});
