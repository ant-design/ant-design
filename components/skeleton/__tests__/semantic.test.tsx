import React from 'react';

import Skeleton from '..';
import type { SkeletonProps } from '..';
import type { SemanticClassNames, SemanticStyles } from '../../_util/hooks/useMergeSemantic';
import { render } from '../../../tests/utils';

type SemanticName = 'root' | 'header' | 'section' | 'avatar' | 'title' | 'paragraph';

const genSkeleton = (props?: SkeletonProps) => render(<Skeleton {...props} />);

describe('Skeleton.Semantic', () => {
  it('Skeleton should apply custom styles to semantic elements', () => {
    const rootStyle = { background: 'pink' };
    const headerStyle = { background: 'green' };
    const sectionStyle = { background: 'yellow' };
    const avatarStyle = { background: 'blue' };
    const titleStyle = { background: 'red' };
    const paragraphStyle = { background: 'orange' };

    const customStyles: SemanticStyles<SemanticName> = {
      root: rootStyle,
      header: headerStyle,
      section: sectionStyle,
      avatar: avatarStyle,
      title: titleStyle,
      paragraph: paragraphStyle,
    };

    const customClassNames: Required<SemanticClassNames<SemanticName>> = {
      root: 'custom-root',
      header: 'custom-header',
      section: 'custom-section',
      avatar: 'custom-avatar',
      title: 'custom-title',
      paragraph: 'custom-paragraph',
    };

    const { container } = genSkeleton({
      styles: customStyles,
      classNames: customClassNames,
      avatar: true,
    });

    const rootElement = container.querySelector<HTMLElement>('.ant-skeleton');
    expect(rootElement).toHaveStyle(rootStyle);
    expect(rootElement).toHaveClass(customClassNames.root);

    const headerElement = container.querySelector<HTMLElement>('.ant-skeleton-header');
    expect(headerElement).toHaveStyle(headerStyle);
    expect(headerElement).toHaveClass(customClassNames.header);

    const sectionElement = container.querySelector<HTMLElement>('.ant-skeleton-section');
    expect(sectionElement).toHaveStyle(sectionStyle);
    expect(sectionElement).toHaveClass(customClassNames.section);

    const avatarElement = container.querySelector<HTMLElement>('.ant-skeleton-avatar');
    expect(avatarElement).toHaveStyle(avatarStyle);
    expect(avatarElement).toHaveClass(customClassNames.avatar);

    const titleElement = container.querySelector<HTMLElement>('.ant-skeleton-title');
    expect(titleElement).toHaveStyle(titleStyle);
    expect(titleElement).toHaveClass(customClassNames.title);

    const paragraphElement = container.querySelector<HTMLElement>('.ant-skeleton-paragraph');
    expect(paragraphElement).toHaveStyle(paragraphStyle);
    expect(paragraphElement).toHaveClass(customClassNames.paragraph);
  });

  it('Skeleton should apply custom styles function to semantic elements', () => {
    const classNamesFn: SkeletonProps['classNames'] = (info) => {
      return info?.props?.active
        ? {
            root: 'demo-skeleton-root-active',
            header: 'demo-skeleton-header-active',
            section: 'demo-skeleton-section-active',
            avatar: 'demo-skeleton-avatar-active',
            title: 'demo-skeleton-title-active',
            paragraph: 'demo-skeleton-paragraph-active',
          }
        : {
            root: 'demo-skeleton-root-normal',
            header: 'demo-skeleton-header-normal',
            section: 'demo-skeleton-section-normal',
            avatar: 'demo-skeleton-avatar-normal',
            title: 'demo-skeleton-title-normal',
            paragraph: 'demo-skeleton-paragraph-normal',
          };
    };

    const stylesFn: SkeletonProps['styles'] = (info) => {
      return info?.props?.active
        ? {
            root: { padding: 1 },
            header: { padding: 2 },
            section: { padding: 3 },
            avatar: { padding: 4 },
            title: { padding: 5 },
            paragraph: { padding: 6 },
          }
        : {
            root: { padding: 11 },
            header: { padding: 12 },
            section: { padding: 13 },
            avatar: { padding: 14 },
            title: { padding: 15 },
            paragraph: { padding: 16 },
          };
    };

    const { container, rerender } = render(
      <Skeleton classNames={classNamesFn} styles={stylesFn} avatar />,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-skeleton');
    const headerElement = container.querySelector<HTMLElement>('.ant-skeleton-header');
    const sectionElement = container.querySelector<HTMLElement>('.ant-skeleton-section');
    const avatarElement = container.querySelector<HTMLElement>('.ant-skeleton-avatar');
    const titleElement = container.querySelector<HTMLElement>('.ant-skeleton-title');
    const paragraphElement = container.querySelector<HTMLElement>('.ant-skeleton-paragraph');

    expect(rootElement).toHaveStyle({ padding: '11px' });
    expect(rootElement).toHaveClass('demo-skeleton-root-normal');
    expect(headerElement).toHaveStyle({ padding: '12px' });
    expect(headerElement).toHaveClass('demo-skeleton-header-normal');
    expect(sectionElement).toHaveStyle({ padding: '13px' });
    expect(sectionElement).toHaveClass('demo-skeleton-section-normal');
    expect(avatarElement).toHaveStyle({ padding: '14px' });
    expect(avatarElement).toHaveClass('demo-skeleton-avatar-normal');
    expect(titleElement).toHaveStyle({ padding: '15px' });
    expect(titleElement).toHaveClass('demo-skeleton-title-normal');
    expect(paragraphElement).toHaveStyle({ padding: '16px' });
    expect(paragraphElement).toHaveClass('demo-skeleton-paragraph-normal');

    rerender(
      <Skeleton classNames={classNamesFn} styles={stylesFn} avatar active>
        test
      </Skeleton>,
    );

    expect(rootElement).toHaveStyle({ padding: '1px' });
    expect(rootElement).toHaveClass('demo-skeleton-root-active');
    expect(headerElement).toHaveStyle({ padding: '2px' });
    expect(headerElement).toHaveClass('demo-skeleton-header-active');
    expect(sectionElement).toHaveStyle({ padding: '3px' });
    expect(sectionElement).toHaveClass('demo-skeleton-section-active');
    expect(avatarElement).toHaveStyle({ padding: '4px' });
    expect(avatarElement).toHaveClass('demo-skeleton-avatar-active');
    expect(titleElement).toHaveStyle({ padding: '5px' });
    expect(titleElement).toHaveClass('demo-skeleton-title-active');
    expect(paragraphElement).toHaveStyle({ padding: '6px' });
    expect(paragraphElement).toHaveClass('demo-skeleton-paragraph-active');
  });
});
