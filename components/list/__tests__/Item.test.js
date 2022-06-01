import React from 'react';
import List from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('List Item Layout', () => {
  const data = [
    {
      key: 1,
      href: 'https://ant.design',
      title: `ant design`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      extra: 'extra',
    },
  ];

  it('horizontal itemLayout List which contains string nodes should not be flex container', () => {
    const { container: wrapper } = render(
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            I am <span>ant</span> design list item
          </List.Item>
        )}
      />,
    );
    expect(
      wrapper.querySelectorAll('.ant-list-item')[0].classList.contains('ant-list-item-no-flex'),
    ).toBe(true);
  });

  it('horizontal itemLayout List should be flex container by default', () => {
    const { container: wrapper } = render(
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(
      wrapper.querySelector('.ant-list-item').classList.contains('ant-list-item-no-flex'),
    ).toBe(false);
  });

  it('vertical itemLayout List should be flex container when there is extra node', () => {
    const { container: wrapper } = render(
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title} extra={item.extra}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(
      wrapper.querySelectorAll('.ant-list-item')[0].classList.contains('ant-list-item-no-flex'),
    ).toBe(false);
  });

  it('vertical itemLayout List should not be flex container when there is not extra node', () => {
    const { container: wrapper } = render(
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(
      wrapper.querySelectorAll('.ant-list-item')[0].classList.contains('ant-list-item-no-flex'),
    ).toBe(true);
  });

  it('horizontal itemLayout List should accept extra node', () => {
    const { container: wrapper } = render(
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<a key="action">Action</a>]}
            extra={<span>{item.extra}</span>}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('should render in RTL direction', () => {
    const { container: wrapper } = render(
      <ConfigProvider direction="rtl">
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<a key="action">Action</a>]}
              extra={<span>{item.extra}</span>}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </ConfigProvider>,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('rowKey could be string', () => {
    const dataWithId = [
      {
        id: 1,
        title: `ant design`,
      },
      {
        id: 2,
        title: `ant design`,
      },
      {
        id: 3,
        title: `ant design`,
      },
    ];
    const { container: wrapper } = render(
      <List
        dataSource={dataWithId}
        rowKey="id"
        renderItem={item => <List.Item>{item.title}</List.Item>}
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('rowKey could be function', () => {
    const dataWithId = [
      {
        id: 1,
        title: `ant design`,
      },
      {
        id: 2,
        title: `ant design`,
      },
      {
        id: 3,
        title: `ant design`,
      },
    ];
    const { container: wrapper } = render(
      <List
        dataSource={dataWithId}
        rowKey={item => item.id}
        renderItem={item => <List.Item>{item.title}</List.Item>}
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('should ref', () => {
    const ref = React.createRef();

    render(<List.Item ref={ref}>Item</List.Item>);
    expect(ref.current).toHaveClass('ant-list-item');
  });

  it('should grid ref', () => {
    const ref = React.createRef();

    render(
      <List grid>
        <List.Item ref={ref}>Item</List.Item>,
      </List>,
    );
    expect(ref.current).toHaveClass('ant-col');
  });
});
