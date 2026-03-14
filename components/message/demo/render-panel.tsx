import React from 'react';
import { message } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = message;

const RenderPanelDemo = () => <InternalPanel content="Hello World!" type="error" />;

export default RenderPanelDemo;
