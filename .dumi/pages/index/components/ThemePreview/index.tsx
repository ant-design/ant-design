import * as React from 'react';
import { Flex } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import useLocale from '../../../../hooks/useLocale';
import Group from '../Group';
import ComponentsBlock from './ComponentsBlock';
import usePreviewThemes from './previewThemes';

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: 'Ant Design 开放更多样式算法，让你定制主题更简单',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc: 'Ant Design enable extendable algorithm, make custom theme easier',
  },
};

const useStyles = createStyles(({ css, cssVar }) => ({
  container: css({
    width: '100%',
    // border: `${cssVar.lineWidthBold} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    color: cssVar.colorText,
    lineHeight: cssVar.lineHeight,
    fontSize: cssVar.fontSize,
    fontFamily: cssVar.fontFamily,
    alignItems: 'stretch',
    justifyContent: 'center',
  }),

  // List
  list: css({
    flex: 'auto',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    // borderInlineEnd: `${cssVar.lineWidthBold} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar.paddingMD,
  }),
  listItem: css({
    margin: 0,
    fontSize: cssVar.fontSizeLG,
    lineHeight: cssVar.lineHeightLG,
    paddingBlock: cssVar.padding,
    paddingInline: cssVar.paddingLG,
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    borderRadius: cssVar.borderRadius,
    borderColor: 'transparent',
    transition: `all ${cssVar.motionDurationMid} ${cssVar.motionEaseInOut}`,

    '&:hover:not(.active)': {
      borderColor: cssVar.colorPrimaryBorder,
      backgroundColor: cssVar.colorPrimaryBg,
      cursor: 'pointer',
    },

    '&:focus-visible': {
      outline: `2px solid ${cssVar.colorPrimary}`,
      outlineOffset: 2,
    },

    '&.active': {
      borderColor: cssVar.colorPrimary,
      backgroundColor: cssVar.colorPrimaryBg,
      color: cssVar.colorPrimary,
    },
  }),

  // Components
  componentsBlockContainer: css({
    flex: 'auto',
    display: 'flex',
    padding: cssVar.paddingXL,
    justifyContent: 'center',
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    borderRadius: cssVar.borderRadius,
  }),
  componentsBlock: css({
    flex: 'none',
    maxWidth: `calc(420px + ${cssVar.paddingXL} * 2)`,
  }),
}));

export default function ThemePreview() {
  const [locale] = useLocale(locales);
  const { styles } = useStyles();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const previewThemes = usePreviewThemes();

  const handleThemeClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThemeClick(index);
    }
  };

  return (
    <Group title={locale.themeTitle} description={locale.themeDesc}>
      <Flex className={styles.container} gap="large">
        <div className={styles.list} role="tablist" aria-label="Theme selection">
          {previewThemes.map((theme, index) => (
            <div
              className={clsx(styles.listItem, activeIndex === index && 'active')}
              key={theme.name}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
              aria-selected={activeIndex === index}
              onClick={() => handleThemeClick(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {theme.name}
            </div>
          ))}
        </div>
        <ComponentsBlock
          config={previewThemes[activeIndex].props}
          className={styles.componentsBlock}
          containerClassName={styles.componentsBlockContainer}
        />
      </Flex>
    </Group>
  );
}
