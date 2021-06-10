import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'bisheng/router';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import canUseDom from 'rc-util/lib/Dom/canUseDom';

import {
  DocSearchProps,
  DocSearchButton,
  useDocSearchKeyboardEvents,
  DocSearchModalProps,
} from '@docsearch/react';
import { DocSearchHit } from '@docsearch/react/dist/esm/types';
import '@docsearch/react/style';
import { SharedProps } from './interface';

import './SearchBox.less';

export interface SearchBarProps extends SharedProps {
  onTriggerFocus?: (focus: boolean) => void;
  responsive: null | 'narrow' | 'crowded';
}

let SearchModal: React.FC<DocSearchModalProps> | null = null;

const Hit: DocSearchProps['hitComponent'] = ({ hit, children }) => (
  <Link to={hit.url}>{children}</Link>
);

const algoliaConfig = {
  appId: 'bh4d9od16a',
  apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
  indexName: 'ant_design',
  // inputSelector: '#search-box input',
  getSearchParams(isZhCN: boolean) {
    return { facetFilters: [`tags:${isZhCN ? 'cn' : 'en'}`] };
  },
  transformData(hits: DocSearchHit[]) {
    hits.forEach(hit => {
      hit.url = hit.url.replace('ant.design', window.location.host);
      hit.url = hit.url.replace('https:', window.location.protocol);
    });
    return hits;
  },
  debug: false, // Set debug to true if you want to inspect the dropdown
};

/**
 * Recompose for algolia DocSearch Component Inspiring by
 * [@docusaurus-theme-search-algolia](https://docusaurus.io/docs/api/themes/@docusaurus/theme-search-algolia)
 */
export const SearchBar = ({ isZhCN, responsive, onTriggerFocus }: SearchBarProps) => {
  const searchButtonRef = React.useRef<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState('');

  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';

  const triggerSearchModal = React.useCallback((open: boolean) => {
    setIsOpen(open);
    onTriggerFocus?.(open);
  }, []);

  const triggerSearchModalImport = React.useCallback(() => {
    if (SearchModal) {
      return Promise.resolve();
    }

    return import('@docsearch/react/modal').then(({ DocSearchModal }) => {
      SearchModal = DocSearchModal;
    });
  }, []);

  const searchModalContainer = React.useMemo(() => {
    if (!canUseDom()) {
      return;
    }
    const id = 'antd_algolia_search_modal';
    let searchModalContainer$ = document.querySelector(`#${id}`);
    if (!searchModalContainer$) {
      const containerDiv = document.createElement('div');
      containerDiv.id = id;
      document.body.appendChild(containerDiv);
      searchModalContainer$ = containerDiv;
    }
    return searchModalContainer$;
  }, []);

  const onOpen = React.useCallback(() => {
    triggerSearchModalImport().then(() => {
      triggerSearchModal(true);
    });
  }, []);

  const onClose = React.useCallback(() => {
    triggerSearchModal(false);
  }, []);

  const onInput = React.useCallback((event: KeyboardEvent) => {
    triggerSearchModalImport().then(() => {
      setUserSearch(event.key);
      triggerSearchModal(true);
    });
  }, []);

  const searchParameters = React.useMemo(() => algoliaConfig.getSearchParams(isZhCN), [isZhCN]);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <div
      id="search-box"
      className={classNames({
        'narrow-mode': responsive,
        focused: isOpen,
      })}
    >
      <Helmet>
        {/* pre-connect to algolia server */}
        <link
          rel="preconnect"
          href={`https://${algoliaConfig.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Helmet>

      <DocSearchButton
        onTouchStart={triggerSearchModalImport}
        onFocus={triggerSearchModalImport}
        onMouseOver={triggerSearchModalImport}
        onClick={onOpen}
        ref={searchButtonRef}
        translations={{
          buttonText: searchPlaceholder,
          buttonAriaLabel: searchPlaceholder,
        }}
      />

      {SearchModal &&
        searchModalContainer &&
        isOpen &&
        ReactDOM.createPortal(
          <SearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={userSearch}
            placeholder={searchPlaceholder}
            hitComponent={Hit}
            apiKey={algoliaConfig.apiKey}
            indexName={algoliaConfig.indexName}
            transformItems={algoliaConfig.transformData}
            searchParameters={searchParameters}
          />,
          searchModalContainer,
        )}
    </div>
  );
};
