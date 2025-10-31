import '@testing-library/jest-dom';

import React from 'react';
import type { TabBarExtraContent } from '@rc-component/tabs/lib/interface';
import userEvent from '@testing-library/user-event';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen } from '../../../tests/utils';
import Button from '../../button/index';
import ConfigProvider from '../../config-provider';
import Card from '../index';

describe('Card', () => {
  mountTest(Card);
  rtlTest(Card);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should still have padding when card which set padding to 0 is loading', () => {
    const { container } = render(
      <Card loading bodyStyle={{ padding: 0 }}>
        xxx
      </Card>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('title should be vertically aligned', () => {
    const { container } = render(
      <Card title="Card title" extra={<Button>Button</Button>} style={{ width: 300 }}>
        <p>Card content</p>
      </Card>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('onTabChange should work', async () => {
    const tabList = [
      {
        key: 'tab1',
        tab: 'tab1',
      },
      {
        key: 'tab2',
        tab: 'tab2',
      },
    ];
    const onTabChange = jest.fn();
    render(
      <Card onTabChange={onTabChange} tabList={tabList}>
        xxx
      </Card>,
    );
    await userEvent.setup({ delay: null }).click(screen.getByRole('tab', { name: /tab2/i }));
    expect(onTabChange).toHaveBeenCalledWith('tab2');
  });

  it('should not render when actions is number', () => {
    const numberStub = 11;
    render(
      // @ts-ignore ignore for the wrong action value
      <Card title="Card title" actions={numberStub}>
        <p>Card content</p>
      </Card>,
    );
    expect(screen.queryByText(numberStub)).not.toBeInTheDocument();
  });

  it('with tab props', () => {
    const { container } = render(
      <Card
        title="Card title"
        tabList={[
          {
            key: 'key',
            tab: 'tab',
          },
        ]}
        tabProps={{ size: 'small' }}
      >
        <p>Card content</p>
      </Card>,
    );
    expect(container.querySelectorAll('.ant-tabs-small').length === 0).toBeFalsy();
  });

  it('tab size extend card size', () => {
    const { container: largeContainer } = render(
      <Card
        title="Card title"
        tabList={[
          {
            key: 'key',
            tab: 'tab',
          },
        ]}
      >
        <p>Card content</p>
      </Card>,
    );
    expect(largeContainer.querySelectorAll('.ant-tabs-large').length === 0).toBeFalsy();

    const { container } = render(
      <Card
        title="Card title"
        tabList={[
          {
            key: 'key',
            tab: 'tab',
          },
        ]}
        size="small"
      >
        <p>Card content</p>
      </Card>,
    );
    expect(container.querySelectorAll('.ant-tabs-small').length === 0).toBeFalsy();
  });

  it('get ref of card', () => {
    const cardRef = React.createRef<HTMLDivElement>();

    render(
      <Card ref={cardRef} title="Card title">
        <p>Card content</p>
      </Card>,
    );

    expect(cardRef.current).toHaveClass('ant-card');
  });

  it('should show tab when tabList is empty', () => {
    const { container } = render(
      <Card title="Card title" tabList={[]} tabProps={{ type: 'editable-card' }}>
        <p>Card content</p>
      </Card>,
    );

    expect(container.querySelector('.ant-tabs')).toBeTruthy();
    expect(container.querySelector('.ant-tabs-nav-add')).toBeTruthy();
  });

  it('correct pass tabList props', () => {
    const { container } = render(
      <Card
        tabList={[
          {
            label: 'Basic',
            key: 'basic',
          },
          {
            tab: 'Deprecated',
            key: 'deprecated',
          },
          {
            tab: 'Disabled',
            key: 'disabled',
            disabled: true,
          },
          {
            tab: 'NotClosable',
            key: 'notClosable',
            closable: false,
          },
        ]}
        tabProps={{
          type: 'editable-card',
        }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support custom styles', () => {
    const customClassNames = {
      root: 'custom-root',
      header: 'custom-header',
      body: 'custom-body',
      extra: 'custom-extra',
      title: 'custom-title',
      actions: 'custom-actions',
      cover: 'custom-cover',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      header: { backgroundColor: 'black' },
      body: { backgroundColor: 'gray' },
      extra: { backgroundColor: 'purple' },
      title: { backgroundColor: 'yellow' },
      actions: { backgroundColor: 'blue' },
      cover: { backgroundColor: 'green' },
    };
    const { container } = render(
      <Card
        title="Card title"
        cover="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        extra="More"
        classNames={customClassNames}
        styles={customStyles}
        actions={[<div key="btn"> button</div>]}
      >
        <p>Card content</p>
      </Card>,
    );
    const rootElement = container.querySelector('.ant-card') as HTMLElement;
    const headerElement = container.querySelector('.ant-card-head') as HTMLElement;
    const bodyElement = container.querySelector('.ant-card-body') as HTMLElement;
    const extraElement = container.querySelector('.ant-card-extra') as HTMLElement;
    const titleElement = container.querySelector('.ant-card-head-title') as HTMLElement;
    const actionsElement = container.querySelector('.ant-card-actions') as HTMLElement;
    const coverElement = container.querySelector('.ant-card-cover') as HTMLElement;

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(headerElement).toHaveClass('custom-header');
    expect(bodyElement).toHaveClass('custom-body');
    expect(extraElement).toHaveClass('custom-extra');
    expect(titleElement).toHaveClass('custom-title');
    expect(actionsElement).toHaveClass('custom-actions');
    expect(coverElement).toHaveClass('custom-cover');

    // check styles
    expect(rootElement.style.backgroundColor).toBe('red');
    expect(headerElement.style.backgroundColor).toBe('black');
    expect(bodyElement.style.backgroundColor).toBe('gray');
    expect(extraElement.style.backgroundColor).toBe('purple');
    expect(titleElement.style.backgroundColor).toBe('yellow');
    expect(actionsElement.style.backgroundColor).toBe('blue');
    expect(coverElement.style.backgroundColor).toBe('green');
  });
  it('should support custom styles for Card.Meta', () => {
    const { Meta } = Card;
    const customClassNames = {
      root: 'custom-root',
      section: 'custom-section',
      avatar: 'custom-avatar',
      title: 'custom-title',
      description: 'custom-description',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      section: { backgroundColor: 'black' },
      avatar: { backgroundColor: 'gray' },
      description: { backgroundColor: 'yellow' },
    };
    const { container } = render(
      <Card
        title="Card title"
        cover="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
        extra="More"
        classNames={customClassNames}
        styles={customStyles}
        actions={[<div key="testbtn">button</div>]}
      >
        <Meta
          classNames={customClassNames}
          styles={customStyles}
          avatar={<img alt="testimg" src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Card Meta title"
          description="This is the description"
        />
      </Card>,
    );

    const rootElement = container.querySelector('.ant-card-meta') as HTMLElement;
    const sectionElement = container.querySelector('.ant-card-meta-section') as HTMLElement;
    const avatarElement = container.querySelector('.ant-card-meta-avatar') as HTMLElement;
    const titleElement = container.querySelector('.ant-card-meta-title') as HTMLElement;
    const descriptionElement = container.querySelector('.ant-card-meta-description') as HTMLElement;

    expect(rootElement).toHaveClass('custom-root');
    expect(sectionElement).toHaveClass('custom-section');
    expect(avatarElement).toHaveClass('custom-avatar');
    expect(titleElement).toHaveClass('custom-title');
    expect(descriptionElement).toHaveClass('custom-description');

    expect(rootElement.style.backgroundColor).toBe('red');
    expect(sectionElement.style.backgroundColor).toBe('black');
    expect(avatarElement.style.backgroundColor).toBe('gray');
    expect(descriptionElement.style.backgroundColor).toBe('yellow');
  });

  it('ConfigProvider support variant for card', () => {
    const TestComponent = () => {
      const [variant, setVariant] = React.useState<'borderless' | 'outlined'>('outlined');
      const [cardVariant, setCardVariant] = React.useState<'borderless' | 'outlined' | undefined>(
        undefined,
      );

      return (
        <div>
          <button type="button" onClick={() => setVariant('borderless')}>
            Set borderless
          </button>
          <button type="button" onClick={() => setCardVariant('outlined')}>
            Set outlined
          </button>
          <ConfigProvider variant={variant}>
            <Card title="Card title" variant={cardVariant}>
              <p>Card content</p>
            </Card>
          </ConfigProvider>
        </div>
      );
    };

    const { container, getByText } = render(<TestComponent />);

    // Check if the default `ant-card-bordered` exists
    expect(container.querySelector('.ant-card-bordered')).toBeTruthy();

    fireEvent.click(getByText('Set borderless'));
    expect(container.querySelector('.ant-card-bordered')).toBeFalsy();

    fireEvent.click(getByText('Set outlined'));
    expect(container.querySelector('.ant-card-bordered')).toBeTruthy();
  });

  it('should support left and right properties for tabBarExtraContent props', () => {
    const tabBarExtraContent: TabBarExtraContent = {
      left: <span>Left</span>,
      right: <span>Right</span>,
    };

    const { container } = render(
      <Card title="Card title" tabBarExtraContent={tabBarExtraContent}>
        <p>Card content</p>
      </Card>,
    );

    expect(container).toMatchSnapshot();
  });
});
