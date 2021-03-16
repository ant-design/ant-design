import message from '..';

describe('message.typescript', () => {
  it('promise without auguments', () => {
    message.success('yes!!!', 0);
  });

  it('promise with one augument', done => {
    message.success('yes!!!').then(filled => {
      expect(filled).toBe(true);
      done();
    });
  });

  it('promise two auguments', done => {
    message.success('yes!!!').then(
      filled => {
        expect(filled).toBe(true);
        done();
      },
      rejected => {
        expect(rejected).toBe(false);
      },
    );
  });

  it('hide', () => {
    const hide = message.loading('doing...');
    hide();
  });
});
