import type * as React from 'react';

export const semanticRootStylePriority = {
  contextStyles: {
    root: {
      backgroundColor: 'rgb(255, 0, 0)',
      marginTop: '1px',
      paddingTop: '1px',
      borderTopWidth: '1px',
    },
  },
  contextStyle: {
    backgroundColor: 'rgb(0, 0, 255)',
    marginTop: '2px',
    paddingTop: '2px',
  },
  styles: {
    root: {
      backgroundColor: 'rgb(0, 128, 0)',
      marginTop: '3px',
    },
  },
  style: {
    backgroundColor: 'rgb(255, 255, 0)',
  },
} satisfies {
  contextStyles: { root: React.CSSProperties };
  contextStyle: React.CSSProperties;
  styles: { root: React.CSSProperties };
  style: React.CSSProperties;
};

export const expectSemanticRootStylePriority = (element: Element | null) => {
  expect(element).toHaveStyle({
    backgroundColor: semanticRootStylePriority.style.backgroundColor,
    marginTop: semanticRootStylePriority.styles.root.marginTop,
    paddingTop: semanticRootStylePriority.contextStyle.paddingTop,
    borderTopWidth: semanticRootStylePriority.contextStyles.root.borderTopWidth,
  });
};

export const expectSemanticRootStyleWithRootStylePriority = (element: Element | null) => {
  expect(element).toHaveStyle({
    backgroundColor: semanticRootStylePriority.style.backgroundColor,
    marginTop: semanticRootStylePriority.styles.root.marginTop,
    paddingTop: semanticRootStylePriority.contextStyles.root.paddingTop,
    borderTopWidth: semanticRootStylePriority.contextStyles.root.borderTopWidth,
  });
};
