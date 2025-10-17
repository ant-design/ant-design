import { useMemo } from 'react';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};

const fetcher = async (url: string) => {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  const data = await res.json();
  const totalCount = isNumber(data?.total_count) ? data.total_count : null;
  return totalCount;
};

const swrConfig: SWRConfiguration<number, Error> = {
  revalidateOnReconnect: true, // 网络重新连接时重新请求
  dedupingInterval: 1000 * 60, // 1 分钟内重复 key 不会重新请求
  shouldRetryOnError: true, // 错误重试
  errorRetryCount: 3, // 最多重试 3 次
};

export interface UseIssueCountOptions {
  repo: string; // e.g. ant-design/ant-design
  proxyEndpoint?: string; // backend proxy endpoint to avoid GitHub rate limit
  titleKeywords?: string[]; // keywords to match in issue title
}

export const useIssueCount = (options: UseIssueCountOptions) => {
  const { repo, proxyEndpoint, titleKeywords } = options;

  // Note: current query only filters by title keywords. Filtering by component name can be added later if needed.
  const searchUrl = useMemo(() => {
    const tokens = (titleKeywords || []).filter(Boolean).map((k) => encodeURIComponent(String(k)));
    const orExpr = tokens.length > 0 ? tokens.join('%20OR%20') : '';
    const titlePart = orExpr ? `in:title+(${orExpr})` : 'in:title';
    const q = `repo:${repo}+is:issue+is:open+${titlePart}`;
    return `https://api.github.com/search/issues?q=${q}`;
  }, [repo, titleKeywords]);

  const endpoint = proxyEndpoint || searchUrl;

  const { data, error, isLoading } = useSWR<number>(endpoint ? endpoint : null, fetcher, swrConfig);

  const issueNewUrl = `https://github.com/${repo}/issues/new/choose`;

  const issueSearchUrl = useMemo(() => {
    const keywords = (titleKeywords || []).filter(Boolean).map((k) => String(k));
    const groupExpr =
      keywords.length > 0 ? `(${keywords.map((k) => `is:issue in:title ${k}`).join(' OR ')})` : '';
    const qRaw = `is:open ${groupExpr}`.trim();
    return `https://github.com/${repo}/issues?q=${encodeURIComponent(qRaw)}`;
  }, [repo, titleKeywords]);

  return {
    issueCount: data,
    issueCountError: error,
    issueCountLoading: isLoading,
    issueNewUrl,
    issueSearchUrl,
  };
};

export default useIssueCount;
