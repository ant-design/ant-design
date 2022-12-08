import React from 'react';
import ColorStyle from './Color/ColorStyle';
import {
  BrowserMockup,
  Common,
  Demo,
  HeadingAnchor,
  Highlight,
  Icon,
  IconPickSearcher,
  Markdown,
  NProgress,
  PreviewImage,
  Reset,
  Responsive,
} from './styles';

const GlobalStyles = () => (
  <>
    <Reset />
    <Common />
    <Markdown />
    <Highlight />
    <Demo />
    <Icon />
    <IconPickSearcher />
    <BrowserMockup />
    <Responsive />
    <NProgress />
    <PreviewImage />
    <ColorStyle />
    <HeadingAnchor />
  </>
);

export default GlobalStyles;
