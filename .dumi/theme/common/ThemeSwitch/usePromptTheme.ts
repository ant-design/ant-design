/* eslint-disable compat/compat */
import { useRef, useState } from 'react';
import { XStream } from '@ant-design/x';

import type { SiteContextProps } from '../../../theme/slots/SiteContext';

const fetchTheme = async (
  prompt: string,
  update: (currentFullContent: string) => void,
  abortSignal?: AbortSignal,
) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: prompt,
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
        update(fullContent);
      }
    }

    return fullContent;
  } catch (error) {
    console.error('Error in fetchTheme:', error);
    throw error;
  }
};

// Remove '```json' code block from the response
function getJsonText(raw: string, rmComment = false): string {
  const replaced = raw.trim().replace(/^```json\s*|\s*```$/g, '');

  return rmComment ? replaced.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '').trim() : replaced;
}

export default function usePromptTheme(
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void,
) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resText, setResText] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const submitPrompt = async (nextPrompt: string) => {
    if (!nextPrompt.trim()) {
      return;
    }

    setPrompt(nextPrompt);

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setResText('');

    try {
      const data = await fetchTheme(
        nextPrompt,
        (currentContent) => {
          setResText(currentContent);
        },
        abortController.signal,
      );

      // Handle the response
      if (data && onThemeChange) {
        const nextConfig = JSON.parse(getJsonText(data, true));
        onThemeChange(nextConfig);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Request was aborted');
      } else {
        console.error('Failed to generate theme:', error);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  return [submitPrompt, loading, prompt, getJsonText(resText), cancelRequest] as const;
}
