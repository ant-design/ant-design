import React from 'react';

import { render as rtlRender } from '../../../tests/utils';

describe('Splitter displayName in production', () => {
  it('does not set displayName in production', () => {
    const prevEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    let Splitter: any;
    jest.isolateModules(() => {
      Splitter = require('../Splitter').default;
    });

    expect(Splitter?.displayName).toBeUndefined();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const SplitterAny = Splitter as any;
    rtlRender(
      React.createElement(
        Splitter!,
        null,
        React.createElement(SplitterAny.Panel, { size: 50 }, 'Panel 1'),
        React.createElement(SplitterAny.Panel, null, 'Panel 2'),
      ),
    );
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();

    process.env.NODE_ENV = prevEnv;
  });
});
