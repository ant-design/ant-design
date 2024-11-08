import { emojiFlag } from '@rapideditor/country-coder';
import twemoji from '@twemoji/api';
import type { CountryCode } from 'libphonenumber-js';
import { usePhoneInputContext } from '../PhoneInputContext';
import React from 'react';

export function CountryFlag({ countryCode }: { countryCode?: CountryCode }) {
  const { customRegions } = usePhoneInputContext();
  const customEmoji = customRegions?.find((region) => region.value === countryCode)?.emoji;
  const emoji = customEmoji || (countryCode && emojiFlag(countryCode)) || '🌐';
  const imgStr = twemoji.parse(emoji, {
    folder: 'svg',
    ext: '.svg',
  });

  const src = imgStr.split('src="')[1].split('"')[0];

  return <img src={src} alt={countryCode} width={24} />;
}
