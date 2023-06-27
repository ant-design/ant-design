import React from 'react';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Anchor from '../../anchor';
import Breadcrumb from '../../breadcrumb';
import Checkbox from '../../checkbox';
import Descriptions from '../../descriptions';
import Divider from '../../divider';
import Empty from '../../empty';
import Image from '../../image';
import Mentions from '../../mentions';
import Pagination from '../../pagination';
import Radio from '../../radio';
import Result from '../../result';
import Segmented from '../../segmented';
import Select from '../../select';
import Slider from '../../slider';
import Space from '../../space';
import Spin from '../../spin';
import Steps from '../../steps';
import Typography from '../../typography';

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
              color: 'red',
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
    expect(container.querySelector('.ant-space-item')).toHaveStyle(
      'margin-right: 8px; color: red;',
    );
  });

  it('Should Space style works', () => {
    const { container } = render(
      <ConfigProvider
        space={{
          style: {
            color: 'red',
          },
        }}
      >
        <Space>
          <span>Text1</span>
          <span>Text2</span>
        </Space>
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-space')).toHaveStyle('color: red;');
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
            color: 'red',
            height: 80,
          },
        }}
      >
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-divider'))?.toHaveStyle({ color: 'red', height: '80px' });
  });

  it('Should Typography className & style works', () => {
    const { container } = render(
      <ConfigProvider
        typography={{ className: 'cp-typography', style: { backgroundColor: 'red' } }}
      >
        <Typography>test</Typography>
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLElement>('.ant-typography');
    expect(element).toHaveClass('cp-typography');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Spin className & style works', () => {
    const { container } = render(
      <ConfigProvider
        spin={{ className: 'config-provider-spin', style: { backgroundColor: 'red' } }}
      >
        <Spin />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-spin');
    expect(element).toHaveClass('config-provider-spin');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Segmented className & style works', () => {
    const { container } = render(
      <ConfigProvider
        segmented={{ className: 'config-provider-segmented', style: { backgroundColor: 'red' } }}
      >
        <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-segmented');
    expect(element).toHaveClass('config-provider-segmented');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Select className & style works', () => {
    const { container } = render(
      <ConfigProvider select={{ className: 'cp-select', style: { backgroundColor: 'red' } }}>
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
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Steps className & style works', () => {
    const { container } = render(
      <ConfigProvider
        steps={{ className: 'config-provider-steps', style: { backgroundColor: 'red' } }}
      >
        <Steps items={[{ title: 'title', description: 'description' }]} />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-steps');
    expect(element).toHaveClass('config-provider-steps');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Image className & style works', () => {
    const { container } = render(
      <ConfigProvider
        image={{ className: 'config-provider-image', style: { backgroundColor: 'red' } }}
      >
        <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </ConfigProvider>,
    );
    const element = container
      ?.querySelector<HTMLDivElement>('.ant-image')
      ?.querySelector<HTMLImageElement>('img');
    expect(element).toHaveClass('config-provider-image');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Mentions className & style works', () => {
    const { container } = render(
      <ConfigProvider
        mentions={{
          className: 'cp-className',
          style: {
            background: 'red',
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
    expect(container.querySelector('.ant-mentions')).toHaveStyle({ background: 'red' });
  });

  it('Should Result className & style works', () => {
    const { container } = render(
      <ConfigProvider result={{ className: 'cp-result', style: { backgroundColor: 'red' } }}>
        <Result />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-result');
    expect(element).toHaveClass('cp-result');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Radio className & style works', () => {
    const { container } = render(
      <ConfigProvider
        radio={{
          className: 'cp-className',
          style: {
            background: 'red',
          },
        }}
      >
        <Radio>Radio</Radio>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-radio-wrapper')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-radio-wrapper')).toHaveStyle({ background: 'red' });
  });

  it('Should Slider className & style works', () => {
    const { container } = render(
      <ConfigProvider slider={{ className: 'cp-slider', style: { backgroundColor: 'red' } }}>
        <Slider />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLDivElement>('.ant-slider');
    expect(element).toHaveClass('cp-slider');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Anchor className & style works', () => {
    const { container } = render(
      <ConfigProvider
        anchor={{
          className: 'cp-className',
          style: {
            background: 'red',
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
    expect(container.querySelector('.ant-anchor-wrapper')).toHaveStyle({ background: 'red' });
  });

  it('Should Breadcrumb className & style works', () => {
    const { container } = render(
      <ConfigProvider
        breadcrumb={{ className: 'cp-breadcrumb', style: { backgroundColor: 'red' } }}
      >
        <Breadcrumb />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLElement>('.ant-breadcrumb');
    expect(element).toHaveClass('cp-breadcrumb');
    expect(element).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Should Checkbox className & style works', () => {
    const { container } = render(
      <ConfigProvider
        checkbox={{
          className: 'cp-checkbox',
          style: {
            background: 'red',
          },
        }}
      >
        <Checkbox>Checkbox</Checkbox>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-checkbox-wrapper')).toHaveClass('cp-checkbox');
    expect(container.querySelector('.ant-checkbox-wrapper')).toHaveStyle({ background: 'red' });
  });

  it('Should Pagination className & style works', () => {
    const { container } = render(
      <ConfigProvider
        pagination={{ className: 'cp-pagination', style: { backgroundColor: 'blue' } }}
      >
        <Pagination />
      </ConfigProvider>,
    );
    const element = container.querySelector<HTMLUListElement>('.ant-pagination');
    expect(element).toHaveClass('cp-pagination');
    expect(element).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('Should Descriptions className & style works', () => {
    const { container } = render(
      <ConfigProvider
        descriptions={{
          className: 'cp-className',
          style: {
            background: 'red',
          },
        }}
      >
        <Descriptions title="User Info">
          <Descriptions.Item label="UserName">muxin</Descriptions.Item>
        </Descriptions>
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-descriptions')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-descriptions')).toHaveStyle({ background: 'red' });
  });

  it('Should Empty className & style works', () => {
    const { container } = render(
      <ConfigProvider
        empty={{
          className: 'cp-className',
          style: {
            background: 'red',
          },
        }}
      >
        <Empty />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-empty')).toHaveClass('cp-className');
    expect(container.querySelector('.ant-empty')).toHaveStyle({ background: 'red' });
  });
});
