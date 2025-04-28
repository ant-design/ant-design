import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';

const App = () => {
  const [show, setShow] = React.useState(false);
  const [panelShow, setPanelShow] = React.useState(false);

  const [date, setDate] = React.useState(dayjs());

  return (
    <Space>
      <Dropdown
        arrow
        open={show}
        trigger={['click']}
        destroyPopupOnHide
        onOpenChange={(open) => {
          setShow(open);

          if (!open) {
            setPanelShow(false);
          }
        }}
        menu={{
          items: [
            {
              key: 'today',
              label: <div>Today</div>,
              onClick() {
                setDate(dayjs());
                setShow(false);
              },
            },
            {
              key: 'tomorrow',
              label: <div>Tomorrow </div>,
              onClick() {
                setDate(dayjs().add(1, 'day'));
                setShow(false);
              },
            },
            {
              key: 'custom-date',
              label: (
                <div
                  style={{ position: 'relative' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPanelShow(true);
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
                      open={panelShow}
                      onChange={(date) => {
                        setDate(date);
                        setShow(false);
                        setPanelShow(false);
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
