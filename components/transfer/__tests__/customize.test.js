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

  it('should warning use body', () => {
    mount(<Transfer body={() => null} />);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Transfer] `body` is internal usage and will bre removed, please use `children` instead.',
    );
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

    it('should warn if called in body', () => {
      let init = true;

      mount(
        <Transfer
          {...commonProps}
          body={({ handleSelect, handleSelectAll }) => {
            if (init) {
              handleSelect('', true);
              expect(errorSpy).toHaveBeenCalledWith(
                'Warning: [antd: Transfer] `handleSelect` will be removed, please use `onSelect` instead.',
              );
              errorSpy.mockReset();
              handleSelectAll([], true);
              expect(errorSpy).toHaveBeenCalledWith(
                'Warning: [antd: Transfer] `handleSelectAll` will be removed, please use `onSelectAll` instead.',
              );
            }
            init = false;
            return null;
          }}
        />,
      );
    });
  });
});
