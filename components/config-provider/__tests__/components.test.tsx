import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Alert from '../../alert';
import Anchor from '../../anchor';
import AutoComplete from '../../auto-complete';
import Avatar from '../../avatar';
import Badge from '../../badge';
import Breadcrumb from '../../breadcrumb';
import Button from '../../button';
import Calendar from '../../calendar';
import Card from '../../card';
import Carousel from '../../carousel';
import Cascader from '../../cascader';
import Checkbox from '../../checkbox';
import Collapse from '../../collapse';
import ColorPicker from '../../color-picker';
import DatePicker from '../../date-picker';
import Divider from '../../divider';
import Drawer from '../../drawer';
import Dropdown from '../../dropdown';
import Empty from '../../empty';
import Form from '../../form';
import { Col, Row } from '../../grid';
import Input from '../../input';
import InputNumber from '../../input-number';
import Layout from '../../layout';
import List from '../../list';
import Menu from '../../menu';
import Modal from '../../modal';
import Pagination from '../../pagination';
import Popconfirm from '../../popconfirm';
import Popover from '../../popover';
import Progress from '../../progress';
import Radio from '../../radio';
import Rate from '../../rate';
import Select from '../../select';
import Skeleton from '../../skeleton';
import type { SliderTooltipProps } from '../../slider';
import Slider from '../../slider';
import Spin from '../../spin';
import Statistic from '../../statistic';
import Steps from '../../steps';
import Switch from '../../switch';
import type { ColumnsType } from '../../table';
import Table from '../../table';
import Tabs from '../../tabs';
import Tag from '../../tag';
import TimePicker from '../../time-picker';
import Timeline from '../../timeline';
import Tooltip from '../../tooltip';
import Transfer from '../../transfer';
import Tree from '../../tree';
import TreeSelect from '../../tree-select';
import Upload from '../../upload';

dayjs.extend(customParseFormat);

jest.mock('@rc-component/util/lib/Portal');

