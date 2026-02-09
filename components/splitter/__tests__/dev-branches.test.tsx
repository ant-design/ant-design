const React = require('react');
const { render } = require('../../../tests/utils');
const Splitter = require('../Splitter').default;

describe('Splitter dev branches', () => {
  it('sets displayName in development', () => {
    expect(Splitter.displayName).toBe('Splitter');
  });

  it('warns when size is mixed without onResize', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Splitter>
        <Splitter.Panel size={50}>Panel 1</Splitter.Panel>
        <Splitter.Panel>Panel 2</Splitter.Panel>
      </Splitter>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('When part of `Splitter.Panel` has `size`, `onResize` is required'),
    );

    errorSpy.mockRestore();
  });

  it('warns when using deprecated layout prop', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Splitter layout="vertical">
        <Splitter.Panel>Panel 1</Splitter.Panel>
        <Splitter.Panel>Panel 2</Splitter.Panel>
      </Splitter>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('`layout` is deprecated. Please use `orientation` instead.'),
    );

    errorSpy.mockRestore();
  });
});
