import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, cssVar } = props;
  return {
    descriptionItem: css`
      margin-bottom: ${cssVar.marginXS};
      color: ${cssVar.colorTextLabel};
      font-size: ${cssVar.fontSize};
      line-height: ${cssVar.lineHeight};
    `,
    profileTitle: css`
      display: block;
      margin-bottom: ${cssVar.margin};
      color: ${cssVar.colorTextHeading};
      font-size: ${cssVar.fontSizeLG};
      line-height: ${cssVar.lineHeight};
    `,
    label: css`
      display: inline-block;
      margin-inline-end: ${cssVar.marginXS};
      color: ${cssVar.colorTextHeading};
    `,
  };
});

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem: React.FC<DescriptionItemProps> = (props) => {
  const { title, content } = props;
  const { styles } = useStyles();
  return (
    <div className={styles.descriptionItem}>
      <p className={styles.label}>{title}:</p>
      {content}
    </div>
  );
};

const App: React.FC = () => {
  const { styles } = useStyles();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        bordered
        dataSource={[
          { id: 1, name: 'Lily' },
          { id: 2, name: 'Lily' },
        ]}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description="Progresser XTech"
            />
          </List.Item>
        )}
      />
      <Drawer size={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p className={styles.profileTitle} style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p className={styles.profileTitle}>Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <p className={styles.profileTitle}>Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className={styles.profileTitle}>Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="GitHub"
              content={
                <a
                  href="https://github.com/ant-design/ant-design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/ant-design/ant-design
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default App;
