import { useState, useEffect } from 'react';
import { isTwoCNChar } from '../buttonHelpers';

export default function useTwoCNChar(
  buttonRef: React.RefObject<HTMLButtonElement | HTMLAnchorElement | null>,
  mergedInsertSpace: boolean,
  needInserted: boolean,
): boolean {
  const [hasTwoCNChar, setHasTwoCNChar] = useState<boolean>(false);

  useEffect(() => {
    if (!buttonRef.current || !mergedInsertSpace) {
      return;
    }
    const buttonText = buttonRef.current.textContent || '';
    setHasTwoCNChar(needInserted && isTwoCNChar(buttonText));
  });

  return hasTwoCNChar;
}
