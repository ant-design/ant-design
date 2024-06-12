import React from 'react';
import type { InputNumberProps } from 'antd';
import { ConfigProvider, Flex, Input, InputNumber, Radio } from 'antd';

class App extends React.Component {
  state = {
    size: 'middle',
  };

  render() {
    const { size } = this.state;

    return (
      <Flex className="App" vertical gap={16}>
        <Radio.Group
          value={size}
          onChange={(e) => {
            this.setState({
              size: e.target.value,
            });
          }}
          optionType="button"
          options={[
            {
              label: 'small',
              value: 'small',
            },
            {
              label: 'middle',
              value: 'middle',
            },
            {
              label: 'large',
              value: 'large',
            },
          ]}
          style={{ marginBottom: 16 }}
        />
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                inputFontSize: 30,
                inputFontSizeSM: 20,
                inputFontSizeLG: 40,
              },
            },
          }}
        >
          <InputNumber defaultValue={11111} size="small" />
          <InputNumber defaultValue={11111} />
          <InputNumber defaultValue={11111} size="large" />
        </ConfigProvider>
        {/* <ConfigProvider
          theme={{
            components: {
              Input: {
                inputFontSize: 20,
                inputFontSizeSM: 12,
                inputFontSizeLG: 30,
              },
            },
          }}
        >
          <Input defaultValue={"Input: 11111"} size={size} />
        </ConfigProvider> */}

        <InputNumber value={123} size="small" />
        <InputNumber value={123} />
        <InputNumber value={123} size="large" />
      </Flex>
    );
  }
}
export default App;