describe('ConfigProvider', () => {
  describe('components', () => {
    function testPair(name: string, renderComponent: (props?: any) => React.ReactElement): void {
      const isArray = ['Menu', 'TimePicker', 'Tooltip'].includes(name);
      describe(`${name}`, () => {
        // normal
        it('normal', () => {
          const { container } = render(renderComponent({}));
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });

        // prefixCls
        it('prefixCls', () => {
          const { container } = render(renderComponent({ prefixCls: `prefix-${name}` }));
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });

        // configProvider
        it('configProvider', () => {
          const { container } = render(
            <ConfigProvider prefixCls="config">{renderComponent({})}</ConfigProvider>,
          );
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });

        it('configProvider componentSize large', () => {
          const { container } = render(
            <ConfigProvider componentSize="large" prefixCls="config">
              {renderComponent({})}
            </ConfigProvider>,
          );
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });

        it('configProvider componentSize middle', () => {
          const { container } = render(
            <ConfigProvider componentSize="middle" prefixCls="config">
              {renderComponent({})}
            </ConfigProvider>,
          );
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });

        it('configProvider componentSize small', () => {
          const { container } = render(
            <ConfigProvider componentSize="small" prefixCls="config">
              {renderComponent({})}
            </ConfigProvider>,
          );
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });

        it('configProvider componentDisabled', () => {
          const { container } = render(
            <ConfigProvider componentDisabled prefixCls="config">
              {renderComponent({})}
            </ConfigProvider>,
          );
          expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
        });
      });
    }

    // Alert
    testPair('Alert', (props) => (
      <Alert {...props} message="Bamboo is Little Light" type="success" />
    ));

    // Anchor
    testPair('Anchor', (props) => (
      <Anchor {...props}>
        <Anchor.Link {...props} href="#bamboo" title="Little Light" />
      </Anchor>
    ));

    // AutoComplete
    testPair('AutoComplete', (props) => <AutoComplete {...props} />);

    // Avatar
    testPair('Avatar', (props) => <Avatar {...props} />);

    // Badge
    testPair('Badge', (props) => {
      const newProps = { ...props };

      // Hook for additional `scrollNumberPrefixCls` prop
      if (props.prefixCls) {
        newProps.scrollNumberPrefixCls = 'prefix-scroll-number';
      }

      return (
        <div>
          <Badge {...newProps} count={5}>
            <span />
          </Badge>
          <Badge {...newProps} dot>
            <span />
          </Badge>
        </div>
      );
    });

    // Breadcrumb
    testPair('Breadcrumb', (props) => (
      <Breadcrumb {...props}>
        <Breadcrumb.Item {...props}>Bamboo</Breadcrumb.Item>
        <Breadcrumb.Item {...props}>Light</Breadcrumb.Item>
      </Breadcrumb>
    ));

    // Button
    testPair('Button', (props) => (
      <div>
        <Button {...props}>Bamboo</Button>
        <Button.Group {...props}>
          <Button {...props}>Little</Button>
          <Button {...props}>Light</Button>
        </Button.Group>
      </div>
    ));

    // Calendar
    testPair('Calendar', (props) => (
      <div>
        <Calendar {...props} value={dayjs('2000-09-03')} mode="month" />
        <Calendar {...props} value={dayjs('2000-09-03')} mode="year" />
      </div>
    ));

    // Card
    testPair('Card', (props) => (
      <Card {...props}>
        <Card.Grid {...props}>
          <Card.Meta {...props} />
        </Card.Grid>
      </Card>
    ));

    // Carousel
    testPair('Carousel', (props) => (
      <Carousel {...props}>
        <div>
          <h3>Bamboo</h3>
        </div>
        <div>
          <h3>Light</h3>
        </div>
      </Carousel>
    ));

    // Cascader
    testPair('Cascader', (props) => <Cascader {...props} options={[]} showSearch />);

    // Checkbox
    testPair('Checkbox', (props) => (
      <Checkbox.Group {...props}>
        <Checkbox {...props}>Bamboo</Checkbox>
      </Checkbox.Group>
    ));

    // Collapse
    testPair('Collapse', (props) => (
      <Collapse {...props}>
        <Collapse.Panel key="Collapse" header="Bamboo">
          <p>Light</p>
        </Collapse.Panel>
      </Collapse>
    ));

    // ColorPicker
    testPair('ColorPicker', (props) => <ColorPicker {...props} />);

    // DatePicker
    describe('DatePicker', () => {
      testPair('DatePicker', (props) => (
        <div>
          <DatePicker {...props} />
        </div>
      ));

      // RangePicker
      testPair('RangePicker', (props) => (
        <div>
          <DatePicker.RangePicker {...props} />
        </div>
      ));

      // MonthPicker
      testPair('MonthPicker', (props) => (
        <div>
          <DatePicker.MonthPicker {...props} />
        </div>
      ));

      // WeekPicker
      testPair('WeekPicker', (props) => (
        <div>
          <DatePicker.WeekPicker {...props} />
        </div>
      ));
    });

    // Empty
    testPair('Empty', (props) => <Empty {...props} />);

    // Divider
    testPair('Divider', (props) => <Divider {...props} />);

    // Drawer
    testPair('Drawer', (props) => <Drawer {...props} open getContainer={false} />);

    // Dropdown
    testPair('Dropdown', (props) => <Dropdown.Button {...props}>Light</Dropdown.Button>);

    // Form
    testPair('Form', (props) => (
      <Form {...props}>
        <Form.Item {...props} validateStatus="error" help="Bamboo is Light">
          <Input {...props} />
        </Form.Item>
      </Form>
    ));

    // Grid
    testPair('Grid', (props) => {
      const rowProps: { prefixCls?: string } = {};
      const colProps: { prefixCls?: string } = {};
      if (props.prefixCls) {
        rowProps.prefixCls = 'prefix-row';
        colProps.prefixCls = 'prefix-col';
      }

      return (
        <Row {...rowProps}>
          <Col {...colProps} span={1} />
        </Row>
      );
    });

    // Input
    testPair('Input', (props) => (
      <div>
        <Input.Group {...props}>
          <Input {...props} />
          <Input.Search {...props} />
        </Input.Group>
        <Input.Password {...props} />
        <Input.TextArea {...props} />
      </div>
    ));

    // InputNumber
    testPair('InputNumber', (props) => <InputNumber {...props} />);

    // Layout
    testPair('Layout', (props) => {
      const siderProps: { prefixCls?: string } = {};
      const headerProps: { prefixCls?: string } = {};
      const contentProps: { prefixCls?: string } = {};
      const footerProps: { prefixCls?: string } = {};
      if (props.prefixCls) {
        siderProps.prefixCls = 'prefix-sider';
        headerProps.prefixCls = 'prefix-header';
        contentProps.prefixCls = 'prefix-content';
        footerProps.prefixCls = 'prefix-footer';
      }

      return (
        <Layout {...props}>
          <Layout.Sider {...siderProps} />
          <Layout {...props}>
            <Layout.Header {...headerProps} />
            <Layout.Content {...contentProps} />
            <Layout.Footer {...footerProps} />
          </Layout>
        </Layout>
      );
    });

    // List
    testPair('List', (props) => (
      <List
        {...props}
        itemLayout="horizontal"
        dataSource={['']}
        renderItem={() => (
          <List.Item {...props}>
            <List.Item.Meta
              {...props}
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=9" />}
              title="Ant Design"
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    ));

    // Menu
    testPair('Menu', (props) => (
      <Menu {...props} defaultOpenKeys={['bamboo']} mode="inline">
        <Menu.SubMenu {...props} key="bamboo" title="bamboo">
          <Menu.ItemGroup {...props} key="g1" title="Item 1">
            <Menu.Item {...props} key="1">
              Light
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    ));

    // Modal
    testPair('Modal', (props) => (
      <div>
        <Modal {...props} open getContainer={false}>
          Bamboo is Little Light
        </Modal>
      </div>
    ));

    // Pagination
    testPair('Pagination', (props) => (
      <div>
        <Pagination showSizeChanger showQuickJumper {...props} />
        <Pagination size="small" showSizeChanger showQuickJumper {...props} />
      </div>
    ));

    // Popconfirm
    testPair('Popconfirm', (props) => (
      <div>
        <Popconfirm {...props} open>
          <span>Bamboo</span>
        </Popconfirm>
      </div>
    ));

    // Popover
    testPair('Popover', (props) => (
      <div>
        <Popover {...props} open>
          <span>Light</span>
        </Popover>
      </div>
    ));

    // Progress
    testPair('Progress', (props) => <Progress {...props} />);

    // Radio
    testPair('Radio', (props) => (
      <div>
        <Radio.Group {...props}>
          <Radio {...props}>Bamboo</Radio>
        </Radio.Group>
        <Radio.Group {...props}>
          <Radio.Button {...props}>Light</Radio.Button>
        </Radio.Group>
      </div>
    ));

    // Rate
    testPair('Rate', (props) => <Rate {...props} />);

    // Select
    testPair('Select', (props) => (
      <Select {...props} open>
        <Select.OptGroup key="grp">
          <Select.Option key="Bamboo">Light</Select.Option>
        </Select.OptGroup>
      </Select>
    ));

    // Skeleton
    testPair('Skeleton', (props) => <Skeleton title avatar paragraph {...props} />);

    // Slider
    testPair('Slider', (props) => {
      const myProps = { ...props };
      const tooltip: SliderTooltipProps = {
        open: true,
      };

      if (myProps.prefixCls) {
        tooltip.prefixCls = `${myProps.prefixCls}-tooltip`;
      }
      return <Slider tooltip={tooltip} {...myProps} />;
    });

    // Spin
    testPair('Spin', (props) => <Spin {...props} />);

    // Statistic
    testPair('Statistic', (props) => <Statistic {...props} value={0} />);

    // Steps
    testPair('Steps', (props) => {
      const myProps = { ...props };
      if (props.prefixCls) {
        myProps.iconPrefix = 'prefixIcon';
      }
      return (
        <Steps
          {...props}
          items={[
            {
              title: 'Bamboo',
              description: 'Little Light',
            },
          ]}
        />
      );
    });

    // Switch
    testPair('Switch', (props) => <Switch {...props} />);

    // Table
    testPair('Table', (props) => {
      const columns: ColumnsType<any> = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            { text: 'Joe', value: 'Joe' },
            {
              text: 'Submenu',
              value: 'Submenu',
              children: [{ text: 'Green', value: 'Green' }],
            },
          ],
          filterDropdownOpen: true,
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
        },
      ];

      const myProps = { ...props };
      if (props.prefixCls) {
        myProps.dropdownPrefixCls = 'prefix-dropdown';
      }

      return <Table columns={columns} {...props} />;
    });

    // Tabs
    testPair('Tabs', (props) => (
      <Tabs {...props}>
        <Tabs.TabPane tab="Bamboo" key="Light" />
      </Tabs>
    ));

    // Tags
    testPair('Tags', (props) => (
      <div>
        <Tag {...props}>Bamboo</Tag>
        <Tag.CheckableTag {...props}>Light</Tag.CheckableTag>
      </div>
    ));

    // TimePicker
    testPair('TimePicker', (props) => (
      <TimePicker {...props} open defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
    ));

    // Timeline
    testPair('Timeline', (props) => (
      <Timeline {...props}>
        <Timeline.Item {...props}>Bamboo</Timeline.Item>
      </Timeline>
    ));

    // Tooltip
    testPair('Tooltip', (props) => (
      <Tooltip {...props} title="Bamboo" open>
        <span>Light</span>
      </Tooltip>
    ));

    // Transfer
    testPair('Transfer', (props) => <Transfer {...props} dataSource={[]} />);

    // Tree
    testPair('Tree', (props) => (
      <div>
        <Tree {...props}>
          <Tree.TreeNode title="bamboo" />
        </Tree>
        <Tree.DirectoryTree {...props}>
          <Tree.TreeNode title="bamboo" />
        </Tree.DirectoryTree>
      </div>
    ));

    // TreeSelect
    testPair('TreeSelect', (props) => (
      <TreeSelect {...props} open>
        <TreeSelect.TreeNode title="bamboo" value="light" />
      </TreeSelect>
    ));

    // Upload
    testPair('Upload', (props) => (
      <Upload {...props} defaultFileList={[{ uid: '1', name: 'xxx.png', status: 'done' }]}>
        <span />
      </Upload>
    ));
  });
});
