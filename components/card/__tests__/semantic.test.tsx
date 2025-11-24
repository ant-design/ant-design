import React from 'react';

import Card from '..';
import { render } from '../../../tests/utils';
import Button from '../../button';

describe('Card.Semantic', () => {
  it('should support useMergeSemantic with mergedProps', () => {
    const semanticClassNames = {
      root: 'semantic-card-root',
      header: 'semantic-card-header',
      body: 'semantic-card-body',
      title: 'semantic-card-title',
      extra: 'semantic-card-extra',
      actions: 'semantic-card-actions',
    };
    const semanticStyles = {
      root: { backgroundColor: '#fafafa' },
      header: { color: '#111111', fontWeight: 700 },
      body: { padding: '20px' },
      title: { fontSize: '22px' },
      extra: { color: '#000000' },
      actions: { margin: '8px' },
    };
    const { Meta } = Card;
    const { container } = render(
      <Card
        title="card"
        extra={<Button type="link">More</Button>}
        style={{ width: 300 }}
        actions={[<span key={1}>test</span>]}
        classNames={semanticClassNames}
        styles={semanticStyles}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>,
    );

    const root = container.querySelector('.ant-card');
    const header = container.querySelector('.ant-card-head');
    const body = container.querySelector('.ant-card-body');
    const actions = container.querySelector('.ant-card-actions');
    const title = container.querySelector('.ant-card-head-title');
    const extra = container.querySelector('.ant-card-extra');

    // Check semantic class names
    expect(root).toHaveClass(semanticClassNames.root);
    expect(header).toHaveClass(semanticClassNames.header);
    expect(body).toHaveClass(semanticClassNames.body);
    expect(actions).toHaveClass(semanticClassNames.actions);
    expect(title).toHaveClass(semanticClassNames.title);
    expect(extra).toHaveClass(semanticClassNames.extra);

    // Check semantic styles
    expect(root).toHaveStyle('background-color: rgb(250, 250, 250)');
    expect(header).toHaveStyle('color: rgb(17, 17, 17)');
    expect(header).toHaveStyle('font-weight: 700');
    expect(body).toHaveStyle('padding: 20px');
    expect(actions).toHaveStyle('margin: 8px');
    expect(title).toHaveStyle('font-size: 22px');
    expect(extra).toHaveStyle(' color: #000000');
  });

  it('should support function-based semantic classNames and styles', () => {
    const dynamicClassNames = () => ({
      root: 'dynamic-card-root',
      header: 'dynamic-card-header',
      body: 'dynamic-card-body',
      title: 'dynamic-card-title',
      extra: 'dynamic-card-extra',
      actions: 'dynamic-card-actions',
    });

    const dynamicStyles = () => ({
      root: { borderRadius: '12px' },
      header: { fontSize: '16px' },
      body: { padding: '20px' },
      title: { fontSize: '22px' },
      extra: { color: '#000000' },
      actions: { margin: '8px' },
    });

    const { Meta } = Card;

    const { container } = render(
      <Card
        title="card"
        extra={<Button type="link">More</Button>}
        style={{ width: 300 }}
        actions={[<span key={1}>test</span>]}
        classNames={dynamicClassNames}
        styles={dynamicStyles}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>,
    );

    const root = container.querySelector('.ant-card');
    const header = container.querySelector('.ant-card-head');
    const body = container.querySelector('.ant-card-body');
    const actions = container.querySelector('.ant-card-actions');
    const title = container.querySelector('.ant-card-head-title');
    const extra = container.querySelector('.ant-card-extra');

    expect(root).toHaveClass('dynamic-card-root');
    expect(header).toHaveClass('dynamic-card-header');
    expect(body).toHaveClass('dynamic-card-body');
    expect(actions).toHaveClass('dynamic-card-actions');
    expect(title).toHaveClass('dynamic-card-title');
    expect(extra).toHaveClass('dynamic-card-extra');

    expect(root).toHaveStyle('border-radius: 12px');
    expect(header).toHaveStyle('font-size: 16px');
    expect(body).toHaveStyle('padding: 20px');
    expect(actions).toHaveStyle('margin: 8px');
    expect(title).toHaveStyle('font-size: 22px');
    expect(extra).toHaveStyle('color: #000000');
  });
});
