import React from 'react';
import { Mentions } from 'antd';

const { Option } = Mentions;
function onChange() {}
function onSelect() {}
export default () => (
  <Mentions
    style={{ width: '100%' }}
    onChange={onChange}
    onSelect={onSelect}
    defaultValue="@afc163"
  >
    {' '}
    <Option value="afc163">afc163</Option> <Option value="zombieJ">zombieJ</Option>{' '}
    <Option value="yesmeck">yesmeck</Option>{' '}
  </Mentions>
);
