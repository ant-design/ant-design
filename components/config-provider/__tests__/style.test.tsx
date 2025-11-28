import React from 'react';
import Masonry from 'antd/es/masonry';

import ConfigProvider from '..';
import type { SemanticClassNames, SemanticStyles } from '../../_util/hooks';
import { fireEvent, render } from '../../../tests/utils';
import Alert from '../../alert';
import Anchor from '../../anchor';
import Avatar from '../../avatar';
import Badge from '../../badge';
import Breadcrumb from '../../breadcrumb';
import Calendar from '../../calendar';
import Card from '../../card';
import Carousel from '../../carousel';
import Cascader from '../../cascader';
import Checkbox from '../../checkbox';
import Collapse from '../../collapse';
import ColorPicker from '../../color-picker';
import DatePicker from '../../date-picker';
import Descriptions from '../../descriptions';
import Divider from '../../divider';
import Drawer from '../../drawer';
import Dropdown from '../../dropdown';
import Empty from '../../empty';
import Flex from '../../flex';
import FloatButton from '../../float-button';
import Form from '../../form';
import Image from '../../image';
import Input from '../../input';
import InputNumber from '../../input-number';
import Layout from '../../layout';
import List from '../../list';
import Mentions from '../../mentions';
import Menu from '../../menu';
import type { MenuProps } from '../../menu';
import message from '../../message';
import Modal from '../../modal';
import notification from '../../notification';
import Pagination from '../../pagination';
import Progress from '../../progress';
import Radio from '../../radio';
import Rate from '../../rate';
import Result from '../../result';
import Segmented from '../../segmented';
import Select from '../../select';
import Skeleton from '../../skeleton';
import type { SemanticName as SkeletonSemanticName } from '../../skeleton/Skeleton';
import Slider from '../../slider';
import Space from '../../space';
import Spin from '../../spin';
import Splitter from '../../splitter';
import Statistic from '../../statistic';
import Steps from '../../steps';
import Switch from '../../switch';
import Table from '../../table';
import Tabs from '../../tabs';
import Tag from '../../tag';
import TimePicker from '../../time-picker';
import Timeline from '../../timeline';
import Tour from '../../tour';
import Transfer from '../../transfer';
import Tree from '../../tree';
import TreeSelect from '../../tree-select';
import Typography from '../../typography';
import Upload from '../../upload';
import Watermark from '../../watermark';

