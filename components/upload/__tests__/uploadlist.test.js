import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Upload from '..';
import UploadList from '../UploadList';
import Form from '../../form';
import { errorRequest, successRequest } from './requests';
import { setup, teardown } from './mock';
import { sleep } from '../../../tests/utils';

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

describe('Upload List', () => {
  // Mock for rc-util raf
  window.requestAnimationFrame = callback => {
    window.setTimeout(callback, 16);
  };
  window.cancelAnimationFrame = id => {
    window.clearTimeout(id);
  };

  // jsdom not support `createObjectURL` yet. Let's handle this.
  const originCreateObjectURL = window.URL.createObjectURL;
  window.URL.createObjectURL = jest.fn(() => '');

  // Mock dom
  let size = { width: 0, height: 0 };
  function setSize(width, height) {
    size = { width, height };
  }
  const mockWidthGet = jest.spyOn(Image.prototype, 'width', 'get');
  const mockHeightGet = jest.spyOn(Image.prototype, 'height', 'get');
  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  let drawImageCallback = null;
  function hookDrawImageCall(callback) {
    drawImageCallback = callback;
  }
  const mockGetCanvasContext = jest.spyOn(HTMLCanvasElement.prototype, 'getContext');
  const mockToDataURL = jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL');

  // HTMLCanvasElement.prototype

  beforeEach(() => setup());
  afterEach(() => {
    teardown();
    drawImageCallback = null;
  });

  let open;
  beforeAll(() => {
    open = jest.spyOn(window, 'open').mockImplementation(() => {});
    mockWidthGet.mockImplementation(() => size.width);
    mockHeightGet.mockImplementation(() => size.height);
    mockSrcSet.mockImplementation(function fn() {
      if (this.onload) {
        this.onload();
      }
    });

    mockGetCanvasContext.mockReturnValue({
      drawImage: (...args) => {
        if (drawImageCallback) drawImageCallback(...args);
      },
    });
    mockToDataURL.mockReturnValue('data:image/png;base64,');
  });

  afterAll(() => {
    window.URL.createObjectURL = originCreateObjectURL;
    mockWidthGet.mockRestore();
    mockHeightGet.mockRestore();
    mockSrcSet.mockRestore();
    mockGetCanvasContext.mockRestore();
    mockToDataURL.mockRestore();
    open.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/4653
  it('should use file.thumbUrl for <img /> in priority', () => {
    const wrapper = mount(
      <Upload defaultFileList={fileList} listType="picture">
        <button type="button">upload</button>
      </Upload>,
    );
    fileList.forEach((file, i) => {
      const linkNode = wrapper.find('.ant-upload-list-item-thumbnail').at(i);
      const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img').at(i);
      expect(linkNode.prop('href')).toBe(file.url);
      expect(imgNode.prop('src')).toBe(file.thumbUrl);
    });
  });

  // https://github.com/ant-design/ant-design/issues/7269
  it('should remove correct item when uid is 0', async () => {
    const list = [
      {
        uid: '0',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
      },
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
      },
    ];
    const wrapper = mount(
      <Upload defaultFileList={list}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.find('.ant-upload-list-item').length).toBe(2);
    wrapper.find('.ant-upload-list-item').at(0).find('.anticon-delete').simulate('click');

    await act(async () => {
      await sleep(1000);
      wrapper.update();

      const domNode = wrapper.find('.ant-upload-list-text-container').at(0).hostNodes().instance();
      const transitionEndEvent = new Event('transitionend');
      domNode.dispatchEvent(transitionEndEvent);
      wrapper.update();
    });

    // console.log(wrapper.html());

    expect(wrapper.find('.ant-upload-list-text-container').hostNodes().length).toBe(1);
  });

  it('should be uploading when upload a file', done => {
    let wrapper;
    let latestFileList = null;
    const onChange = ({ file, fileList: eventFileList }) => {
      expect(eventFileList === latestFileList).toBeFalsy();
      if (file.status === 'uploading') {
        expect(wrapper.render()).toMatchSnapshot();
      }
      if (file.status === 'done') {
        expect(wrapper.render()).toMatchSnapshot();
        done();
      }

      latestFileList = eventFileList;
    };
    wrapper = mount(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        onChange={onChange}
        customRequest={successRequest}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ name: 'foo.png' }],
      },
    });
  });

  it('handle error', done => {
    let wrapper;
    const onChange = ({ file }) => {
      if (file.status === 'error') {
        expect(wrapper.render()).toMatchSnapshot();
        done();
      }
    };
    wrapper = mount(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        onChange={onChange}
        customRequest={errorRequest}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ name: 'foo.png' }],
      },
    });
  });

  it.only('does concat fileList when beforeUpload returns false', async () => {
    const handleChange = jest.fn();
    const ref = React.createRef();
    const wrapper = mount(
      <Upload
        ref={ref}
        listType="picture"
        defaultFileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ name: 'foo.png' }],
      },
    });

    await sleep();

    expect(ref.current.fileList.length).toBe(fileList.length + 1);
    expect(handleChange.mock.calls[0][0].fileList).toHaveLength(3);
  });

  it('In the case of listType=picture, the error status does not show the download.', () => {
    const file = { status: 'error', uid: 'file' };
    const wrapper = mount(
      <Upload listType="picture" fileList={[file]} showUploadList={{ showDownloadIcon: true }}>
        <button type="button">upload</button>
      </Upload>,
    );

    // Has error item className
    wrapper.find('.ant-upload-list-item-error').simulate('mouseenter');

    expect(wrapper.find('div.ant-upload-list-item i.anticon-download').length).toBe(0);
  });

  it('In the case of listType=picture-card, the error status does not show the download.', () => {
    const file = { status: 'error', uid: 'file' };
    const wrapper = mount(
      <Upload listType="picture-card" fileList={[file]} showUploadList={{ showDownloadIcon: true }}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.find('div.ant-upload-list-item i.anticon-download').length).toBe(0);
  });

  it('In the case of listType=text, the error status does not show the download.', () => {
    const file = { status: 'error', uid: 'file' };
    const wrapper = mount(
      <Upload listType="text" fileList={[file]} showUploadList={{ showDownloadIcon: true }}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.find('div.ant-upload-list-item i.anticon-download').length).toBe(0);
  });

  it('should support onPreview', () => {
    const handlePreview = jest.fn();
    const wrapper = mount(
      <Upload listType="picture-card" defaultFileList={fileList} onPreview={handlePreview}>
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.anticon-eye').at(0).simulate('click');
    expect(handlePreview).toHaveBeenCalledWith(fileList[0]);
    wrapper.find('.anticon-eye').at(1).simulate('click');
    expect(handlePreview).toHaveBeenCalledWith(fileList[1]);
  });

  it('should support onRemove', async () => {
    const handleRemove = jest.fn();
    const handleChange = jest.fn();
    const wrapper = mount(
      <Upload
        listType="picture-card"
        defaultFileList={fileList}
        onRemove={handleRemove}
        onChange={handleChange}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.anticon-delete').at(0).simulate('click');
    expect(handleRemove).toHaveBeenCalledWith(fileList[0]);
    wrapper.find('.anticon-delete').at(1).simulate('click');
    expect(handleRemove).toHaveBeenCalledWith(fileList[1]);
    await sleep();
    expect(handleChange.mock.calls.length).toBe(2);
  });

  it('should support onDownload', async () => {
    const handleDownload = jest.fn();
    const wrapper = mount(
      <Upload
        listType="picture-card"
        defaultFileList={[
          {
            uid: '0',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ]}
        onDownload={handleDownload}
        showUploadList={{
          showDownloadIcon: true,
        }}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.anticon-download').at(0).simulate('click');
  });

  it('should support no onDownload', async () => {
    const wrapper = mount(
      <Upload
        listType="picture-card"
        defaultFileList={[
          {
            uid: '0',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ]}
        showUploadList={{
          showDownloadIcon: true,
        }}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.anticon-download').at(0).simulate('click');
  });

  describe('should generate thumbUrl from file', () => {
    [
      { width: 100, height: 200, name: 'height large than width' },
      { width: 200, height: 100, name: 'width large than height' },
    ].forEach(({ width, height, name }) => {
      it(name, async () => {
        setSize(width, height);
        const onDrawImage = jest.fn();
        hookDrawImageCall(onDrawImage);

        const handlePreview = jest.fn();
        const newFileList = [...fileList];
        const newFile = {
          ...fileList[0],
          uid: '-3',
          originFileObj: new File([], 'xxx.png', { type: 'image/png' }),
        };
        delete newFile.thumbUrl;
        newFileList.push(newFile);
        const ref = React.createRef();
        mount(
          <Upload
            ref={ref}
            listType="picture-card"
            defaultFileList={newFileList}
            onPreview={handlePreview}
          >
            <button type="button">upload</button>
          </Upload>,
        );
        ref.current.forceUpdate();
        await sleep();

        expect(ref.current.fileList[2].thumbUrl).not.toBe(undefined);
        expect(onDrawImage).toHaveBeenCalled();

        // Offset check
        const [, offsetX, offsetY] = onDrawImage.mock.calls[0];
        if (width > height) {
          expect(offsetX === 0).toBeTruthy();
        } else {
          expect(offsetY === 0).toBeTruthy();
        }
      });
    });
  });

  it('should non-image format file preview', () => {
    const list = [
      {
        name: 'not-image',
        status: 'done',
        uid: '-3',
        url: 'https://cdn.xxx.com/aaa.zip',
        thumbUrl: 'data:application/zip;base64,UEsDBAoAAAAAADYZYkwAAAAAAAAAAAAAAAAdAAk',
        originFileObj: new File([], 'aaa.zip'),
      },
      {
        name: 'image',
        status: 'done',
        uid: '-4',
        url: 'https://cdn.xxx.com/aaa',
      },
      {
        name: 'not-image',
        status: 'done',
        uid: '-5',
        url: 'https://cdn.xxx.com/aaa.xx',
      },
      {
        name: 'not-image',
        status: 'done',
        uid: '-6',
        url: 'https://cdn.xxx.com/aaa.png/xx.xx',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-7',
        url: 'https://cdn.xxx.com/xx.xx/aaa.png',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-8',
        url: 'https://cdn.xxx.com/xx.xx/aaa.png',
        thumbUrl: 'data:image/png;base64,UEsDBAoAAAAAADYZYkwAAAAAAAAAAAAAAAAdAAk',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-9',
        url: 'https://cdn.xxx.com/xx.xx/aaa.png?query=123',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-10',
        url: 'https://cdn.xxx.com/xx.xx/aaa.png#anchor',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-11',
        url: 'https://cdn.xxx.com/xx.xx/aaa.png?query=some.query.with.dot',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-12',
        url:
          'https://publish-pic-cpu.baidu.com/1296beb3-50d9-4276-885f-52645cbb378e.jpeg@w_228%2ch_152',
        type: 'image/png',
      },
    ];

    const wrapper = mount(
      <Upload listType="picture" defaultFileList={list}>
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support showRemoveIcon and showPreviewIcon', () => {
    const list = [
      {
        name: 'image',
        status: 'uploading',
        uid: '-4',
        url: 'https://cdn.xxx.com/aaa',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-5',
        url: 'https://cdn.xxx.com/aaa',
      },
    ];

    const wrapper = mount(
      <Upload
        listType="picture"
        defaultFileList={list}
        showUploadList={{
          showRemoveIcon: false,
          showPreviewIcon: false,
        }}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support custom onClick in custom icon', async () => {
    const handleRemove = jest.fn();
    const handleChange = jest.fn();
    const myClick = jest.fn();
    const wrapper = mount(
      <Upload
        listType="picture-card"
        defaultFileList={fileList}
        onRemove={handleRemove}
        onChange={handleChange}
        showUploadList={{
          showRemoveIcon: true,
          removeIcon: (
            <i className="custom-delete" onClick={myClick}>
              RM
            </i>
          ),
        }}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('.custom-delete').at(0).simulate('click');
    expect(handleRemove).toHaveBeenCalledWith(fileList[0]);
    expect(myClick).toHaveBeenCalled();
    wrapper.find('.custom-delete').at(1).simulate('click');
    expect(handleRemove).toHaveBeenCalledWith(fileList[1]);
    expect(myClick).toHaveBeenCalled();
    await sleep();
    expect(handleChange.mock.calls.length).toBe(2);
  });

  it('should support removeIcon and downloadIcon', () => {
    const list = [
      {
        name: 'image',
        status: 'uploading',
        uid: '-4',
        url: 'https://cdn.xxx.com/aaa',
      },
      {
        name: 'image',
        status: 'done',
        uid: '-5',
        url: 'https://cdn.xxx.com/aaa',
      },
    ];

    const wrapper = mount(
      <Upload
        listType="picture"
        defaultFileList={list}
        showUploadList={{
          showRemoveIcon: true,
          showDownloadIcon: true,
          removeIcon: () => <i>RM</i>,
          downloadIcon: <i>DL</i>,
        }}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper.render()).toMatchSnapshot();

    const wrapper2 = mount(
      <Upload
        listType="picture"
        defaultFileList={list}
        showUploadList={{
          showRemoveIcon: true,
          showDownloadIcon: true,
          removeIcon: <i>RM</i>,
          downloadIcon: () => <i>DL</i>,
        }}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    expect(wrapper2.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/7762
  it('work with form validation', async () => {
    let formRef;

    const TestForm = () => {
      const [form] = Form.useForm();
      formRef = form;

      return (
        <Form form={form}>
          <Form.Item
            name="file"
            valuePropName="fileList"
            getValueFromEvent={e => e.fileList}
            rules={[
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (!value || value.length === 0) {
                    callback('file required');
                  } else {
                    callback();
                  }
                },
              },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <button type="button">upload</button>
            </Upload>
          </Form.Item>
        </Form>
      );
    };

    const wrapper = mount(<TestForm />);

    wrapper.find(Form).simulate('submit');
    await sleep();
    expect(formRef.getFieldError(['file'])).toEqual(['file required']);

    wrapper.find('input').simulate('change', {
      target: {
        files: [{ name: 'foo.png' }],
      },
    });

    wrapper.find(Form).simulate('submit');
    await sleep();
    expect(formRef.getFieldError(['file'])).toEqual([]);
  });

  it('return when prop onPreview not exists', () => {
    const ref = React.createRef();
    mount(<UploadList ref={ref} />);
    expect(ref.current.handlePreview()).toBe(undefined);
  });

  it('return when prop onDownload not exists', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const items = [{ uid: 'upload-list-item', url: '' }];
    const ref = React.createRef();
    mount(
      <UploadList
        ref={ref}
        items={items}
        locale={{ downloadFile: '' }}
        showUploadList={{ showDownloadIcon: true }}
      />,
    );
    expect(ref.current.handleDownload(file)).toBe(undefined);
  });

  it('previewFile should work correctly', async () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const items = [{ uid: 'upload-list-item', url: '' }];
    const wrapper = mount(
      <UploadList listType="picture-card" items={items} locale={{ previewFile: '' }} />,
    );
    return wrapper.props().previewFile(file);
  });

  it('downloadFile should work correctly', async () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const items = [{ uid: 'upload-list-item', url: '' }];
    const wrapper = mount(
      <UploadList
        listType="picture-card"
        items={items}
        onDownload={() => {}}
        locale={{ downloadFile: '' }}
        showUploadList={{ showDownloadIcon: true }}
      />,
    );
    return wrapper.props().onDownload(file);
  });

  it('extname should work correctly when url not exists', () => {
    const items = [{ uid: 'upload-list-item', url: '' }];
    const wrapper = mount(
      <UploadList listType="picture-card" items={items} locale={{ previewFile: '' }} />,
    );
    expect(wrapper.find('.ant-upload-list-item-thumbnail').length).toBe(1);
  });

  it('extname should work correctly when url exists', done => {
    const items = [{ status: 'done', uid: 'upload-list-item', url: '/example' }];
    const wrapper = mount(
      <UploadList
        listType="picture"
        onDownload={file => {
          expect(file.url).toBe('/example');
          done();
        }}
        items={items}
        locale={{ downloadFile: '' }}
        showDownloadIcon
      />,
    );
    wrapper.find('div.ant-upload-list-item .anticon-download').simulate('click');
  });

  it('when picture-card is loading, icon should render correctly', () => {
    const items = [{ status: 'uploading', uid: 'upload-list-item' }];
    const wrapper = mount(
      <UploadList listType="picture-card" items={items} locale={{ uploading: 'uploading' }} />,
    );
    expect(wrapper.find('.ant-upload-list-item-thumbnail').length).toBe(1);
    expect(wrapper.find('.ant-upload-list-item-thumbnail').text()).toBe('uploading');
  });

  it('onPreview should be called, when url exists', () => {
    const onPreview = jest.fn();
    const items = [{ thumbUrl: 'thumbUrl', url: 'url', uid: 'upload-list-item' }];
    const wrapper = mount(
      <UploadList
        listType="picture-card"
        items={items}
        locale={{ uploading: 'uploading' }}
        onPreview={onPreview}
      />,
    );
    wrapper.find('.ant-upload-list-item-thumbnail').simulate('click');
    expect(onPreview).toHaveBeenCalled();
    wrapper.find('.ant-upload-list-item-name').simulate('click');
    expect(onPreview).toHaveBeenCalled();
    wrapper.setProps({ items: [{ thumbUrl: 'thumbUrl', uid: 'upload-list-item' }] });
    wrapper.find('.ant-upload-list-item-name').simulate('click');
    expect(onPreview).toHaveBeenCalled();
  });

  it('upload image file should be converted to the base64', async () => {
    const mockFile = new File([''], 'foo.png', {
      type: 'image/png',
    });

    const wrapper = mount(
      <UploadList listType="picture-card" items={fileList} locale={{ uploading: 'uploading' }} />,
    );
    return wrapper
      .props()
      .previewFile(mockFile)
      .then(dataUrl => {
        expect(dataUrl).toEqual('data:image/png;base64,');
      });
  });

  it("upload non image file shouldn't be converted to the base64", async () => {
    const mockFile = new File([''], 'foo.7z', {
      type: 'application/x-7z-compressed',
    });

    const wrapper = mount(
      <UploadList listType="picture-card" items={fileList} locale={{ uploading: 'uploading' }} />,
    );
    return wrapper
      .props()
      .previewFile(mockFile)
      .then(dataUrl => {
        expect(dataUrl).toBe('');
      });
  });

  describe('customize previewFile support', () => {
    function test(name, renderInstance) {
      it(name, async () => {
        const mockThumbnail = 'mock-image';
        const previewFile = jest.fn(() => Promise.resolve(mockThumbnail));
        const file = {
          ...fileList[0],
          originFileObj: renderInstance(),
        };
        delete file.thumbUrl;
        const ref = React.createRef();
        const wrapper = mount(
          <Upload ref={ref} listType="picture" defaultFileList={[file]} previewFile={previewFile}>
            <button type="button">button</button>
          </Upload>,
        );
        ref.current.forceUpdate();
        expect(previewFile).toHaveBeenCalledWith(file.originFileObj);
        await sleep(100);
        wrapper.update();

        expect(wrapper.find('.ant-upload-list-item-thumbnail img').prop('src')).toBe(mockThumbnail);
      });
    }
    test('File', () => new File([], 'xxx.png'));
    test('Blob', () => new Blob());
  });

  // https://github.com/ant-design/ant-design/issues/22958
  describe('customize isImageUrl support', () => {
    const list = [
      ...fileList,
      {
        uid: '0',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl:
          'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg@!panda_style?spm=a2c4g.11186623.2.17.4dc56b29BHokyg&file=example.jpg@!panda_style',
      },
    ];
    it('should not render <img /> when file.thumbUrl use "!" as separator', () => {
      const wrapper = mount(
        <Upload listType="picture-card" fileList={list}>
          <button type="button">button</button>
        </Upload>,
      );
      const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
      expect(imgNode.length).toBe(2);
    });
    it('should render <img /> when custom imageUrl return true', () => {
      const isImageUrl = jest.fn(() => true);
      const wrapper = mount(
        <Upload listType="picture-card" fileList={list} isImageUrl={isImageUrl}>
          <button type="button">button</button>
        </Upload>,
      );
      const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
      expect(isImageUrl).toHaveBeenCalled();
      expect(imgNode.length).toBe(3);
    });
    it('should not render <img /> when custom imageUrl return false', () => {
      const isImageUrl = jest.fn(() => false);
      const wrapper = mount(
        <Upload listType="picture-card" fileList={list} isImageUrl={isImageUrl}>
          <button type="button">button</button>
        </Upload>,
      );
      const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
      expect(isImageUrl).toHaveBeenCalled();
      expect(imgNode.length).toBe(0);
    });
  });

  describe('thumbUrl support for non-image', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    const nonImageFile = new File([''], 'foo.7z', { type: 'application/x-7z-compressed' });

    /** Wait for a long promise since `rc-util` internal has at least 3 promise wait */
    async function waitPromise() {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < 10; i += 1) {
        await Promise.resolve();
      }
      /* eslint-enable */
    }

    it('should render <img /> when upload non-image file and configure thumbUrl in onChange', async () => {
      let wrapper;
      const onChange = jest.fn(({ fileList: files }) => {
        const newFileList = files.map(item => ({
          ...item,
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }));

        wrapper.setProps({ fileList: newFileList });
      });

      wrapper = mount(
        <Upload
          action="http://jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={[]}
          onChange={onChange}
          customRequest={successRequest}
        >
          <button type="button">upload</button>
        </Upload>,
      );
      const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
      expect(imgNode.length).toBeFalsy();

      // Simulate change is a timeout change
      wrapper.find('input').simulate('change', { target: { files: [nonImageFile] } });

      // Wait for `rc-upload` process file
      await waitPromise();

      // Wait for mock request finish request
      jest.runAllTimers();

      // Basic called times
      expect(onChange).toHaveBeenCalled();

      // Check for images
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      const afterImgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
      expect(afterImgNode.length).toBeTruthy();
    });

    it('should not render <img /> when upload non-image file without thumbUrl in onChange', done => {
      let wrapper;
      const onChange = async ({ fileList: files }) => {
        wrapper.setProps({ fileList: files });

        await sleep();
        const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
        expect(imgNode.length).toBe(0);
        done();
      };
      wrapper = mount(
        <Upload
          action="http://jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={[]}
          onChange={onChange}
          customRequest={successRequest}
        >
          <button type="button">upload</button>
        </Upload>,
      );
      const imgNode = wrapper.find('.ant-upload-list-item-thumbnail img');
      expect(imgNode.length).toBe(0);
      wrapper.find('input').simulate('change', { target: { files: [nonImageFile] } });
    });
  });

  it('[deprecated] should support transformFile', done => {
    const handleTransformFile = jest.fn();
    const onChange = ({ file }) => {
      if (file.status === 'done') {
        expect(handleTransformFile).toHaveBeenCalled();
        done();
      }
    };
    const wrapper = mount(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        transformFile={handleTransformFile}
        onChange={onChange}
        customRequest={successRequest}
      >
        <button type="button">upload</button>
      </Upload>,
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ name: 'foo.png' }],
      },
    });
  });

  it('should render button inside UploadList when listStyle is picture-card', () => {
    const wrapper = mount(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        listType="picture-card"
        fileList={[
          {
            uid: '0',
            name: 'xxx.png',
          },
        ]}
        showUploadList
      >
        <button className="trigger" type="button">
          upload
        </button>
      </Upload>,
    );
    expect(wrapper.exists('.ant-upload-list button.trigger')).toBe(true);
    wrapper.setProps({ showUploadList: false });
    expect(wrapper.exists('.ant-upload-list button.trigger')).toBe(false);
  });

  // https://github.com/ant-design/ant-design/issues/26536
  it('multiple file upload should keep the internal fileList async', async () => {
    jest.useFakeTimers();

    const uploadRef = React.createRef();

    const MyUpload = () => {
      const [testFileList, setTestFileList] = React.useState([]);

      return (
        <Upload
          ref={uploadRef}
          fileList={testFileList}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          multiple
          onChange={info => {
            setTestFileList([...info.fileList]);
          }}
        >
          <button type="button">Upload</button>
        </Upload>
      );
    };

    mount(<MyUpload />);

    // Mock async update in a frame
    const files = ['light', 'bamboo', 'little'];

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < files.length; i += 1) {
      await Promise.resolve();
      uploadRef.current.onStart({
        uid: files[i],
        name: files[i],
      });
    }
    /* eslint-enable */

    expect(uploadRef.current.fileList).toHaveLength(files.length);

    jest.runAllTimers();
    expect(uploadRef.current.fileList).toHaveLength(files.length);

    jest.useRealTimers();
  });

  it('itemRender', () => {
    const itemRender = (originNode, file, currFileList) => {
      const { name, status, uid, url } = file;
      const index = currFileList.indexOf(file);
      return (
        <span className="custom-item-render">
          {`uid:${uid} name: ${name} status: ${status} url: ${url}  ${index + 1}/${
            currFileList.length
          }`}
        </span>
      );
    };
    const wrapper = mount(<UploadList locale={{}} items={fileList} itemRender={itemRender} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
