/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';

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

  it('should not stop upload when return value of beforeUpload is not false', (done) => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: () => false,
      data,
      onChange: () => {
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
          { file: 'foo.png' },
        ],
      },
    });
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
});
