import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import * as utils from './utils';

import '../common/lib';
import App from '../component/App';
import Home from '../component/Home';
import Article from '../component/Article';
import introduce from '../../_site/data/introduce';
import gettingStarted from '../../_site/data/getting-started';
import install from '../../_site/data/install';
import upgradeNotes from '../../_site/data/upgrade-notes';
import changelog from '../../_site/data/changelog';
import ReactComponents from '../component/ReactComponents';
import ComponentDoc from '../component/ComponentDoc';
import componentDocsList from '../../_site/data/component-docs-list';
import demosList from '../../_site/data/demos-list';
import Spec from '../component/Spec';
import specIntro from '../../_site/data/specIntro';
import font from '../../_site/data/font';
import typography from '../../_site/data/typography';
import easing from '../../_site/data/easing';
import pageTransition from '../../_site/data/page-transition';
import motion from '../../_site/data/motion';

import MainContent from '../component/MainContent';
import practice from '../../_site/data/practice';
import pattern from '../../_site/data/pattern';
import resource from '../../_site/data/resource';

const Introduce = () => <Article content={introduce[0]} />;
const GettingStarted = () => <Article content={gettingStarted[0]} />;
const Install = () => <Article content={install[0]} />;
const UpgradeNotes = () => <Article content={upgradeNotes[0]} />;
const Changelog = () => <Article content={changelog[0]} />;

const demosListChildren = componentDocsList.map((componentDoc) => {
  const key = componentDoc.meta.english.toLowerCase();
  const ComponentDocWrapper =
          () => <ComponentDoc doc={componentDoc} demos={demosList[key]} />;

  return <Route path={key} component={ComponentDocWrapper} key={key} />;
});

const SpecIntro = () => <Article content={specIntro[0]} />;
const Font = () => <Article content={font[0]} />;
const Typography = () => <Article content={typography[0]} />;
const Easing = () => <Article content={easing[0]} />;
const PageTransition = () => <Article content={pageTransition[0]} />;
const Motion = () => <Article content={motion[0]} />;

const Practice = (props) => {
  return <MainContent {...props} category="practice" menuItems={practice.menuItems} />;
};

const practiceChildren = utils.generateChildren(practice.pagesData);

const Pattern = (props) => {
  return <MainContent {...props} category="pattern" menuItems={pattern.menuItems} />;
};
const patternChildren = utils.generateChildren(pattern.pagesData);

const Resource = (props) => {
  return <MainContent {...props} category="resource" menuItems={resource.menuItems} />;
};
const resourceChildren = utils.generateChildren(resource.pagesData);

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="components" component={ReactComponents}>
      <IndexRoute component={Introduce} />
      <Route path="introduce" component={Introduce} />
      <Route path="getting-started" component={GettingStarted} />
      <Route path="install" component={Install} />
      <Route path="upgrade-notes" component={UpgradeNotes} />
      <Route path="changelog" component={Changelog} />
      {demosListChildren}
    </Route>
    <Route path="spec" component={Spec}>
      <IndexRoute component={SpecIntro} />
      <Route path="introduce" component={SpecIntro} />
      <Route path="font" component={Font} />
      <Route path="typography" component={Typography} />
      <Route path="easing" component={Easing} />
      <Route path="page-transition" component={PageTransition} />
      <Route path="motion" component={Motion} />
    </Route>
    <Route path="practice" component={Practice}>
      { practiceChildren }
    </Route>
    <Route path="pattern" component={Pattern}>
      { patternChildren }
    </Route>
    <Route path="resource" component={Resource}>
      { resourceChildren }
    </Route>
  </Route>
</Router>, document.getElementById('react-content'));