describe('ConfigProvider support style and className props', () => {
  it('Should Space classNames works', () => {
    const { container } = render(
      <ConfigProvider
        space={{
          classNames: {
            item: 'test-classNames',
          },
        }}
      >
        <Space>
          <span>Text1</span>
          <span>Text2</span>
        </Space>
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-space-item')).toHaveClass('test-classNames');
  });

  it('Should Space className works', () => {
    const { container } = render(
      <ConfigProvider
        space={{
          className: 'test-classNames',
        }}
      >
        <Space>
          <span>Text1</span>
          <span>Text2</span>
        </Space>
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-space')).toHaveClass('test-classNames');
  });

  it('Should Space styles works', () => {
    const { container } = render(
      <ConfigProvider
        space={{
          styles: {
            item: {
              color: 'rgb(255, 0, 0)',
            },
          },
        }}
      >
        <Space>
          <span>Text1</span>
          <span>Text2</span>
        </Space>
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-space-item')).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('Should Space style works', () => {
    const { container } = render(
      <ConfigProvider
        space={{
          style: {
            color: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Space>
          <span>Text1</span>
          <span>Text2</span>
        </Space>
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-space')).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('Should Divider className works', () => {
    const { container } = render(
      <ConfigProvider
        divider={{
          className: 'config-provider-className',
        }}
      >
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-divider')).toHaveClass('config-provider-className');
  });

  it('Should Divider style works', () => {
    const { container } = render(
      <ConfigProvider
        divider={{
          style: {
            color: 'rgb(255, 0, 0)',
            height: 80,
          },
        }}
      >
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-divider'))?.toHaveStyle({
      color: 'rgb(255, 0, 0)',
      height: '80px',
    });
  });

  it('Should Watermark className and style works', () => {
    const { container } = render(
      <ConfigProvider
        watermark={{
          className: 'config-provider-className',
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Watermark content="Ant Design">
          <div style={{ height: 500 }} />
        </Watermark>
      </ConfigProvider>,
    );
    expect(container.querySelector('.config-provider-className'))?.toHaveStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  it('Should Drawer className & closeIcon works', () => {
    render(
      <ConfigProvider
        drawer={{
          className: 'test-class',
          closeIcon: <span className="cp-test-close-icon">close</span>,
        }}
      >
        <Drawer title="Test Drawer" open />
      </ConfigProvider>,
    );

    const selectors = '.ant-drawer-section .ant-drawer-close .cp-test-close-icon';
    expect(document.querySelector('.ant-drawer-section')).toHaveClass('test-class');
    expect(document.querySelector<HTMLSpanElement>(selectors)).toBeTruthy();
  });

  it('Should support closable', () => {
    render(
      <ConfigProvider
        drawer={{
          closable: {
            closeIcon: <span className="cp-test-close-icon">close</span>,
            'aria-label': 'Close Btn',
          },
        }}
      >
        <Drawer title="Test Drawer" open />
      </ConfigProvider>,
    );

    const selectors = '.ant-drawer-section .ant-drawer-close .cp-test-close-icon';
    expect(document.querySelector<HTMLSpanElement>(selectors)).toBeTruthy();
    expect(document.querySelector('*[aria-label="Close Btn"]')).toBeTruthy();
  });

  it('Should Drawer style works', () => {
    render(
      <ConfigProvider
        drawer={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Drawer title="Test Drawer" style={{ fontSize: '16px' }} open />
      </ConfigProvider>,
    );

    expect(document.querySelector('.ant-drawer-section')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Carousel className works', () => {
    const { container } = render(
      <ConfigProvider
        carousel={{
          className: 'test-class',
        }}
      >
        <Carousel>
          <div>
            <h3>test item</h3>
          </div>
        </Carousel>
      </ConfigProvider>,
    );

    expect(container.querySelector('.slick-slider')).toHaveClass('test-class');
  });

  it('Should Carousel style works', () => {
    const { container } = render(
      <ConfigProvider carousel={{ style: { color: 'rgb(255, 0, 0)' } }}>
        <Carousel style={{ fontSize: '16px' }}>
          <div>
            <h3>test item 1</h3>
          </div>
          <div>
            <h3>test item 2</h3>
          </div>
        </Carousel>
      </ConfigProvider>,
    );

    expect(container.querySelector('.slick-slider')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Cascader className & style works', () => {
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];

    const { container } = render(
      <ConfigProvider
        cascader={{ className: 'cp-cascader', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Cascader open options={options} />
      </ConfigProvider>,
    );

    const element = container.querySelector<HTMLElement>('.ant-cascader');
    expect(element).toHaveClass('cp-cascader');
    expect(element).toHaveStyle({ backgroundColor: 'rgba(255, 0, 0, 1)' });
  });

  it('Should Collapse className & expandIcon works', () => {
    const items = [
      {
        key: '1',
        label: 'test label',
        children: <p>item</p>,
      },
    ];
    const { container } = render(
      <ConfigProvider
        collapse={{
          className: 'test-class',
          expandIcon: (props) => <span className="cp-test-icon">{props.isActive}</span>,
        }}
      >
        <Collapse items={items} />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-collapse')).toHaveClass('test-class');
    expect(container.querySelector<HTMLSpanElement>('.cp-test-icon')).toBeTruthy();
  });

  it('Should Collapse style works', () => {
    const items = [
      {
        key: '1',
        label: 'test label',
        children: <p>item</p>,
      },
    ];
    const { container } = render(
      <ConfigProvider
        collapse={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Collapse items={items} style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-collapse')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Typography className & style works', () => {
    const { container } = render(
      <ConfigProvider
        typography={{ className: 'cp-typography', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Typography>test</Typography>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLElement>('.ant-typography');
    expect(element).toHaveClass('cp-typography');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Skeleton className works', () => {
    const { container } = render(
      <ConfigProvider
        skeleton={{
          className: 'test-class',
        }}
      >
        <Skeleton />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-skeleton')).toHaveClass('test-class');
  });

  it('Should Skeleton style works', () => {
    const { container } = render(
      <ConfigProvider
        skeleton={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Skeleton style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-skeleton')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Skeleton classNames & styles works', () => {
    const rootStyle = { background: 'rgba(117, 121, 124, 0.8)' };
    const headerStyle = { background: 'rgba(0, 123, 255, 0.8)' };
    const sectionStyle = { background: 'rgba(8, 32, 57, 0.8)' };
    const avatarStyle = { background: 'rgba(38, 49, 60, 0.8)' };
    const titleStyle = { background: 'rgba(0, 255, 17, 0.8)' };
    const paragraphStyle = { background: 'rgba(255, 111, 0, 0.8)' };

    const customStyles: SemanticStyles<SkeletonSemanticName> = {
      root: rootStyle,
      header: headerStyle,
      section: sectionStyle,
      avatar: avatarStyle,
      title: titleStyle,
      paragraph: paragraphStyle,
    };

    const customClassNames: Required<SemanticClassNames<SkeletonSemanticName>> = {
      root: 'custom-root',
      header: 'custom-header',
      section: 'custom-section',
      avatar: 'custom-avatar',
      title: 'custom-title',
      paragraph: 'custom-paragraph',
    };

    const { container } = render(
      <ConfigProvider skeleton={{ styles: customStyles, classNames: customClassNames }}>
        <Skeleton avatar />
      </ConfigProvider>,
    );

    const rootElement = container.querySelector('.ant-skeleton');
    expect(rootElement).toHaveStyle(rootStyle);
    expect(rootElement).toHaveClass(customClassNames.root);

    const headerElement = container.querySelector('.ant-skeleton-header');
    expect(headerElement).toHaveStyle(headerStyle);
    expect(headerElement).toHaveClass(customClassNames.header);

    const sectionElement = container.querySelector('.ant-skeleton-section');
    expect(sectionElement).toHaveStyle(sectionStyle);
    expect(sectionElement).toHaveClass(customClassNames.section);

    const avatarElement = container.querySelector('.ant-skeleton-avatar');
    expect(avatarElement).toHaveStyle(avatarStyle);
    expect(avatarElement).toHaveClass(customClassNames.avatar);

    const titleElement = container.querySelector('.ant-skeleton-title');
    expect(titleElement).toHaveStyle(titleStyle);
    expect(titleElement).toHaveClass(customClassNames.title);

    const paragraphElement = container.querySelector('.ant-skeleton-paragraph');
    expect(paragraphElement).toHaveStyle(paragraphStyle);
    expect(paragraphElement).toHaveClass(customClassNames.paragraph);
  });

  it('Should Spin className & style works', () => {
    const { container } = render(
      <ConfigProvider
        spin={{ className: 'config-provider-spin', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Spin />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-spin');
    expect(element).toHaveClass('config-provider-spin');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Statistic className works', () => {
    const { container } = render(
      <ConfigProvider
        statistic={{
          className: 'test-class',
        }}
      >
        <Statistic title="Test Title" value={100} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-statistic')).toHaveClass('test-class');
  });

  it('Should Statistic style works', () => {
    const { container } = render(
      <ConfigProvider
        statistic={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Statistic style={{ fontSize: '16px' }} title="Test Title" value={100} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-statistic')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Segmented className & style works', () => {
    const { container } = render(
      <ConfigProvider
        segmented={{
          className: 'config-provider-segmented',
          style: { backgroundColor: 'rgb(255, 0, 0)' },
        }}
      >
        <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-segmented');
    expect(element).toHaveClass('config-provider-segmented');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Select className & style works', () => {
    const { container } = render(
      <ConfigProvider
        select={{ className: 'cp-select', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Select
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
          ]}
        />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-select');
    expect(element).toHaveClass('cp-select');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Steps className & style works', () => {
    const { container } = render(
      <ConfigProvider
        steps={{ className: 'config-provider-steps', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Steps items={[{ title: 'title', description: 'description' }]} />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-steps');
    expect(element).toHaveClass('config-provider-steps');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Form className & style works', () => {
    const { container } = render(
      <ConfigProvider form={{ className: 'cp-form', style: { backgroundColor: 'rgb(255, 0, 0)' } }}>
        <Form name="basic">
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Form>
      </ConfigProvider>,
    );

    const element = container.querySelector<HTMLDivElement>('.ant-form');
    expect(element).toHaveClass('cp-form');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Image className & style & closeIcon works', () => {
    const { container, baseElement } = render(
      <ConfigProvider
        image={{
          className: 'config-provider-image',
          style: { backgroundColor: 'rgb(255, 0, 0)' },
          preview: { closeIcon: <span className="cp-test-closeIcon">cp-test-closeIcon</span> },
        }}
      >
        <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </ConfigProvider>,
    );
    const element = container?.querySelector<HTMLImageElement>('.ant-image img');
    expect(element).toHaveClass('config-provider-image');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    fireEvent.click(container.querySelector<HTMLDivElement>('.ant-image')!);
    expect(
      baseElement.querySelector<HTMLSpanElement>('.ant-image-preview-close .cp-test-closeIcon'),
    ).toBeTruthy();
  });

  it('Should Input className & style & classNames & styles & autoComplete & allowClear works', () => {
    const { container } = render(
      <ConfigProvider
        input={{
          className: 'cp-input',
          style: { backgroundColor: 'rgb(255, 0, 0)' },
          classNames: {
            input: 'cp-classNames-input',
            prefix: 'cp-classNames-prefix',
          },
          styles: {
            input: {
              color: 'rgb(0, 0, 255)',
            },
            prefix: {
              color: 'black',
            },
          },
          allowClear: {
            clearIcon: <span className="cp-test-icon">cp-test-icon</span>,
          },
          autoComplete: 'test-cp-autocomplete',
        }}
      >
        <Input
          autoComplete="test-autocomplete"
          placeholder="Basic usage"
          value="test"
          prefix="￥"
        />
      </ConfigProvider>,
    );

    const wrapperElement = container.querySelector<HTMLSpanElement>('.ant-input-affix-wrapper');
    expect(wrapperElement).toHaveClass('cp-input');
    expect(wrapperElement).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });

    const prefixElement = container.querySelector<HTMLDivElement>('.ant-input-prefix');
    expect(prefixElement).toHaveClass('cp-classNames-prefix');
    expect(prefixElement).toHaveStyle({ color: 'rgb(0, 0, 0)' });

    const inputElement = container.querySelector<HTMLDivElement>('.ant-input');
    expect(inputElement).toHaveClass('cp-classNames-input');
    expect(inputElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(inputElement?.getAttribute('autocomplete')).toBe('test-autocomplete');
    expect(inputElement?.getAttribute('autocomplete')).not.toBe('test-cp-autocomplete');
    expect(
      container?.querySelector<HTMLSpanElement>('.ant-input-affix-wrapper .cp-test-icon'),
    ).toBeTruthy();
  });

  it('Should Input.TextArea autoComplete & className & style & classNames & styles & allowClear works', () => {
    const { container } = render(
      <ConfigProvider
        textArea={{
          className: 'cp-textArea',
          style: { backgroundColor: 'rgb(255, 255, 0)' },
          classNames: {
            textarea: 'cp-classNames-textArea',
            count: 'cp-classNames-count',
          },
          styles: {
            textarea: {
              color: 'rgb(0, 0, 255)',
            },
            count: {
              color: 'rgb(255, 0, 0)',
            },
          },
          allowClear: {
            clearIcon: <span className="cp-test-icon">cp-test-icon</span>,
          },
          autoComplete: 'test-cp-autocomplete',
        }}
      >
        <Input.TextArea
          autoComplete="test-autocomplete"
          placeholder="Basic usage"
          value="test"
          prefix="￥"
          count={{ show: true }}
        />
      </ConfigProvider>,
    );
    const wrapperElement = container.querySelector<HTMLSpanElement>('.ant-input-affix-wrapper');
    expect(wrapperElement).toHaveClass('cp-textArea');
    expect(wrapperElement).toHaveStyle({ backgroundColor: 'rgb(255, 255, 0)' });

    const inputElement = container.querySelector<HTMLTextAreaElement>('.ant-input');
    expect(inputElement).toHaveClass('cp-classNames-textArea');
    expect(inputElement).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(inputElement?.getAttribute('autocomplete')).toBe('test-autocomplete');
    expect(inputElement?.getAttribute('autocomplete')).not.toBe('test-cp-autocomplete');

    const countElement = container.querySelector<HTMLSpanElement>(
      '.ant-input-affix-wrapper .ant-input-data-count',
    );
    expect(countElement).toHaveClass('cp-classNames-count');
    expect(countElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    expect(
      container?.querySelector<HTMLSpanElement>('.ant-input-affix-wrapper .cp-test-icon'),
    ).toBeTruthy();
  });

  it('Should Layout className & style works', () => {
    const { baseElement } = render(
      <ConfigProvider
        layout={{
          className: 'cp-layout',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Layout>
          <Layout.Header>Header</Layout.Header>
          <Layout.Content>Content</Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
      </ConfigProvider>,
    );

    const element = baseElement.querySelector<HTMLDivElement>('.ant-layout');
    expect(element).toHaveClass('cp-layout');
    expect(element).toHaveStyle({ background: 'rgb(255, 0, 0)' });
  });

  it('Should List className works', () => {
    const listData = [
      {
        title: 'Test Title',
      },
    ];
    const { container } = render(
      <ConfigProvider
        list={{
          className: 'test-class',
        }}
      >
        <List dataSource={listData} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-list')).toHaveClass('test-class');
  });

  it('Should List style works', () => {
    const listData = [
      {
        title: 'Test Title',
      },
    ];
    const { container } = render(
      <ConfigProvider
        list={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <List style={{ fontSize: '16px' }} dataSource={listData} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-list')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Masonry props works', () => {
    const { container } = render(
      <ConfigProvider>
        <Masonry
          className="bamboo"
          classNames={{
            root: 'light',
            item: 'little',
          }}
          style={{ color: 'rgb(255, 0, 0)' }}
          styles={{
            root: {
              background: 'rgb(0, 255, 0)',
            },
            item: {
              background: 'rgb(0, 0, 255)',
            },
          }}
          columns={1}
          items={[{ key: 0, data: 0, children: '-' }]}
        />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-masonry')).toHaveClass('bamboo');
    expect(container.querySelector('.ant-masonry')).toHaveClass('light');
    expect(container.querySelector('.ant-masonry-item')).toHaveClass('little');
    expect(container.querySelector('.ant-masonry')).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      background: 'rgb(0, 255, 0)',
    });
    expect(container.querySelector('.ant-masonry-item')).toHaveStyle({
      background: 'rgb(0, 0, 255)',
    });
  });

  it('Should Menu className & expandIcon works', () => {
    const menuItems: MenuProps['items'] = [
      {
        label: <span>Test Label</span>,
        key: 'test',
        children: [
          {
            label: <span>Test Label children</span>,
            key: 'test-children',
          },
        ],
      },
    ];
    const App: React.FC<{ expand?: React.ReactNode }> = ({ expand }) => (
      <ConfigProvider menu={{ className: 'test-class', expandIcon: expand }}>
        <Menu items={menuItems} />
      </ConfigProvider>
    );
    const { container, rerender } = render(<App />);
    expect(container.querySelector<HTMLElement>('.ant-menu')).toHaveClass('test-class');
    rerender(<App expand={<span className="test-cp-icon">test-cp-icon</span>} />);
    expect(container.querySelector<HTMLSpanElement>('.ant-menu .test-cp-icon')).toBeTruthy();
    rerender(<App expand={null} />);
    expect(container.querySelector<HTMLElement>('.ant-menu-submenu-arrow')).toBeFalsy();
    rerender(<App expand={false} />);
    expect(container.querySelector<HTMLElement>('.ant-menu-submenu-arrow')).toBeFalsy();
  });

  it('Should Menu style works', () => {
    const menuItems = [
      {
        label: 'Test Label',
        key: 'test',
      },
    ];
    const { container } = render(
      <ConfigProvider
        menu={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Menu items={menuItems} style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-menu')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Mentions className & style works', () => {
    const { container } = render(
      <ConfigProvider
        mentions={{
          className: 'cp-className',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Mentions
          defaultValue="@afc163"
          options={[
            {
              value: 'afc163',
              label: 'afc163',
            },
            {
              value: 'zombieJ',
              label: 'zombieJ',
            },
            {
              value: 'yesmeck',
              label: 'yesmeck',
            },
          ]}
        />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-mentions')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-mentions')).toHaveStyle({ background: 'rgb(255, 0, 0)' });
  });

  it('Should Modal className & style & closeIcon works', () => {
    const { baseElement } = render(
      <ConfigProvider
        modal={{
          className: 'cp-modal',
          style: { background: 'rgb(255, 0, 0)' },
          closeIcon: <span className="cp-test-closeIcon">cp-test-closeIcon</span>,
        }}
      >
        <Modal open>test</Modal>
      </ConfigProvider>,
    );
    const selectors = '.ant-modal-container .ant-modal-close .cp-test-closeIcon';
    const element = baseElement.querySelector<HTMLDivElement>('.ant-modal');
    expect(element).toHaveClass('cp-modal');
    expect(element).toHaveStyle({ background: 'rgb(255, 0, 0)' });
    expect(element?.querySelector<HTMLSpanElement>(selectors)).toBeTruthy();
  });

  it('Should Result className & style works', () => {
    const { container } = render(
      <ConfigProvider
        result={{ className: 'cp-result', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Result />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-result');
    expect(element).toHaveClass('cp-result');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Radio className & style works', () => {
    const { container } = render(
      <ConfigProvider
        radio={{
          className: 'cp-className',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Radio>Radio</Radio>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-radio-wrapper')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-radio-wrapper')).toHaveStyle({
      background: 'rgb(255, 0, 0)',
    });
  });

  it('Should Slider className & style works', () => {
    const { container } = render(
      <ConfigProvider
        slider={{ className: 'cp-slider', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Slider />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-slider');
    expect(element).toHaveClass('cp-slider');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Alert className works', () => {
    const { container, rerender } = render(
      <ConfigProvider
        alert={{
          className: 'test-class',
          closeIcon: <span className="cp-test-icon">cp-test-icon</span>,
          closable: { 'aria-label': 'close' },
        }}
      >
        <Alert title="Test Message" />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLDivElement>('.ant-alert')).toHaveClass('test-class');
    expect(container.querySelector<HTMLSpanElement>('.ant-alert .cp-test-icon')).toBeTruthy();
    expect(container.querySelectorAll('*[aria-label="close"]')).toBeTruthy();
    rerender(
      <ConfigProvider
        alert={{
          className: 'test-class',
          closable: {
            'aria-label': 'close',
            closeIcon: <span className="cp-test-icon">cp-test-icon</span>,
          },
        }}
      >
        <Alert title="Test Message" />
      </ConfigProvider>,
    );

    expect(container.querySelector<HTMLDivElement>('.ant-alert')).toHaveClass('test-class');
    expect(container.querySelector<HTMLSpanElement>('.ant-alert .cp-test-icon')).toBeTruthy();
    expect(container.querySelectorAll('*[aria-label="close"]')).toBeTruthy();
  });

  it('Should Alert style works', () => {
    const { container } = render(
      <ConfigProvider alert={{ style: { color: 'rgb(255, 0, 0)' } }}>
        <Alert style={{ fontSize: '16px' }} title="Test Message" />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-alert')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Anchor className & style works', () => {
    const { container } = render(
      <ConfigProvider
        anchor={{
          className: 'cp-className',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Anchor
          items={[
            {
              key: 'part-1',
              href: '#part-1',
              title: 'Part 1',
            },
            {
              key: 'part-2',
              href: '#part-2',
              title: 'Part 2',
            },
          ]}
        />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-anchor-wrapper')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-anchor-wrapper')).toHaveStyle({
      background: 'rgb(255, 0, 0)',
    });
  });

  it('Should Breadcrumb className & style works', () => {
    const { container } = render(
      <ConfigProvider
        breadcrumb={{ className: 'cp-breadcrumb', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Breadcrumb />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLElement>('.ant-breadcrumb');
    expect(element).toHaveClass('cp-breadcrumb');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Checkbox className & style works', () => {
    const { container } = render(
      <ConfigProvider
        checkbox={{
          className: 'cp-checkbox',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Checkbox>Checkbox</Checkbox>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-checkbox-wrapper')).toHaveClass('cp-checkbox');
    expect(container.querySelector('.ant-checkbox-wrapper')).toHaveStyle({
      background: 'rgb(255, 0, 0)',
    });
  });

  it('Should Pagination className & style works', () => {
    const { container } = render(
      <ConfigProvider
        pagination={{ className: 'cp-pagination', style: { backgroundColor: 'rgb(0, 0, 255)' } }}
      >
        <Pagination />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLUListElement>('.ant-pagination');
    expect(element).toHaveClass('cp-pagination');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });

  it('Should Progress className works', () => {
    const { container } = render(
      <ConfigProvider
        progress={{
          className: 'test-class',
        }}
      >
        <Progress />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-progress')).toHaveClass('test-class');
  });

  it('Should Progress style works', () => {
    const { container } = render(
      <ConfigProvider
        progress={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Progress style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-progress')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Descriptions className & style works', () => {
    const { container } = render(
      <ConfigProvider
        descriptions={{
          className: 'cp-className',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Descriptions title="User Info">
          <Descriptions.Item label="UserName">muxin</Descriptions.Item>
        </Descriptions>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-descriptions')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-descriptions')).toHaveStyle({
      background: 'rgb(255, 0, 0)',
    });
  });

  it('Should Empty className & style works', () => {
    const { container } = render(
      <ConfigProvider
        empty={{
          className: 'cp-className',
          style: {
            background: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Empty />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-empty')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-empty')).toHaveStyle({ background: 'rgb(255, 0, 0)' });
  });

  it('Should Badge className & style & classNames works', () => {
    const { container } = render(
      <ConfigProvider
        badge={{
          className: 'cp-badge',
          style: {
            backgroundColor: 'rgb(0, 0, 255)',
          },
          classNames: {
            root: 'cp-badge-root',
            indicator: 'cp-badge-indicator',
          },
          styles: {
            root: { color: 'rgb(255, 255, 0)' },
            indicator: { color: 'rgb(0, 128, 0)' },
          },
        }}
      >
        <Badge count={10}>test</Badge>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-badge');

    // test className
    expect(element).toHaveClass('cp-badge');
    expect(element).toHaveClass('cp-badge-root');
    expect(element?.querySelector<HTMLElement>('sup')).toHaveClass('cp-badge-indicator');

    // test style
    expect(element).toHaveStyle({ color: 'rgb(255, 255, 0)' });
    expect(element?.querySelector<HTMLElement>('sup')).toHaveStyle({
      color: 'rgb(0, 128, 0)',
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });

  it('Should Rate className & style works', () => {
    const { container } = render(
      <ConfigProvider rate={{ className: 'cp-rate', style: { backgroundColor: 'rgb(0, 0, 255)' } }}>
        <Rate />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLUListElement>('.ant-rate');
    expect(element).toHaveClass('cp-rate');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });

  it('Should Switch className & style works', () => {
    const { container } = render(
      <ConfigProvider
        switch={{ className: 'cp-switch', style: { backgroundColor: 'rgb(0, 0, 255)' } }}
      >
        <Switch />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLButtonElement>('.ant-switch');
    expect(element).toHaveClass('cp-switch');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });

  it('Should Avatar className & style works', () => {
    const { container } = render(
      <ConfigProvider
        avatar={{ className: 'cp-avatar', style: { backgroundColor: 'rgb(0, 0, 255)' } }}
      >
        <Avatar />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-avatar');
    expect(element).toHaveClass('cp-avatar');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });

  it('Should Tag className & style & closeIcon works', () => {
    const { container } = render(
      <ConfigProvider
        tag={{
          className: 'cp-tag',
          style: { backgroundColor: 'rgb(0, 0, 255)' },
          closeIcon: <span className="cp-test-closeIcon">cp-test-closeIcon</span>,
        }}
      >
        <Tag>Test</Tag>
        <Tag.CheckableTag checked>CheckableTag</Tag.CheckableTag>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-tag');
    expect(element).toHaveClass('cp-tag');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });

    const checkableElement = container.querySelector<HTMLSpanElement>('.ant-tag-checkable');
    expect(checkableElement).toHaveClass('cp-tag');
    expect(checkableElement).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
    expect(element?.querySelector<HTMLSpanElement>('.cp-test-closeIcon')).toBeTruthy();
  });

  it('Should Tag support aria-* in closable', () => {
    const { container } = render(
      <ConfigProvider
        tag={{
          closable: {
            closeIcon: <span className="cp-test-closeIcon">cp-test-closeIcon</span>,
            'aria-label': 'Close Tag',
          },
        }}
      >
        <Tag>Test</Tag>
        <Tag.CheckableTag checked>CheckableTag</Tag.CheckableTag>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-tag');
    expect(element?.querySelector('.ant-tag-close-icon')).toBeTruthy();
    expect(element?.querySelector('.ant-tag-close-icon')?.getAttribute('aria-label')).toBe(
      'Close Tag',
    );
    expect(element?.querySelector('.cp-test-closeIcon')).toBeTruthy();
  });

  it('Should Tag hide closeIcon when closeIcon=false', () => {
    const { container } = render(
      <ConfigProvider
        tag={{
          closeIcon: false,
        }}
      >
        <Tag>Test</Tag>
        <Tag.CheckableTag checked>CheckableTag</Tag.CheckableTag>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-tag');
    expect(element?.querySelector('.ant-tag-close-icon')).toBeFalsy();
  });

  it('Should Tag show default closeIcon when closeIcon=true', () => {
    const { container } = render(
      <ConfigProvider
        tag={{
          closeIcon: true,
        }}
      >
        <Tag>Test</Tag>
        <Tag.CheckableTag checked>CheckableTag</Tag.CheckableTag>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.ant-tag');
    expect(element?.querySelector('.ant-tag-close-icon')).toBeTruthy();
    expect(element?.querySelector('.anticon-close')).toBeTruthy();
  });

  it('Should Table className & style works', () => {
    const { container } = render(
      <ConfigProvider
        table={{
          className: 'cp-table',
          style: { backgroundColor: 'rgb(0, 0, 255)' },
          expandable: { expandIcon: () => <span className="cp-test-icon">cp-test-icon</span> },
        }}
      >
        <Table
          columns={[{ title: 'Address', dataIndex: 'address', key: 'address 1', ellipsis: true }]}
          dataSource={[{ key: '1', name: 'Jim Green', age: 40, address: 'test', tags: ['loser'] }]}
        />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-table-wrapper');
    expect(element).toHaveClass('cp-table');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
    expect(container.querySelector<HTMLSpanElement>('.ant-table-tbody .cp-test-icon')).toBeTruthy();
  });

  it('Should Table classNames & styles works', () => {
    const { container } = render(
      <ConfigProvider
        table={{
          classNames: {
            header: {
              wrapper: 'cp-header-wrapper',
              row: 'cp-header-row',
              cell: 'cp-header-cell',
            },
            body: {
              wrapper: 'cp-body-wrapper',
              row: 'cp-body-row',
              cell: 'cp-body-cell',
            },
          },
          styles: {
            header: {
              wrapper: { backgroundColor: 'rgb(255, 0, 0)' },
              row: { backgroundColor: 'rgb(0, 255, 0)' },
              cell: { color: 'rgb(0, 0, 255)' },
            },
            body: {
              wrapper: { backgroundColor: 'rgb(255, 255, 0)' },
              row: { backgroundColor: 'rgb(255, 0, 255)' },
              cell: { color: 'rgb(0, 255, 255)' },
            },
          },
        }}
      >
        <Table
          columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
          dataSource={[{ key: '1', name: 'Jim Green' }]}
        />
      </ConfigProvider>,
    );

    // Check header classNames & styles
    const headerWrapper = container.querySelector<HTMLElement>('.ant-table-thead');
    expect(headerWrapper).toHaveClass('cp-header-wrapper');
    expect(headerWrapper).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });

    const headerRow = container.querySelector<HTMLElement>('.ant-table-thead tr');
    expect(headerRow).toHaveClass('cp-header-row');
    expect(headerRow).toHaveStyle({ backgroundColor: 'rgb(0, 255, 0)' });

    const headerCell = container.querySelector<HTMLElement>('.ant-table-thead th');
    expect(headerCell).toHaveClass('cp-header-cell');
    expect(headerCell).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    // Check body classNames & styles
    const bodyWrapper = container.querySelector<HTMLElement>('.ant-table-tbody');
    expect(bodyWrapper).toHaveClass('cp-body-wrapper');
    expect(bodyWrapper).toHaveStyle({ backgroundColor: 'rgb(255, 255, 0)' });

    const bodyRow = container.querySelector<HTMLElement>('.ant-table-tbody tr');
    expect(bodyRow).toHaveClass('cp-body-row');
    expect(bodyRow).toHaveStyle({ backgroundColor: 'rgb(255, 0, 255)' });

    const bodyCell = container.querySelector<HTMLElement>('.ant-table-tbody td');
    expect(bodyCell).toHaveClass('cp-body-cell');
    expect(bodyCell).toHaveStyle({ color: 'rgb(0, 255, 255)' });
  });

  it('Should Calendar className works', () => {
    const { container } = render(
      <ConfigProvider
        calendar={{
          className: 'test-class',
        }}
      >
        <Calendar />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker-calendar')).toHaveClass('test-class');
  });

  it('Should Calendar style works', () => {
    const { container } = render(
      <ConfigProvider
        calendar={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Calendar style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker-calendar')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Card className & style & classNames & styles works', () => {
    const { container } = render(
      <ConfigProvider
        card={{
          className: 'cp-card',
          style: { backgroundColor: 'rgb(0, 0, 255)' },
          classNames: { body: 'custom-body' },
          styles: { body: { color: 'rgb(255, 0, 0)' } },
        }}
      >
        <Card>test</Card>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-card');
    expect(element).toHaveClass('cp-card');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
    const head = container.querySelector<HTMLDivElement>('.ant-card-body');
    expect(head).toHaveClass('custom-body');
    expect(head).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('Should Tabs className & style & addIcon & moreIcon & removeIcon works', () => {
    const { container } = render(
      <ConfigProvider
        tabs={{
          className: 'cp-tabs',
          style: { backgroundColor: 'rgb(255, 0, 0)' },
          addIcon: <span className="cp-test-addIcon">cp-test-addIcon</span>,
          more: { icon: <span className="cp-test-moreIcon">cp-test-moreIcon</span> },
          removeIcon: <span className="cp-test-removeIcon">cp-test-removeIcon</span>,
        }}
      >
        <Tabs
          type="editable-card"
          items={[{ key: '1', label: <span>tab</span>, children: <span>children</span> }]}
        />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-tabs');
    expect(element).toHaveClass('cp-tabs');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    expect(element?.querySelector<HTMLSpanElement>('.cp-test-addIcon')).toBeTruthy();
    expect(element?.querySelector<HTMLSpanElement>('.cp-test-moreIcon')).toBeTruthy();
    expect(element?.querySelector<HTMLSpanElement>('.cp-test-removeIcon')).toBeTruthy();
  });

  it('Should TimePicker className works', () => {
    const { container } = render(
      <ConfigProvider
        timePicker={{
          className: 'test-class',
        }}
      >
        <TimePicker />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker')).toHaveClass('test-class');
  });

  it('Should TimePicker style works', () => {
    const { container } = render(
      <ConfigProvider
        timePicker={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <TimePicker style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should RangePicker className works', () => {
    const { RangePicker } = TimePicker;
    const { container } = render(
      <ConfigProvider
        rangePicker={{
          className: 'test-class',
        }}
      >
        <RangePicker />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-picker')).toHaveClass('test-class');
  });

  it('Should RangePicker style works', () => {
    const { RangePicker } = TimePicker;
    const { container } = render(
      <ConfigProvider
        rangePicker={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <RangePicker style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-picker')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should message className & style works', () => {
    const Demo: React.FC = () => {
      const [messageApi, contextHolder] = message.useMessage();
      return (
        <ConfigProvider message={{ className: 'cp-message', style: { color: 'rgb(0, 0, 255)' } }}>
          {contextHolder}
          <button type="button" onClick={() => messageApi.success('success')}>
            test
          </button>
        </ConfigProvider>
      );
    };
    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector<HTMLButtonElement>('button')!);
    const element = document
      ?.querySelector<HTMLDivElement>('.ant-message')
      ?.querySelector<HTMLDivElement>('.ant-message-notice');
    expect(element).toHaveClass('cp-message');
    expect(element).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('Should Upload className & style works', () => {
    const { container } = render(
      <ConfigProvider upload={{ className: 'cp-upload', style: { color: 'rgb(0, 0, 255)' } }}>
        <Upload type="drag">upload</Upload>
      </ConfigProvider>,
    );
    const element = container?.querySelector<HTMLSpanElement>('.ant-upload-wrapper');
    expect(element).toHaveClass('cp-upload');
    expect(element?.querySelector<HTMLDivElement>('.ant-upload')).toHaveStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it('Should notification className & style & closeIcon works', () => {
    const Demo: React.FC = () => {
      const [api, holder] = notification.useNotification();
      return (
        <ConfigProvider
          notification={{
            className: 'cp-notification',
            style: { color: 'rgb(0, 0, 255)' },
            closeIcon: <span className="cp-test-icon">cp-test-icon</span>,
          }}
        >
          <button type="button" onClick={() => api.open({ title: 'test', duration: 0 })}>
            test
          </button>
          {holder}
        </ConfigProvider>
      );
    };
    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector<HTMLButtonElement>('button')!);
    const element = document
      ?.querySelector<HTMLDivElement>('.ant-notification')
      ?.querySelector<HTMLDivElement>('.ant-notification-notice');
    expect(element).toHaveClass('cp-notification');
    expect(element).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(element?.querySelector<HTMLSpanElement>('.ant-notification .cp-test-icon')).toBeTruthy();
  });

  it('Should Timeline className works', () => {
    const items = [
      {
        children: 'test item',
      },
    ];

    const { container } = render(
      <ConfigProvider
        timeline={{
          className: 'test-class',
        }}
      >
        <Timeline items={items} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-timeline')).toHaveClass('test-class');
  });

  it('Should Timeline style works', () => {
    const items = [
      {
        children: 'test item',
      },
    ];

    const { container } = render(
      <ConfigProvider
        timeline={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Timeline items={items} style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-timeline')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Transfer className works', () => {
    const mockData = [
      {
        key: '0-0',
        title: `content`,
        description: `description of content`,
      },
    ];

    const { container } = render(
      <ConfigProvider
        transfer={{
          className: 'test-class',
          selectionsIcon: <span className="cp-test-selectionsIcon">cp-test-selectionsIcon</span>,
        }}
      >
        <Transfer dataSource={mockData} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-transfer')).toHaveClass('test-class');
    expect(container.querySelector<HTMLSpanElement>('.cp-test-selectionsIcon')).toBeTruthy();
  });

  it('Should Transfer style works', () => {
    const mockData = [
      {
        key: '0-0',
        title: `content`,
        description: `description of content`,
      },
    ];

    const { container } = render(
      <ConfigProvider
        transfer={{
          style: {
            color: 'rgb(255, 0, 0)',
          },
        }}
      >
        <Transfer dataSource={mockData} style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-transfer')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Tree className works', () => {
    const treeData = [
      {
        title: 'test-title',
        key: '0-0',
      },
    ];

    const { container } = render(
      <ConfigProvider
        tree={{
          className: 'test-class',
        }}
      >
        <Tree treeData={treeData} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-tree')).toHaveClass('test-class');
  });

  it('Should Tree style works', () => {
    const treeData = [
      {
        title: 'test-title',
        key: '0-0',
      },
    ];

    const { container } = render(
      <ConfigProvider
        tree={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <Tree treeData={treeData} style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-tree-list')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px; position: relative;',
    );
  });

  it('Should ColorPicker className & style works', () => {
    const { container } = render(
      <ConfigProvider
        colorPicker={{ className: 'cp-colorPicker', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <ColorPicker />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-color-picker-trigger');
    expect(element).toHaveClass('cp-colorPicker');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should DatePicker className works', () => {
    const { container } = render(
      <ConfigProvider
        datePicker={{
          className: 'test-class',
        }}
      >
        <DatePicker />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker')).toHaveClass('test-class');
  });

  it('Should DatePicker style works', () => {
    const { container } = render(
      <ConfigProvider
        datePicker={{
          style: { color: 'rgb(255, 0, 0)' },
        }}
      >
        <DatePicker style={{ fontSize: '16px' }} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker')).toHaveStyle(
      'color: rgb(255, 0, 0); font-size: 16px;',
    );
  });

  it('Should Flex className & style works', () => {
    const { container } = render(
      <ConfigProvider flex={{ className: 'cp-flex', style: { backgroundColor: 'rgb(0, 0, 255)' } }}>
        <Flex>test</Flex>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-flex');
    expect(element).toHaveClass('cp-flex');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });

  it('Should Dropdown className & style works', () => {
    const { container } = render(
      <ConfigProvider
        dropdown={{ className: 'cp-dropdown', style: { backgroundColor: 'rgb(255, 0, 0)' } }}
      >
        <Dropdown menu={{ items: [{ label: 'foo', key: '1' }] }} open>
          <span>test</span>
        </Dropdown>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-dropdown');
    expect(element).toHaveClass('cp-dropdown');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });

  it('Should Splitter className & style works', () => {
    const { container } = render(
      <ConfigProvider
        splitter={{ className: 'cp-splitter', style: { backgroundColor: 'rgb(255, 255, 0)' } }}
      >
        <Splitter>test</Splitter>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-splitter');
    expect(element).toHaveClass('cp-splitter');
    expect(element).toHaveStyle({ backgroundColor: 'rgb(255, 255, 0)' });
  });

  it('Should Tour closeIcon works', () => {
    const { container } = render(
      <ConfigProvider
        tour={{ closeIcon: <span className="cp-test-closeIcon">cp-test-closeIcon</span> }}
      >
        <Tour steps={[{ title: 'test' }]} open />
      </ConfigProvider>,
    );
    const selectors = '.ant-tour .ant-tour-section .ant-tour-close .cp-test-closeIcon';
    const element = container.querySelector<HTMLSpanElement>(selectors);
    expect(element).toBeTruthy();
  });

  it('Should FloatButton.Group closeIcon works', () => {
    const { container } = render(
      <ConfigProvider
        floatButtonGroup={{ closeIcon: <span className="test-cp-icon">test-cp-icon</span> }}
      >
        <FloatButton.Group trigger="click" open>
          <FloatButton />
        </FloatButton.Group>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLSpanElement>('.test-cp-icon');
    expect(element).toBeTruthy();
  });

  it('should variant config work', () => {
    const { container } = render(
      <ConfigProvider
        input={{ variant: 'filled' }}
        inputNumber={{ variant: 'filled' }}
        textArea={{ variant: 'filled' }}
        mentions={{ variant: 'borderless' }}
        select={{ variant: 'filled' }}
        cascader={{ variant: 'outlined' }}
        treeSelect={{ variant: 'borderless' }}
        datePicker={{ variant: 'filled' }}
        rangePicker={{ variant: 'filled' }}
        timePicker={{ variant: 'borderless' }}
      >
        <Input className="input-variant" />
        <InputNumber className="input-number-variant" />
        <Input.TextArea className="textarea-variant" />
        <Mentions className="mentions-variant" />
        <Select className="select-variant" />
        <Cascader className="cascader-variant" />
        <TreeSelect className="tree-select-variant" />
        <DatePicker className="date-picker-variant" />
        <DatePicker.RangePicker className="range-picker-variant" />
        <TimePicker className="time-picker-variant" />
      </ConfigProvider>,
    );

    expect(container.querySelector('.input-variant')).toHaveClass('ant-input-filled');
    expect(container.querySelector('.input-number-variant')).toHaveClass('ant-input-number-filled');
    expect(container.querySelector('.textarea-variant')).toHaveClass('ant-input-filled');
    expect(container.querySelector('.mentions-variant')).toHaveClass('ant-mentions-borderless');
    expect(container.querySelector('.select-variant')).toHaveClass('ant-select-filled');
    expect(container.querySelector('.cascader-variant')).toHaveClass('ant-select-outlined');
    expect(container.querySelector('.tree-select-variant')).toHaveClass('ant-select-borderless');
    expect(container.querySelector('.date-picker-variant')).toHaveClass('ant-picker-filled');
    expect(container.querySelector('.range-picker-variant')).toHaveClass('ant-picker-filled');
    expect(container.querySelector('.time-picker-variant')).toHaveClass('ant-picker-borderless');
  });
});
