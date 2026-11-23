import React from 'react';

import type { FormProps } from '..';
import Form from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe.each(['ltr', 'rtl'] as const)('Form labelAlign in %s', (direction) => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  describe.each(['Form', 'Form.Item', 'ConfigProvider'])('%s', (source) => {
    it.each<{ labelAlign: FormProps['labelAlign']; textAlign: string }>([
      { labelAlign: undefined, textAlign: 'end' },
      { labelAlign: 'left', textAlign: 'start' },
      { labelAlign: 'right', textAlign: 'end' },
      { labelAlign: 'start', textAlign: 'start' },
      { labelAlign: 'end', textAlign: 'end' },
    ])('aligns $labelAlign labels to $textAlign', ({ labelAlign, textAlign }) => {
      const { container } = render(
        <ConfigProvider
          direction={direction}
          form={{ labelAlign: source === 'ConfigProvider' ? labelAlign : undefined }}
        >
          <Form labelAlign={source === 'Form' ? labelAlign : undefined}>
            <Form.Item label="Name" labelAlign={source === 'Form.Item' ? labelAlign : undefined}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      const label = container.querySelector('.ant-form-item-label');
      expect(label).toHaveStyle({ textAlign });

      if (textAlign === 'start') {
        expect(label).toHaveClass('ant-form-item-label-start', 'ant-form-item-label-left');
      } else {
        expect(label).not.toHaveClass('ant-form-item-label-start');
        expect(label).not.toHaveClass('ant-form-item-label-left');
      }

      if (labelAlign === 'left' || labelAlign === 'right') {
        const component = source === 'Form.Item' ? 'Form.Item' : 'Form';
        expect(errorSpy).toHaveBeenCalledWith(
          `Warning: [antd: ${component}] \`labelAlign=left|right\` is deprecated. Please use \`labelAlign=start|end\` instead.`,
        );
      } else {
        expect(errorSpy).not.toHaveBeenCalled();
      }
    });
  });

  it('supports the start and legacy left classes independently', () => {
    const { container } = render(
      <ConfigProvider direction={direction}>
        <Form labelAlign="start">
          <Form.Item label="Name">
            <input />
          </Form.Item>
        </Form>
      </ConfigProvider>,
    );

    const label = container.querySelector('.ant-form-item-label')!;
    label.classList.remove('ant-form-item-label-left');
    expect(label).toHaveStyle({ textAlign: 'start' });

    label.classList.replace('ant-form-item-label-start', 'ant-form-item-label-left');
    expect(label).toHaveStyle({ textAlign: 'start' });
  });

  it.each(['start', 'end'] as const)(
    'prioritizes Form.Item over Form over ConfigProvider with %s alignment',
    (labelAlign) => {
      const oppositeAlign = labelAlign === 'start' ? 'end' : 'start';
      const { container } = render(
        <ConfigProvider direction={direction} form={{ labelAlign }}>
          <Form labelAlign={oppositeAlign}>
            <Form.Item label="Form alignment">
              <input />
            </Form.Item>
            <Form.Item label="Item alignment" labelAlign={labelAlign}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>,
      );

      const labels = container.querySelectorAll('.ant-form-item-label');
      expect(labels[0]).toHaveStyle({ textAlign: oppositeAlign });
      expect(labels[1]).toHaveStyle({ textAlign: labelAlign });
    },
  );

  it('does not warn for a standalone Form.Item with default alignment', () => {
    render(
      <ConfigProvider direction={direction}>
        <Form.Item label="Name">
          <input />
        </Form.Item>
      </ConfigProvider>,
    );

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does not warn when Form overrides a deprecated global alignment', () => {
    render(
      <ConfigProvider direction={direction} form={{ labelAlign: 'left' }}>
        <Form labelAlign="end">
          <Form.Item label="Name">
            <input />
          </Form.Item>
        </Form>
      </ConfigProvider>,
    );

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
