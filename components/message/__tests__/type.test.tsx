import message from '..';

describe('message.typescript', () => {
  it('promise without auguments', () => {
    message.success('yes!!!', 0);
  });

  it('promise with one augument', (done) => {
    message.success('yes!!!').then((filled) => {
      expect(filled).toBe(true);
      done();
    });
  });

  it('promise two auguments', (done) => {
    message.success('yes!!!').then(
      (filled) => {
        expect(filled).toBe(true);
        done();
      },
      (rejected) => {
        expect(rejected).toBe(false);
      },
    );
  });

  it('hide', (done) => {
    const onClose = jest.fn();
    const onClose2 = jest.fn();
    const hide = message.loading('doing...', 0, onClose);
    hide();
    expect(onClose).toHaveBeenCalled();
    message.loading('doing', 0.1, onClose2);
    setTimeout(() => {
      expect(onClose2).toHaveBeenCalled();
      done();
    }, 300);
  });
});
