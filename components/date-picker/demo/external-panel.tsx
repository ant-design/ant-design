import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  const [panelVisible, setPanelVisible] = React.useState(false);

  const [date, setDate] = React.useState(dayjs());

  return (
    <Space>
      <Dropdown
        arrow
        open={visible}
        trigger={['click']}
        destroyPopupOnHide
        onOpenChange={(open) => {
          setVisible(open);

          if (!open) {
            setPanelVisible(false);
          }
        }}
        menu={{
          items: [
            {
              key: 'today',
              label: <div>Today</div>,
              onClick() {
                setDate(dayjs());
                setVisible(false);
              },
            },
            {
              key: 'tomorrow',
              label: <div>Tomorrow </div>,
              onClick() {
                setDate(dayjs().add(1, 'day'));
                setVisible(false);
              },
            },
            {
              key: 'custom-date',
              label: (
                <div
                  style={{ position: 'relative' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPanelVisible(true);
                  }}
                >
                  <div>Customize</div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      height: 0,
                      width: 0,
                      overflow: 'hidden',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    <DatePicker
                      open={panelVisible}
                      onChange={(date) => {
                        setDate(date);
                        setVisible(false);
                        setPanelVisible(false);
                      }}
                    />
                  </div>
                </div>
              ),
            },
          ],
        }}
      >
        <div>
          <span>{date.format('YYYY-MM-DD')}</span>

          <DownOutlined style={{ marginLeft: 8 }} />
        </div>
      </Dropdown>
    </Space>
  );
};

export default App;
