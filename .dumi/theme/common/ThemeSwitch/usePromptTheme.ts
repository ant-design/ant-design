/* eslint-disable compat/compat */
import { useState } from 'react';

import type { SiteContextProps } from '../../../theme/slots/SiteContext';

const fetchTheme = async (prompt: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: prompt,
      userId: 'AntDesignSite',
    }),
  };

  const response = await fetch('https://api.x.ant.design/api/agent_tbox_antd', options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default function usePromptTheme(
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void,
) {
  const [loading, setLoading] = useState(false);

  const submitPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);

    try {
      const data = await fetchTheme(prompt);

      console.log('Generated theme data:', data);

      // // Handle the response
      // if (data && onThemeChange) {
      //   onThemeChange({
      //     token: data,
      //   });
      // }
    } catch (error) {
      console.error('Failed to generate theme:', error);
    } finally {
      setLoading(false);
    }
  };

  return [submitPrompt, loading] as const;
}
