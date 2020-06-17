import React from 'react';
import { mount } from 'enzyme';
import Transfer from '../index';

describe('Transfer.Customize', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('props#body does not work anymore', () => {
    const body = jest.fn();
    mount(<Transfer body={body} />);

    expect(errorSpy.mock.calls.length).toBe(0);
    expect(body).not.toHaveBeenCalled();
  });

  describe('deprecated function', () => {
    const dataSource = [];
    for (let i = 0; i < 10; i += 1) {
      dataSource.push({
        key: i.toString(),
      });
    }
    const commonProps = {
      dataSource,
      selectedKeys: ['1'],
      targetKeys: ['2'],
    };

    it('should not exist in render props', () => {
      mount(
        <Transfer {...commonProps}>
          {props => {
            expect('handleFilter' in props).toBeFalsy();
            expect('handleSelect' in props).toBeFalsy();
            expect('handleSelectAll' in props).toBeFalsy();
            expect('handleClear' in props).toBeFalsy();
            expect('body' in props).toBeFalsy();
            expect('checkedKeys' in props).toBeFalsy();
          }}
        </Transfer>,
      );
    });
  });

  it('warning if use `pagination`', () => {
    mount(
      <Transfer dataSource={[]} pagination>
        {() => null}
      </Transfer>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Transfer] `pagination` not support customize render list.',
    );
  });
});
