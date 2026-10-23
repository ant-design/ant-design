import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { SWRConfig } from 'swr';

import Contributors from '../.dumi/theme/slots/Content/Contributors';
import * as siteUtils from '../.dumi/theme/utils';

jest.mock('dumi', () => ({
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}));

describe('document contributors', () => {
  const originalFetch = global.fetch;
  const fetchMock = jest.fn();

  beforeEach(() => {
    jest.replaceProperty(process, 'env', { ...process.env, NODE_ENV: 'production' });
    global.fetch = fetchMock;
    fetchMock.mockResolvedValue({
      json: async () => ({
        logins: ['afc163'],
        components: { button: [0] },
        blog: {},
        react: {},
        spec: {},
      }),
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    fetchMock.mockReset();
    jest.restoreAllMocks();
  });

  async function renderContributors() {
    await act(async () => {
      render(
        <SWRConfig value={{ provider: () => new Map() }}>
          <Contributors filename="components/button/index.en-US.md" />
        </SWRConfig>,
      );
    });
  }

  it('skips contributor requests and rendering on preview sites', async () => {
    jest.spyOn(siteUtils, 'isOfficialHost').mockReturnValue(false);

    await renderContributors();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('loads and displays contributors on official production sites', async () => {
    jest.spyOn(siteUtils, 'isOfficialHost').mockReturnValue(true);

    await renderContributors();

    expect(await screen.findByRole('img', { name: 'afc163' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/afc163');
    expect(fetchMock).toHaveBeenCalledWith('/contributors.json');
  });

  it('skips contributor requests during local development', async () => {
    process.env.NODE_ENV = 'development';
    jest.spyOn(siteUtils, 'isOfficialHost').mockReturnValue(true);

    await renderContributors();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
