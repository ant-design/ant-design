import '@testing-library/jest-dom';

import React from 'react';
import userEvent from '@testing-library/user-event';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, screen } from '../../../tests/utils';
import Button from '../../button/index';
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

  it('should support custom className', () => {
    const { container } = render(
      <Card title="Card title" classNames={{ header: 'custom-head' }}>
        <p>Card content</p>
      </Card>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should support custom styles', () => {
    const { container } = render(
      <Card title="Card title" styles={{ header: { color: 'red' } }}>
        <p>Card content</p>
      </Card>,
    );
    expect(container).toMatchSnapshot();
  });
});
