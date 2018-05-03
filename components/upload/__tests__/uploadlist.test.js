import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';
import Form from '../../form';
import { errorRequest, successRequest } from './requests';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
}, {
  uid: -2,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

describe('Upload List', () => {
  // https://github.com/ant-design/ant-design/issues/4653
  it('should use file.thumbUrl for <img /> in priority', () => {
    const wrapper = mount(
      <Upload defaultFileList={fileList} listType="picture">
        <button>upload</button>
      </Upload>
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
    const list = [{
      uid: 0,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
    }, {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IQKRngzUuFzJzGzRJXUs.png',
    }];
    const wrapper = mount(
      <Upload defaultFileList={list}>
        <button>upload</button>
      </Upload>
    );
    expect(wrapper.find('.ant-upload-list-item').length).toBe(2);
    wrapper.find('.ant-upload-list-item').at(0).find('.anticon-cross').simulate('click');
    await delay(400);
    wrapper.update();
    expect(wrapper.find('.ant-upload-list-item').hostNodes().length).toBe(1);
  });

  it('should be uploading when upload a file', (done) => {
    let wrapper;
    const onChange = ({ file }) => {
      if (file.status === 'uploading') {
        expect(wrapper.render()).toMatchSnapshot();
      }
      if (file.status === 'done') {
        expect(wrapper.render()).toMatchSnapshot();
        done();
      }
    };
    wrapper = mount(
      <Upload
        action="http://jsonplaceholder.typicode.com/posts/"
        onChange={onChange}
        customRequest={successRequest}
      >
        <button>upload</button>
      </Upload>
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { name: 'foo.png' },
        ],
      },
    });
  });

  it('handle error', (done) => {
    let wrapper;
    const onChange = ({ file }) => {
      if (file.status !== 'uploading') {
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
        <button>upload</button>
      </Upload>
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { name: 'foo.png' },
        ],
      },
    });
  });

  it('does concat filelist when beforeUpload returns false', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Upload
        listType="picture"
        defaultFileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        <button>upload</button>
      </Upload>
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { name: 'foo.png' },
        ],
      },
    });

    expect(wrapper.state().fileList.length).toBe(fileList.length + 1);
    expect(handleChange.mock.calls[0][0].fileList).toHaveLength(3);
  });

  // https://github.com/ant-design/ant-design/issues/7762
  it('work with form validation', () => {
    let errors;
    class TestForm extends React.Component {
      handleSubmit = () => {
        const { validateFields } = this.props.form;
        validateFields((err) => {
          errors = err;
        });
      }

      render() {
        const { getFieldDecorator } = this.props.form;

        return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('file', {
                valuePropname: 'fileList',
                getValueFromEvent: e => e.fileList,
                rules: [
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
                ],
              })(
                <Upload
                  beforeUpload={() => false}
                >
                  <button>upload</button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        );
      }
    }

    const App = Form.create()(TestForm);
    const wrapper = mount(<App />);
    wrapper.find(Form).simulate('submit');
    expect(errors.file.errors).toEqual([{ message: 'file required', field: 'file' }]);

    wrapper.find('input').simulate('change', {
      target: {
        files: [
          { name: 'foo.png' },
        ],
      },
    });
    wrapper.find(Form).simulate('submit');
    expect(errors).toBeNull();
  });

  it('should support onPreview', () => {
    const handlePreview = jest.fn();
    const wrapper = mount(
      <Upload
        listType="picture-card"
        defaultFileList={fileList}
        onPreview={handlePreview}
      >
        <button>upload</button>
      </Upload>
    );
    wrapper.find('.anticon-eye-o').at(0).simulate('click');
    expect(handlePreview).toBeCalledWith(fileList[0]);
    wrapper.find('.anticon-eye-o').at(1).simulate('click');
    expect(handlePreview).toBeCalledWith(fileList[1]);
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
        <button>upload</button>
      </Upload>
    );
    wrapper.find('.anticon-delete').at(0).simulate('click');
    expect(handleRemove).toBeCalledWith(fileList[0]);
    wrapper.find('.anticon-delete').at(1).simulate('click');
    expect(handleRemove).toBeCalledWith(fileList[1]);
    await delay(0);
    expect(handleChange.mock.calls.length).toBe(2);
  });

  it('should generate thumbUrl from file', async () => {
    const handlePreview = jest.fn();
    const newFileList = [...fileList];
    const newFile = { ...fileList[0], uid: -3, originFileObj: new File([], 'xxx.png') };
    delete newFile.thumbUrl;
    newFileList.push(newFile);
    const wrapper = mount(
      <Upload
        listType="picture-card"
        defaultFileList={newFileList}
        onPreview={handlePreview}
      >
        <button>upload</button>
      </Upload>
    );
    wrapper.setState({});
    await delay(200);
    expect(wrapper.state().fileList[2].thumbUrl).not.toBeFalsy();
  });

  it('should non-image format file preview', () => {
    const list = [
      {
        name: 'not-image',
        status: 'done',
        uid: -3,
        url: 'https://cdn.xxx.com/aaa.zip',
        thumbUrl: 'data:application/zip;base64,UEsDBAoAAAAAADYZYkwAAAAAAAAAAAAAAAAdAAk',
        originFileObj: new File([], 'aaa.zip'),
      },
      {
        name: 'image',
        status: 'done',
        uid: -4,
        url: 'https://cdn.xxx.com/aaa',
      },
      {
        name: 'not-image',
        status: 'done',
        uid: -5,
        url: 'https://cdn.xxx.com/aaa.xx',
      },
      {
        name: 'not-image',
        status: 'done',
        uid: -6,
        url: 'https://cdn.xxx.com/aaa.png/xx.xx',
      },
      {
        name: 'image',
        status: 'done',
        uid: -7,
        url: 'https://cdn.xxx.com/xx.xx/aaa.png',
      },
      {
        name: 'image',
        status: 'done',
        uid: -8,
        url: 'https://cdn.xxx.com/xx.xx/aaa.png',
        thumbUrl: 'data:image/png;base64,UEsDBAoAAAAAADYZYkwAAAAAAAAAAAAAAAAdAAk',
      },
      {
        name: 'image',
        status: 'done',
        uid: -9,
        url: 'https://cdn.xxx.com/xx.xx/aaa.png?query=123',
      },
      {
        name: 'image',
        status: 'done',
        uid: -10,
        url: 'https://cdn.xxx.com/xx.xx/aaa.png#anchor',
      },
      {
        name: 'image',
        status: 'done',
        uid: -11,
        url: 'https://cdn.xxx.com/xx.xx/aaa.png?query=some.query.with.dot',
      },
    ];

    const wrapper = mount(
      <Upload
        listType="picture"
        defaultFileList={list}
      >
        <button>upload</button>
      </Upload>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
