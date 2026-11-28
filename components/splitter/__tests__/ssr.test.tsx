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
        <Splitter.Panel key="1" defaultSize={23} />
        <Splitter.Panel key="2" />
      </Splitter>,
    );

    const div = document.createElement('div');
    div.innerHTML = str;
    document.body.appendChild(div);

    expect(div.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle({
      flexBasis: '23px',
      flexGrow: '0',
    });
    expect(div.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle({
      flexBasis: 'auto',
      flexGrow: '1',
    });
  });

  it('ptg value', () => {
    const str = renderToString(
      <Splitter>
        <Splitter.Panel key="1" defaultSize="33%" />
        <Splitter.Panel key="2" />
      </Splitter>,
    );

    const div = document.createElement('div');
    div.innerHTML = str;
    document.body.appendChild(div);

    expect(div.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle({
      flexBasis: '33%',
      flexGrow: '0',
    });
    expect(div.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle({
      flexBasis: 'auto',
      flexGrow: '1',
    });
  });

  it('keeps a finite separator value when all percentage defaults are zero', () => {
    const str = renderToString(
      <Splitter>
        <Splitter.Panel defaultSize="0%" />
        <Splitter.Panel defaultSize="0%" />
      </Splitter>,
    );
    const div = document.createElement('div');
    div.innerHTML = str;

    expect(div.querySelector('[role="separator"]')).toHaveAttribute('aria-valuenow', '50');
  });

  it('allocates zero percentage defaults with mixed maximum units', () => {
    const str = renderToString(
      <Splitter>
        <Splitter.Panel defaultSize="0%" max={500} />
        <Splitter.Panel defaultSize="0%" max="0%" />
      </Splitter>,
    );
    const div = document.createElement('div');
    div.innerHTML = str;

    expect(div.querySelector('[role="separator"]')).toHaveAttribute('aria-valuenow', '100');
  });
});
