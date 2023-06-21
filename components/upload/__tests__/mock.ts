import mock from 'xhr-mock';

export function setup() {
  mock.setup();
  mock.post('http://upload.com/', (req, res) => {
    req.headers({ 'content-length': 100 as unknown as string });
    req.body('thisisbody');
    return res;
  });
}

export const teardown = mock.teardown.bind(mock);
