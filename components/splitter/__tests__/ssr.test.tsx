import React from 'react';
import { renderToString } from 'react-dom/server';

import Splitter from '..';
import { resetWarned } from '../../_util/warning';

describe('Splitter.SSR', () => {
  beforeEach(() => {
    resetWarned();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('px value', () => {
    const str = renderToString(
      <Splitter>
        <Splitter.Panel key="1" size={24} />
        <Splitter.Panel key="2" />
      </Splitter>,
    );

    const div = document.createElement('div');
    div.innerHTML = str;
    document.body.appendChild(div);

    console.log('???', document.body.innerHTML);
  });
});
