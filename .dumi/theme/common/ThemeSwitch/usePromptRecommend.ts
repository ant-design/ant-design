import { XStream } from '@ant-design/x-sdk';
import { useRef, useState } from 'react';
  cn: {
    recommendPrompt:
      '请推荐 6 个适合 Ant Design 组件库的主题风格的名称，每个名称 4-6 个字，用逗号分隔。只返回主题名称，不要其他内容。',
  },
  en: {
    recommendPrompt:
      'Recommend 6 theme style names for Ant Design component library, each name 2-4 words, separated by commas. Return only theme names, nothing else.',
  },
};

const fetchRecommendations = async (
  localeKey: keyof typeof locales,
  abortSignal?: AbortSignal,
): Promise<string[]> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: locales[localeKey].recommendPrompt,
      userId: 'AntDesignSite',
    }),
    signal: abortSignal,
  };

  try {
    const response = await fetch('https://api.x.ant.design/api/agent_tbox_antd', options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    let fullContent = '';

    for await (const chunk of XStream({
      readableStream: response.body,
    })) {
      if (chunk.event === 'message') {
        const data = JSON.parse(chunk.data) as {
          lane: string;
          payload: string;
        };

        const payload = JSON.parse(data.payload) as {
          text: string;
        };

        fullContent += payload.text || '';
      }
    }

    // Parse theme names from response
    const text = fullContent.replace(/```json\s*|\s*```/g, '').trim();
    const items = text.split(/,|，|\n/).map((item) => item.trim()).filter(Boolean);
    const result = items.slice(0, 6);

    // If parsing failed or got no results, use fallback
    if (result.length === 0) {
      if (localeKey === 'cn') {
        return ['禅意简约', '科技蓝调', '温暖暖橙', '清新森绿', '优雅紫罗兰', '深色暗夜'];
      }
      return ['Zen Minimal', 'Tech Blue', 'Warm Orange', 'Fresh Green', 'Elegant Purple', 'Dark Night'];
    }
    return result;
  } catch (error) {
    console.error('Error in fetchRecommendations:', error);
    // Return fallback themes
    return localeKey === 'cn'
      ? ['禅意简约', '科技蓝调', '温暖暖橙', '清新森绿', '优雅紫罗兰', '深色暗夜']
      : ['Zen Minimal', 'Tech Blue', 'Warm Orange', 'Fresh Green', 'Elegant Purple', 'Dark Night'];
  }
};

export default function usePromptRecommend(localeKey: keyof typeof locales = 'cn') {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchedKeyRef = useRef<string>('');

  const fetch = async (key: string) => {
    if (fetchedKeyRef.current === key) {
      return;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);

    try {
      const items = await fetchRecommendations(localeKey, abortController.signal);
      setRecommendations(items);
      fetchedKeyRef.current = key;
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) {
        console.error('Failed to fetch recommendations:', error);
        // Use fallback on error
        setRecommendations(
          localeKey === 'cn'
            ? ['禅意简约', '科技蓝调', '温暖暖橙', '清新森绿', '优雅紫罗兰', '深色暗夜']
            : ['Zen Minimal', 'Tech Blue', 'Warm Orange', 'Fresh Green', 'Elegant Purple', 'Dark Night'],
        );
        fetchedKeyRef.current = key;
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  return { recommendations, loading, fetch };
}