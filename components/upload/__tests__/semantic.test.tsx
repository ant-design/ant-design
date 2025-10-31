import React from 'react';

import Upload from '..';
import type { UploadProps } from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Upload.Semantic', () => {
  it('should work with classNames object', () => {
    const { container } = render(
      <Upload
        classNames={{
          root: 'test-upload-root',
          list: 'test-upload-list',
          item: 'test-upload-item',
        }}
        defaultFileList={[
          {
            uid: '1',
            name: 'test.txt',
            status: 'done',
          },
        ]}
      >
        <button type="button">Upload</button>
      </Upload>,
    );

    expect(container.querySelector('.test-upload-root')).toBeTruthy();
    expect(container.querySelector('.test-upload-list')).toBeTruthy();
    expect(container.querySelector('.test-upload-item')).toBeTruthy();
  });

  it('should work with classNames function', () => {
    const classNamesFn: UploadProps['classNames'] = (info) => {
      if (info.props.disabled) {
        return {
          root: 'test-upload-root--disabled',
        };
      }
      return {
        root: 'test-upload-root--enabled',
      };
    };

    const { container } = render(
      <Upload disabled classNames={classNamesFn}>
        <button type="button">Upload</button>
      </Upload>,
    );

    expect(container.querySelector('.test-upload-root--disabled')).toBeTruthy();
    expect(container.querySelector('.test-upload-root--enabled')).toBeFalsy();
  });

  it('should work with styles object', () => {
    const { container } = render(
      <Upload
        styles={{
          root: { backgroundColor: 'red' },
          list: { borderColor: 'blue' },
          item: { color: 'green' },
        }}
        defaultFileList={[
          {
            uid: '1',
            name: 'test.txt',
            status: 'done',
          },
        ]}
      >
        <button type="button">Upload</button>
      </Upload>,
    );

    const rootElement = container.querySelector('.ant-upload-wrapper');
    expect(rootElement).toBeTruthy();
    expect(rootElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });

    const listElement = container.querySelector('.ant-upload-list');
    expect(listElement).toBeTruthy();
    expect(listElement).toHaveStyle({ borderColor: 'blue' });

    const itemElement = container.querySelector('.ant-upload-list-item');
    expect(itemElement).toBeTruthy();
    expect(itemElement).toHaveStyle({ color: 'rgb(0, 128, 0)' });
  });

  it('should work with styles function', () => {
    const stylesFn: UploadProps['styles'] = (info) => {
      if (info.props.multiple) {
        return {
          root: { backgroundColor: 'yellow' },
        };
      }
      return {
        root: { backgroundColor: 'gray' },
      };
    };

    const { container } = render(
      <Upload multiple styles={stylesFn}>
        <button type="button">Upload</button>
      </Upload>,
    );

    const rootElement = container.querySelector('.ant-upload-wrapper');
    expect(rootElement).toBeTruthy();
    expect(rootElement).toHaveStyle({ backgroundColor: 'rgb(255, 255, 0)' });
  });

  it('should merge context and component classNames', () => {
    const { container } = render(
      <ConfigProvider
        upload={{
          classNames: {
            root: 'context-upload-root',
            list: 'context-upload-list',
          },
        }}
      >
        <Upload
          classNames={{
            root: 'component-upload-root',
            item: 'component-upload-item',
          }}
          defaultFileList={[
            {
              uid: '1',
              name: 'test.txt',
              status: 'done',
            },
          ]}
        >
          <button type="button">Upload</button>
        </Upload>
      </ConfigProvider>,
    );

    const rootElement = container.querySelector('.ant-upload-wrapper');
    expect(rootElement).toHaveClass('context-upload-root', 'component-upload-root');

    expect(container.querySelector('.context-upload-list')).toBeTruthy();
    expect(container.querySelector('.component-upload-item')).toBeTruthy();
  });

  it('should merge context and component styles', () => {
    const { container } = render(
      <ConfigProvider
        upload={{
          styles: {
            root: { borderWidth: '2px' },
            list: { padding: '10px' },
          },
        }}
      >
        <Upload
          styles={{
            root: { backgroundColor: 'red' },
            item: { color: 'blue' },
          }}
          defaultFileList={[
            {
              uid: '1',
              name: 'test.txt',
              status: 'done',
            },
          ]}
        >
          <button type="button">Upload</button>
        </Upload>
      </ConfigProvider>,
    );

    const rootElement = container.querySelector('.ant-upload-wrapper');
    expect(rootElement).toBeTruthy();
    expect(rootElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)', borderWidth: '2px' });

    const listElement = container.querySelector('.ant-upload-list');
    expect(listElement).toBeTruthy();
    expect(listElement).toHaveStyle({ padding: '10px' });

    const itemElement = container.querySelector('.ant-upload-list-item');
    expect(itemElement).toBeTruthy();
    expect(itemElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });
});
