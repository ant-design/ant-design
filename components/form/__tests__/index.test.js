import React from 'react';
import { mount } from 'enzyme';
import scrollIntoView from 'scroll-into-view-if-needed';
import Form from '..';
import Input from '../../input';
import Button from '../../button';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

jest.mock('scroll-into-view-if-needed');

const delay = (timeout = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, timeout);
  });

describe('Form', () => {
  mountTest(Form);
  mountTest(Form.Item);

  rtlTest(Form);
  rtlTest(Form.Item);

  scrollIntoView.mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  async function change(wrapper, index, value) {
    wrapper
      .find(Input)
      .at(index)
      .simulate('change', { target: { value } });
    await delay(50);
    wrapper.update();
  }

  beforeEach(() => {
    jest.useRealTimers();
    scrollIntoView.mockReset();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    scrollIntoView.mockRestore();
  });

  describe('List', () => {
    function testList(name, renderField) {
      it(name, async () => {
        const wrapper = mount(
          <Form>
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => renderField(field))}
                  <Button className="add" onClick={add}>
                    Add
                  </Button>
                  <Button
                    className="remove"
                    onClick={() => {
                      remove(1);
                    }}
                  >
                    Remove
                  </Button>
                </>
              )}
            </Form.List>
          </Form>,
        );

        async function operate(className) {
          wrapper
            .find(className)
            .last()
            .simulate('click');
          await delay();
          wrapper.update();
        }

        await operate('.add');
        expect(wrapper.find(Input).length).toBe(1);

        await operate('.add');
        expect(wrapper.find(Input).length).toBe(2);

        await change(wrapper, 1, '');
        wrapper.update();
        expect(wrapper.find('.ant-form-item-explain').length).toBe(1);

        await operate('.remove');
        wrapper.update();
        expect(wrapper.find(Input).length).toBe(1);
        expect(wrapper.find('.ant-form-item-explain').length).toBe(0);
      });
    }

    testList('operation correctly', field => (
      <Form.Item {...field} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    ));

    testList('nest noStyle', field => (
      <Form.Item key={field.key}>
        <Form.Item noStyle {...field} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form.Item>
    ));

    it('correct onFinish values', async () => {
      async function click(wrapper, className) {
        wrapper
          .find(className)
          .last()
          .simulate('click');
        await delay();
        wrapper.update();
      }

      const onFinish = jest.fn().mockImplementation(() => {});

      const wrapper = mount(
        <Form
          onFinish={(v) => {
            if (typeof v.list[0] === 'object') {
              /* old version led to SyntheticEvent be passed as an value here
                that led to weird infinite loop somewhere and OutOfMemory crash */
              v = new Error('We expect value to be a primitive here');
            }
            onFinish(v);
          }}
        >
          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  // key is in a field
                  // eslint-disable-next-line react/jsx-key
                  <Form.Item {...field}>
                    <Input />
                  </Form.Item>
                ))}
                <Button
                  className="add"
                  onClick={add}
                >
                  Add
                </Button>
                <Button
                  className="remove"
                  onClick={() => remove(0)}
                >
                  Remove
                </Button>
              </>
            )}
          </Form.List>
        </Form>,
      );

      await click(wrapper, '.add');
      await change(wrapper, 0, 'input1');
      wrapper.find('form').simulate('submit');
      await delay();
      expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1'] });

      await click(wrapper, '.add');
      await change(wrapper, 1, 'input2');
      await click(wrapper, '.add');
      await change(wrapper, 2, 'input3');
      wrapper.find('form').simulate('submit');
      await delay();
      expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1', 'input2', 'input3'] });

      await click(wrapper, '.remove'); // will remove first input
      wrapper.find('form').simulate('submit');
      await delay();
      expect(onFinish).toHaveBeenLastCalledWith({ list: ['input2', 'input3'] });
    });
  });

  it('noStyle Form.Item', async () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <Form>
        <Form.Item>
          <Form.Item name="test" rules={[{ required: true }]}>
            <Input onChange={onChange} />
          </Form.Item>
        </Form.Item>
      </Form>,
    );

    await change(wrapper, 0, '');
    expect(wrapper.find('.ant-form-item-explain').length).toBe(1);

    expect(onChange).toHaveBeenCalled();
  });

  it('`shouldUpdate` should work with render props', () => {
    mount(
      <Form>
        <Form.Item>{() => null}</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `children` of render props only work with `shouldUpdate`.',
    );
  });
  it('`name` should not work with render props', () => {
    mount(
      <Form>
        <Form.Item name="test" shouldUpdate>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Form.Item] Do not use `name` with `children` of render props since it's not a field.",
    );
  });
  it('children is array has name props', () => {
    mount(
      <Form>
        <Form.Item name="test">
          <div>one</div>
          <div>two</div>
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `children` is array of render props cannot have `name`.',
    );
  });

  describe('scrollToField', () => {
    function test(name, genForm) {
      it(name, () => {
        let callGetForm;

        const Demo = () => {
          const { props, getForm } = genForm();
          callGetForm = getForm;

          return (
            <Form name="scroll" {...props}>
              <Form.Item name="test">
                <Input />
              </Form.Item>
            </Form>
          );
        };

        mount(<Demo />, { attachTo: document.body });

        expect(scrollIntoView).not.toHaveBeenCalled();
        const form = callGetForm();
        form.scrollToField('test', {
          block: 'start',
        });

        const inputNode = document.getElementById('scroll_test');
        expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
          block: 'start',
          scrollMode: 'if-needed',
        });
      });
    }

    // hooks
    test('useForm', () => {
      const [form] = Form.useForm();
      return {
        props: { form },
        getForm: () => form,
      };
    });

    // ref
    test('ref', () => {
      let form;
      return {
        props: {
          ref: instance => {
            form = instance;
          },
        },
        getForm: () => form,
      };
    });
  });

  it('Form.Item should support data-*、aria-* and custom attribute', () => {
    const wrapper = mount(
      <Form>
        <Form.Item data-text="123" aria-hidden="true" cccc="bbbb">
          text
        </Form.Item>
      </Form>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('warning when use `name` but children is not validate element', () => {
    mount(
      <Form>
        <Form.Item name="warning">text</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
    );
  });

  it('dynamic change required', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="light" name="light" valuePropName="checked">
          <input type="checkbox" />
        </Form.Item>
        <Form.Item
          label="bamboo"
          name="bamboo"
          dependencies={['light']}
          rules={[({ getFieldValue }) => ({ required: getFieldValue('light') })]}
        >
          <input />
        </Form.Item>
      </Form>,
    );

    expect(wrapper.find('.ant-form-item-required')).toHaveLength(0);

    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.find('.ant-form-item-required')).toHaveLength(1);
  });

  it('should show related className when customize help', () => {
    const wrapper = mount(
      <Form>
        <Form.Item help="good">
          <input />
        </Form.Item>
      </Form>,
    );

    expect(wrapper.find('.ant-form-item-with-help').length).toBeTruthy();
  });

  it('warning when use v3 function', () => {
    Form.create();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form] antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/20706
  it('Error change should work', async () => {
    const wrapper = mount(
      <Form>
        <Form.Item
          name="name"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                if (value === 'p') {
                  return Promise.reject(new Error('not a p'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>,
    );

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 3; i += 1) {
      await change(wrapper, 0, '');
      expect(
        wrapper
          .find('.ant-form-item-explain')
          .first()
          .text(),
      ).toEqual("'name' is required");

      await change(wrapper, 0, 'p');
      expect(
        wrapper
          .find('.ant-form-item-explain')
          .first()
          .text(),
      ).toEqual('not a p');
    }
    /* eslint-enable */
  });

  // https://github.com/ant-design/ant-design/issues/20813
  it('should update help directly when provided', () => {
    function App() {
      const [message, updateMessage] = React.useState('');
      return (
        <Form>
          <Form.Item label="hello" help={message}>
            <Input />
          </Form.Item>
          <Button onClick={() => updateMessage('bamboo')} />
        </Form>
      );
    }

    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    expect(
      wrapper
        .find('.ant-form-item')
        .first()
        .hasClass('ant-form-item-with-help'),
    ).toBeTruthy();
    expect(wrapper.find('.ant-form-item-explain').text()).toEqual('bamboo');
  });

  it('warning when use `dependencies` but `name` is empty & children is not a render props', () => {
    mount(
      <Form>
        <Form.Item dependencies={[]}>text</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] Must set `name` or use render props when `dependencies` is set.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/20948
  it('not repeat render when Form.Item is not a real Field', async () => {
    const shouldNotRender = jest.fn();
    const StaticInput = () => {
      shouldNotRender();
      return <Input />;
    };

    const shouldRender = jest.fn();
    const DynamicInput = () => {
      shouldRender();
      return <Input />;
    };

    const formRef = React.createRef();

    mount(
      <div>
        <Form ref={formRef}>
          <Form.Item>
            <StaticInput />
          </Form.Item>
          <Form.Item name="light">
            <DynamicInput />
          </Form.Item>
        </Form>
      </div>,
    );

    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(1);

    formRef.current.setFieldsValue({ light: 'bamboo' });
    await Promise.resolve();
    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(2);
  });

  it('empty help should also render', () => {
    const wrapper = mount(
      <Form.Item help="">
        <input />
      </Form.Item>,
    );
    expect(wrapper.find('.ant-form-item-explain').length).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/21167
  it('`require` without `name`', () => {
    const wrapper = mount(
      <Form.Item label="test" required>
        <input />
      </Form.Item>,
    );

    expect(wrapper.find('.ant-form-item-required')).toHaveLength(1);
  });

  it('0 is a validate Field', () => {
    const wrapper = mount(
      <Form.Item name={0}>
        <input />
      </Form.Item>,
    );

    expect(wrapper.find('Field')).toHaveLength(1);
  });

  it('`null` triggers warning and is treated as `undefined`', () => {
    const wrapper = mount(
      <Form.Item name={null}>
        <input />
      </Form.Item>,
    );

    expect(wrapper.find('Field')).toHaveLength(0);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `null` is passed as `name` property',
    );
  });
});
