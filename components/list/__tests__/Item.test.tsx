import React, { useEffect } from 'react';

import List from '..';
import type { GetRef } from '../../_util/type';
import { pureRender, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('List Item Layout', () => {
  const data = [
    {
      key: 1,
      href: 'https://ant.design',
      title: 'ant design',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=10',
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
        renderItem={(item) => (
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
        renderItem={(item) => (
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
      wrapper.querySelector('.ant-list-item')?.classList.contains('ant-list-item-no-flex'),
    ).toBe(false);
  });

  it('vertical itemLayout List should be flex container when there is extra node', () => {
    const { container: wrapper } = render(
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
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
        renderItem={(item) => (
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
        renderItem={(item) => (
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
          renderItem={(item) => (
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
        renderItem={(item) => <List.Item>{item.title}</List.Item>}
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
        rowKey={(item) => item.id}
        renderItem={(item) => <List.Item>{item.title}</List.Item>}
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('should ref', () => {
    const ref = React.createRef<GetRef<typeof List.Item>>();
    render(<List.Item ref={ref}>Item</List.Item>);
    expect(ref.current).toHaveClass('ant-list-item');
  });

  it('should grid ref', () => {
    const ref = React.createRef<GetRef<typeof List.Item>>();
    render(
      <List grid={{}}>
        <List.Item ref={ref}>Item</List.Item>,
      </List>,
    );
    expect(ref.current).toHaveClass('ant-col');
  });
  it('react key', () => {
    const loadId: number[] = [];

    const Demo = ({ id }: { id: number }) => {
      useEffect(() => {
        loadId.push(id);
      }, []);

      return <div>{id}</div>;
    };
    const getDom = (id = 1) => (
      <List
        dataSource={[{ id, title: `ant design` }]}
        rowKey={(item) => item.id}
        renderItem={(item) => (
          <List.Item>
            <Demo id={item.id} />
          </List.Item>
        )}
      />
    );
    const { rerender } = pureRender(getDom(1));
    rerender(getDom(3));
    rerender(getDom(5));
    expect(loadId).toEqual([1, 3, 5]);
  });

  it('List.Item.Meta title should have no default margin', () => {
    const { container } = render(
      <List
        dataSource={[{ id: 1, title: `ant design` }]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} />
          </List.Item>
        )}
      />,
    );

    const title = container.querySelector('.ant-list-item-meta-title');
    expect(title && getComputedStyle(title).margin).toEqual('0px 0px 4px 0px');
  });

  it('List.Item support styles and classNames', () => {
    const dataSource = [{ id: 1, title: `ant design` }];
    const getItem = (item: any, provider?: boolean) => {
      const styles = provider ? { extra: { color: 'red' }, actions: { color: 'blue' } } : undefined;
      return (
        <List.Item
          extra="test-extra"
          actions={['test-actions']}
          styles={styles}
          classNames={{ extra: 'test-extra', actions: 'test-actions' }}
        >
          {item.title}
        </List.Item>
      );
    };

    // ConfigProvider
    const { container, rerender } = render(
      <ConfigProvider
        list={{
          item: {
            styles: { extra: { color: 'pink' }, actions: { color: 'green' } },
            classNames: { extra: 'test-provider-extra', actions: 'test-provider-actions' },
          },
        }}
      >
        <List itemLayout="vertical" dataSource={dataSource} renderItem={(item) => getItem(item)} />,
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-list-item-extra')!).toHaveStyle('color: pink');
    expect(container.querySelector('.ant-list-item-action')!).toHaveStyle('color: green');

    expect(container.querySelector('.ant-list-item-extra')!).toHaveClass(
      'test-provider-extra test-extra',
    );
    expect(container.querySelector('.ant-list-item-action')!).toHaveClass(
      'test-provider-actions test-actions',
    );

    // item styles is high priority
    rerender(
      <ConfigProvider
        list={{
          item: { styles: { extra: { color: 'pink' }, actions: { color: 'green' } } },
        }}
      >
        <List
          itemLayout="vertical"
          dataSource={dataSource}
          renderItem={(item) => getItem(item, true)}
        />
        ,
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-list-item-extra')!).toHaveStyle('color: red');
    expect(container.querySelector('.ant-list-item-action')!).toHaveStyle('color: blue');
  });
});
