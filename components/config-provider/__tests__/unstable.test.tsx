import { version } from 'react';

import { waitFakeTimer19 } from '../../../tests/utils';
import Modal from '../../modal';

jest.mock('rc-util/lib/Dom/isVisible', () => () => true);

describe('UnstableContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // TODO: Remove in v6
  it('should warning', async () => {
    const majorVersion = parseInt(version.split('.')[0], 10);

    if (majorVersion >= 19) {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      Modal.info({ title: 'title', content: 'content' });

      await waitFakeTimer19();

      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: compatible] antd v5 support React is 16 ~ 18. see https://u.ant.design/v5-for-19 for compatible.',
      );
    }
  });
});
