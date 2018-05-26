/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';
import { fileToObject } from '../utils';

describe('Upload', () => {
  // https://github.com/react-component/upload/issues/36
  it('should get refs inside Upload in componentDidMount', () => {
    let ref;
    class App extends React.Component {
      componentDidMount() {
        ref = this.refs.input;
      }
      render() {
        return (
          <Upload supportServerRender={false}>
            <input ref="input" />
          </Upload>
        );
      }
    }
    mount(<App />);
    expect(ref).toBeDefined();
  });

  it('return promise in beforeUpload', (done) => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: () => new Promise(resolve =>
        setTimeout(() => resolve('success'), 100)
      ),
      data,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          expect(data).toBeCalled();
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button>upload</button>
      </Upload>
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { file: 'foo.png' },
        ],
      },
    });
  });

  it('should not stop upload when return value of beforeUpload is false', (done) => {
    const mockFile = new File(['foo'], 'foo.png', {
      type: 'image/png',
    });
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: () => false,
      data,
      onChange: ({ file }) => {
        expect(file instanceof File).toBe(true);
        expect(data).not.toBeCalled();
        done();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button>upload</button>
      </Upload>
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          mockFile,
        ],
      },
    });
  });

  it('should increase percent automaticly when call autoUpdateProgress in IE', (done) => {
    let uploadInstance;
    let lastPercent = -1;
    const props = {
      action: 'http://jsonplaceholder.typicode.com/posts/',
      onChange: ({ file }) => {
        if (file.percent === 0 && file.status === 'uploading') {
          // manually call it
          uploadInstance.autoUpdateProgress(0, file);
        }
        if (file.status === 'uploading') {
          expect(file.percent).toBeGreaterThan(lastPercent);
          lastPercent = file.percent;
        }
        if (file.status === 'done' || file.status === 'error') {
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button>upload</button>
      </Upload>
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { file: 'foo.png' },
        ],
      },
    });

    uploadInstance = wrapper.instance();
  });

  it('should not stop upload when return value of beforeUpload is not false', (done) => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload() {},
      data,
      onChange: () => {
        expect(data).toBeCalled();
        done();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button>upload</button>
      </Upload>
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { file: 'foo.png' },
        ],
      },
    });
  });

  describe('util', () => {
    it('should be able to copy file instance', () => {
      const file = new File([], 'aaa.zip');
      const copiedFile = fileToObject(file);
      ['uid', 'lastModified', 'lastModifiedDate', 'name', 'size', 'type'].forEach((key) => {
        expect(key in copiedFile).toBe(true);
      });
    });
  });
});
