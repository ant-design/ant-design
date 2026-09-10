import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';

const PAGE_SIZE = 10;

interface ApiUser {
  id: number;
  name: string;
}

interface UserValue {
  label: string;
  value: number;
}

// A mock dataset standing in for a remote resource.
const DATA_SOURCE: ApiUser[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
}));

// Mock a paginated, searchable request. Replace it with a real API call that
// filters by `search` on the server and returns the `page`-th slice of results.
const fetchUsers = (search: string, page: number): Promise<ApiUser[]> => {
  const keyword = search.trim().toLowerCase();
  const matched = keyword
    ? DATA_SOURCE.filter((user) => user.name.toLowerCase().includes(keyword))
    : DATA_SOURCE;
  const data = matched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};

const App: React.FC = () => {
  const [value, setValue] = useState<UserValue | null>(null);
  const [options, setOptions] = useState<UserValue[]>([]);
  const [fetching, setFetching] = useState(false);

  // Monotonic request id: only the newest response is allowed to win, so a slow
  // older search or a superseded page can never overwrite fresher state.
  const fetchRef = useRef(0);
  const searchRef = useRef(''); // latest search term, read by scroll-append
  const pageRef = useRef(1); // next page to load for the current term
  const hasMoreRef = useRef(true); // becomes false once a short page returns
  const loadingRef = useRef(false); // guards rapid scroll events within one render

  // Shared loader for both code paths. `append` appends a scrolled page; a new
  // search replaces the list. The request returns a plain array with no total
  // count, so the end of the list is a page shorter than PAGE_SIZE.
  const loadPage = useCallback(async (search: string, page: number, append: boolean) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    loadingRef.current = true;
    setFetching(true);
    try {
      const users = await fetchUsers(search, page);
      // Drop stale responses (older search term or already-superseded page).
      if (fetchId !== fetchRef.current) {
        return;
      }
      hasMoreRef.current = users.length >= PAGE_SIZE;
      pageRef.current = page + 1;
      const next = users.map<UserValue>((user) => ({ label: user.name, value: user.id }));
      setOptions((prev) => (append ? [...prev, ...next] : next));
    } catch (error) {
      // Keep loaded options and allow another attempt on the next interaction.
      console.error('load users failed', error);
    } finally {
      // Only the latest request may clear the loading flags.
      if (fetchId === fetchRef.current) {
        loadingRef.current = false;
        setFetching(false);
      }
    }
  }, []);

  // A new search term resets pagination and the accumulated options.
  const onSearch = useMemo(
    () =>
      debounce((search: string) => {
        searchRef.current = search;
        pageRef.current = 1;
        hasMoreRef.current = true;
        setOptions([]);
        loadPage(search, 1, false);
      }, 300),
    [loadPage],
  );

  // Cancel any pending trailing invocation so it can't fire after unmount.
  useEffect(() => () => onSearch.cancel(), [onSearch]);

  const onPopupScroll: SelectProps['onPopupScroll'] = (e) => {
    const target = e.currentTarget;
    const atBottom = target.scrollTop + target.offsetHeight >= target.scrollHeight - 8;
    // `loadingRef` (not the `fetching` state) is checked here because scroll
    // events fire many times before a re-render, and a stale state value would
    // let duplicate page requests through.
    if (atBottom && hasMoreRef.current && !loadingRef.current) {
      // Append the next page for the latest search term (read from the ref).
      loadPage(searchRef.current, pageRef.current, true);
    }
  };

  return (
    <Select<UserValue>
      labelInValue
      value={value}
      style={{ width: '100%' }}
      placeholder="Search users, scroll to load more"
      loading={fetching}
      options={options}
      showSearch={{ filterOption: false, onSearch }}
      onChange={(newValue) => setValue(newValue)}
      onSelect={() => {
        // Selecting clears the search box. If a search was active, reset the
        // loader so reopening shows the default list, not the stale results.
        if (searchRef.current) {
          searchRef.current = '';
          pageRef.current = 1;
          hasMoreRef.current = true;
          setOptions([]);
        }
      }}
      onPopupScroll={onPopupScroll}
      onOpenChange={(open) => {
        // Load the first page when opened; retry if a prior attempt left it empty.
        if (open && options.length === 0 && hasMoreRef.current && !loadingRef.current) {
          loadPage(searchRef.current, 1, false);
        }
      }}
      notFoundContent={
        fetching && options.length === 0 ? <Spin size="small" /> : 'No results found'
      }
      popupRender={(menu) => (
        <>
          {menu}
          {fetching && options.length > 0 && (
            <div style={{ textAlign: 'center', padding: 8 }}>
              <Spin size="small" />
            </div>
          )}
        </>
      )}
    />
  );
};

export default App;
