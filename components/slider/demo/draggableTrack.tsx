import React from 'react';
import { Slider } from 'antd';

const App = () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />;

export default App;
