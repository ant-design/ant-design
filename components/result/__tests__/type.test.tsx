import * as React from 'react';
import Result from '..';

describe('Result.typescript', () => {
  it('status', () => {
    const result = (
      <>
        <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
        <Result status={404} title="404" subTitle="Sorry, the page you visited does not exist." />
      </>
    );

    expect(result).toBeTruthy();
  });
});
