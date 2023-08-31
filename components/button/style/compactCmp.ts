// Style as inline component
import { prepareToken } from '.';
import { genCompactItemStyle } from '../../style/compact-item';
import { genCompactItemVerticalStyle } from '../../style/compact-item-vertical';
import { genSubStyleComponent } from '../../theme/internal';

// ============================== Export ==============================
export default genSubStyleComponent(['Button', 'compact'], (token) => {
  const buttonToken = prepareToken(token);

  return [
    // Space Compact
    genCompactItemStyle(buttonToken),
    genCompactItemVerticalStyle(buttonToken),
  ];
});
