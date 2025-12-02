import React from 'react';

import ConfigProvider from '..';
import { pureRender } from '../../../tests/utils';

let MotionProviderRun = 0;
jest.mock('@rc-component/motion', () => {
  const RcMotion = jest.requireActual('@rc-component/motion');
  const MotionProvider = RcMotion.Provider;
  return {
    ...RcMotion,
    Provider: (props: any) => {
      MotionProviderRun += 1;
      return <MotionProvider {...props} />;
    },
  };
});

describe('motion test', () => {
  beforeEach(() => {
    MotionProviderRun = 0;
  });

  it('nest motion properties, should work fine', () => {
    pureRender(
      <>
        <ConfigProvider theme={{ token: { motion: false } }}>
          <ConfigProvider>
            <ConfigProvider theme={{ token: { motion: true } }}>
              <ConfigProvider theme={{ token: { motion: false } }}>
                <ConfigProvider />
              </ConfigProvider>
            </ConfigProvider>
          </ConfigProvider>
        </ConfigProvider>
      </>,
    );

    expect(MotionProviderRun).toBe(3);
  });
});
