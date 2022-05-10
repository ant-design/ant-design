import message, { actWrapper, actDestroy } from '..';
import { act } from '../../../tests/utils';
import { triggerMotionEnd } from './util';

describe('message.typescript', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    message.destroy();
    actDestroy();

    jest.useRealTimers();
  });

  it('promise without arguments', () => {
    message.success('yes!!!', 0);
  });

  it('promise with one arguments', done => {
    message.success('yes!!!').then(filled => {
      expect(filled).toBe(true);
      done();
    });

    triggerMotionEnd();
  });

  it('promise two arguments', done => {
    message.success('yes!!!').then(
      filled => {
        expect(filled).toBe(true);
        done();
      },
      rejected => {
        expect(rejected).toBe(false);
      },
    );

    triggerMotionEnd();
  });

  it('hide', () => {
    const hide = message.loading('doing...');
    hide();
  });
});
