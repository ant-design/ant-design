import type { SiteContextProps } from '../../../theme/slots/SiteContext';

export default function usePromptTheme(
  onThemeChange?: (themeConfig: SiteContextProps['dynamicTheme']) => void,
) {
  const submitPrompt = (_prompt: string) => {
    // TODO: Implement prompt theme generation logic
    onThemeChange?.({
      token: {
        colorPrimary: '#ff0000',
      },
    });
  };

  return [submitPrompt] as const;
}
