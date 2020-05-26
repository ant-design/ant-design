import styled from 'styled-components';

import Columns from '../columns';

// Varnish menu Item columns for text with an icon.
const IconMenuItemColumns = styled(Columns as any).attrs({ /* any fixes a bug, https://github.com/microsoft/TypeScript/issues/37597 */
    count: 2,
})`
    grid-template-columns: min-content 1fr;
    justify-items: start;
    align-items: center;
    grid-gap: 0;
`;

export default IconMenuItemColumns;
