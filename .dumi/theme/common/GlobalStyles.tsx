import React from 'react';

import ColorStyle from './Color/ColorStyle';
import {
  Common,
  Demo,
  HeadingAnchor,
  Highlight,
  Markdown,
  NProgress,
  PreviewImage,
  Reset,
  Responsive,
  SearchBar,
} from './styles';
import InlineCard from './styles/InlineCard';

const GlobalStyles: React.FC = () => (
  <>
    <Reset />
    <Common />
    <Markdown />
    <Highlight />
    <Demo />
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
