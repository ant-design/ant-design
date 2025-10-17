import { useEffect, useMemo, useState } from 'react';

export interface UseIssueCountOptions {
  repo: string; // e.g. ant-design/ant-design
  proxyEndpoint?: string; // backend proxy endpoint to avoid GitHub rate limit
  titleKeywords?: string[]; // keywords to match in issue title
}

export function useIssueCount(options: UseIssueCountOptions) {
  const { repo, proxyEndpoint, titleKeywords } = options;

  const [issuesCount, setIssuesCount] = useState<number | null>(null);

  // Note: current query only filters by title keywords (button/按钮). Component name can be added later if needed.

  const searchUrl = useMemo(() => {
    const tokens = (titleKeywords || []).filter(Boolean).map((k) => encodeURIComponent(String(k)));
    const orExpr = tokens.length > 0 ? tokens.join('%20OR%20') : '';
    const titlePart = orExpr ? `in:title+(${orExpr})` : 'in:title';
    const q = `repo:${repo}+is:issue+is:open+${titlePart}`;
    return `https://api.github.com/search/issues?q=${q}`;
  }, [repo, titleKeywords]);

  const endpoint = proxyEndpoint || searchUrl;

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        // eslint-disable-next-line compat/compat
        const res = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' } });
        if (!res.ok) {
          throw new Error(`Fetch failed with status ${res.status}`);
        }
        const data = await res.json();
        if (!aborted) {
          const total = typeof data?.total_count === 'number' ? data.total_count : null;
          setIssuesCount(total);
        }
      } catch {
        if (!aborted) setIssuesCount(null);
      }
    })();
    return () => {
      aborted = true;
    };
  }, [endpoint]);

  const issueNewUrl = `https://github.com/${repo}/issues/new/choose`;
  const issueSearchUrl = useMemo(() => {
    const keywords = (titleKeywords || []).filter(Boolean).map((k) => String(k));
    const groupExpr =
      keywords.length > 0 ? `(${keywords.map((k) => `is:issue in:title ${k}`).join(' OR ')})` : '';
    const qRaw = `is:open ${groupExpr}`.trim();
    return `https://github.com/${repo}/issues?q=${encodeURIComponent(qRaw)}`;
  }, [repo, titleKeywords]);

  return { issuesCount, issueNewUrl, issueSearchUrl };
}

export default useIssueCount;
