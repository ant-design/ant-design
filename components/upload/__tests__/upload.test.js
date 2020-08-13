/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';
import Form from '../../form';
import { T, fileToObject, getFileItem, removeFileItem } from '../utils';
import { setup, teardown } from './mock';
import { resetWarned } from '../../_util/devWarning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Upload', () => {
  mountTest(Upload);
  rtlTest(Upload);

  beforeEach(() => setup());
  afterEach(() => teardown());

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

  it('return promise in beforeUpload', done => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: () => new Promise(resolve => setTimeout(() => resolve('success'), 100)),
      data,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          expect(data).toHaveBeenCalled();
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  it('beforeUpload can be falsy', done => {
    const props = {
      action: 'http://upload.com',
      beforeUpload: false,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  it('upload promise return file in beforeUpload', done => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: file =>
        new Promise(resolve =>
          setTimeout(() => {
            const result = file;
            result.name = 'test.png';
            resolve(result);
          }, 100),
        ),
      data,
      onChange: ({ file }) => {
        if (file.status !== 'uploading') {
          expect(data).toHaveBeenCalled();
          expect(file.name).toEqual('test.png');
          done();
        }
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  it('should not stop upload when return value of beforeUpload is false', done => {
    const fileList = [
      {
        uid: 'bar',
        name: 'bar.png',
      },
    ];
    const mockFile = new File(['foo'], 'foo.png', {
      type: 'image/png',
    });
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      fileList,
      beforeUpload: () => false,
      data,
      onChange: ({ file, fileList: updatedFileList }) => {
        expect(file instanceof File).toBe(true);
        expect(updatedFileList.map(f => f.name)).toEqual(['bar.png', 'foo.png']);
        expect(data).not.toHaveBeenCalled();
        done();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [mockFile],
      },
    });
  });

  it('should not stop upload when return value of beforeUpload is not false', done => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload() {},
      data,
      onChange: () => {
        expect(data).toHaveBeenCalled();
        done();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });

  // https://github.com/ant-design/ant-design/issues/14779
  it('should contain input file control if upload button is hidden', () => {
    const wrapper = mount(
      <Upload action="http://upload.com">
        <button type="button">upload</button>
      </Upload>,
    );

    expect(wrapper.find('input[type="file"]').length).toBe(1);
    wrapper.setProps({ children: null });
    expect(wrapper.find('input[type="file"]').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/14298
  it('should not have id if upload children is null, avoid being triggered by label', () => {
    const Demo = ({ children }) => (
      <Form>
        <Form.Item name="upload" label="Upload" valuePropName="fileList">
          <Upload>{children}</Upload>
        </Form.Item>
      </Form>
    );

    const wrapper = mount(
      <Demo>
        <div>upload</div>
      </Demo>,
    );

    expect(wrapper.find('input#upload').length).toBe(1);
    wrapper.setProps({ children: null });
    expect(wrapper.find('input#upload').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/16478
  it('should not have id if Upload is disabled, avoid being triggered by label', () => {
    const Demo = ({ disabled }) => (
      <Form>
        <Form.Item name="upload" label="Upload" valuePropName="fileList">
          <Upload disabled={disabled}>
            <div>upload</div>
          </Upload>
        </Form.Item>
      </Form>
    );

    const wrapper = mount(<Demo />);
    expect(wrapper.find('input#upload').length).toBe(1);
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('input#upload').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/24197
  it('should not have id if upload.Dragger is disabled, avoid being triggered by label', () => {
    const Demo = ({ disabled }) => (
      <Form>
        <Form.Item name="upload" label="Upload" valuePropName="fileList">
          <Upload.Dragger disabled={disabled}>
            <div>upload</div>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    );

    const wrapper = mount(<Demo />);
    expect(wrapper.find('input#upload').length).toBe(1);
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('input#upload').length).toBe(0);
  });

  it('should be controlled by fileList', () => {
    const fileList = [
      {
        uid: '-1',
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ];
    const ref = React.createRef();
    const wrapper = mount(<Upload ref={ref} />);
    expect(ref.current.fileList).toEqual([]);
    wrapper.setProps({ fileList });
    expect(ref.current.fileList).toEqual(fileList);
  });

  describe('util', () => {
    // https://github.com/react-component/upload/issues/36
    it('should T() return true', () => {
      const res = T();
      expect(res).toBe(true);
    });

    it('should be able to copy file instance', () => {
      const file = new File([], 'aaa.zip');
      const copiedFile = fileToObject(file);
      ['uid', 'lastModified', 'lastModifiedDate', 'name', 'size', 'type'].forEach(key => {
        expect(key in copiedFile).toBe(true);
      });
    });

    it('should be able to get fileItem', () => {
      const file = { uid: '-1', name: 'item.jpg' };
      const fileList = [
        {
          uid: '-1',
          name: 'item.jpg',
        },
      ];
      const targetItem = getFileItem(file, fileList);
      expect(targetItem).toBe(fileList[0]);
    });

    it('should be able to remove fileItem', () => {
      const file = { uid: '-1', name: 'item.jpg' };
      const fileList = [
        {
          uid: '-1',
          name: 'item.jpg',
        },
        {
          uid: '-2',
          name: 'item2.jpg',
        },
      ];
      const targetItem = removeFileItem(file, fileList);
      expect(targetItem).toEqual(fileList.slice(1));
    });

    it('should not be able to remove fileItem', () => {
      const file = { uid: '-3', name: 'item.jpg' };
      const fileList = [
        {
          uid: '-1',
          name: 'item.jpg',
        },
        {
          uid: '-2',
          name: 'item2.jpg',
        },
      ];
      const targetItem = removeFileItem(file, fileList);
      expect(targetItem).toBe(null);
    });
  });

  it('should support linkProps as object', () => {
    const fileList = [
      {
        uid: '-1',
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
        linkProps: {
          download: 'image',
          rel: 'noopener',
        },
      },
    ];
    const wrapper = mount(<Upload fileList={fileList} />);
    const linkNode = wrapper.find('a.ant-upload-list-item-name');
    expect(linkNode.props().download).toBe('image');
    expect(linkNode.props().rel).toBe('noopener');
  });

  it('should support linkProps as json stringify', () => {
    const linkPropsString = JSON.stringify({
      download: 'image',
      rel: 'noopener',
    });
    const fileList = [
      {
        uid: '-1',
        name: 'foo.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
        linkProps: linkPropsString,
      },
    ];
    const wrapper = mount(<Upload fileList={fileList} />);
    const linkNode = wrapper.find('a.ant-upload-list-item-name');
    expect(linkNode.props().download).toBe('image');
    expect(linkNode.props().rel).toBe('noopener');
  });

  it('should not stop remove when return value of onRemove is false', done => {
    const mockRemove = jest.fn(() => false);
    const props = {
      onRemove: mockRemove,
      fileList: [
        {
          uid: '-1',
          name: 'foo.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
    };

    const wrapper = mount(<Upload {...props} />);

    wrapper.find('div.ant-upload-list-item .anticon-delete').simulate('click');

    setImmediate(() => {
      wrapper.update();

      expect(mockRemove).toHaveBeenCalled();
      expect(props.fileList).toHaveLength(1);
      expect(props.fileList[0].status).toBe('done');
      done();
    });
  });

  // https://github.com/ant-design/ant-design/issues/18902
  it('should not abort uploading until return value of onRemove is resolved as true', done => {
    let wrapper;

    const props = {
      onRemove: () =>
        new Promise(
          resolve =>
            setTimeout(() => {
              wrapper.update();
              expect(props.fileList).toHaveLength(1);
              expect(props.fileList[0].status).toBe('uploading');
              resolve(true);
            }),
          100,
        ),
      fileList: [
        {
          uid: '-1',
          name: 'foo.png',
          status: 'uploading',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
      onChange: () => {
        expect(props.fileList).toHaveLength(1);
        expect(props.fileList[0].status).toBe('removed');
        done();
      },
    };

    wrapper = mount(<Upload {...props} />);

    wrapper.find('div.ant-upload-list-item .anticon-delete').simulate('click');
  });

  it('should not stop download when return use onDownload', done => {
    const mockRemove = jest.fn(() => false);
    const props = {
      onRemove: mockRemove,
      showUploadList: {
        showDownloadIcon: true,
      },
      fileList: [
        {
          uid: '-1',
          name: 'foo.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ],
    };

    const wrapper = mount(<Upload {...props} onDownload={() => {}} />);

    wrapper.find('div.ant-upload-list-item .anticon-download').simulate('click');

    setImmediate(() => {
      wrapper.update();

      expect(props.fileList).toHaveLength(1);
      expect(props.fileList[0].status).toBe('done');
      done();
    });
  });

  // https://github.com/ant-design/ant-design/issues/14439
  it('should allow call abort function through upload instance', () => {
    const ref = React.createRef();
    mount(
      <Upload ref={ref}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(typeof ref.current.upload.abort).toBe('function');
  });

  it('correct dragCls when type is drag', () => {
    const fileList = [{ status: 'uploading', uid: 'file' }];
    const wrapper = mount(
      <Upload type="drag" fileList={fileList}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.find('.ant-upload-drag-uploading').length).toBe(1);
  });

  it('return when targetItem is null', () => {
    const fileList = [{ uid: 'file' }];
    const ref = React.createRef();
    mount(
      <Upload ref={ref} type="drag" fileList={fileList}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(ref.current.onSuccess('', { uid: 'fileItem' })).toBe(undefined);
    expect(ref.current.onProgress('', { uid: 'fileItem' })).toBe(undefined);
    expect(ref.current.onError('', '', { uid: 'fileItem' })).toBe(undefined);
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Upload value={[]} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?',
    );
    errorSpy.mockRestore();
  });

  it('it should be treated as file but not an image', () => {
    const file = {
      status: 'done',
      uid: '-1',
      type: 'video/mp4',
      url: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
    };
    const wrapper = mount(<Upload listType="picture-card" fileList={[file]} />);
    expect(wrapper.find('img').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/25077
  it('should support events', () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const wrapper = mount(
      <Upload onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.ant-upload').at(1).simulate('click');
    expect(onClick).toHaveBeenCalled();
    wrapper.find('.ant-upload').at(1).simulate('mouseEnter');
    expect(onMouseEnter).toHaveBeenCalled();
    wrapper.find('.ant-upload').at(1).simulate('mouseLeave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
