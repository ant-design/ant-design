import React from 'react';

import Mentions from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';

describe('Mentions.Semantic', () => {
  it('support classNames and styles as functions', () => {
    const { container } = render(
      <Mentions
        placeholder="@someone"
        options={[{ value: 'test', label: 'test' }]}
        disabled={false}
        loading={false}
        classNames={(info) => ({
          root: info.props.disabled ? 'disabled-root' : 'enabled-root',
          textarea: `textarea-${info.props.loading ? 'loading' : 'normal'}`,
          popup: 'dynamic-popup',
        })}
        styles={(info) => ({
          root: {
            opacity: info.props.disabled ? 0.5 : 1,
            backgroundColor: info.props.loading ? 'gray' : 'white',
          },
          textarea: { fontSize: '14px' },
          popup: { zIndex: 1000 },
        })}
      />,
    );

    const mentionsElement = container.querySelector('.ant-mentions');
    expect(mentionsElement).toHaveClass('enabled-root');
    // 检查样式是否应用到了 style 属性中
    expect(mentionsElement).toHaveAttribute('style');
    const style = mentionsElement?.getAttribute('style');
    expect(style).toContain('opacity: 1');
    expect(style).toContain('background-color: white');
  });
  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        mentions={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <Mentions
          options={[{ value: 'test', label: 'test' }]}
          styles={semanticRootStylePriority.styles}
          style={semanticRootStylePriority.style}
        />
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-mentions'));
  });
});
