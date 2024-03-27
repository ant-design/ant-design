import type { ScrollBarToken } from '../../interface/maps';

function genScrollbarToken(): ScrollBarToken {
  return {
    scrollbarColor: 'auto',
    scrollbarWidth: 'auto',
    scrollbarGutter: 'auto',
  };
}

export default genScrollbarToken;
