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
  SearchBar,
} from './styles';
import InlineCard from './styles/InlineCard';

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
    <InlineCard />
    <ColorStyle />
    <HeadingAnchor />
    <SearchBar />
  </>
);

export default GlobalStyles;
