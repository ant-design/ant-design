"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6718],{95529:function(c,o,t){t.r(o);var m=t(2143),p=t(50250),Z=t(59378),v=t(78190),a=t(74775),d=t(5937),h=t(2068),f=t(74399),x=t(46004),_=t(35708),g=t(30138),C=t(56140),u=t(5388),k=t(49545),y=t(92169),b=t(13140),M=t(95127),T=t(74418),O=t(97119),l=t(28257),s=t(67294),n=t(13946);function r(){var i=(0,l.eL)(),e=i.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value,(0,n.tZ)("code",null,e[2].value),e[3].value),(0,n.tZ)("p",null,e[4].value,(0,n.tZ)("code",null,e[5].value),e[6].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(u.Z,{items:[{demo:{id:"components-modal-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/modal/demo/basic.tsx",jsx:`import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u7B2C\u4E00\u4E2A\u5BF9\u8BDD\u6846\u3002</p>"}},{demo:{id:"components-modal-demo-async"},previewerProps:{title:"\u5F02\u6B65\u5173\u95ED",filename:"components/modal/demo/async.tsx",jsx:`import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u70B9\u51FB\u786E\u5B9A\u540E\u5F02\u6B65\u5173\u95ED\u5BF9\u8BDD\u6846\uFF0C\u4F8B\u5982\u63D0\u4EA4\u8868\u5355\u3002</p>"}},{demo:{id:"components-modal-demo-footer"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u9875\u811A",filename:"components/modal/demo/footer.tsx",jsx:`import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App;
`,description:`<p>\u66F4\u590D\u6742\u7684\u4F8B\u5B50\uFF0C\u81EA\u5B9A\u4E49\u4E86\u9875\u811A\u7684\u6309\u94AE\uFF0C\u70B9\u51FB\u63D0\u4EA4\u540E\u8FDB\u5165 loading \u72B6\u6001\uFF0C\u5B8C\u6210\u540E\u5173\u95ED\u3002</p>
<p>\u4E0D\u9700\u8981\u9ED8\u8BA4\u786E\u5B9A\u53D6\u6D88\u6309\u94AE\u65F6\uFF0C\u4F60\u53EF\u4EE5\u628A <code>footer</code> \u8BBE\u4E3A <code>null</code>\u3002</p>`}},{demo:{id:"components-modal-demo-confirm"},previewerProps:{title:"\u786E\u8BA4\u5BF9\u8BDD\u6846",filename:"components/modal/demo/confirm.tsx",jsx:`import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;
const showConfirm = () => {
  confirm({
    title: 'Do you Want to delete these items?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const showPromiseConfirm = () => {
  confirm({
    title: 'Do you want to delete these items?',
    icon: <ExclamationCircleFilled />,
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
};
const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const showPropsConfirm = () => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleFilled />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true,
    },
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const App = () => (
  <Space wrap>
    <Button onClick={showConfirm}>Confirm</Button>
    <Button onClick={showPromiseConfirm}>With promise</Button>
    <Button onClick={showDeleteConfirm} type="dashed">
      Delete
    </Button>
    <Button onClick={showPropsConfirm} type="dashed">
      With extra props
    </Button>
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>confirm()</code> \u53EF\u4EE5\u5FEB\u6377\u5730\u5F39\u51FA\u786E\u8BA4\u6846\u3002onCancel/onOk \u8FD4\u56DE promise \u53EF\u4EE5\u5EF6\u8FDF\u5173\u95ED\u3002</p>"}},{demo:{id:"components-modal-demo-info"},previewerProps:{title:"\u4FE1\u606F\u63D0\u793A",filename:"components/modal/demo/info.tsx",jsx:`import React from 'react';
import { Button, Modal, Space } from 'antd';
const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
};
const success = () => {
  Modal.success({
    content: 'some messages...some messages...',
  });
};
const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};
const warning = () => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};
const App = () => (
  <Space wrap>
    <Button onClick={info}>Info</Button>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
  </Space>
);
export default App;
`,description:"<p>\u5404\u79CD\u7C7B\u578B\u7684\u4FE1\u606F\u63D0\u793A\uFF0C\u53EA\u63D0\u4F9B\u4E00\u4E2A\u6309\u94AE\u7528\u4E8E\u5173\u95ED\u3002</p>"}},{demo:{id:"components-modal-demo-locale"},previewerProps:{title:"\u56FD\u9645\u5316",filename:"components/modal/demo/locale.tsx",jsx:`import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const LocalizedModal = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Modal
      </Button>
      <Modal
        title="Modal"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="\u786E\u8BA4"
        cancelText="\u53D6\u6D88"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </>
  );
};
const confirm = () => {
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: 'Bla bla ...',
    okText: '\u786E\u8BA4',
    cancelText: '\u53D6\u6D88',
  });
};
const App = () => (
  <Space>
    <LocalizedModal />
    <Button onClick={confirm}>Confirm</Button>
  </Space>
);
export default App;
`,description:"<p>\u8BBE\u7F6E <code>okText</code> \u4E0E <code>cancelText</code> \u4EE5\u81EA\u5B9A\u4E49\u6309\u94AE\u6587\u5B57\u3002</p>"}},{demo:{id:"components-modal-demo-manual"},previewerProps:{title:"\u624B\u52A8\u66F4\u65B0\u548C\u79FB\u9664",filename:"components/modal/demo/manual.tsx",jsx:`import React from 'react';
import { Button, Modal } from 'antd';
const countDown = () => {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: 'This is a notification message',
    content: \`This modal will be destroyed after \${secondsToGo} second.\`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: \`This modal will be destroyed after \${secondsToGo} second.\`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
const App = () => <Button onClick={countDown}>Open modal to close in 5s</Button>;
export default App;
`,description:"<p>\u624B\u52A8\u66F4\u65B0\u548C\u5173\u95ED <code>Modal.method</code> \u65B9\u5F0F\u521B\u5EFA\u7684\u5BF9\u8BDD\u6846\u3002</p>"}},{demo:{id:"components-modal-demo-position"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u4F4D\u7F6E",filename:"components/modal/demo/position.tsx",jsx:`import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setModal1Open(true)}>
        Display a modal dialog at 20px to Top
      </Button>
      <Modal
        title="20px to Top"
        style={{
          top: 20,
        }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <br />
      <br />
      <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u4F7F\u7528 <code>centered</code> \u6216\u7C7B\u4F3C <code>style.top</code> \u7684\u6837\u5F0F\u6765\u8BBE\u7F6E\u5BF9\u8BDD\u6846\u4F4D\u7F6E\u3002</p>"}},{demo:{id:"components-modal-demo-confirm-router"},previewerProps:{title:"\u9500\u6BC1\u786E\u8BA4\u5BF9\u8BDD\u6846",filename:"components/modal/demo/confirm-router.tsx",jsx:`import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
const { confirm } = Modal;
const destroyAll = () => {
  Modal.destroyAll();
};
const showConfirm = () => {
  for (let i = 0; i < 3; i += 1) {
    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button onClick={destroyAll}>Click to destroy all</Button>,
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }, i * 500);
  }
};
const App = () => <Button onClick={showConfirm}>Confirm</Button>;
export default App;
`,description:"<p>\u4F7F\u7528 <code>Modal.destroyAll()</code> \u53EF\u4EE5\u9500\u6BC1\u5F39\u51FA\u7684\u786E\u8BA4\u7A97\u3002\u901A\u5E38\u7528\u4E8E\u8DEF\u7531\u76D1\u542C\u5F53\u4E2D\uFF0C\u5904\u7406\u8DEF\u7531\u524D\u8FDB\u3001\u540E\u9000\u4E0D\u80FD\u9500\u6BC1\u786E\u8BA4\u5BF9\u8BDD\u6846\u7684\u95EE\u9898\u3002</p>"}},{demo:{id:"components-modal-demo-dark"},previewerProps:{debug:!0,title:"\u6697\u80CC\u666F",filename:"components/modal/demo/dark.tsx",jsx:`// @ts-nocheck
import React, { useState } from 'react';
import {
  Modal,
  DatePicker,
  Slider,
  Tree,
  Badge,
  Collapse,
  Timeline,
  Tabs,
  Anchor,
  Table,
  Card,
  Button,
  Calendar,
  Transfer,
  Switch,
  Typography,
  Dropdown,
} from 'antd';
import difference from 'lodash/difference';
import { DownOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { Panel } = Collapse;
const { TreeNode } = Tree;
const { TabPane } = Tabs;
const { Meta } = Card;
const { Link } = Anchor;
const { Text } = Typography;
const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: \`content\${i + 1}\`,
    description: \`description of content\${i + 1}\`,
    disabled: i % 3 < 1,
  });
}
const oriTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const columnsTable = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Borrow',
    dataIndex: 'borrow',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
  },
];
const dataTable = [
  {
    key: '1',
    name: 'John Brown',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: 'Jim Green',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: 'Jim Red',
    borrow: 75,
    repayment: 45,
  },
];
const expandedRowRender = () => {
  const columnsExpand = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'state',
      render: () => (
        <span>
          <Badge status="success" />
          Finished
        </span>
      ),
    },
    {
      title: 'Upgrade Status',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];
  const dataExpand = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return <Table columns={columnsExpand} dataSource={dataExpand} pagination={false} />;
};
const columnsNest = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Upgraded',
    dataIndex: 'upgradeNum',
    key: 'upgradeNum',
  },
  {
    title: 'Creator',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    key: 'operation',
    render: () => <a>Publish</a>,
  },
];
const dataNest = [];
for (let i = 0; i < 3; ++i) {
  dataNest.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}
const columnsFixed = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
const dataFixed = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          id="components-transfer-table"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : null,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);
export default () => {
  const [open, setOpen] = useState(false);
  const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const handleDisable = (isDisabled) => {
    setDisabled(isDisabled);
  };
  const handleTableTransferChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const triggerDisable = (isDisabled) => {
    setDisabled(isDisabled);
  };
  const triggerShowSearch = (isShowSearch) => {
    setShowSearch(isShowSearch);
  };
  const handleTransferChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const handleTransferSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: true,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: false,
      sortOrder: true,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filteredValue: null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: false,
      sortOrder: true,
      ellipsis: true,
    },
  ];
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={handleDisable}
          style={{
            marginBottom: 16,
          }}
        />
        <Card title="Card Title">
          <Card.Grid>Content</Card.Grid>
          <Card.Grid hoverable={false}>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
          <Card.Grid>Content</Card.Grid>
        </Card>
        <Collapse>
          <Panel header="This is panel header 1" key="1">
            <Collapse defaultActiveKey="1">
              <Panel header="This is panel nest panel" key="1">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
        <Transfer
          dataSource={mockData}
          titles={['Source', 'Target']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleTransferChange}
          onSelectChange={handleTransferSelectChange}
          render={(item) => item.title}
          disabled={disabled}
        />
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          onChange={handleTableTransferChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag?.indexOf(inputValue) !== -1
          }
          leftColumns={[
            {
              dataIndex: 'title',
              title: 'Name',
            },
            {
              dataIndex: 'description',
              title: 'Description',
            },
          ]}
          rightColumns={[
            {
              dataIndex: 'title',
              title: 'Name',
            },
          ]}
        />
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={triggerDisable}
          style={{
            marginTop: 16,
          }}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={triggerShowSearch}
          style={{
            marginTop: 16,
          }}
        />
        <Anchor>
          <Link href="#components-anchor-demo-basic" title="Basic demo" />
          <Link href="#components-anchor-demo-static" title="Static demo" />
          <Link
            href="#components-anchor-demo-basic"
            title="Basic demo with Target"
            target="_blank"
          />
          <Link href="#API" title="API">
            <Link href="#Anchor-Props" title="Anchor Props" />
            <Link href="#Link-Props" title="Link Props" />
          </Link>
        </Anchor>
        <Tabs type="card">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
        <Timeline>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item
            dot={
              <ClockCircleOutlined
                style={{
                  fontSize: '16px',
                }}
              />
            }
            color="red"
          >
            Technical testing 2015-09-01
          </Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
        <Calendar />
        <Tree showLine switcherIcon={<DownOutlined />} defaultExpandedKeys={['0-0-0']}>
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
              <TreeNode title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title="leaf" key="0-0-1-0" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2">
              <TreeNode title="leaf" key="0-0-2-0" />
              <TreeNode title="leaf" key="0-0-2-1" />
            </TreeNode>
          </TreeNode>
        </Tree>
        <Table columns={columns} dataSource={data} footer={() => 'Footer'} />
        <Table
          columns={columnsTable}
          dataSource={dataTable}
          pagination={false}
          id="table-demo-summary"
          bordered
          summary={(pageData) => {
            let totalBorrow = 0;
            let totalRepayment = 0;
            pageData.forEach(({ borrow, repayment }) => {
              totalBorrow += borrow;
              totalRepayment += repayment;
            });
            return (
              <>
                <tr>
                  <th>Total</th>
                  <td>
                    <Text type="danger">{totalBorrow}</Text>
                  </td>
                  <td>
                    <Text>{totalRepayment}</Text>
                  </td>
                </tr>
                <tr>
                  <th>Balance</th>
                  <td colSpan={2}>
                    <Text type="danger">{totalBorrow - totalRepayment}</Text>
                  </td>
                </tr>
              </>
            );
          }}
        />
        <br />
        <Table
          columns={columnsNest}
          expandable={{
            expandedRowRender,
          }}
          dataSource={dataNest}
        />
        <Table
          columns={columnsFixed}
          dataSource={dataFixed}
          scroll={{
            x: 1300,
            y: 100,
          }}
        />
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Slider defaultValue={30} />
        <DatePicker defaultValue={dayjs('2015/01/01', 'YYYY/MM/DD')} format="YYYY/MM/DD" />
        <Badge count={5}>
          <a href="#" className="head-example" />
        </Badge>
      </Modal>
    </>
  );
};
`,description:"<p>\u7B2C\u4E00\u4E2A\u5BF9\u8BDD\u6846\u3002</p>",style:`  [data-theme="dark"] #table-demo-summary tfoot th,
  [data-theme="dark"] #table-demo-summary tfoot td {
    background: #272727;
  }
  [data-theme="dark"] #components-transfer-table.ant-table td {
    background: transparent;
  }`}},{demo:{id:"components-modal-demo-button-props"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u9875\u811A\u6309\u94AE\u5C5E\u6027",filename:"components/modal/demo/button-props.tsx",jsx:`import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized button props
      </Button>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u4F20\u5165 <code>okButtonProps</code> \u548C <code>cancelButtonProps</code> \u53EF\u5206\u522B\u81EA\u5B9A\u4E49\u786E\u5B9A\u6309\u94AE\u548C\u53D6\u6D88\u6309\u94AE\u7684 props\u3002</p>"}},{demo:{id:"components-modal-demo-hooks"},previewerProps:{title:"\u4F7F\u7528 hooks \u83B7\u5F97\u4E0A\u4E0B\u6587",filename:"components/modal/demo/hooks.tsx",jsx:`import React, { createContext } from 'react';
import { Button, Modal, Space } from 'antd';
const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);
const config = {
  title: 'Use Hook!',
  content: (
    <>
      <ReachableContext.Consumer>{(name) => \`Reachable: \${name}!\`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{(name) => \`Unreachable: \${name}!\`}</UnreachableContext.Consumer>
    </>
  ),
};
const App = () => {
  const [modal, contextHolder] = Modal.useModal();
  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button
          onClick={() => {
            modal.confirm(config);
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            modal.warning(config);
          }}
        >
          Warning
        </Button>
        <Button
          onClick={() => {
            modal.info(config);
          }}
        >
          Info
        </Button>
        <Button
          onClick={() => {
            modal.error(config);
          }}
        >
          Error
        </Button>
      </Space>
      {/* \`contextHolder\` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since \`contextHolder\` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};
export default App;
`,description:"<p>\u901A\u8FC7 <code>Modal.useModal</code> \u521B\u5EFA\u652F\u6301\u8BFB\u53D6 context \u7684 <code>contextHolder</code>\u3002</p>"}},{demo:{id:"components-modal-demo-modal-render"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u6E32\u67D3\u5BF9\u8BDD\u6846",filename:"components/modal/demo/modal-render.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import Draggable from 'react-draggable';
const App = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
    <>
      <Button onClick={showModal}>Open Draggable Modal</Button>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Draggable Modal
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <p>
          Just don&apos;t learn physics at school and your life will be full of magic and miracles.
        </p>
        <br />
        <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u6E32\u67D3\u5BF9\u8BDD\u6846, \u53EF\u901A\u8FC7 <code>react-draggable</code> \u6765\u5B9E\u73B0\u62D6\u62FD\u3002</p>"}},{demo:{id:"components-modal-demo-width"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u6A21\u6001\u7684\u5BBD\u5EA6",filename:"components/modal/demo/width.tsx",jsx:`import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u4F7F\u7528 <code>width</code> \u6765\u8BBE\u7F6E\u6A21\u6001\u5BF9\u8BDD\u6846\u7684\u5BBD\u5EA6\u3002</p>"}},{demo:{id:"components-modal-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/modal/demo/render-panel.tsx",jsx:`import React from 'react';
import { Modal } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;
export default () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 16,
    }}
  >
    <InternalPanel
      title="Hello World!"
      style={{
        width: '100%',
        height: 200,
      }}
    >
      Hello World?!
    </InternalPanel>
    <InternalPanel
      type="success"
      style={{
        width: 200,
        height: 150,
      }}
    >
      A good news!
    </InternalPanel>
    <InternalPanel
      title="Confirm This?"
      type="confirm"
      style={{
        width: 300,
        height: 200,
      }}
    >
      Some descriptions.
    </InternalPanel>
  </div>
);
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-modal-demo-custom-mouse-position"},previewerProps:{debug:!0,title:"control modal's animation origin position",filename:"components/modal/demo/custom-mouse-position.tsx",jsx:`import { Button, Modal } from 'antd';
import React, { useState } from 'react';
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mousePosition={{
          x: 300,
          y: 300,
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App;
`,description:"<p>\u901A\u8FC7 <code>mousePosition</code> \u63A7\u5236\u5F39\u6846\u52A8\u753B\u539F\u70B9.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(d.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value),(0,n.tZ)("th",null,e[9].value),(0,n.tZ)("th",null,e[10].value),(0,n.tZ)("th",null,e[11].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"/components/button/#API"},e[21].value)),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[26].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value,(0,n.tZ)("code",null,e[54].value)),(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[61].value),(0,n.tZ)("td",null,e[62].value,(0,n.tZ)("code",null,e[63].value),e[64].value),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,e[78].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,e[83].value),(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null,e[86].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"/components/button/#API"},e[89].value)),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[94].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[98].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value,(0,n.tZ)("code",null,e[121].value)),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null,e[129].value),(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"\u6CE8\u610F"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6CE8\u610F"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u6CE8\u610F"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[132].value),e[133].value,(0,n.tZ)("code",null,e[134].value),e[135].value),(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[136].value),e[137].value,(0,n.tZ)("code",null,e[138].value),e[139].value,(0,n.tZ)("code",null,e[140].value),e[141].value),(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[142].value),e[143].value)),(0,n.tZ)("h3",{id:"modalmethod"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#modalmethod"},(0,n.tZ)("span",{className:"icon icon-link"})),"Modal.method()"),(0,n.tZ)("p",null,e[144].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[145].value)),(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[146].value)),(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[147].value)),(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[148].value)),(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[149].value))),(0,n.tZ)("p",null,e[150].value),(0,n.tZ)(d.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[151].value),(0,n.tZ)("th",null,e[152].value),(0,n.tZ)("th",null,e[153].value),(0,n.tZ)("th",null,e[154].value),(0,n.tZ)("th",null,e[155].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null,e[159].value),(0,n.tZ)("td",null,e[160].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[161].value),(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null,e[163].value,(0,n.tZ)("code",null,e[164].value),e[165].value,(0,n.tZ)("code",null,e[166].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[167].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[168].value),(0,n.tZ)("td",null,e[169].value),(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null),(0,n.tZ)("td",null,e[171].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[172].value),(0,n.tZ)("td",null,e[173].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"/components/button/#API"},e[174].value)),(0,n.tZ)("td",null,e[175].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[176].value),(0,n.tZ)("td",null,e[177].value),(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[179].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[180].value),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null,e[182].value),(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null,e[192].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null,e[194].value),(0,n.tZ)("td",null,e[195].value),(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null,e[197].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,e[200].value),(0,n.tZ)("td",null,e[201].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[206].value),(0,n.tZ)("td",null,e[207].value),(0,n.tZ)("td",null,e[208].value),(0,n.tZ)("td",null,e[209].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[210].value),(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null,e[212].value),(0,n.tZ)("td",null,e[213].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null,e[215].value),(0,n.tZ)("td",null,e[216].value),(0,n.tZ)("td",null,e[217].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[218].value),(0,n.tZ)("td",null,e[219].value),(0,n.tZ)("td",null,e[220].value),(0,n.tZ)("td",null,e[221].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[222].value),(0,n.tZ)("td",null,e[223].value),(0,n.tZ)("td",null,e[224].value),(0,n.tZ)("td",null,e[225].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[226].value),(0,n.tZ)("td",null,e[227].value),(0,n.tZ)("td",null,(0,n.tZ)(l.rU,{to:"/components/button/#API"},e[228].value)),(0,n.tZ)("td",null,e[229].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[230].value),(0,n.tZ)("td",null,e[231].value),(0,n.tZ)("td",null,e[232].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[233].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[237].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[238].value),(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null,e[241].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[242].value),(0,n.tZ)("td",null,e[243].value),(0,n.tZ)("td",null,e[244].value),(0,n.tZ)("td",null,e[245].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null,e[249].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[250].value),(0,n.tZ)("td",null,e[251].value),(0,n.tZ)("td",null,e[252].value),(0,n.tZ)("td",null,e[253].value),(0,n.tZ)("td",null,e[254].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[255].value),(0,n.tZ)("td",null,e[256].value,(0,n.tZ)("code",null,e[257].value)),(0,n.tZ)("td",null,e[258].value),(0,n.tZ)("td",null,e[259].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[260].value),(0,n.tZ)("td",null,e[261].value),(0,n.tZ)("td",null,e[262].value),(0,n.tZ)("td",null,e[263].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[264].value),(0,n.tZ)("td",null,e[265].value),(0,n.tZ)("td",null,e[266].value),(0,n.tZ)("td",null,e[267].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,e[268].value),(0,n.tZ)(a.Z,{lang:"jsx"},e[269].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("code",null,e[270].value))),(0,n.tZ)("p",null,e[271].value,(0,n.tZ)("code",null,e[272].value),e[273].value,(0,n.tZ)("code",null,e[274].value),e[275].value,(0,n.tZ)("code",null,e[276].value),e[277].value,(0,n.tZ)("code",null,e[278].value),e[279].value,(0,n.tZ)("code",null,e[280].value),e[281].value,(0,n.tZ)("code",null,e[282].value),e[283].value,(0,n.tZ)("code",null,e[284].value),e[285].value),(0,n.tZ)(a.Z,{lang:"jsx"},e[286].value),(0,n.tZ)("h3",{id:"modalusemodal"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#modalusemodal"},(0,n.tZ)("span",{className:"icon icon-link"})),"Modal.useModal()"),(0,n.tZ)("p",null,e[287].value,(0,n.tZ)("code",null,e[288].value),e[289].value,(0,n.tZ)("code",null,e[290].value),e[291].value,(0,n.tZ)("code",null,e[292].value),e[293].value,(0,n.tZ)("code",null,e[294].value),e[295].value,(0,n.tZ)(l.rU,{to:"#Modal.method()"},(0,n.tZ)("code",null,e[296].value)),e[297].value),(0,n.tZ)(a.Z,{lang:"jsx"},e[298].value),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-modal-\u5173\u95ED\u65F6\u5185\u5BB9\u4E0D\u4F1A\u66F4\u65B0"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-modal-\u5173\u95ED\u65F6\u5185\u5BB9\u4E0D\u4F1A\u66F4\u65B0"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 Modal \u5173\u95ED\u65F6\uFF0C\u5185\u5BB9\u4E0D\u4F1A\u66F4\u65B0\uFF1F"),(0,n.tZ)("p",null,e[299].value,(0,n.tZ)("code",null,e[300].value),e[301].value,(0,n.tZ)("code",null,e[302].value),e[303].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-modal-\u65B9\u6CD5\u4E0D\u80FD\u83B7\u53D6-contextredux\u7684\u5185\u5BB9\u548C-configprovider-localeprefixclstheme-\u7B49\u914D\u7F6E"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-modal-\u65B9\u6CD5\u4E0D\u80FD\u83B7\u53D6-contextredux\u7684\u5185\u5BB9\u548C-configprovider-localeprefixclstheme-\u7B49\u914D\u7F6E"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 Modal \u65B9\u6CD5\u4E0D\u80FD\u83B7\u53D6 context\u3001redux\u3001\u7684\u5185\u5BB9\u548C ConfigProvider ",(0,n.tZ)("code",null,e[304].value)," \u7B49\u914D\u7F6E\uFF1F"),(0,n.tZ)("p",null,e[305].value,(0,n.tZ)("code",null,e[306].value),e[307].value),(0,n.tZ)("p",null,e[308].value,(0,n.tZ)("code",null,e[309].value),e[310].value,(0,n.tZ)("code",null,e[311].value),e[312].value,(0,n.tZ)("code",null,e[313].value),e[314].value),(0,n.tZ)(a.Z,{lang:"tsx"},e[315].value),(0,n.tZ)("p",null,(0,n.tZ)("strong",null,e[316].value),e[317].value,(0,n.tZ)("code",null,e[318].value),e[319].value),(0,n.tZ)("h3",{id:"\u5982\u4F55\u5173\u95ED-modal-\u52A8\u753B"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u5173\u95ED-modal-\u52A8\u753B"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u5173\u95ED Modal \u52A8\u753B\uFF1F"),(0,n.tZ)("p",null,e[320].value,(0,n.tZ)("code",null,e[321].value),e[322].value,(0,n.tZ)("code",null,e[323].value),e[324].value),(0,n.tZ)("h3",{id:"\u9759\u6001\u65B9\u6CD5\u5982\u4F55\u8BBE\u7F6E-prefixcls-"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u9759\u6001\u65B9\u6CD5\u5982\u4F55\u8BBE\u7F6E-prefixcls-"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u9759\u6001\u65B9\u6CD5\u5982\u4F55\u8BBE\u7F6E prefixCls \uFF1F"),(0,n.tZ)("p",null,e[325].value,(0,n.tZ)(l.rU,{to:"/components/config-provider/#ConfigProvider.config()-4.13.0+"},(0,n.tZ)("code",null,e[326].value)),e[327].value))))}o.default=r}}]);
