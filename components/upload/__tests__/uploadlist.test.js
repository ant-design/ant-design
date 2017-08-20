import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';

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
    expect(wrapper.find('.ant-upload-list-item').length).toBe(1);
  });
});
