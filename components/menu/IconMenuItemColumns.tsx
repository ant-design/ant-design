import styled from 'styled-components';

import Columns from '../columns';

// Varnish menu Item columns for text with an icon.
const IconMenuItemColumns = styled(Columns).attrs({
    count: 2,
})`
    grid-template-columns: min-content 1fr;
    align-items: center;
    gap: 0;
    height: 100%;
`;

export default IconMenuItemColumns;
