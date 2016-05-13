/* eslint no-console:0 */
// this file is not used if use https://github.com/ant-design/babel-plugin-antd

import {
  Rate, Affix, DatePicker, Tooltip, Tag, Carousel, Tabs, Modal, Dropdown, Progress, Popover, Select,
  Breadcrumb, Popconfirm, Pagination, Steps, InputNumber, Switch, Checkbox, Table, Collapse, message,
  Slider, QueueAnim, Radio, notification, Alert, Validation, Tree, TreeSelect, Upload,
  Badge, Menu, Timeline, Button, Icon, Row, Col, Spin, Form, Input, Calendar, TimePicker,
  Card, LocaleProvider, Transfer, Cascader,
} from 'antd';

// copy from above
const antd = {
  Rate, Affix, DatePicker, Tooltip, Tag, Carousel, Tabs, Modal, Dropdown, Progress, Popover, Select,
  Breadcrumb, Popconfirm, Pagination, Steps, InputNumber, Switch, Checkbox, Table, Collapse, message,
  Slider, QueueAnim, Radio, notification, Alert, Validation, Tree, TreeSelect, Upload,
  Badge, Menu, Timeline, Button, Icon, Row, Col, Spin, Form, Input, Calendar, TimePicker,
  Card, LocaleProvider, Transfer, Cascader,
};

if (process.env.NODE_ENV !== 'production') {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(`you are using prebuild antd,
please use https://github.com/ant-design/babel-plugin-antd to reduce app bundle size.`);
  }
}

export default antd;
