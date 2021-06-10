import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'bisheng/router';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { Input, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { DocSearchProps, useDocSearchKeyboardEvents, DocSearchModalProps } from '@docsearch/react';
import '@docsearch/react/style';

import { SharedProps } from './interface';
import { IAlgoliaConfig } from './algolia-config';

import './SearchBox.less';

export interface SearchBarProps extends SharedProps {
  onTriggerFocus?: (focus: boolean) => void;
  responsive: null | 'narrow' | 'crowded';
  algoliaConfig: IAlgoliaConfig;
}

let SearchModal: React.FC<DocSearchModalProps> | null = null;

const Hit: DocSearchProps['hitComponent'] = ({ hit, children }) => (
  <Link to={hit.url}>{children}</Link>
);

const CTRL_KEY = 'Ctrl';
const CMD_KEY = '⌘';

function isAppleDevice() {
  return !!navigator && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

/**
 * Recompose for algolia DocSearch Component
 * Inspiring by
 *  - [@docusaurus-theme-search-algolia](https://docusaurus.io/docs/api/themes/@docusaurus/theme-search-algolia)
 *  - [DocSearchModal Docs](https://autocomplete-experimental.netlify.app/docs/DocSearchModal)
 */
export const SearchBar = ({ isZhCN, responsive, onTriggerFocus, algoliaConfig }: SearchBarProps) => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState('');

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [searchModalQuery, setSearchModalQuery] = React.useState('');
  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';

  const handleInputFocus = React.useCallback((focus: boolean) => {
    setInputFocus(focus);
    onTriggerFocus?.(focus);
  }, []);

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    triggerSearchModalImport();
    setInputSearch(event.target.value);
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

  const triggerSearchModalImport = React.useCallback(() => {
    if (SearchModal) {
      return Promise.resolve();
    }

    return import('@docsearch/react/modal').then(({ DocSearchModal }) => {
      SearchModal = DocSearchModal;
    });
  }, []);

  const handleModalOpen = React.useCallback(() => {
    triggerSearchModalImport().then(() => {
      handleInputFocus(true);
      setModalOpen(true);
    });
  }, []);

  const handleModalClose = React.useCallback(() => {
    // clear search value in SearchModal
    setSearchModalQuery('');
    setModalOpen(false);
  }, []);

  useDocSearchKeyboardEvents({
    isOpen: isModalOpen,
    onOpen: handleModalOpen,
    onClose: handleModalClose,
  });

  const searchParameters = React.useMemo(() => algoliaConfig.getSearchParams(isZhCN), [isZhCN]);

  return (
    <div
      id="search-box"
      className={classNames({
        'narrow-mode': responsive,
        focused: isInputFocus,
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

      <Input
        placeholder={searchPlaceholder}
        onTouchStart={triggerSearchModalImport}
        onMouseOver={triggerSearchModalImport}
        value={inputSearch}
        onChange={handleInputChange}
        onFocus={() => {
          triggerSearchModalImport();
          handleInputFocus(true);
        }}
        onBlur={() => {
          handleInputFocus(false);
        }}
        prefix={<SearchOutlined />}
        suffix={
          <Tooltip title={isZhCN ? '唤起搜索窗' : 'Search in doc modal'}>
            <span
              className="keybindings"
              onClick={() => {
                // move userSearch to SearchModal
                setSearchModalQuery(inputSearch);
                setInputSearch('');
                handleModalOpen();
              }}
            >
              <span className="keybinding">{isAppleDevice() ? CMD_KEY : CTRL_KEY}</span>
              &nbsp;
              <span className="keybinding">K</span>
            </span>
          </Tooltip>
        }
      />

      {SearchModal &&
        searchModalContainer &&
        isModalOpen &&
        ReactDOM.createPortal(
          <SearchModal
            onClose={handleModalClose}
            initialScrollY={window.scrollY}
            initialQuery={searchModalQuery}
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
