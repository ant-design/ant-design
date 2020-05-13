import React, { useState } from 'react';

interface Props {
    children: string;
    maxLength?: number;
    expanded?: boolean;
    showLessText?: string;
    showMoreText?: string;
}

const PATTERN_NON_WORD_CHAR = /\W/;
const PATTERN_WORD_CHAR = /\w/;
const ELLIPSIS = '…';

/**
 * If the provided string exceeds the provided max length, returns a truncated
 * string with an appended ellipsis. The method avoids breaking mid-word.
 *
 * @param {string} text The text to truncate.
 * @param {number} maxLengthgth The maximum number of characters to show.
 *
 * @return {string} the truncated text, or full text if it's shorter than the provided maxLength.
 */
function ellipsize(text: string, maxLength = 60) {
  if (typeof maxLength !== 'number') {
      throw new Error('maxLength must be a number');
  }
  maxLength -= ELLIPSIS.length;
  if (text && text.length > maxLength) {
      while (
          maxLength > 1 &&
          (!PATTERN_WORD_CHAR.test(text[maxLength - 1]) ||
              !PATTERN_NON_WORD_CHAR.test(text[maxLength]))
      ) {
          maxLength -= 1;
      }
      if (maxLength === 1) {
          return text;
      }
      return text.substring(0, maxLength) + ELLIPSIS;
  }
  return text;
}

// eslint-disable-next-line import/prefer-default-export
export const MaxLengthText = ({
    children: text,
    maxLength,
    expanded,
    showLessText,
    showMoreText,
}: Props) => {
    const [isExpanded, setIsExpanded] = useState(expanded || false);
    const maybeTruncatedText = ellipsize(text, maxLength);
    const isTruncated = maybeTruncatedText !== text;
    const toggle = isTruncated ? (
        <>
            {' '}
            <a onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? showLessText || 'less' : showMoreText || 'more'}
            </a>
        </>
    ) : null;
    return (
        <span>
            {isExpanded ? text : maybeTruncatedText}
            {toggle}
        </span>
    );
};
