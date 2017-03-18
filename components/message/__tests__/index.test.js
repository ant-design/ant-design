import message from '..';

describe('message', () => {
  beforeEach(() => {
    message.config({
      top: null,
      duration: 1.5,
      getContainer: null,
    });
  });
  it('should be able to config getContainer', () => {
    message.config({
      getContainer: () => {
        const div = document.createElement('div');
        div.className = 'custom-container';
        document.body.appendChild(div);
        return div;
      },
    });
    message.info('whatever');
    expect(document.querySelectorAll('.custom-container').length).toBe(1);
  });
});
