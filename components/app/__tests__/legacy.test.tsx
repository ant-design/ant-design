import type { FragmentInstance } from 'react';
import React from 'react';

import App from '..';
import { render } from '../../../tests/utils';

jest.mock('../../_util/getReactVersionCanDelMe', () => () => [19, 2, 0]);

describe('App legacy React version', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should not pass ref to Fragment before React 19.3', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const fragmentRef = React.createRef<FragmentInstance>();

    render(
      <App ref={fragmentRef} component={false}>
        <span />
      </App>,
    );

    expect(fragmentRef.current).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: App] `ref` is not supported when `component` is `false`. Please provide a valid `component` instead.',
    );
  });
});
