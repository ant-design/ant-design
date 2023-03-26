import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, fireEvent } from '../../../tests/utils';
import DraggableTag from '../demo/draggable';

(global as any).isVisible = true;

jest.mock('rc-util/lib/Dom/isVisible', () => {
  const mockFn = () => (global as any).isVisible;
  return mockFn;
});

describe('DraggableTag', () => {
  mountTest(DraggableTag);
  rtlTest(DraggableTag);

  it('renders tags correctly', () => {
    const { getByText } = render(<DraggableTag />);

    // 检查每个标签是否以正确的文本渲染
    expect(getByText('Tag 1')).toBeInTheDocument();
    expect(getByText('Tag 2')).toBeInTheDocument();
    expect(getByText('Tag 3')).toBeInTheDocument();
  });

  it('render a input when the "New Tag" element is clicked', () => {
    const { container, getByText } = render(<DraggableTag />);

    const addTagButton = getByText('New Tag');

    fireEvent.click(addTagButton);

    expect(container.getElementsByTagName('input').length).toBe(1);
  });

  it('should add a new tag when the input press Enter is clicked', () => {
    const { container, getByText } = render(<DraggableTag />);

    const addTagButton = getByText('New Tag');

    fireEvent.click(addTagButton);

    const input = container.getElementsByTagName('input')[0];

    fireEvent.change(input, { target: { value: 'Tag xxx' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(input).not.toBeInTheDocument();
    expect(getByText('Tag xxx')).toBeInTheDocument();
  });

  it('should save the edited tag when the "Enter" key is pressed', () => {
    const { container, getByText } = render(<DraggableTag />);
    const tag1 = getByText('Tag 1');

    fireEvent.doubleClick(tag1);

    const input = container.getElementsByTagName('input')[0];

    fireEvent.change(input, { target: { value: 'Tag xxx' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(input).not.toBeInTheDocument();
    expect(getByText('Tag xxx')).toBeInTheDocument();
  });

  it('removes a tag when the "X" button is clicked', () => {
    const { getByText } = render(<DraggableTag />);
    const tag = getByText('Tag 1');
    const delTagBtn = tag.nextElementSibling as Element;

    fireEvent.click(delTagBtn);

    expect(tag).not.toBeInTheDocument();
  });

  it('should render a input when the tag is double clicked', () => {
    const { container, getByText } = render(<DraggableTag />);
    const tag = getByText('Tag 1');

    fireEvent.doubleClick(tag);

    const inputs = container.getElementsByTagName('input');

    expect(inputs.length).toBe(1);
    expect(inputs[0]).toHaveAttribute('value', 'Tag 1');
  });
});
