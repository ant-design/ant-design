import React from 'react';
import { darkAlgorithm } from '@ant-design/compatible';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { CheckCircleOutlined, CloseCircleOutlined, LinkedinOutlined } from '@ant-design/icons';

import Tag from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

(global as any).isVisible = true;

jest.mock('@rc-component/util/lib/Dom/isVisible', () => {
  const mockFn = () => (global as any).isVisible;
  return mockFn;
});

function waitRaf() {
  act(() => {
    jest.advanceTimersByTime(100);
  });
}

describe('Tag', () => {
  mountTest(Tag);
  mountTest(() => <Tag.CheckableTag checked={false} />);
  rtlTest(Tag);
  rtlTest(() => <Tag.CheckableTag checked={false} />);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be closable', () => {
    const onClose = jest.fn();
    const { container } = render(<Tag closable onClose={onClose} />);
    expect(container.querySelectorAll('.anticon-close').length).toBe(1);
    expect(container.querySelectorAll('.ant-tag:not(.ant-tag-hidden)').length).toBe(1);
    fireEvent.click(container.querySelectorAll('.anticon-close')[0]);
    expect(onClose).toHaveBeenCalled();
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tag:not(.ant-tag-hidden)').length).toBe(0);
  });

  it('should not be closed when prevent default', () => {
    const onClose = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
    };
    const { container } = render(<Tag closable onClose={onClose} />);
    expect(container.querySelectorAll('.anticon-close').length).toBe(1);
    expect(container.querySelectorAll('.ant-tag:not(.ant-tag-hidden)').length).toBe(1);
    fireEvent.click(container.querySelectorAll('.anticon-close')[0]);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tag:not(.ant-tag-hidden)').length).toBe(1);
  });

  it('show close button by closeIcon', () => {
    const { container } = render(
      <>
        <Tag className="tag1" closable closeIcon="close" />
        <Tag className="tag2" closable closeIcon />
        <Tag className="tag3" closable closeIcon={false} />
        <Tag className="tag4" closable closeIcon={null} />
        <Tag className="tag5" closable={false} closeIcon="close" />
        <Tag className="tag6" closable={false} closeIcon />
        <Tag className="tag7" closable={false} closeIcon={false} />
        <Tag className="tag8" closable={false} closeIcon={null} />
        <Tag className="tag9" closeIcon="close" />
        <Tag className="tag10" closeIcon />
        <Tag className="tag11" closeIcon={false} />
        <Tag className="tag12" closeIcon={null} />
      </>,
    );

    expect(container.querySelectorAll('.ant-tag-close-icon').length).toBe(6);
    ['tag1', 'tag2', 'tag3', 'tag4', 'tag9', 'tag10'].forEach((tag) => {
      expect(container.querySelector(`.${tag} .ant-tag-close-icon`)).toBeTruthy();
    });
    ['tag5', 'tag6', 'tag7', 'tag8', 'tag11', 'tag12'].forEach((tag) => {
      expect(container.querySelector(`.${tag} .ant-tag-close-icon`)).toBeFalsy();
    });
  });

  it('should trigger onClick on Tag', () => {
    const onClick = jest.fn();
    const { container } = render(<Tag onClick={onClick} />);
    const tagElement = container.querySelector<HTMLSpanElement>('.ant-tag')!;
    fireEvent.click(tagElement);
    expect(onClick).toHaveBeenCalled();
  });

  it('should trigger onClick on Tag.CheckableTag', () => {
    const onClick = jest.fn();
    const { container } = render(<Tag.CheckableTag checked={false} onClick={onClick} />);
    const tagElement = container.querySelector<HTMLSpanElement>('.ant-tag')!;
    fireEvent.click(tagElement);
    expect(onClick).toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/20344
  it('should not trigger onClick when click close icon', () => {
    const onClose = jest.fn();
    const onClick = jest.fn();
    const { container } = render(<Tag closable onClose={onClose} onClick={onClick} />);
    fireEvent.click(container.querySelectorAll('.anticon-close')[0]);
    expect(onClose).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should only render icon when no children', () => {
    const { container } = render(<Tag icon={<CheckCircleOutlined />} />);
    expect(container.querySelector('.ant-tag ')?.childElementCount).toBe(1);
  });

  describe('disabled', () => {
    it('should not trigger onClick when disabled', () => {
      const onClick = jest.fn();
      const { container } = render(<Tag disabled onClick={onClick} />);
      fireEvent.click(container.querySelector('.ant-tag')!);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not trigger onClose when disabled', () => {
      const onClose = jest.fn();
      const { container } = render(<Tag disabled closable onClose={onClose} />);
      fireEvent.click(container.querySelector('.ant-tag-close-icon')!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it("should prevent children's event when disabled", () => {
      const onClick = jest.fn();
      const { container } = render(
        <Tag disabled>
          <a href="https://ant.design" onClick={onClick}>
            Link
          </a>
        </Tag>,
      );
      const link = container.querySelector('a')!;
      expect(window.getComputedStyle(link).pointerEvents).toBe('none');
    });

    it('should render correctly when disabled', () => {
      const { container } = render(<Tag disabled>Disabled Tag</Tag>);
      expect(container.querySelector('.ant-tag-disabled')).toBeTruthy();
    });

    it('should not trigger onClose and onClick when click closeIcon and disabled', () => {
      const onClose = jest.fn();
      const onClick = jest.fn();
      const { container } = render(
        <Tag
          disabled
          closable
          closeIcon={<CloseCircleOutlined />}
          onClose={onClose}
          onClick={onClick}
        />,
      );

      fireEvent.click(container.querySelector('.ant-tag-close-icon')!);
      expect(onClose).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('CheckableTag', () => {
    it('support onChange', () => {
      const onChange = jest.fn();
      const { container } = render(<Tag.CheckableTag checked={false} onChange={onChange} />);
      fireEvent.click(container.querySelectorAll('.ant-tag')[0]);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should support ref', () => {
      const ref = React.createRef<HTMLSpanElement>();
      const { container } = render(
        <Tag.CheckableTag checked={false} ref={ref}>
          Tag Text
        </Tag.CheckableTag>,
      );
      const refElement = ref.current;
      const queryTarget = container.querySelector('.ant-tag');
      expect(refElement instanceof HTMLSpanElement).toBe(true);
      expect(refElement?.textContent).toBe('Tag Text');
      expect(queryTarget?.textContent).toBe('Tag Text');
      expect(refElement).toBe(queryTarget);
    });

    it('should render icon', () => {
      const { container } = render(<Tag.CheckableTag icon={<LinkedinOutlined />} checked />);
      expect(container.querySelector('.anticon')).toBeInTheDocument();
    });

    it('should render custom icon', () => {
      const { container } = render(
        <Tag.CheckableTag icon={<div className="custom-icon">custom icon</div>} checked />,
      );
      expect(container.querySelector('.custom-icon')).toBeInTheDocument();
    });

    it('not render icon', () => {
      const { container } = render(<Tag.CheckableTag checked />);
      expect(container.querySelector('.anticon')).not.toBeInTheDocument();
    });

    it('should not trigger onChange when disabled', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Tag.CheckableTag disabled checked={false} onChange={onChange}>
          Checkable
        </Tag.CheckableTag>,
      );
      fireEvent.click(container.querySelector('.ant-tag')!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should render correctly for disabled CheckableTag', () => {
      const { container, rerender } = render(
        <Tag.CheckableTag disabled checked={false}>
          Checkable
        </Tag.CheckableTag>,
      );
      expect(container.querySelector('.ant-tag-checkable-disabled')).toBeTruthy();

      // Test checked state
      rerender(
        <Tag.CheckableTag disabled checked>
          Checkable
        </Tag.CheckableTag>,
      );
      expect(container.querySelector('.ant-tag-checkable-checked')).toBeTruthy();
      expect(container.querySelector('.ant-tag-checkable-disabled')).toBeTruthy();
    });

    it('should handle context disabled state', () => {
      const onChange = jest.fn();
      const Demo = () => (
        <ConfigProvider componentDisabled>
          <Tag.CheckableTag checked={false} onChange={onChange}>
            Checkable
          </Tag.CheckableTag>
        </ConfigProvider>
      );
      const { container } = render(<Demo />);
      expect(container.querySelector('.ant-tag-checkable-disabled')).toBeTruthy();
      fireEvent.click(container.querySelector('.ant-tag')!);
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  it('should onClick is undefined', async () => {
    const { container } = render(<Tag onClick={undefined} />);
    fireEvent.click(container.querySelectorAll('.ant-tag')[0]);
    waitRaf();
    expect(document.querySelector('.ant-wave')).toBeFalsy();
  });
  it('should support aria-* in closable', () => {
    const { container } = render(<Tag closable={{ closeIcon: 'X', 'aria-label': 'CloseBtn' }} />);
    expect(container.querySelector('.ant-tag-close-icon')?.getAttribute('aria-label')).toEqual(
      'CloseBtn',
    );
    expect(container.querySelector('.ant-tag-close-icon')?.textContent).toEqual('X');
  });
  it('should apply classNames and styles correctly', () => {
    const customClassNames = {
      root: 'custom-root',
      icon: 'custom-icon',
      content: 'custom-content',
    };

    const customStyles = {
      root: { backgroundColor: 'rgb(0, 255, 0)' },
      icon: { color: 'rgb(255, 0, 0)' },
      content: { backgroundColor: 'rgb(0, 0, 255)' },
    };
    const { container } = render(
      <Tag icon={<CheckCircleOutlined />} classNames={customClassNames} styles={customStyles}>
        ant
      </Tag>,
    );

    const rootElement = container.querySelector('.ant-tag') as HTMLElement;

    expect(rootElement.classList).toContain('custom-root');
    expect(rootElement.style.backgroundColor).toBe('rgb(0, 255, 0)');
    expect(container.querySelector('.custom-icon')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(container.querySelector('.custom-content')).toHaveStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });
  it('should handle invalid icon gracefully', () => {
    const { container } = render(<Tag icon="">tag</Tag>);
    const iconElement = container.querySelector('svg');
    expect(container).not.toBeNull();
    expect(iconElement).toBeNull();
  });

  it('should have variant className', () => {
    const { container } = render(
      <Tag color="#66ccff" variant="solid">
        tag
      </Tag>,
    );
    const tagElement = container.querySelector('.ant-tag-solid');
    expect(tagElement).not.toBeNull();
  });

  it('legacy color inverse', () => {
    const { container } = render(<Tag color="green-inverse">tag</Tag>);

    expect(container.querySelector('.ant-tag-green')).toHaveClass('ant-tag-solid');
  });

  describe('CheckableTagGroup', () => {
    it('should check single tag in group', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <Tag.CheckableTagGroup defaultValue="foo" options={['foo', 'bar']} onChange={onChange} />,
      );
      const checked = container.querySelector('.ant-tag-checkable-checked');
      expect(checked).not.toBeNull();

      // Click
      fireEvent.click(container.querySelectorAll('.ant-tag-checkable')[1]);
      expect(onChange).toHaveBeenCalledWith('bar');

      // Click again (single mode can uncheck)
      fireEvent.click(container.querySelectorAll('.ant-tag-checkable')[1]);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('should check radio tag in group', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <Tag.CheckableTagGroup
          mode="radio"
          defaultValue="foo"
          options={['foo', 'bar']}
          onChange={onChange}
        />,
      );
      const checked = container.querySelector('.ant-tag-checkable-checked');
      expect(checked).not.toBeNull();

      // Click
      fireEvent.click(container.querySelectorAll('.ant-tag-checkable')[1]);
      expect(onChange).toHaveBeenCalledWith('bar');

      // Click again (radio mode should not uncheck)
      fireEvent.click(container.querySelectorAll('.ant-tag-checkable')[1]);
      expect(onChange).toHaveBeenCalledWith('bar');
    });

    it('should check multiple tag in group', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <Tag.CheckableTagGroup
          mode="multiple"
          defaultValue={['foo', 'bar']}
          options={[
            { value: 'foo', label: 'Foo' },
            { value: 'bar', label: 'Bar' },
          ]}
          onChange={onChange}
        />,
      );
      const checked = container.querySelector('.ant-tag-checkable-checked');
      expect(checked).not.toBeNull();

      // Click
      fireEvent.click(container.querySelectorAll('.ant-tag-checkable')[1]);
      expect(onChange).toHaveBeenCalledWith(['foo']);

      // Click again
      fireEvent.click(container.querySelectorAll('.ant-tag-checkable')[1]);
      expect(onChange).toHaveBeenCalledWith(['foo', 'bar']);
    });

    it('id', () => {
      const { container } = render(<Tag.CheckableTagGroup id="test-id" />);

      expect(container.querySelector('.ant-tag-checkable-group')?.id).toBe('test-id');
    });
  });

  it('dark theme default', () => {
    document.head.innerHTML = '';

    render(
      <StyleProvider cache={createCache()}>
        <ConfigProvider
          theme={{
            algorithm: darkAlgorithm,
          }}
        >
          <Tag variant="solid" color="default">
            Tag
          </Tag>
        </ConfigProvider>
      </StyleProvider>,
    );

    expect(document.head.innerHTML).toContain('--ant-tag-solid-text-color:#000;');
  });

  it('legacy bordered={false}', () => {
    const { container } = render(<Tag bordered={false}>Tag</Tag>);
    expect(container.querySelector('.ant-tag-filled')).toBeTruthy();
  });

  it('should not override aria-label in custom closeIcon', () => {
    const { getByRole } = render(
      <Tag
        closable
        closeIcon={
          <button type="button" aria-label="Remove This Filter">
            x
          </button>
        }
      >
        Filter
      </Tag>,
    );
    expect(getByRole('button')).toHaveAttribute('aria-label', 'Remove This Filter');
  });

  it('support classNames and styles as objects', () => {
    const { container } = render(
      <Tag
        icon={<CheckCircleOutlined />}
        classNames={{
          root: 'custom-tag-root',
          icon: 'custom-tag-icon',
          content: 'custom-tag-content',
        }}
        styles={{
          root: {
            backgroundColor: 'lightblue',
            border: '2px solid blue',
          },
          icon: {
            color: 'red',
            fontSize: '16px',
          },
          content: {
            backgroundColor: 'yellow',
            color: 'green',
          },
        }}
      >
        Test Tag
      </Tag>,
    );

    const tagElement = container.querySelector('.ant-tag');
    const iconElement = container.querySelector('.custom-tag-icon');
    const contentElement = container.querySelector('.custom-tag-content');

    expect(tagElement).toHaveClass('custom-tag-root');
    expect(tagElement).toHaveAttribute('style');
    const rootStyle = tagElement?.getAttribute('style');
    expect(rootStyle).toContain('background-color: lightblue');
    expect(rootStyle).toContain('border: 2px solid blue');

    expect(iconElement).toHaveAttribute('style');
    const iconStyle = iconElement?.getAttribute('style');
    expect(iconStyle).toContain('color: red');
    expect(iconStyle).toContain('font-size: 16px');

    expect(contentElement).toHaveClass('custom-tag-content');
    expect(contentElement).toHaveAttribute('style');
    const contentStyle = contentElement?.getAttribute('style');
    expect(contentStyle).toContain('background-color: yellow');
    expect(contentStyle).toContain('color: green');
  });
});
