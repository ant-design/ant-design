import React from 'react';
import Drawer from '..';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../../button';

class MultiDrawer extends React.Component {
  state = { visible: false, childrenDrawer: false, hasChildren: true };

  showDrawer = () => {
    this.setState({
      visible: true,
      hasChildren: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
      hasChildren: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  onRemoveChildDrawer = () => {
    this.setState({
      hasChildren: false,
    });
  };

  render() {
    const { childrenDrawer, visible, hasChildren } = this.state;
    const { placement, push } = this.props;
    return (
      <div>
        <Button type="primary" id="open_drawer" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Button type="primary" id="remove_drawer" onClick={this.onRemoveChildDrawer}>
          rm child drawer
        </Button>
        <Drawer
          title="Multi-level drawer"
          className="test_drawer"
          width={520}
          onClose={this.onClose}
          getContainer={false}
          placement={placement}
          visible={visible}
          push={push}
        >
          <Button type="primary" id="open_two_drawer" onClick={this.showChildrenDrawer}>
            Two-level drawer
          </Button>
          {hasChildren && (
            <Drawer
              title="Two-level Drawer"
              width={320}
              className="Two-level"
              getContainer={false}
              placement={placement}
              onClose={this.onChildrenDrawerClose}
              visible={childrenDrawer}
            >
              <div id="two_drawer_text">This is two-level drawer</div>
            </Drawer>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>

        <div className="childrenDrawer">{String(childrenDrawer)}</div>
      </div>
    );
  }
}

describe('Drawer', () => {
  it('render right MultiDrawer', () => {
    const { container: wrapper } = render(<MultiDrawer placement="right" />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    const translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('translateX(-180px)');
    expect(wrapper.querySelectorAll('#two_drawer_text').length).toBe(1);
  });

  it('render left MultiDrawer', () => {
    const { container: wrapper } = render(<MultiDrawer placement="left" />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    const translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('translateX(180px)');
    expect(wrapper.querySelectorAll('#two_drawer_text').length).toBe(1);
    fireEvent.click(wrapper.querySelector('.Two-level .ant-drawer-close'));
    expect(wrapper.querySelector('.childrenDrawer').innerHTML).toEqual('false');
  });

  it('render top MultiDrawer', () => {
    const { container: wrapper } = render(<MultiDrawer placement="top" />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    const translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('translateY(180px)');
    expect(wrapper.querySelectorAll('#two_drawer_text').length).toBe(1);
  });

  it('render MultiDrawer is child in unmount', () => {
    const { container: wrapper } = render(<MultiDrawer placement="top" mask={false} />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    fireEvent.click(wrapper.querySelector('button#remove_drawer'));
    let translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('');
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('translateY(180px)');
    expect(wrapper.querySelectorAll('#two_drawer_text').length).toBe(1);
  });

  it('custom MultiDrawer push distance', () => {
    const { container: wrapper } = render(<MultiDrawer push={{ distance: 256 }} />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    const translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('translateX(-256px)');
  });

  it('custom MultiDrawer push with true', () => {
    const { container: wrapper } = render(<MultiDrawer push />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    const translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('translateX(-180px)');
  });

  it('custom MultiDrawer push with false', () => {
    const { container: wrapper } = render(<MultiDrawer push={false} />);
    fireEvent.click(wrapper.querySelector('button#open_drawer'));
    fireEvent.click(wrapper.querySelector('button#open_two_drawer'));
    const translateX = wrapper.querySelectorAll('.ant-drawer.test_drawer')[0].style.transform;
    expect(translateX).toEqual('');
  });
});
