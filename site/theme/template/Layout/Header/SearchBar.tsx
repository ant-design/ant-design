import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'bisheng/router';
import classNames from 'classnames';

import { SharedProps } from './interface';

import { DocSearchProps, DocSearchButton, useDocSearchKeyboardEvents, DocSearchModalProps } from '@docsearch/react';
import '@docsearch/react/style';

import './SearchBox.less';

export interface SearchBoxProps extends SharedProps {
  onTriggerFocus?: (focus: boolean) => void;
  responsive: null | 'narrow' | 'crowded';
}

let SearchModal: React.FC<DocSearchModalProps> | null = null;

const Hit: DocSearchProps['hitComponent'] = ({ hit, children }) => {
  return <Link to={hit.url}>{children}</Link>;
};

const algoliaConfig = {
  apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
  indexName: 'ant_design',
  // inputSelector: '#search-box input',
  // algoliaOptions: { facetFilters: [`tags:${lang}`] },
  transformData(hits: { url: string }[]) {
    hits.forEach(hit => {
      hit.url = hit.url.replace('ant.design', window.location.host);
      hit.url = hit.url.replace('https:', window.location.protocol);
    });
    return hits;
  },
  debug: false, // Set debug to true if you want to inspect the dropdown
};

/**
 * recompose for alogia DocSearch Component
 */
export const SearchBar = ({ isZhCN, responsive, onTriggerFocus }: SearchBoxProps) => {
  const searchButtonRef = React.useRef<any>(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState('');

  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';

  const triggerSearchModal = React.useCallback((open: boolean) => {
    setModalOpen(open);
    onTriggerFocus?.(open);
  }, []);

  const triggerSearchModalImport = React.useCallback(() => {
    if (SearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
    ]).then(([{DocSearchModal: value}]) => {
      SearchModal = value;
    });
  }, []);

  const searchModalContainer = React.useMemo(() => {
    const id = 'antd_alogia_doc_search_modal';
    let searchModalContainer = document.querySelector(`#${id}`);
    if (!searchModalContainer) {
      const containerDiv = document.createElement('div');
      containerDiv.id = id;
      document.body.appendChild(containerDiv);
      searchModalContainer = containerDiv;
    }
    return searchModalContainer;
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

  useDocSearchKeyboardEvents({
    isOpen: isModalOpen,
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
        focused: isModalOpen,
      })}
    >

      {/* <Helmet>
        <link
          rel="preconnect"
          href={`https://${algoliaConfig.apiKey}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Helmet> */}

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

      {isModalOpen
        && SearchModal
        &&  ReactDOM.createPortal(
          <SearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={userSearch}
            placeholder={searchPlaceholder}
            hitComponent={Hit}
            apiKey={algoliaConfig.apiKey}
            indexName={algoliaConfig.indexName}
            searchParameters={{
              facetFilters: [`tags:${isZhCN ? 'cn' : 'en'}`]
            }}
          />,
          searchModalContainer,
        )}
    </div>
  );
};
